import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const userFriendsSlice = createSlice({
  name: 'user-friends',
  initialState,
  reducers: {
    updateFriendsList: (state, action) => {
      state.push(...action.payload)
    },
    deleteFriend: (state, action) => {
      state.filter(friend => friend !== action.payload)
    },
    deleteFriendsList: (state) => {
      state = initialState
    },
  },
})

export const { updateFriendsList, deleteFriend, deleteFriendsList } = userFriendsSlice.actions

export default userFriendsSlice.reducer