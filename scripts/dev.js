import { spawn } from 'node:child_process'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const FRONTEND_PORT = 5173
const BACKEND_PORT = 3001

function lanAddress() {
  for (const interfaces of Object.values(os.networkInterfaces())) {
    for (const iface of interfaces ?? []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return null
}

function printBanner() {
  const network = lanAddress()
  console.log('')
  console.log('local:')
  console.log(`  frontend  http://localhost:${FRONTEND_PORT}`)
  console.log(`  backend   http://localhost:${BACKEND_PORT}`)
  console.log('')
  console.log('network:')
  if (network) {
    console.log(`  frontend  http://${network}:${FRONTEND_PORT}`)
    console.log(`  backend   http://${network}:${BACKEND_PORT}`)
  } else {
    console.log('  frontend  (no network address found)')
    console.log('  backend   (no network address found)')
  }
  console.log('')
}

function waitFor(url, { attempts = 40, delayMs = 250 } = {}) {
  return new Promise((resolve, reject) => {
    let left = attempts
    const ping = () => {
      const req = http.get(url, (res) => {
        res.resume()
        if (res.statusCode && res.statusCode < 500) {
          resolve()
          return
        }
        retry()
      })
      req.on('error', retry)
    }
    const retry = () => {
      left -= 1
      if (left <= 0) {
        reject(new Error(`Timed out waiting for ${url}`))
        return
      }
      setTimeout(ping, delayMs)
    }
    ping()
  })
}

function start(command, args, cwd, label) {
  const child = spawn(command, args, {
    cwd,
    shell: process.platform === 'win32',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, FORCE_COLOR: '1' },
  })

  const pipe = (stream) => {
    stream.on('data', (chunk) => {
      const text = chunk.toString().trimEnd()
      if (!text) return
      for (const line of text.split(/\r?\n/)) {
        console.log(`[${label}] ${line}`)
      }
    })
  }

  pipe(child.stdout)
  pipe(child.stderr)
  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`[${label}] exited with code ${code}`)
    }
  })
  return child
}

const backend = start('node', ['server.js'], path.join(root, 'backend'), 'backend')
const frontend = start('npm', ['run', 'dev'], path.join(root, 'frontend'), 'frontend')

Promise.all([
  waitFor(`http://127.0.0.1:${BACKEND_PORT}/api/health`),
  waitFor(`http://127.0.0.1:${FRONTEND_PORT}`),
])
  .then(() => {
    printBanner()
  })
  .catch((error) => {
    console.error(error.message)
    process.exit(1)
  })

function shutdown() {
  backend.kill()
  frontend.kill()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
