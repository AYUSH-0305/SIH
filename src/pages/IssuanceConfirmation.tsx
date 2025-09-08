import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { CheckCircle, ArrowRight, QrCode, Download } from "lucide-react";

export default function IssuanceConfirmation() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Demo Mode Banner */}
      <div className="bg-success text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-semibold">✅ DEMO MODE: Certificate Successfully Issued</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Certificate Successfully Registered on the Blockchain!
          </h1>
          <p className="text-lg text-muted-foreground">
            The digital certificate has been securely recorded and is now tamper-proof
          </p>
        </div>

        <div className="space-y-8">
          {/* Transaction Details */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Transaction Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Transaction Hash</p>
                    <p className="text-sm font-mono bg-muted/50 p-2 rounded">
                      0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Block Number</p>
                    <p className="text-sm font-mono bg-muted/50 p-2 rounded">#18,543,267</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Gas Used</p>
                    <p className="text-sm font-mono bg-muted/50 p-2 rounded">42,156 wei</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Certificate ID</p>
                    <p className="text-sm font-mono bg-muted/50 p-2 rounded">JH-UNIV-PSG-12345</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                    <p className="text-sm font-mono bg-muted/50 p-2 rounded">2025-09-08 14:23:17 IST</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Network</p>
                    <p className="text-sm font-mono bg-muted/50 p-2 rounded">Jharkhand EduChain</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Sample Certificate */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Digital Certificate Preview</h2>
            <div className="bg-gradient-to-br from-primary/5 to-blockchain/5 p-8 rounded-lg border-2 border-dashed border-primary/20">
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold text-foreground">RANCHI UNIVERSITY</div>
                <div className="text-lg text-muted-foreground">Department of Computer Science</div>
                <div className="my-8">
                  <div className="text-xl font-semibold">Bachelor of Engineering</div>
                  <div className="text-lg">in Computer Science</div>
                </div>
                <div className="text-lg">This is to certify that</div>
                <div className="text-2xl font-bold text-primary">PRIYA SINGH</div>
                <div className="text-lg">has successfully completed the requirements</div>
                <div className="text-lg">Graduated: September 8, 2025</div>
                
                {/* QR Code Placeholder */}
                <div className="flex justify-center mt-8">
                  <div className="bg-black p-4 rounded">
                    <QrCode className="h-16 w-16 text-white" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">QR Code for Instant Verification</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            </div>
          </Card>

          {/* Bridge to Next Step */}
          <Card className="p-8 bg-gradient-to-r from-success/10 to-blockchain/10">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Excellent! You have successfully issued a secure certificate as a university registrar.
              </h3>
              <p className="text-muted-foreground mb-6">
                Now let's see how employers can instantly verify this certificate using the blockchain
              </p>
              <Button asChild variant="blockchain" size="xl" className="group">
                <Link to="/verify?demo=true">
                  Step 2: Now, Verify Your Certificate
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}