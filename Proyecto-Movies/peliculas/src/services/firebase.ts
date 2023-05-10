import { IMovie, IRate, IReview } from "@/contexts/peliculas-context";
import { User } from "firebase/auth";
import {
  addDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const saveFavoriteMovie = async (movie: IMovie, firebaseUser: User) => {
  try {
    const docRef = await addDoc(collection(getFirestore(), "movies"), {
      userId: firebaseUser.uid,
      ...movie,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

//Review input

export const saveReviews = async (reviews: string) => {
  try {
    const docRef = await addDoc(collection(getFirestore(), "reviews"), {
      reviews: reviews ,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

//Star rating

export const saveRating = async (ratings: number) => {
  try {
    const docRef = await addDoc(collection(getFirestore(), "ratings"), {
      ratings: ratings ,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error(error);
  }
};

//Get Todos

export const getTodos = async (firebaseUser: User) => {
  const firebaseQuery = query(
    collection(getFirestore(), "movies"),
    where("userId", "==", firebaseUser.uid)
  );

  const querySnapshot = await getDocs(firebaseQuery);
  const movies: IMovie[] = [];

  querySnapshot.forEach((doc) => {
    movies.push({ ...(doc.data() as IMovie) });
  });

  return movies;
};