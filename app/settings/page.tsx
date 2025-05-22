import { Check, Globe, Lock, Mail, PlusCircle, Save, Server, Settings, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <div className="flex items-center gap-2">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
          <Button variant="outline" asChild>
            <Link href="/settings/system">System Status</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users & Permissions</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Acme Inc." defaultValue="Acme Inc." />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="company-address">Company Address</Label>
                <Textarea
                  id="company-address"
                  placeholder="123 Main St, City, Country"
                  defaultValue="123 Main St, City, Country"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    placeholder="info@example.com"
                    defaultValue="info@example.com"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="company-phone">Company Phone</Label>
                  <Input
                    id="company-phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="company-website">Company Website</Label>
                <Input
                  id="company-website"
                  type="url"
                  placeholder="https://example.com"
                  defaultValue="https://example.com"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                <Select defaultValue="january">
                  <SelectTrigger id="fiscal-year">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="june">June</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="august">August</SelectItem>
                    <SelectItem value="september">September</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                    <SelectItem value="november">November</SelectItem>
                    <SelectItem value="december">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-backup" className="flex flex-col space-y-1">
                  <span>Automatic Backups</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Enable daily automatic backups of all HR data
                  </span>
                </Label>
                <Switch id="auto-backup" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                  <span>Two-Factor Authentication</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Require two-factor authentication for all users
                  </span>
                </Label>
                <Switch id="two-factor" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="audit-logs" className="flex flex-col space-y-1">
                  <span>Audit Logs</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Keep detailed logs of all system activities
                  </span>
                </Label>
                <Switch id="audit-logs" defaultChecked />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="data-retention">Data Retention Period</Label>
                <Select defaultValue="7years">
                  <SelectTrigger id="data-retention">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="3years">3 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                    <SelectItem value="7years">7 Years</SelectItem>
                    <SelectItem value="10years">10 Years</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their access permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">Active Users</h3>
                  <p className="text-sm text-muted-foreground">Currently 8 active users in the system</p>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Admin Users</h4>
                      <p className="text-sm text-muted-foreground">Full system access (2 users)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">HR Managers</h4>
                      <p className="text-sm text-muted-foreground">HR data access (3 users)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Department Managers</h4>
                      <p className="text-sm text-muted-foreground">Limited access (3 users)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Configure access levels for different user roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label>Default Role for New Users</Label>
                  <RadioGroup defaultValue="limited" className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label htmlFor="admin">Admin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manager" id="manager" />
                      <Label htmlFor="manager">Manager</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="limited" id="limited" />
                      <Label htmlFor="limited">Limited</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="pt-4">
                  <Button variant="outline">Configure Role Permissions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
              <CardDescription>Connect with third-party services and applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Server className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Payroll System</h4>
                      <p className="text-sm text-muted-foreground">Connected: AcmePayroll</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      <span>Connected</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email Service</h4>
                      <p className="text-sm text-muted-foreground">Connected: Office 365</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      <span>Connected</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Accounting Software</h4>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Single Sign-On (SSO)</h4>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
              <div className="pt-2">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Integration
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys and access tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" type="password" value="••••••••••••••••••••••••••••••" readOnly />
                    <Button variant="outline">Show</Button>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Last used: May 22, 2025</p>
                </div>
                <div className="flex items-center justify-between space-x-2 pt-4">
                  <Label htmlFor="api-access" className="flex flex-col space-y-1">
                    <span>Enable API Access</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Allow external applications to access HR data via API
                    </span>
                  </Label>
                  <Switch id="api-access" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-leave" className="flex flex-col space-y-1">
                    <span>Leave Requests</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Notify when leave requests are submitted or updated
                    </span>
                  </Label>
                  <Switch id="email-leave" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-performance" className="flex flex-col space-y-1">
                    <span>Performance Reviews</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Notify when performance reviews are due or completed
                    </span>
                  </Label>
                  <Switch id="email-performance" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-training" className="flex flex-col space-y-1">
                    <span>Training Reminders</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Send reminders for upcoming or overdue training
                    </span>
                  </Label>
                  <Switch id="email-training" defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Alerts</h3>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="alert-compliance" className="flex flex-col space-y-1">
                    <span>Compliance Alerts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Alert when compliance documents are expiring
                    </span>
                  </Label>
                  <Switch id="alert-compliance" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="alert-security" className="flex flex-col space-y-1">
                    <span>Security Alerts</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Alert on suspicious login attempts or security issues
                    </span>
                  </Label>
                  <Switch id="alert-security" defaultChecked />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="notifications@example.com"
                  defaultValue="hr-alerts@example.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
              <CardDescription>Configure regional and language preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="default-language">Default Language</Label>
                <Select defaultValue="en-US">
                  <SelectTrigger id="default-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mm-dd-yyyy">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="time-format">Time Format</Label>
                <Select defaultValue="12h">
                  <SelectTrigger id="time-format">
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="america-new_york">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-new_york">America/New York (UTC-5)</SelectItem>
                    <SelectItem value="america-los_angeles">America/Los Angeles (UTC-8)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                    <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                    <SelectItem value="australia-sydney">Australia/Sydney (UTC+10)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                    <SelectItem value="aud">AUD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="multi-language" className="flex flex-col space-y-1">
                  <span>Enable Multi-language Support</span>
                  <span className="font-normal text-sm text-muted-foreground">
                    Allow users to select their preferred language
                  </span>
                </Label>
                <Switch id="multi-language" defaultChecked />
              </div>
              <div className="flex items-center gap-4 p-4 border rounded-md">
                <Globe className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-medium">Regional Compliance Settings</h4>
                  <p className="text-sm text-muted-foreground">Configure region-specific compliance rules</p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
