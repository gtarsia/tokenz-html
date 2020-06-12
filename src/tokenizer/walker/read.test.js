import test from 'ava'
import read from './read'

test('read should return walker.text[walker.pos] and increase walker.pos by 1', (t) => {
  const char = Symbol('char')
  const pos = 3
  const text = { [pos]: char }
  const walker = { text, pos }
  t.deepEqual(read(walker), char)
  t.deepEqual(walker.pos, 4)
})
