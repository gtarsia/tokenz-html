import test from 'ava'
import readUntil from './read-until'
import skipUntil from './skip-until'

test('skipUntil should work correctly', (t) => {
  readUntil.cb = () => {} // disable default behaviour
  const walker = Symbol('walker')
  const strs = Symbol('strs')
  skipUntil(walker, strs)
  t.deepEqual(readUntil.calls, [{ args: [walker, strs, false] }])
})
