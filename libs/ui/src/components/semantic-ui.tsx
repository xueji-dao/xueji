import Link from 'next/link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export const SemanticUi = () => {
  return (
    <div>
      <h1 className="mb-2 bg-gray-600 text-white">Welcome to use Semantic Ui!</h1>
      <Button variant="contained">Mui Button</Button>
      <Box sx={{ my: 4 }}>
        {/*
          Next.js 16 注意事项：
          ❌ 不要这样写: <Button component={Link} href="/about">
          ✅ 正确写法: 用 Link 包装 Button，避免直接传递函数组件
          原因: App Router 不允许将函数直接传递给客户端组件
        */}
        <Link href="/about" passHref>
          <Button variant="contained">Go to the about page</Button>
        </Link>
      </Box>
    </div>
  )
}
