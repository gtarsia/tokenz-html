import test from 'ava'
import isAlpha from './is-alpha'

test('isAlpha should work correctly', (t) => {
  let result = isAlpha('@')
  t.deepEqual(result, false)
  debugger
  result = isAlpha('A')
  t.deepEqual(result, true)
  result = isAlpha('Z')
  t.deepEqual(result, true)
  result = isAlpha('[')
  t.deepEqual(result, false)

  result = isAlpha('`')
  t.deepEqual(result, false)
  result = isAlpha('a')
  t.deepEqual(result, true)
  result = isAlpha('z')
  t.deepEqual(result, true)
  result = isAlpha('{')
  t.deepEqual(result, false)
})

test('isAlpha on empty string returns false', (t) => {
  const result = isAlpha('')
  t.deepEqual(result, false)
})
