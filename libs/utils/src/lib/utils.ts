export function utils(): string {
  return 'utils'
}

export function pi(n: number) {
  let v = 0
  for (let i = 1; i <= n; i += 4) {
    // increment by 4
    v += 1 / i - 1 / (i + 2) // add the value of the series
  }
  return 4 * v // apply the factor at last
}

export function isChinese(value: string) {
  return /^[\u4e00-\u9fa5]*$/.test(value)
}

export function getPostWords(content: string) {
  return content.split(' ').filter(Boolean).length
}

const WORDS_PER_MINUTE = 200
export function readingTime(wordsCount: number) {
  return Math.ceil(wordsCount / WORDS_PER_MINUTE)
}
