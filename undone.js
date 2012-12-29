(function() {
  var jsk = {
    dids : [],
    undids : [],
    /*
     * ### execute(doFunction, undoFunction)
     *
     * Execute a function that can be undone
     *
     *      var add = function() { alert('Buy a cat'); }
     *      var remove = function() { alert('Give a cat'); }
     *      undone.execute(add, remove) 
     *      // will alert 'Buy a cat'
    */
    execute : function execute(doFunction, undoFunction, options) {
      // If in async, it will not execute the do when calling redo
      // (see redoFunction)
      var data;

      if (options === undefined || options === null) { options = {}; }
      
      if (this.isFct(doFunction) && options.async !== true) { 
        data = doFunction();
      }

      // This causes me problem on async
      // TODO : This is not thread safe but I didn't find yet how to do it
      if (jsk.isInAsyncRedo !== true) {
        this.undids = [];
      }
      jsk.isInAsyncRedo = false; 

      // If there's data in options, use them
      if (options.data) { data = options.data; }

      // Create a new undo and pass what the do returned
      var wrappedUndo = function wrappedUndo() {
        undoFunction(data);
      };

      this.dids.push({redo:doFunction, undo:undoFunction, 
        wrappedUndo:wrappedUndo, options:options});

      this.fireEvents();

      return data;
    },
    /*
     * ### undo()
     *
     * Undo a executed function called with `execute`
     *
     *      var add = function() { alert('Buy a cat'); }
     *      var remove = function() { alert('Give a cat'); }
     *      undone.execute(add, remove)
     *      undone.undo()
     *      // will alert 'Give a cat'
    */
    undo : function undo() {
      var fct = this.dids && this.dids.length > 0 ? this.dids.pop() : null;
      if (this.isFct(fct.wrappedUndo)) {
        fct.wrappedUndo();
        
        // There can be no "do" so don't push a redo
        if (this.isFct(fct.redo)) {
          this.undids.push({redo:fct.redo, undo:fct.undo, 
          options : fct.options});
        }
      }

      this.fireEvents();
    },
    /*
     * ### Redo()
     *
     * Redo a executed function that was undone
     *
     *      var add = function() { alert('Buy a cat'); }
     *      var remove = function() { alert('Give a cat'); }
     *      undone.execute(add, remove)
     *      undone.undo()
     *      undone.redo()
     *      // will alert 'Buy a cat'
    */
    redo : function redo() {
      var fct = this.undids && this.undids.length > 0 ? this.undids.pop() : null;
      if (this.isFct(fct.redo)) {
        jsk.isInAsyncRedo = fct.options.async;
        var data = fct.redo();
        
        // If there's data in options, use them
        if (fct.options.data) { data = fct.options.data; }
        
        var wrappedUndo = function wrappedUndo() {
          fct.undo(data);
        };
        
        // Put the redo in dids (if in async, skip this)
        if (fct.options.async !== true) {
          this.dids.push({redo:fct.redo,undo:fct.undo,
            wrappedUndo:wrappedUndo, options:fct.options});
        }
      }
      
      this.fireEvents();
    },
    /*
     * ### canUndo()
     *
     * If there are functions to undo
     *
     *      undone.canUndo() // returns `false`
     *      var add = function() { alert('Buy a cat'); }
     *      var remove = function() { alert('Give a cat'); }
     *      undone.execute(add, remove)
     *      undone.canUndo() // returns `true`
    */
    canUndo : function() {
      return this.dids.length > 0;
    },
    /*
     * ### canRedo()
     *
     * If there are functions to redo
     *
     *      var add = function() { alert('Buy a cat'); }
     *      var remove = function() { alert('Give a cat'); }
     *      undone.execute(add, remove)
     *      undone.canRedo() // returns false
     *      undone.undo()
     *      undone.canRedo() // returns true
    */    
    canRedo : function() {
      return this.undids.length > 0;
    },
    /*
     * ### onChange()
     *
     * This event is called when there's a change in the executions
     *
     *      var changed = function() { alert('There was a change'); }
     *      undone.onChange = changed;
     *      undone.execute(add, remove); // alerts 'There was a change'
     *      undone.undo(); // alerts 'There was a change'
    */
    onChange : function() {
      return false;
    },
    // fired when something changes
    fireEvents : function() {
      if (this.onChange) { this.onChange(); }
    },
    // If 22222is Function
    isFct : function(fct) {
      return fct && typeof fct == "function";
    }
  };
  
  // Creates the base namespaces
  if (typeof window !== 'undefined') {
    // Backward compatibility
    if (window.javascriptKataDotCom === undefined) { window.javascriptKataDotCom = {}; }
    if (window.jsKata === undefined) { window.jsKata = window.javascriptKataDotCom; }
    if (window.jskata === undefined) { window.jskata = window.javascriptKataDotCom; }
    if (window.jsk === undefined) { window.jsk = window.javascriptKataDotCom; }
    if (window._  === undefined) { window._ = window.javascriptKataDotCom; }
    window.javascriptKataDotCom.undo = jsk; 
    window.javascriptKataDotCom.u = jsk;
    window.jskataUndo = window.javascriptKataDotCom.undo; 
    
    // Assign to undone
    window.undone = jsk;
    
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = jsk;
  }
})();
