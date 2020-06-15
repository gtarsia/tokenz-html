/* eslint-disable quotes */
import test from 'ava'
import startTag from './start-tag'
import TextWalker from './tokenz/TextWalker'
import {
  WalkCancelledInterrupt,
} from './tokenz/interrupts'
import { START_TAG } from './token-types'

const type = START_TAG

function token(name, attrs = []) {
  return { name, attrs, type }
}

function run(t, text) {
  const walker = new TextWalker(text)
  const result = startTag(walker)
  t.deepEqual(walker.isEnd(), true)
  return result
}

test('startTag should cancel non matches', (t) => {
  t.throws(() => run(t, ''), { instanceOf: WalkCancelledInterrupt })
  t.throws(() => run(t, ' '), { instanceOf: WalkCancelledInterrupt })
  t.throws(() => run(t, '<'), { instanceOf: WalkCancelledInterrupt })
  t.throws(() => run(t, '<1'), { instanceOf: WalkCancelledInterrupt })
})
test('startTag should accept name only start tags', (t) => {
  t.deepEqual(run(t, '<a'), token('a'))
  t.deepEqual(run(t, '<ab'), token('ab'))
  t.deepEqual(run(t, '<ab>'), token('ab'))
  t.deepEqual(run(t, '<ab '), token('ab'))
  t.deepEqual(run(t, '<ab >'), token('ab'))
  t.deepEqual(run(t, '<ab  '), token('ab'))
})

test('startTag should accept tags with unvalued attributes', (t) => {
  t.deepEqual(run(t, '<ab c'), token('ab', [{ name: 'c' }]))
  t.deepEqual(run(t, '<ab c>'), token('ab', [{ name: 'c' }]))
  t.deepEqual(run(t, '<ab c '), token('ab', [{ name: 'c' }]))
  t.deepEqual(run(t, '<ab c >'), token('ab', [{ name: 'c' }]))
  t.deepEqual(run(t, '<ab c=>'), token('ab', [{ name: 'c' }]))
  t.deepEqual(run(t, '<ab c= >'), token('ab', [{ name: 'c' }]))
  t.deepEqual(run(t, '<ab c=  '), token('ab', [{ name: 'c' }]))
})

test('startTag should accept tags with valued attributes', (t) => {
  t.deepEqual(run(t, '<ab c=d'), token('ab', [{ name: 'c', value: 'd' }]))
  t.deepEqual(run(t, '<ab c=d>'), token('ab', [{ name: 'c', value: 'd' }]))
  t.deepEqual(run(t, '<ab c=d '), token('ab', [{ name: 'c', value: 'd' }]))
  t.deepEqual(run(t, '<ab c=d >'), token('ab', [{ name: 'c', value: 'd' }]))
  t.deepEqual(run(t, '<ab c=d  '), token('ab', [{ name: 'c', value: 'd' }]))
  t.deepEqual(run(t, `<ab c="d">`), token('ab', [{ name: 'c', value: 'd' }]))
  t.deepEqual(run(t, `<ab c='d'>`), token('ab', [{ name: 'c', value: 'd' }]))
  t.deepEqual(run(t, `<ab c='d' >`), token('ab', [{ name: 'c', value: 'd' }]))
  t.deepEqual(run(t, `<ab c='d<">' >`), token('ab', [{ name: 'c', value: 'd<">' }]))
  const attrs = [
    { name: 'c', value: 'd' },
    { name: 'e', value: 'f' },
  ]
  t.deepEqual(run(t, "<ab c='d' e='f' "), token('ab', attrs))
  t.deepEqual(run(t, "<ab c='d' e='f'>"), token('ab', attrs))
})
