import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Scan, CheckCircle } from "lucide-react";

export default function QRScan() {
  const [isScanning, setIsScanning] = useState(true);
  const [isDetected, setIsDetected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate QR code detection after 3 seconds
    const timer = setTimeout(() => {
      setIsDetected(true);
      setIsScanning(false);
      
      // After detection message, navigate to results
      setTimeout(() => {
        sessionStorage.setItem('verificationType', 'qr');
        navigate('/results');
      }, 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/verify">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Verification
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            QR Code Scanner
          </h1>
          <p className="text-lg text-muted-foreground">
            Position the QR code within the frame to verify your digital certificate
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            {/* Camera Simulation */}
            <div className="relative bg-muted rounded-lg aspect-video flex items-center justify-center mb-6">
              <div className="absolute inset-4 border-2 border-primary border-dashed rounded-lg"></div>
              
              {isScanning && (
                <div className="text-center space-y-4">
                  <Scan className="h-16 w-16 text-primary mx-auto verification-animation" />
                  <p className="text-foreground font-medium">
                    Position the QR code inside the frame
                  </p>
                </div>
              )}
              
              {isDetected && (
                <div className="text-center space-y-4 animate-fade-in">
                  <CheckCircle className="h-16 w-16 text-success mx-auto" />
                  <div>
                    <p className="text-success font-semibold text-lg mb-2">
                      QR Code Detected!
                    </p>
                    <p className="text-muted-foreground">
                      Verifying with blockchain network...
                    </p>
                  </div>
                  <div className="w-32 h-1 bg-muted mx-auto rounded-full overflow-hidden">
                    <div className="h-full blockchain-gradient animate-progress"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>📱 Make sure the QR code is clearly visible</p>
                <p>💡 Hold steady for best results</p>
                <p>🔒 Connecting to blockchain verification network</p>
              </div>
              
              {isScanning && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDetected(true);
                    setIsScanning(false);
                    setTimeout(() => {
                      sessionStorage.setItem('verificationType', 'qr');
                      navigate('/results');
                    }, 2000);
                  }}
                >
                  Simulate QR Detection
                </Button>
              )}
            </div>
          </Card>

          <div className="mt-8 text-center">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-2">About QR Verification</h3>
              <p className="text-sm text-muted-foreground">
                QR codes contain cryptographic signatures that are verified against 
                the blockchain ledger, providing tamper-proof certificate validation.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}