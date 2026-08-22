import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = process.cwd()
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' }
createServer(async (request, response) => {
  try {
    const path = normalize(join(root, request.url.split('?')[0] === '/' ? 'index.html' : request.url.split('?')[0]))
    if (!path.startsWith(root)) throw new Error('Forbidden')
    await stat(path)
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' })
    response.end(await readFile(path))
  } catch {
    response.writeHead(404); response.end('Not found')
  }
}).listen(4173, () => console.log('Dayflow running at http://localhost:4173'))
