import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/App";
import { Shield, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock user data based on role
    const userData = {
      institution: {
        id: "inst_001",
        name: "Prakash Kumar",
        email,
        role: "institution" as const,
        institutionId: "ranchi_university",
        institutionName: "Ranchi University"
      },
      admin: {
        id: "admin_001", 
        name: "Anjali Singh",
        email,
        role: "admin" as const
      }
    };

    const user = userData[role as keyof typeof userData];
    
    if (user) {
      setAuth({
        user,
        isAuthenticated: true
      });

      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`
      });

      // Redirect based on role
      if (role === 'institution') {
        navigate('/institution');
      } else if (role === 'admin') {
        navigate('/admin');
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="hero-gradient w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Secure Portal Access
            </h1>
            <p className="text-muted-foreground">
              Sign in to your institutional or admin account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="role">Account Type *</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="institution">Institution Registrar</SelectItem>
                  <SelectItem value="admin">Government Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In Securely"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>🔒 Secured with bank-grade encryption</p>
              <p>📧 Forgot password? Contact IT support</p>
            </div>
          </div>

          {/* Demo Credentials */}
          <Card className="mt-6 p-4 bg-muted/30">
            <h3 className="text-sm font-semibold mb-3">Demo Credentials</h3>
            <div className="text-xs space-y-2">
              <div>
                <p className="font-medium">Institution Admin:</p>
                <p>Email: prakash@ranchi.ac.in</p>
                <p>Password: demo123</p>
              </div>
              <div className="mt-2">
                <p className="font-medium">Government Admin:</p>
                <p>Email: anjali@jharkhand.gov.in</p>
                <p>Password: admin123</p>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}