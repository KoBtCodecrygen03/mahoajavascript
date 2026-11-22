import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { obfuscateCode, generateTampermonkeyHeader, generateTampermonkeyFooter, type ObfuscationMethod, type ProtectionOptions } from "@/lib/obfuscator";
import { translations, type Language } from "@/lib/translations";
import { Copy, Shield, Code, Zap, Lock, FileCode, Wand2, Settings2, Globe, User } from "lucide-react";

const defaultProtectionOptions: ProtectionOptions = {
  booleanLiteralReplacement: false,
  booleanRandomize: false,
  integerLiteralReplacement: false,
  integerRandomize: false,
  integerRadix: 'none',
  integerLower: 0,
  integerUpper: 100,
  debuggerRemoval: false,
  stringExtraction: false,
  propertyIndirection: false,
  localNameMangling: false,
  manglingType: 'sequential',
  controlFlowProtection: false,
  controlFlowRandomize: false,
  constantArgumentObfuscation: false,
  domainLock: false,
  domainPattern: '',
  domainErrorScript: '',
  functionReordering: false,
  functionRandomize: false,
  propertySparsing: false,
  variableGrouping: false,
  expressionSequence: false,
  selfDefending: false,
  selfDefendingLevel: 1,
  selfDefendingErrorScript: '',
  dateLock: false,
  startDate: '',
  endDate: '',
  dateErrorScript: '',
  consoleCloaking: false,
  consoleCloakingExclude: '',
  devToolsBlocking: false,
  devToolsPatience: 5,
  globalObjectHiding: false,
  globalUsePredefined: false,
  globalInclude: '',
  globalExclude: '',
  // New protection options
  antiDebugging: false,
  codeIntegrity: false,
  memoryProtection: false,
  antiTampering: false,
  stackTraceHiding: false,
  proxyTrap: false,
};

