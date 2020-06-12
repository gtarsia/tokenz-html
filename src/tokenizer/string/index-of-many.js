import { stubIfTest } from 'dummee'

function indexOfMany(source, strs, fromIndex = 0) {
  if (!Array.isArray(strs)) {
    strs = [strs]
  }
  const indexes = strs
    .map(str => source.indexOf(str, fromIndex))
    .filter(i => i > -1)
  const result = Math.min(...indexes)
  return result === Infinity ? -1 : result
}

export default stubIfTest(indexOfMany)
