'use client';

import { FormEvent, useState } from 'react';

export default function ProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const imageUrls = images
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          category,
          images: imageUrls,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Project upload failed');
      }

      setTitle('');
      setDescription('');
      setCategory('');
      setImages('');
      setDate(new Date().toISOString().slice(0, 10));
      setStatus('Project uploaded successfully.');
    } catch (error) {
      setStatus('Unable to upload project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Add a New Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
          <input
            value={images}
            onChange={e => setImages(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            required
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Project'}
        </button>

        {status ? (
          <p className="text-sm text-gray-700">{status}</p>
        ) : null}
      </form>
    </div>
  );
}
