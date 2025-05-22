import { Download, FileText, Filter, FolderPlus, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Document Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search documents..." className="w-full pl-8 md:w-[300px] lg:w-[400px]" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
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
                      <CardTitle className="text-base">Employee Handbook</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 15, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Policy</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">PDF • 2.4 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
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
                      <CardTitle className="text-base">Onboarding Checklist</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 10, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Checklist</Badge>
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
                      View
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
                      <CardTitle className="text-base">Performance Review Template</CardTitle>
                      <CardDescription className="text-xs">Last updated: April 28, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Template</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">XLSX • 0.8 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
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
                      <CardTitle className="text-base">Leave Policy</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 5, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Policy</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">PDF • 1.5 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
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
                      <CardTitle className="text-base">Compliance Checklist - UK</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 18, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Checklist</Badge>
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
                      View
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
                      <CardTitle className="text-base">Training Materials</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 12, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Template</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">PPTX • 5.2 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Employee Handbook</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 15, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Policy</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">PDF • 2.4 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
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
                      <CardTitle className="text-base">Leave Policy</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 5, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Policy</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">PDF • 1.5 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Performance Review Template</CardTitle>
                      <CardDescription className="text-xs">Last updated: April 28, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Template</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">XLSX • 0.8 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
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
                      <CardTitle className="text-base">Training Materials</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 12, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Template</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-muted-foreground">PPTX • 5.2 MB</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="checklists" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Onboarding Checklist</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 10, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Checklist</Badge>
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
                      View
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
                      <CardTitle className="text-base">Compliance Checklist - UK</CardTitle>
                      <CardDescription className="text-xs">Last updated: May 18, 2025</CardDescription>
                    </div>
                  </div>
                  <Badge>Checklist</Badge>
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
                      View
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
