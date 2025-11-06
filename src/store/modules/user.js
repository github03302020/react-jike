import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: ''
  },
  reducers:{
    setToken( state, action){
      state.token = action.payload
    }
  }
})

const { setToken } = userStore.actions

const fetchToken = (loginForm)=>{
  return async (dispatch)=>{
    const res = await request.post('/authorizations', loginForm)
    dispatch(setToken(res.token))
  }
}
const userReducer = userStore.reducer

export { setToken, fetchToken}
export default userReducer