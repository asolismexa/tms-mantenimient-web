import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  user: localStorage.getItem('user') || null,
  token: localStorage.getItem('token') || null,
  error: null,
  success: false,
}

const baseUrl = 'https://localhost:44348'

const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `${baseUrl}/api/auth/login`,
        { username, password },
        config,
      )
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', username)

      return {
        user: username,
        token: data.token,
      }
    } catch (error) {
      localStorage.setItem('token', null)
      localStorage.setItem('user', null)
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true
        state.token = payload.token
        state.user = payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default authSlice.reducer
export { loginUser }
export const selectAuth = (state) => state.auth
export const selectUser = (state) => state.auth.user
