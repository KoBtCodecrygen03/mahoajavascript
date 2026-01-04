// Multi-language translations

export type Language = 'vi' | 'en' | 'zh';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  author: string;
  
  // Features
  highSecurity: string;
  fastProcessing: string;
  manyAlgorithms: string;
  tampermonkeySupport: string;
  
  // Input/Output
  sourceCode: string;
  enterCode: string;
  placeholder: string;
  result: string;
  protectedCode: string;
  resultPlaceholder: string;
  length: string;
  characters: string;
  copy: string;
  copied: string;
  
  // Tampermonkey
  addTampermonkeyHeader: string;
  scriptName: string;
  description: string;
  matchPattern: string;
  
  // Methods
  obfuscationMethod: string;
  obfuscateNow: string;
  clearAll: string;
  
  // Method descriptions
  methods: {
    base64: { name: string; desc: string };
    unicode: { name: string; desc: string };
    hex: { name: string; desc: string };
    charCode: { name: string; desc: string };
    jsfuck: { name: string; desc: string };
    aaencode: { name: string; desc: string };
    combined: { name: string; desc: string };
    // New methods
    rot13: { name: string; desc: string };
    xor: { name: string; desc: string };
    aes: { name: string; desc: string };
    deadCode: { name: string; desc: string };
    stringArray: { name: string; desc: string };
    controlFlow: { name: string; desc: string };
    flatten: { name: string; desc: string };
  };
  
  // Protection options
  protectionOptions: string;
  advancedProtection: string;
  
  // Boolean
  booleanReplacement: string;
  randomize: string;
  
  // Integer
  integerReplacement: string;
  radix: string;
  radixNone: string;
  radixBinary: string;
  radixDecimal: string;
  radixHex: string;
  radixOctal: string;
  lowValue: string;
  highValue: string;
  
  // Code transformations
  codeTransformations: string;
  debuggerRemoval: string;
  stringExtraction: string;
  propertyIndirection: string;
  
  // Name mangling
  localNameMangling: string;
  manglingType: string;
  sequential: string;
  hexadecimal: string;
  
  // Control flow
  controlFlowProtection: string;
  constantArgObfuscation: string;
  
  // Domain lock
  domainLock: string;
  domainPattern: string;
  errorScript: string;
  
  // Function reordering
  functionReordering: string;
  
  // Advanced
  advancedObfuscation: string;
  propertySparsing: string;
  variableGrouping: string;
  expressionSequence: string;
  
  // Self defending
  selfDefending: string;
  level: string;
  
  // Date lock
  dateLock: string;
  startDate: string;
  endDate: string;
  
  // Console & DevTools
  consoleDevTools: string;
  consoleCloaking: string;
  exclude: string;
  devToolsBlocking: string;
  patience: string;
  seconds: string;
  
  // Global object hiding
  globalObjectHiding: string;
  usePredefined: string;
  include: string;
  
  // New protection options
  antiDebugging: string;
  antiDebuggingDesc: string;
  codeIntegrity: string;
  codeIntegrityDesc: string;
  memoryProtection: string;
  memoryProtectionDesc: string;
  antiTampering: string;
  antiTamperingDesc: string;
  stackTraceHiding: string;
  stackTraceHidingDesc: string;
  proxyTrap: string;
  proxyTrapDesc: string;
  
  // Info
  howToUse: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  importantNotes: string;
  note1: string;
  note2: string;
  note3: string;
  note4: string;
  
  // Footer
  footerText: string;
  
  // Toast messages
  pleaseEnterCode: string;
  obfuscateSuccess: string;
  obfuscateError: string;
  noCodeToCopy: string;
  clearedAll: string;
}

