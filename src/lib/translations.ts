// Multi-language translations

export type Language = 'vi' | 'en' | 'zh' | 'ja' | 'ko' | 'es' | 'fr';

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

const baseTranslations = {
  vi: {
    title: 'JS Obfuscator',
    subtitle: 'Mã hóa JavaScript & Tampermonkey',
    author: 'like.1 (Nguyên) & Zen (Đức)',
    
    highSecurity: 'Làm rối mã',
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
    note1: '• Multi-Layer kết hợp nhiều bước làm rối; đây không phải mã hóa mật mã.',
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
    author: 'like.1 (Nguyên) & Zen (Đức)',
    
    highSecurity: 'Code Obfuscation',
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
    note1: '• Multi-Layer combines obfuscation steps; it is not cryptographic encryption.',
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
    author: 'like.1 (Nguyên) & Zen (Đức)',
    
    highSecurity: '代码混淆',
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
    note1: '• Multi-Layer组合多种混淆步骤；它不是密码学加密。',
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
} satisfies Record<'vi' | 'en' | 'zh', Translations>;

type TranslationOverrides = Partial<Omit<Translations, 'methods'>> & {
  methods?: Partial<Translations['methods']>;
};

const withEnglishFallback = (overrides: TranslationOverrides): Translations => ({
  ...baseTranslations.en,
  ...overrides,
  methods: { ...baseTranslations.en.methods, ...overrides.methods },
});

export const translations: Record<Language, Translations> = {
  ...baseTranslations,
  ja: withEnglishFallback({
    title: 'JavaScript難読化ツール', subtitle: 'JavaScriptとTampermonkeyのコード難読化', author: 'like.1 (Nguyên) & Zen (Đức)',
    highSecurity: 'コード難読化', fastProcessing: '高速処理', manyAlgorithms: '多彩な方式', tampermonkeySupport: 'Tampermonkey対応',
    sourceCode: 'JavaScriptソースコード', enterCode: '難読化するJavaScriptコードを入力',
    placeholder: `// ここにJavaScriptコードを入力
console.log("Hello World!");

function myFunction() {
  // ここにコードを記述
}`,
    result: '難読化結果', protectedCode: '難読化されたコード', resultPlaceholder: '結果がここに表示されます…', length: '長さ', characters: '文字', copy: 'コピー', copied: 'クリップボードにコピーしました！',
    addTampermonkeyHeader: 'Tampermonkeyヘッダーを追加', scriptName: 'スクリプト名', description: '説明', matchPattern: '対象URLパターン',
    obfuscationMethod: '難読化方式', obfuscateNow: '今すぐ難読化', clearAll: 'すべてクリア',
    methods: {
      base64: { name: 'Base64', desc: 'Base64による基本的な変換' }, unicode: { name: 'Unicodeエスケープ', desc: 'Unicodeエスケープ形式に変換' },
      hex: { name: '16進数', desc: '16進数文字列に変換' }, charCode: { name: 'CharCode配列', desc: '文字コード配列に変換' },
      jsfuck: { name: 'JSFuck風', desc: 'JSFuck風の複雑な表現に変換' }, aaencode: { name: 'AAEncode風', desc: '特殊文字を使った表現に変換' },
      combined: { name: '多層', desc: '複数の変換方式を組み合わせる' }, rot13: { name: 'ROT13 Plus', desc: '変形を加えたROT13変換' },
      xor: { name: 'XOR方式', desc: 'ランダムキーを使ったXOR変換' }, aes: { name: 'AES風', desc: 'AES風の変換表現' },
      deadCode: { name: 'ダミーコード', desc: '不要なコードを挿入' }, stringArray: { name: '文字列配列', desc: '文字列を配列に取り出す' },
      controlFlow: { name: '制御フロー', desc: '制御フローを変換' }, flatten: { name: 'コード平坦化', desc: 'ソースコード全体を平坦化' },
    },
    protectionOptions: '保護オプション', advancedProtection: '追加オプションの設定', booleanReplacement: '真偽値リテラルの置換', randomize: 'ランダム化',
    integerReplacement: '整数リテラルの置換', radix: '基数', radixNone: 'なし', radixBinary: '2進数', radixDecimal: '10進数', radixHex: '16進数', radixOctal: '8進数', lowValue: '下限値', highValue: '上限値',
    codeTransformations: 'コード変換', debuggerRemoval: 'debugger文の削除', stringExtraction: '文字列リテラルの抽出', propertyIndirection: 'プロパティ参照の変換',
    localNameMangling: 'ローカル名の変換', manglingType: '変換方式', sequential: '連番', hexadecimal: '16進数', controlFlowProtection: '制御フロー変換', constantArgObfuscation: '定数引数の変換',
    domainLock: 'ドメイン制限', domainPattern: 'ドメインパターン', errorScript: 'エラー時のスクリプト', functionReordering: '関数の並べ替え', advancedObfuscation: '追加のコード変換',
    propertySparsing: 'プロパティの間引き', variableGrouping: '変数のグループ化', expressionSequence: '式の連続化', selfDefending: '自己防御', level: 'レベル',
    dateLock: '日付制限', startDate: '開始日', endDate: '終了日', consoleDevTools: 'コンソールと開発ツール', consoleCloaking: 'コンソール出力の制御', exclude: '除外', devToolsBlocking: '開発ツールのブロック', patience: '待機時間', seconds: '秒',
    globalObjectHiding: 'グローバルオブジェクトの制御', usePredefined: '定義済み項目を使用', include: '含める項目',
    antiDebugging: 'デバッグ検出', antiDebuggingDesc: 'デバッガーを検出して制限', codeIntegrity: 'コード整合性チェック', codeIntegrityDesc: 'コードの変更を確認', memoryProtection: 'メモリ保護', memoryProtectionDesc: '重要な変数をメモリから消去', antiTampering: '改ざん検出', antiTamperingDesc: 'コードの変更を検出して制限', stackTraceHiding: 'スタックトレースの制御', stackTraceHidingDesc: 'デバッグ情報を隠す', proxyTrap: 'Proxyトラップ', proxyTrapDesc: 'Proxyでオブジェクトを保護',
    howToUse: '使い方', step1: '1. 左の欄にJavaScriptコードを貼り付けます', step2: '2. 方式を選択します', step3: '3. 必要に応じてTampermonkeyヘッダーを有効にします', step4: '4. 「今すぐ難読化」を押して結果をコピーします', importantNotes: '注意事項', note1: '• Multi-Layerは複数の難読化手順を組み合わせます。暗号化ではありません。', note2: '• 難読化によりファイルサイズが増えることがあります', note3: '• 変換後のコードを必ずテストしてください', note4: '• 編集用に元のコードを保管してください',
    footerText: 'JavaScript・Tampermonkeyコード難読化ツール', pleaseEnterCode: 'JavaScriptコードを入力してください', obfuscateSuccess: '変換しました！', obfuscateError: '変換中にエラーが発生しました', noCodeToCopy: 'コピーするコードがありません', clearedAll: 'すべてクリアしました',
  }),
  ko: withEnglishFallback({
    title: 'JavaScript 난독화 도구', subtitle: 'JavaScript 및 Tampermonkey 코드 난독화', author: 'like.1 (Nguyên) & Zen (Đức)',
    highSecurity: '코드 난독화', fastProcessing: '빠른 처리', manyAlgorithms: '다양한 방식', tampermonkeySupport: 'Tampermonkey 지원',
    sourceCode: 'JavaScript 소스 코드', enterCode: '난독화할 JavaScript 코드를 입력하세요',
    placeholder: `// 여기에 JavaScript 코드를 입력하세요
console.log("Hello World!");

function myFunction() {
  // 코드를 입력하세요
}`,
    result: '난독화 결과', protectedCode: '난독화된 코드', resultPlaceholder: '결과가 여기에 표시됩니다…', length: '길이', characters: '자', copy: '복사', copied: '클립보드에 복사했습니다!',
    addTampermonkeyHeader: 'Tampermonkey 헤더 추가', scriptName: '스크립트 이름', description: '설명', matchPattern: '대상 URL 패턴',
    obfuscationMethod: '난독화 방식', obfuscateNow: '지금 난독화', clearAll: '모두 지우기',
    methods: {
      base64: { name: 'Base64', desc: '기본 Base64 변환' }, unicode: { name: '유니코드 이스케이프', desc: '유니코드 이스케이프 형식으로 변환' },
      hex: { name: '16진수', desc: '16진수 문자열로 변환' }, charCode: { name: 'CharCode 배열', desc: '문자 코드 배열로 변환' },
      jsfuck: { name: 'JSFuck 스타일', desc: '복잡한 JSFuck 스타일 표현으로 변환' }, aaencode: { name: 'AAEncode 스타일', desc: '특수 문자를 사용하는 표현으로 변환' },
      combined: { name: '다중 레이어', desc: '여러 변환 방식을 결합' }, rot13: { name: 'ROT13 Plus', desc: '변형을 더한 ROT13 변환' },
      xor: { name: 'XOR 방식', desc: '무작위 키를 사용하는 XOR 변환' }, aes: { name: 'AES 스타일', desc: 'AES 스타일 표현으로 변환' },
      deadCode: { name: '더미 코드', desc: '사용하지 않는 코드를 삽입' }, stringArray: { name: '문자열 배열', desc: '문자열을 배열로 추출' },
      controlFlow: { name: '제어 흐름', desc: '제어 흐름을 변환' }, flatten: { name: '코드 평탄화', desc: '전체 소스 코드를 평탄화' },
    },
    protectionOptions: '보호 옵션', advancedProtection: '추가 옵션 설정', booleanReplacement: '불리언 리터럴 바꾸기', randomize: '무작위화',
    integerReplacement: '정수 리터럴 바꾸기', radix: '진법', radixNone: '없음', radixBinary: '2진수', radixDecimal: '10진수', radixHex: '16진수', radixOctal: '8진수', lowValue: '최솟값', highValue: '최댓값',
    codeTransformations: '코드 변환', debuggerRemoval: 'debugger 문 제거', stringExtraction: '문자열 리터럴 추출', propertyIndirection: '속성 참조 변환',
    localNameMangling: '지역 이름 변환', manglingType: '변환 방식', sequential: '순차', hexadecimal: '16진수', controlFlowProtection: '제어 흐름 변환', constantArgObfuscation: '상수 인수 변환',
    domainLock: '도메인 제한', domainPattern: '도메인 패턴', errorScript: '오류 스크립트', functionReordering: '함수 순서 변경', advancedObfuscation: '추가 코드 변환',
    propertySparsing: '속성 간소화', variableGrouping: '변수 그룹화', expressionSequence: '식 연결', selfDefending: '자체 방어', level: '단계',
    dateLock: '날짜 제한', startDate: '시작 날짜', endDate: '종료 날짜', consoleDevTools: '콘솔 및 개발자 도구', consoleCloaking: '콘솔 출력 제어', exclude: '제외', devToolsBlocking: '개발자 도구 차단', patience: '대기 시간', seconds: '초',
    globalObjectHiding: '전역 객체 제어', usePredefined: '미리 정의된 항목 사용', include: '포함',
    antiDebugging: '디버깅 감지', antiDebuggingDesc: '디버거를 감지하고 제한', codeIntegrity: '코드 무결성 확인', codeIntegrityDesc: '코드 변경 여부 확인', memoryProtection: '메모리 보호', memoryProtectionDesc: '중요한 변수를 메모리에서 지움', antiTampering: '변조 감지', antiTamperingDesc: '코드 변경을 감지하고 제한', stackTraceHiding: '스택 추적 제어', stackTraceHidingDesc: '디버그 정보 숨기기', proxyTrap: 'Proxy 트랩', proxyTrapDesc: 'Proxy로 객체 보호',
    howToUse: '사용 방법', step1: '1. 왼쪽 입력란에 JavaScript 코드를 붙여 넣으세요', step2: '2. 변환 방식을 선택하세요', step3: '3. 필요하면 Tampermonkey 헤더를 켜세요', step4: '4. “지금 난독화”를 누르고 결과를 복사하세요', importantNotes: '주의 사항', note1: '• Multi-Layer는 여러 난독화 단계를 결합하며 암호화가 아닙니다.', note2: '• 난독화하면 파일 크기가 커질 수 있습니다', note3: '• 변환한 코드를 반드시 테스트하세요', note4: '• 편집을 위해 원본 코드를 보관하세요',
    footerText: 'JavaScript 및 Tampermonkey 코드 난독화 도구', pleaseEnterCode: 'JavaScript 코드를 입력하세요', obfuscateSuccess: '변환이 완료되었습니다!', obfuscateError: '변환 중 오류가 발생했습니다', noCodeToCopy: '복사할 코드가 없습니다', clearedAll: '모두 지웠습니다',
  }),
  es: withEnglishFallback({
    title: 'Ofuscador de JavaScript', subtitle: 'Ofuscación de código JavaScript y Tampermonkey', author: 'like.1 (Nguyên) & Zen (Đức)',
    highSecurity: 'Ofuscación de código', fastProcessing: 'Procesamiento rápido', manyAlgorithms: 'Varios métodos', tampermonkeySupport: 'Compatible con Tampermonkey',
    sourceCode: 'Código fuente JavaScript', enterCode: 'Introduce el código JavaScript que quieres ofuscar',
    placeholder: `// Escribe aquí tu código JavaScript
console.log("Hello World!");

function myFunction() {
  // Escribe aquí tu código
}`,
    result: 'Resultado de la ofuscación', protectedCode: 'Código ofuscado', resultPlaceholder: 'El resultado aparecerá aquí…', length: 'Longitud', characters: 'caracteres', copy: 'Copiar', copied: '¡Copiado al portapapeles!',
    addTampermonkeyHeader: 'Añadir encabezado de Tampermonkey', scriptName: 'Nombre del script', description: 'Descripción', matchPattern: 'Patrón de URL',
    obfuscationMethod: 'Método de ofuscación', obfuscateNow: 'Ofuscar ahora', clearAll: 'Borrar todo',
    methods: {
      base64: { name: 'Base64', desc: 'Conversión básica con Base64' }, unicode: { name: 'Escape Unicode', desc: 'Convertir a secuencias de escape Unicode' },
      hex: { name: 'Hexadecimal', desc: 'Convertir a una cadena hexadecimal' }, charCode: { name: 'Array CharCode', desc: 'Convertir a un array de códigos de caracteres' },
      jsfuck: { name: 'Estilo JSFuck', desc: 'Representación compleja al estilo JSFuck' }, aaencode: { name: 'Estilo AAEncode', desc: 'Representación con caracteres especiales' },
      combined: { name: 'Multicapa', desc: 'Combina varios pasos de ofuscación' }, rot13: { name: 'ROT13 Plus', desc: 'ROT13 con variaciones' },
      xor: { name: 'Método XOR', desc: 'Conversión XOR con una clave aleatoria' }, aes: { name: 'Estilo AES', desc: 'Representación de estilo AES' },
      deadCode: { name: 'Código señuelo', desc: 'Inserta código sin uso' }, stringArray: { name: 'Array de cadenas', desc: 'Extrae las cadenas a un array' },
      controlFlow: { name: 'Flujo de control', desc: 'Transforma el flujo de control' }, flatten: { name: 'Aplanar código', desc: 'Aplana todo el código fuente' },
    },
    protectionOptions: 'Opciones de protección', advancedProtection: 'Configura opciones adicionales', booleanReplacement: 'Sustitución de valores booleanos', randomize: 'Aleatorizar',
    integerReplacement: 'Sustitución de enteros', radix: 'Base numérica', radixNone: 'Ninguna', radixBinary: 'Binaria', radixDecimal: 'Decimal', radixHex: 'Hexadecimal', radixOctal: 'Octal', lowValue: 'Valor mínimo', highValue: 'Valor máximo',
    codeTransformations: 'Transformaciones del código', debuggerRemoval: 'Eliminar instrucciones debugger', stringExtraction: 'Extraer cadenas literales', propertyIndirection: 'Transformar referencias a propiedades',
    localNameMangling: 'Transformar nombres locales', manglingType: 'Tipo de transformación', sequential: 'Secuencial', hexadecimal: 'Hexadecimal', controlFlowProtection: 'Transformación del flujo de control', constantArgObfuscation: 'Transformar argumentos constantes',
    domainLock: 'Restringir por dominio', domainPattern: 'Patrón de dominio', errorScript: 'Script de error', functionReordering: 'Reordenar funciones', advancedObfuscation: 'Transformaciones adicionales',
    propertySparsing: 'Reducir propiedades', variableGrouping: 'Agrupar variables', expressionSequence: 'Secuenciar expresiones', selfDefending: 'Autoprotección', level: 'Nivel',
    dateLock: 'Restringir por fecha', startDate: 'Fecha de inicio', endDate: 'Fecha de fin', consoleDevTools: 'Consola y herramientas de desarrollo', consoleCloaking: 'Control de la consola', exclude: 'Excluir', devToolsBlocking: 'Bloquear herramientas de desarrollo', patience: 'Tiempo de espera', seconds: 'segundos',
    globalObjectHiding: 'Control de objetos globales', usePredefined: 'Usar elementos predefinidos', include: 'Incluir',
    antiDebugging: 'Detección de depuración', antiDebuggingDesc: 'Detecta y limita el depurador', codeIntegrity: 'Comprobación de integridad', codeIntegrityDesc: 'Comprueba si el código ha cambiado', memoryProtection: 'Protección de memoria', memoryProtectionDesc: 'Elimina variables importantes de la memoria', antiTampering: 'Detección de modificaciones', antiTamperingDesc: 'Detecta y limita cambios en el código', stackTraceHiding: 'Control de trazas de pila', stackTraceHidingDesc: 'Oculta información de depuración', proxyTrap: 'Trampa Proxy', proxyTrapDesc: 'Protege objetos mediante Proxy',
    howToUse: 'Cómo usar', step1: '1. Pega el código JavaScript en el campo izquierdo', step2: '2. Elige un método de ofuscación', step3: '3. Activa el encabezado de Tampermonkey si lo necesitas', step4: '4. Pulsa “Ofuscar ahora” y copia el resultado', importantNotes: 'Notas importantes', note1: '• Multicapa combina varios pasos de ofuscación; no es cifrado criptográfico.', note2: '• La ofuscación puede aumentar el tamaño del archivo', note3: '• Prueba siempre el código después de transformarlo', note4: '• Conserva el código original para editarlo',
    footerText: 'Herramienta de ofuscación para JavaScript y Tampermonkey', pleaseEnterCode: 'Introduce código JavaScript', obfuscateSuccess: '¡Ofuscación completada!', obfuscateError: 'Se produjo un error durante la ofuscación', noCodeToCopy: 'No hay código para copiar', clearedAll: 'Se ha borrado todo',
  }),
  fr: withEnglishFallback({
    title: 'Obfuscateur JavaScript', subtitle: 'Obfuscation de code JavaScript et Tampermonkey', author: 'like.1 (Nguyên) & Zen (Đức)',
    highSecurity: 'Obfuscation du code', fastProcessing: 'Traitement rapide', manyAlgorithms: 'Plusieurs méthodes', tampermonkeySupport: 'Compatible avec Tampermonkey',
    sourceCode: 'Code source JavaScript', enterCode: 'Saisissez le code JavaScript à obfusquer',
    placeholder: `// Saisissez votre code JavaScript ici
console.log("Hello World!");

function myFunction() {
  // Écrivez votre code ici
}`,
    result: 'Résultat de l’obfuscation', protectedCode: 'Code obfusqué', resultPlaceholder: 'Le résultat apparaîtra ici…', length: 'Longueur', characters: 'caractères', copy: 'Copier', copied: 'Copié dans le presse-papiers !',
    addTampermonkeyHeader: 'Ajouter un en-tête Tampermonkey', scriptName: 'Nom du script', description: 'Description', matchPattern: 'Motif d’URL',
    obfuscationMethod: 'Méthode d’obfuscation', obfuscateNow: 'Obfusquer maintenant', clearAll: 'Tout effacer',
    methods: {
      base64: { name: 'Base64', desc: 'Conversion de base avec Base64' }, unicode: { name: 'Échappement Unicode', desc: 'Convertir en séquences Unicode échappées' },
      hex: { name: 'Hexadécimal', desc: 'Convertir en chaîne hexadécimale' }, charCode: { name: 'Tableau CharCode', desc: 'Convertir en tableau de codes de caractères' },
      jsfuck: { name: 'Style JSFuck', desc: 'Représentation complexe de style JSFuck' }, aaencode: { name: 'Style AAEncode', desc: 'Représentation avec des caractères spéciaux' },
      combined: { name: 'Multicouche', desc: 'Combine plusieurs étapes d’obfuscation' }, rot13: { name: 'ROT13 Plus', desc: 'ROT13 avec des variantes' },
      xor: { name: 'Méthode XOR', desc: 'Conversion XOR avec une clé aléatoire' }, aes: { name: 'Style AES', desc: 'Représentation de style AES' },
      deadCode: { name: 'Code leurre', desc: 'Insère du code inutilisé' }, stringArray: { name: 'Tableau de chaînes', desc: 'Extrait les chaînes dans un tableau' },
      controlFlow: { name: 'Flux de contrôle', desc: 'Transforme le flux de contrôle' }, flatten: { name: 'Aplatissement du code', desc: 'Aplatit tout le code source' },
    },
    protectionOptions: 'Options de protection', advancedProtection: 'Configurer des options supplémentaires', booleanReplacement: 'Remplacement des booléens', randomize: 'Aléatoirement',
    integerReplacement: 'Remplacement des entiers', radix: 'Base numérique', radixNone: 'Aucune', radixBinary: 'Binaire', radixDecimal: 'Décimale', radixHex: 'Hexadécimale', radixOctal: 'Octale', lowValue: 'Valeur minimale', highValue: 'Valeur maximale',
    codeTransformations: 'Transformations du code', debuggerRemoval: 'Supprimer les instructions debugger', stringExtraction: 'Extraire les chaînes littérales', propertyIndirection: 'Transformer les références aux propriétés',
    localNameMangling: 'Transformer les noms locaux', manglingType: 'Type de transformation', sequential: 'Séquentiel', hexadecimal: 'Hexadécimal', controlFlowProtection: 'Transformation du flux de contrôle', constantArgObfuscation: 'Transformer les arguments constants',
    domainLock: 'Restriction par domaine', domainPattern: 'Motif de domaine', errorScript: 'Script d’erreur', functionReordering: 'Réorganiser les fonctions', advancedObfuscation: 'Transformations supplémentaires',
    propertySparsing: 'Réduire les propriétés', variableGrouping: 'Regrouper les variables', expressionSequence: 'Séquencer les expressions', selfDefending: 'Autoprotection', level: 'Niveau',
    dateLock: 'Restriction par date', startDate: 'Date de début', endDate: 'Date de fin', consoleDevTools: 'Console et outils de développement', consoleCloaking: 'Contrôle de la console', exclude: 'Exclure', devToolsBlocking: 'Bloquer les outils de développement', patience: 'Délai d’attente', seconds: 'secondes',
    globalObjectHiding: 'Contrôle des objets globaux', usePredefined: 'Utiliser les éléments prédéfinis', include: 'Inclure',
    antiDebugging: 'Détection du débogage', antiDebuggingDesc: 'Détecte et limite le débogueur', codeIntegrity: 'Vérification de l’intégrité', codeIntegrityDesc: 'Vérifie si le code a été modifié', memoryProtection: 'Protection de la mémoire', memoryProtectionDesc: 'Efface les variables importantes de la mémoire', antiTampering: 'Détection des modifications', antiTamperingDesc: 'Détecte et limite les modifications du code', stackTraceHiding: 'Contrôle des traces de pile', stackTraceHidingDesc: 'Masque les informations de débogage', proxyTrap: 'Piège Proxy', proxyTrapDesc: 'Protège les objets avec Proxy',
    howToUse: 'Mode d’emploi', step1: '1. Collez le code JavaScript dans le champ de gauche', step2: '2. Choisissez une méthode d’obfuscation', step3: '3. Activez l’en-tête Tampermonkey si nécessaire', step4: '4. Cliquez sur « Obfusquer maintenant » puis copiez le résultat', importantNotes: 'Remarques importantes', note1: '• Multicouche combine plusieurs étapes d’obfuscation ; ce n’est pas un chiffrement cryptographique.', note2: '• L’obfuscation peut augmenter la taille du fichier', note3: '• Testez toujours le code après transformation', note4: '• Conservez le code original pour le modifier',
    footerText: 'Outil d’obfuscation JavaScript et Tampermonkey', pleaseEnterCode: 'Veuillez saisir du code JavaScript', obfuscateSuccess: 'Obfuscation terminée !', obfuscateError: 'Une erreur est survenue pendant l’obfuscation', noCodeToCopy: 'Aucun code à copier', clearedAll: 'Tout a été effacé',
  }),
};
