import { Form, Button, Input, Card, message, } from "antd"
import logo from "@/assets/logo.png"
import "./index.scss"
import { useDispatch } from "react-redux"
import { fetchToken } from "@/store/modules/user"
import { useNavigate } from "react-router-dom"
const Login = ()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (value)=>{
    console.log(value)
    await dispatch(fetchToken(value))
    messageApi.success('登录成功！');
    setTimeout(() => { navigate('/') },500)
    // navigate('/')
  }
  return (
    <div className="login">
      {contextHolder}
      <Card>
        <img src={logo} alt="logo"></img>
       <Form autoComplete="off" onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item 
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern:/^1[3-9]\d{9}$/, message:'请输入正确的手机号'}
            ]}
          >
            <Input size="large" placeholder="请输入手机号"/>
          </Form.Item>
          <Form.Item
            name="code"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login