import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { CheckCircle, Hash, TreePine } from "lucide-react";

export default function DemoMerkleGeneration() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const students = [
    "Priya Singh", "Rohan Gupta", "Aarav Sharma", "Ananya Patel", 
    "Vikram Kumar", "Sneha Das", "Arjun Mishra", "Kavya Reddy"
  ];

  const steps = [
    "Hashing 582 individual certificates...",
    "Combining hashes into a secure Merkle Tree...",
    "Creating a single, tamper-proof 'Master Hash' for the entire batch..."
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 2000);
    const timer2 = setTimeout(() => setCurrentStep(2), 4000);
    const timer3 = setTimeout(() => {
      navigate('/demo-batch-confirmation');
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Demo Mode Banner */}
      <div className="bg-blockchain text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-semibold">DEMO MODE: Processing Bulk Certificates</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Processing Batch & Generating Master Hash...
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Visual Animation Side */}
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sample Graduate Names</h3>
              <div className="grid grid-cols-2 gap-2">
                {students.map((student, index) => (
                  <div 
                    key={index}
                    className={`p-2 text-sm rounded transition-all duration-500 ${
                      currentStep >= 1 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    {student}
                  </div>
                ))}
                <div className="col-span-2 text-center text-muted-foreground text-sm mt-2">
                  ... and 574 more graduates
                </div>
              </div>
            </Card>

            {/* Individual Hashes */}
            {currentStep >= 1 && (
              <Card className="p-6 animate-fade-in">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Hash className="mr-2 h-5 w-5 text-primary" />
                  Individual Digital Fingerprints
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 bg-muted/50 rounded">0xa1b2c3d4...</div>
                  <div className="p-2 bg-muted/50 rounded">0xe5f6g7h8...</div>
                  <div className="p-2 bg-muted/50 rounded">0xi9j0k1l2...</div>
                  <div className="text-center text-muted-foreground">... 579 more hashes</div>
                </div>
              </Card>
            )}

            {/* Merkle Tree Visual */}
            {currentStep >= 2 && (
              <Card className="p-6 animate-fade-in">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TreePine className="mr-2 h-5 w-5 text-success" />
                  Merkle Tree Structure
                </h3>
                <div className="text-center space-y-4">
                  {/* Master Hash */}
                  <div className="bg-success/20 border-2 border-success/40 rounded-lg p-3">
                    <div className="text-sm font-medium text-success">Master Hash</div>
                    <div className="text-xs font-mono mt-1">0x9c8b7a65...</div>
                  </div>
                  
                  {/* Tree Branches */}
                  <div className="flex justify-center">
                    <div className="w-px h-8 bg-muted-foreground/30"></div>
                  </div>
                  
                  {/* Level 2 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 border border-primary/20 rounded p-2">
                      <div className="text-xs font-mono">0x2f1e3d...</div>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded p-2">
                      <div className="text-xs font-mono">0x8g7f5e...</div>
                    </div>
                  </div>
                  
                  {/* Tree Branches */}
                  <div className="flex justify-center space-x-8">
                    <div className="w-px h-4 bg-muted-foreground/30"></div>
                    <div className="w-px h-4 bg-muted-foreground/30"></div>
                    <div className="w-px h-4 bg-muted-foreground/30"></div>
                    <div className="w-px h-4 bg-muted-foreground/30"></div>
                  </div>
                  
                  {/* Bottom Level */}
                  <div className="grid grid-cols-4 gap-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="bg-muted/30 rounded p-1">
                        <div className="text-xs font-mono">0x{i}a2b...</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Individual certificate hashes at the bottom
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Progress Side */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Processing Steps</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep > index 
                        ? 'bg-success text-white' 
                        : currentStep === index
                        ? 'bg-primary text-white animate-pulse'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {currentStep > index ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className={`transition-colors duration-500 ${
                      currentStep >= index ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-blockchain/5 border-blockchain/20">
              <h3 className="text-lg font-semibold text-blockchain mb-3">
                Why Use Merkle Trees?
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• One transaction covers thousands of certificates</p>
                <p>• Verify any single certificate without downloading the entire batch</p>
                <p>• Cryptographically prove membership in the batch</p>
                <p>• Dramatically reduce blockchain storage and costs</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}