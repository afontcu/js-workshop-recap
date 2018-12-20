setInterval(() => {
  console.log('callback!')
}, 1000)

/*
"set a timeout, and 1 second later, i'm printing 'callback!'"
that's not what is _really_ happening

the code is divided into two pieces: the "now" piece and there's a "later" piece,
that is gonna happen in some later time. Later=now now.

callback = you are marking the reentry point where JS is gonna to resume its 
execution. the thing that JS is gonna call back when it resumes.
*/

/*
Inversion of Control
*/

// line 1. I'm in control
setTimeout(() => {
  // line 3. Here I say "you take control"
  // line 4
}, 1000)
// line 2

