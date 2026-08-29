import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')
const HOST = process.env.HOST || '0.0.0.0'
const PORT = Number(process.env.PORT || 4173)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  let filePath = path.normalize(path.join(DIST, decoded))
  if (!filePath.startsWith(DIST)) return null
  if (decoded === '/' || filePath.endsWith(path.sep)) {
    filePath = path.join(filePath, 'index.html')
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return null
  }
  return filePath
}

const server = http.createServer((req, res) => {
  let filePath = resolveFile(req.url)
  // SPA fallback: unknown paths serve index.html
  if (!filePath) {
    filePath = path.join(DIST, 'index.html')
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500)
      res.end('Internal Server Error')
      return
    }
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    })
    res.end(data)
  })
})

server.listen(PORT, HOST, () => {
  console.log(`[deploy] serving ${DIST}`)
  console.log(`[deploy] Local:   http://localhost:${PORT}`)
  console.log(`[deploy] Network: http://${HOST === '0.0.0.0' ? '<your-lan-ip>' : HOST}:${PORT}`)
})
