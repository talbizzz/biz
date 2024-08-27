import React from 'react'
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { formats, modules } from '../utils/constants'
import { background } from '../../../../assets/styles/colors'
import DOMPurify from 'dompurify'
import '../styles/styles.css'
import { Overflow } from '../../../../constants/StylingConstants'

export type TextEditorProps = {
  text: string
  setText: (text: string) => void
}

export const TextEditor = (props: TextEditorProps) => {
  const [editText, setEditText] = React.useState(true)

  const handleProcedureContentChange = (content: string) => {
    if (content === '<p><br></p>') content = ''
    const sanitizedHtml = DOMPurify.sanitize(content)
    props.setText(sanitizedHtml)
  }

  return (
    <div style={styles.editorContainer}>
      {props.text === '' || editText ? (
        <ReactQuill
          value={props.text}
          theme={'snow'}
          modules={modules}
          formats={formats}
          placeholder='write your content ....'
          onChange={handleProcedureContentChange}
          style={styles.editor}
        />
      ) : (
        <div
          style={styles.textContainer}
          onClick={() => setEditText(true)}
          dangerouslySetInnerHTML={{ __html: props.text }}
        />
      )}
    </div>
  )
}

const styles = {
  editorContainer: {
    color: background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '80%',
  },
  editor: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    border: '1px solid #ccc',
    height: '80%',
    width: '100%',
    overflowY: Overflow.scroll,
    padding: 20,
  },
}
