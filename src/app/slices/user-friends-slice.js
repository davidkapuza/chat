import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  friends: []
}

export const userFriendsSlice = createSlice({
  name: 'userFriends',
  initialState,
  reducers: {
    updateFriendsList: (state, action) => {
      state.friends = state.friends.concat(action.payload)
    },
    deleteFriend: (state, action) => {
      state.filter(friend => friend !== action.payload)
    },
    deleteFriendsList: (state) => {
      state.friends = []
    },
  },
})

export const { updateFriendsList, deleteFriend, deleteFriendsList } = userFriendsSlice.actions

export default userFriendsSlice.reducer