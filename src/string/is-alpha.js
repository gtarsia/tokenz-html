import { stubIfTest } from 'dummee'

function isCodeAlpha(code) {
  return (code > 64 && code < 91) // upper alpha (A-Z)
    || (code > 96 && code < 123) // lower alpha (a-z)
}

function isAlpha(str) {
  if (!str) {
    return false
  }
  for (let i = 0; i < str.length; i += 1) {
    const code = str.charCodeAt(i)
    if (!isCodeAlpha(code)) {
      return false
    }
  }
  return true
}

export default stubIfTest(isAlpha)
