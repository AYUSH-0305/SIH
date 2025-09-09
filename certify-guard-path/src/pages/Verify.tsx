import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { 
  Upload, 
  FileText, 
  Scan,
  ArrowLeft,
  X,
  ArrowDown
} from "lucide-react";

export default function Verify() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [simulateTampering, setSimulateTampering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDemoMode = searchParams.get('demo') === 'true';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      // Store file data in session for the analysis page
      sessionStorage.setItem('verificationFile', selectedFile.name);
      if (simulateTampering) {
        sessionStorage.setItem('simulateTampering', 'true');
      }
      navigate('/analysis');
    }
  };

  const handleQRScan = () => {
    if (simulateTampering) {
      sessionStorage.setItem('simulateTampering', 'true');
    }
    navigate('/qr-scan');
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Demo Mode Instructions */}
        {isDemoMode && (
          <Card className="p-6 bg-blockchain/10 border-blockchain/20 mb-8">
            <div className="flex items-start space-x-3">
              <ArrowDown className="h-5 w-5 text-blockchain mt-1 flex-shrink-0" />
              <div>
                <p className="text-foreground font-medium mb-2">
                  You are now acting as an employer. The certificate you just issued is ready to be verified.
                </p>
                <p className="text-muted-foreground text-sm">
                  Click the button below to simulate scanning its QR code and see instant blockchain verification in action.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Certificate Verification
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your certificate or scan a QR code for instant verification
          </p>
        </div>

        <div className="space-y-8">
          {/* File Upload Section */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6 text-center">Upload Certificate Document</h2>
            
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                isDragging 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/30 hover:border-primary/50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <span className="text-lg font-medium">{selectedFile.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFile}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-foreground mb-2">
                      Drag & Drop a Scanned Certificate Here
                    </p>
                    <p className="text-muted-foreground">
                      or click to browse (PDF, JPG, PNG up to 10MB)
                    </p>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
              
              {!selectedFile && (
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-6"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </Button>
              )}
            </div>
            
            <div className="mt-6 text-center space-y-4">
              {/* Demo Mode Toggle for Upload */}
              {isDemoMode && (
                <div className="flex items-center justify-center space-x-2 p-4 bg-muted/30 rounded-lg">
                  <Switch 
                    id="simulate-tampering-upload" 
                    checked={simulateTampering}
                    onCheckedChange={setSimulateTampering}
                  />
                  <Label htmlFor="simulate-tampering-upload" className="text-sm">
                    Simulate Tampering
                  </Label>
                </div>
              )}
              
              <Button
                variant="verify"
                size="lg"
                disabled={!selectedFile}
                onClick={handleAnalyze}
                className="min-w-[200px]"
              >
                Analyze Certificate
              </Button>
            </div>
          </Card>

          {/* OR Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-6 text-muted-foreground font-medium">OR</span>
            </div>
          </div>

          {/* QR Code Section */}
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-6">Digital Certificate with QR Code</h2>
            <div className="space-y-6">
              <Scan className="h-16 w-16 text-blockchain mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Modern Digital Certificates
                </h3>
                <p className="text-muted-foreground mb-6">
                  For certificates with embedded QR codes - instant blockchain verification
                </p>
              </div>
              
              {/* Demo Mode Toggle */}
              {isDemoMode && (
                <div className="flex items-center justify-center space-x-2 mb-4 p-4 bg-muted/30 rounded-lg">
                  <Switch 
                    id="simulate-tampering" 
                    checked={simulateTampering}
                    onCheckedChange={setSimulateTampering}
                  />
                  <Label htmlFor="simulate-tampering" className="text-sm">
                    Simulate Tampering
                  </Label>
                </div>
              )}
              
              <Button
                variant="blockchain"
                size="lg"
                className="min-w-[200px]"
                onClick={handleQRScan}
              >
                Scan QR Code {isDemoMode ? 'to Verify' : 'for Digital Certificate'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 Your documents are processed securely and never stored on our servers
          </p>
        </div>
      </div>
    </div>
  );
}