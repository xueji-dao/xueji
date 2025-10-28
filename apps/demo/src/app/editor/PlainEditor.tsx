'use client'

import styles from '@/lib/editor/styles.module.css'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'

import ExampleTheme from '@/lib/editor/ExampleTheme'
import TreeViewPlugin from '@/lib/editor/plugins/TreeViewPlugin'

function Placeholder() {
  return <div className={styles['editor-placeholder']}>Enter some plain text...</div>
}

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error
  },
  // The editor theme
  theme: ExampleTheme,
}

export default function App() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={styles['editor-container']}>
        <div className={styles['editor-inner']}>
          <PlainTextPlugin
            contentEditable={<ContentEditable className={styles['editor-input']} />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  )
}
