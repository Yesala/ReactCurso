function Datos({ nombre, carreras, apellidos, cedula }) {
  return (
    <section className="perfil">
      <h2>{nombre}</h2>
      <ul>
        <li>  
          <b>Apellidos:</b> {apellidos}
        </li>
        <li>
          <b>Cédula: </b>{cedula}
        </li>
        <li>
          <b>Carreras: {carreras.length}{" "}</b>({carreras.join(", ")})
        </li>
      </ul>
    </section>
  );
}

export default function Informacion() {
  return (
    <div>
      <h1>Estudiantes</h1>
      <Datos
        nombre="Sandra"
        apellidos="Pérez Quirós"
        carreras={["Biotecnología", "Fisica"]}
        cedula="201230987"
      />
      <Datos
        nombre="Jairo"
        apellidos="Soto Monge"
        carreras={["Ingeniería"]}
        cedula="303430123"
      />
      <Datos
        nombre="Camila"
        apellidos="Alvarado Solera"
        carreras={["Comunicación", "Artes"]}
        cedula="402340564"
      />
      <Datos
        nombre="Marta"
        apellidos="Chavez De la O"
        carreras={["Disenno Gráfico"]}
        cedula="908760432"
      />
      <Datos
        nombre="Pablo"
        apellidos="Morales Sánchez"
        carreras={["Turismo", "Relaciones Públicas", "Gestión Ambiental"]}
        cedula="708650234"
      />
    </div>
  );
}
