import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { CheckCircle, X, Hash, Repeat, ArrowLeft } from "lucide-react";

export default function DemoResults() {
  const [isTempered, setIsTempered] = useState(false);

  useEffect(() => {
    const tampering = sessionStorage.getItem('simulateTampering');
    setIsTempered(tampering === 'true');
  }, []);

  const officialMasterHash = "0x9c8b7a6541f2e3d4c5b6a7890123456789abcdef0123456789abcdef01234567";
  const reconstructedHash = isTempered 
    ? "0xDef1456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    : officialMasterHash;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Status Banner */}
      <div className={`py-4 ${isTempered ? 'bg-destructive' : 'bg-success'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            {isTempered ? (
              <>
                <X className="h-5 w-5" />
                <span className="font-semibold">❌ Verification Failed</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">✅ Batch Verification Successful</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="mb-6">
            {isTempered ? (
              <X className="h-16 w-16 text-destructive mx-auto" />
            ) : (
              <CheckCircle className="h-16 w-16 text-success mx-auto" />
            )}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {isTempered 
              ? "Certificate Not Found in Batch"
              : "Certificate is an Authentic Member of the Batch"
            }
          </h1>
          <p className="text-lg text-muted-foreground">
            {isTempered
              ? "The provided certificate's hash could not be proven as a member of the registered batch. The document may be fraudulent."
              : "Priya Singh's certificate has been successfully verified as part of the official batch registered on the blockchain."
            }
          </p>
        </div>

        <div className="space-y-8">
          {/* Certificate Details */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Certificate Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                  <p className="text-lg font-semibold">Priya Singh</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Degree</p>
                  <p className="text-lg">B.E. Computer Science</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Institution</p>
                  <p className="text-lg">Ranchi University</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Graduation Date</p>
                  <p className="text-lg">September 8, 2025</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Batch Size</p>
                  <p className="text-lg">582 certificates</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verification Status</p>
                  <Badge variant={isTempered ? "destructive" : "default"} className="text-sm">
                    {isTempered ? "FAILED" : "VERIFIED"}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Hash Comparison */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Hash className="mr-2 h-5 w-5" />
              Cryptographic Verification
            </h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Reconstructed Master Hash
                </p>
                <div className={`p-4 rounded-lg border-2 font-mono text-sm break-all ${
                  isTempered 
                    ? 'bg-destructive/5 border-destructive/20 text-destructive'
                    : 'bg-success/5 border-success/20 text-success'
                }`}>
                  {reconstructedHash}
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  {isTempered ? (
                    <X className="h-5 w-5 text-destructive" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                  <span className={`font-medium ${
                    isTempered ? 'text-destructive' : 'text-success'
                  }`}>
                    {isTempered ? 'MISMATCH' : 'MATCH'}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Official Master Hash (from Blockchain)
                </p>
                <div className="p-4 rounded-lg border-2 bg-primary/5 border-primary/20 font-mono text-sm text-primary break-all">
                  {officialMasterHash}
                </div>
              </div>
            </div>
          </Card>

          {/* Blockchain Details */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Blockchain Transaction Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Transaction Hash</p>
                  <p className="text-xs font-mono bg-muted/50 p-2 rounded break-all">
                    0x1a2b3c4d5e6f789012345678901234567890abcdef1234567890abcdef123456
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Block Number</p>
                  <p className="text-sm font-mono bg-muted/50 p-2 rounded">#18,543,291</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Network</p>
                  <p className="text-sm font-mono bg-muted/50 p-2 rounded">Jharkhand EduChain</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified At</p>
                  <p className="text-sm font-mono bg-muted/50 p-2 rounded">
                    {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/demo-bulk-upload">
                  <Repeat className="mr-2 h-4 w-4" />
                  Try Demo Again
                </Link>
              </Button>
              <Button asChild variant="hero" size="lg">
                <Link to="/verify">
                  Verify Real Certificate
                </Link>
              </Button>
            </div>
          </div>

          {/* Demo Complete Message */}
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-blockchain/10 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              🎉 Demo Complete!
            </h3>
            <p className="text-muted-foreground mb-6">
              You&apos;ve successfully experienced how DigiVerify uses advanced Merkle Tree technology 
              to batch thousands of certificates efficiently while maintaining individual verification capabilities.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-white/50 rounded">
                <div className="font-semibold text-primary">582 Certificates</div>
                <div className="text-muted-foreground">Secured in 1 transaction</div>
              </div>
              <div className="p-3 bg-white/50 rounded">
                <div className="font-semibold text-success">99.8% Savings</div>
                <div className="text-muted-foreground">vs individual transactions</div>
              </div>
              <div className="p-3 bg-white/50 rounded">
                <div className="font-semibold text-blockchain">Instant</div>
                <div className="text-muted-foreground">Individual verification</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}