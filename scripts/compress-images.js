import { readdir, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const DIR = 'docs/.vitepress/dist/assets'

const files = await readdir(DIR)
let saved = 0
let count = 0

for (const f of files) {
  const ext = extname(f).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

  const filepath = join(DIR, f)
  const before = (await stat(filepath)).size

  let pipeline = sharp(filepath)
  if (ext === '.png') {
    pipeline = pipeline.png({ quality: 80, palette: true })
  } else {
    pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true })
  }

  const buf = await pipeline.toBuffer()
  if (buf.length < before) {
    await sharp(buf).toFile(filepath)
    saved += before - buf.length
    count++
  }
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1)
console.log(`compressed ${count} images, saved ${mb(saved)}MB`)