const Index = () => {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [method, setMethod] = useState<ObfuscationMethod>("combined");
  const [includeTampermonkey, setIncludeTampermonkey] = useState(false);
  const [scriptName, setScriptName] = useState("My Script");
  const [scriptDescription, setScriptDescription] = useState("A Tampermonkey script");
  const [matchPattern, setMatchPattern] = useState("*://*/*");
  const [protectionOptions, setProtectionOptions] = useState<ProtectionOptions>(defaultProtectionOptions);
  const [language, setLanguage] = useState<Language>('vi');

  const t = translations[language];
  const protectionHeading: Record<Language, string> = {
    vi: 'Bảo vệ nâng cao',
    en: 'Advanced Protection',
    zh: '高级保护',
    ja: '高度な保護',
    ko: '고급 보호',
    es: 'Protección avanzada',
    fr: 'Protection avancée',
  };

  const updateProtection = <K extends keyof ProtectionOptions>(key: K, value: ProtectionOptions[K]) => {
    setProtectionOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleObfuscate = () => {
    if (!inputCode.trim()) {
      toast.error(t.pleaseEnterCode);
      return;
    }

    try {
      let result = obfuscateCode(inputCode, method, protectionOptions);
      
      if (includeTampermonkey) {
        const header = generateTampermonkeyHeader(scriptName, scriptDescription, matchPattern);
        const footer = generateTampermonkeyFooter();
        result = header + result + footer;
      }
      
      setOutputCode(result);
      toast.success(t.obfuscateSuccess);
    } catch (error) {
      console.error("Obfuscation error:", error);
      toast.error(t.obfuscateError);
    }
  };

  const handleCopy = async () => {
    if (!outputCode) {
      toast.error(t.noCodeToCopy);
      return;
    }
    
    await navigator.clipboard.writeText(outputCode);
    toast.success(t.copied);
  };

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
    toast.info(t.clearedAll);
  };

  const allMethods: ObfuscationMethod[] = [
    'base64', 'unicode', 'hex', 'charCode', 'jsfuck', 'aaencode', 'combined',
    'rot13', 'xor', 'aes', 'deadCode', 'stringArray', 'controlFlow', 'flatten'
  ];

  const getMethodStrength = (m: ObfuscationMethod): number => {
    const strengths: Record<ObfuscationMethod, number> = {
      base64: 1, unicode: 2, hex: 2, charCode: 2, jsfuck: 4, aaencode: 3, combined: 5,
      rot13: 3, xor: 4, aes: 5, deadCode: 3, stringArray: 4, controlFlow: 4, flatten: 5
    };
    return strengths[m];
  };

  return (
    <div className="studio-shell min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="studio-header border-b border-border/70 backdrop-blur-md sticky top-0 z-50 bg-background/90">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="studio-mark p-2 rounded-lg bg-primary/10 text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{t.title}</h1>
                <p className="text-xs text-muted-foreground">{t.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Author Info */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 border border-border">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{t.author}</span>
              </div>
              
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="hidden sm:block w-4 h-4 text-muted-foreground" />
                <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                  <SelectTrigger className="w-[140px] sm:w-[164px] h-9 bg-background/70">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">🇻🇳 Tiếng Việt</SelectItem>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="zh">🇨🇳 中文</SelectItem>
                    <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                    <SelectItem value="ko">🇰🇷 한국어</SelectItem>
                    <SelectItem value="es">🇪🇸 Español</SelectItem>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Author Mobile */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-4 px-3 py-2 rounded-full bg-card/80 border border-border">
          <User className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{t.author}</span>
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Lock, label: t.highSecurity, color: "text-primary" },
            { icon: Zap, label: t.fastProcessing, color: "text-secondary" },
            { icon: Code, label: t.manyAlgorithms, color: "text-accent" },
            { icon: FileCode, label: t.tampermonkeySupport, color: "text-destructive" },
          ].map((feature, i) => (
            <Card key={i} className="studio-card bg-card/80 backdrop-blur border-border/70 hover:border-primary/40 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-sm font-medium text-foreground">{feature.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="studio-card bg-card/90 backdrop-blur border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Code className="w-5 h-5 text-primary" />
                {t.sourceCode}
              </CardTitle>
              <CardDescription>{t.enterCode}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={t.placeholder}
                className="min-h-[300px] font-mono text-sm bg-muted/50 border-border resize-none"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              
              {/* Tampermonkey Options */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tampermonkey" className="flex items-center gap-2 cursor-pointer">
                    <FileCode className="w-4 h-4 text-muted-foreground" />
                    <span>{t.addTampermonkeyHeader}</span>
                  </Label>
                  <Switch
                    id="tampermonkey"
                    checked={includeTampermonkey}
                    onCheckedChange={setIncludeTampermonkey}
                  />
                </div>
                
                {includeTampermonkey && (
                  <div className="space-y-3 pt-2 border-t border-border/50">
                    <div className="space-y-2">
                      <Label htmlFor="scriptName" className="text-xs text-muted-foreground">{t.scriptName}</Label>
                      <Input
                        id="scriptName"
                        value={scriptName}
                        onChange={(e) => setScriptName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scriptDesc" className="text-xs text-muted-foreground">{t.description}</Label>
                      <Input
                        id="scriptDesc"
                        value={scriptDescription}
                        onChange={(e) => setScriptDescription(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="matchPattern" className="text-xs text-muted-foreground">{t.matchPattern}</Label>
                      <Input
                        id="matchPattern"
                        value={matchPattern}
                        onChange={(e) => setMatchPattern(e.target.value)}
                        placeholder="*://*/*"
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="studio-card bg-card/90 backdrop-blur border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                {t.result}
              </CardTitle>
              <CardDescription>{t.protectedCode}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                readOnly
                placeholder={t.resultPlaceholder}
                className="min-h-[300px] font-mono text-sm bg-muted/50 border-border resize-none"
                value={outputCode}
              />
              
              {outputCode && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-sm text-muted-foreground">
                    {t.length}: <span className="font-mono text-foreground">{outputCode.length}</span> {t.characters}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    <Copy className="w-4 h-4" />
                    {t.copy}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Method Selection & Actions */}
        <Card className="studio-card mt-6 bg-card/90 backdrop-blur border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Wand2 className="w-5 h-5 text-primary" />
              {t.obfuscationMethod}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="combined" onValueChange={(v) => setMethod(v as ObfuscationMethod)}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto gap-2 bg-transparent">
                {allMethods.slice(0, 7).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex flex-col gap-1 h-auto py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <span className="font-medium text-xs">{t.methods[key].name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < getMethodStrength(key) ? "bg-current" : "bg-current/20"
                          }`}
                        />
                      ))}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto gap-2 bg-transparent mt-2">
                {allMethods.slice(7).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex flex-col gap-1 h-auto py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <span className="font-medium text-xs">{t.methods[key].name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < getMethodStrength(key) ? "bg-current" : "bg-current/20"
                          }`}
                        />
                      ))}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{t.methods[method].name}:</span>{" "}
                  {t.methods[method].desc}
                </p>
              </div>
            </Tabs>

            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleObfuscate}
                className="flex-1 gap-2"
                size="lg"
              >
                <Shield className="w-5 h-5" />
                {t.obfuscateNow}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="lg"
              >
                {t.clearAll}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Protection Options */}
        <Card className="studio-card mt-6 bg-card/90 backdrop-blur border-border/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Settings2 className="w-5 h-5 text-primary" />
              {t.protectionOptions}
            </CardTitle>
            <CardDescription>{t.advancedProtection}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full space-y-2">
              {/* Boolean Literal Replacement */}
              <AccordionItem value="boolean" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.booleanReplacement}</span>
                    <Switch
                      checked={protectionOptions.booleanLiteralReplacement}
                      onCheckedChange={(v) => updateProtection('booleanLiteralReplacement', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.randomize}</Label>
                    <Switch
                      checked={protectionOptions.booleanRandomize}
                      onCheckedChange={(v) => updateProtection('booleanRandomize', v)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Integer Literal Replacement */}
              <AccordionItem value="integer" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.integerReplacement}</span>
                    <Switch
                      checked={protectionOptions.integerLiteralReplacement}
                      onCheckedChange={(v) => updateProtection('integerLiteralReplacement', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.randomize}</Label>
                    <Switch
                      checked={protectionOptions.integerRandomize}
                      onCheckedChange={(v) => updateProtection('integerRandomize', v)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.radix}</Label>
                    <Select value={protectionOptions.integerRadix} onValueChange={(v: any) => updateProtection('integerRadix', v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t.radixNone}</SelectItem>
                        <SelectItem value="binary">{t.radixBinary}</SelectItem>
                        <SelectItem value="decimal">{t.radixDecimal}</SelectItem>
                        <SelectItem value="hexadecimal">{t.radixHex}</SelectItem>
                        <SelectItem value="octal">{t.radixOctal}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">{t.lowValue}</Label>
                      <Input
                        type="number"
                        value={protectionOptions.integerLower}
                        onChange={(e) => updateProtection('integerLower', parseInt(e.target.value) || 0)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">{t.highValue}</Label>
                      <Input
                        type="number"
                        value={protectionOptions.integerUpper}
                        onChange={(e) => updateProtection('integerUpper', parseInt(e.target.value) || 100)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Code Transformations */}
              <AccordionItem value="transformations" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span>{t.codeTransformations}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.debuggerRemoval}</Label>
                    <Switch
                      checked={protectionOptions.debuggerRemoval}
                      onCheckedChange={(v) => updateProtection('debuggerRemoval', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.stringExtraction}</Label>
                    <Switch
                      checked={protectionOptions.stringExtraction}
                      onCheckedChange={(v) => updateProtection('stringExtraction', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.propertyIndirection}</Label>
                    <Switch
                      checked={protectionOptions.propertyIndirection}
                      onCheckedChange={(v) => updateProtection('propertyIndirection', v)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Name Mangling */}
              <AccordionItem value="mangling" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.localNameMangling}</span>
                    <Switch
                      checked={protectionOptions.localNameMangling}
                      onCheckedChange={(v) => updateProtection('localNameMangling', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.manglingType}</Label>
                    <Select value={protectionOptions.manglingType} onValueChange={(v: any) => updateProtection('manglingType', v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sequential">{t.sequential}</SelectItem>
                        <SelectItem value="hexadecimal">{t.hexadecimal}</SelectItem>
                        <SelectItem value="base52">Base52</SelectItem>
                        <SelectItem value="base62">Base62</SelectItem>
                        <SelectItem value="runic">Runic</SelectItem>
                        <SelectItem value="glagolitic">Glagolitic</SelectItem>
                        <SelectItem value="tifinagh">Tifinagh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Control Flow */}
              <AccordionItem value="controlflow" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.controlFlowProtection}</span>
                    <Switch
                      checked={protectionOptions.controlFlowProtection}
                      onCheckedChange={(v) => updateProtection('controlFlowProtection', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.randomize}</Label>
                    <Switch
                      checked={protectionOptions.controlFlowRandomize}
                      onCheckedChange={(v) => updateProtection('controlFlowRandomize', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.constantArgObfuscation}</Label>
                    <Switch
                      checked={protectionOptions.constantArgumentObfuscation}
                      onCheckedChange={(v) => updateProtection('constantArgumentObfuscation', v)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Domain Lock */}
              <AccordionItem value="domain" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.domainLock}</span>
                    <Switch
                      checked={protectionOptions.domainLock}
                      onCheckedChange={(v) => updateProtection('domainLock', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.domainPattern}</Label>
                    <Input
                      value={protectionOptions.domainPattern}
                      onChange={(e) => updateProtection('domainPattern', e.target.value)}
                      placeholder="example.com, *.example.com"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.errorScript}</Label>
                    <Textarea
                      value={protectionOptions.domainErrorScript}
                      onChange={(e) => updateProtection('domainErrorScript', e.target.value)}
                      placeholder="alert('Unauthorized domain!');"
                      className="bg-background/50 min-h-[60px]"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Function Reordering */}
              <AccordionItem value="function" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.functionReordering}</span>
                    <Switch
                      checked={protectionOptions.functionReordering}
                      onCheckedChange={(v) => updateProtection('functionReordering', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.randomize}</Label>
                    <Switch
                      checked={protectionOptions.functionRandomize}
                      onCheckedChange={(v) => updateProtection('functionRandomize', v)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Advanced Obfuscation */}
              <AccordionItem value="advanced" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span>{t.advancedObfuscation}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.propertySparsing}</Label>
                    <Switch
                      checked={protectionOptions.propertySparsing}
                      onCheckedChange={(v) => updateProtection('propertySparsing', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.variableGrouping}</Label>
                    <Switch
                      checked={protectionOptions.variableGrouping}
                      onCheckedChange={(v) => updateProtection('variableGrouping', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.expressionSequence}</Label>
                    <Switch
                      checked={protectionOptions.expressionSequence}
                      onCheckedChange={(v) => updateProtection('expressionSequence', v)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Self-Defending */}
              <AccordionItem value="selfdefending" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.selfDefending}</span>
                    <Switch
                      checked={protectionOptions.selfDefending}
                      onCheckedChange={(v) => updateProtection('selfDefending', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.level}: {protectionOptions.selfDefendingLevel}</Label>
                    <Slider
                      value={[protectionOptions.selfDefendingLevel]}
                      onValueChange={(v) => updateProtection('selfDefendingLevel', v[0])}
                      min={1}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.errorScript}</Label>
                    <Textarea
                      value={protectionOptions.selfDefendingErrorScript}
                      onChange={(e) => updateProtection('selfDefendingErrorScript', e.target.value)}
                      placeholder="while(true){}"
                      className="bg-background/50 min-h-[60px]"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Date Lock */}
              <AccordionItem value="datelock" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.dateLock}</span>
                    <Switch
                      checked={protectionOptions.dateLock}
                      onCheckedChange={(v) => updateProtection('dateLock', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">{t.startDate}</Label>
                      <Input
                        type="date"
                        value={protectionOptions.startDate}
                        onChange={(e) => updateProtection('startDate', e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">{t.endDate}</Label>
                      <Input
                        type="date"
                        value={protectionOptions.endDate}
                        onChange={(e) => updateProtection('endDate', e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.errorScript}</Label>
                    <Textarea
                      value={protectionOptions.dateErrorScript}
                      onChange={(e) => updateProtection('dateErrorScript', e.target.value)}
                      placeholder="alert('Script expired!');"
                      className="bg-background/50 min-h-[60px]"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Console & DevTools */}
              <AccordionItem value="console" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span>{t.consoleDevTools}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-muted-foreground">{t.consoleCloaking}</Label>
                      <Switch
                        checked={protectionOptions.consoleCloaking}
                        onCheckedChange={(v) => updateProtection('consoleCloaking', v)}
                      />
                    </div>
                    {protectionOptions.consoleCloaking && (
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">{t.exclude}</Label>
                        <Input
                          value={protectionOptions.consoleCloakingExclude}
                          onChange={(e) => updateProtection('consoleCloakingExclude', e.target.value)}
                          placeholder="log, warn"
                          className="bg-background/50"
                        />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-muted-foreground">{t.devToolsBlocking}</Label>
                      <Switch
                        checked={protectionOptions.devToolsBlocking}
                        onCheckedChange={(v) => updateProtection('devToolsBlocking', v)}
                      />
                    </div>
                    {protectionOptions.devToolsBlocking && (
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">{t.patience} ({t.seconds}): {protectionOptions.devToolsPatience}</Label>
                        <Slider
                          value={[protectionOptions.devToolsPatience]}
                          onValueChange={(v) => updateProtection('devToolsPatience', v[0])}
                          min={1}
                          max={30}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Global Object Hiding */}
              <AccordionItem value="global" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>{t.globalObjectHiding}</span>
                    <Switch
                      checked={protectionOptions.globalObjectHiding}
                      onCheckedChange={(v) => updateProtection('globalObjectHiding', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">{t.usePredefined}</Label>
                    <Switch
                      checked={protectionOptions.globalUsePredefined}
                      onCheckedChange={(v) => updateProtection('globalUsePredefined', v)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.include}</Label>
                    <Input
                      value={protectionOptions.globalInclude}
                      onChange={(e) => updateProtection('globalInclude', e.target.value)}
                      placeholder="myGlobal, anotherGlobal"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t.exclude}</Label>
                    <Input
                      value={protectionOptions.globalExclude}
                      onChange={(e) => updateProtection('globalExclude', e.target.value)}
                      placeholder="jQuery, $"
                      className="bg-background/50"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* NEW: Advanced Security Options */}
              <AccordionItem value="newprotection" className="border border-primary/30 rounded-lg px-4 bg-primary/5">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-primary font-medium">{protectionHeading[language]}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">{t.antiDebugging}</Label>
                      <p className="text-xs text-muted-foreground">{t.antiDebuggingDesc}</p>
                    </div>
                    <Switch
                      checked={protectionOptions.antiDebugging}
                      onCheckedChange={(v) => updateProtection('antiDebugging', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">{t.codeIntegrity}</Label>
                      <p className="text-xs text-muted-foreground">{t.codeIntegrityDesc}</p>
                    </div>
                    <Switch
                      checked={protectionOptions.codeIntegrity}
                      onCheckedChange={(v) => updateProtection('codeIntegrity', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">{t.memoryProtection}</Label>
                      <p className="text-xs text-muted-foreground">{t.memoryProtectionDesc}</p>
                    </div>
                    <Switch
                      checked={protectionOptions.memoryProtection}
                      onCheckedChange={(v) => updateProtection('memoryProtection', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">{t.antiTampering}</Label>
                      <p className="text-xs text-muted-foreground">{t.antiTamperingDesc}</p>
                    </div>
                    <Switch
                      checked={protectionOptions.antiTampering}
                      onCheckedChange={(v) => updateProtection('antiTampering', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">{t.stackTraceHiding}</Label>
                      <p className="text-xs text-muted-foreground">{t.stackTraceHidingDesc}</p>
                    </div>
                    <Switch
                      checked={protectionOptions.stackTraceHiding}
                      onCheckedChange={(v) => updateProtection('stackTraceHiding', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">{t.proxyTrap}</Label>
                      <p className="text-xs text-muted-foreground">{t.proxyTrapDesc}</p>
                    </div>
                    <Switch
                      checked={protectionOptions.proxyTrap}
                      onCheckedChange={(v) => updateProtection('proxyTrap', v)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="studio-card bg-card/80 border-border/70">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">{t.howToUse}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{t.step1}</p>
              <p>{t.step2}</p>
              <p>{t.step3}</p>
              <p>{t.step4}</p>
            </CardContent>
          </Card>
          
          <Card className="studio-card bg-card/80 border-border/70">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">{t.importantNotes}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{t.note1}</p>
              <p>{t.note2}</p>
              <p>{t.note3}</p>
              <p>{t.note4}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>{t.footerText}</p>
          <p className="mt-2 text-primary font-medium">{t.author}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
