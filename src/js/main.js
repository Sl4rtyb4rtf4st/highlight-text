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
   * @TODO Add a slider for the letter spacing
   * @TODO Add a slider for the line-height 
   * 
   * @TODO Make the label text so that you no longer need the 
   * textarea but only have to klik on the label text and can 
   * either start typing or past a load of text
   * 
   * @TODO Add a print css theme so the only the processed version 
   * of the text gets printed
   * 
   */

  console.log("version 0.2.5");

  if (window.hasOwnProperty('onload')) {
    window.onload = function() {init()}
  } else {
    window.addEventListener("load", init());
  }
  document.querySelector('#highlightIt').addEventListener('input', e => highlightIt(e));
  document.querySelector('.character-color-select').addEventListener('change', e => colorChange(e));
  document.querySelector('.add-button-container').addEventListener('click', e => addCharacter(e));

  /**
   * Function to add a character and a color to the collection of 
   * characters color combinations
   * 
   * @param {object} e Event object for the click handler
   */
  const addCharacter = function(e) {
    if (e.target.type !== 'button') return;
    const children = Array.from(e.target.parentNode.children);
    // console.log(children);
    children.forEach(child => {
      if (child.tagName === 'DIV') {
        const subChildren = Array.from(child.children)
        // console.log(subChildren);
        subChildren.forEach(subChild => {
          if (subChild.id === "charColor") {
            var color = subChild.value;
          } else if (subChild.id = "addCharacter") {
            var character = subChild.value;
          }
        });
      }
    });
    // console.log(color, character);
    // updateLocalStorage(character, color, 'charColors');
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

 
  /**
   * Evemt handler function for the input even on the textarea element, 
   * the function retrieves the localstored charColors string the split 
   * value of the textarea content, feeds that to the highlighttext function
   * and places the joined result back into a DOM element
   * 
   * @param {object} e The event transmited on an input event on the 
   * textarea element
   */
  const highlightIt = (e) => {
    // Get the character colors object from the local storage
    const charColors = JSON.parse(window.localStorage.getItem('charColors'));
    // Get the input text from the textarea element
    let text = e.target.value;
    // Split the input text into seperate characters into an array
    let chars = text.split('');
    
    const charsArr = highlightText(chars, charColors);
    const output = document.querySelector('#output');
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
    chars.forEach((char, i) => {
      chars[i] = /\n/.exec(char)? '<br>': chars[i];
      for (let kar in charCols) {
        if(kar == char || kar.toUpperCase() == char) {
          const doulble = ['ie','ij','Ie','Ij','IJ','IE'];
          // Check the forlast character in conbination with the current character 
          // one of the elements in the double variable
          if (doulble.indexOf(chars[i-1] + kar) != -1) {
            // console.log(kar, char);
            chars[i] = colorChar(chars[i-1] + kar, charCols[kar]);
            // And change the forlast array item into an empty string
            chars[i-1] = '';
          } else if (char != 'e' && char != 'j' && char != 'J' && char != 'E') {
            // Perform the default action of enclosing the character in an span with the right class
            if (kar.toUpperCase() == char) {
              chars[i] = colorChar(kar.toUpperCase(), charCols[kar]);
            } else {
              chars[i] = colorChar(kar, charCols[kar]);
            }
          }
        }
      }
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
    // console.log(char, color);
    return `<span class="${color}">${char}</span>`;
  };

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
    localVar[`--${char}`] = value;
    try {
      window.localStorage.setItem(name, JSON.stringify(localVar));
    } catch (error) {
      throw "Setting the local storage failed with the error " + error;
    }
    // Rerun the init function to get everything connected to the DOM
    init();
  };

})();