import { stubIfTest } from 'dummee'

function match(walker, strs, i = 0) {
  if (!Array.isArray(strs)) {
    strs = [strs]
  }
  return strs.some(str => walker.text.startsWith(str, walker.pos + i))
}

export default stubIfTest(match)
