declare namespace NodeJS {
  export interface ProcessEnv {
    readonly ENV_VARIABLE: string
    readonly NEXT_PUBLIC_ENV_VARIABLE: string

    readonly GITHUB_ID: string
    readonly GITHUB_SECRET: string

    readonly EMAIL_SERVER: string
    readonly EMAIL_FROM: string

    readonly ANALYZE: string
  }
}
