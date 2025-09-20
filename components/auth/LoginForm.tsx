// src/components/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/loginSchema";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/auth";

// Import shadcn/ui Form components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginForm() {
  // 1. Initialize the form using useForm, this now holds all form state
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isError, error } = useLogin();
  const router = useRouter();

  // The onSubmit function receives validated data from react-hook-form
  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("/dashboard");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Heavy Equipment Inspection
          </CardTitle>
          <CardDescription>
            Sign in to access the inspection system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 2. Wrap the form in the <Form> component */}
          <Form {...form}>
            {/* 3. Use form.handleSubmit in the onSubmit handler */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* 4. Use FormField for each input to connect it to react-hook-form state */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      {/* We spread the `field` object to pass down props like onChange, onBlur, value */}
                      <Input
                        type="email"
                        placeholder="Enter your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />{" "}
                    {/* Displays validation errors for this field */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 5. Display mutation error if it exists */}
              {isError && (
                <Alert variant="destructive">
                  {/* Assuming the error object has a message property */}
                  <AlertDescription>{error.message}</AlertDescription>
                </Alert>
              )}

              {/* 6. Use `isPending` from the mutation for loading state */}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Demo Accounts:</p>
            <div className="space-y-1">
              <p>
                <strong>Mechanic:</strong> mechanic1 / password123
              </p>
              <p>
                <strong>Leader:</strong> leader1 / password123
              </p>
              <p>
                <strong>Admin:</strong> admin1 / password123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
