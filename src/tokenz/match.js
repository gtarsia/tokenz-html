import { stubIfTest } from 'dummee'

function match(walker, strs) {
  if (!Array.isArray(strs)) {
    strs = [strs]
  }
  return strs.some(str => walker.text.startsWith(str, walker.pos))
}

export default stubIfTest(match)
