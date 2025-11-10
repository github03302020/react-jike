import { createSlice } from "@reduxjs/toolkit";
import { removeToken} from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";
import { loginAPI, getProfileAPI } from "@/apis/user";

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
    },
    clearUserInfo(state){
      state.token=''
      state.userInfo={}
      removeToken()
    }
  }
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions

const fetchToken = (loginForm)=>{
  return async (dispatch)=>{
    const res = await loginAPI(loginForm)
    console.log(res)
    // dispatch(setToken(res.data.token))
    dispatch(setToken('skdiLoeJ03jLuwhHL0jl3K;#JdKk'))
  }
}

const fetchUserInfo = ()=>{
  return async(dispatch)=>{
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}
const userReducer = userStore.reducer

export { setToken, fetchToken, fetchUserInfo, clearUserInfo}
export default userReducer