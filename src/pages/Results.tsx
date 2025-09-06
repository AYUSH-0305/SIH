import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Shield, 
  ArrowLeft,
  Download,
  Share2,
  Calendar,
  User,
  Building,
  Hash,
  Clock
} from "lucide-react";

type ResultType = 'verified' | 'content-mismatch' | 'visual-anomaly' | 'blockchain-verified';

export default function Results() {
  const navigate = useNavigate();
  const [resultType, setResultType] = useState<ResultType>('verified');

  useEffect(() => {
    const verificationType = sessionStorage.getItem('verificationType');
    const savedResult = sessionStorage.getItem('verificationResult');
    
    if (verificationType === 'qr') {
      setResultType('blockchain-verified');
    } else if (savedResult) {
      setResultType(savedResult as ResultType);
    } else {
      navigate('/verify');
    }
  }, [navigate]);

  const getResultConfig = () => {
    switch (resultType) {
      case 'verified':
        return {
          icon: <CheckCircle className="h-16 w-16 text-success" />,
          title: "Certificate Verified ✓",
          subtitle: "This certificate is authentic and valid",
          bgColor: "bg-success-light",
          borderColor: "border-success"
        };
      case 'content-mismatch':
        return {
          icon: <XCircle className="h-16 w-16 text-destructive" />,
          title: "Fake Certificate Detected",
          subtitle: "Content mismatch found in university records",
          bgColor: "bg-destructive-light",
          borderColor: "border-destructive"
        };
      case 'visual-anomaly':
        return {
          icon: <AlertTriangle className="h-16 w-16 text-destructive" />,
          title: "Fake Certificate Detected",
          subtitle: "Visual tampering detected in document",
          bgColor: "bg-destructive-light",
          borderColor: "border-destructive"
        };
      case 'blockchain-verified':
        return {
          icon: <Shield className="h-16 w-16 text-blockchain" />,
          title: "Blockchain Verified ⛓️",
          subtitle: "Certificate verified through blockchain network",
          bgColor: "bg-blockchain-light",
          borderColor: "border-blockchain"
        };
    }
  };

  const config = getResultConfig();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/verify">
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Verification
            </Link>
          </Button>
        </div>

        {/* Result Banner */}
        <Card className={`p-8 ${config.bgColor} ${config.borderColor} border-2 mb-8`}>
          <div className="text-center space-y-4">
            {config.icon}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {config.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {config.subtitle}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certificate Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Certificate Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Student Name:</span>
                <span className="font-medium">Priya Sharma</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Degree:</span>
                <span className="font-medium">Bachelor of Technology</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Institution:</span>
                <span className="font-medium">Ranchi University</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Graduation Year:</span>
                <span className="font-medium">2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Certificate ID:</span>
                <span className="font-medium font-mono">RU-2023-CSE-1247</span>
              </div>
            </div>
          </Card>

          {/* Verification Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Verification Details</h2>
            
            {resultType === 'verified' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Document integrity verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">University records match</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Visual analysis passed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Security features validated</span>
                </div>
              </div>
            )}

            {resultType === 'content-mismatch' && (
              <div className="space-y-4">
                <div className="bg-destructive-light p-4 rounded-lg">
                  <h3 className="font-semibold text-destructive mb-3">Data Mismatch Detected</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Certificate Name:</span>
                      <span className="text-destructive">Jane Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span>University Record:</span>
                      <span className="text-success">John Doe</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  The name on the certificate does not match university enrollment records.
                </p>
              </div>
            )}

            {resultType === 'visual-anomaly' && (
              <div className="space-y-4">
                <div className="bg-destructive-light p-4 rounded-lg">
                  <h3 className="font-semibold text-destructive mb-3">Visual Tampering Detected</h3>
                  <p className="text-sm">
                    Digital forensics analysis found evidence of document manipulation 
                    in the signature area and date fields.
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• Inconsistent font rendering</p>
                  <p>• Digital signature mismatch</p>
                  <p>• Unusual compression artifacts</p>
                </div>
              </div>
            )}

            {resultType === 'blockchain-verified' && (
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-blockchain-light text-blockchain">
                  Blockchain Network: Ethereum
                </Badge>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Hash:</span>
                    <span className="font-mono text-xs">0x1a2b3c4d5e6f...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block Number:</span>
                    <span className="font-mono">#18,945,672</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span>2024-03-15 14:22:33 UTC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gas Used:</span>
                    <span>21,000</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blockchain-light rounded-lg">
                  <p className="text-xs text-blockchain">
                    This certificate was issued with cryptographic proof and is 
                    immutably recorded on the blockchain ledger.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Verification Timeline */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Verification Timeline
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Document uploaded and analysis initiated - 14:20:15
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Visual integrity check completed - 14:20:18
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                University database verification completed - 14:20:22
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">
                Final verification report generated - 14:20:25
              </span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="mt-8 text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/verify">Verify Another Certificate</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}