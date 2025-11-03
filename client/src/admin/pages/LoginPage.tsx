import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  const { mutate: loginUser, isPending: isLoading } = useMutation({
    mutationFn: (credentials: { email: string, password: string }) => {
      // <<-- اصلاح نهایی اینجاست: /api اضافی حذف شد -->>
      // چون VITE_API_URL شما خودش /api را دارد
      return axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials);
    },

    onSuccess: (response) => {
      toast.success("Login successful! Redirecting...");
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/admin'); 
    },

    onError: (error: any) => { 
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        toast.error("Please enter both email and password.");
        return;
    }
    loginUser({ email, password });
  };

  return (
    // JSX بدون تغییر باقی می‌ماند ...
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
              <LogIn className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;