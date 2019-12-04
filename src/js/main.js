(function(){
  /**
   * This file contains the buisness logic of the app
   * The characters and associated color are set. The 
   * text input is retrieved from the dom and functionality 
   * is defined for the app.
   * 
   * @TODO Make pretty
   * 
   * @TODO Put the main business logic in it's own function and 
   * call the function in the eventlister
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

  console.log("version 0.0.2");

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
  
  document.querySelector('#highlightIt').addEventListener('input', e => {
    // Get the input text from the textarea element
    let text = e.target.value;
    // Get the output element
    const output = document.querySelector('#output');
    // Split the input text into seperate characters into an array
    let chars = text.split('');
    
    // For each of the characters check if it is a part of the charColors array 
    chars.forEach((char, j) => {
      chars[j] = /\n/.exec(char)? '<br>': chars[j];
      charColors.forEach((charColor,i) => {
        // If character in the charColor array item is the same as the character in the chars array item
        if(charColor[0] == char) {
          // Check the forlast character was to see if it was an 'i'
          if (chars[j-1] == 'i') {
            // If it was an 'i' then enclose both in an span with the apropriate class
            chars[j] = colorChar('i' + char, charColor[1]);
            // And change the forlast array item into an empty string
            chars[j-1] = '';
          } else if (char != 'e' && char != 'j') {
            // Perform the default action of enclosing the character in an span with the right class
            chars[j] = colorChar(charColor[0], charColor[1]);
          }
        }
      });
    });

    // Joint the array of characters back into a single string and put it in 
    output.innerHTML = chars.join('');
  });

  const colorChar = function(char, color) {
    return `<span class="${color}">${char}</span>`;
  }

})();