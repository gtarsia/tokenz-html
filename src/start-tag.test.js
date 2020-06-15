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
  t.throws(() => run(t, '<>'), { instanceOf: WalkCancelledInterrupt })
})
test('startTag should accept name only start tags', (t) => {
  t.deepEqual(run(t, '<1'), token('1'))
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

test('startTag should leave pos correctly', (t) => {
  const walker = new TextWalker("<ab c='d' e='f'>zxc")
  const result = startTag(walker)
  const attrs = [
    { name: 'c', value: 'd' },
    { name: 'e', value: 'f' },
  ]
  t.deepEqual(result, token('ab', attrs))
  t.deepEqual(walker.match('zxc'), true)
})
