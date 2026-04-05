import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/lib/jwt';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  await dbConnect();

  const { username, password } = await request.json();

  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await signJwt({ userId: user._id }, process.env.JWT_SECRET!, '1h');

  return NextResponse.json({ token });
}