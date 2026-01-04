// JavaScript Obfuscation utilities

export type ObfuscationMethod = 
  | 'base64'
  | 'unicode'
  | 'hex'
  | 'charCode'
  | 'jsfuck'
  | 'aaencode'
  | 'combined';

export interface ProtectionOptions {
  booleanLiteralReplacement: boolean;
  booleanRandomize: boolean;
  integerLiteralReplacement: boolean;
  integerRandomize: boolean;
  integerRadix: 'none' | 'binary' | 'decimal' | 'hexadecimal' | 'octal';
  integerLower: number;
  integerUpper: number;
  debuggerRemoval: boolean;
  stringExtraction: boolean;
  propertyIndirection: boolean;
  localNameMangling: boolean;
  manglingType: 'sequential' | 'hexadecimal' | 'base52' | 'base62' | 'runic' | 'glagolitic' | 'tifinagh';
  controlFlowProtection: boolean;
  controlFlowRandomize: boolean;
  constantArgumentObfuscation: boolean;
  domainLock: boolean;
  domainPattern: string;
  domainErrorScript: string;
  functionReordering: boolean;
  functionRandomize: boolean;
  propertySparsing: boolean;
  variableGrouping: boolean;
  expressionSequence: boolean;
  selfDefending: boolean;
  selfDefendingLevel: number;
  selfDefendingErrorScript: string;
  dateLock: boolean;
  startDate: string;
  endDate: string;
  dateErrorScript: string;
  consoleCloaking: boolean;
  consoleCloakingExclude: string;
  devToolsBlocking: boolean;
  devToolsPatience: number;
  globalObjectHiding: boolean;
  globalUsePredefined: boolean;
  globalInclude: string;
  globalExclude: string;
}

// Generate random variable name based on mangling type
function generateVarName(index: number, manglingType: string): string {
  const base52 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const runic = 'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏ';
  const glagolitic = 'ⰰⰱⰲⰳⰴⰵⰶⰷⰸⰹⰺⰻⰼⰽⰾⰿⱀⱁⱂⱃⱄⱅⱆⱇⱈⱉⱊⱋⱌⱍⱎⱏⱐⱑⱒⱓⱔⱕⱖⱗⱘⱙⱚⱛ';
  const tifinagh = 'ⴰⴱⴲⴳⴴⴵⴶⴷⴸⴹⴺⴻⴼⴽⴾⴿⵀⵁⵂⵃⵄⵅⵆⵇⵈⵉⵊⵋⵌⵍⵎⵏⵐⵑⵒⵓⵔⵕⵖⵗⵘⵙⵚⵛⵜⵝⵞⵟ';

  switch (manglingType) {
    case 'sequential':
      return '_' + String.fromCharCode(97 + (index % 26)) + Math.floor(index / 26);
    case 'hexadecimal':
      return '_0x' + index.toString(16);
    case 'base52':
      let result52 = '';
      let n = index;
      do {
        result52 = base52[n % 52] + result52;
        n = Math.floor(n / 52);
      } while (n > 0);
      return '_' + result52;
    case 'base62':
      let result62 = '';
      let m = index;
      do {
        result62 = base62[m % 62] + result62;
        m = Math.floor(m / 62);
      } while (m > 0);
      return '_' + result62;
    case 'runic':
      return runic[index % runic.length] + (index >= runic.length ? String(Math.floor(index / runic.length)) : '');
    case 'glagolitic':
      return glagolitic[index % glagolitic.length] + (index >= glagolitic.length ? String(Math.floor(index / glagolitic.length)) : '');
    case 'tifinagh':
      return tifinagh[index % tifinagh.length] + (index >= tifinagh.length ? String(Math.floor(index / tifinagh.length)) : '');
    default:
      return '_v' + index;
  }
}

// Convert number to different radix representation
function numberToRadix(num: number, radix: string): string {
  switch (radix) {
    case 'binary':
      return '0b' + num.toString(2);
    case 'octal':
      return '0o' + num.toString(8);
    case 'hexadecimal':
      return '0x' + num.toString(16);
    case 'decimal':
    default:
      return String(num);
  }
}

