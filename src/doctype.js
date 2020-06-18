import { stubIfTest } from 'dummee'
import { DOCTYPE as type } from './token-types'

function doctype(walker) {
  if (walker.read(2) !== '<!') {
    return null
  }
  if (!walker.match('doctype') && !walker.match('DOCTYPE')) {
    return null
  }
  walker.skip('doctype'.length)
  const contents = walker.readUntil(['\r\n', '\n', '>'])
  return { type, contents }
}

export default stubIfTest(doctype)
