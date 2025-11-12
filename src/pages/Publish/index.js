import { Card, Breadcrumb, Form, Input, Select, Button, Radio, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import './index.scss'
import { useEffect, useState } from 'react'
import { createArticleAPI, getChannelsAPI } from '@/apis/article'
import { type } from '@testing-library/user-event/dist/type'

// const { Option } =Select
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
  const options = channels.map(item => ({ label: item.name, value: item.id }))
  console.log(options)
  
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = (value)=>{
    console.log(value)
    const {title, channel, content, type } = value
    if (imageList.length !== type) return messageApi.warning('封面类型和图片数量不匹配')
    const data = {
      title,
      content,
      cover:{
        type,
        images: imageList.map(item => item.thumbUrl),
        },
      channel_id: channel
    }
    createArticleAPI(data)
  }

  const [imageList, setImageList]=useState([])
  const handleChange = (value)=>{
    console.log('正在上传',value)
    setImageList(value.fileList)
  }
  const [selectValue, setSelectValue] = useState(0)

  return (<div> 
    {contextHolder}
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
        initialValues={{type:0}}
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
            options ={options} 
          >
           {/* {channels.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)} */}
          </Select>
        </Form.Item>

        <Form.Item
          label="封面"
          name="type"
        >
          <Radio.Group
            options={[
              { value: 1, label: '单图' },
              { value: 3, label: '三图' },
              { value: 0, label: '无图' },
            ]}
            onChange={(e)=>setSelectValue(e.target.value)}
          />
        </Form.Item>
        {selectValue>0 && <Form.Item
          label={null}
          name="cover"
        >
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={true}
              maxCount={selectValue}
              // action="http://localhost:3004/upload"
              onChange={handleChange}
              beforeUpload={()=>false}
            >
              <div>
                <PlusOutlined />
              </div>
            </Upload>
        </Form.Item>}

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