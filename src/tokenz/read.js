import { stubIfTest } from 'dummee'

function read(walker) {
  const c = walker.text[walker.pos]
  walker.pos += 1
  return c
}

export default stubIfTest(read)
