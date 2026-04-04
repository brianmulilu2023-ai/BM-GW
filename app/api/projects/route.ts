import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET() {
  await dbConnect();
  const projects = await Project.find({});
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const { title, description, images, category, date } = await request.json();
  const project = new Project({ title, description, images, category, date });
  await project.save();
  return NextResponse.json(project, { status: 201 });
}