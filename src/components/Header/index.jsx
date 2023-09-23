import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'

import { logout, selectIsAuth } from '../../redux/slices/auth'

import styles from './Header.module.scss'

export const Header = () => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)

	const onClickLogout = () => {
		if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
			dispatch(logout())
			window.localStorage.removeItem('token')
		}
	}

	return (
		<div className={styles.root}>
			<Container maxWidth='lg'>
				<div className={styles.inner}>
					<a className={styles.logo} href='/'>
						<div>BLOG</div>
					</a>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<a href='/posts/create'>
									<Button variant='contained'>Написать статью</Button>
								</a>
								<Button
									onClick={onClickLogout}
									variant='contained'
									color='error'
								>
									Выйти
								</Button>
							</>
						) : (
							<>
								<a href='/login'>
									<Button variant='outlined'>Войти</Button>
								</a>
								<a href='/register'>
									<Button variant='contained'>Создать аккаунт</Button>
								</a>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	)
}
