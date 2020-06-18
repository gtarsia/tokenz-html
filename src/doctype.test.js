import test from 'ava'
import { TextWalker } from 'tokenz'
import doctype from './doctype'
import { DOCTYPE as type } from './token-types'

test('doctype should work correctly', (t) => {
  t.deepEqual(doctype(new TextWalker('<!DOCTYPE html>')), { contents: ' html', type })
  t.deepEqual(doctype(new TextWalker('<!doctype html>')), { contents: ' html', type })
  t.deepEqual(doctype(new TextWalker('<!doctypee')), { contents: 'e', type })
  t.deepEqual(doctype(new TextWalker('<!doctypea\n')), { contents: 'a', type })
  t.deepEqual(doctype(new TextWalker('<!doctypeg\r\n')), { contents: 'g', type })
})
