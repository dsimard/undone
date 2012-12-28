{exec} = require 'child_process'
path = require 'path'
fs = require 'fs'
{log, error, dir} = console
{minify} = require './node_modules/uglify-js'

generateDoc = (pushDoc=true, done)->
  dir = path.resolve './'
  
  # Create a tmp directory
  exec 'mktemp -d', (err, stdout, stderr)->
    error err if err?
    tmp = stdout.replace(/^\s*|\s*$/g, '') 
    
    # clone the git in that temp dir
    exec "git clone #{dir} #{tmp}", (err, stdout, stderr)->
      error err if err?
      log stdout
      
      # Change branch to gh-pages
      exec "git checkout gh-pages", {cwd:tmp}, (err, stdout, stderr)->
        error err if err?
        log stdout
        
        # Create doc        
        exec 'docco-husky undone.js', (err, stdout, stderr)->
          error err if err?
          log stdout
          
          # Move the doc to the tmp dir
          exec "cp #{dir}/docco-husky/* #{tmp} -r", (err, stdout, stderr)->
            error err if err?
            log stdout
            
            # Commit to gh-pages
            exec "git add . && git commit -am 'Generated automatically'", {cwd:tmp}, (err, stdout, stderr)->
              error err if err?
              log stdout
              
              # Push to gh-pages
              if pushDoc
                exec "git push origin gh-pages", {cwd:tmp}, (err, stdout, stderr)->
                  error err if err?
                  log stdout

task 'uglify', 'Uglify js file', ->
  fs.readdir path.resolve('./'), (err, files)->
    files.forEach (file)->
      if path.extname(file) == '.js' && file.indexOf('.min') < 0
        ugly = minify file    
        minified = path.resolve("./#{path.basename file, '.js'}.min.js")
        fs.writeFile minified, ugly.code, (err)->
          throw err if err
          log "#{minified} written!"

# Generate doc
option '-p', '--no-push', "Don't push doc"
task 'doc', 'Generate doc in gh-pages branch', (options)->
  noPush = options['no-push']? && options['no-push']
  generateDoc(!noPush)

