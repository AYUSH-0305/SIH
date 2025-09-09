import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  CheckCircle, 
  ArrowLeft, 
  Shield, 
  Zap, 
  Users, 
  Crown,
  Building2,
  Globe
} from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Department Level",
      price: "₹1,50,000",
      period: "per year",
      description: "For individual government departments and agencies",
      features: [
        "Up to 25,000 certificates/year",
        "Government-grade security compliance",
        "Dedicated government support",
        "Basic fraud detection",
        "Standard reporting dashboard",
        "API access with rate limiting",
        "Email & phone support"
      ],
      icon: <Building2 className="h-6 w-6" />,
      popular: false
    },
    {
      name: "State Level",
      price: "₹5,00,000", 
      period: "per year",
      description: "For state government agencies and multi-department use",
      features: [
        "Up to 100,000 certificates/year",
        "Advanced fraud prevention suite",
        "Priority government support",
        "Multi-department management",
        "Advanced analytics & reporting",
        "Custom government branding",
        "Blockchain verification",
        "On-premise deployment option",
        "Dedicated account manager"
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: true
    },
    {
      name: "Central Level",
      price: "Custom",
      period: "contact us",
      description: "For central government bodies and national implementation",
      features: [
        "Unlimited certificate verification",
        "National-scale infrastructure",
        "24/7 dedicated government support",
        "Maximum security & compliance",
        "Multi-state integration",
        "Custom government integrations",
        "Advanced fraud analytics",
        "Disaster recovery & backup",
        "Full API suite with no limits",
        "White-label deployment"
      ],
      icon: <Globe className="h-6 w-6" />,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Government Verification Plans
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Secure digital certificate verification for government departments and agencies. 
            Trusted by the Government of Jharkhand for official credential verification.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 relative ${
                plan.popular ? 'border-primary shadow-elegant' : 'card-shadow'
              } hover:shadow-lg transition-all`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-8">
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  plan.popular ? 'hero-gradient' : 'bg-muted'
                } ${plan.popular ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period !== "contact us" && (
                    <span className="text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                className="w-full"
                asChild
              >
                <Link to="/contact">
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="p-8 bg-muted/30">
          <h2 className="text-2xl font-bold text-center mb-8">Why Government Departments Choose DigiVerify</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Government-Grade Security</h3>
              <p className="text-sm text-muted-foreground">
                Meets all government security standards and compliance requirements
              </p>
            </div>
            <div className="text-center">
              <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Seamless Integration</h3>
              <p className="text-sm text-muted-foreground">
                Integrates with existing government systems and workflows
              </p>
            </div>
            <div className="text-center">
              <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Official Government Network</h3>
              <p className="text-sm text-muted-foreground">
                Part of the official Jharkhand government verification infrastructure
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">How quickly can our department get started?</h3>
              <p className="text-sm text-muted-foreground">
                Most government departments are operational within 48 hours of signing up. 
                Our dedicated government support team handles all technical setup.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Does it comply with government data policies?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, DigiVerify meets all Indian government data protection standards 
                and can be deployed on-premise if required for sensitive data.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can we customize it for our department?</h3>
              <p className="text-sm text-muted-foreground">
                All plans include government branding customization and can integrate 
                with your existing departmental systems and workflows.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What about legacy government records?</h3>
              <p className="text-sm text-muted-foreground">
                We provide full migration services for historical records and legacy 
                certificate databases at no additional cost during onboarding.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Deploy Government-Grade Verification?</h2>
          <p className="text-muted-foreground mb-8">
            Join the Government of Jharkhand's trusted verification network
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Contact Government Sales Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}