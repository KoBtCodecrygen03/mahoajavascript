import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { obfuscateCode, generateTampermonkeyHeader, type ObfuscationMethod } from "@/lib/obfuscator";
import { Copy, Shield, Code, Zap, Lock, FileCode, Wand2 } from "lucide-react";

const Index = () => {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [method, setMethod] = useState<ObfuscationMethod>("combined");
  const [includeTampermonkey, setIncludeTampermonkey] = useState(false);
  const [scriptName, setScriptName] = useState("My Script");
  const [scriptDescription, setScriptDescription] = useState("A Tampermonkey script");
  const [matchPattern, setMatchPattern] = useState("*://*/*");

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
