import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
  friends: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      Object.assign(state, action.payload)
    },
    removeUser: (state) => {
      Object.assign(state, initialState)
    },
    deleteFriend: (state, action) => {
      state.friends = state.friends.filter(uid => uid !== action.payload)
    }
  },
})

export const { updateUser, removeUser, deleteFriend } = userSlice.actions

export default userSlice.reducer