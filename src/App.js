import React from 'react'

// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import Header from './components/Header'
import Home from './components/Home'
import Movie from './components/Movie'
import NotFound from './components/NotFound'
import Login from './components/Login'
// Context
import UserProvider from './context'
// Styles
import { GlobalStyle } from './GlobalStyle'

function App() {
	return (
		<Router>
			<UserProvider>
				<Header />
				<GlobalStyle />

				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/:movieId" component={Movie} />
					<Route component={NotFound} />
				</Switch>
			</UserProvider>
		</Router>
	)
}

export default App
