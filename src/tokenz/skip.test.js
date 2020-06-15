import test from 'ava'
import skip from './skip'

test('skip should increase walker.pos by one', (t) => {
  const pos = 3
  const walker = { pos }
  skip(walker)
  t.deepEqual(walker.pos, 4)
})
