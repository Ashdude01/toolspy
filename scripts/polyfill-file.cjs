'use strict'

// Node 18 has Blob but not the global File class (added in Node 20).
// Next.js 15 and Payload touch File while collecting page data.
if (typeof globalThis.File === 'undefined') {
  class File extends Blob {
    constructor(bits, name, options = {}) {
      super(bits, options)
      this.name = String(name)
      this.lastModified = options.lastModified ?? Date.now()
      this.webkitRelativePath = ''
    }
  }

  Object.defineProperty(File.prototype, Symbol.toStringTag, {
    value: 'File',
    configurable: true,
  })

  globalThis.File = File
}