export const translations: Record<Language, Translations> = {
  vi: {
    title: 'JS Obfuscator',
    subtitle: 'Mã hóa JavaScript & Tampermonkey',
    author: '!code(KoBtCode)',
    
    highSecurity: 'Bảo mật cao',
    fastProcessing: 'Xử lý nhanh',
    manyAlgorithms: 'Nhiều thuật toán',
    tampermonkeySupport: 'Hỗ trợ Tampermonkey',
    
    sourceCode: 'Mã nguồn JavaScript',
    enterCode: 'Nhập mã JavaScript cần mã hóa',
    placeholder: `// Nhập mã JavaScript của bạn ở đây
console.log("Hello World!");

function myFunction() {
  // Your code here
}`,
    result: 'Kết quả mã hóa',
    protectedCode: 'Mã đã được bảo vệ',
    resultPlaceholder: 'Kết quả mã hóa sẽ xuất hiện ở đây...',
    length: 'Độ dài',
    characters: 'ký tự',
    copy: 'Sao chép',
    copied: 'Đã sao chép vào clipboard!',
    
    addTampermonkeyHeader: 'Thêm header Tampermonkey',
    scriptName: 'Tên Script',
    description: 'Mô tả',
    matchPattern: 'Match Pattern',
    
    obfuscationMethod: 'Phương pháp mã hóa',
    obfuscateNow: 'Mã hóa ngay',
    clearAll: 'Xóa tất cả',
    
    methods: {
      base64: { name: 'Base64', desc: 'Mã hóa cơ bản với Base64' },
      unicode: { name: 'Unicode Escape', desc: 'Chuyển đổi sang mã Unicode' },
      hex: { name: 'Hexadecimal', desc: 'Mã hóa thành chuỗi Hex' },
      charCode: { name: 'CharCode Array', desc: 'Chuyển thành mảng charCode' },
      jsfuck: { name: 'JSFuck Style', desc: 'Mã hóa kiểu JSFuck phức tạp' },
      aaencode: { name: 'AAEncode Style', desc: 'Mã hóa với ký tự đặc biệt' },
      combined: { name: 'Multi-Layer', desc: 'Nhiều lớp mã hóa kết hợp (mạnh nhất)' },
      rot13: { name: 'ROT13 Plus', desc: 'Mã hóa ROT13 nâng cao với biến thể' },
      xor: { name: 'XOR Cipher', desc: 'Mã hóa XOR với khóa ngẫu nhiên' },
      aes: { name: 'AES-Like', desc: 'Mã hóa kiểu AES (mạnh mẽ)' },
      deadCode: { name: 'Dead Code', desc: 'Chèn mã giả làm rối' },
      stringArray: { name: 'String Array', desc: 'Trích xuất chuỗi vào mảng' },
      controlFlow: { name: 'Control Flow', desc: 'Làm phẳng luồng điều khiển' },
      flatten: { name: 'Code Flatten', desc: 'Làm phẳng toàn bộ mã nguồn' },
    },
    
    protectionOptions: 'Tùy chọn bảo vệ',
    advancedProtection: 'Cấu hình các tùy chọn bảo vệ nâng cao',
    
    booleanReplacement: 'Thay thế Boolean Literal',
    randomize: 'Ngẫu nhiên hóa',
    
    integerReplacement: 'Thay thế Integer Literal',
    radix: 'Cơ số (Radix)',
    radixNone: 'Không',
    radixBinary: 'Nhị phân (Binary)',
    radixDecimal: 'Thập phân (Decimal)',
    radixHex: 'Thập lục phân (Hexadecimal)',
    radixOctal: 'Bát phân (Octal)',
    lowValue: 'Giá trị thấp',
    highValue: 'Giá trị cao',
    
    codeTransformations: 'Biến đổi mã nguồn',
    debuggerRemoval: 'Xóa câu lệnh Debugger',
    stringExtraction: 'Trích xuất String Literal',
    propertyIndirection: 'Chuyển hướng Property',
    
    localNameMangling: 'Xáo trộn tên biến cục bộ',
    manglingType: 'Kiểu xáo trộn',
    sequential: 'Tuần tự (Sequential)',
    hexadecimal: 'Thập lục phân (Hexadecimal)',
    
    controlFlowProtection: 'Bảo vệ luồng điều khiển',
    constantArgObfuscation: 'Làm rối đối số hằng số',
    
    domainLock: 'Khóa theo tên miền',
    domainPattern: 'Mẫu tên miền (Domain Pattern)',
    errorScript: 'Script lỗi',
    
    functionReordering: 'Sắp xếp lại hàm',
    
    advancedObfuscation: 'Làm rối nâng cao',
    propertySparsing: 'Property Sparsing',
    variableGrouping: 'Nhóm biến (Variable Grouping)',
    expressionSequence: 'Làm rối biểu thức chuỗi',
    
    selfDefending: 'Bảo vệ tự thân (Self-Defending)',
    level: 'Mức độ',
    
    dateLock: 'Khóa theo ngày',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    
    consoleDevTools: 'Console & DevTools',
    consoleCloaking: 'Ẩn Console (Console Cloaking)',
    exclude: 'Loại trừ',
    devToolsBlocking: 'Chặn DevTools',
    patience: 'Độ kiên nhẫn',
    seconds: 'giây',
    
    globalObjectHiding: 'Ẩn đối tượng toàn cục',
    usePredefined: 'Sử dụng định nghĩa sẵn',
    include: 'Bao gồm (Include)',
    
    antiDebugging: 'Chống Debug nâng cao',
    antiDebuggingDesc: 'Phát hiện và ngăn chặn debugger',
    codeIntegrity: 'Kiểm tra tính toàn vẹn',
    codeIntegrityDesc: 'Kiểm tra mã có bị thay đổi không',
    memoryProtection: 'Bảo vệ bộ nhớ',
    memoryProtectionDesc: 'Xóa biến quan trọng khỏi bộ nhớ',
    antiTampering: 'Chống sửa đổi',
    antiTamperingDesc: 'Phát hiện và ngăn chặn sửa đổi mã',
    stackTraceHiding: 'Ẩn Stack Trace',
    stackTraceHidingDesc: 'Che giấu thông tin debug stack',
    proxyTrap: 'Bẫy Proxy',
    proxyTrapDesc: 'Sử dụng Proxy để bảo vệ đối tượng',
    
    howToUse: 'Hướng dẫn sử dụng',
    step1: '1. Dán mã JavaScript vào ô bên trái',
    step2: '2. Chọn phương pháp mã hóa phù hợp',
    step3: '3. Bật tùy chọn Tampermonkey nếu cần',
    step4: '4. Nhấn "Mã hóa ngay" và sao chép kết quả',
    importantNotes: 'Lưu ý quan trọng',
    note1: '• Phương pháp "Multi-Layer" có độ bảo mật cao nhất',
    note2: '• Mã hóa làm tăng kích thước file',
    note3: '• Luôn test mã sau khi mã hóa',
    note4: '• Giữ bản gốc để dễ chỉnh sửa',
    
    footerText: 'JS Obfuscator - Công cụ mã hóa JavaScript & Tampermonkey',
    
    pleaseEnterCode: 'Vui lòng nhập mã JavaScript!',
    obfuscateSuccess: 'Mã hóa thành công!',
    obfuscateError: 'Có lỗi xảy ra khi mã hóa!',
    noCodeToCopy: 'Chưa có mã để sao chép!',
    clearedAll: 'Đã xóa tất cả!',
  },
  
  en: {
    title: 'JS Obfuscator',
    subtitle: 'JavaScript & Tampermonkey Obfuscation',
    author: '!code(KoBtCode)',
    
    highSecurity: 'High Security',
    fastProcessing: 'Fast Processing',
    manyAlgorithms: 'Many Algorithms',
    tampermonkeySupport: 'Tampermonkey Support',
    
    sourceCode: 'JavaScript Source Code',
    enterCode: 'Enter JavaScript code to obfuscate',
    placeholder: `// Enter your JavaScript code here
console.log("Hello World!");

function myFunction() {
  // Your code here
}`,
    result: 'Obfuscation Result',
    protectedCode: 'Protected code',
    resultPlaceholder: 'Obfuscation result will appear here...',
    length: 'Length',
    characters: 'characters',
    copy: 'Copy',
    copied: 'Copied to clipboard!',
    
    addTampermonkeyHeader: 'Add Tampermonkey header',
    scriptName: 'Script Name',
    description: 'Description',
    matchPattern: 'Match Pattern',
    
    obfuscationMethod: 'Obfuscation Method',
    obfuscateNow: 'Obfuscate Now',
    clearAll: 'Clear All',
    
    methods: {
      base64: { name: 'Base64', desc: 'Basic Base64 encoding' },
      unicode: { name: 'Unicode Escape', desc: 'Convert to Unicode escape' },
      hex: { name: 'Hexadecimal', desc: 'Encode to Hex string' },
      charCode: { name: 'CharCode Array', desc: 'Convert to charCode array' },
      jsfuck: { name: 'JSFuck Style', desc: 'Complex JSFuck-style encoding' },
      aaencode: { name: 'AAEncode Style', desc: 'Special character encoding' },
      combined: { name: 'Multi-Layer', desc: 'Multiple layer encoding (strongest)' },
      rot13: { name: 'ROT13 Plus', desc: 'Enhanced ROT13 with variations' },
      xor: { name: 'XOR Cipher', desc: 'XOR encoding with random key' },
      aes: { name: 'AES-Like', desc: 'AES-style encryption (powerful)' },
      deadCode: { name: 'Dead Code', desc: 'Insert decoy code' },
      stringArray: { name: 'String Array', desc: 'Extract strings to array' },
      controlFlow: { name: 'Control Flow', desc: 'Flatten control flow' },
      flatten: { name: 'Code Flatten', desc: 'Flatten entire source code' },
    },
    
    protectionOptions: 'Protection Options',
    advancedProtection: 'Configure advanced protection options',
    
    booleanReplacement: 'Boolean Literal Replacement',
    randomize: 'Randomize',
    
    integerReplacement: 'Integer Literal Replacement',
    radix: 'Radix',
    radixNone: 'None',
    radixBinary: 'Binary',
    radixDecimal: 'Decimal',
    radixHex: 'Hexadecimal',
    radixOctal: 'Octal',
    lowValue: 'Lower Value',
    highValue: 'Upper Value',
    
    codeTransformations: 'Code Transformations',
    debuggerRemoval: 'Debugger Statement Removal',
    stringExtraction: 'String Literal Extraction',
    propertyIndirection: 'Property Indirection',
    
    localNameMangling: 'Local Declaration Name Mangling',
    manglingType: 'Mangling Type',
    sequential: 'Sequential',
    hexadecimal: 'Hexadecimal',
    
    controlFlowProtection: 'Control Flow Protection',
    constantArgObfuscation: 'Constant Argument Obfuscation',
    
    domainLock: 'Domain Lock',
    domainPattern: 'Domain Pattern',
    errorScript: 'Error Script',
    
    functionReordering: 'Function Reordering',
    
    advancedObfuscation: 'Advanced Obfuscation',
    propertySparsing: 'Property Sparsing',
    variableGrouping: 'Variable Grouping',
    expressionSequence: 'Expression Sequence Obfuscation',
    
    selfDefending: 'Self-Defending Protection',
    level: 'Level',
    
    dateLock: 'Date Lock',
    startDate: 'Start Date',
    endDate: 'End Date',
    
    consoleDevTools: 'Console & DevTools',
    consoleCloaking: 'Console Cloaking',
    exclude: 'Exclude',
    devToolsBlocking: 'DevTools Blocking',
    patience: 'Patience',
    seconds: 'seconds',
    
    globalObjectHiding: 'Global Object Hiding',
    usePredefined: 'Use Predefined',
    include: 'Include',
    
    antiDebugging: 'Advanced Anti-Debugging',
    antiDebuggingDesc: 'Detect and prevent debugger',
    codeIntegrity: 'Code Integrity Check',
    codeIntegrityDesc: 'Check if code has been modified',
    memoryProtection: 'Memory Protection',
    memoryProtectionDesc: 'Clear sensitive variables from memory',
    antiTampering: 'Anti-Tampering',
    antiTamperingDesc: 'Detect and prevent code modification',
    stackTraceHiding: 'Stack Trace Hiding',
    stackTraceHidingDesc: 'Hide debug stack information',
    proxyTrap: 'Proxy Trap',
    proxyTrapDesc: 'Use Proxy to protect objects',
    
    howToUse: 'How to Use',
    step1: '1. Paste JavaScript code in the left box',
    step2: '2. Choose appropriate obfuscation method',
    step3: '3. Enable Tampermonkey option if needed',
    step4: '4. Click "Obfuscate Now" and copy result',
    importantNotes: 'Important Notes',
    note1: '• "Multi-Layer" method has the highest security',
    note2: '• Obfuscation increases file size',
    note3: '• Always test code after obfuscation',
    note4: '• Keep original code for easy editing',
    
    footerText: 'JS Obfuscator - JavaScript & Tampermonkey Obfuscation Tool',
    
    pleaseEnterCode: 'Please enter JavaScript code!',
    obfuscateSuccess: 'Obfuscation successful!',
    obfuscateError: 'Error occurred during obfuscation!',
    noCodeToCopy: 'No code to copy!',
    clearedAll: 'Cleared all!',
  },
  
  zh: {
    title: 'JS混淆器',
    subtitle: 'JavaScript和Tampermonkey混淆',
    author: '!code(KoBtCode)',
    
    highSecurity: '高安全性',
    fastProcessing: '快速处理',
    manyAlgorithms: '多种算法',
    tampermonkeySupport: '支持Tampermonkey',
    
    sourceCode: 'JavaScript源代码',
    enterCode: '输入要混淆的JavaScript代码',
    placeholder: `// 在此输入您的JavaScript代码
console.log("Hello World!");

function myFunction() {
  // 您的代码
}`,
    result: '混淆结果',
    protectedCode: '受保护的代码',
    resultPlaceholder: '混淆结果将显示在这里...',
    length: '长度',
    characters: '字符',
    copy: '复制',
    copied: '已复制到剪贴板！',
    
    addTampermonkeyHeader: '添加Tampermonkey头',
    scriptName: '脚本名称',
    description: '描述',
    matchPattern: '匹配模式',
    
    obfuscationMethod: '混淆方法',
    obfuscateNow: '立即混淆',
    clearAll: '清除全部',
    
    methods: {
      base64: { name: 'Base64', desc: '基本Base64编码' },
      unicode: { name: 'Unicode转义', desc: '转换为Unicode转义' },
      hex: { name: '十六进制', desc: '编码为Hex字符串' },
      charCode: { name: 'CharCode数组', desc: '转换为charCode数组' },
      jsfuck: { name: 'JSFuck风格', desc: '复杂的JSFuck风格编码' },
      aaencode: { name: 'AAEncode风格', desc: '特殊字符编码' },
      combined: { name: '多层', desc: '多层编码组合（最强）' },
      rot13: { name: 'ROT13增强', desc: '增强ROT13变体' },
      xor: { name: 'XOR加密', desc: 'XOR随机密钥编码' },
      aes: { name: 'AES风格', desc: 'AES风格加密（强大）' },
      deadCode: { name: '死代码', desc: '插入诱饵代码' },
      stringArray: { name: '字符串数组', desc: '将字符串提取到数组' },
      controlFlow: { name: '控制流', desc: '扁平化控制流' },
      flatten: { name: '代码扁平化', desc: '扁平化整个源代码' },
    },
    
    protectionOptions: '保护选项',
    advancedProtection: '配置高级保护选项',
    
    booleanReplacement: '布尔值替换',
    randomize: '随机化',
    
    integerReplacement: '整数替换',
    radix: '进制',
    radixNone: '无',
    radixBinary: '二进制',
    radixDecimal: '十进制',
    radixHex: '十六进制',
    radixOctal: '八进制',
    lowValue: '下限值',
    highValue: '上限值',
    
    codeTransformations: '代码转换',
    debuggerRemoval: '移除Debugger语句',
    stringExtraction: '字符串提取',
    propertyIndirection: '属性间接访问',
    
    localNameMangling: '局部变量名混淆',
    manglingType: '混淆类型',
    sequential: '顺序',
    hexadecimal: '十六进制',
    
    controlFlowProtection: '控制流保护',
    constantArgObfuscation: '常量参数混淆',
    
    domainLock: '域名锁定',
    domainPattern: '域名模式',
    errorScript: '错误脚本',
    
    functionReordering: '函数重排',
    
    advancedObfuscation: '高级混淆',
    propertySparsing: '属性稀疏化',
    variableGrouping: '变量分组',
    expressionSequence: '表达式序列混淆',
    
    selfDefending: '自我保护',
    level: '级别',
    
    dateLock: '日期锁定',
    startDate: '开始日期',
    endDate: '结束日期',
    
    consoleDevTools: '控制台和开发工具',
    consoleCloaking: '控制台隐藏',
    exclude: '排除',
    devToolsBlocking: '阻止开发工具',
    patience: '耐心度',
    seconds: '秒',
    
    globalObjectHiding: '隐藏全局对象',
    usePredefined: '使用预定义',
    include: '包含',
    
    antiDebugging: '高级反调试',
    antiDebuggingDesc: '检测并阻止调试器',
    codeIntegrity: '代码完整性检查',
    codeIntegrityDesc: '检查代码是否被修改',
    memoryProtection: '内存保护',
    memoryProtectionDesc: '从内存中清除敏感变量',
    antiTampering: '防篡改',
    antiTamperingDesc: '检测并阻止代码修改',
    stackTraceHiding: '隐藏堆栈跟踪',
    stackTraceHidingDesc: '隐藏调试堆栈信息',
    proxyTrap: 'Proxy陷阱',
    proxyTrapDesc: '使用Proxy保护对象',
    
    howToUse: '使用说明',
    step1: '1. 在左侧框中粘贴JavaScript代码',
    step2: '2. 选择适当的混淆方法',
    step3: '3. 如需要启用Tampermonkey选项',
    step4: '4. 点击"立即混淆"并复制结果',
    importantNotes: '重要说明',
    note1: '• "多层"方法具有最高安全性',
    note2: '• 混淆会增加文件大小',
    note3: '• 混淆后务必测试代码',
    note4: '• 保留原始代码以便编辑',
    
    footerText: 'JS混淆器 - JavaScript和Tampermonkey混淆工具',
    
    pleaseEnterCode: '请输入JavaScript代码！',
    obfuscateSuccess: '混淆成功！',
    obfuscateError: '混淆过程中发生错误！',
    noCodeToCopy: '没有代码可复制！',
    clearedAll: '已全部清除！',
  },
};
