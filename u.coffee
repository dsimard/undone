class Undone
  @actions = []

  execute : (do_, callback)->
    do_()
    callback?()



module.exports = Undone if typeof module != 'undefined' && typeof module.exports != 'undefined'