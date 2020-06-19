import { stubIfTest } from 'dummee'
import { TEXT } from './token-types'

const tokenType = TEXT

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
