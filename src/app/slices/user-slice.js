import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    removeUser: (state) => {
      state.user = initialState
    },
    updateUser: (state, action) => {
      state.user = {...state.user, ...action.payload}
    },
  },
})

export const { setUser, removeUser, updateUser } = userSlice.actions

export default userSlice.reducer