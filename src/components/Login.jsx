import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import API from '../API'
// Components
import Button from './Button'
// Styles
import { Wrapper } from './Login.styles'
// Context
import { Context } from '../context'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)

	const [, setUser] = useContext(Context)
	const history = useHistory()

	const handleInput = e => {
		const { name, value } = e.target
		if (name === 'username') setUsername(value)
		if (name === 'password') setPassword(value)
	}

	const handleSubmit = async () => {
		setError(false)
		try {
			const requestToken = await API.getRequestToken()
			const sessionId = await API.authenticate(requestToken, username, password)

			setUser({ sessionId: sessionId.session_id, username })
			history.push('/')
		} catch (err) {
			setError(true)
		}
	}

	return (
		<Wrapper>
			{error && <div className="error">There was some error!</div>}
			<label>Username</label>
			<input
				type="text"
				value={username}
				name="username"
				onChange={handleInput}
			/>
			<input
				type="password"
				value={password}
				name="password"
				onChange={handleInput}
			/>
			<Button text="Login" callback={handleSubmit} />
		</Wrapper>
	)
}

export default Login
