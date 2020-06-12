import test from 'ava'
import TextWalker from './tokenizer/walker/TextWalker'
import endTag from './end-tag'
import {
  WalkCancelledInterrupt,
  WalkFailedInterrupt,
} from './tokenizer/walker/interrupts'
import { CLOSE_TAG } from './token-types'

function run(t, text) {
  const walker = new TextWalker(text)
  const result =  endTag(walker)
  t.deepEqual(walker.isEnd(), true)
  return result
}

const type = CLOSE_TAG

test('endTag should work correctly', (t) => {
  t.throws(() => run(t, '<'), { instanceOf: WalkCancelledInterrupt })
  t.throws(() => run(t, '</'), { instanceOf: WalkCancelledInterrupt })
  let err = t.throws(() => run(t, '</a'), { instanceOf: WalkFailedInterrupt })
  t.deepEqual(err.message, 'close tag never closed after reading name')
  err = t.throws(() => run(t, '</a qwe'), { instanceOf: WalkFailedInterrupt })
  t.deepEqual(err.message, 'close tag never closed after reading name')
  t.deepEqual(run(t, '</a>'), { name: 'a', type })
  t.deepEqual(run(t, '</ab>'), { name: 'ab', type })
  t.deepEqual(run(t, '</ab >'), { name: 'ab', type })
  t.deepEqual(run(t, '</ab qwe>'), { name: 'ab', type })
})
