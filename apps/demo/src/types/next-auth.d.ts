import 'next-auth/jwt'

import { NextRequest } from 'next/server'

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module 'next-auth/jwt' {
  interface JWT {
    /** The user's role. */
    userRole?: 'admin'
  }
}

declare module 'next/server' {
  interface NextRequest {
    auth: any
  }
}
