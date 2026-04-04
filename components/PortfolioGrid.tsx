'use client';

import { useEffect, useState } from 'react';

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  date: string;
}

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjects);
  }, []);

  return (
    <section id="portfolio" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project._id} className="bg-white shadow rounded p-4">
              <img src={project.images[0]} alt={project.title} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p>{project.description}</p>
              <p className="text-sm text-gray-500">{project.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}