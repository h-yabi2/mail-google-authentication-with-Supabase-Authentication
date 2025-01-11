import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>認証アプリケーション</CardTitle>
          <CardDescription>
            メールアドレスまたはGoogleアカウントでログインしてください。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Link href="/auth/login" className="block">
            <Button className="w-full h-11 text-base">ログイン</Button>
          </Link>
          <Link href="/auth/register" className="block">
            <Button variant="outline" className="w-full h-11 text-base">
              新規登録
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}