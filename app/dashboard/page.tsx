'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserProfile {
  email?: string;
  name?: string;
  avatar_url?: string;
  metadata?: any;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser({
        email: user.email,
        name: user.user_metadata.name,
        avatar_url: user.user_metadata.avatar_url,
        metadata: user.user_metadata,
      });
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/auth/login');
    } catch (error: any) {
      toast({
        title: 'エラー',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>ダッシュボード</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>{user.name?.[0] ?? user.email?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ユーザー情報</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(user.metadata || {}).map(([key, value]) => (
                key !== 'avatar_url' && (
                  <div key={key} className="space-y-1">
                    <p className="text-sm text-gray-500">{key}</p>
                    <p>{String(value)}</p>
                  </div>
                )
              ))}
            </div>
          </div>

          <Button onClick={handleSignOut} variant="outline">
            ログアウト
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}