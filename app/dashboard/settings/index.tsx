import { createFileRoute } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bell,
  CreditCard,
  Layers,
  Loader2,
  Lock,
  Save,
  Settings as SettingsIcon,
  Shield,
  User
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";


export const Route = createFileRoute('/dashboard/settings/')({
  component: SettingsPage,
})

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters." }).optional(),
  urls: z.object({
    twitter: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
    linkedin: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
    github: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  fullName: "John Doe",
  email: "john@example.com",
  bio: "Product Manager at Example Corp. Passionate about building great products.",
  urls: {
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
};

interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SectionCard({ title, description, icon, children }: SectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully!");
      console.log(data);
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="profile" className="flex gap-2 items-center">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="flex gap-2 items-center">
            <Lock className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="display" className="flex gap-2 items-center">
            <Layers className="h-4 w-4" />
            Display
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile" className="space-y-6">
            <SectionCard
              title="Profile Information"
              description="Update your personal information and public profile"
              icon={<User className="h-5 w-5 text-primary" />}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-6 sm:flex-row">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input placeholder="Tell us about yourself" {...field} />
                          </FormControl>
                          <FormDescription>
                            Brief description for your profile. URLs are hyperlinked.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Social Profiles</h3>
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="urls.twitter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Twitter</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://twitter.com/username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="urls.linkedin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>LinkedIn</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://linkedin.com/in/username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-2">
                          <FormField
                            control={form.control}
                            name="urls.github"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GitHub</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://github.com/username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save changes
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </SectionCard>

            <SectionCard
              title="Profile Picture"
              description="Upload or update your profile picture"
              icon={<User className="h-5 w-5 text-primary" />}
            >
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-2">
                  <Button variant="outline">
                    Change picture
                  </Button>
                  <Button variant="outline" className="text-muted-foreground">
                    Remove
                  </Button>
                </div>
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <SectionCard
              title="Account Security"
              description="Manage your password and security preferences"
              icon={<Shield className="h-5 w-5 text-primary" />}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </div>

                <Button>
                  Update Password
                </Button>
              </div>
            </SectionCard>

            <SectionCard
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              icon={<Lock className="h-5 w-5 text-primary" />}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Two-factor authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by requiring both a password and verification code.
                  </p>
                </div>
                <Switch />
              </div>
            </SectionCard>

            <SectionCard
              title="Connected Accounts"
              description="Connect your accounts to enable single sign-on"
              icon={<CreditCard className="h-5 w-5 text-primary" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Google</p>
                    <p className="text-sm text-muted-foreground">
                      Sign in with Google
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">
                      Sign in with GitHub
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Apple</p>
                    <p className="text-sm text-muted-foreground">
                      Sign in with Apple
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <SectionCard
              title="Notification Preferences"
              description="Manage your notification settings"
              icon={<Bell className="h-5 w-5 text-primary" />}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Product updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about product updates and features
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Account activity</Label>
                        <p className="text-sm text-muted-foreground">
                          Get important notifications about your account
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Newsletter</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive our monthly newsletter
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">New features</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new features
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Task updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notifications about your task updates
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save notification settings
                </Button>
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="display" className="space-y-6">
            <SectionCard
              title="Appearance"
              description="Customize the look and feel of the dashboard"
              icon={<SettingsIcon className="h-5 w-5 text-primary" />}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Theme</h3>
                  <div className="grid gap-2">
                    <RadioGroup defaultValue="system">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system">System</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Density</h3>
                  <div className="grid gap-2">
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="comfortable" />
                        <Label htmlFor="comfortable">Comfortable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="compact" />
                        <Label htmlFor="compact">Compact</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Sidebar</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="sidebarCollapsed" defaultChecked />
                    <Label htmlFor="sidebarCollapsed">
                      Start with sidebar collapsed
                    </Label>
                  </div>
                </div>

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save display settings
                </Button>
              </div>
            </SectionCard>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}