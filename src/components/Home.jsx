import React from 'react'

// Config
import { BACKDROP_SIZE, POSTER_SIZE, IMAGE_BASE_URL } from '../config'

// Components
import HeroImage from './HeroImage'
import Thumb from './Thumb'
import Spinner from './Spinner'
import Grid from './Grid'
import SearchBar from './SearchBar'
import Button from './Button'

// Hooks
import { useHomeFetch } from '../hooks/useHomeFetch'

// API

// Images
import NoImage from '../images/no_image.jpg'

const Home = () => {
	const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
		useHomeFetch()

	// console.log('render', state)

	if (error) return <div>Something went wrong...</div>

	return (
		<>
			{!searchTerm && state.results[0] && (
				<HeroImage
					image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
					title={state.results[0].original_title}
					text={state.results[0].overview}
				/>
			)}
			<SearchBar setSearchTerm={setSearchTerm} />
			<Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
				{state.results.map(movie => (
					<Thumb
						key={movie.id}
						clickable
						image={
							movie.poster_path
								? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
								: NoImage
						}
						movieId={movie.id}
					/>
				))}
			</Grid>

			{loading && <Spinner />}

			{state.page < state.total_pages && !loading && (
				<Button text="Load more" callback={() => setIsLoadingMore(true)} />
			)}
		</>
	)
}

export default Home
