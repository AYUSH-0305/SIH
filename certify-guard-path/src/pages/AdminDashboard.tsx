import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  Building,
  FileCheck,
  Search,
  LogOut,
  Plus,
  Eye,
  Ban,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("overview");

  useEffect(() => {
    if (!auth.isAuthenticated || auth.user?.role !== 'admin') {
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

  const handleBlacklist = (certificateId: string) => {
    toast({
      title: "Certificate Blacklisted",
      description: `Certificate ${certificateId} has been added to the blacklist.`
    });
  };

  // Mock data
  const stats = [
    {
      title: "Total Verifications (24h)",
      value: "2,847",
      change: "+12% from yesterday",
      icon: <FileCheck className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Active Institutions",
      value: "153",
      change: "+3 this month",
      icon: <Building className="h-5 w-5" />,
      trend: "up"
    },
    {
      title: "Forgery Attempts",
      value: "12",
      change: "-8% from last week",
      icon: <AlertTriangle className="h-5 w-5" />,
      trend: "down"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "Last 30 days",
      icon: <Activity className="h-5 w-5" />,
      trend: "neutral"
    }
  ];

  const institutions = [
    { id: 1, name: "Ranchi University", students: 8934, certificates: 12847, status: "Active", lastSync: "2024-03-15 10:30" },
    { id: 2, name: "Sido Kanhu Murmu University", students: 6521, certificates: 9234, status: "Active", lastSync: "2024-03-15 09:45" },
    { id: 3, name: "Jharkhand Technical University", students: 4312, certificates: 6789, status: "Warning", lastSync: "2024-03-14 16:20" },
    { id: 4, name: "Central University of Jharkhand", students: 3456, certificates: 5123, status: "Active", lastSync: "2024-03-15 11:15" }
  ];

  const blacklistItems = [
    { id: 1, certificateId: "RU-2023-CSE-1234", reason: "Forged document detected", institution: "Ranchi University", dateAdded: "2024-03-10" },
    { id: 2, certificateId: "SKMU-2022-ENG-5678", reason: "Student record mismatch", institution: "SKMU", dateAdded: "2024-03-08" },
    { id: 3, certificateId: "JTU-2023-MECH-9012", reason: "Visual tampering", institution: "JTU", dateAdded: "2024-03-05" },
  ];

  const manualReviewQueue = [
    { 
      caseId: "MR-20250906-8A3B", 
      certificateId: "JH-UNIV-RNC-98765", 
      submittedOn: "Sept 6, 2025, 1:37 PM", 
      reasonFlagged: "Content Mismatch", 
      status: "New", 
      assignedTo: "Unassigned" 
    },
    { 
      caseId: "MR-20250905-7C2D", 
      certificateId: "RU-2024-ENG-45123", 
      submittedOn: "Sept 5, 2025, 3:22 PM", 
      reasonFlagged: "Visual Anomaly", 
      status: "In Review", 
      assignedTo: "Dr. Amit Kumar" 
    },
    { 
      caseId: "MR-20250905-9F1E", 
      certificateId: "SKMU-2023-ARTS-78901", 
      submittedOn: "Sept 5, 2025, 11:45 AM", 
      reasonFlagged: "Content Mismatch", 
      status: "Pending", 
      assignedTo: "Ms. Priya Singh" 
    }
  ];

  const verificationTrend = [
    { date: "Mar 1", verified: 245, fake: 8 },
    { date: "Mar 2", verified: 312, fake: 12 },
    { date: "Mar 3", verified: 289, fake: 6 },
    { date: "Mar 4", verified: 367, fake: 15 },
    { date: "Mar 5", verified: 423, fake: 9 },
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
                <h1 className="text-xl font-bold text-foreground">Government Admin Portal</h1>
                <p className="text-sm text-muted-foreground">Department of Higher Education, Jharkhand</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Manual Review Queue - Priority Card */}
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveView('manual-review')}>
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                Urgent
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-900">14</p>
              <p className="text-sm font-medium text-amber-700">Manual Review Queue</p>
              <p className="text-xs text-amber-600 mt-1">New requests requiring attention</p>
            </div>
          </Card>

          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.trend === 'up' ? 'text-success' : 
                    stat.trend === 'down' ? 'text-success' : 'text-muted-foreground'
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
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="manual-review">Manual Review</TabsTrigger>
            <TabsTrigger value="institutions">Institutions</TabsTrigger>
            <TabsTrigger value="analytics">Fraud Analytics</TabsTrigger>
            <TabsTrigger value="blacklist">Blacklist Management</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Verification Results Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Verification Results (Last 30 Days)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 success-gradient rounded-full"></div>
                      <span className="text-sm">Verified Certificates</span>
                    </div>
                    <span className="font-semibold">8,234 (94.2%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span className="text-sm">Fake/Tampered</span>
                    </div>
                    <span className="font-semibold">312 (3.6%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                      <span className="text-sm">Inconclusive</span>
                    </div>
                    <span className="font-semibold">193 (2.2%)</span>
                  </div>
                </div>
              </Card>

              {/* Forgery Trend Chart Simulation */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Forgery Attempt Trends</h3>
                <div className="space-y-3">
                  {verificationTrend.map((day, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{day.date}</span>
                      <div className="flex space-x-4">
                        <span className="text-sm text-success">{day.verified} verified</span>
                        <span className="text-sm text-destructive">{day.fake} fake</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Manual Review Queue Tab */}
          <TabsContent value="manual-review" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Manual Review Requests</h3>
                  <p className="text-sm text-muted-foreground">Cases requiring human review and verification</p>
                </div>
                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                  {manualReviewQueue.length} Pending
                </Badge>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Reason Flagged</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manualReviewQueue.map((item, index) => (
                    <TableRow key={index} className={index === 0 ? 'bg-amber-50 border-amber-200' : ''}>
                      <TableCell className="font-mono text-sm font-medium">{item.caseId}</TableCell>
                      <TableCell className="font-mono text-sm">{item.certificateId}</TableCell>
                      <TableCell className="text-sm">{item.submittedOn}</TableCell>
                      <TableCell>
                        <Badge variant={item.reasonFlagged === 'Content Mismatch' ? 'destructive' : 'secondary'}>
                          {item.reasonFlagged}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          item.status === 'New' ? 'secondary' : 
                          item.status === 'In Review' ? 'default' : 'outline'
                        }>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{item.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Review
                          </Button>
                          {item.status === 'New' && (
                            <Button variant="hero" size="sm">
                              Assign
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Institutions Tab */}
          <TabsContent value="institutions" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Connected Institutions</h3>
                <Button variant="hero">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Institution
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Institution Name</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Certificates</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {institutions.map((institution) => (
                    <TableRow key={institution.id}>
                      <TableCell className="font-medium">{institution.name}</TableCell>
                      <TableCell>{institution.students.toLocaleString()}</TableCell>
                      <TableCell>{institution.certificates.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          institution.status === 'Active' ? 'default' : 'destructive'
                        }>
                          {institution.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {institution.lastSync}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Fraud Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-destructive">
                  <AlertTriangle className="inline mr-2 h-5 w-5" />
                  High Risk Alerts
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Unusual verification pattern detected</p>
                    <p className="text-muted-foreground">Institution: JTU - 15 failed verifications in 1 hour</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Potential document farming</p>
                    <p className="text-muted-foreground">IP: 192.168.1.xxx - 50+ verifications from same source</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Common Fraud Types</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Content Manipulation</span>
                    <span className="text-destructive">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visual Tampering</span>
                    <span className="text-destructive">23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complete Forgery</span>
                    <span className="text-destructive">9%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Prevention Impact</h3>
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">₹2.4 Cr</p>
                    <p className="text-sm text-muted-foreground">Fraud prevented this year</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">99.1%</p>
                    <p className="text-sm text-muted-foreground">Detection accuracy</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Blacklist Management Tab */}
          <TabsContent value="blacklist" className="space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Blacklisted Certificates</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search certificate ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="destructive">
                    <Ban className="mr-2 h-4 w-4" />
                    Add to Blacklist
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blacklistItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.certificateId}</TableCell>
                      <TableCell>{item.reason}</TableCell>
                      <TableCell>{item.institution}</TableCell>
                      <TableCell>{item.dateAdded}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Recent System Activity</h3>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between">
                  <span>[2024-03-15 14:23:45] Certificate verification completed - ID: RU-2023-CSE-1247</span>
                  <Badge variant="default">SUCCESS</Badge>
                </div>
                <div className="flex justify-between">
                  <span>[2024-03-15 14:22:12] Fraud attempt detected - IP: 192.168.1.xxx</span>
                  <Badge variant="destructive">ALERT</Badge>
                </div>
                <div className="flex justify-between">
                  <span>[2024-03-15 14:21:33] Institution sync completed - Ranchi University</span>
                  <Badge variant="default">SUCCESS</Badge>
                </div>
                <div className="flex justify-between">
                  <span>[2024-03-15 14:20:45] API rate limit exceeded - Client: inst_jtu</span>
                  <Badge variant="secondary">WARNING</Badge>
                </div>
                <div className="flex justify-between">
                  <span>[2024-03-15 14:19:12] Bulk upload processed - 1,247 records</span>
                  <Badge variant="default">SUCCESS</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}