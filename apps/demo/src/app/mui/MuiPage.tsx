'use client'

import { useContext } from 'react'
import { Card, CardContent } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { SemanticUi } from '@xueji/ui'

import { UIContext } from '@/lib/context'

import { MotionMuiCard } from './_components/MotionMuiCard'
import { MuiAnimatedCard } from './_components/MuiAnimatedCard'
import Copyright from './Copyright'
import Link from './Link'
import PopoverMenu from './PopoverMenu'
import ProTip from './ProTip'

const Page = () => {
  const { isDemo, setIsDemo } = useContext(UIContext)
  console.log('=====useContext isDemo:', isDemo)
  setIsDemo(true)
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          示例: Material UI
        </Typography>
        <Slider
          className="my-4"
          defaultValue={30}
          classes={{ active: 'shadow-none' }}
          slotProps={{ thumb: { className: 'hover:shadow-none' } }}
        />

        <PopoverMenu />
        <ProTip />
        <Copyright />
        <Box sx={{ maxWidth: 'sm' }}>
          <Button variant="contained" component={Link} noLinkStyle href="/">
            返回首页
          </Button>
        </Box>
      </Box>
      {/* Tailwind 主导 + MUI 组件 */}
      <Card className=" mx-4 my-2 border-pink-200 bg-pink-50 p-4 transition-colors hover:bg-pink-50!">
        <CardContent className="text-pink-800">Tailwind 样式 + MUI 组件</CardContent>
      </Card>
      <MuiAnimatedCard />
      <MotionMuiCard />
      {/* 访问组件库 */}
      <SemanticUi />

      <Box className="p-6">
        <Card sx={{ mb: 2, p: 2, bgcolor: 'secondary.light' }}>
          <CardContent>
            <strong>推荐优先级：</strong>
            <ol className="mt-2 space-y-1 text-white">
              <li>1. MUI sx prop - 主题集成、组件样式</li>
              <li>2. Tailwind classes - 布局、间距、工具类</li>
              <li>3. MUI styled - 仅复杂可复用组件</li>
            </ol>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Page
