import test from 'ava'
import dummee from 'dummee'
import TextWalker from './TextWalker'
import peek from './peek'
import read from './read'
import skip from './skip'
import readUntil from './read-until'
import skipUntil from './skip-until'
import skipUntilNot from './skip-until-not'
import indexOfMany from '../string/index-of-many'
import indexOfManyNot from '../string/index-of-many-not'
import {
  WalkCancelledInterrupt,
  WalkFailedInterrupt,
} from './interrupts'

function inst() {
  return new TextWalker('')
}

test('TextWalker.call should be called correctly', (t) => {
  const peekResult = Symbol('peekResult')
  peek.cb = () => peekResult // don't call it
  const i = Symbol('i')
  const count = Symbol('count')
  const w = inst()
  t.deepEqual(w.peek(i, count), peekResult)
  t.deepEqual(peek.calls.shift(), { args: [w, i, count] })
})

test('TextWalker.read should be called correctly', (t) => {
  const nextResult = Symbol('nextResult')
  read.cb = () => nextResult // don't call it
  const i = Symbol('i')
  const w = inst()
  t.deepEqual(w.read(i), nextResult)
  t.deepEqual(read.calls.shift(), { args: [w] })
})

test('TextWalker.skip should be called correctly correctly', (t) => {
  skip.cb = () => {} // don't call it
  const w = inst()
  const i = Symbol('i')
  w.skip(i)
  t.deepEqual(skip.calls.shift(), { args: [w, i] })
})

test('TextWalker.readUntil should be called correctly', (t) => {
  const result = Symbol('result')
  readUntil.cb = () => result // don't call it
  const w = inst()
  const firstArg = Symbol('firstArg')
  t.deepEqual(w.readUntil(firstArg), result)
  t.deepEqual(readUntil.calls.shift(), { args: [w, firstArg] })
})

test('TextWalker.skipUntil should be called correctly', (t) => {
  const result = Symbol('result')
  skipUntil.cb = () => result // don't call it
  const w = inst()
  const firstArg = Symbol('firstArg')
  t.deepEqual(w.skipUntil(firstArg), result)
  t.deepEqual(skipUntil.calls.shift(), { args: [w, firstArg] })
})

test('TextWalker.skipUntilNot should be called correctly', (t) => {
  const result = Symbol('result')
  skipUntilNot.cb = () => result // don't call it
  const w = inst()
  const firstArg = Symbol('firstArg')
  t.deepEqual(w.skipUntilNot(firstArg), result)
  t.deepEqual(skipUntilNot.calls.shift(), { args: [w, firstArg] })
})

test('TextWalker.nextIndexOf should be called correctly', (t) => {
  indexOfMany.cb = () => 3 // don't call it
  const w = inst()
  w.text = Symbol('text')
  w.pos = 3
  const strs = Symbol('strs')
  t.deepEqual(w.nextIndexOf(strs), 0)
  t.deepEqual(indexOfMany.calls.shift(), { args: [w.text, strs, w.pos] })
})

test('TextWalker.nextIndexOfNot should be called correctly', (t) => {
  indexOfManyNot.cb = () => 3 // don't call it
  const w = inst()
  w.text = Symbol('text')
  w.pos = 3
  const strs = Symbol('strs')
  t.deepEqual(w.nextIndexOfNot(strs), 0)
  t.deepEqual(indexOfManyNot.calls.shift(), { args: [w.text, strs, w.pos] })
})


test('TextWalker.cancel should be called correctly', (t) => {
  const msg = 'msg'
  const w = inst()
  const err = t.throws(() => w.cancel(msg), { instanceOf: WalkCancelledInterrupt })
  t.deepEqual(err.message, msg)
})

test('TextWalker.fail should be called correctly', (t) => {
  const msg = 'msg'
  const w = inst()
  const err = t.throws(() => w.fail(msg), { instanceOf: WalkFailedInterrupt })
  t.deepEqual(err.message, msg)
})

test('TextWalker.failIfEnd should be called correctly', (t) => {
  const msg = 'msg'
  const w = inst()
  w.isEnd = dummee(() => true)
  const err = t.throws(() => w.failIfEnd(msg), { instanceOf: WalkFailedInterrupt })
  t.deepEqual(err.message, msg)
  w.isEnd.cb = () => false
  t.notThrows(() => w.failIfEnd(msg))
})
