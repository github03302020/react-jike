import { Layout, Menu, Popconfirm } from 'antd';
import { HomeOutlined, RadiusUprightOutlined, EditOutlined, PoweroffOutlined } from '@ant-design/icons';
import headpic from '@/assets/hd.webp'
import './index.scss'
import { Outlet, useNavigate, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user';
import { useDispatch, useSelector } from 'react-redux';

const { Header, Sider, Content} = Layout;

const items = [
  {key: '/',
   label: '首页',
   icon: <HomeOutlined/>
  },
  {key: '/article',
   label: '管理文章',
   icon: <RadiusUprightOutlined />
  },
  {key: '/publish',
   label: '创建文章',
   icon: <EditOutlined />
  }
 ]

const GeekLayout = ()=>{
  const navigate = useNavigate()
  const onMenuClick = (route)=>{
    navigate(route.key)
  }
  const location = useLocation()

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUserInfo())
  },[dispatch])
  const name =useSelector(state=>state.user.userInfo.name)

  const confirm = ()=>{
    console.log('确认退出')
    dispatch(clearUserInfo())
    navigate('/login')
  }
  return (
    < Layout className='layout'>
      <Header className='header'>
        <div className="headpic"><img src={headpic} alt='header'/></div>    
        <div className='right'> 
          <span style={{marginRight: '20px'}}>{name}</span>  
          <span style={{paddingRight: '10px'}}>
            <Popconfirm
              title="温馨提示"
              description="你真的要退出吗?"
              onConfirm={confirm}
              okText="确认"
              cancelText="取消"
            >
              <PoweroffOutlined />退出 
            </Popconfirm>            
          </span> 
        </div>    
      </Header>
      <Layout>
        <Sider width="25%">
          <Menu theme="dark" 
          mode="inline" 
          selectedKeys={ location.pathname }
          items={items} 
          onClick={onMenuClick}/>
        </Sider>
        <Content style={{ padding: '20px' }}>
          <Outlet />
        </Content>
        {/* <Layout style={{padding: '20px'}}>
          <Outlet/>
        </Layout> */}
      </Layout>
    </Layout >
  )
}

export default GeekLayout