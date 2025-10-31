import * as fs from 'fs'
import * as path from 'path'
import * as sharp from 'sharp'

const sizes = [
  { name: '48', width: 48 }, // 最小常用尺寸
  { name: '64', width: 64 },
  { name: '128', width: 128 },
  { name: '192', width: 192 }, // PWA 和 Android 应用常用
  { name: '256', width: 256 },
  { name: '512', width: 512 }, // 高清应用图标
]

const inputDir = './images'
const outputDir = './output'

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// 支持的图片格式
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.gif']

fs.readdirSync(inputDir).forEach((file: string) => {
  const ext = path.extname(file).toLowerCase()

  // 只处理支持的图片格式
  if (!supportedFormats.includes(ext)) {
    console.log(`跳过不支持的文件: ${file}`)
    return
  }

  console.log(`处理文件: ${file}`)

  sizes.forEach((size) => {
    const parsedFile = path.parse(file)
    const outputPath = path.join(outputDir, `${parsedFile.name}_${size.name}${parsedFile.ext}`)

    sharp(path.join(inputDir, file))
      .resize(size.width)
      .toFile(outputPath)
      .then(() => {
        console.log(`✓ 生成: ${outputPath}`)
      })
      .catch((err: Error) => {
        console.error(`✗ 处理失败 ${file} -> ${size.name}:`, err.message)
      })
  })
})
