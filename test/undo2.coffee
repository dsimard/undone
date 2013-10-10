should = require '../node_modules/should'
Undone = require '../u'
{dir} = console

describe Undone, ->
  u = new Undone()

  it 'is loaded', (done)->
    array = []

    add = ->
      array.push (new Date).toString()

    u.execute add, ->
      dir arguments
      done()