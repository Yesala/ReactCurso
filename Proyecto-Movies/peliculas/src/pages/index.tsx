import Image from "next/image";

import { ProtectedPage } from "@/components/layouts/ProtectedPage";
import { usePeliculasContext } from "@/contexts/peliculas-context";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import { saveFavoriteMovie } from "@/services/firebase";
import ReactStars from "react-stars";
import Link from "next/link";

export default function Home() {
  const { popularMovies } = usePeliculasContext();
  const { user } = useFirebaseAuth();

  return (
    <ProtectedPage>
      <header className="py-4 px-5 bg-gray-800">
        <Link href="/" className="text-xl font-medium text-white">
          Movie App
        </Link>
      </header>
      <h1 className="Titulos">Popular Movies</h1>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24}`}
      >
        <br></br>
        <ul className="flex flex-wrap m-10">
          {popularMovies.map((movie) => (
            <li key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                style={{ margin: "10px" }}
              />
              <div className="titulo-movie">{movie.title}</div>
              <div className="rating">
                <ReactStars count={5} size={24} color2={"#ffd700"} />
              </div>
              <div></div>
              <button
                className="bg-white py-2 px-4 border rounded shadow"
                onClick={() => user && saveFavoriteMovie(movie, user)}
                style={{
                  fontSize: "13px",
                  color: "gray",
                  marginLeft: "25px",
                  marginBottom: "15px",
                }}
              >
                Guardar en Favoritos
              </button>
            </li>
          ))}
        </ul>
      </main>
    </ProtectedPage>
  );
}
