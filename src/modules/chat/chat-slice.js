import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.id = action.payload
    },
  },
})

export const { setChat } = chatSlice.actions

export default chatSlice.reducer