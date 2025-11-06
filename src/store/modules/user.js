import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token_key') || ''
  },
  reducers:{
    setToken( state, action){
      state.token = action.payload
      localStorage.setItem('token_key',action.payload)
    }
  }
})

const { setToken } = userStore.actions

const fetchToken = (loginForm)=>{
  return async (dispatch)=>{
    const res = await request.post('/authorizations', loginForm)
    console.log(res)
    // dispatch(setToken(res.data.token))
    dispatch(setToken('skdiLoeJ03jLuwhHL0jl3K;#JdKk'))
  }
}
const userReducer = userStore.reducer

export { setToken, fetchToken}
export default userReducer