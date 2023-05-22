import React from 'react'
import { useParams } from 'react-router-dom'
import Showtimes from './Showtimes/Showtimes'
import MovieInfo from './MovieInfo/MovieInfo'
import Loading from '../../components/Loading/Loading'
import styles from './movie.module.scss';
import movieAPI from '../../services/movieAPI';

function MovieDetails() {
  const { movieId } = useParams()

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    ( async () => {
      try {
        const data = await movieAPI.getMovieDetail(movieId);
        setMovie(data)
      } catch (error) {
        console.log(error)
      }
    })();
  },[movieId]);

  if(!movie){
    return <Loading />
  }

  return (
    <div className={styles.wrapMovie}>
      <MovieInfo movie={movie} />

      <Showtimes movieID={movieId}  />
    </div>
  );
}

export default MovieDetails