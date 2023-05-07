import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { TextInput } from "@/components/TextInput";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { AuthPage } from "@/components/layouts/AuthPage";
import styles from "../components/login-form.module.css";
import { FaDragon } from "react-icons/fa";
import { GiAbstract014 } from "react-icons/gi";

const REQUIRED_FIELD_MESSAGE = "Campo requerido";
const INVALID_EMAIL_MESSAGE = "Correo inválido";
const MIN_PASSWORD_LENGTH = "Mínimo 8 caracteres";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email(INVALID_EMAIL_MESSAGE)
    .required(REQUIRED_FIELD_MESSAGE),
  password: Yup.string()
    .required(REQUIRED_FIELD_MESSAGE)
    .min(8, MIN_PASSWORD_LENGTH),
});

const LoginPage = () => {
  const { login } = useFirebaseAuth();
  const router = useRouter();

  const handleSubmit = React.useCallback(
    async (values: LoginFormValues) => {
      try {
        await login(values.email, values.password);
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
    [login, router]
  );

  return (
    <AuthPage>
      <div className="container">
        <div className={styles.login_box + " p-3"}>
          <h1 style={{ fontSize: "45px" }}>
            <GiAbstract014 />
          </h1>
          <br />
          <Formik<LoginFormValues>
            initialValues={{
              email: "",
              password: "",
            }}
            validateOnBlur
            validateOnMount
            validateOnChange
            validationSchema={LoginFormSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              isValid,
              isValidating,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <TextInput
                    className="form-control"
                    id="email"
                    type="email"
                    label="Correo electrónico"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={!!(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    className="form-control"
                    id="password"
                    type="password"
                    label="Contraseña"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={!!(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </div>
                <br></br>
                <LoadingButton
                  disabled={!isValid || isValidating}
                  loading={isSubmitting || isValidating}
                  variant="outlined"
                  size="large"
                  type="submit"
                >
                  Iniciar Sesión
                </LoadingButton>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </AuthPage>
  );
};

export default LoginPage;
