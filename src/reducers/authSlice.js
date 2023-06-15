import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user')),
  token: JSON.parse(localStorage.getItem('token')),
  error: null,
  success: false,
}

const baseUrl = import.meta.env['VITE_BASE_API_URL']

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

      localStorage.setItem('token', JSON.stringify(data.token))
      localStorage.setItem('user', JSON.stringify(username))

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
  reducers: {
    logOutUser: (state) => {
      state.user = null
      state.token = null
      localStorage.setItem('token', null)
      localStorage.setItem('user', null)
      console.log('logOutUser')
    },
  },
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
export const { logOutUser } = authSlice.actions
export const selectAuth = (state) => state.auth
export const selectUser = (state) => state.auth.user
