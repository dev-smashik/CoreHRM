import { Award, BookOpen, Filter, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DevelopmentPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Professional Development</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Training
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses, skills, certifications..."
            className="w-full pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>

      <Tabs defaultValue="training" className="space-y-4">
        <TabsList>
          <TabsTrigger value="training">Training Programs</TabsTrigger>
          <TabsTrigger value="skills">Skills Tracking</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="career">Career Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="training" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Compliance Training</CardTitle>
                  <Badge>Required</Badge>
                </div>
                <CardDescription>Annual compliance and ethics training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>36 of 42 employees completed</span>
                    <span>Due: June 30, 2025</span>
                  </div>
                  <Button className="mt-4 w-full" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Course
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Leadership Development</CardTitle>
                  <Badge variant="outline">Optional</Badge>
                </div>
                <CardDescription>Advanced leadership skills for managers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span className="font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>8 of 13 managers enrolled</span>
                    <span>Ongoing</span>
                  </div>
                  <Button className="mt-4 w-full" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Course
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Technical Skills</CardTitle>
                  <Badge variant="outline">Department</Badge>
                </div>
                <CardDescription>Advanced technical training for engineers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>9 of 20 engineers enrolled</span>
                    <span>Ongoing</span>
                  </div>
                  <Button className="mt-4 w-full" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Employee Training Status</CardTitle>
              <CardDescription>Track employee progress across all training programs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Assigned Courses</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={75} className="h-2 w-full" />
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </TableCell>
                    <TableCell>May 20, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Sarah Miller</p>
                          <p className="text-sm text-muted-foreground">sarah.miller@example.com</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Marketing</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={100} className="h-2 w-full" />
                        <span className="text-sm font-medium">100%</span>
                      </div>
                    </TableCell>
                    <TableCell>May 18, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Robert Johnson</p>
                          <p className="text-sm text-muted-foreground">robert.johnson@example.com</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Design</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={40} className="h-2 w-full" />
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </TableCell>
                    <TableCell>May 15, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Skills Matrix</CardTitle>
              <CardDescription>Track and manage employee skills across the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Proficiency Level</TableHead>
                    <TableHead>Training Available</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Project Management</TableCell>
                    <TableCell>Leadership</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={75} className="h-2 w-full" />
                        <span className="text-sm font-medium">Advanced</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Yes
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">JavaScript</TableCell>
                    <TableCell>Technical</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={85} className="h-2 w-full" />
                        <span className="text-sm font-medium">Expert</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Yes
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Content Marketing</TableCell>
                    <TableCell>Marketing</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={60} className="h-2 w-full" />
                        <span className="text-sm font-medium">Intermediate</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Yes
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Data Analysis</TableCell>
                    <TableCell>Technical</TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={50} className="h-2 w-full" />
                        <span className="text-sm font-medium">Intermediate</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Yes
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">UX Design</TableCell>
                    <TableCell>Design</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={70} className="h-2 w-full" />
                        <span className="text-sm font-medium">Advanced</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Yes
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Project Management Professional (PMP)</CardTitle>
                </div>
                <CardDescription>Certified project management professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">5 Certified Employees</span>
                    </div>
                    <Badge variant="outline">Professional</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Issuing Body: Project Management Institute</p>
                    <p>Renewal Period: 3 years</p>
                  </div>
                  <Button className="mt-2 w-full" size="sm">
                    View Certified Employees
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">AWS Certified Solutions Architect</CardTitle>
                </div>
                <CardDescription>Cloud architecture certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">3 Certified Employees</span>
                    </div>
                    <Badge variant="outline">Technical</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Issuing Body: Amazon Web Services</p>
                    <p>Renewal Period: 2 years</p>
                  </div>
                  <Button className="mt-2 w-full" size="sm">
                    View Certified Employees
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">SHRM-CP</CardTitle>
                </div>
                <CardDescription>HR professional certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-medium">2 Certified Employees</span>
                    </div>
                    <Badge variant="outline">HR</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Issuing Body: Society for Human Resource Management</p>
                    <p>Renewal Period: 3 years</p>
                  </div>
                  <Button className="mt-2 w-full" size="sm">
                    View Certified Employees
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="career" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Career Development Plans</CardTitle>
              <CardDescription>Track and manage employee career progression</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Current Role</TableHead>
                    <TableHead>Target Role</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Next Review</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">Engineering</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Software Engineer</TableCell>
                    <TableCell>Senior Software Engineer</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={65} className="h-2 w-full" />
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </TableCell>
                    <TableCell>June 15, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Plan
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Sarah Miller</p>
                          <p className="text-sm text-muted-foreground">Marketing</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Marketing Specialist</TableCell>
                    <TableCell>Marketing Manager</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={80} className="h-2 w-full" />
                        <span className="text-sm font-medium">80%</span>
                      </div>
                    </TableCell>
                    <TableCell>July 10, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Plan
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
                          <AvatarFallback>RJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Robert Johnson</p>
                          <p className="text-sm text-muted-foreground">Design</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>UI/UX Designer</TableCell>
                    <TableCell>Lead Designer</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Progress value={45} className="h-2 w-full" />
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </TableCell>
                    <TableCell>August 5, 2025</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Plan
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
