import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { Hash, ArrowRight, CheckCircle, X } from "lucide-react";

export default function DemoMerkleVerification() {
  const [simulateTampering, setSimulateTampering] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 1500);
    const timer2 = setTimeout(() => setCurrentStep(2), 3000);
    const timer3 = setTimeout(() => {
      // Store tampering state for results page
      if (simulateTampering) {
        sessionStorage.setItem('simulateTampering', 'true');
      } else {
        sessionStorage.removeItem('simulateTampering');
      }
      navigate('/demo-results');
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate, simulateTampering]);

  const priyaHash = simulateTampering 
    ? "0xDef123456789abcdef..." 
    : "0xa1b2c3d4e5f6789012...";
  
  const reconstructedHash = simulateTampering
    ? "0xDef1456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    : "0x9c8b7a6541f2e3d4c5b6a7890123456789abcdef0123456789abcdef01234567";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Demo Mode Banner */}
      <div className="bg-blockchain text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-semibold">DEMO MODE: Single Certificate Verification</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Verifying Priya Singh&apos;s Certificate Against the Batch...
          </h1>
          
          {/* Tampering Toggle */}
          <div className="flex items-center justify-center space-x-2 mb-8 p-4 bg-muted/30 rounded-lg max-w-md mx-auto">
            <Switch 
              id="simulate-tampering" 
              checked={simulateTampering}
              onCheckedChange={setSimulateTampering}
            />
            <Label htmlFor="simulate-tampering" className="text-sm">
              Simulate Certificate Tampering
            </Label>
          </div>
        </div>

        <div className="space-y-8">
          {/* Visual Animation */}
          <Card className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Priya's Hash */}
              <div className="text-center">
                <div className={`border-2 rounded-lg p-6 transition-all duration-500 ${
                  currentStep >= 1 
                    ? simulateTampering 
                      ? 'border-destructive bg-destructive/5' 
                      : 'border-primary bg-primary/5'
                    : 'border-muted bg-muted/30'
                }`}>
                  <Hash className={`h-8 w-8 mx-auto mb-3 transition-colors duration-500 ${
                    currentStep >= 1 
                      ? simulateTampering ? 'text-destructive' : 'text-primary'
                      : 'text-muted-foreground'
                  }`} />
                  <div className="text-sm font-medium mb-2">Priya&apos;s Individual Hash</div>
                  <div className="text-xs font-mono break-all">
                    {currentStep >= 1 ? priyaHash : "Loading..."}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="text-center">
                <ArrowRight className={`h-8 w-8 mx-auto transition-colors duration-500 ${
                  currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <div className="text-sm text-muted-foreground mt-2">Combined with</div>
              </div>

              {/* Merkle Proof */}
              <div className="text-center">
                <div className={`border-2 rounded-lg p-6 transition-all duration-500 ${
                  currentStep >= 1 
                    ? 'border-blockchain bg-blockchain/5'
                    : 'border-muted bg-muted/30'
                }`}>
                  <Hash className={`h-8 w-8 mx-auto mb-3 transition-colors duration-500 ${
                    currentStep >= 1 ? 'text-blockchain' : 'text-muted-foreground'
                  }`} />
                  <div className="text-sm font-medium mb-2">Merkle Proof</div>
                  <div className="text-xs font-mono break-all">
                    {currentStep >= 1 ? "0x7f8e9d2c3b4a..." : "Loading..."}
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow Down */}
            {currentStep >= 2 && (
              <div className="text-center mt-8 animate-fade-in">
                <div className="w-px h-8 bg-muted-foreground/30 mx-auto mb-4"></div>
                <div className="text-sm text-muted-foreground mb-4">Produces</div>
                
                {/* Reconstructed Hash */}
                <div className={`border-2 rounded-lg p-6 max-w-md mx-auto transition-all duration-500 ${
                  simulateTampering 
                    ? 'border-destructive bg-destructive/5'
                    : 'border-success bg-success/5'
                }`}>
                  {simulateTampering ? (
                    <X className="h-8 w-8 text-destructive mx-auto mb-3" />
                  ) : (
                    <CheckCircle className="h-8 w-8 text-success mx-auto mb-3" />
                  )}
                  <div className="text-sm font-medium mb-2">Reconstructed Master Hash</div>
                  <div className="text-xs font-mono break-all">
                    {reconstructedHash}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Explanation */}
          <Card className="p-8 bg-muted/30">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              How Merkle Proof Verification Works
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong>Step 1:</strong> We take Priya&apos;s individual certificate hash (her unique digital fingerprint)
              </p>
              <p>
                <strong>Step 2:</strong> We combine it with a small &quot;Merkle Proof&quot; - a compact set of hashes that proves her certificate was part of the original batch
              </p>
              <p>
                <strong>Step 3:</strong> By combining these mathematically, we can reconstruct what the Master Hash should be
              </p>
              <p>
                <strong>Step 4:</strong> We compare this reconstructed hash with the official Master Hash stored on the blockchain
              </p>
              <p className="text-primary font-medium">
                ✨ This process requires only a few hashes instead of checking all 582 certificates!
              </p>
            </div>
          </Card>

          {simulateTampering && (
            <Card className="p-6 bg-destructive/10 border-destructive/20 animate-fade-in">
              <div className="flex items-start space-x-3">
                <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-destructive mb-2">Certificate Tampering Detected</h4>
                  <p className="text-sm text-muted-foreground">
                    The reconstructed Master Hash doesn&apos;t match the official blockchain record, 
                    indicating this certificate has been altered or is fraudulent.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}