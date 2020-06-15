import test from 'ava'
import dummee from 'dummee'
import peek from './peek'

test('peek should try to access position i of walker.text', (t) => {
  const i = 3
  const result = Symbol('result')
  const pos = 4
  const slice = dummee()
  const text = { [i + pos]: result, slice }
  const walker = { text, pos }
  t.deepEqual(peek(walker, i), result)
  t.deepEqual(slice.calls, []) // shouldnt use slice
})

test('peek should try to access position 0 of walker.text', (t) => {
  const result = Symbol('result')
  const pos = 0
  const text = [result]
  const walker = { text, pos }
  t.deepEqual(peek(walker), result)
})

test("peek with count 0 should immediately return ''", (t) => {
  const count = 0
  t.deepEqual(peek(null, null, count), '')
})

test('peek with count > 1 should call slice on text', (t) => {
  const i = 3
  const result = Symbol('result')
  const pos = 4
  const slice = dummee(() => result)
  const text = { [i + pos]: result, slice }
  const walker = { text, pos }
  const count = 4
  debugger
  t.deepEqual(peek(walker, i, count), result)
  t.deepEqual(slice.calls, [{ args: [i + pos, i + count + pos] }])
})
