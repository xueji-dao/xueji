const WebSocket = require('ws')
const http = require('http')
const { setupWSConnection } = require('y-websocket/utils')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 1234

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Yjs WebSocket Server running\n')
})

const wss = new WebSocket.Server({ server })

wss.on('connection', setupWSConnection)

server.listen(port, host, () => {
  console.log(`Yjs WebSocket server running at http://${host}:${port}`)
})
