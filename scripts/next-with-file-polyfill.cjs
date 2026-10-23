'use strict'

const { spawnSync } = require('node:child_process')
const path = require('node:path')

const command = process.argv[2]
if (command !== 'build' && command !== 'start' && command !== 'dev') {
  console.error('Usage: node scripts/next-with-file-polyfill.cjs <build|start|dev>')
  process.exit(1)
}

const polyfill = path.join(__dirname, 'polyfill-file.cjs').replace(/\\/g, '/')
const nextBin = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next')
const nodeOptions = [process.env.NODE_OPTIONS, `--require "${polyfill}"`].filter(Boolean).join(' ')

const result = spawnSync(process.execPath, [nextBin, command, ...process.argv.slice(3)], {
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: nodeOptions },
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

process.exit(result.status === null ? 1 : result.status)
