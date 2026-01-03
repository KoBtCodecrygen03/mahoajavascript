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
import { obfuscateCode, generateTampermonkeyHeader, type ObfuscationMethod } from "@/lib/obfuscator";
import { Copy, Shield, Code, Zap, Lock, FileCode, Wand2, Settings2, ChevronDown } from "lucide-react";

interface ProtectionOptions {
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

  const updateProtection = <K extends keyof ProtectionOptions>(key: K, value: ProtectionOptions[K]) => {
    setProtectionOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleObfuscate = () => {
    if (!inputCode.trim()) {
      toast.error("Vui lòng nhập mã JavaScript!");
      return;
    }

    try {
      let result = obfuscateCode(inputCode, method);
      
      if (includeTampermonkey) {
        const header = generateTampermonkeyHeader(scriptName, scriptDescription, matchPattern);
        result = header + result;
      }
      
      setOutputCode(result);
      toast.success("Mã hóa thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi mã hóa!");
    }
  };

  const handleCopy = async () => {
    if (!outputCode) {
      toast.error("Chưa có mã để sao chép!");
      return;
    }
    
    await navigator.clipboard.writeText(outputCode);
    toast.success("Đã sao chép vào clipboard!");
  };

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
    toast.info("Đã xóa tất cả!");
  };

