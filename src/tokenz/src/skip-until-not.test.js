import test from 'ava'
import readUntilNot from './read-until-not'
import skipUntilNot from './skip-until-not'

test('skipUntilNot should work correctly', (t) => {
  readUntilNot.cb = () => {} // disable default behaviour
  const walker = Symbol('walker')
  const strs = Symbol('strs')
  skipUntilNot(walker, strs)
  t.deepEqual(readUntilNot.calls, [{ args: [walker, strs, false] }])
})
