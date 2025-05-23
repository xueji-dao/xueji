import { lusitana } from '@/styles/fonts'

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1
              className={`${lusitana.className} m-4 h-44 border-2 border-gray-300 p-3 text-2xl  text-blue-500 lg:m-4 lg:p-4`}>
              <span> Hello there, </span>
              Welcome XueJi 👋
            </h1>
          </div>
          {/* 示例：环境变量 */}
          <div>服务端环境变量：{process.env.ENV_VARIABLE}</div>
          <div>公共环境变量：{process.env.NEXT_PUBLIC_ENV_VARIABLE}</div>

          <p id="love">
            Carefully crafted with
            <svg fill="currentColor" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  )
}
