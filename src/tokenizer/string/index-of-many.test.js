import test from 'ava'
import indexOfMany from './index-of-many'

const text = 'asd1zxc2asd3'
test('indexOfMany should work correctly', (t) => {
  let result = indexOfMany(text, ['3', '2', '1'])
  t.deepEqual(result, 3)
  result = indexOfMany(text, '2')
  t.deepEqual(result, 7)
})

test('indexOfMany should accept fromIndex arg', (t) => {
  const result = indexOfMany(text, ['3', '2', '1'], 4)
  t.deepEqual(result, 7)
})

test('indexOfMany should not count not found values', (t) => {
  const result = indexOfMany(text, ['r', '2', '3'])
  t.deepEqual(result, 7)
})

test('indexOfMany should return -1 if none are found', (t) => {
  const result = indexOfMany(text, ['r', 'q', 't'])
  t.deepEqual(result, -1)
})

test('indexOfMany should return -1 if no args are provided', (t) => {
  const result = indexOfMany(text, [])
  t.deepEqual(result, -1)
})
