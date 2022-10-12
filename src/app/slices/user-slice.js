import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  props: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.props = {...state.props, ...action.payload}
    },
    removeUser: (state) => {
      state.props = initialState
    },
    deleteFriend: (state, action) => {
      state.props.friends = state.props.friends.filter(uid => uid !== action.payload)
    }
  },
})

export const { updateUser, removeUser, deleteFriend } = userSlice.actions

export default userSlice.reducer