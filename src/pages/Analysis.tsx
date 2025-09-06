import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  CheckCircle, 
  Loader2, 
  Shield, 
  Eye, 
  FileText, 
  Database,
  ArrowRight
} from "lucide-react";
import architectureImage from "@/assets/verification-architecture.jpg";

interface AnalysisStep {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'processing' | 'complete';
  substeps?: AnalysisStep[];
}

export default function Analysis() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<AnalysisStep[]>([
    {
      id: 'init',
      title: 'Initializing Secure Analysis...',
      status: 'pending'
    },
    {
      id: 'visual',
      title: 'Stream A: Analyzing Visual Integrity...',
      status: 'pending'
    },
    {
      id: 'content',
      title: 'Stream B: Verifying Structure & Content...',
      status: 'pending',
      substeps: [
        {
          id: 'template',
          title: 'Performing Template Mismatch Analysis...',
          status: 'pending'
        },
        {
          id: 'ocr',
          title: 'Extracting Text with OCR...',
          status: 'pending'
        },
        {
          id: 'database',
          title: 'Cross-Verifying with University Database...',
          status: 'pending'
        }
      ]
    },
    {
      id: 'fusion',
      title: 'Fusing Results with Decision Engine...',
      status: 'pending'
    }
  ]);

  useEffect(() => {
    const fileName = sessionStorage.getItem('verificationFile');
    if (!fileName) {
      navigate('/verify');
      return;
    }

    // Simulate analysis progression
    const timer = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        let updated = false;

        // Find current step and update it
        for (let i = 0; i < newSteps.length; i++) {
          const step = newSteps[i];
          
          if (step.status === 'pending') {
            step.status = 'processing';
            updated = true;
            break;
          } else if (step.status === 'processing') {
            // Handle substeps
            if (step.substeps) {
              let allSubstepsComplete = true;
              for (let j = 0; j < step.substeps.length; j++) {
                const substep = step.substeps[j];
                if (substep.status === 'pending') {
                  substep.status = 'processing';
                  allSubstepsComplete = false;
                  updated = true;
                  break;
                } else if (substep.status === 'processing') {
                  substep.status = 'complete';
                  allSubstepsComplete = false;
                  updated = true;
                  break;
                }
              }
              
              if (allSubstepsComplete && step.substeps.every(s => s.status === 'complete')) {
                step.status = 'complete';
                updated = true;
              }
            } else {
              step.status = 'complete';
              updated = true;
            }
            break;
          }
        }

        // Check if all steps are complete
        if (newSteps.every(step => step.status === 'complete')) {
          setTimeout(() => {
            // Randomly choose a result scenario
            const scenarios = ['verified', 'content-mismatch', 'visual-anomaly'];
            const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            sessionStorage.setItem('verificationResult', randomScenario);
            navigate('/results');
          }, 1500);
        }

        return updated ? newSteps : prevSteps;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [navigate]);

  const getStepIcon = (step: AnalysisStep) => {
    if (step.status === 'complete') return <CheckCircle className="h-5 w-5 text-success" />;
    if (step.status === 'processing') return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
    return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />;
  };

  const getSubstepIcon = (substep: AnalysisStep) => {
    if (substep.status === 'complete') return <CheckCircle className="h-4 w-4 text-success" />;
    if (substep.status === 'processing') return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
    return <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Analyzing Document...
          </h1>
          <p className="text-lg text-muted-foreground">
            Our AI-powered system is performing multi-stream verification analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Analysis Progress */}
          <Card className="p-8">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.id} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {getStepIcon(step)}
                    <span className={`font-medium ${
                      step.status === 'complete' ? 'text-success' :
                      step.status === 'processing' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {/* Substeps */}
                  {step.substeps && (
                    <div className="ml-8 space-y-2">
                      {step.substeps.map((substep) => (
                        <div key={substep.id} className="flex items-center space-x-3">
                          {getSubstepIcon(substep)}
                          <span className={`text-sm ${
                            substep.status === 'complete' ? 'text-success' :
                            substep.status === 'processing' ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            {substep.title}
                          </span>
                        </div>
                      ))}
                      
                      {/* Architecture Image for Database Step */}
                      {step.id === 'content' && step.substeps.some(s => s.id === 'database' && s.status !== 'pending') && (
                        <div className="ml-8 mt-4">
                          <div className="relative">
                            <img 
                              src={architectureImage} 
                              alt="Verification architecture"
                              className="rounded-lg shadow-md max-w-full h-auto"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ArrowRight className="h-8 w-8 text-primary animate-pulse" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 text-center">
                            Real-time database cross-verification in progress
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* System Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Security Features
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No document storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Tamper detection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Blockchain verification</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Eye className="mr-2 h-5 w-5 text-primary" />
                Analysis Methods
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Visual Integrity</span>
                  <span className="text-foreground">AI-powered analysis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template Matching</span>
                  <span className="text-foreground">Institution database</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Text Extraction</span>
                  <span className="text-foreground">Advanced OCR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Verification</span>
                  <span className="text-foreground">Cross-referencing</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                Connected Institutions
              </h3>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Verifying against 150+ institutions including:</p>
                <ul className="space-y-1">
                  <li>• Ranchi University</li>
                  <li>• Sido Kanhu Murmu University</li>
                  <li>• Jharkhand Technical University</li>
                  <li>• And 147 more verified institutions</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}