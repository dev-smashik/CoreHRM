import { DatabaseStatus } from "@/components/database-status"
import { EnvVariablesStatus } from "@/components/env-variables-status"

export default function SystemStatusPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">System Status</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DatabaseStatus />
        <EnvVariablesStatus />
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          Note: For security reasons, environment variables are not directly exposed to the client. The database
          connection test confirms if your DATABASE_URL is configured correctly.
        </p>
        <p className="mt-2">
          If you need to add or update environment variables, please modify your .env file or update your deployment
          environment variables.
        </p>
      </div>
    </div>
  )
}
