import MDXComponents from './types/mdx'

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    Greeting: () => <h1 style={{ fontSize: '100px' }}>Greeting</h1>,
    ...components,
  }
}
