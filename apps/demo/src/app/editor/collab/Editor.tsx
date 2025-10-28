'use client'

import styles from '@/lib/editor/styles.module.css'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

import ToolbarPlugin from '@/lib/editor/plugins/ToolbarPlugin'
import TreeViewPlugin from '@/lib/editor/plugins/TreeViewPlugin'

function Placeholder() {
  return <div className={styles['editor-placeholder']}>Enter some rich text...</div>
}

export default function Editor() {
  return (
    <div className={styles['editor-container']}>
      <ToolbarPlugin />
      <div className={styles['editor-inner']}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles['editor-input']} />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoFocusPlugin />
        <TreeViewPlugin />
      </div>
    </div>
  )
}
