import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <section id="home" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
            <p className="text-xl">Graphic Designer</p>
          </div>
        </section>
        <PortfolioGrid />
        <section id="about" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
            <p>Bio here.</p>
          </div>
        </section>
        <section id="contact" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Contact</h2>
            <p>Get in touch.</p>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </div>
  );
}