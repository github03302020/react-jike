import { Card, Breadcrumb, Form, Input, Select, Button, Radio, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import './index.scss'
import {  useEffect, useState } from 'react'
import { createArticleAPI, getArticleByIdAPI } from '@/apis/article'
import { useChannel }  from '@/hooks/useChannel'
import dayjs from 'dayjs'
import { useForm } from 'antd/es/form/Form'

// const { Option } =Select
const Publish = () => {
  const { channels } = useChannel()
  const options = channels.map(item => ({ label: item.name, value: item.id })) 

  
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
    channel_id: channel,
    pubDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    read_count:0,
    like_count:0,
    comment_count:0,
    status:1
  }
  console.log(data)
  createArticleAPI(data)
}

const [imageList, setImageList]=useState([])
const handleChange = (value)=>{
  console.log('正在上传',value)
  setImageList(value.fileList)
}
const [selectValue, setSelectValue] = useState(0)

const [ searchParams] = useSearchParams()
const [ form ] = useForm()
const id =searchParams.get('id')
const [fileList, setFileList] = useState()
  // const [imageUrl, setImageUrl] = useState()


useEffect(()=>{
    const getArticle=async()=>{
      const res = await getArticleByIdAPI(id)
      const data = res.data
      const {cover} = data
      form.setFieldsValue({
        ...data,
        channel: data.channel_id,
        type: cover.type
        // cover: res.data.cover.images
      })
      setSelectValue(cover.type)
      setFileList(cover.images.map(url => { return { url } }))
      // setImageUrl(res.data.cover.images)

    }
  if (id) {
    getArticle()
  }
},[form,id])

return (<div> 
    {contextHolder}
    <Card title={
      <Breadcrumb
        items={[
          {
            title: (<Link to = '/'>首页</Link>),
          },
          {
            title: `文章${id? '编辑':'发布'}`,
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
        form={form}
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
              fileList={fileList}
            >
              <div>
            {/* {imageUrl ? (
              <img draggable={false} src={imageUrl} alt="pic" style={{ width: '100%' }} />
            ) : */}
                <PlusOutlined />
                {/* } */}
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