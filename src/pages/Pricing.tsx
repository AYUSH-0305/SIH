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
      name: "Starter",
      price: "₹25,000",
      period: "per year",
      description: "Perfect for small colleges and institutes",
      features: [
        "Up to 1,000 certificates/year",
        "Basic verification API",
        "Email support",
        "Standard security",
        "Basic analytics dashboard"
      ],
      icon: <Building2 className="h-6 w-6" />,
      popular: false
    },
    {
      name: "Professional",
      price: "₹75,000", 
      period: "per year",
      description: "Ideal for universities and large institutions",
      features: [
        "Up to 10,000 certificates/year",
        "Advanced verification API",
        "Priority phone & email support",
        "Enhanced security features",
        "Advanced analytics & reporting",
        "Custom branding",
        "Blockchain integration"
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For government departments and large networks",
      features: [
        "Unlimited certificates",
        "Full API suite",
        "Dedicated account manager",
        "Maximum security compliance",
        "Custom integrations",
        "Multi-institution management",
        "Fraud prevention tools",
        "On-premise deployment option"
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
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join 150+ institutions already using DigiVerify to secure their credentials. 
            Start protecting your certificates today.
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
          <h2 className="text-2xl font-bold text-center mb-8">Why Institutions Choose DigiVerify</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Enhanced Security</h3>
              <p className="text-sm text-muted-foreground">
                Prevent fraud with our advanced verification technology
              </p>
            </div>
            <div className="text-center">
              <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Easy Integration</h3>
              <p className="text-sm text-muted-foreground">
                Get up and running in minutes with our simple APIs
              </p>
            </div>
            <div className="text-center">
              <div className="hero-gradient w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Trusted Network</h3>
              <p className="text-sm text-muted-foreground">
                Part of the official Jharkhand education verification system
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">How quickly can we get started?</h3>
              <p className="text-sm text-muted-foreground">
                Most institutions are up and running within 24 hours of signing up. 
                Our technical team provides full onboarding support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is our data secure?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, we use bank-grade encryption and follow all Indian data protection 
                regulations. Your institution data never leaves our secure servers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can we customize the verification portal?</h3>
              <p className="text-sm text-muted-foreground">
                Professional and Enterprise plans include custom branding options 
                to match your institution's identity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What about existing certificates?</h3>
              <p className="text-sm text-muted-foreground">
                We can help migrate and verify your historical certificate database 
                during the onboarding process at no extra cost.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Certificates?</h2>
          <p className="text-muted-foreground mb-8">
            Join the network of trusted institutions in Jharkhand
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}