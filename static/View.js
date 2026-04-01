/* eslint-disable no-unused-vars */
const BLANK = ''
const SPACE = '&nbsp;'
const TAB = '&nbsp;&nbsp;&nbsp;&nbsp;'
const NEWLINE = '<br>'
function clr () {
  document.body.style.fontFamily = 'Courier New'
  document.body.innerHTML = BLANK
}
function out (newText) {
  document.body.innerHTML += newText
}
function print (newText) {
  document.body.innerHTML += NEWLINE + newText
}
