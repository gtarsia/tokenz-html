import { stubIfTest } from 'dummee'
import { DOCTYPE_TOKEN as tokenType } from './token-types'

function doctype(walker) {
  if (walker.read(2) !== '<!') {
    return null
  }
  if (!walker.match('doctype') && !walker.match('DOCTYPE')) {
    return null
  }
  walker.skip('doctype'.length)
  const contents = walker.readUntil(['\r\n', '\n', '>'])
  return { tokenType, contents }
}

export default stubIfTest(doctype)
