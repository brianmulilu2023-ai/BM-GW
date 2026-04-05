import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    await verifyJwt(token, process.env.JWT_SECRET!);
  } catch {
    redirect('/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      {/* Add forms for profile and projects */}
    </div>
  );
}