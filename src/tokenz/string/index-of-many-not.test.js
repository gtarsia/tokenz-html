import test from 'ava'
import indexOfManyNot from './index-of-many-not'

const text = 'qwe1asd2zxc3'

test('indexOfManyNot should work correctly with an array', (t) => {
  const result = indexOfManyNot(text, ['q', 'w', 'e'])
  t.deepEqual(result, 3)
})

test('indexOfManyNot should work correctly with a single string', (t) => {
  const result = indexOfManyNot(text, 'q')
  t.deepEqual(result, 1)
})

test('indexOfManyNot should work correctly with a fromIndex', (t) => {
  const result = indexOfManyNot(text, 'w', 1)
  t.deepEqual(result, 2)
})
