export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="BM Graphix logo" className="h-12 w-auto" />
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Creative agency</p>
            <h1 className="text-xl font-bold text-slate-900">BM Graphix</h1>
          </div>
        </div>
        <ul className="flex space-x-4 text-slate-700">
          <li><a href="#home">Home</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}