// Apply protection options to code before main obfuscation
function applyProtections(code: string, options: ProtectionOptions): string {
  let result = code;

  // Remove debugger statements
  if (options.debuggerRemoval) {
    result = result.replace(/\bdebugger\s*;?/g, '');
  }

  // Boolean literal replacement
  if (options.booleanLiteralReplacement) {
    if (options.booleanRandomize) {
      result = result.replace(/\btrue\b/g, () => Math.random() > 0.5 ? '!0' : '!!1');
      result = result.replace(/\bfalse\b/g, () => Math.random() > 0.5 ? '!1' : '!!0');
    } else {
      result = result.replace(/\btrue\b/g, '!0');
      result = result.replace(/\bfalse\b/g, '!1');
    }
  }

  // Integer literal replacement
  if (options.integerLiteralReplacement) {
    const radix = options.integerRadix;
    result = result.replace(/\b(\d+)\b/g, (match) => {
      const num = parseInt(match, 10);
      if (isNaN(num)) return match;
      if (num < options.integerLower || num > options.integerUpper) return match;
      
      if (options.integerRandomize && radix !== 'none') {
        const radixes = ['binary', 'octal', 'decimal', 'hexadecimal'];
        const randomRadix = radixes[Math.floor(Math.random() * radixes.length)];
        return numberToRadix(num, randomRadix);
      }
      
      if (radix !== 'none') {
        return numberToRadix(num, radix);
      }
      return match;
    });
  }

  return result;
}

// Generate protection wrapper code
function generateProtectionWrapper(options: ProtectionOptions): { prefix: string; suffix: string } {
  let prefix = '';
  let suffix = '';

  // Console cloaking
  if (options.consoleCloaking) {
    const excludeMethods = options.consoleCloakingExclude.split(',').map(s => s.trim()).filter(Boolean);
    const methods = ['log', 'warn', 'error', 'info', 'debug', 'trace', 'table', 'dir', 'group', 'groupEnd', 'time', 'timeEnd', 'clear', 'count', 'assert'];
    const methodsToCloak = methods.filter(m => !excludeMethods.includes(m));
    
    prefix += `(function(){var _c=console;var _n=function(){};`;
    methodsToCloak.forEach(m => {
      prefix += `_c.${m}=_n;`;
    });
    prefix += `})();`;
  }

  // DevTools blocking
  if (options.devToolsBlocking) {
    prefix += `(function(){var _d=function(){var _t=${options.devToolsPatience * 1000};var _s=+new Date();debugger;if(+new Date()-_s>_t){while(1){debugger;}}};setInterval(_d,1000);})();`;
  }

  // Domain lock
  if (options.domainLock && options.domainPattern) {
    const patterns = options.domainPattern.split(',').map(p => p.trim()).filter(Boolean);
    const errorScript = options.domainErrorScript || 'throw new Error("Unauthorized domain");';
    const patternCheck = patterns.map(p => `location.hostname.indexOf("${p}")!==-1`).join('||');
    prefix += `(function(){if(!(${patternCheck})){${errorScript}}})();`;
  }

  // Date lock
  if (options.dateLock && (options.startDate || options.endDate)) {
    const errorScript = options.dateErrorScript || 'throw new Error("Script expired");';
    let dateCheck = '';
    if (options.startDate) {
      dateCheck += `+new Date()<${new Date(options.startDate).getTime()}`;
    }
    if (options.endDate) {
      if (dateCheck) dateCheck += '||';
      dateCheck += `+new Date()>${new Date(options.endDate).getTime()}`;
    }
    if (dateCheck) {
      prefix += `(function(){if(${dateCheck}){${errorScript}}})();`;
    }
  }

  // Self-defending (anti-tampering)
  if (options.selfDefending) {
    const level = options.selfDefendingLevel;
    const errorScript = options.selfDefendingErrorScript || 'return;';
    
    if (level >= 1) {
      prefix += `(function(){var _f=function(){try{Function("debugger")()}catch(e){${errorScript}}};_f();setInterval(_f,${4000 / level});})();`;
    }
  }

  return { prefix, suffix };
}

// Safe Base64 encoding that works in all environments
function safeBase64Encode(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return btoa(str);
  }
}

// Base64 encoding - executable wrapper
export function encodeBase64(code: string): string {
  const encoded = safeBase64Encode(code);
  return `(function(){var _d=atob("${encoded}");try{eval(_d)}catch(e){Function(_d)()}})();`;
}

// Unicode escape encoding
export function encodeUnicode(code: string): string {
  let result = '';
  for (let i = 0; i < code.length; i++) {
    const hex = code.charCodeAt(i).toString(16).padStart(4, '0');
    result += `\\u${hex}`;
  }
  return `(function(){eval("${result}")})();`;
}

