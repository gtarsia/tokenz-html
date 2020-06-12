import { stubIfTest } from 'dummee'
import readUntil from './read-until'

const slice = false

function skipUntil(walker, strs) {
  readUntil(walker, strs, slice)
}

export default stubIfTest(skipUntil)
