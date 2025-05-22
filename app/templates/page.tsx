import { Download, FileText, Filter, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TemplatesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Template
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search templates..." className="w-full pl-8 md:w-[300px] lg:w-[400px]" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="onboarding">Onboarding</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="offboarding">Offboarding</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Employee Onboarding Checklist</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 10, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Onboarding</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 1.2 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Performance Review Form</CardTitle>
                      <CardDescription className="text-xs">Last updated: April 28, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Performance</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 0.8 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Employee Handbook Template</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 15, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Compliance</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 2.4 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Job Offer Letter</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 5, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Onboarding</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 0.5 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">UK Compliance Checklist</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 18, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Compliance</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">PDF • 1.8 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Exit Interview Form</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 12, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Offboarding</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 0.7 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Employee Onboarding Checklist</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 10, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Onboarding</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 1.2 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Job Offer Letter</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 5, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Onboarding</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 0.5 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Performance Review Form</CardTitle>
                      <CardDescription className="text-xs">Last updated: April 28, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Performance</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 0.8 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Employee Handbook Template</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 15, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Compliance</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">DOCX • 2.4 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">UK Compliance Checklist</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 18, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Compliance</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">PDF • 1.8 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
