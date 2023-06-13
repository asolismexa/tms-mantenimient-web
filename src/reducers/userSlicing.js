import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  password: '',
  token: '',
  isAuth: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
}

const userSlicing = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoading = true
    },
  },
})

export const { login } = userSlicing.actions
export default userSlicing.reducer