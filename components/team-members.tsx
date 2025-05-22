import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function TeamMembers() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-sm text-muted-foreground">Software Engineer</p>
          </div>
        </div>
        <Badge variant="outline" className="ml-auto">
          Active
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Sarah Miller</p>
            <p className="text-sm text-muted-foreground">Marketing Manager</p>
          </div>
        </div>
        <Badge variant="outline" className="ml-auto">
          Active
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Robert Johnson</p>
            <p className="text-sm text-muted-foreground">Product Designer</p>
          </div>
        </div>
        <Badge variant="outline" className="ml-auto">
          Away
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>EW</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Emily Wilson</p>
            <p className="text-sm text-muted-foreground">HR Specialist</p>
          </div>
        </div>
        <Badge variant="outline" className="ml-auto">
          Active
        </Badge>
      </div>
    </div>
  )
}
