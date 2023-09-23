import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../../helpers/axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	return await axios.get('/posts')
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
	return await axios.get('/tags')
})

const initialState = {
	posts: {
		items: [],
		status: 'loading'
	},
	tags: {
		items: [],
		status: 'loading'
	}
}

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPosts.pending]: state => {
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPosts.rejected]: state => {
			state.posts.items = []
			state.posts.status = 'error'
		},

		[fetchTags.pending]: state => {
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'loaded'
		},
		[fetchTags.rejected]: state => {
			state.tags.items = []
			state.tags.status = 'error'
		}
	}
})

export const postsReducer = postSlice.reducer
