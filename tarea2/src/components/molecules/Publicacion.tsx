import React from "react";
import { IUser } from "../../models/IUser";

interface IPublicacionProps {
  user: IUser;
}

export const Publicacion: React.FC<IPublicacionProps> = ({ user }) => {

  return (
    <li>
      <p>{user.id}</p>
      <h4>Nombre: {user.name}</h4>
      <p>Album:{}</p>
      <p>{}</p>
    </li>
  );
};
