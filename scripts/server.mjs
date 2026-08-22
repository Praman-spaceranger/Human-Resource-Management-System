import { createServer } from 'node:http'
import { readFile, writeFile, stat, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const root = process.cwd()
const dataDir = join(root, 'data')
const dbPath = join(dataDir, 'db.json')

// Ensure data folder exists
try {
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
} catch (e) {
  console.error('Error creating data dir:', e)
}

const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
}

createServer(async (request, response) => {
  const urlObj = new URL(request.url, `http://${request.headers.host || 'localhost:4173'}`)
  const pathname = urlObj.pathname

  // CORS headers for local development
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }

  // API ROUTING: GET /api/data
  if (pathname === '/api/data' && request.method === 'GET') {
    try {
      if (existsSync(dbPath)) {
        const content = await readFile(dbPath, 'utf8')
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(content)
      } else {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ empty: true }))
      }
    } catch (err) {
      response.writeHead(500, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: err.message }))
    }
    return
  }

  // API ROUTING: POST /api/data (Save full database)
  if (pathname === '/api/data' && request.method === 'POST') {
    try {
      let body = ''
      request.on('data', chunk => { body += chunk })
      request.on('end', async () => {
        try {
          const parsed = JSON.parse(body)
          await writeFile(dbPath, JSON.stringify(parsed, null, 2), 'utf8')
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify({ success: true, timestamp: Date.now() }))
        } catch (e) {
          response.writeHead(400, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify({ error: 'Invalid JSON payload' }))
        }
      })
    } catch (err) {
      response.writeHead(500, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: err.message }))
    }
    return
  }

  // API ROUTING: POST /api/punch (Record checkin/checkout punch)
  if (pathname === '/api/punch' && request.method === 'POST') {
    try {
      let body = ''
      request.on('data', chunk => { body += chunk })
      request.on('end', async () => {
        try {
          const punch = JSON.parse(body)
          let currentDb = {}
          if (existsSync(dbPath)) {
            currentDb = JSON.parse(await readFile(dbPath, 'utf8'))
          }
          if (!Array.isArray(currentDb.checkins)) currentDb.checkins = []

          const timeStr = punch.time || new Date().toISOString().replace('T', ' ').substring(0, 19)
          const newPunch = {
            name: `CHK-${Date.now()}`,
            employee: punch.employee,
            employee_name: punch.employee_name || punch.employee,
            log_type: punch.log_type, // 'IN' or 'OUT'
            time: timeStr,
            latitude: punch.latitude || 12.9716,
            longitude: punch.longitude || 77.5946
          }

          currentDb.checkins.unshift(newPunch)
          await writeFile(dbPath, JSON.stringify(currentDb, null, 2), 'utf8')

          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify({ success: true, punch: newPunch }))
        } catch (e) {
          response.writeHead(400, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify({ error: 'Invalid punch payload' }))
        }
      })
    } catch (err) {
      response.writeHead(500, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: err.message }))
    }
    return
  }

  // STATIC FILE SERVING
  try {
    const rawPath = pathname === '/' ? 'index.html' : pathname
    const filePath = normalize(join(root, rawPath))
    if (!filePath.startsWith(root)) throw new Error('Forbidden')
    await stat(filePath)
    response.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'application/octet-stream' })
    response.end(await readFile(filePath))
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' })
    response.end('Not found')
  }
}).listen(4173, () => console.log('Dayflow running with Database API at http://localhost:4173'))
