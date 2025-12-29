import { kebabCase } from 'es-toolkit'

// ----------------------------------------------------------------------

const MOCK_TITLE = 'Title'

// const ROOTS = {
//   AUTH: '/auth',
//   DASHBOARD: '/dashboard',
// }

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about',
  contact: '/contact',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  login: '/login',
  register: '/register',
  verify: '/verify',
  resetPassword: '/reset-password',
  products: {
    root: '/products',
    details: (name: string) => `/products/${name}`,
    demo: { details: `/products/${kebabCase(MOCK_TITLE)}` },
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${kebabCase(title)}`,
    demo: { details: `/post/${kebabCase(MOCK_TITLE)}` },
  },

  workspace: {
    root: `/`,
  },
}
