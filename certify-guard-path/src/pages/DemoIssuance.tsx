import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { CheckCircle, Clock, Loader2 } from "lucide-react";

export default function DemoIssuance() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleGenerateHash = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowData(true);
    }, 1500);
  };

  const handleIssueOnBlockchain = () => {
    setIsIssuing(true);
    setShowAnimation(true);
    
    setTimeout(() => {
      navigate('/issuance-confirmation');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Demo Mode Banner */}
      <div className="bg-blockchain text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-semibold">DEMO MODE: University Issuance Portal</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Register a New Digital Certificate
          </h1>
          <p className="text-lg text-muted-foreground">
            You are now acting as a university registrar issuing a secure digital certificate
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input 
                  id="studentName" 
                  value="Priya Singh" 
                  readOnly 
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree / Course</Label>
                <Input 
                  id="degree" 
                  value="B.E. Computer Science" 
                  readOnly 
                  className="bg-muted/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="graduationDate">Graduation Date</Label>
              <Input 
                id="graduationDate" 
                value="Sep 8, 2025" 
                readOnly 
                className="bg-muted/50"
              />
            </div>

            {/* Generate Hash Button */}
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleGenerateHash}
                disabled={isGenerating || showData}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Certificate Hash"
                )}
              </Button>
            </div>

            {/* Data Display */}
            {showData && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="certificateData">Certificate Data String:</Label>
                  <Textarea 
                    id="certificateData" 
                    value="Priya Singh | B.E. Computer Science | Sep 8, 2025"
                    readOnly 
                    className="bg-muted/50"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cryptoHash">Cryptographic Hash (Fingerprint):</Label>
                  <Textarea 
                    id="cryptoHash" 
                    value="0xf81eca2c4b8d9e431a7f6c2d8b3e4c9a5f8e7d6c3b2a1f9e8d7c6b5a4f3e2d1c"
                    readOnly 
                    className="bg-muted/50 font-mono text-sm"
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Issue on Blockchain Button */}
            <div className="text-center">
              <Button 
                variant="blockchain" 
                size="xl"
                onClick={handleIssueOnBlockchain}
                disabled={!showData || isIssuing}
                className="min-w-[250px]"
              >
                {isIssuing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Issue on Blockchain"
                )}
              </Button>
            </div>

            {/* Animation Checklist */}
            {showAnimation && (
              <Card className="p-6 bg-muted/30 animate-fade-in">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blockchain" />
                    <span className="text-sm">Calling 'issueCertificate' function...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Waiting for blockchain confirmation...</span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}