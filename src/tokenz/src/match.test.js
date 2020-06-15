import test from 'ava'
import match from './match'

const text = 'qwe1asd2zxc3'

test('match should work correctly', (t) => {
  const pos = 3
  const w = { text, pos }
  t.deepEqual(match(w, '1'), true)
  t.deepEqual(match(w, 'q'), false)
  t.deepEqual(match(w, ['q', 'w', '1']), true)
  t.deepEqual(match(w, ['q', 'w', 'e']), false)
  t.deepEqual(match(w, ['q', 'w', '1a']), true)
})
