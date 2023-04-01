import React from "react";
import { IAlbum } from "../../models/IAlbum";
import { IUser } from "../../models/IUser";
import { Publicacion } from "./Publicacion";

export interface IListaPublicacionesProps {
  publicaciones: IUser[];
}

export const ListaPublicaciones: React.FC<IListaPublicacionesProps> = ({
  publicaciones,
}) => {
  return (
    <ul>
      {publicaciones.map((publicacion) => (
        <Publicacion key={`${publicacion.id}`} user={publicacion}/>
      ))}
    </ul>
  );
};
