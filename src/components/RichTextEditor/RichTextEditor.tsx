"use client"

import type React from "react"
import { useRef } from "react"
import { Button, Tooltip, Space } from "antd"
import {
  BoldOutlined,
  ItalicOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  LinkOutlined,
  PictureOutlined,
} from "@ant-design/icons"
import "./RichTextEditor.scss"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  simple?: boolean
  disabled?: boolean
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "请输入内容...",
  simple = false,
  disabled = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null)

  const handleCommand = (command: string, value?: string) => {
    if (disabled) return

    document.execCommand(command, false, value)

    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      onChange(content)
    }
  }

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      onChange(content)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
  }

  const handleImageUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      if (target.files && target.files[0]) {
        const file = target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          document.execCommand("insertImage", false, result)
          handleContentChange()
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleLinkInsert = () => {
    const url = prompt("请输入链接地址:")
    if (url) {
      document.execCommand("createLink", false, url)
      handleContentChange()
    }
  }

  return (
    <div className={`rich-text-editor ${disabled ? "disabled" : ""}`}>
      <div className="editor-toolbar">
        <Space>
          <Tooltip title="加粗">
            <Button icon={<BoldOutlined />} onClick={() => handleCommand("bold")} disabled={disabled} />
          </Tooltip>

          <Tooltip title="斜体">
            <Button icon={<ItalicOutlined />} onClick={() => handleCommand("italic")} disabled={disabled} />
          </Tooltip>

          <Tooltip title="无序列表">
            <Button
              icon={<UnorderedListOutlined />}
              onClick={() => handleCommand("insertUnorderedList")}
              disabled={disabled}
            />
          </Tooltip>

          {!simple && (
            <>
              <Tooltip title="有序列表">
                <Button
                  icon={<OrderedListOutlined />}
                  onClick={() => handleCommand("insertOrderedList")}
                  disabled={disabled}
                />
              </Tooltip>

              <Tooltip title="插入链接">
                <Button icon={<LinkOutlined />} onClick={handleLinkInsert} disabled={disabled} />
              </Tooltip>

              <Tooltip title="插入图片">
                <Button icon={<PictureOutlined />} onClick={handleImageUpload} disabled={disabled} />
              </Tooltip>
            </>
          )}
        </Space>
      </div>

      <div
        ref={editorRef}
        className="editor-content"
        contentEditable={!disabled}
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleContentChange}
        onPaste={handlePaste}
        data-placeholder={placeholder}
      />
    </div>
  )
}

export default RichTextEditor
