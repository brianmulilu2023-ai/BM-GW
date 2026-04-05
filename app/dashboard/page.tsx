import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    redirect('/login');
  }

  try {
    await verifyJwt(token, jwtSecret);
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