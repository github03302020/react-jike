import { Card, Breadcrumb, Form, Radio, Select, DatePicker, Table, Button } from 'antd'
import { Link } from 'react-router-dom'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.scss'
import { useChannel } from '@/hooks/useChannel'

const { RangePicker } = DatePicker;


const Article = ()=>{
  const { channels } = useChannel()
  const options = channels.map(item => ({ label: item.name, value: item.id })) 
  const dataSource = [
    {
      id: '1',
      cover:
       <img src='https://img1.baidu.com/it/u=4111161705,1085912078&fm=253&fmt=auto&app=138&f=JPEG?w=805&h=800' alt='pic' className='img'/>
       ,       
      title: '关于前端未来',
      status: '草稿',
      pubdate: '2025-10-31',
      read_count: 3,
      comment_count: 1,
      like_count: 2,
      operations: <div><EditOutlined className='icons blue'/><DeleteOutlined className='icons red'/></div>
    },
  ];
  
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
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
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key: 'pubdate',
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
      dataIndex: 'operations',
      key: 'operations',
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

    <Card title="根据筛选条件共查到5条结果">
      <Table dataSource={dataSource} columns={columns} />
    </Card>
  </div>)
}

export default Article