import { useEffect } from "react"
import { request } from "@/utils"

const Layout = ()=>{
  useEffect(()=>{
   request.get('/authorizations')
  },[])
  return (
    <div>
      this is Layout
    </div>
  )
}

export default Layout