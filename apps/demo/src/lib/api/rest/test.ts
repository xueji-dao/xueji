// GitHub 仓库数据类型
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  stargazers_count: number
  subscribers_count: number
  forks_count: number
  language: string
  created_at: string
  updated_at: string
}

export async function fetchRepoData(): Promise<GitHubRepo> {
  const response = await fetch('https://api.github.com/repos/TanStack/query')
  return await response.json()
}
