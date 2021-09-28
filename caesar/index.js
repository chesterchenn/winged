const UPPERCASE = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LOWERCASE = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// gives a negative result for negative numbers
// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
Number.prototype.mod = function(n) {
  return (( this % n) + n) % n;
};

/**
 * @param {number} key
 * @param {string} message
 * @param {boolean} isEncrypt
 * @return {string}
 */
function caeser(key, message, isEncrypt) {
  if (typeof key !== 'number') {
    throw new Error(`Expected key to be a mumber`);
  }
  return message.toString().split('').map(function(item) {
    let index = UPPERCASE.indexOf(item);
    if (index > -1) {
      return UPPERCASE[isEncrypt ? (index + key).mod(26) : (index - key).mod(26)];
    }
    index = LOWERCASE.indexOf(item);
    if (index > -1) {
      return LOWERCASE[isEncrypt ? (index + key).mod(26) : (index - key).mod(26)];
    }
    return item;
  }).join('');
}

// encrypt
function encrypt(key, message) {
  return caeser(key, message, true);
}

// decrypt
function decrypt(key, message) {
  return caeser(key, message, false);
}

module.exports = {
  encrypt,
  decrypt,
}
