"use client";

import { useState } from "react";
import { AlertCircle, Check, Info, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExamplesPage() {
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (type: "default" | "success" | "info" | "warning" | "error") => {
    switch (type) {
      case "success":
        toast.success("Operation completed successfully", {
          description: "Your changes have been saved.",
          icon: <Check className="h-4 w-4" />,
        });
        break;
      case "info":
        toast.info("Did you know?", {
          description: "You can customize these notifications.",
          icon: <Info className="h-4 w-4" />,
        });
        break;
      case "warning":
        toast.warning("Please review", {
          description: "Some fields require your attention.",
          icon: <AlertCircle className="h-4 w-4" />,
        });
        break;
      case "error":
        toast.error("An error occurred", {
          description: "Please try again later.",
          icon: <X className="h-4 w-4" />,
        });
        break;
      default:
        toast("Default notification", {
          description: "This is a default toast message.",
        });
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Item deleted successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Component Examples</h2>
        <p className="text-muted-foreground">
          Examples of modals and notifications
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Modal Examples</CardTitle>
            <CardDescription>
              Different types of modal dialogs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john@example.com" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => showToast("success")}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Item
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>
              Different types of toast notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => showToast("default")}>
                Default Toast
              </Button>
              <Button
                variant="link"
                onClick={() => showToast("success")}
              >
                Success Toast
              </Button>
              <Button
                variant="outline"
                onClick={() => showToast("info")}
              >
                Info Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() => showToast("warning")}
              >
                Warning Toast
              </Button>
              <Button
                variant="destructive"
                className="col-span-2"
                onClick={() => showToast("error")}
              >
                Error Toast
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}