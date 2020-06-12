import { stubIfTest } from 'dummee'
import indexOfManyNot from '../string/index-of-many-not'

function readUntil(walker, strs, slice = true) {
  if (!Array.isArray(strs)) {
    strs = [strs]
  }
  let i = indexOfManyNot(walker.text, strs, walker.pos)
  if (i === -1) {
    i = walker.text.length
  }
  const pos = walker.pos
  walker.pos = i
  if (slice) {
    return walker.text.slice(pos, i)
  }
}

export default stubIfTest(readUntil)
