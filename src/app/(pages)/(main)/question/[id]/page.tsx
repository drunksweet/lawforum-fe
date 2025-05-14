"use client"

import { useState } from "react"
import { Avatar, Button, Card, Divider, Input, List, Space, Tag, Typography } from "antd"
import { LikeOutlined, MessageOutlined, LikeFilled } from "@ant-design/icons"
import "./question-detail.scss"

const { Title, Text, Paragraph } = Typography

// 模拟数据
const questionData = {
  id: "1",
  title: "关于房屋租赁合同纠纷的法律咨询",
  publishTime: "2024-01-15 14:30",
  viewCount: 1234,
  content: `我是一名租客，去年 12 月与房东签订了为期一年的租赁合同。最近房东突然通知我说要提前解约，理由是他要出售房屋。但是合同中并没有相关条款说明这种情况。我想请教：`,
  questions: [
    "1. 房东是否有权单方面解除合同？",
    "2. 如果房东执意要求我搬离，我该如何维护自己的权益？",
    "3. 我能否要求房东赔偿因提前解约造成的损失？",
  ],
  images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  likeCount: 635,
}

const lawyerAnswer = {
  id: "1",
  name: "张志远",
  title: "律师",
  tag: "已认证",
  specialty: "房产纠纷专家",
  avatar: "/placeholder.svg?height=60&width=60",
  content: `根据《中华人民共和国民法典》第七百二十六条规定，出租人出卖租赁房屋的，应当在出卖之前的合理期限内通知承租人，承租人享有同等条件优先承买的权利。

在您的情况下：

1. 房东无权单方面解除合同，除非合同中明确约定。

2. 建议您：保留所有书面通知和沟通记录；如果房东采取强制措施，及时报警处理。

3. 您可以要求房东赔偿因提前解约造成的直接损失，包括搬家费用、寻找新房支出等。`,
  likeCount: 138,
  replyCount: 0,
}

const userComments = [
  {
    id: "1",
    name: "李美琪",
    avatar: "/placeholder.svg?height=50&width=50",
    content: "我也遇到过类似的情况，最后通过法律途径解决了，建议楼主保留好所有的证据，必要时可以考虑向法院提起诉讼。",
    time: "2024-01-15 15:45",
    likeCount: 45,
    replyCount: 0,
  },
  {
    id: "2",
    name: "王建国",
    avatar: "/placeholder.svg?height=50&width=50",
    content:
      "房东这种行为确实不合法，建议先和房东好好沟通，说明法律规定。如果房东态度强硬，可以考虑向当地房管部门投诉。",
    time: "2024-01-15 16:20",
    likeCount: 32,
    replyCount: 0,
  },
]

const relatedQuestions = [
  {
    id: "1",
    title: "房屋租赁合同到期后房东拒绝退还押金怎么办？",
    viewCount: 2345,
  },
  {
    id: "2",
    title: "租房合同中的这些条款要特别注意",
    viewCount: 1892,
  },
  {
    id: "3",
    title: "房东未经同意擅自入户，租客该如何维权？",
    viewCount: 1567,
  },
  {
    id: "4",
    title: "租房合同纠纷案例分析：房东单方面提价",
    viewCount: 1234,
  },
]

