import { stubIfTest } from 'dummee'

function peek(walker, i = 0, count = 1) {
  if (count === 0) {
    return ''
  }
  i += walker.pos
  if (count === 1) {
    return walker.text[i]
  }
  const end = count + i
  return walker.text.slice(i, end)
}

export default stubIfTest(peek)
