import { stubIfTest } from 'dummee'
import { TEXT_TOKEN as tokenType } from './token-types'

function text(walker) {
  const token = { tokenType }
  token.text = ''
  if (walker.match('<')) {
    token.text += walker.read()
  }
  token.text += walker.readUntil('<')
  return token
}

export default stubIfTest(text)
