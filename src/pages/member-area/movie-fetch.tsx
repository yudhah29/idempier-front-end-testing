import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

interface Movie {
    movie_id: number;
    poster_path: string;
    title: string;
}

export const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get<{ results: Movie[] }>(
                `https://api.themoviedb.org/3/tv/popular?api_key=002915c2b6924cf6227c7e723d98b386&language=en-US&page=${page}`
            )
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [page])

    const handlePrevPage = () => {
        setPage((prevPage) => prevPage - 1);
    }

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    }

    const handleClick = () => {
   
    }

    return (
        <>
            <div className="grid grid-nogutter surface-card text-800 h-auto">
                <div className="col-12  overflow-hidden surface-200">
                    <img
                        src="https://asset.tix.id/banner_promo_v2/686032e5-3d7a-47de-bc42-bdcbb453c419.jpeg"
                        alt="hero-1"
                        className="ml-auto mr-auto block" style={{height : "100%", width : "100%"}}
                    />
                </div>
            </div>
            <div className="grid grid-nogutter surface justify-content-center">
                <div className="col-10">
                    <div className="text-4xl font-bold my-4">
                        NOW PLAYING IN CINEMAS
                    </div>
                    <div className="grid grid-nogutter justify-content-evenly">
                        {movies.slice(0, 4).map((movie) => (
                            <div key={movie.movie_id} onClick={() => handleClick()}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="card-hover border-round-md cursor-pointer hover:gray-100 hover:filter-grayscale"
                                    style={{ height: "420px" }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="my-4 justify-content-center flex">
                        <button
                            className="bg-blue-500 border-round-md hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 cursor-pointer"
                            onClick={handlePrevPage}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        <button
                            className="bg-blue-500 border-round-md hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer"
                            onClick={handleNextPage}
                            disabled={movies.length === 0}
                        >
                            Next
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
};

