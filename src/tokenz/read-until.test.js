import test from 'ava'
import readUntil from './read-until'

const text = 'qwe1asd2zxc3'

test('readUntil should work correctly', (t) => {
  const pos = 0
  const w = { text, pos }
  t.deepEqual(readUntil(w, '1'), 'qwe')
  t.deepEqual(w.pos, 3)
})

test('readUntil should work correctly with different position', (t) => {
  const pos = 3
  const w = { text, pos }
  t.deepEqual(readUntil(w, '2'), '1asd')
  t.deepEqual(w.pos, 7)
})

test('readUntil should return all text and set pos to text length if chars are not found', (t) => {
  const pos = 4
  const w = { text, pos }
  t.deepEqual(readUntil(w, ' '), 'asd2zxc3')
  t.deepEqual(w.pos, text.length)
})

test('readUntil should return nothing and not change pos if char is immediate', (t) => {
  const pos = 11
  const w = { text, pos }
  t.deepEqual(readUntil(w, '3'), '')
  t.deepEqual(w.pos, 11)
})

test('readUntil should return nothing and not change pos if char is immediate (eot)', (t) => {
  const pos = 3
  const w = { text, pos }
  t.deepEqual(readUntil(w, '1'), '')
  t.deepEqual(w.pos, 3)
})

test('readUntil should return nothing if pos is end of file', (t) => {
  const pos = text.length
  const w = { text, pos }
  debugger
  const result = readUntil(w, '')
  t.deepEqual(result, '')
  t.deepEqual(w.pos, text.length)
})