  const methodDescriptions: Record<ObfuscationMethod, { name: string; desc: string; strength: number }> = {
    base64: { name: "Base64", desc: "Mã hóa cơ bản với Base64", strength: 1 },
    unicode: { name: "Unicode Escape", desc: "Chuyển đổi sang mã Unicode", strength: 2 },
    hex: { name: "Hexadecimal", desc: "Mã hóa thành chuỗi Hex", strength: 2 },
    charCode: { name: "CharCode Array", desc: "Chuyển thành mảng charCode", strength: 2 },
    jsfuck: { name: "JSFuck Style", desc: "Mã hóa kiểu JSFuck phức tạp", strength: 4 },
    aaencode: { name: "AAEncode Style", desc: "Mã hóa với ký tự đặc biệt", strength: 3 },
    combined: { name: "Multi-Layer", desc: "Nhiều lớp mã hóa kết hợp (mạnh nhất)", strength: 5 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">JS Obfuscator</h1>
              <p className="text-xs text-muted-foreground">Mã hóa JavaScript & Tampermonkey</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Features Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Lock, label: "Bảo mật cao", color: "text-emerald-500" },
            { icon: Zap, label: "Xử lý nhanh", color: "text-amber-500" },
            { icon: Code, label: "Nhiều thuật toán", color: "text-blue-500" },
            { icon: FileCode, label: "Hỗ trợ Tampermonkey", color: "text-purple-500" },
          ].map((feature, i) => (
            <Card key={i} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex items-center gap-3">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-sm font-medium text-foreground">{feature.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Code className="w-5 h-5 text-primary" />
                Mã nguồn JavaScript
              </CardTitle>
              <CardDescription>Nhập mã JavaScript cần mã hóa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={`// Nhập mã JavaScript của bạn ở đây
console.log("Hello World!");

function myFunction() {
  // Your code here
}`}
                className="min-h-[300px] font-mono text-sm bg-muted/50 border-border resize-none"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              
              {/* Tampermonkey Options */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tampermonkey" className="flex items-center gap-2 cursor-pointer">
                    <FileCode className="w-4 h-4 text-muted-foreground" />
                    <span>Thêm header Tampermonkey</span>
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
                      <Label htmlFor="scriptName" className="text-xs text-muted-foreground">Tên Script</Label>
                      <Input
                        id="scriptName"
                        value={scriptName}
                        onChange={(e) => setScriptName(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scriptDesc" className="text-xs text-muted-foreground">Mô tả</Label>
                      <Input
                        id="scriptDesc"
                        value={scriptDescription}
                        onChange={(e) => setScriptDescription(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="matchPattern" className="text-xs text-muted-foreground">Match Pattern</Label>
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
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                Kết quả mã hóa
              </CardTitle>
              <CardDescription>Mã đã được bảo vệ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                readOnly
                placeholder="Kết quả mã hóa sẽ xuất hiện ở đây..."
                className="min-h-[300px] font-mono text-sm bg-muted/50 border-border resize-none"
                value={outputCode}
              />
              
              {outputCode && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-sm text-muted-foreground">
                    Độ dài: <span className="font-mono text-foreground">{outputCode.length}</span> ký tự
                  </span>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    <Copy className="w-4 h-4" />
                    Sao chép
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Method Selection & Actions */}
        <Card className="mt-6 bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Wand2 className="w-5 h-5 text-primary" />
              Phương pháp mã hóa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="combined" onValueChange={(v) => setMethod(v as ObfuscationMethod)}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto gap-2 bg-transparent">
                {Object.entries(methodDescriptions).map(([key, value]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex flex-col gap-1 h-auto py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <span className="font-medium text-xs">{value.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < value.strength ? "bg-current" : "bg-current/20"
                          }`}
                        />
                      ))}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{methodDescriptions[method].name}:</span>{" "}
                  {methodDescriptions[method].desc}
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
                Mã hóa ngay
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="lg"
              >
                Xóa tất cả
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Protection Options */}
        <Card className="mt-6 bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Settings2 className="w-5 h-5 text-primary" />
              Tùy chọn bảo vệ
            </CardTitle>
            <CardDescription>Cấu hình các tùy chọn bảo vệ nâng cao</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full space-y-2">
              {/* Boolean Literal Replacement */}
              <AccordionItem value="boolean" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>Thay thế Boolean Literal</span>
                    <Switch
                      checked={protectionOptions.booleanLiteralReplacement}
                      onCheckedChange={(v) => updateProtection('booleanLiteralReplacement', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Ngẫu nhiên hóa</Label>
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
                    <span>Thay thế Integer Literal</span>
                    <Switch
                      checked={protectionOptions.integerLiteralReplacement}
                      onCheckedChange={(v) => updateProtection('integerLiteralReplacement', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Ngẫu nhiên hóa</Label>
                    <Switch
                      checked={protectionOptions.integerRandomize}
                      onCheckedChange={(v) => updateProtection('integerRandomize', v)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Cơ số (Radix)</Label>
                    <Select value={protectionOptions.integerRadix} onValueChange={(v: any) => updateProtection('integerRadix', v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Không</SelectItem>
                        <SelectItem value="binary">Nhị phân (Binary)</SelectItem>
                        <SelectItem value="decimal">Thập phân (Decimal)</SelectItem>
                        <SelectItem value="hexadecimal">Thập lục phân (Hexadecimal)</SelectItem>
                        <SelectItem value="octal">Bát phân (Octal)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Giá trị thấp</Label>
                      <Input
                        type="number"
                        value={protectionOptions.integerLower}
                        onChange={(e) => updateProtection('integerLower', parseInt(e.target.value) || 0)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Giá trị cao</Label>
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
                  <span>Biến đổi mã nguồn</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Xóa câu lệnh Debugger</Label>
                    <Switch
                      checked={protectionOptions.debuggerRemoval}
                      onCheckedChange={(v) => updateProtection('debuggerRemoval', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Trích xuất String Literal</Label>
                    <Switch
                      checked={protectionOptions.stringExtraction}
                      onCheckedChange={(v) => updateProtection('stringExtraction', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Chuyển hướng Property</Label>
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
                    <span>Xáo trộn tên biến cục bộ</span>
                    <Switch
                      checked={protectionOptions.localNameMangling}
                      onCheckedChange={(v) => updateProtection('localNameMangling', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Kiểu xáo trộn</Label>
                    <Select value={protectionOptions.manglingType} onValueChange={(v: any) => updateProtection('manglingType', v)}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sequential">Tuần tự (Sequential)</SelectItem>
                        <SelectItem value="hexadecimal">Thập lục phân (Hexadecimal)</SelectItem>
                        <SelectItem value="base52">Base52</SelectItem>
                        <SelectItem value="base62">Base62</SelectItem>
                        <SelectItem value="runic">Chữ Runic</SelectItem>
                        <SelectItem value="glagolitic">Chữ Glagolitic</SelectItem>
                        <SelectItem value="tifinagh">Chữ Tifinagh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Control Flow */}
              <AccordionItem value="controlflow" className="border border-border/50 rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>Bảo vệ luồng điều khiển</span>
                    <Switch
                      checked={protectionOptions.controlFlowProtection}
                      onCheckedChange={(v) => updateProtection('controlFlowProtection', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Ngẫu nhiên hóa</Label>
                    <Switch
                      checked={protectionOptions.controlFlowRandomize}
                      onCheckedChange={(v) => updateProtection('controlFlowRandomize', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Làm rối đối số hằng số</Label>
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
                    <span>Khóa theo tên miền</span>
                    <Switch
                      checked={protectionOptions.domainLock}
                      onCheckedChange={(v) => updateProtection('domainLock', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Mẫu tên miền (Domain Pattern)</Label>
                    <Input
                      value={protectionOptions.domainPattern}
                      onChange={(e) => updateProtection('domainPattern', e.target.value)}
                      placeholder="example.com, *.example.com"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Script lỗi</Label>
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
                    <span>Sắp xếp lại hàm</span>
                    <Switch
                      checked={protectionOptions.functionReordering}
                      onCheckedChange={(v) => updateProtection('functionReordering', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Ngẫu nhiên hóa</Label>
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
                  <span>Làm rối nâng cao</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Property Sparsing</Label>
                    <Switch
                      checked={protectionOptions.propertySparsing}
                      onCheckedChange={(v) => updateProtection('propertySparsing', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Nhóm biến (Variable Grouping)</Label>
                    <Switch
                      checked={protectionOptions.variableGrouping}
                      onCheckedChange={(v) => updateProtection('variableGrouping', v)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Làm rối biểu thức chuỗi</Label>
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
                    <span>Bảo vệ tự thân (Self-Defending)</span>
                    <Switch
                      checked={protectionOptions.selfDefending}
                      onCheckedChange={(v) => updateProtection('selfDefending', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Mức độ: {protectionOptions.selfDefendingLevel}</Label>
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
                    <Label className="text-sm text-muted-foreground">Script lỗi</Label>
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
                    <span>Khóa theo ngày</span>
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
                      <Label className="text-sm text-muted-foreground">Ngày bắt đầu</Label>
                      <Input
                        type="date"
                        value={protectionOptions.startDate}
                        onChange={(e) => updateProtection('startDate', e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Ngày kết thúc</Label>
                      <Input
                        type="date"
                        value={protectionOptions.endDate}
                        onChange={(e) => updateProtection('endDate', e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Script lỗi</Label>
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
                  <span>Console & DevTools</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-muted-foreground">Ẩn Console (Console Cloaking)</Label>
                      <Switch
                        checked={protectionOptions.consoleCloaking}
                        onCheckedChange={(v) => updateProtection('consoleCloaking', v)}
                      />
                    </div>
                    {protectionOptions.consoleCloaking && (
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Loại trừ</Label>
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
                      <Label className="text-sm text-muted-foreground">Chặn DevTools</Label>
                      <Switch
                        checked={protectionOptions.devToolsBlocking}
                        onCheckedChange={(v) => updateProtection('devToolsBlocking', v)}
                      />
                    </div>
                    {protectionOptions.devToolsBlocking && (
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Độ kiên nhẫn (giây): {protectionOptions.devToolsPatience}</Label>
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
                    <span>Ẩn đối tượng toàn cục</span>
                    <Switch
                      checked={protectionOptions.globalObjectHiding}
                      onCheckedChange={(v) => updateProtection('globalObjectHiding', v)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-muted-foreground">Sử dụng định nghĩa sẵn</Label>
                    <Switch
                      checked={protectionOptions.globalUsePredefined}
                      onCheckedChange={(v) => updateProtection('globalUsePredefined', v)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Bao gồm (Include)</Label>
                    <Input
                      value={protectionOptions.globalInclude}
                      onChange={(e) => updateProtection('globalInclude', e.target.value)}
                      placeholder="myGlobal, anotherGlobal"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Loại trừ (Exclude)</Label>
                    <Input
                      value={protectionOptions.globalExclude}
                      onChange={(e) => updateProtection('globalExclude', e.target.value)}
                      placeholder="jQuery, $"
                      className="bg-background/50"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Hướng dẫn sử dụng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>1. Dán mã JavaScript vào ô bên trái</p>
              <p>2. Chọn phương pháp mã hóa phù hợp</p>
              <p>3. Bật tùy chọn Tampermonkey nếu cần</p>
              <p>4. Nhấn "Mã hóa ngay" và sao chép kết quả</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Lưu ý quan trọng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Phương pháp "Multi-Layer" có độ bảo mật cao nhất</p>
              <p>• Mã hóa làm tăng kích thước file</p>
              <p>• Luôn test mã sau khi mã hóa</p>
              <p>• Giữ bản gốc để dễ chỉnh sửa</p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>JS Obfuscator - Công cụ mã hóa JavaScript & Tampermonkey</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
