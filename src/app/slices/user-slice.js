import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uid: null,
  displayName: null,
  email: null,
  photoURL: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("update fires with", action.payload)

      Object.assign(state, action.payload)
    },
    removeUser: (state) => {
      Object.assign(state, initialState)
    }
  },
})

export const { updateUser, removeUser, deleteFriend, resetFriends } = userSlice.actions

export default userSlice.reducer