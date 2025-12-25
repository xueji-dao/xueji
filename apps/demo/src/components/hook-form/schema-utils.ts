import dayjs from 'dayjs'
import * as z from 'zod'

// ----------------------------------------------------------------------

type SchemaErrorMessages = {
  required?: string
  invalid?: string
}

export const schemaUtils = {
  /**
   * 手机号码
   * 用于手机号码输入验证
   */
  phoneNumber: (props?: { error?: SchemaErrorMessages; isValid?: (val: string) => boolean }) =>
    z
      .string()
      .min(1, { error: props?.error?.required ?? '请输入手机号码！' })
      .refine((val) => props?.isValid?.(val), {
        error: props?.error?.invalid ?? '手机号码格式不正确！',
      }),

  /**
   * 邮箱
   * 用于邮箱输入验证
   */
  email: (props?: { error?: SchemaErrorMessages }) =>
    z.email({
      error: ({ input, code }) =>
        input && code.startsWith('invalid')
          ? (props?.error?.invalid ?? '邮箱格式不正确！')
          : (props?.error?.required ?? '请输入邮箱！'),
    }),

  /**
   * 日期
   * 用于日期选择器验证
   */
  date: (props?: { error?: SchemaErrorMessages }) =>
    z.preprocess(
      (val) => (val === undefined ? null : val),
      z.union([z.string(), z.number(), z.date(), z.null()]).check((ctx) => {
        const value = ctx.value

        if (value === null || value === '') {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.required ?? '日期不能为空！',
            input: value,
          })
          return
        }

        if (!dayjs(value).isValid()) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.invalid ?? '日期格式不正确！',
            input: value,
          })
        }
      }),
    ),

  /**
   * 编辑器
   * 用于富文本编辑器验证
   */
  editor: (props?: { error?: string }) =>
    z.string().refine(
      (val) => {
        const cleanedValue = val.trim()
        return cleanedValue !== '' && cleanedValue !== '<p></p>'
      },
      { error: props?.error ?? '内容不能为空！' },
    ),

  /**
   * 可空输入
   * 用于输入框、选择器等可为空的字段验证
   */
  nullableInput: <T extends z.ZodTypeAny>(schema: T, options?: { error?: string }) =>
    schema.nullable().refine((val) => val !== null && val !== undefined, {
      error: options?.error ?? '该字段不能为空！',
    }),

  /**
   * 布尔值
   * 用于复选框、开关等验证
   */
  boolean: (props?: { error?: string }) =>
    z.boolean().refine((val) => val === true, {
      error: props?.error ?? '该字段是必需的！',
    }),

  /**
   * 滑块范围
   * 用于范围滑块验证 [最小值, 最大值]
   */
  sliderRange: (props: { error?: string; min: number; max: number }) =>
    z
      .number()
      .array()
      .refine((val) => val[0] >= props.min && val[1] <= props.max, {
        error: props.error ?? `范围必须在 ${props.min} 到 ${props.max} 之间`,
      }),

  /**
   * 文件
   * 用于单文件上传验证
   */
  file: (props?: { error?: string }) =>
    z
      .file()
      .or(z.string())
      .or(z.null())
      .check((ctx) => {
        const value = ctx.value
        if (!value || (typeof value === 'string' && !value.length)) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error ?? '文件不能为空！',
            input: value,
          })
        }
      }),
  /**
   * 多文件
   * 用于多文件上传验证
   */
  files: (props?: { error: string; minFiles?: number }) =>
    z.array(z.union([z.string(), z.file()])).min(1, { error: props?.error ?? '文件不能为空！' }),
}

// ----------------------------------------------------------------------

/**
 * Test one or multiple values against a Zod schema.
 */
export function testCase<T extends z.ZodTypeAny>(schema: T, values: unknown[]) {
  const color = {
    green: (txt: string) => `\x1b[32m${txt}\x1b[0m`,
    red: (txt: string) => `\x1b[31m${txt}\x1b[0m`,
    gray: (txt: string) => `\x1b[90m${txt}\x1b[0m`,
  }

  values.forEach((value) => {
    const { data, success, error } = schema.safeParse(value)
    const type = color.gray(`(${typeof value})`)
    const serializedValue = JSON.stringify(value)

    const label = success ? color.green(`✅ Valid - ${serializedValue}`) : color.red(`❌ Error - ${serializedValue}`)
    const payload = success ? data : z.treeifyError(error)

    console.info(`${label} ${type}:`, JSON.stringify(payload, null, 2))
  })
}

// Example usage:
// testCase(schemaUtils.boolean(), [true, false, 'true', 'false', '', 1, 0, null, undefined]);

// testCase(schemaUtils.date(), [
//   '2025-04-10',
//   1712736000000,
//   new Date(),
//   '2025-02-30',
//   '04/10/2025',
//   'not-a-date',
//   '',
//   null,
//   undefined,
// ]);

// testCase(
//   schemaUtils.nullableInput(
//     z.coerce
//       .number()
//       .int()
//       .min(1, { error: 'Age is required!' })
//       .min(18, { error: 'Age must be between 18 and 80' })
//       .max(80, { error: 'Age must be between 18 and 80' }),
//     { error: 'Age is required!' }
//   ),
//   [2, '2', 18, '18', 79, '79', 81, '81', null, undefined]
// );
