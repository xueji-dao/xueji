'use client'

import { useCallback, useEffect } from 'react'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { useColorScheme } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useAtom } from 'jotai'
import { hasKeys, varAlpha } from 'minimal-shared/utils'

import { themeModeAtom } from '@/lib/store'
import { themeConfig } from '@/lib/theme/theme-config'
import { primaryColorPresets } from '@/lib/theme/with-settings'

import { Iconify } from '../../iconify'
import { Label } from '../../label'
import { Scrollbar } from '../../scrollbar'
import { useSettingsContext } from '../context/use-settings-context'
import type { SettingsDrawerProps, SettingsState } from '../types'
import { BaseOption } from './base-option'
import { FontFamilyOptions, FontSizeOptions } from './font-options'
import { FullScreenButton } from './FullScreenButton'
import { settingIcons } from './icons'
import { NavColorOptions, NavLayoutOptions } from './nav-layout-option'
import { PresetsOptions } from './presets-options'
import { LargeBlock, SmallBlock } from './styles'

// ----------------------------------------------------------------------

export function SettingsDrawer({ sx, defaultSettings }: SettingsDrawerProps) {
  const settings = useSettingsContext()
  const { mode, setMode, colorScheme } = useColorScheme()
  const [, setThemeMode] = useAtom(themeModeAtom)

  // Visible options by default settings
  const visibility = {
    mode: hasKeys(defaultSettings, ['mode']),
    contrast: hasKeys(defaultSettings, ['contrast']),
    navColor: hasKeys(defaultSettings, ['navColor']),
    fontSize: hasKeys(defaultSettings, ['fontSize']),
    direction: hasKeys(defaultSettings, ['direction']),
    navLayout: hasKeys(defaultSettings, ['navLayout']),
    fontFamily: hasKeys(defaultSettings, ['fontFamily']),
    primaryColor: hasKeys(defaultSettings, ['primaryColor']),
    compactLayout: hasKeys(defaultSettings, ['compactLayout']),
  }

  useEffect(() => {
    if (mode !== undefined && mode !== settings.state.mode) {
      settings.setState({ mode })
    }
  }, [mode, settings])

  const handleReset = useCallback(() => {
    settings.onReset()
    setMode(null)
  }, [setMode, settings])

  const renderHead = () => (
    <Box
      sx={{
        py: 2,
        pr: 1,
        pl: 2.5,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        设置
      </Typography>

      <FullScreenButton />

      <Tooltip title="重置所有">
        <IconButton onClick={handleReset}>
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="关闭">
        <IconButton onClick={settings.onCloseDrawer}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  )

  const renderMode = () => (
    <BaseOption
      label="亮暗"
      selected={settings.state.mode === 'dark'}
      icon={<SvgIcon>{settingIcons.moon}</SvgIcon>}
      action={
        mode === 'system' ? (
          <Label
            sx={{
              height: 20,
              cursor: 'inherit',
              borderRadius: '20px',
              fontWeight: 'fontWeightSemiBold',
            }}>
            自动
          </Label>
        ) : null
      }
      onChangeOption={() => {
        setMode(colorScheme === 'light' ? 'dark' : 'light')
        setThemeMode(colorScheme === 'light' ? 'dark' : 'light') // 同步 jotai
        settings.setState({ mode: colorScheme === 'light' ? 'dark' : 'light' })
      }}
    />
  )

  const renderContrast = () => (
    <BaseOption
      label="对比度"
      selected={settings.state.contrast === 'high'}
      icon={<SvgIcon>{settingIcons.contrast}</SvgIcon>}
      onChangeOption={() => {
        settings.setState({
          contrast: settings.state.contrast === 'default' ? 'high' : 'default',
        })
      }}
    />
  )

  const renderCompactLayout = () => (
    <BaseOption
      tooltip="仅仪表盘可用，需要大屏幕 > 1600px (xl)"
      label="紧凑布局"
      selected={!!settings.state.compactLayout}
      icon={<SvgIcon>{settingIcons.autofitWidth}</SvgIcon>}
      onChangeOption={() => {
        settings.setState({ compactLayout: !settings.state.compactLayout })
      }}
    />
  )

  const renderPresets = () => (
    <LargeBlock
      title="预设主题"
      canReset={settings.state.primaryColor !== defaultSettings.primaryColor}
      onReset={() => {
        settings.setState({ primaryColor: defaultSettings.primaryColor })
      }}>
      <PresetsOptions
        icon={<SvgIcon sx={{ width: 28, height: 28 }}>{settingIcons.siderbarDuotone}</SvgIcon>}
        options={(Object.keys(primaryColorPresets) as SettingsState['primaryColor'][]).map((key) => ({
          name: key,
          value: primaryColorPresets[key].main,
        }))}
        value={settings.state.primaryColor}
        onChangeOption={(newOption) => {
          settings.setState({ primaryColor: newOption })
        }}
      />
    </LargeBlock>
  )

  const renderNav = () => (
    <LargeBlock title="导航" tooltip="仅仪表盘可用" sx={{ gap: 2.5 }}>
      {visibility.navLayout && (
        <SmallBlock
          label="布局"
          canReset={settings.state.navLayout !== defaultSettings.navLayout}
          onReset={() => {
            settings.setState({ navLayout: defaultSettings.navLayout })
          }}>
          <NavLayoutOptions
            value={settings.state.navLayout}
            onChangeOption={(newOption) => {
              settings.setState({ navLayout: newOption })
            }}
            options={[
              {
                value: 'vertical',
                icon: <SvgIcon sx={{ width: 1, height: 'auto' }}>{settingIcons.navVertical}</SvgIcon>,
              },
              {
                value: 'horizontal',
                icon: <SvgIcon sx={{ width: 1, height: 'auto' }}>{settingIcons.navHorizontal}</SvgIcon>,
              },
              {
                value: 'mini',
                icon: <SvgIcon sx={{ width: 1, height: 'auto' }}>{settingIcons.navMini}</SvgIcon>,
              },
            ]}
          />
        </SmallBlock>
      )}
      {visibility.navColor && (
        <SmallBlock
          label="颜色"
          canReset={settings.state.navColor !== defaultSettings.navColor}
          onReset={() => {
            settings.setState({ navColor: defaultSettings.navColor })
          }}>
          <NavColorOptions
            value={settings.state.navColor}
            onChangeOption={(newOption) => {
              settings.setState({ navColor: newOption })
            }}
            options={[
              {
                label: '集成',
                value: 'integrate',
                icon: <SvgIcon>{settingIcons.sidebarOutline}</SvgIcon>,
              },
              {
                label: '显著',
                value: 'apparent',
                icon: <SvgIcon>{settingIcons.sidebarFill}</SvgIcon>,
              },
            ]}
          />
        </SmallBlock>
      )}
    </LargeBlock>
  )

  const renderFont = () => (
    <LargeBlock title="字体" sx={{ gap: 2.5 }}>
      {visibility.fontFamily && (
        <SmallBlock
          label="字体族"
          canReset={settings.state.fontFamily !== defaultSettings.fontFamily}
          onReset={() => {
            settings.setState({ fontFamily: defaultSettings.fontFamily })
          }}>
          <FontFamilyOptions
            value={settings.state.fontFamily}
            onChangeOption={(newOption) => {
              settings.setState({ fontFamily: newOption })
            }}
            options={[themeConfig.fontFamily.primary, 'Noto Sans SC', 'Montserrat', 'Geist Mono']}
            icon={<SvgIcon sx={{ width: 28, height: 28 }}>{settingIcons.font}</SvgIcon>}
          />
        </SmallBlock>
      )}
      {visibility.fontSize && (
        <SmallBlock
          label="大小"
          canReset={settings.state.fontSize !== defaultSettings.fontSize}
          onReset={() => {
            settings.setState({ fontSize: defaultSettings.fontSize })
          }}
          sx={{ gap: 5 }}>
          <FontSizeOptions
            options={[12, 20]}
            value={settings.state.fontSize}
            onChangeOption={(newOption) => {
              settings.setState({ fontSize: newOption })
            }}
          />
        </SmallBlock>
      )}
    </LargeBlock>
  )

  return (
    <Drawer
      anchor="right"
      open={settings.openDrawer}
      onClose={settings.onCloseDrawer}
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: [
            (theme) => ({
              ...theme.mixins.paperStyles(theme, {
                color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
              }),
              width: 360,
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}>
      {renderHead()}

      <Scrollbar>
        <Box
          sx={{
            pb: 5,
            gap: 6,
            px: 2.5,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Box sx={{ gap: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {visibility.mode && renderMode()}
            {visibility.contrast && renderContrast()}
            {visibility.compactLayout && renderCompactLayout()}
          </Box>

          {(visibility.navColor || visibility.navLayout) && renderNav()}
          {visibility.primaryColor && renderPresets()}
          {(visibility.fontFamily || visibility.fontSize) && renderFont()}
        </Box>
      </Scrollbar>
    </Drawer>
  )
}
