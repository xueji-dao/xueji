export default function SnippetLang({ lang, setLang }) {
  return (
    <select
      className="border-none bg-gray-800 text-white outline-none"
      value={lang}
      onChange={(e) => setLang(e.currentTarget.value)}>
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
    </select>
  )
}
