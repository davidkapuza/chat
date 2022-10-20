import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  with: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat: (state, action) => {
      Object.assign(state, action.payload)
    },
  },
})

export const { setChat } = chatSlice.actions

export default chatSlice.reducer