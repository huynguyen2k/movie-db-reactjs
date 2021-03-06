import { useCallback, useEffect, useState } from 'react'

// API
import API from '../API'
import { isPersistedState } from '../helpers'

export const useMovieFetch = movieId => {
	const [state, setState] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const fetchMovie = useCallback(async () => {
		try {
			setError(false)
			setLoading(true)

			const movie = await API.fetchMovie(movieId)
			const credits = await API.fetchCredits(movieId)

			const directors = credits.crew.filter(member => member.job === 'Director')

			setState({
				...movie,
				actors: credits.cast,
				directors,
			})

			setLoading(false)
		} catch (err) {
			setError(true)
		}
	}, [movieId])

	useEffect(() => {
		const sessionState = isPersistedState(movieId)
		if (sessionState) {
			setState(sessionState)
			setLoading(false)
			return
		}

		fetchMovie()
	}, [movieId, fetchMovie])

	useEffect(() => {
		sessionStorage.setItem(movieId, JSON.stringify(state))
	}, [movieId, state])

	return { state, loading, error }
}
