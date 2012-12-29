should = require 'should'
undonejs = require '../undone.js'
{equal, ok} = require 'assert'
{dir} = console

describe 'Undo', ->
  it "basic test", ->
    executed = false
    undone = false
    undonejs.execute (->
      executed = true
    ), ->
      undone = true

    ok executed, "it was executed"
    equal undonejs.dids.length, 1
    ok not undone, "it was not undone"
    equal undonejs.undids.length, 0
    
    # Undo
    undonejs.undo()
    ok undone, "it was undone"
    equal undonejs.dids.length, 0
    equal undonejs.undids.length, 1
    
    # Redo
    undonejs.redo()
    ok undone, "it was redone"
    equal undonejs.dids.length, 1
    equal undonejs.undids.length, 0

  it "onChange", ->
    called = 0
    undonejs.onChange = ->
      called++

    undonejs.execute (->
    ), ->

    equal 1, called, "called 1 time"
    undonejs.undo()
    equal 2, called, "called 2 times"
    undonejs.redo()
    equal 3, called, "called 3 times"
    undonejs.onChange = null
    undonejs.undo()
    equal 3, called, "called 3 times (the event is now null)"

  it "data from execution is passed to undo", ->
    rnd = 0
    undonejs.execute (->
      rnd = Math.round(Math.random() * 9999999)
      rnd
    ), (data) ->
      equal data, rnd, "randoms are the same"

    oldRnd = rnd
    undonejs.undo()
    undonejs.redo()
    ok oldRnd isnt rnd, "rnd has changed"
    undonejs.undo()