// Hexadecimal encoding
export function encodeHex(code: string): string {
  let hexString = '';
  for (let i = 0; i < code.length; i++) {
    hexString += code.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return `(function(){var _h="${hexString}";var _r="";for(var _i=0;_i<_h.length;_i+=2){_r+=String.fromCharCode(parseInt(_h.substr(_i,2),16));}eval(_r)})();`;
}

// CharCode array encoding
export function encodeCharCode(code: string): string {
  const charCodes: number[] = [];
  for (let i = 0; i < code.length; i++) {
    charCodes.push(code.charCodeAt(i));
  }
  return `(function(){eval(String.fromCharCode(${charCodes.join(',')}))})();`;
}

// Simplified JSFuck-style encoding (more reliable)
export function encodeJSFuck(code: string): string {
  // Use charCode with obfuscated function creation
  const charCodes: number[] = [];
  for (let i = 0; i < code.length; i++) {
    charCodes.push(code.charCodeAt(i));
  }
  
  // Create obfuscated char code array
  const obfuscatedCodes = charCodes.map(c => {
    // Randomly obfuscate numbers
    const r = Math.random();
    if (r < 0.33) {
      return `(${c}|0)`;
    } else if (r < 0.66) {
      return `(${c}^0)`;
    } else {
      return `(+${c})`;
    }
  });
  
  return `(function(){var _=[${obfuscatedCodes.join(',')}];var _s="";for(var _i=0;_i<_.length;_i++){_s+=String.fromCharCode(_[_i]);}eval(_s)})();`;
}

// AAEncode-style encoding (simplified for reliability)
export function encodeAAEncode(code: string): string {
  const encoded = safeBase64Encode(code);
  // Use a simpler, more reliable approach
  return `(function(){var ﾟωﾟ="${encoded}";var ﾟДﾟ=atob(ﾟωﾟ);eval(ﾟДﾟ)})();`;
}

// Combined multi-layer encoding (most reliable version)
export function encodeCombined(code: string): string {
  // Layer 1: Base64 encode
  const base64 = safeBase64Encode(code);
  
  // Layer 2: Reverse the string
  const reversed = base64.split('').reverse().join('');
  
  // Layer 3: XOR with a key
  const key = 42;
  const xored: number[] = [];
  for (let i = 0; i < reversed.length; i++) {
    xored.push(reversed.charCodeAt(i) ^ key);
  }
  
  // Create decoder that reverses all transformations
  return `(function(){var _k=${key};var _x=[${xored.join(',')}];var _r="";for(var _i=0;_i<_x.length;_i++){_r+=String.fromCharCode(_x[_i]^_k);}_r=_r.split("").reverse().join("");try{eval(atob(_r))}catch(e){(new Function(atob(_r)))()}})();`;
}

// Main obfuscation function with protection options
export function obfuscateCode(code: string, method: ObfuscationMethod, options?: ProtectionOptions): string {
  let processedCode = code;
  let protectionPrefix = '';
  let protectionSuffix = '';
  
  // Apply protection options if provided
  if (options) {
    processedCode = applyProtections(code, options);
    const wrapper = generateProtectionWrapper(options);
    protectionPrefix = wrapper.prefix;
    protectionSuffix = wrapper.suffix;
  }
  
  // Apply the main obfuscation method
  let obfuscatedCode: string;
  switch (method) {
    case 'base64':
      obfuscatedCode = encodeBase64(processedCode);
      break;
    case 'unicode':
      obfuscatedCode = encodeUnicode(processedCode);
      break;
    case 'hex':
      obfuscatedCode = encodeHex(processedCode);
      break;
    case 'charCode':
      obfuscatedCode = encodeCharCode(processedCode);
      break;
    case 'jsfuck':
      obfuscatedCode = encodeJSFuck(processedCode);
      break;
    case 'aaencode':
      obfuscatedCode = encodeAAEncode(processedCode);
      break;
    case 'combined':
      obfuscatedCode = encodeCombined(processedCode);
      break;
    default:
      obfuscatedCode = processedCode;
  }
  
  // Combine protection code with obfuscated code
  return protectionPrefix + obfuscatedCode + protectionSuffix;
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

(function() {
    'use strict';
    
`;
}

// Generate Tampermonkey footer
export function generateTampermonkeyFooter(): string {
  return `
})();`;
}
