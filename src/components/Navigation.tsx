import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">DigiVerify</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/pricing" 
              className="text-foreground hover:text-primary transition-colors"
            >
              For Institutions
            </Link>
            <Link 
              to="/pricing" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}