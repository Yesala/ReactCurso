import Image from "next/image";
import { ProtectedPage } from "@/components/layouts/ProtectedPage";
import { usePeliculasContext } from "@/contexts/peliculas-context";
import { useFirebaseAuth } from "@/contexts/firebase-auth-context";
import {
  saveFavoriteMovie,
  saveRating,
  saveReviews,
} from "@/services/firebase";
import Link from "next/link";
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function Home() {
  const { popularMovies } = usePeliculasContext();
  const { user } = useFirebaseAuth();
  const { setVisible, bindings } = useModal();

  const [review, setReview] = useState("");
  console.log(review);
  const handleReviewMsj = () => {
    saveReviews(review);
  };
  const [ratingValue, setRatingValue] = useState(0);
  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };
  const handleRatingMsj = () => {
    saveRating(ratingValue);
  };

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
                <div className="star-svg">
                  <Rating
                    onClick={handleRating}
                    initialValue={ratingValue}
                    size={20}
                    transition
                  />
                </div>
                <div>
                  <button className="calificacion" onClick={handleRatingMsj}>
                    Enviar calificación
                  </button>
                </div>
              </div>

              <div className="review">
                <Button
                  className="btn-comments"
                  auto
                  flat
                  onPress={() => setVisible(true)}
                >
                  Comentarios
                </Button>
                <Modal
                  scroll
                  width="600px"
                  closeButton
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  {...bindings}
                >
                  <Modal.Header>
                    <Text id="modal-title" size={30}>
                      Comentarios de la película
                    </Text>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      className="border rounded shadow px-2"
                      type="text"
                      id="review"
                      name="review"
                      placeholder="Escriba su opinión aquí"
                      // Guardar input
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      flat
                      auto
                      color="error"
                      onPress={() => setVisible(false)}
                    >
                      Cerrar
                    </Button>
                    <Button onPress={handleReviewMsj}>Enviar</Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <button
                className="bg-white py-2 px-4 border rounded shadow"
                onClick={() => user && saveFavoriteMovie(movie, user)}
                style={{
                  fontSize: "13px",
                  color: "gray",
                  marginLeft: "28px",
                  marginBottom: "20px",
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
