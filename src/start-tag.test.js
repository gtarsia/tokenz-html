import test from 'ava'
import startTag from './start-tag'
import TextWalker from './tokenizer/walker/TextWalker'
import {
  WalkCancelledInterrupt,
  WalkFailedInterrupt,
} from './tokenizer/walker/interrupts'
import { START_TAG } from './token-types'

const type = START_TAG

function token(name, attrs) {
  return { name, attrs, type }
}

function run(t, text) {
  const walker = new TextWalker(text)
  const result =  startTag(walker)
  t.deepEqual(walker.isEnd(), true)
  return result
}

test('startTag should work correctly', (t) => {
  t.throws(() => run(t, '<'), { instanceOf: WalkCancelledInterrupt })
  t.throws(() => run(t, '<1'), { instanceOf: WalkCancelledInterrupt })
  t.throws(() => run(t, '<a'), { instanceOf: WalkFailedInterrupt })
  t.throws(() => run(t, '<aa'), { instanceOf: WalkFailedInterrupt })
  t.deepEqual(run(t, '<aa>'), token('aa', []))
  t.deepEqual(run(t, '<aa >'), token('aa', []))
  t.deepEqual(run(t, '<aa a>'), token('aa', [{ name: 'a' }]))
  t.deepEqual(run(t, '<aa a >'), token('aa', [{ name: 'a' }]))
  t.deepEqual(run(t, '<aa a>'), token('aa', [{ name: 'a' }]))
  t.deepEqual(run(t, '<aa a=>'), token('aa', [{ name: 'a' }]))
  t.deepEqual(run(t, '<aa a= >'), token('aa', [{ name: 'a' }]))
  t.deepEqual(run(t, '<aa a=a>'), token('aa', [{ name: 'a', value: 'a' }]))
  t.deepEqual(run(t, '<aa a=a  >'), token('aa', [{ name: 'a', value: 'a' }]))
  t.deepEqual(run(t, '<aa a="a">'), token('aa', [{ name: 'a', value: 'a' }]))
  t.deepEqual(run(t, "<aa a='a'>"), token('aa', [{ name: 'a', value: 'a' }]))
  t.deepEqual(run(t, "<aa a='a' >"), token('aa', [{ name: 'a', value: 'a' }]))
  t.deepEqual(run(t, "<aa a='a<\">' >"), token('aa', [{ name: 'a', value: 'a<\">' }]))
  const attrs = [
    { name: 'a', value: 'a' },
    { name: 'b', value: 'b' },
  ]
  t.deepEqual(run(t, "<aa a='a' b='b'>"), token('aa', attrs))
})
