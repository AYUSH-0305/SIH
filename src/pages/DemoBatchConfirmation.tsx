import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { CheckCircle, ArrowRight, Users, Hash, DollarSign } from "lucide-react";

export default function DemoBatchConfirmation() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Success Banner */}
      <div className="bg-success text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-semibold">✅ DEMO MODE: Batch Successfully Anchored</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Batch Successfully Anchored on the Blockchain!
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A single Master Hash representing all 582 certificates has been registered in one transaction. 
            This is highly efficient and cost-effective.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Transaction Details */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Transaction Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transaction Hash</p>
                <p className="text-sm font-mono bg-muted/50 p-2 rounded mt-1">
                  0x1a2b3c4d5e6f789012345678901234567890abcdef1234567890abcdef123456
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Master Hash (Merkle Root)</p>
                <p className="text-sm font-mono bg-success/10 border border-success/20 p-2 rounded mt-1">
                  0x9c8b7a6541f2e3d4c5b6a7890123456789abcdef0123456789abcdef01234567
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Block Number</p>
                  <p className="text-sm font-mono bg-muted/50 p-2 rounded mt-1">#18,543,291</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                  <p className="text-sm font-mono bg-muted/50 p-2 rounded mt-1">2025-09-08 15:42:33</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Efficiency Stats */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Efficiency Comparison</h2>
            <div className="space-y-6">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h3 className="font-semibold text-destructive mb-2">Individual Transactions</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>582 separate transactions</span>
                    <span className="font-mono">$2,328</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing time</span>
                    <span className="font-mono">~4.8 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <h3 className="font-semibold text-success mb-2">Batch Transaction</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>1 single transaction</span>
                    <span className="font-mono">$4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing time</span>
                    <span className="font-mono">~30 seconds</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-success">99.8% Cost Savings</div>
                <div className="text-sm text-muted-foreground">with batch processing</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">582</div>
            <div className="text-sm text-muted-foreground">Certificates Secured</div>
          </Card>
          <Card className="p-6 text-center">
            <Hash className="h-8 w-8 text-blockchain mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">1</div>
            <div className="text-sm text-muted-foreground">Master Hash</div>
          </Card>
          <Card className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-success mx-auto mb-3" />
            <div className="text-2xl font-bold text-foreground">$4</div>
            <div className="text-sm text-muted-foreground">Total Cost</div>
          </Card>
        </div>

        {/* Bridge to Next Step */}
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-blockchain/10">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              The entire batch is now secure. Let&apos;s verify that a single student, Priya Singh, was part of this batch.
            </h3>
            <p className="text-muted-foreground mb-6">
              See how we can instantly verify any certificate from the batch without needing to check all 582 records
            </p>
            <Button asChild variant="blockchain" size="xl" className="group">
              <Link to="/demo-merkle-verification">
                Step 2: Verify a Single Certificate
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}