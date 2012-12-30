# Undone

## Do, undo and redo library for javascript

[![Build Status](https://travis-ci.org/dsimard/undone.png?branch=master)](https://travis-ci.org/dsimard/undone)

    var add = function() { alert('Buy a cat'); }
    var remove = function() { alert('Give a cat'); }
    undone.execute(add, remove); // Alerts 'Buy a cat'
    undone.undo(); // Alerts 'Give a cat'
    undone.redo(); // Alerts 'Buy a cat'
    
See the complete documentation in [undone.js](http://dsimard.github.com/undone/undone.js.html)

## Install

To __install for a website__, copy `undone.min.js` with the other javascript files of your project and include it.


To __install in a Node.js__ project `npm install undone`

## Contribute

Give what you want to contribute to open-source : 

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_paynowCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5Q2QAJSHP8Y8Y)

You can create [issues](https://github.com/dsimard/timezonedetect/issues).

You can also contribute code :

1. Fork the code on GitHub
2. Clone your fork in your environment : `git clone git@github.com:USERNAME/undone.git`
3. Create a branch for your feature : `git checkout -b your_branch_name`
4. Write and delete code and commit as often as you can : `git commit -am "A descriptive message"`
5. Push the branch to your fork : `git push origin your_branch_name`
6. Create a pull request on GitHub (click the __Pull request__ button on your fork page)

## Need more help?

- Create an [issue](https://github.com/dsimard/undone/issues).
- Write me an email at <dsimard@azanka.ca>
