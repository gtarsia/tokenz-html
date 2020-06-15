import { stubIfTest } from 'dummee'
import { TEXT } from './token-types'

const type = TEXT

function text(walker) {
  const token = { type }
  token.text = ''
  if (walker.match('<')) {
    token.text += walker.read()
  }
  token.text += walker.readUntil('<')
  return token
}

export default stubIfTest(text)
