import { Card, Breadcrumb, Form, Radio, Select, DatePicker, Table, Button, Tag, Space, Popconfirm } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './index.scss'
import { useChannel } from '@/hooks/useChannel'
import defaultImg from '@/assets/default.webp'
import { useEffect, useState } from 'react'
import { deleteArticleAPI, getArticleListAPI } from '@/apis/article'

const { RangePicker } = DatePicker;


const Article = ()=>{
  const { channels } = useChannel()
  const options = channels.map(item => ({ label: item.name, value: item.id })) 
  const [ articleList, setArticleList] = useState([])
  const [ totalCount, setTotalCount] = useState(0)

  const navigate = useNavigate()

  const [reqData, setReqData]=useState({
    status: '',
    channel_id: '',
    begin_pubDate:'',
    end_pubDate:'',
    // page:1,
    // per_page:4
  })
  useEffect(()=>{
    const getArticleList = async()=>{
      const res = await getArticleListAPI(reqData)
      let list = res.data
      console.log('list',list)
      console.log('reqData',reqData)
      if (list.length>0){
        if (reqData.status){
          console.log(1)
          list = list.filter(item=>item.status===+reqData.status)
          console.log('list1', list)
        }
        if (reqData.channel_id){
          console.log(2)
          list = list.filter(item=>item.channel_id===+reqData.channel_id)
        }
        if (reqData.begin_pubDate && reqData.end_pubDate ){
          console.log(3)
          list = list.filter(item => item.pubDate >= reqData.begin_pubDate && item.pubDate <= reqData.end_pubDate)
        }
      }
      // setArticleList(res.data)
      // setTotalCount(res.data.length)
      setArticleList(list)
      setTotalCount(list.length)
    }
    getArticleList()
  },[reqData])

  const onFinish = (data)=>{
    console.log('formData',data)
    setReqData({
      ...reqData,
      status: data.status==='all'?'':data.status,
      channel_id: data.channel,
      begin_pubDate: data.date?data.date[0].format('YYYY-MM-DD 00:00:00'):'',
      end_pubDate: data.date?data.date[1].format('YYYY-MM-DD 23:59:59'):'',
    })
  }


  const status = {
    1: <Tag color='red'>草稿</Tag>,
    2: <Tag color='yellow'>待审核</Tag>,
    3: <Tag color='green'>审核通过</Tag>,
  }
  
  const onConfirm = async(id)=>{
    await deleteArticleAPI(id)
    setReqData({
      ...reqData
    })
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
      render: (data)=>{
        return (
          <Space>
            <Button color="primary" shape="circle" icon={<EditOutlined /> } variant="solid" onClick={()=>navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="确认"
              description="你确定要删除码?"
              onConfirm={()=>onConfirm(data.id)}
              okText="Yes"
              cancelText="No"
            >
            <Button color="danger" shape="circle" icon={<DeleteOutlined />} variant="solid" /> 
            </Popconfirm> 
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
              title: '文章管理',
            }
          ]}
        />
      }
    >
      <Form
        // labelCol={{ span: 2 }}
        // wrapperCol={{ span: 10 }}
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{ status: '', channel_id:'',date:'' }}
      >
        <Form.Item
          label="状态"
          name="status"
        >
          <Radio.Group
            options={[
              { value: 'all', label: '全部' },
              { value: '1', label: '草稿' },
              { value: '2', label: '待审核' },
              { value: '3', label: '审核通过' },
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
    <Table dataSource={articleList} columns={columns} pagination={{
      defaultCurrent: 1,
      total: totalCount,
      pageSize: 3
    }}/>       
    </Card>
  </div>)
}

export default Article