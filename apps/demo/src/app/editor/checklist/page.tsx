'use client'

import { AutoFocusExtension, TabIndentationExtension } from '@lexical/extension'
import { HistoryExtension } from '@lexical/history'
import { $createListItemNode, $createListNode, CheckListExtension } from '@lexical/list'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer'
import { RichTextExtension } from '@lexical/rich-text'
import { TailwindExtension } from '@lexical/tailwind'
import { $createTextNode, $getRoot, defineExtension } from 'lexical'

import ExampleTheme from '@/lib/editor/ExampleTheme'
import ToolbarPlugin from '@/lib/editor/plugins/ToolbarPlugin'
import TreeViewPlugin from '@/lib/editor/plugins/TreeViewPlugin'

/**
 * 初始化清单内容
 * 创建一个包含已完成和未完成项目的示例清单
 */
function $prepopulatedRichText() {
  $getRoot().append(
    $createListNode('check').append(
      $createListItemNode(true).append($createTextNode('✅ 已完成的任务项')),
      $createListItemNode(false).append($createTextNode('⏳ 待完成的任务项')),
      $createListItemNode(false).append($createTextNode('📝 另一个待办事项')),
      $createListItemNode(true).append($createTextNode('🎯 已达成的目标')),
      $createListItemNode(false).append($createTextNode('🚀 即将开始的项目')),
    ),
  )
}

/**
 * 占位符配置
 */
const PLACEHOLDER_TEXT = '创建你的待办清单...'
const PLACEHOLDER = <div className="editor-placeholder">{PLACEHOLDER_TEXT}</div>

/**
 * 应用扩展定义
 * 使用新的 Extension 架构和 Tailwind 样式
 */
const appExtension = defineExtension({
  $initialEditorState: $prepopulatedRichText,
  dependencies: [
    TailwindExtension,
    RichTextExtension,
    AutoFocusExtension,
    HistoryExtension,
    CheckListExtension,
    TabIndentationExtension,
  ],
  name: '@xueji/checklist-demo',
  namespace: '@xueji/checklist-demo',
  theme: ExampleTheme,
})

/**
 * 清单编辑器示例页面
 *
 * 功能特性：
 * - 支持复选框列表（可勾选/取消勾选）
 * - 支持 Tab 键缩进和反缩进
 * - 支持嵌套列表结构
 * - 支持键盘快捷键操作
 * - 包含工具栏和调试面板
 */
export default function ChecklistPage() {
  return (
    <div className="text-center font-sans">
      <h1 className="mb-4 text-2xl font-bold">Lexical 清单编辑器示例 (Extension 架构)</h1>
      <p className="mb-4 text-gray-600">
        这个示例展示了如何使用新的 Extension 架构和 Tailwind 样式创建待办清单。
        <br />
        支持复选框交互、嵌套结构和键盘操作。
      </p>

      <div className="mb-4 text-sm text-gray-500">
        <p>💡 使用提示：</p>
        <ul className="list-inside list-disc space-y-1">
          <li>点击复选框切换完成状态</li>
          <li>使用 Tab 键增加缩进</li>
          <li>使用 Shift+Tab 减少缩进</li>
          <li>按 Enter 创建新的清单项</li>
          <li>使用工具栏进行文本格式化</li>
          <li>使用 Tailwind 样式系统</li>
        </ul>
      </div>

      <LexicalExtensionComposer extension={appExtension}>
        <div className="relative mx-auto my-5 max-w-2xl rounded-t-[10px] text-left leading-5 font-normal text-black">
          <ToolbarPlugin />
          <div className="relative bg-white">
            <ContentEditable
              className="relative min-h-[150px] resize-none px-[10px] py-[15px] text-[15px] caret-[#444] outline-0"
              aria-placeholder={PLACEHOLDER_TEXT}
              placeholder={PLACEHOLDER}
            />
            <TreeViewPlugin />
          </div>
        </div>
      </LexicalExtensionComposer>
    </div>
  )
}
