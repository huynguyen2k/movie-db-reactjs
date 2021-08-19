import React from 'react'
// Router
import { useParams } from 'react-router-dom'
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config'
// Components
import MovieInfo from './MovieInfo'
import BreadCrumb from './BreadCrumb'
import Spinner from './Spinner'
import MovieInfoBar from './MovieInfoBar'
import Grid from './Grid'
import Actor from './Actor'
// Hooks
import { useMovieFetch } from '../hooks/useMovieFetch'
// Images
import NoImage from '../images/no_image.jpg'

const Movie = () => {
	const { movieId } = useParams()
	const { state: movie, loading, error } = useMovieFetch(movieId)

	if (error) return <div>Something went wrong...</div>
	if (loading) return <Spinner />

	return (
		<>
			<BreadCrumb movieTitle={movie.original_title} />
			<MovieInfo movie={movie} />
			<MovieInfoBar
				time={movie.runtime}
				budget={movie.budget}
				revenue={movie.revenue}
			/>
			<Grid header="Actors">
				{movie.actors.map(actor => (
					<Actor
						key={actor.credit_id}
						name={actor.name}
						character={actor.character}
						imageUrl={
							actor.profile_path
								? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
								: NoImage
						}
					/>
				))}
			</Grid>
		</>
	)
}

export default Movie
