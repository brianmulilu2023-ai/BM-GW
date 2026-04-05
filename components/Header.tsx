export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="BM Graphix logo" className="h-10 md:h-12 w-auto" />
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-slate-500">Creative agency</p>
            <h1 className="text-lg md:text-xl font-bold text-slate-900">BM Graphix</h1>
          </div>
        </div>
        <ul className="hidden md:flex space-x-4 text-slate-700">
          <li><a href="#home">Home</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        {/* Mobile menu button - placeholder for future hamburger */}
        <button className="md:hidden text-slate-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}