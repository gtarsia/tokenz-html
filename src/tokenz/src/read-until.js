import { stubIfTest } from 'dummee'
import indexOfMany from './string/index-of-many'

function readUntil(walker, strs, slice = true) {
  if (!Array.isArray(strs)) {
    strs = [strs]
  }
  let i = indexOfMany(walker.text, strs, walker.pos)
  if (i === -1) {
    i = walker.text.length
  }
  const { pos } = walker
  walker.pos = i
  if (slice) {
    return walker.text.slice(pos, i)
  }
  return true
}

export default stubIfTest(readUntil)
