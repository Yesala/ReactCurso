import { FirebaseApp, initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import React, { Children } from 'react';

export interface FirebaseContextProps {
  firebaseApp: FirebaseApp | null;
  firebaseAuth: Auth | null;
}

const firebaseConfig = {
    apiKey: "AIzaSyDxPiV7A3jsLJcsfj1fqBn0IX9H4np5pyM",
    authDomain: "projectopeliculas.firebaseapp.com",
    projectId: "projectopeliculas",
    storageBucket: "projectopeliculas.appspot.com",
    messagingSenderId: "457717743244",
    appId: "1:457717743244:web:c78209782b457da64c05a9",
    measurementId: "G-RGPXDYLKFK"
  };

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

const initFirebase = () => {
  if(!app || getApps().length === 0){
    app = initializeApp(firebaseConfig);
  }

  return app;
};

const FirebaseContext = React.createContext<FirebaseContextProps>({
  firebaseApp: initFirebase(),
  firebaseAuth: null,
})

export const FirebaseContextProvider : React.FC<React.PropsWithChildren> = ({
children, 
}) => {
  const [firebaseApp, setFirebaseApp] = React.useState<FirebaseApp | null>(app);
  const [firebaseAuth, setFirebaseAuth] = React.useState<Auth | null>(auth);

  React.useEffect (() => {
    if(!firebaseApp){
      setFirebaseApp(initFirebase());
    }

    if(!firebaseAuth){
      setFirebaseAuth(getAuth());
    }
  },[firebaseApp, firebaseAuth]);

  const contextValue: FirebaseContextProps = React.useMemo(
    () => ({
      firebaseApp,
      firebaseAuth,
    }),
    [firebaseApp, firebaseAuth]
  );

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => 
React.useContext<FirebaseContextProps>(FirebaseContext);