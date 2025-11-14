import { getChannelsAPI } from '@/apis/article'
import { useState,useEffect } from 'react'

const useChannel = ()=>{
   const [channels, setChannels] = useState([])
    useEffect(()=>{
      const getChannels = async()=>{
        const res = await getChannelsAPI()
        setChannels(res.data)
      }
      getChannels()
    },[])
  return { channels }
}

export { useChannel }