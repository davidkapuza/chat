import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  friends: [],
}

export const userFriendsSlice = createSlice({
  name: 'userFriends',
  initialState,
  reducers: {
    updateFriendsList: (state, action) => {
      state.friends.push(action.payload)
    },
    deleteFriend: (state, action) => {
      state.friends.filter(friend => friend !== action.payload)
    },
    deleteFriendsList: (state) => {
      state.friends = initialState
    },
  },
})

export const { updateFriendsList, deleteFriend, deleteFriendsList } = userFriendsSlice.actions

export default userFriendsSlice.reducer