/**
 * Lexical 富文本编辑器组件
 *
 * 这是一个基于 Lexical 框架的富文本编辑器示例，支持：
 * - 富文本格式化（粗体、斜体、下划线等）
 * - 工具栏操作
 * - 撤销/重做功能
 * - 自动聚焦
 * - 调试面板（TreeView）
 * - 自定义样式主题
 * - HTML 导入/导出功能
 */
'use client'

// 样式文件导入
import styles from '@/lib/editor/styles.module.css'
// Lexical React 插件导入
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin' // 自动聚焦插件
import { LexicalComposer } from '@lexical/react/LexicalComposer' // 编辑器容器组件
import { ContentEditable } from '@lexical/react/LexicalContentEditable' // 可编辑内容区域
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary' // 错误边界组件
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin' // 历史记录插件（撤销/重做）
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin' // 富文本插件

// Lexical 核心类型和工具函数导入
import {
  $isTextNode, // 判断是否为文本节点的工具函数
  DOMConversionMap, // DOM 转换映射类型
  DOMExportOutput, // DOM 导出输出类型
  DOMExportOutputMap, // DOM 导出输出映射类型
  isHTMLElement, // 判断是否为 HTML 元素的工具函数
  Klass, // 类构造函数类型
  LexicalEditor, // 编辑器实例类型
  LexicalNode, // 节点基类类型
  ParagraphNode, // 段落节点类型
  TextNode, // 文本节点类型
} from 'lexical'

// 自定义组件和配置导入
import ExampleTheme from '@/lib/editor/ExampleTheme' // 编辑器主题配置
import ToolbarPlugin from '@/lib/editor/plugins/ToolbarPlugin' // 工具栏插件
import TreeViewPlugin from '@/lib/editor/plugins/TreeViewPlugin' // 调试面板插件

// 样式解析工具函数导入
import { parseAllowedColor, parseAllowedFontSize } from './styleConfig'

// 占位符文本
const placeholder = 'Enter some rich text...'

/**
 * 移除样式的 DOM 导出函数
 * 用于在导出 HTML 时清理内联样式和类名，保持输出的干净
 *
 * @param editor - Lexical 编辑器实例
 * @param target - 要处理的节点
 * @returns 处理后的 DOM 输出
 */
const removeStylesExportDOM = (editor: LexicalEditor, target: LexicalNode): DOMExportOutput => {
  const output = target.exportDOM(editor)
  if (output && isHTMLElement(output.element)) {
    // 如果是 HTML 元素，移除所有内联样式和类名
    // 同时检查子元素，因为文本节点可能嵌套在 i、b、strong 等标签中
    for (const el of [output.element, ...output.element.querySelectorAll('[style],[class]')]) {
      el.removeAttribute('class') // 移除 class 属性
      el.removeAttribute('style') // 移除 style 属性
    }
  }
  return output
}

/**
 * DOM 导出映射配置
 * 定义了不同节点类型在导出为 HTML 时的处理方式
 */
const exportMap: DOMExportOutputMap = new Map<
  Klass<LexicalNode>,
  (editor: LexicalEditor, target: LexicalNode) => DOMExportOutput
>([
  [ParagraphNode, removeStylesExportDOM], // 段落节点使用样式清理函数
  [TextNode, removeStylesExportDOM], // 文本节点使用样式清理函数
])

/**
 * 获取额外样式的函数
 * 从粘贴的 HTML 元素中解析允许的样式，只保留符合规范的样式
 *
 * @param element - HTML 元素
 * @returns 解析后的样式字符串
 */
const getExtraStyles = (element: HTMLElement): string => {
  // 只解析符合 exportDOM 产生的样式格式的输入
  let extraStyles = ''
  const fontSize = parseAllowedFontSize(element.style.fontSize) // 解析字体大小
  const backgroundColor = parseAllowedColor(element.style.backgroundColor) // 解析背景色
  const color = parseAllowedColor(element.style.color) // 解析文字颜色

  // 只有当样式值有效且不是默认值时才添加
  if (fontSize !== '' && fontSize !== '15px') {
    extraStyles += `font-size: ${fontSize};`
  }
  if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
    extraStyles += `background-color: ${backgroundColor};`
  }
  if (color !== '' && color !== 'rgb(0, 0, 0)') {
    extraStyles += `color: ${color};`
  }
  return extraStyles
}

/**
 * 构建 DOM 导入映射的函数
 * 用于处理从外部粘贴的 HTML 内容，保留允许的样式
 *
 * @returns DOM 转换映射对象
 */
const constructImportMap = (): DOMConversionMap => {
  const importMap: DOMConversionMap = {}

  // 为所有文本节点导入器包装一个函数，用于导入自定义样式
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode)
      if (!importer) {
        return null
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element)
          if (output === null || output.forChild === undefined || output.after !== undefined || output.node !== null) {
            return output
          }
          const extraStyles = getExtraStyles(element)
          if (extraStyles) {
            const { forChild } = output
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent)
                if ($isTextNode(textNode)) {
                  // 将解析的样式添加到文本节点
                  textNode.setStyle(textNode.getStyle() + extraStyles)
                }
                return textNode
              },
            }
          }
          return output
        },
      }
    }
  }

  return importMap
}

/**
 * 编辑器配置对象
 * 定义了编辑器的基本设置和行为
 */
const editorConfig = {
  html: {
    export: exportMap, // HTML 导出配置
    import: constructImportMap(), // HTML 导入配置
  },
  namespace: 'React.js Demo', // 编辑器命名空间
  nodes: [ParagraphNode, TextNode], // 支持的节点类型
  onError(error: Error) {
    throw error // 错误处理：直接抛出错误
  },
  theme: ExampleTheme, // 使用自定义主题
}

/**
 * 富文本编辑器主组件
 *
 * 组件结构说明：
 * 1. LexicalComposer - 编辑器根容器，提供编辑器上下文
 * 2. ToolbarPlugin - 工具栏，提供格式化按钮
 * 3. RichTextPlugin - 富文本功能插件
 * 4. ContentEditable - 实际的可编辑区域
 * 5. HistoryPlugin - 撤销/重做功能
 * 6. AutoFocusPlugin - 自动聚焦功能
 * 7. TreeViewPlugin - 调试面板，显示编辑器内部状态
 */
export default function App() {
  return (
    // 编辑器根容器，传入配置对象
    <LexicalComposer initialConfig={editorConfig}>
      {/* 编辑器外层容器 */}
      <div className={styles['editor-container']}>
        {/* 工具栏组件 - 提供格式化按钮（粗体、斜体等） */}
        <ToolbarPlugin />

        {/* 编辑器内层容器 */}
        <div className={styles['editor-inner']}>
          {/* 富文本插件 - 核心编辑功能 */}
          <RichTextPlugin
            contentEditable={
              // 可编辑内容区域
              <ContentEditable
                className={styles['editor-input']}
                aria-placeholder={placeholder} // 无障碍占位符
                placeholder={<div className={styles['editor-placeholder']}>{placeholder}</div>} // 视觉占位符
              />
            }
            ErrorBoundary={LexicalErrorBoundary} // 错误边界组件
          />

          {/* 历史记录插件 - 提供撤销/重做功能 */}
          <HistoryPlugin />

          {/* 自动聚焦插件 - 页面加载时自动聚焦到编辑器 */}
          <AutoFocusPlugin />

          {/* 调试面板插件 - 显示编辑器内部节点树结构（开发时使用） */}
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  )
}
