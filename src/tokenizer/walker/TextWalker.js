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

export default class TextWalker {
  constructor(text) {
    this.pos = 0
    this.text = text
    this.snaps = []
  }

  isEnd() {
    return this.pos >= this.text.length
  }

  peek(i, count) {
    return peek(this, i, count)
  }

  read() {
    return read(this)
  }

  readUntil(strs) {
    return readUntil(this, strs)
  }

  skip(i) {
    return skip(this, i)
  }

  skipUntil(strs) {
    return skipUntil(this, strs)
  }

  skipUntilNot(strs) {
    return skipUntilNot(this, strs)
  }

  nextIndexOf(strs) {
    return indexOfMany(this.text, strs, this.pos) - this.pos
  }

  nextIndexOfNot(strs) {
    return indexOfManyNot(this.text, strs, this.pos) - this.pos
  }

  // eslint-disable-next-line class-methods-use-this
  cancel(msg) {
    throw new WalkCancelledInterrupt(msg)
  }

  // eslint-disable-next-line class-methods-use-this
  fail(msg) {
    throw new WalkFailedInterrupt(msg)
  }

  failIfEndOfText(msg) {
    if (this.isEnd()) {
      throw new WalkFailedInterrupt(msg)
    }
  }

  walk(fns) {
    let token = null
    fns.find(fn => {
      this.snaps.push(this.pos)
      try {
        token = fn()
      } catch (err) {
        if (/Cancelled/.test(err.name)) {
          this.pos = this.snaps.pop()
          return
        }
        throw err
      }
      this.snaps.pop()
      return token
    })
    return token
  }
}
