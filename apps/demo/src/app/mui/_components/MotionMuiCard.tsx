import { Button, Card, CardContent, Typography } from '@mui/material'
import { motion, useAnimation } from 'framer-motion'

// 推荐方案 2: Framer Motion + MUI
export const MotionMuiCard = () => {
  const controls = useAnimation()

  const handleClick = async () => {
    await controls.start({ rotate: 360, transition: { duration: 0.6 } })
    controls.start({ rotate: 0, transition: { duration: 0.1 } })
  }

  return (
    <motion.div animate={controls} whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="m-4 p-4">
        <CardContent>
          <Typography variant="h5">Framer Motion + MUI</Typography>
          <Typography color="text.secondary">点击按钮旋转卡片</Typography>
          <Button variant="contained" className="mt-2" onClick={handleClick}>
            旋转卡片
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
