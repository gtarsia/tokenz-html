import { stubIfTest } from 'dummee'
import { TEXT } from './token-types'

const type = TEXT

function text(walker) {
  const token = { type }
  token.text = walker.readUntil('<')
  return token
}

export default stubIfTest(text)
