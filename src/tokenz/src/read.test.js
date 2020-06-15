import test from 'ava'
import dummee from 'dummee'
import read from './read'

test('read should return walker.text[walker.pos] and increase walker.pos by 1', (t) => {
  const chars = Symbol('chars')
  const slice = dummee(() => chars)
  const pos = 3
  const count = 5
  const text = { slice }
  const walker = { text, pos }
  t.deepEqual(read(walker, count), chars)
  t.deepEqual(slice.calls, [{ args: [pos, pos + count] }])
  t.deepEqual(walker.pos, pos + count)
})
