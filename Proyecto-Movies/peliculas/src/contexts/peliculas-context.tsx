import axios from "axios";
import React, { Children, useState } from "react";

const MOVIESDB_API_KEY = "26ea4e8edc83a748c28e34c49084f0bf";

export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  review: IReview;
}

export interface IReview {
  reviews: string;
}

interface PeliculasContextProps {
  popularMovies: IMovie[];
}

interface ReviewsContextProps {
  reviews: IReview[];
}

//Popular Movies//

export const PeliculasContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [popularMovies, setPopularMovies] = React.useState<IMovie[]>([]);

  const getPopularMovies = React.useCallback(async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIESDB_API_KEY}&language=en-US&page=1`
    );

    setPopularMovies(response.data.results);
  }, []);

  React.useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  const contextValue = React.useMemo(
    () => ({
      popularMovies,
    }),
    [popularMovies]
  );

  return (
    <PeliculasContext.Provider value={contextValue}>
      {children}
    </PeliculasContext.Provider>
  );
};

const PeliculasContext = React.createContext<PeliculasContextProps>({
  popularMovies: [],
});

export const usePeliculasContext = () =>
  React.useContext<PeliculasContextProps>(PeliculasContext);

//---Inputs Reviews---//

export const ReviewsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [reviews, setReviews] = React.useState<IReview[]>([]);

  const getReviews = React.useCallback(async () => {
    //setReviews(data.results);
  }, []);

  React.useEffect(() => {
    getReviews();
  }, [getReviews]);

  const contextValue = React.useMemo(
    () => ({
      reviews,
    }),
    [reviews]
  );

  return (
    <ReviewsContext.Provider value={contextValue}>
      {children}
    </ReviewsContext.Provider>
  );
};

const ReviewsContext = React.createContext<ReviewsContextProps>({
  reviews: [],
});

export const useReviewsContext = () =>
  React.useContext<ReviewsContextProps>(ReviewsContext);
