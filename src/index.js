import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App'
import './index.scss'
import store from './redux/store'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</Provider>
)
