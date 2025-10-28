import PlainEditor from './PlainEditor'
import RichEditor from './RichEditor'

const Page = () => {
  return (
    <div className="text-center font-sans">
      <h1>React.js Plain Text Lexical Example</h1>
      <PlainEditor />
      <h1>React.js Rich Text Lexical Example</h1>
      <RichEditor />
    </div>
  )
}

export default Page
