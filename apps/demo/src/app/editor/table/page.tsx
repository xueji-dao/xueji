'use client'

import { AutoFocusExtension } from '@lexical/extension'
import { HistoryExtension } from '@lexical/history'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer'
import { TreeViewExtension } from '@lexical/react/TreeViewExtension'
import { RichTextExtension } from '@lexical/rich-text'
import { INSERT_TABLE_COMMAND, TableExtension } from '@lexical/table'
import { TailwindExtension } from '@lexical/tailwind'
import { $createParagraphNode, $getRoot, defineExtension, LexicalEditor } from 'lexical'

import ExampleTheme from '@/lib/editor/ExampleTheme'
import ToolbarPlugin from '@/lib/editor/plugins/ToolbarPlugin'
import TreeViewPlugin from '@/lib/editor/plugins/TreeViewPlugin'

/**
 * 初始化编辑器状态
 * 创建段落并插入表格
 */
const $updateEditorState = (editor: LexicalEditor) => {
  $getRoot().append($createParagraphNode()).selectEnd()
  editor.dispatchCommand(INSERT_TABLE_COMMAND, {
    columns: String(3),
    includeHeaders: true,
    rows: String(3),
  })
}

/**
 * 占位符配置
 */
const PLACEHOLDER_TEXT = '输入一些富文本内容...'
const PLACEHOLDER = <div className="editor-placeholder">{PLACEHOLDER_TEXT}</div>

/**
 * 应用扩展定义
 * 使用新的 Extension 架构
 */
const appExtension = defineExtension({
  $initialEditorState: $updateEditorState,
  dependencies: [
    TailwindExtension,
    RichTextExtension,
    AutoFocusExtension,
    HistoryExtension,
    TreeViewExtension,
    TableExtension,
  ],
  name: '@xueji/table-demo',
  namespace: '@xueji/table-demo',
  theme: ExampleTheme,
})

/**
 * 表格编辑器示例页面
 *
 * 功能特性：
 * - 自动插入 3x3 表格（包含表头）
 * - 支持表格单元格编辑
 * - 支持表格行列操作
 * - 支持表格样式设置
 * - 包含工具栏和调试面板
 */
export default function TablePage() {
  return (
    <div className="text-center font-sans">
      <h1 className="mb-4 text-2xl font-bold">Lexical 表格编辑器示例 (Extension 架构)</h1>
      <p className="mb-4 text-gray-600">
        这个示例展示了如何使用新的 Extension 架构和 Tailwind 样式。
        <br />
        支持表格的创建、编辑、单元格选择、行列操作等完整功能。
      </p>

      <div className="mb-4 text-sm text-gray-500">
        <p>💡 使用提示：</p>
        <ul className="list-inside list-disc space-y-1">
          <li>点击单元格进行编辑</li>
          <li>右键单元格查看更多操作</li>
          <li>拖拽边框调整列宽</li>
          <li>使用工具栏进行文本格式化</li>
          <li>使用 Tailwind 样式系统</li>
        </ul>
      </div>

      <LexicalExtensionComposer extension={appExtension}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <ContentEditable className="editor-input" aria-placeholder={PLACEHOLDER_TEXT} placeholder={PLACEHOLDER} />
            <TreeViewPlugin />
          </div>
        </div>
      </LexicalExtensionComposer>
    </div>
  )
}
