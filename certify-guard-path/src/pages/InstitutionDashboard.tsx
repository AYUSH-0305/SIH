import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/App";
import { 
  Upload,
  Download,
  Users,
  FileCheck,
  TrendingUp,
  Shield,
  Code,
  LogOut,
  Copy,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InstitutionDashboard() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [institutionCode, setInstitutionCode] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [institutionId, setInstitutionId] = useState<string | null>(null);
  const [pdfColumns, setPdfColumns] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, number>>({ Rno: 0, Jno: 1, CN: 2, B: 3, Sec: 4 });

  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    if (!auth.isAuthenticated || auth.user?.role !== 'institution') {
      navigate('/login');
    }
  }, [auth, navigate]);

  const handleLogout = () => {
    setAuth({ user: null, isAuthenticated: false });
    navigate('/');
    toast({
      title: "Logged out successfully",
      description: "You have been securely logged out."
    });
  };

  const findInstitutionByCode = async (code: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/institutions`);
      const data = await res.json();
      const inst = (data || []).find((i: any) => i.code === code);
      return inst || null;
    } catch (_) {
      return null;
    }
  };

  const loadStudents = async (instId: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/students?institutionId=${encodeURIComponent(instId)}`);
      const data = await res.json();
      setStudents(Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      setStudents([]);
    }
  };

  const handlePdfSubmit = async () => {
    if (!institutionCode.trim()) {
      toast({ title: "Missing institution code", description: "Enter your institution code." });
      return;
    }
    if (!pdfFile) {
      toast({ title: "No file selected", description: "Choose a PDF to upload." });
      return;
    }
    try {
      setIsUploading(true);
      setUploadProgress(10);
      const form = new FormData();
      form.append("file", pdfFile);
      form.append("institutionCode", institutionCode.trim());

      if (columnMapping) {
        form.append("columnMapping", JSON.stringify(columnMapping));
      }
      const res = await fetch(`${API_BASE}/api/upload/pdf`, { method: "POST", body: form });
      setUploadProgress(70);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      const result = await res.json();
      setUploadProgress(100);
      toast({ title: "Upload complete", description: `Processed ${result?.insertedOrUpdated ?? 0} students.` });

      const inst = await findInstitutionByCode(institutionCode.trim());
      if (inst?._id) {
        setInstitutionId(inst._id);
        await loadStudents(inst._id);
      }
    } catch (err: any) {
      toast({ title: "Upload failed", description: err?.message || "Unable to upload PDF", variant: "destructive" as any });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 800);
    }
  };

  const handleBulkUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete",
            description: "Successfully uploaded 1,247 certificate records."
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText("dv_live_pk_inst_ranchi_university_3f8d9c2e1a4b6f7g");
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard."
    });
  };

  const recentUploads = [
    { id: 1, filename: "btech_2023_batch.xlsx", records: 1247, status: "Completed", date: "2024-03-15" },
    { id: 2, filename: "mtech_2023_batch.xlsx", records: 342, status: "Processing", date: "2024-03-14" },
    { id: 3, filename: "mba_2023_batch.xlsx", records: 198, status: "Completed", date: "2024-03-13" },
    { id: 4, filename: "bsc_2023_batch.xlsx", records: 856, status: "Failed", date: "2024-03-12" }
  ];

  const stats = [
    {
      title: "Total Certificates",
      value: "12,847",
      change: "+247 this month",
      icon: <FileCheck className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Verifications Today", 
      value: "89",
      change: "+12% from yesterday",
      icon: <Shield className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Active Students",
      value: "8,934",
      change: "Current enrollment",
      icon: <Users className="h-5 w-5" />,
      trend: "neutral"
    },
    {
      title: "API Calls",
      value: "2,451",
      change: "+8% this week",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: "up"
    }
  ];

  if (!auth.user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Institution Portal</h1>
                <p className="text-sm text-muted-foreground">{auth.user.institutionName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {auth.user.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.trend === 'up' ? 'text-success' : 
                    stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="hero-gradient p-3 rounded-lg text-primary-foreground">
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="records">Manage Records</TabsTrigger>
            <TabsTrigger value="api">API & Integration</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="hero" 
                    className="w-full justify-start"
                    onClick={handleBulkUpload}
                    disabled={isUploading}
                  >
                    <Upload className="mr-3 h-5 w-5" />
                    {isUploading ? `Uploading... ${uploadProgress}%` : "Bulk Record Upload"}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-3 h-5 w-5" />
                    Download Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="mr-3 h-5 w-5" />
                    View Public Portal
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Certificate verified for Priya Sharma</span>
                    <span className="text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Bulk upload completed - 1,247 records</span>
                    <span className="text-muted-foreground">1 hour ago</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>API integration test successful</span>
                    <span className="text-muted-foreground">3 hours ago</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Monthly report generated</span>
                    <span className="text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Manage Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Manage Records</h3>
                <div className="flex gap-2 items-end">
                  <div className="space-y-2">
                    <Label className="text-xs">Institution Code</Label>
                    <Input
                      placeholder="e.g., INST123"
                      value={institutionCode}
                      onChange={(e) => setInstitutionCode(e.target.value)}
                      className="w-44"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">PDF File</Label>
                    <Input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
                  </div>
                  <Button variant="hero" onClick={handlePdfSubmit} disabled={isUploading}>
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload PDF"}
                  </Button>
                </div>
              </div>

              {isUploading && (
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Uploading btech_2024_batch.xlsx...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                    <div 
                      className="hero-gradient h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Students</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      const inst = await findInstitutionByCode(institutionCode.trim());
                      if (inst?._id) {
                        setInstitutionId(inst._id);
                        await loadStudents(inst._id);
                      } else {
                        toast({ title: "Institution not found", description: "Check the code and try again." });
                      }
                    }}
                  >
                    Refresh
                  </Button>
                </div>
                <div className="space-y-3 p-4 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        if (!pdfFile) {
                          toast({ title: "Select a PDF first" });
                          return;
                        }
                        const form = new FormData();
                        form.append("file", pdfFile);
                        const res = await fetch(`${API_BASE}/api/upload/pdf-columns`, { method: "POST", body: form });
                        if (!res.ok) {
                          toast({ title: "Failed to get columns", variant: "destructive" as any });
                          return;
                        }
                        const data = await res.json();
                        setPdfColumns(Array.isArray(data?.columns) ? data.columns : []);
                        if (Array.isArray(data?.columns) && data.columns.length >= 5) {
                          setColumnMapping({ Rno: 0, Jno: 1, CN: 2, B: 3, Sec: 4 });
                        }
                      }}
                    >
                      Extract PDF Columns
                    </Button>
                    {pdfColumns.length > 0 && (
                      <span className="text-xs text-muted-foreground">Found {pdfColumns.length} columns</span>
                    )}
                  </div>
                  {pdfColumns.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(["Rno","Jno","CN","B","Sec"] as const).map((key) => (
                        <div key={key} className="space-y-1">
                          <Label className="text-xs">{key} ↦ PDF Column</Label>
                          <select
                            className="w-full border rounded h-9 px-2 text-sm bg-background"
                            value={columnMapping[key] ?? 0}
                            onChange={(e) => setColumnMapping({ ...columnMapping, [key]: Number(e.target.value) })}
                          >
                            {pdfColumns.map((c, idx) => (
                              <option key={idx} value={idx}>{`Column ${idx}: ${c}`}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Application No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Section</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((s, idx) => (
                      <TableRow key={`${s._id || idx}`}>
                        <TableCell className="font-medium">{s.Rno}</TableCell>
                        <TableCell>{s.Jno}</TableCell>
                        <TableCell>{s.CN}</TableCell>
                        <TableCell>{s.B}</TableCell>
                        <TableCell>{s.Sec}</TableCell>
                      </TableRow>
                    ))}
                    {students.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <span className="text-sm text-muted-foreground">No students yet. Upload a PDF to populate records.</span>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* API & Integration Tab */}
          <TabsContent value="api" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Your API Key</Label>
                    <div className="flex mt-1">
                      <Input 
                        value="dv_live_pk_inst_ranchi_university_3f8d9c2e1a4b6f7g" 
                        readOnly 
                        className="font-mono text-xs"
                      />
                      <Button variant="outline" size="sm" onClick={copyApiKey} className="ml-2">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Webhook URL (Optional)</Label>
                    <Input 
                      placeholder="https://your-institution.edu/webhook" 
                      className="mt-1"
                    />
                  </div>
                  <Button variant="hero" size="sm">
                    Save Configuration
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Integration Resources</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="mr-3 h-5 w-5" />
                    API Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-3 h-5 w-5" />
                    Sample Code (PHP)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-3 h-5 w-5" />
                    Sample Code (Python)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ExternalLink className="mr-3 h-5 w-5" />
                    Test API Endpoint
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Contact Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Email: support@digiverify.jharkhand.gov.in
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Phone: +91 651 2345 678
                  </p>
                  <Button variant="outline" size="sm">
                    Submit Support Ticket
                  </Button>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Resources</h4>
                  <div className="text-sm space-y-1">
                    <p>📚 User Manual</p>
                    <p>🎥 Video Tutorials</p>
                    <p>❓ FAQ & Troubleshooting</p>
                    <p>📋 Template Downloads</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}