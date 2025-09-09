import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Upload, Download, FileSpreadsheet } from "lucide-react";

export default function DemoBulkUpload() {
  const navigate = useNavigate();

  const handleProcessBatch = () => {
    navigate('/demo-merkle-generation');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Demo Mode Banner */}
      <div className="bg-blockchain text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-semibold">DEMO MODE: University Bulk Issuance</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Register a New Batch of Certificates
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Step 1: Upload a CSV file of today&apos;s graduates to begin the batching process
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-8">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Drag & Drop a .CSV file here
              </h3>
              <p className="text-muted-foreground mb-6">
                Upload your graduate list with columns: Name, Degree, Date
              </p>
              <Button variant="outline" size="lg">
                Browse Files
              </Button>
            </div>

            {/* Sample File Download */}
            <div className="text-center">
              <Button variant="ghost" className="text-primary hover:text-primary">
                <Download className="mr-2 h-4 w-4" />
                Download Sample_Graduates.csv
              </Button>
            </div>

            {/* Demo Process Button */}
            <div className="text-center pt-6 border-t">
              <p className="text-muted-foreground mb-6">
                For this demo, we&apos;ll use a sample file with 582 graduates
              </p>
              <Button 
                variant="blockchain" 
                size="xl"
                onClick={handleProcessBatch}
                className="min-w-[300px]"
              >
                <FileSpreadsheet className="mr-2 h-5 w-5" />
                Use Sample File & Process Batch
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Section */}
        <Card className="mt-8 p-6 bg-muted/30">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Why Batch Processing?
          </h3>
          <div className="space-y-2 text-muted-foreground">
            <p>• Process thousands of certificates in a single blockchain transaction</p>
            <p>• Dramatically reduce gas fees and processing costs</p>
            <p>• Maintain individual certificate security and verification</p>
            <p>• Enable instant verification of any certificate from the batch</p>
          </div>
        </Card>
      </div>
    </div>
  );
}