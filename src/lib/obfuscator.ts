// JavaScript Obfuscation utilities

export type ObfuscationMethod = 
  | 'base64'
  | 'unicode'
  | 'hex'
  | 'charCode'
  | 'jsfuck'
  | 'aaencode'
  | 'combined';

// Base64 encoding with eval wrapper
export function encodeBase64(code: string): string {
  const encoded = btoa(unescape(encodeURIComponent(code)));
  return `eval(decodeURIComponent(escape(atob("${encoded}"))))`;
}

// Unicode escape encoding
export function encodeUnicode(code: string): string {
  let result = '';
  for (let i = 0; i < code.length; i++) {
    const hex = code.charCodeAt(i).toString(16).padStart(4, '0');
    result += `\\u${hex}`;
  }
  return `eval("${result}")`;
}

// Hexadecimal encoding
export function encodeHex(code: string): string {
  let hexString = '';
  for (let i = 0; i < code.length; i++) {
    hexString += code.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return `eval(function(h){for(var r="",i=0;i<h.length;i+=2)r+=String.fromCharCode(parseInt(h.substr(i,2),16));return r}("${hexString}"))`;
}

// CharCode array encoding
export function encodeCharCode(code: string): string {
  const charCodes = [];
  for (let i = 0; i < code.length; i++) {
    charCodes.push(code.charCodeAt(i));
  }
  return `eval(String.fromCharCode(${charCodes.join(',')}))`;
}

// JSFuck-like encoding (simplified version)
export function encodeJSFuck(code: string): string {
  const mapping: { [key: string]: string } = {
    'a': '(![]+[])[+!+[]]',
    'b': '([]+{})[+!+[]+!+[]]',
    'c': '([]+{})[+!+[]+!+[]+!+[]+!+[]+!+[]]',
    'd': '([][[]]+[])[+!+[]+!+[]]',
    'e': '(!![]+[])[+!+[]+!+[]+!+[]]',
    'f': '(![]+[])[+[]]',
    'g': '([]+([]+[])[([]+{})[+!+[]+!+[]+!+[]+!+[]+!+[]]+([]+{})[+!+[]]+([]+[][(!![]+[])[+!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]])[!+[]+!+[]+!+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]])[!+[]+!+[]+[+[]]]',
    'i': '([][[]]+[])[+!+[]+!+[]+!+[]+!+[]+!+[]]',
    'l': '(![]+[])[+!+[]+!+[]]',
    'n': '([][[]]+[])[+!+[]]',
    'o': '([]+{})[+!+[]]',
    'r': '(!![]+[])[+!+[]]',
    's': '(![]+[])[+!+[]+!+[]+!+[]]',
    't': '(!![]+[])[+[]]',
    'u': '(!![]+[])[+!+[]+!+[]]',
  };
  
  // For JSFuck, we'll use a simpler approach with charCode
  const encoded = encodeBase64(code);
  const jsf = encoded.split('').map(char => {
    if (mapping[char.toLowerCase()]) {
      return mapping[char.toLowerCase()];
    }
    return `String.fromCharCode(${char.charCodeAt(0)})`;
  }).join('+');
  
  return `eval(${jsf})`;
}

// AAEncode-like encoding
export function encodeAAEncode(code: string): string {
  const encoded = btoa(unescape(encodeURIComponent(code)));
  const aaChars = ['ﾟ', 'Д', '´', ')', '(', 'ω', '･', '｀', 'ー', '\\'];
  
  let result = 'ﾟωﾟﾉ= /｀ｍ´）ﾉ ~┻━┻   //*´∇｀*/ [\'_\']; o=(ﾟｰﾟ)  =_=3; c=(ﾟΘﾟ) =(ﾟｰﾟ)-(ﾟｰﾟ); ';
  result += `(ﾟДﾟ) [ﾟΘﾟ] =eval;`;
  result += `(ﾟДﾟ) [ﾟΘﾟ](decodeURIComponent(escape(atob("${encoded}"))))`;
  
  return result;
}

// Combined multi-layer encoding
export function encodeCombined(code: string): string {
  // Layer 1: Base64
  let encoded = btoa(unescape(encodeURIComponent(code)));
  
  // Layer 2: Reverse
  encoded = encoded.split('').reverse().join('');
  
  // Layer 3: Custom substitution
  const substitution: { [key: string]: string } = {
    'A': '٤', 'B': 'ℬ', 'C': '₵', 'D': 'Ð', 'E': '€',
    'F': 'ƒ', 'G': 'Ǥ', 'H': 'Ħ', 'I': 'Ɨ', 'J': 'ʝ',
    'K': 'Ҡ', 'L': 'Ł', 'M': 'Ɱ', 'N': 'Ɲ', 'O': 'Ø',
    'P': 'Ƥ', 'Q': 'Ҩ', 'R': 'Ʀ', 'S': '§', 'T': 'Ŧ',
    'U': 'Ʉ', 'V': 'Ʋ', 'W': 'Ɯ', 'X': 'Ж', 'Y': '¥',
    'Z': 'Ƶ', 'a': 'α', 'b': 'β', 'c': '¢', 'd': 'δ',
    'e': 'ε', 'f': 'φ', 'g': 'γ', 'h': 'η', 'i': 'ι',
    'j': 'ʲ', 'k': 'κ', 'l': 'λ', 'm': 'μ', 'n': 'η',
    'o': 'σ', 'p': 'ρ', 'q': 'ϙ', 'r': 'ρ', 's': 'ѕ',
    't': 'τ', 'u': 'υ', 'v': 'ν', 'w': 'ω', 'x': 'χ',
    'y': 'ψ', 'z': 'ζ', '0': '⓪', '1': '①', '2': '②',
    '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦',
    '8': '⑧', '9': '⑨', '+': '➕', '/': '➗', '=': '☰'
  };
  
  let substituted = '';
  for (const char of encoded) {
    substituted += substitution[char] || char;
  }
  
  // Create decoder
  const reverseSubstitution = Object.fromEntries(
    Object.entries(substitution).map(([k, v]) => [v, k])
  );
  
  const decoderMap = JSON.stringify(reverseSubstitution);
  
  return `(function(){var _0x=['${substituted}'],_m=${decoderMap};var _d='';for(var i=0;i<_0x[0].length;i++){_d+=_m[_0x[0][i]]||_0x[0][i];}eval(decodeURIComponent(escape(atob(_d.split('').reverse().join('')))))})()`;
}

// Main obfuscation function
export function obfuscateCode(code: string, method: ObfuscationMethod): string {
  switch (method) {
    case 'base64':
      return encodeBase64(code);
    case 'unicode':
      return encodeUnicode(code);
    case 'hex':
      return encodeHex(code);
    case 'charCode':
      return encodeCharCode(code);
    case 'jsfuck':
      return encodeJSFuck(code);
    case 'aaencode':
      return encodeAAEncode(code);
    case 'combined':
      return encodeCombined(code);
    default:
      return code;
  }
}

// Generate Tampermonkey header
export function generateTampermonkeyHeader(
  name: string = 'My Script',
  description: string = 'A Tampermonkey script',
  match: string = '*://*/*'
): string {
  return `// ==UserScript==
// @name         ${name}
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  ${description}
// @author       You
// @match        ${match}
// @grant        none
// @run-at       document-end
// ==/UserScript==

`;
}
