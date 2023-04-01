import React from "react";
import axios from "axios";
import { ListaPublicaciones } from "../molecules/ListaPublicaciones";
import { IUser} from '../../models/IUser';
import { IPhoto } from '../../models/IPhoto';
import { IAlbum } from '../../models/IAlbum';

export const ListaPublicacionesWrapper = () => {
  const [publicaciones, setPublicaciones] = React.useState<IUser[]>([]);
  const [cargando, setCargando] = React.useState(true);

  const traerPublicaciones = async () => {
    try {
      // Hacer la petición
      const [usuarios, albums, fotos] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://jsonplaceholder.typicode.com/albums"),
        axios.get("https://jsonplaceholder.typicode.com/photos"),
      ]);

      const publicacionesAlbumsConUsuariosYFotos = (usuarios.data as IUser[]).map(
        (publicacion) => {
          const usuarioAlbum = (albums.data as IAlbum[]).find(
            (album) => album.id === publicacion.id
          );

          //  const albumFoto = (fotos.data as IPhoto[]).find(
          //       (foto) => foto.id === publicacion.album.id
          //     );
        
          return {
            ...publicacion,
            usuarioAlbum: usuarioAlbum,
            // fotos:albumFoto
          };
        }
      );

      setPublicaciones(publicacionesAlbumsConUsuariosYFotos);

      setCargando(false);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    traerPublicaciones();
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  return <ListaPublicaciones publicaciones={publicaciones} />;
};
