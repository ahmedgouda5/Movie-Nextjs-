"use client";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import Hero from "./(components)/hero/page";
import Link from "next/link";

const Home = () => {
  const [movies, setMovies] = useState<
    { id: number; title: string; release_date: string; backdrop_path: string }[]
  >([]);

  const getMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjE5M2EwZTE3NmE4NjY0MWFiODQ3NGYwMTk5YzYzNSIsIm5iZiI6MTcyMjcwODUyMi4xMzY5OTk4LCJzdWIiOiI2NmFlNzIyYWYyZTEwMmMzMTkzOWRlZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5tTvriw-TaFh-B5V5KOif0UzeP3QfI_RG6mIDlbG0Ag",
      },
    };

    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        options
      );
      const data = await res.json();
      if (data.results.length > 0) {
        setMovies(data.results);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Hero />
      <div className="container mx-auto px-4">
        <motion.div 
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} className="text-center mt-12 ">
        <h2 className="text-xl font-semibold  text-white">Featured Moviess</h2>
        <p className="text-gray-300  text-lg mt-2 ">
          Explore the latest additions to our collection.
        </p>
        </motion.div>

        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="relative h-72 rounded-lg overflow-hidden bg-cover bg-center flex flex-col justify-end p-4"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-300">{movie.release_date}</p>
                </div>
                <div className="absolute z-55 bg-black flex justify-center items-center inset-0 opacity-0 hover:opacity-60 transition-all duration-200">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="md:mt-6 px-5 py-2 mb-3 bg-red-500 text-white rounded-lg 
                   hover:bg-red-700 active:bg-red-600 
                   focus:outline-none focus:ring focus:ring-red-300 
                   transition-all duration-200"
                  >
                    <Link href={`/MovieDetails/${movie.id}`}>watch</Link>
                  </motion.button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300">Loading movies...</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
