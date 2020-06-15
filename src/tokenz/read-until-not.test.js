import test from 'ava'
import readUntilNot from './read-until-not'

const text = 'qwe1asd2zxc3'

test('readUntilNot should work correctly', (t) => {
  const pos = 0
  const w = { text, pos }
  t.deepEqual(readUntilNot(w, ['q', 'w']), 'qw')
  t.deepEqual(w.pos, 2)
})

test('readUntilNot should work correctly with different position', (t) => {
  const pos = 3
  const w = { text, pos }
  t.deepEqual(readUntilNot(w, '1asd'.split('')), '1asd')
  t.deepEqual(w.pos, 7)
})

test('readUntilNot should return all text and set pos to text length if chars are not found', (t) => {
  const pos = 4
  const w = { text, pos }
  t.deepEqual(readUntilNot(w, text.split('')), 'asd2zxc3')
  t.deepEqual(w.pos, text.length)
})

test('readUntilNot should return nothing and not change pos if char is immediate', (t) => {
  const pos = 3
  const w = { text, pos }
  t.deepEqual(readUntilNot(w, ' '), '')
  t.deepEqual(w.pos, 3)
})

test('readUntilNot should return nothing and not change pos if char is immediate (eot)', (t) => {
  const pos = 11
  const w = { text, pos }
  t.deepEqual(readUntilNot(w, '3'), '3')
  t.deepEqual(w.pos, text.length)
})

test('readUntilNot should return nothing if pos is end of file', (t) => {
  const pos = text.length
  const w = { text, pos }
  const result = readUntilNot(w, '')
  t.deepEqual(result, '')
  t.deepEqual(w.pos, text.length)
})
