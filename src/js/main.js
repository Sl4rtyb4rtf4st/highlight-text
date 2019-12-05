(function(){
  /**
   * This file contains the buisness logic of the app
   * The characters and associated color are set. The 
   * text input is retrieved from the dom and functionality 
   * is defined for the app.
   * 
   * @TODO Make pretty
   * 
   * @TODO Add the option to assign extra letters and colors and 
   * change colors
   * 
   * @TODO Refactor the charColors array, foreach functionality 
   * to use an character: color object instead
   * 
   * @TODO With longer texts with paragraphs, create an array 
   * of paragraphs and then pass the paragraph array items to 
   * the function to provide color to the text
   * 
   * @TODO Make the label text so that you cno longer need the 
   * textarea but only have to klik on the label text and can 
   * either start typing or past a load of text
   * 
   */

  console.log("version 0.1.3");

  window.onload = function() {init()}
  // window.addEventListener("load", init());

  const init = function() {
    // Initiate the script
  }

  const charColors = [
    ['d', 'yellow'],
    ['b', 'blue'],
    ['p', 'purple'],
    ['r', 'red'],
    ['t', 'brown'],
    ['j', 'green'],
    ['e', 'pink'],
  ];
  
  document.querySelector('#highlightIt').addEventListener('input', e => highlightIt(e));

  const highlightIt = (e) => {
    // Define the colors
    const charColors = [
      ['d', 'yellow'],
      ['b', 'blue'],
      ['p', 'purple'],
      ['r', 'red'],
      ['t', 'brown'],
      ['j', 'green'],
      ['e', 'pink'],
    ];
    // Get the input text from the textarea element
    let text = e.target.value;
    // Split the input text into seperate characters into an array
    let chars = text.split('');
    
    const output = document.querySelector('#output');
    const charsArr = highlightText(chars, charColors);
    output.innerHTML = charsArr.join('');
  }

  const highlightText = (chars, charCols) => {
    chars.forEach((char, j) => {
      chars[j] = /\n/.exec(char)? '<br>': chars[j];
      charCols.forEach((charCol) => {
        // If character in the charCol array item is the same as the character in the chars array item
        if(charCol[0] == char || charCol[0].toUpperCase() == char) {
          // Check the forlast character was to see if it was an 'i'
          if (chars[j-1] == 'i' || chars[j-1] == 'I') {
            if (chars[j-1] == 'I') {
              chars[j] = colorChar('I' + char, charCol[1]);
            } else {
              // If it was an 'i' or 'I' then enclose both in an span with the apropriate class
              chars[j] = colorChar('i' + char, charCol[1]);
            }
            // And change the forlast array item into an empty string
            chars[j-1] = '';
          } else if (char != 'e' && char != 'j' && char != 'J' && char != 'E') {
            // Perform the default action of enclosing the character in an span with the right class
            if (charCol[0].toUpperCase() == char) {
              chars[j] = colorChar(charCol[0].toUpperCase(), charCol[1]);
            } else {
              chars[j] = colorChar(charCol[0], charCol[1]);
            }
          }
        }
      });
    });
    return chars;
  }

  const colorChar = function(char, color) {
    return `<span class="${color}">${char}</span>`;
  }

})();