import { stubIfTest } from 'dummee'

function skip(walker, i = 1) {
  walker.pos = walker.pos + i
}

export default stubIfTest(skip)
