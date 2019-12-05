(function(){
  /**
   * This file contains the buisness logic of the app
   * The characters and associated color are set. The 
   * text input is retrieved from the dom and functionality 
   * is defined for the app.
   * 
   * @TODO Make pretty
   * 
   * @TODO Add the option to assign extra letters 
   * 
   * @TODO Refactor to put all the functionality insite an 
   * object (MVC anyone).
   * 
   * @TODO Pour it all into a VUE/react mold
   * 
   * @TODO Make the label text so that you no longer need the 
   * textarea but only have to klik on the label text and can 
   * either start typing or past a load of text
   * 
   */

  console.log("version 0.2.0");

  if (window.hasOwnProperty('onload')) {
    window.onload = function() {init()}
  } else {
    window.addEventListener("load", init());
  }

  /**
   * Function to initialize the script by checking localstorage for 
   * required info and if not present adding it
   * 
   * @returns void
   */
  const init = function() {
    const localStore = window.localStorage;
    if (!localStore.getItem('charColors')) {
      try {
        localStore.setItem('charColors', JSON.stringify({
          'd': 'yellow',
          'b': 'blue',
          'p': 'purple',
          'r': 'red',
          't': 'brown',
          'j': 'green',
          'e': 'pink'
        }));
      } catch (error) {
        throw "Setting the local storage failed with the error " + error;
      }
    }
    if (!localStore.getItem('customProps')) {
      try { 
        localStore.setItem('customProps', JSON.stringify({
          '--d': '#bfbf00',
          '--b': '#0000ff',
          '--p': '#800080',
          '--r': '#ff0000',
          '--t': '#8b4513',
          '--ij': '#008000',
          '--ie': '#ff69b4',
        }));
      } catch (error) {
        throw "Setting the local storage failed with the error " + error;
      }
    }
    const customProps = JSON.parse(localStore.getItem('customProps'));

    // Iterate over the object and assign the custum properties to the documentElement 
    // style with the correct color value
    for (let prop in customProps) {
      let char = prop.replace('--', '');
      document.querySelector(`#char-${char}`).value = customProps[prop];
      document.documentElement.style.setProperty(prop, customProps[prop]);
    }
  };

 
  document.querySelector('#highlightIt').addEventListener('input', e => highlightIt(e));

  
  /**
   * 
   * 
   * @param {object} e The event transmited on an input event on the 
   * textarea element
   */
  const highlightIt = (e) => {
    // Get the character colors object from the local storage
    const charColors = window.localStorage.getItem('charColors');
    // Get the input text from the textarea element
    let text = e.target.value;
    // Split the input text into seperate characters into an array
    let chars = text.split('');
    
    const output = document.querySelector('#output');
    const charsArr = highlightText(chars, charColors);
    output.innerHTML = charsArr.join('');
  };

  /**
   * Function to compare every character in the text input into the 
   * textarea to the object of special characters and when found to 
   * send them with the corresponding classname to the colorChar function
   * 
   * @param {array} chars An array with all the characters contained within the textarea 
   * element
   * @param {*} charCols An object with all the charactes and all their apropriate color 
   * classnames
   * 
   * @returns array And array with all the characters, the special characters will be 
   * encapsulated inside a span with a correct classname
   */
  const highlightText = (chars, charCols) => {
    chars.forEach((char, j) => {
      chars[j] = /\n/.exec(char)? '<br>': chars[j];
      for (let kar in charCols) {
        if(kar == char || kar.toUpperCase() == char) {
          // Check the forlast character was to see if it was an 'i'
          if (chars[j-1] == 'i' || chars[j-1] == 'I') {
            if (chars[j-1] == 'I') {
              chars[j] = colorChar('I' + char, charCols[kar]);
            } else {
              // If it was an 'i' or 'I' then enclose both in an span with the apropriate class
              chars[j] = colorChar('i' + char, charCols[kar]);
            }
            // And change the forlast array item into an empty string
            chars[j-1] = '';
          } else if (char != 'e' && char != 'j' && char != 'J' && char != 'E') {
            // Perform the default action of enclosing the character in an span with the right class
            if (kar.toUpperCase() == char) {
              chars[j] = colorChar(kar.toUpperCase(), charCols[kar]);
            } else {
              chars[j] = colorChar(kar, charCols[kar]);
            }
          }
        }
      }
      // charCols.forEach((charCol) => {
      //   // If character in the charCol array item is the same as the character in the chars array item
      //   if(charCol[0] == char || charCol[0].toUpperCase() == char) {
      //     // Check the forlast character was to see if it was an 'i'
      //     if (chars[j-1] == 'i' || chars[j-1] == 'I') {
      //       if (chars[j-1] == 'I') {
      //         chars[j] = colorChar('I' + char, charCol[1]);
      //       } else {
      //         // If it was an 'i' or 'I' then enclose both in an span with the apropriate class
      //         chars[j] = colorChar('i' + char, charCol[1]);
      //       }
      //       // And change the forlast array item into an empty string
      //       chars[j-1] = '';
      //     } else if (char != 'e' && char != 'j' && char != 'J' && char != 'E') {
      //       // Perform the default action of enclosing the character in an span with the right class
      //       if (charCol[0].toUpperCase() == char) {
      //         chars[j] = colorChar(charCol[0].toUpperCase(), charCol[1]);
      //       } else {
      //         chars[j] = colorChar(charCol[0], charCol[1]);
      //       }
      //     }
      //   }
      // });
    });
    return chars;
  };
  
  /**
   * Function to enclose a given character in a span with a class 
   * representing the color the the character should get
   * 
   * @param {string} char The character 
   * @param {string} color The color class name 
   * @returns string Template sting of the char inclosed in a span
   */
  const colorChar = function(char, color) {
    return `<span class="${color}">${char}</span>`;
  };

  document.querySelector('.character-color-select').addEventListener('change', e => colorChange(e));

  /**
   * This function deals with the 'change' event when the color value 
   * is changed for a given character, 
   * 
   * @param {object} e The event object passed from an event handler
   * @returns void
   */
  const colorChange = function (e) {
    // Get the event target
    const target = e.target;
    // Get the value of the target element
    const value = target.value;
    // Get the character in question
    const char = target.name.replace('char-', '');
    console.log(`--${char}`, value);
    const element = document.documentElement;
    // Assign the the color value to the custom property assigned to the documentelement style
    element.style.setProperty(`--${char}`, value);
    // Update the localstorage 
    updateLocalStorage(char, value, 'customProps');
  };

  /**
   * Function to update the locastorage
   * 
   * @param {string} char Character to be assigned a different value
   * @param {string} value Color value to be assigned to the character
   */
  const updateLocalStorage = function(char, value, name) {
    const localVar = JSON.parse(window.localStorage.getItem(name));
    console.log(localVar);
    localVar[`--${char}`] = value;
    try {
      window.localStorage.setItem(name, JSON.stringify(localVar));
    } catch (error) {
      throw "Setting the local storage failed with the error " + error;
    }
    init();
  };

})();