"use client"

import { useState } from "react"
import { Avatar, Button, Card, Divider, Input, List, Space, Tag, Typography } from "antd"
import { LikeOutlined, MessageOutlined, LikeFilled } from "@ant-design/icons"
import "./article-detail.scss"

const { Title, Text, Paragraph } = Typography

// 模拟数据
const articleData = {
  id: "1",
  title: "《民法典》中关于房屋买卖合同的最新司法解释要点分析",
  publishTime: "2024-01-15 14:30",
  viewCount: 1234,
  content: `2024 年初，最高人民法院发布了关于适用《中华人民共和国民法典》处理房屋买卖合同纠纷的案件若干问题的解释，对房屋买卖合同的效力认定、履行规则等作出了进一步明确。本文将对其中的重点内容进行深入解析。`,
  sections: [
    {
      title: "一、关于合同效力的认定",
      content:
        "根据新司法解释第二条规定，房屋买卖合同订立房屋已建成但未取得房屋所有权证书的，不影响合同效力。这一规定充分体现了民法典关于意思自治的基本原则，同时也有利于促进房地产市场的健康发展。",
    },
    {
      title: "二、关于价款支付",
      content:
        "新规明确了分期付款购房中的违约责任认定标准，买受人未按约定支付付款的，出卖人请求解除合同的，人民法院应予支持。这一规定为买卖中的纠纷处理提供了明确的法律依据。",
    },
    {
      title: "三、实践意义",
      content: `此次司法解释的出台，对于规范房地产市场交易秩序，保护交易双方合法权益具有重要意义。通过细化法律适用标准，提高了司法裁判的统一性和可预期性。

信用注意事项：该司法解释在对房屋买卖中的热点问题作出了回应，为当前房地产市场健康发展提供了有力的司法保障。后续将针对具体条款进行系列解读，敬请关注。`,
    },
  ],
  images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  likeCount: 635,
}

const authorInfo = {
  id: "1",
  name: "林雅琴",
  title: "教授",
  tag: "已认证",
  specialty: "民法法律研究所",
  avatar: "/placeholder.svg?height=60&width=60",
  bio: "作者简介：法学博士，某某大学法学院教授，主要研究方向为民商法学。参与《民法典》司法解释起草工作，发表论文数十篇，著有《房地产法律实务精解》等专著。",
  researchAreas: ["民商事法律制度研究", "房地产法律问题研究", "司法实务问题研究"],
  likeCount: 138,
  replyCount: 0,
}

const readerComments = [
  {
    id: "1",
    name: "赵教授",
    avatar: "/placeholder.svg?height=50&width=50",
    content:
      "本文对新司法解释的分析非常到位，特别是对房屋买卖合同效力认定的解读很有见地，建议后续可以进一步探讨合同中的特殊条款。",
    time: "2024-01-15 15:45",
    likeCount: 45,
    replyCount: 0,
  },
  {
    id: "2",
    name: "张律师",
    avatar: "/placeholder.svg?height=50&width=50",
    content:
      "从司法实践角度来看，这份解释对于处理房屋买卖合同纠纷提供了更明确的指引。特别是对首付款支付违约的认定标准，将大大提高案件处理效率。",
    time: "2024-01-15 16:20",
    likeCount: 32,
    replyCount: 0,
  },
]

const relatedArticles = [
  {
    id: "1",
    title: "《民法典》物权编司法解释要点解读",
    viewCount: 3245,
  },
  {
    id: "2",
    title: "房屋买卖中的优先购买权纠纷详解",
    viewCount: 2692,
  },
  {
    id: "3",
    title: "商品房预售合同效力认定的司法实践",
    viewCount: 2567,
  },
  {
    id: "4",
    title: "房地产交易中的合同解除制度研究",
    viewCount: 2234,
  },
]

const recommendedAuthors = [
  {
    id: "1",
    name: "陈雅婷",
    tag: "特邀专家",
    specialty: "民商法学教授",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "刘志强",
    tag: "特邀专家",
    specialty: "法学研究员",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    name: "吴俊杰",
    tag: "特邀专家",
    specialty: "法律评论员",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function ArticleDetail({ params }: { params: { id: string } }) {
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
    <div className="article-detail-page">
      <div className="main-content">
        <div className="article-section">
          <Title level={2} className="article-title">
            {articleData.title}
          </Title>
          <div className="article-meta">
            <Text type="secondary">
              {articleData.publishTime} · {articleData.viewCount} 次浏览
            </Text>
          </div>
          <Paragraph className="article-content">{articleData.content}</Paragraph>

          {articleData.sections.map((section, index) => (
            <div key={index} className="article-section-content">
              <Title level={4} className="section-title">
                {section.title}
              </Title>
              <Paragraph>{section.content}</Paragraph>
              {index === 0 && (
                <div className="article-images">
                  {articleData.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="image-container">
                      <img src={image || "/placeholder.svg"} alt={`文章图片 ${imgIndex + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="author-section">
          <div className="author-info">
            <div className="author-avatar">
              <Avatar size={64} src={authorInfo.avatar} />
            </div>
            <div className="author-details">
              <div className="author-name-tag">
                <Text strong>{authorInfo.name}</Text>
                <Text className="author-title">{authorInfo.title}</Text>
                <Tag color="#b83b5e">{authorInfo.tag}</Tag>
              </div>
              <Text type="secondary">{authorInfo.specialty}</Text>
            </div>
          </div>

          <div className="author-bio">
            <Paragraph>{authorInfo.bio}</Paragraph>
            <div className="research-areas">
              <Text strong>研究领域：</Text>
              <ul>
                {authorInfo.researchAreas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="author-actions">
            <Space>
              <Button type="text" icon={<LikeOutlined />}>
                {authorInfo.likeCount}
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
            读者评论 ({readerComments.length})
          </Title>

          <List
            itemLayout="vertical"
            dataSource={readerComments}
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
            dataSource={relatedArticles}
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

        <Card title="推荐作者" className="sidebar-card">
          <List
            itemLayout="horizontal"
            dataSource={recommendedAuthors}
            renderItem={(author) => (
              <List.Item key={author.id} className="author-item">
                <List.Item.Meta
                  avatar={<Avatar src={author.avatar} />}
                  title={
                    <div className="author-name-tag">
                      <Text strong>{author.name}</Text>
                      <Tag color="#b83b5e">{author.tag}</Tag>
                    </div>
                  }
                  description={author.specialty}
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
          {liked ? articleData.likeCount + 1 : articleData.likeCount}
        </Button>
        <Button type="text" icon={<MessageOutlined />}>
          评论
        </Button>
      </div>
    </div>
  )
}
