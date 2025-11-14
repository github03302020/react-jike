import { Card, Breadcrumb, Form, Radio, Select, DatePicker, Table, Button, Tag, Space } from 'antd'
import { Link } from 'react-router-dom'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.scss'
import { useChannel } from '@/hooks/useChannel'
import defaultImg from '@/assets/default.webp'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/apis/article'

const { RangePicker } = DatePicker;


const Article = ()=>{
  const { channels } = useChannel()
  const options = channels.map(item => ({ label: item.name, value: item.id })) 
  const [ articleList, setArticleList] = useState([])
  const [ totalCount, setTotalCount] = useState(0)
  useEffect(()=>{
    const getArticleList = async()=>{
      const res = await getArticleListAPI()
      setArticleList(res.data)
      setTotalCount(res.data.length)
    }
    getArticleList()
  },[])
  const dataSource = [
    {
      id: '1',
      cover:{
        images:[]
      },    
      title: '关于前端未来',
      status: '草稿',
      pubdate: '2025-10-31',
      read_count: 3,
      comment_count: 1,
      like_count: 2,
      // operations: <div><EditOutlined className='icons blue'/><DeleteOutlined className='icons red'/></div>
    },
  ];

  const status = {
    1: <Tag color='red'>草稿</Tag>,
    2: <Tag color='yellow'>待审核</Tag>,
    3: <Tag color='green'>审核通过</Tag>,
  }
  
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: cover=>{
        return (
          <img src={cover.images[0] || defaultImg} width={80} height={60} alt='pic'/>
        )
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: data=> status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubDate',
      key: 'pubDate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      key: 'like_count',
    },
    {
      title: '操作',
      key: 'operations',
      render: ()=>{
        return (
          <Space>
            <Button color="primary" shape="circle" icon={<EditOutlined />} variant="solid"/>
            <Button color="danger" shape="circle" icon={<DeleteOutlined />} variant="solid" />  
          </Space>
        )
      }
    },
  ];
  return (<div> 
    <Card
      title={
        <Breadcrumb
          items={[
            {
              title: (<Link to='/'>首页</Link>),
            },
            {
              title: '文章发布',
            }
          ]}
        />
      }
    >
      <Form
        // labelCol={{ span: 2 }}
        // wrapperCol={{ span: 10 }}
        autoComplete="off"
        // onFinish={onFinish}
        // initialValues={{ type: 0 }}
      >
        <Form.Item
          label="状态"
          name="status"
        >
          <Radio.Group
            options={[
              { value: 'all', label: '全部' },
              { value: 'draft', label: '草稿' },
              { value: 'approved', label: '审核通过' },
            ]}
            // onChange={(e) => setSelectValue(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="频道"
          name="channel"
          wrapperCol={{ span: 3 }}
          // rules={[{ required: true, message: '请选择文章频道！' }]}
        >
          <Select
            allowClear
            placeholder="请选择频道"
            options={options}
          >
            {/* {channels.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)} */}
          </Select>
        </Form.Item>

        <Form.Item
          label="日期"
          name="date"
        >
          <RangePicker locale={locale} />
        </Form.Item>

        <Form.Item
          // label={null}
          wrapperCol={{ offset:1 }}
        >
          <Button size="middle" type="primary" htmlType="submit">筛选</Button>
        </Form.Item>
      </Form>
    </Card>

    <Card title={`根据筛选条件共查到${totalCount}条结果`}>
      <Table dataSource={articleList} columns={columns} />
    </Card>
  </div>)
}

export default Article