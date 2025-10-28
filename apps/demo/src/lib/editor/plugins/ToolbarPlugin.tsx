import styles from '../styles.module.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'

function Divider() {
  return <div className={styles.divider} />
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const toolbarRef = useRef(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar()
          },
          { editor },
        )
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar()
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor, $updateToolbar])

  return (
    <div className={styles.toolbar} ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        className={`${styles['toolbar-item']} ${styles.spaced}`}
        aria-label="Undo">
        <i className={`${styles.format} ${styles.undo}`} />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        className={styles['toolbar-item']}
        aria-label="Redo">
        <i className={`${styles.format} ${styles.redo}`} />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }}
        className={`${styles['toolbar-item']} ${styles.spaced} ${isBold ? styles.active : ''}`}
        aria-label="Format Bold">
        <i className={`${styles.format} ${styles.bold}`} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
        }}
        className={`${styles['toolbar-item']} ${styles.spaced} ${isItalic ? styles.active : ''}`}
        aria-label="Format Italics">
        <i className={`${styles.format} ${styles.italic}`} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
        }}
        className={`${styles['toolbar-item']} ${styles.spaced} ${isUnderline ? styles.active : ''}`}
        aria-label="Format Underline">
        <i className={`${styles.format} ${styles.underline}`} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }}
        className={`${styles['toolbar-item']} ${styles.spaced} ${isStrikethrough ? styles.active : ''}`}
        aria-label="Format Strikethrough">
        <i className={`${styles.format} ${styles.strikethrough}`} />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
        }}
        className={`${styles['toolbar-item']} ${styles.spaced}`}
        aria-label="Left Align">
        <i className={`${styles.format} ${styles['left-align']}`} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
        }}
        className={`${styles['toolbar-item']} ${styles.spaced}`}
        aria-label="Center Align">
        <i className={`${styles.format} ${styles['center-align']}`} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
        }}
        className={`${styles['toolbar-item']} ${styles.spaced}`}
        aria-label="Right Align">
        <i className={`${styles.format} ${styles['right-align']}`} />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
        }}
        className={styles['toolbar-item']}
        aria-label="Justify Align">
        <i className={`${styles.format} ${styles['justify-align']}`} />
      </button>{' '}
    </div>
  )
}
