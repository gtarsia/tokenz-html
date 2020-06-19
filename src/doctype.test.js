import test from 'ava'
import { TextWalker } from 'tokenz'
import doctype from './doctype'
import { DOCTYPE_TOKEN as tokenType } from './token-types'

test('doctype should work correctly', (t) => {
  t.deepEqual(doctype(new TextWalker('<!DOCTYPE html>')), { contents: ' html', tokenType })
  t.deepEqual(doctype(new TextWalker('<!doctype html>')), { contents: ' html', tokenType })
  t.deepEqual(doctype(new TextWalker('<!doctypee')), { contents: 'e', tokenType })
  t.deepEqual(doctype(new TextWalker('<!doctypea\n')), { contents: 'a', tokenType })
  t.deepEqual(doctype(new TextWalker('<!doctypeg\r\n')), { contents: 'g', tokenType })
})
