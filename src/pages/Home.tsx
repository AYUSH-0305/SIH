import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Shield, 
  FileCheck, 
  Zap, 
  Users, 
  CheckCircle,
  ArrowRight,
  Scan
} from "lucide-react";
import heroImage from "@/assets/hero-verification.jpg";

export default function Home() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Bank-Grade Security",
      description: "Advanced cryptographic protection and blockchain verification"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Verification",
      description: "Get results in seconds with our AI-powered analysis"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Multi-Format Support",
      description: "Verify PDFs, images, and QR-coded digital certificates"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Trusted Network",
      description: "Connected to 150+ verified educational institutions"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Upload Certificate",
      description: "Drag and drop or select your certificate file"
    },
    {
      number: "2", 
      title: "AI Analysis",
      description: "Our system analyzes document integrity and cross-references data"
    },
    {
      number: "3",
      title: "Instant Results",
      description: "Get verified status with detailed fraud detection report"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Digital verification system"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                The Gold Standard for{" "}
                <span className="hero-gradient bg-clip-text text-transparent">
                  Academic Verification
                </span>
                {" "}in Jharkhand
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Instantly verify degrees and certificates from participating institutions. 
                Secure, fast, and trusted by the Department of Higher Education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  variant="hero" 
                  size="xl" 
                  className="group"
                >
                  <Link to="/verify">
                    Verify a Certificate Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="xl"
                >
                  <Link to="/pricing">Register Your Institution</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <Card className="p-8 card-shadow bg-card/95 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">Quick Verification</h3>
                <div className="space-y-4">
                  <Button variant="verify" className="w-full justify-start" asChild>
                    <Link to="/verify">
                      <FileCheck className="mr-3 h-5 w-5" />
                      Upload Document
                    </Link>
                  </Button>
                  <div className="text-center text-muted-foreground">OR</div>
                  <Button variant="blockchain" className="w-full justify-start" asChild>
                    <Link to="/qr-scan">
                      <Scan className="mr-3 h-5 w-5" />
                      Scan QR Code
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose DigiVerify?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technology and trusted by institutions across Jharkhand
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center card-shadow hover:shadow-elegant transition-all group">
                <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center text-primary-foreground mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-gradient-to-r from-blockchain/10 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Live Demo: See the Blockchain in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
              Follow our 2-step interactive demo. First, you'll act as a university registrar to issue a tamper-proof digital certificate. Then, you'll act as an employer to verify it instantly.
            </p>
            <Button asChild variant="blockchain" size="xl" className="group">
              <Link to="/demo-bulk-upload">
                Start Interactive Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, secure, and lightning-fast verification in three steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="hero-gradient w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Verify Your Certificate?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of employers and institutions who trust DigiVerify
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/verify">Start Verification Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">DigiVerify</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 DigiVerify. Trusted by the Department of Higher Education, Jharkhand.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}