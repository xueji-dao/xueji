/**
 * 文件大小常量 (bytes)
 */
export const FILE_SIZE = {
  MB_1: 1048576, // 1MB
  MB_3: 3145728, // 3MB
  MB_5: 5242880, // 5MB
  MB_10: 10485760, // 10MB
  MB_20: 20971520, // 20MB
  MB_50: 52428800, // 50MB
} as const
// ========== 字典类型枚举 ==========
export enum DICT_TYPE {
  // ========== SYSTEM 模块 ==========
  SYSTEM_CONFIG_TYPE = 'system_config_type',
  SYSTEM_USER_SEX = 'system_user_sex',
  SYSTEM_JOB_STATUS = 'system_job_status',
  SYSTEM_JOB_LOG_STATUS = 'system_job_log_status',
  SYSTEM_OPERATE_TYPE = 'system_operate_type',
}

/**
 * 通用状态 (common_status)
 */
export enum CommonStatus {
  ENABLE = 0, // 开启
  DISABLE = 1, // 关闭
}

/**
 * 用户性别 (system_user_sex)
 */
export enum UserSex {
  MALE = 1, // 男
  FEMALE = 2, // 女
}

/**
 * 用户类型 (user_type)
 */
export enum UserType {
  MEMBER = 1, // 会员
  ADMIN = 2, // 管理员
}
