'use strict'

var url = require('../lib/url-parse')
  , tape = require('tape')

tape('parse - "a=b&c=d"', function (t) {
  var str = 'a=b&c=d'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: 'c', value: 'd' }
  ])
  t.end()
})

tape('parse - "a=обязательный&c=d"', function (t) {
  var str = 'a=обязательный&c=d'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'обязательный' },
        { key: 'c', value: 'd' }
  ])
  t.end()
})

tape('parse - "a=b&c"', function (t) {
  var str = 'a=b&c'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: 'c', value: null }
  ])
  t.end()
})

tape('parse - "a=b&c="', function (t) {
  var str = 'a=b&c='
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: 'c', value: '' }
  ])
  t.end()
})

tape('parse - "a=b&c=&d=e"', function (t) {
  var str = 'a=b&c=&d=e'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: 'c', value: '' },
        { key: 'd', value: 'e' }
  ])
  t.end()
})

tape('parse - "a=b&c&d=e"', function (t) {
  var str = 'a=b&c&d=e'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: 'c', value: null },
        { key: 'd', value: 'e' }
  ])
  t.end()
})

tape('parse - "a=b&a=c"', function (t) {
  var str = 'a=b&a=c'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: 'a', value: 'c' }
  ])
  t.end()
})

tape('parse - "a=b&a"', function (t) {
  var str = 'a=b&a'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: 'a', value: null }
  ])
  t.end()
})

tape('parse - "a=b&=cd"', function (t) {
  var str = 'a=b&=cd'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: '', value: 'cd' }
  ])
  t.end()
})

tape('parse - "a=b&=&"', function (t) {
  var str = 'a=b&=&'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: '', value: '' },
        { key: '', value: null }
  ])
  t.end()
})

tape('parse - "a=b&&"', function (t) {
  var str = 'a=b&&'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: null, value: null },
        { key: '', value: null }
  ])
  t.end()
})

tape('parse - "a=b&&c=d"', function (t) {
  var str = 'a=b&&c=d'
  t.deepEqual(url.parse(str), [
        { key: 'a', value: 'b' },
        { key: null, value: null },
        { key: 'c', value: 'd' }
  ])
  t.end()
})

// Stringification
tape('stringify - "a=b&c=d"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: 'c', value: 'd' }
  ]
  t.equal(url.stringify(parsed), 'a=b&c=d')
  t.end()
})

tape('stringify - "a=обязательный&c=d"', function (t) {
  var parsed = [
        { key: 'a', value: 'обязательный' },
        { key: 'c', value: 'd' }
  ]
  t.equal(url.stringify(parsed), 'a=%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9&c=d')
  t.end()
})

tape('stringify - "a=b&c"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: 'c', value: null }
  ]
  t.equal(url.stringify(parsed), 'a=b&c')
  t.end()
})

tape('stringify - "a=b&c="', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: 'c', value: '' }
  ]

  t.equal(url.stringify(parsed), 'a=b&c=')
  t.end()
})

tape('stringify - "a=b&c=&d=e"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: 'c', value: '' },
        { key: 'd', value: 'e' }
  ]

  t.equal(url.stringify(parsed), 'a=b&c=&d=e')
  t.end()
})

tape('stringify - "a=b&c&d=e"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: 'c', value: null },
        { key: 'd', value: 'e' }
  ]

  t.equal(url.stringify(parsed), 'a=b&c&d=e')
  t.end()
})

tape('stringify - "a=b&a=c"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: 'a', value: 'c' }
  ]

  t.equal(url.stringify(parsed), 'a=b&a=c')
  t.end()
})

tape('stringify - "a=b&a"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: 'a', value: null }
  ]
  t.equal(url.stringify(parsed), 'a=b&a')
  t.end()
})

tape('stringify - "a=b&=cd"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: '', value: 'cd' }
  ]
  t.equal(url.stringify(parsed), 'a=b&=cd')
  t.end()
})

tape('stringify - "a=b&=&"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: '', value: '' },
        { key: '', value: null }
  ]
  t.equal(url.stringify(parsed), 'a=b&=&')
  t.end()
})

tape('stringify - "a=b&&"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: null, value: null },
        { key: '', value: null }
  ]
  t.equal(url.stringify(parsed), 'a=b&&')
  t.end()
})


tape('stringify - "a=b&&c=d"', function (t) {
  var parsed = [
        { key: 'a', value: 'b' },
        { key: null, value: null },
        { key: 'c', value: 'd' }
  ]
  t.equal(url.stringify(parsed), 'a=b&&c=d')
  t.end()
})

tape('url parse - "http://httpbin.org/get?z=b,c"', function (t) {
  var parsed = url('http://httpbin.org/get?z=b,c')

  t.equal(parsed.search, '?z=b,c')
  t.equal(parsed.query, 'z=b,c')
  t.equal(parsed.path, '/get?z=b,c')
  t.equal(parsed.href, 'http://httpbin.org/get?z=b,c')

  t.end()
})
