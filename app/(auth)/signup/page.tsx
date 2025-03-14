import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Wallet, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Choose your preferred signup method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span>Sign up with Smart Wallet</span>
            </Button>
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-muted"></div>
              <span className="mx-2 flex-shrink text-xs text-muted-foreground">OR</span>
              <div className="flex-grow border-t border-muted"></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                  <SelectItem value="dao-member">DAO Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Create Account</Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Sign up with SSO</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

