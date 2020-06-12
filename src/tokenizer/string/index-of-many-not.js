import { stubIfTest } from 'dummee'

function indexOfManyNot(source, strs, fromIndex = 0) {
  if (!Array.isArray(strs)) {
    strs = [strs]
  }
  for (let i = fromIndex; i < source.length; i += 1) {
    const found = strs.some(str => source.startsWith(str, i))
    if (!found) {
      return i
    }
  }
  return -1
}

export default stubIfTest(indexOfManyNot)
