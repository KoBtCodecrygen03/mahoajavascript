// JavaScript Obfuscation utilities

export type ObfuscationMethod = 
  | 'base64'
  | 'unicode'
  | 'hex'
  | 'charCode'
  | 'jsfuck'
  | 'aaencode'
  | 'combined'
  // New methods
  | 'rot13'
  | 'xor'
  | 'aes'
  | 'deadCode'
  | 'stringArray'
  | 'controlFlow'
  | 'flatten';

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
  // New protection options
  antiDebugging: boolean;
  codeIntegrity: boolean;
  memoryProtection: boolean;
  antiTampering: boolean;
  stackTraceHiding: boolean;
  proxyTrap: boolean;
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

// Generate random string for dead code
function generateRandomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
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

  // NEW: Advanced Anti-Debugging
  if (options.antiDebugging) {
    prefix += `(function(){var _ad=function(){var _el=new Image();Object.defineProperty(_el,"id",{get:function(){throw new Error();}});console.log(_el);};setInterval(function(){try{_ad();}catch(e){}},2000);var _t1=Date.now();debugger;var _t2=Date.now();if(_t2-_t1>100){location.reload();}})();`;
  }

  // NEW: Code Integrity Check
  if (options.codeIntegrity) {
    const hash = Math.random().toString(36).substring(7);
    prefix += `(function(){var _ih="${hash}";var _ch=function(s){var h=0;for(var i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h=h&h;}return h.toString(36);};`;
    suffix += `if(_ch(arguments.callee.toString()).indexOf("${hash.substring(0,3)}")===-1){throw new Error();}})();`;
  }

  // NEW: Memory Protection
  if (options.memoryProtection) {
    prefix += `(function(){var _mp=[];var _cl=function(){for(var i=0;i<_mp.length;i++){try{_mp[i]=null;delete _mp[i];}catch(e){}}};setInterval(_cl,5000);window._mp=_mp;`;
    suffix += `_cl();})();`;
  }

  // NEW: Anti-Tampering
  if (options.antiTampering) {
    prefix += `(function(){var _ot=Object.prototype.toString;Object.prototype.toString=function(){if(this===window||this===document){throw new Error();}return _ot.call(this);};var _fn=Function.prototype.toString;Function.prototype.toString=function(){if(this.name&&this.name.indexOf("_")===0){return"function "+this.name+"() { [native code] }";}return _fn.call(this);};})();`;
  }

  // NEW: Stack Trace Hiding
  if (options.stackTraceHiding) {
    prefix += `(function(){Error.prepareStackTrace=function(e,s){return"";};Error.stackTraceLimit=0;})();`;
  }

  // NEW: Proxy Trap
  if (options.proxyTrap) {
    prefix += `(function(){var _wh={get:function(t,p){if(p==="eval"||p==="Function"){return function(){throw new Error();};}return t[p];},set:function(t,p,v){if(typeof v==="function"&&v.toString().indexOf("debugger")>-1){return false;}t[p]=v;return true;}};try{window=new Proxy(window,_wh);}catch(e){}})();`;
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
  const charCodes: number[] = [];
  for (let i = 0; i < code.length; i++) {
    charCodes.push(code.charCodeAt(i));
  }
  
  const obfuscatedCodes = charCodes.map(c => {
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
  return `(function(){var ﾟωﾟ="${encoded}";var ﾟДﾟ=atob(ﾟωﾟ);eval(ﾟДﾟ)})();`;
}

// Combined multi-layer encoding (most reliable version)
export function encodeCombined(code: string): string {
  const base64 = safeBase64Encode(code);
  const reversed = base64.split('').reverse().join('');
  const key = 42;
  const xored: number[] = [];
  for (let i = 0; i < reversed.length; i++) {
    xored.push(reversed.charCodeAt(i) ^ key);
  }
  
  return `(function(){var _k=${key};var _x=[${xored.join(',')}];var _r="";for(var _i=0;_i<_x.length;_i++){_r+=String.fromCharCode(_x[_i]^_k);}_r=_r.split("").reverse().join("");try{eval(atob(_r))}catch(e){(new Function(atob(_r)))()}})();`;
}

// NEW: ROT13 Plus encoding
export function encodeRot13(code: string): string {
  const base64 = safeBase64Encode(code);
  const rot13 = base64.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
  const shift = Math.floor(Math.random() * 10) + 5;
  const shifted = rot13.split('').map(c => String.fromCharCode(c.charCodeAt(0) + shift)).join('');
  
  return `(function(){var _s="${shifted}";var _sh=${shift};var _d="";for(var i=0;i<_s.length;i++){_d+=String.fromCharCode(_s.charCodeAt(i)-_sh);}_d=_d.replace(/[a-zA-Z]/g,function(c){var b=c<="Z"?65:97;return String.fromCharCode(((c.charCodeAt(0)-b+13)%26)+b);});eval(atob(_d))})();`;
}

// NEW: XOR Cipher encoding
export function encodeXor(code: string): string {
  const key = Math.floor(Math.random() * 200) + 50;
  const key2 = Math.floor(Math.random() * 100) + 25;
  const encoded: number[] = [];
  
  for (let i = 0; i < code.length; i++) {
    const xorKey = (i % 2 === 0) ? key : key2;
    encoded.push(code.charCodeAt(i) ^ xorKey);
  }
  
  return `(function(){var _k1=${key};var _k2=${key2};var _e=[${encoded.join(',')}];var _d="";for(var i=0;i<_e.length;i++){var _k=(i%2===0)?_k1:_k2;_d+=String.fromCharCode(_e[i]^_k);}eval(_d)})();`;
}

// NEW: AES-Like encoding (simulated with multiple XOR layers)
export function encodeAes(code: string): string {
  const keys = [
    Math.floor(Math.random() * 100) + 30,
    Math.floor(Math.random() * 100) + 50,
    Math.floor(Math.random() * 100) + 70,
    Math.floor(Math.random() * 100) + 90
  ];
  
  let encoded = code;
  for (const key of keys) {
    let temp = '';
    for (let i = 0; i < encoded.length; i++) {
      temp += String.fromCharCode(encoded.charCodeAt(i) ^ key);
    }
    encoded = temp;
  }
  
  const charCodes = [];
  for (let i = 0; i < encoded.length; i++) {
    charCodes.push(encoded.charCodeAt(i));
  }
  
  return `(function(){var _ks=[${keys.reverse().join(',')}];var _e=[${charCodes.join(',')}];var _d="";for(var i=0;i<_e.length;i++){_d+=String.fromCharCode(_e[i]);}for(var k=0;k<_ks.length;k++){var _t="";for(var i=0;i<_d.length;i++){_t+=String.fromCharCode(_d.charCodeAt(i)^_ks[k]);}_d=_t;}eval(_d)})();`;
}

// NEW: Dead Code Injection
export function encodeDeadCode(code: string): string {
  const deadFunctions: string[] = [];
  for (let i = 0; i < 5; i++) {
    const name = '_' + generateRandomString(6);
    const body = `return ${Math.random().toString(36)};`;
    deadFunctions.push(`function ${name}(){${body}}`);
  }
  
  const deadVars: string[] = [];
  for (let i = 0; i < 8; i++) {
    const name = '_' + generateRandomString(5);
    const value = Math.random() > 0.5 ? `"${generateRandomString(10)}"` : Math.floor(Math.random() * 1000);
    deadVars.push(`var ${name}=${value};`);
  }
  
  const encoded = safeBase64Encode(code);
  const deadConditions = `if(0){${deadFunctions.join('')}}`;
  
  return `(function(){${deadVars.join('')}${deadConditions}var _c="${encoded}";eval(atob(_c))})();`;
}

// NEW: String Array encoding
export function encodeStringArray(code: string): string {
  const chunks: string[] = [];
  const chunkSize = 50;
  
  for (let i = 0; i < code.length; i += chunkSize) {
    chunks.push(safeBase64Encode(code.slice(i, i + chunkSize)));
  }
  
  // Shuffle the chunks and create index array
  const indices = chunks.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  const shuffledChunks = indices.map(i => chunks[i]);
  const reverseMap = indices.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v).map(x => x.i);
  
  return `(function(){var _a=[${shuffledChunks.map(c => `"${c}"`).join(',')}];var _m=[${reverseMap.join(',')}];var _r="";for(var i=0;i<_m.length;i++){_r+=atob(_a[_m[i]]);}eval(_r)})();`;
}

// NEW: Control Flow Flattening
export function encodeControlFlow(code: string): string {
  const encoded = safeBase64Encode(code);
  const states = [0, 1, 2, 3, 4];
  const shuffled = [...states].sort(() => Math.random() - 0.5);
  
  const chunks = [];
  const chunkLen = Math.ceil(encoded.length / 5);
  for (let i = 0; i < 5; i++) {
    chunks.push(encoded.slice(i * chunkLen, (i + 1) * chunkLen));
  }
  
  return `(function(){var _s=[${shuffled.join(',')}];var _c=["${chunks.join('","')}"];var _r="";var _st=0;while(_st<5){switch(_s[_st]){case 0:_r+=_c[0];break;case 1:_r+=_c[1];break;case 2:_r+=_c[2];break;case 3:_r+=_c[3];break;case 4:_r+=_c[4];break;}_st++;}eval(atob(_r))})();`;
}

// NEW: Code Flatten encoding
export function encodeFlatten(code: string): string {
  const encoded = safeBase64Encode(code);
  const key1 = Math.floor(Math.random() * 50) + 10;
  const key2 = Math.floor(Math.random() * 50) + 10;
  
  let processed = '';
  for (let i = 0; i < encoded.length; i++) {
    if (i % 3 === 0) {
      processed += String.fromCharCode(encoded.charCodeAt(i) ^ key1);
    } else if (i % 3 === 1) {
      processed += String.fromCharCode(encoded.charCodeAt(i) ^ key2);
    } else {
      processed += String.fromCharCode(encoded.charCodeAt(i) ^ (key1 ^ key2));
    }
  }
  
  const charCodes = [];
  for (let i = 0; i < processed.length; i++) {
    charCodes.push(processed.charCodeAt(i));
  }
  
  return `(function(){var _k1=${key1};var _k2=${key2};var _e=[${charCodes.join(',')}];var _d="";for(var i=0;i<_e.length;i++){if(i%3===0){_d+=String.fromCharCode(_e[i]^_k1);}else if(i%3===1){_d+=String.fromCharCode(_e[i]^_k2);}else{_d+=String.fromCharCode(_e[i]^(_k1^_k2));}}eval(atob(_d))})();`;
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
    case 'rot13':
      obfuscatedCode = encodeRot13(processedCode);
      break;
    case 'xor':
      obfuscatedCode = encodeXor(processedCode);
      break;
    case 'aes':
      obfuscatedCode = encodeAes(processedCode);
      break;
    case 'deadCode':
      obfuscatedCode = encodeDeadCode(processedCode);
      break;
    case 'stringArray':
      obfuscatedCode = encodeStringArray(processedCode);
      break;
    case 'controlFlow':
      obfuscatedCode = encodeControlFlow(processedCode);
      break;
    case 'flatten':
      obfuscatedCode = encodeFlatten(processedCode);
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
// @author       !code(KoBtCode)
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
