import { stubIfTest } from 'dummee'
import { WalkCancelledInterrupt } from './tokenz/interrupts'
import { COMMENT as type } from './token-types'

function comment(walker) {
  const token = { type }
  const start = '<!--'
  const close = '-->'
  if (!walker.match(start)) {
    walker.cancel(`comments should start with ${start}`)
  }
  walker.read(start.length)
  token.text = walker.readUntil(close)
  if (!walker.isEnd()) { walker.skip(close.length) }
  return token
}

export default stubIfTest(comment)
