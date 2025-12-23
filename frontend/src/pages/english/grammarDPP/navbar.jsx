export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 
      bg-white/80 backdrop-blur-md border-b border-gray-200"
    >
      <div
        className="h-14 max-w-7xl mx-auto px-6 
        flex items-center justify-between"
      >
        {/* App Title */}
        <h1
          className="text-xl font-bold tracking-tight 
          text-gray-900"
        >
          English<span className="text-blue-600"> Practice Book</span>
        </h1>

        {/* Right side (future use) */}
        <div className="flex items-center gap-4">
          {/* placeholder for profile / button */}
        </div>
      </div>
    </nav>
  );
}
