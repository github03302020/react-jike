import { Card, Breadcrumb, Form, Input, Select, Button } from 'antd'
import { Link } from 'react-router-dom'
const Publish = () => {
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
        wrapperCol={{ span: 16 }}
        autoComplete="off"
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
            options={[
              { label: 'male', value: 'male' },
              { label: 'female', value: 'female' },
              { label: 'other', value: 'other' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入内容！' }]}
        >

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