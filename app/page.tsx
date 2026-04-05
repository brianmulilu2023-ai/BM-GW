import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <section id="home" className="relative py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
            <p className="text-lg md:text-xl">Graphic Designer</p>
          </div>
        </section>
        <PortfolioGrid />
        <section id="about" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">About Me</h2>
            <p className="text-center max-w-2xl mx-auto">Bio here.</p>
          </div>
        </section>
        <section id="contact" className="py-12 md:py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Contact</h2>
            <p className="max-w-2xl mx-auto">Get in touch.</p>
          </div>
        </section>
      </main>
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <div className="space-y-2">
            <p><strong>Phone:</strong> 0798 405 726</p>
            <p><strong>Email:</strong> <a href="mailto:brianmulilu2023@gmail.com" className="hover:text-blue-400">brianmulilu2023@gmail.com</a></p>
          </div>
          <p className="mt-4 text-sm">&copy; 2026 BM Graphix. All rights reserved.</p>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}