const hotLawyers = [
  {
    id: "1",
    name: "陈雅婷",
    tag: "已认证",
    specialty: "房产纠纷专家",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "刘志强",
    tag: "已认证",
    specialty: "合同纠纷专家",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    name: "吴俊杰",
    tag: "已认证",
    specialty: "民事纠纷专家",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function QuestionDetail({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [commentText, setCommentText] = useState("")

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleComment = () => {
    if (commentText.trim()) {
      // 这里可以添加提交评论的逻辑
      alert("评论已提交")
      setCommentText("")
    }
  }

  return (
    <div className="question-detail-page">
      <div className="main-content">
        <div className="question-section">
          <Title level={2} className="question-title">
            {questionData.title}
          </Title>
          <div className="question-meta">
            <Text type="secondary">
              {questionData.publishTime} · {questionData.viewCount} 次浏览
            </Text>
          </div>
          <Paragraph className="question-content">{questionData.content}</Paragraph>
          {questionData.questions.map((question, index) => (
            <Paragraph key={index} className="question-item">
              {question}
            </Paragraph>
          ))}
          <div className="question-images">
            {questionData.images.map((image, index) => (
              <div key={index} className="image-container">
                <img src={image || "/placeholder.svg"} alt={`问题图片 ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="answer-section">
          <div className="lawyer-info">
            <div className="lawyer-avatar">
              <Avatar size={64} src={lawyerAnswer.avatar} />
            </div>
            <div className="lawyer-details">
              <div className="lawyer-name-tag">
                <Text strong>{lawyerAnswer.name}</Text>
                <Text className="lawyer-title">{lawyerAnswer.title}</Text>
                <Tag color="#b83b5e">{lawyerAnswer.tag}</Tag>
              </div>
              <Text type="secondary">{lawyerAnswer.specialty}</Text>
            </div>
          </div>

          <div className="answer-content">
            <Paragraph>{lawyerAnswer.content}</Paragraph>
          </div>

          <div className="answer-actions">
            <Space>
              <Button type="text" icon={<LikeOutlined />}>
                {lawyerAnswer.likeCount}
              </Button>
              <Button type="text" icon={<MessageOutlined />}>
                回复
              </Button>
            </Space>
            <Button type="primary" className="chat-button">
              发起对话
            </Button>
          </div>
        </div>

        <Divider />

        <div className="comments-section">
          <Title level={4} className="section-title">
            用户评论 ({userComments.length})
          </Title>

          <List
            itemLayout="vertical"
            dataSource={userComments}
            renderItem={(comment) => (
              <List.Item
                key={comment.id}
                className="comment-item"
                actions={[
                  <Button key="like" type="text" icon={<LikeOutlined />}>
                    {comment.likeCount}
                  </Button>,
                  <Button key="reply" type="text" icon={<MessageOutlined />}>
                    回复
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={comment.avatar} />}
                  title={
                    <div className="comment-user">
                      <Text strong>{comment.name}</Text>
                      <Text type="secondary">{comment.time}</Text>
                    </div>
                  }
                  description={<Paragraph>{comment.content}</Paragraph>}
                />
              </List.Item>
            )}
          />
        </div>

        <div className="comment-input">
          <Input.TextArea
            rows={4}
            placeholder="写下您的评论..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button type="primary" onClick={handleComment}>
            评论
          </Button>
        </div>
      </div>

      <div className="sidebar">
        <Card title="相关推荐" className="sidebar-card">
          <List
            itemLayout="vertical"
            dataSource={relatedQuestions}
            renderItem={(item) => (
              <List.Item key={item.id} className="related-item">
                <Text strong className="related-title">
                  {item.title}
                </Text>
                <Text type="secondary">阅读量: {item.viewCount}</Text>
              </List.Item>
            )}
          />
        </Card>

        <Card title="热门律师" className="sidebar-card">
          <List
            itemLayout="horizontal"
            dataSource={hotLawyers}
            renderItem={(lawyer) => (
              <List.Item key={lawyer.id} className="lawyer-item">
                <List.Item.Meta
                  avatar={<Avatar src={lawyer.avatar} />}
                  title={
                    <div className="lawyer-name-tag">
                      <Text strong>{lawyer.name}</Text>
                      <Tag color="#b83b5e">{lawyer.tag}</Tag>
                    </div>
                  }
                  description={lawyer.specialty}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      <div className="bottom-actions">
        <Button
          type="text"
          icon={liked ? <LikeFilled /> : <LikeOutlined />}
          onClick={handleLike}
          className={liked ? "liked" : ""}
        >
          {liked ? questionData.likeCount + 1 : questionData.likeCount}
        </Button>
        <Button type="text" icon={<MessageOutlined />}>
          评论
        </Button>
      </div>
    </div>
  )
}
