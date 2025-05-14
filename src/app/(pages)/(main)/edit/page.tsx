"use client";

import { useState } from "react";
import {
  Tabs,
  Input,
  Button,
  Upload,
  Tag,
  message,
  Typography,
  ConfigProvider,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import "./edit.scss";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

export default function EditPage() {
  const [activeTab, setActiveTab] = useState("question");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLawyer, setIsLawyer] = useState(true); // 模拟用户是否为认证律师

  const questionTags = ["民事纠纷", "合同纠纷", "知识产权", "劳动法", "公司法"];
  const articleCategories = ["法律观点", "案例分析", "法律知识", "热点评论"];

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmitQuestion = () => {
    if (!questionTitle.trim()) {
      message.error("请输入问题标题");
      return;
    }
    if (!questionContent.trim()) {
      message.error("请输入问题描述");
      return;
    }
    if (selectedTags.length === 0) {
      message.error("请至少选择一个话题标签");
      return;
    }

    message.success("问题发布成功");
    // 这里可以添加提交到后端的逻辑
  };

  const handleSubmitArticle = () => {
    if (!isLawyer) {
      message.error("只有认证律师才能发布专业法律文章");
      return;
    }
    if (!articleTitle.trim()) {
      message.error("请输入文章标题");
      return;
    }
    if (!articleContent.trim()) {
      message.error("请输入文章内容");
      return;
    }
    if (selectedTags.length === 0) {
      message.error("请至少选择一个文章分类");
      return;
    }

    message.success("文章发布成功");
    // 这里可以添加提交到后端的逻辑
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setSelectedTags([]);
  };

  return (
    <ConfigProvider theme={{
        token: {
            colorPrimary: '#b83b5e',
        }
    }}>
      <div className="edit-page">
        <Tabs
          activeKey={activeTab}
          animated={{ inkBar: false, tabPane: false }}
          onChange={handleTabChange}
          className="edit-tabs"
        >
          <TabPane tab="发布问题" key="question">
            <div className="tab-content">
              <Text type="secondary" className="permission-hint">
                所有用户都可发布法律相关问题
              </Text>

              <div className="form-section">
                <div className="form-item">
                  <label>问题标题</label>
                  <Input
                    placeholder="请用一句话描述您的法律问题"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                  />
                </div>

                <div className="form-item">
                  <label>问题描述</label>
                  <RichTextEditor
                    value={questionContent}
                    onChange={setQuestionContent}
                    placeholder="请详细描述您遇到的法律问题，例如：事情的经过、您的诉求等..."
                    simple={true}
                  />
                </div>

                <div className="form-item">
                  <label>相关文件（选填）</label>
                  <Upload.Dragger
                    name="files"
                    action="/api/upload"
                    multiple={true}
                    maxCount={5}
                    className="upload-area"
                  >
                    <p className="ant-upload-drag-icon">
                      <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">拖拽文件到此处或点击上传</p>
                    <p className="ant-upload-hint">
                      支持 jpg、png、pdf 格式，单个文件不超过10MB
                    </p>
                  </Upload.Dragger>
                </div>

                <div className="form-item">
                  <label>选择话题标签</label>
                  <div className="tags-container">
                    {questionTags.map((tag) => (
                      <Tag
                        key={tag}
                        className={
                          selectedTags.includes(tag) ? "tag-selected" : ""
                        }
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmitQuestion}
                  >
                    发布问题
                  </Button>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab="发布文章" key="article">
            <div className="tab-content">
              <Text type="secondary" className="permission-hint">
                只认证律师可发布专业法律文章
              </Text>

              {!isLawyer && (
                <div className="lawyer-verification-notice">
                  <InfoCircleOutlined /> 需要完成律师认证才能发布文章
                  <Button type="link">去认证</Button>
                </div>
              )}

              <div className="form-section">
                <div className="form-item">
                  <label>文章标题</label>
                  <Input
                    placeholder="请输入文章标题"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    disabled={!isLawyer}
                  />
                </div>

                <div className="form-item">
                  <label>文章正文</label>
                  <RichTextEditor
                    value={articleContent}
                    onChange={setArticleContent}
                    placeholder="请输入文章内容..."
                    simple={false}
                    disabled={!isLawyer}
                  />
                </div>

                <div className="form-item">
                  <label>文章分类</label>
                  <div className="tags-container">
                    {articleCategories.map((category) => (
                      <Tag
                        key={category}
                        className={
                          selectedTags.includes(category) ? "tag-selected" : ""
                        }
                        onClick={() => isLawyer && handleTagClick(category)}
                        style={{ cursor: isLawyer ? "pointer" : "not-allowed" }}
                      >
                        {category}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmitArticle}
                    disabled={!isLawyer}
                  >
                    发布文章
                  </Button>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </ConfigProvider>
  );
}
