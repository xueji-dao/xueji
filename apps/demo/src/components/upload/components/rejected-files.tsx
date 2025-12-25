import { styled } from '@mui/material/styles'
import { mergeClasses, varAlpha } from 'minimal-shared/utils'
import type { FileRejection } from 'react-dropzone'

import { fData } from '@/lib/utils/format-number'

import { getFileMeta } from '../../file-thumbnail'
import { uploadClasses } from '../classes'

// ----------------------------------------------------------------------

export type RejectedFilesProps = React.ComponentProps<typeof RejectedList> & {
  files?: readonly FileRejection[]
}

export function RejectedFiles({ files = [], sx, className, ...other }: RejectedFilesProps) {
  return (
    <RejectedList className={mergeClasses([uploadClasses.rejected, className])} sx={sx} {...other}>
      {files.map(({ file, errors }) => {
        const fileMeta = getFileMeta(file)

        return (
          <RejectedItem key={fileMeta.key}>
            <RejectedTitle>
              {fileMeta.name} - {fileMeta.size ? fData(fileMeta.size) : ''}
            </RejectedTitle>
            {errors.map((error) => {
              let message = error.message
              if (error.code === 'file-too-large') {
                message = `文件太大，请选择小于 ${fData(5242880)} 的文件`
              } else if (error.code === 'file-invalid-type') {
                message = '文件类型不支持'
              } else if (error.code === 'too-many-files') {
                message = '文件数量超出限制'
              }
              return <RejectedMsg key={error.code}>- {message}</RejectedMsg>
            })}
          </RejectedItem>
        )
      })}
    </RejectedList>
  )
}

// ----------------------------------------------------------------------

const RejectedList = styled('ul')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexDirection: 'column',
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `dashed 1px ${theme.vars.palette.error.main}`,
  backgroundColor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
}))

const RejectedItem = styled('li')({
  display: 'flex',
  flexDirection: 'column',
})

const RejectedTitle = styled('span')(({ theme }) => ({
  ...theme.typography.subtitle2,
}))

const RejectedMsg = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
}))
