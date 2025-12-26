'use client'

import Avatar from '@mui/material/Avatar'
import type { BadgeProps } from '@mui/material/Badge'
import Badge from '@mui/material/Badge'
import type { IconButtonProps } from '@mui/material/IconButton'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import { m } from 'framer-motion'
import { usePopover } from 'minimal-shared/hooks'
import { fToNow } from 'src/utils/format-time'

import { transitionTap, varHover, varTap } from '@/components/animate'
import { CustomPopover } from '@/components/custom-popover'
import { Iconify } from '@/components/iconify'
import { Scrollbar } from '@/components/scrollbar'

// ----------------------------------------------------------------------

export type ContactsPopoverProps = IconButtonProps & {
  data?: {
    id: string
    role: string
    name: string
    email: string
    status: string
    address: string
    avatarUrl: string
    phoneNumber: string
    lastActivity: string
  }[]
}

export function ContactsPopover({ data = [], sx, ...other }: ContactsPopoverProps) {
  const { open, anchorEl, onClose, onOpen } = usePopover()

  const renderMenuList = () => (
    <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose}>
      <Typography variant="h6" sx={{ p: 1.5 }}>
        Contacts <span>({data.length})</span>
      </Typography>

      <Scrollbar sx={{ height: 320, width: 320 }}>
        <MenuList>
          {data.map((contact) => (
            <MenuItem key={contact.id} sx={{ p: 1 }}>
              <Badge variant={contact.status as BadgeProps['variant']} badgeContent=" ">
                <Avatar alt={contact.name} src={contact.avatarUrl} />
              </Badge>

              <ListItemText
                primary={contact.name}
                secondary={contact.status === 'offline' ? fToNow(contact.lastActivity) : ''}
                slotProps={{
                  secondary: {
                    sx: { typography: 'caption', color: 'text.disabled' },
                  },
                }}
              />
            </MenuItem>
          ))}
        </MenuList>
      </Scrollbar>
    </CustomPopover>
  )

  return (
    <>
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Contacts button"
        onClick={onOpen}
        sx={[
          (theme) => ({ ...(open && { bgcolor: theme.vars.palette.action.selected }) }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}>
        <Iconify icon="solar:users-group-rounded-bold-duotone" width={24} />
      </IconButton>

      {renderMenuList()}
    </>
  )
}
