import React from 'react';

class Util {
  static recursiveMap(children, fn) {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }
  
      if (child.props.children) {
        child = React.cloneElement(child, {
          children: Util.recursiveMap(child.props.children, fn)
        });
      }
  
      return fn(child);
    });
  }

  static randomNumber(min, max) {  
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
  } 

  static shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}

export default Util
