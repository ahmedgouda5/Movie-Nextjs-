"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const FilmPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  interface Movie {
    poster_path: string;
    title: string;
    overview: string;
    vote_average: number;
    spoken_languages: { iso_639_1: string; name: string }[];
    genres: { id: number; name: string }[];
    production_companies: { name: string }[];
  }

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjE5M2EwZTE3NmE4NjY0MWFiODQ3NGYwMTk5YzYzNSIsIm5iZiI6MTcyMjcwODUyMi4xMzY5OTk4LCJzdWIiOiI2NmFlNzIyYWYyZTEwMmMzMTkzOWRlZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5tTvriw-TaFh-B5V5KOif0UzeP3QfI_RG6mIDlbG0Ag",
    },
  };

  useEffect(() => {
    if (!slug) return;

    const getMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${slug}`,
          options
          // eslint-disable-next-line react-hooks/exhaustive-deps
        );
        if (!res.ok) throw new Error("Failed to fetch movie details");

        const data = await res.json();
        console.log(data);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching movie details");
        setLoading(false);
        console.error(err);
      }
    };

    getMovie();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" container grid  gap-4 md:gap-2 pt-4">
      {movie && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className=" w-fit  grid  grid-cols-10 justify-start gap-5 "
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={10}
              className="rounded-lg  col-span-10 md:col-span-2"
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="border-2 p-6 shadow-xl hidden md:flex shadow-white/25  gap-4 bg-white rounded-xl col-span-8 flex-col justify-start items-start"
            >
              <h2 className="text-lg font-semibold">
                genres:
                {movie.genres.map((genre: { id: number; name: string }) => (
                  <span
                    key={genre.id}
                    className="text-red-500 px-4 py-1 bg-red-100 rounded-full mx-1"
                  >
                    {genre.name}
                  </span>
                ))}
              </h2>
              <p className="text-gray-700 text-lg font-semibold">
                production company:
                {movie.production_companies.map((company: { name: string }) => (
                  <span
                    key={company.name}
                    className="text-red-500 rounded-full px-4 py-1 bg-red-100 mx-1"
                  >
                    {company.name}
                  </span>
                ))}
              </p>
              <h5 className="text-lg">
                Rate:
                <span className="bg-red-100 rounded-full mx-1 py-1 px-4 text-red-500">
                  {" "}
                   {movie.vote_average?.toFixed(1) ?? "N/A"}
                </span>
              </h5>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="border-2 p-6 rounded-xl grid-cols-6 flex flex-col justify-start items-start"
          >
            <h1 className="text-2xl font-bold text-red-700">{movie.title}</h1>
            <p className="text-lg text-gray-600">{movie.overview}</p>
            <p className="mt-2 font-semibold text-red-400">
              Rating: {movie.vote_average?.toFixed(1) ?? "N/A"}
            </p>
            <p className="mt-2 font-semibold text-red-400">Languages:</p>
            {movie.spoken_languages && movie.spoken_languages.length > 0 ? (
              movie.spoken_languages.map(
                (lang: { iso_639_1: string; name: string }) => (
                  <span key={lang.iso_639_1} className="text-gray-500">
                    {lang.name}
                  </span>
                )
              )
            ) : (
              <p className="text-gray-500">No languages available</p>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default FilmPage;
