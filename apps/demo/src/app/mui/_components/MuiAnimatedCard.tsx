import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { clsx } from 'clsx'

const cards = [
  {
    id: 1,
    title: 'Plants',
    description: 'Plants are essential for all life.',
  },
  {
    id: 2,
    title: 'Animals',
    description: 'Animals are a part of nature.',
  },
  {
    id: 3,
    title: 'Humans',
    description: 'Humans depend on plants and animals for survival.',
  },
]

export function MuiAnimatedCard({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  const [selectedCard, setSelectedCard] = useState(0)
  return (
    <Box
      className="mx-4"
      sx={{
        my: 4,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
        gap: 2,
      }}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          className={clsx(
            'm-2 p-4 transition-all duration-300',
            variant === 'primary' ? 'border-blue-200' : 'border-green-200',
          )}
          sx={{
            transition: (theme) =>
              theme.transitions.create(['transform', 'box-shadow'], {
                duration: theme.transitions.duration.short,
              }),
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: (theme) => theme.shadows[8],
            },
          }}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h5" component="div" className=" text-blue-800">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  )
}

export default MuiAnimatedCard
