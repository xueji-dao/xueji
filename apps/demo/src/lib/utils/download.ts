const downloadFile = (data: Blob, fileName: string, mineType: string) => {
  // 创建 blob
  const blob = new Blob([data], { type: mineType })
  // 创建 href 超链接，点击进行下载
  window.URL = window.URL || window.webkitURL
  const href = URL.createObjectURL(blob)
  const downA = document.createElement('a')
  downA.href = href
  downA.download = fileName
  downA.click()
  // 销毁超连接
  window.URL.revokeObjectURL(href)
}

const download = {
  // 通用文件下载方法
  file: (data: Blob, fileName: string, mimeType?: string) => {
    const type = mimeType || 'application/octet-stream'
    downloadFile(data, fileName, type)
  },
  // 下载 Excel 方法
  excel: (data: Blob, fileName: string) => {
    downloadFile(data, fileName, 'application/vnd.ms-excel')
  },
  // 下载 Word 方法
  word: (data: Blob, fileName: string) => {
    downloadFile(data, fileName, 'application/msword')
  },
  // 下载 Zip 方法
  zip: (data: Blob, fileName: string) => {
    downloadFile(data, fileName, 'application/zip')
  },
  // 下载 Html 方法
  html: (data: Blob, fileName: string) => {
    downloadFile(data, fileName, 'text/html')
  },
  // 下载 Markdown 方法
  markdown: (data: Blob, fileName: string) => {
    downloadFile(data, fileName, 'text/markdown')
  },
  // 下载 Json 方法
  json: (data: Blob, fileName: string) => {
    downloadFile(data, fileName, 'application/json')
  },
}

export default download
