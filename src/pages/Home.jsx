import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { fetchPosts, fetchTags } from '../redux/slices/Posts'

import { formatDate } from '../helpers/formatData'

import { CommentsBlock, Post, TagsBlock } from '../components'

export const Home = () => {
	const dispatch = useDispatch()
	const { posts, tags } = useSelector(state => state.posts)

	const isPostsLoading = posts.status === 'loading'
	const isTagsLoading = tags.status === 'loading'

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchTags())
	}, [])

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label='basic tabs example'
			>
				<Tab label='Новые' />
				<Tab label='Популярные' />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : posts.items.data).map(
						(obj, index) =>
							isPostsLoading ? (
								<Post key={index} isLoading={true} />
							) : (
								<Post
									id={obj._id}
									title={obj.title}
									imageUrl={obj.imageUrl}
									user={obj.user}
									createdAt={formatDate(obj.createdAt)}
									viewsCount={obj.viewsCount}
									commentsCount={obj.commentsCount}
									tags={obj.tags}
									isEditable
								/>
							)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items.data} isLoading={isTagsLoading} />
					<CommentsBlock
						items={[
							{
								user: {
									fullName: 'Вася Пупкин',
									avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'
								},
								text: 'Это тестовый комментарий'
							},
							{
								user: {
									fullName: 'Иван Иванов',
									avatarUrl: 'https://mui.com/static/images/avatar/2.jpg'
								},
								text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top'
							}
						]}
						isLoading={false}
					/>
				</Grid>
			</Grid>
		</>
	)
}
