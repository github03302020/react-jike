import { Layout, Menu } from 'antd';
import { HomeOutlined, RadiusUprightOutlined, EditOutlined, PoweroffOutlined } from '@ant-design/icons';
import headpic from '@/assets/hd.webp'
import './index.scss'
import { Outlet, useNavigate, useLocation} from 'react-router-dom';

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
  return (
    < Layout  className='layout'>
      <Header className='header'>
        <div className="headpic"><img src={headpic} alt='header'/></div>    
        <div className='right'> <span>user.name</span>  <span><PoweroffOutlined />退出 </span> </div>    
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