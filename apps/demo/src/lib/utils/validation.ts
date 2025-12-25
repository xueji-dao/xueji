/* eslint-disable @typescript-eslint/no-explicit-any */
// ----------------------------------------------------------------------

/**
 * 手机号码验证
 */
export const isPhone = (el: any): boolean =>
  el && new RegExp(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/).test(el)

/**
 * 邮箱验证
 */
export const isEmail = (el: any): boolean => el && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(el)

/**
 * 身份证号验证
 */
export const isIdCard = (el: any): boolean =>
  el && /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(el)

/**
 * 固定电话验证
 */
export const isTel = (el: any): boolean => el && /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(el)

/**
 * URL验证
 */
export const isUrl = (el: any): boolean =>
  el && /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(el)

/**
 * IP地址验证
 */
export const isIP = (el: any): boolean =>
  el && /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(el)

/**
 * 中文验证
 */
export const isChinese = (el: any): boolean => el && /^[\u4e00-\u9fa5]+$/.test(el)

/**
 * 英文验证
 */
export const isEnglish = (el: any): boolean => el && /^[a-zA-Z]+$/.test(el)

/**
 * 数字验证
 */
export const isNumber = (el: any): boolean => el && /^\d+$/.test(el)

/**
 * 正整数验证
 */
export const isPositiveInteger = (el: any): boolean => el && /^[1-9]\d*$/.test(el)

/**
 * 非负整数验证
 */
export const isNonNegativeInteger = (el: any): boolean => el && /^\d+$/.test(el)

/**
 * 小数验证
 */
export const isDecimal = (el: any): boolean => el && /^\d+(\.\d+)?$/.test(el)

/**
 * 密码强度验证 (至少8位，包含大小写字母和数字)
 */
export const isStrongPassword = (el: any): boolean =>
  el && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(el)

/**
 * 用户名验证 (字母开头，允许字母数字下划线，3-16位)
 */
export const isUsername = (el: any): boolean => el && /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/.test(el)

/**
 * 机构代码验证 (字母数字下划线短横线)
 */
export const isOrgCode = (el: any): boolean => el && /^[A-Za-z0-9_-]+$/.test(el)

/**
 * 邮政编码验证
 */
export const isPostalCode = (el: any): boolean => el && /^[1-9]\d{5}$/.test(el)

/**
 * 银行卡号验证
 */
export const isBankCard = (el: any): boolean => el && /^[1-9]\d{12,18}$/.test(el)

/**
 * QQ号验证
 */
export const isQQ = (el: any): boolean => el && /^[1-9][0-9]{4,10}$/.test(el)

/**
 * 微信号验证
 */
export const isWechat = (el: any): boolean => el && /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(el)

/**
 * 车牌号验证
 */
export const isLicensePlate = (el: any): boolean =>
  el &&
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/.test(el)

/**
 * 统一社会信用代码验证
 */
export const isSocialCreditCode = (el: any): boolean =>
  el && /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(el)

/**
 * 营业执照注册号验证
 */
export const isBusinessLicense = (el: any): boolean =>
  el && /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(el)

/**
 * 组织机构代码验证
 */
export const isOrganizationCode = (el: any): boolean => el && /^[A-Z0-9]{8}-[A-Z0-9]$/.test(el)

/**
 * 税务登记证号验证
 */
export const isTaxNumber = (el: any): boolean =>
  el && /^\d{15}$|^\d{17}([0-9]|X)$|^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(el)

/**
 * MAC地址验证
 */
export const isMacAddress = (el: any): boolean => el && /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(el)

/**
 * 版本号验证
 */
export const isVersion = (el: any): boolean => el && /^\d+(\.\d+)*$/.test(el)

/**
 * 16进制颜色验证
 */
export const isHexColor = (el: any): boolean => el && /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(el)

/**
 * Base64验证
 */
export const isBase64 = (el: any): boolean => el && /^[A-Za-z0-9+/]+(=|==)?$/.test(el)

/**
 * JSON字符串验证
 */
export const isJSON = (el: any): boolean => {
  if (!el || typeof el !== 'string') return false
  try {
    JSON.parse(el)
    return true
  } catch {
    return false
  }
}

/**
 * 空值验证
 */
export const isEmpty = (el: any): boolean =>
  el === null || el === undefined || el === '' || (Array.isArray(el) && el.length === 0)

/**
 * 非空验证
 */
export const isNotEmpty = (el: any): boolean => !isEmpty(el)

/**
 * 长度范围验证
 */
export const isLengthInRange = (el: any, min: number, max: number): boolean =>
  el && typeof el === 'string' && el.length >= min && el.length <= max

/**
 * 数值范围验证
 */
export const isNumberInRange = (el: any, min: number, max: number): boolean => {
  const num = Number(el)
  return !isNaN(num) && num >= min && num <= max
}

/**
 * 文件扩展名验证
 */
export const isFileExtension = (filename: string, extensions: string[]): boolean => {
  if (!filename) return false
  const ext = filename.toLowerCase().split('.').pop()
  return ext ? extensions.includes(ext) : false
}

/**
 * 图片文件验证
 */
export const isImageFile = (filename: string): boolean =>
  isFileExtension(filename, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'])

/**
 * 文档文件验证
 */
export const isDocumentFile = (filename: string): boolean =>
  isFileExtension(filename, ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'])

/**
 * 视频文件验证
 */
export const isVideoFile = (filename: string): boolean =>
  isFileExtension(filename, ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'])

/**
 * 音频文件验证
 */
export const isAudioFile = (filename: string): boolean =>
  isFileExtension(filename, ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma'])
