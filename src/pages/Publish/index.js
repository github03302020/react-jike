import { Card, Breadcrumb, Form, Input, Select, Button } from 'antd'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import './index.scss'
import { useEffect, useState } from 'react'
import { getChannelsAPI } from '@/apis/article'

const { Option } =Select
const Publish = () => {
  const [channels, setChannels] = useState([])
  useEffect(()=>{
    const getChannels = async()=>{
      const res = await getChannelsAPI()
      setChannels(res.data)
    }
    getChannels()
  },[])
  console.log(channels)
  // const options = channels.map(item => ({ label: item.name, value: item.id }))
  // console.log(options)

  const onFinish = (value)=>{
    console.log(value)
  }
  return (<div> 
    <Card title={
      <Breadcrumb
        items={[
          {
            title: (<Link to = '/'>首页</Link>),
          },
          {
            title: '文章发布',
          }
        ]}
      />
    }>
      <Form 
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题！' }]}
        >
          <Input placeholder='请输入文章标题'/>
        </Form.Item>
        <Form.Item
          label="频道"
          name="channel"
          rules={[{ required: true, message: '请选择文章频道！' }]}
        >
          <Select
            allowClear
            placeholder="请选择文章频道"
            // options ={options} 
            // options={[
            //   { label: 'male', value: 'male' },
            //   { label: 'female', value: 'female' },
            //   { label: 'other', value: 'other' },
            // ]}
          >
           {channels.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          wrapperCol={{ span: 16 }}
          rules={[{ required: true, message: '请输入内容！' }]}
        >
            <ReactQuill 
              theme="snow"
              className="publish-quill"
              placeholder="请输入文章内容"
            />
        </Form.Item>
        <Form.Item 
          label={null}
        > 
            <Button size="large" type="primary" htmlType="submit">文章发布</Button>
        </Form.Item>
      </Form>
   
    </Card>
  </div>)
}

export default Publish