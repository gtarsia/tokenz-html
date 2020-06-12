import { stubIfTest } from 'dummee'
import readUntilNot from './read-until-not'

const slice = false

function skipUntilNot(walker, strs) {
  readUntilNot(walker, strs, slice)
}

export default stubIfTest(skipUntilNot)
