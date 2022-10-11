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
  },
})

export const { updateUser, removeUser } = userSlice.actions

export default userSlice.reducer