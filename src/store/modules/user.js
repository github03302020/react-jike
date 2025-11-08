import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
  name: 'user',
  initialState: {
    // token: localStorage.getItem('token_key') || ''
    token: getToken() || '',
    userInfo: {}
  },
  reducers:{
    setToken( state, action){
      state.token = action.payload
      // localStorage.setItem('token_key',action.payload)
      _setToken(action.payload)
    },
    setUserInfo( state, action){
      state.userInfo = action.payload
    }
  }
})

const { setToken, setUserInfo } = userStore.actions

const fetchToken = (loginForm)=>{
  return async (dispatch)=>{
    const res = await request.post('/authorizations', loginForm)
    console.log(res)
    // dispatch(setToken(res.data.token))
    dispatch(setToken('skdiLoeJ03jLuwhHL0jl3K;#JdKk'))
  }
}

const fetchUserInfo = ()=>{
  return async(dispatch)=>{
    const res = await request.get('/profile')
    dispatch(setUserInfo(res.data))
  }
}
const userReducer = userStore.reducer

export { setToken, fetchToken, fetchUserInfo}
export default userReducer