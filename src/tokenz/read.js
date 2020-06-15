import { stubIfTest } from 'dummee'

function read(walker, count = 1) {
  const str =  walker.text.slice(walker.pos, walker.pos + count)
  walker.pos += count
  return str
}

export default stubIfTest(read)
