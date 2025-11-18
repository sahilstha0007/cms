import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
        <Link href="/" className="text-2xl font-bold">
          MyBrand
        </Link>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground font-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </nav>

      <main className="p-8">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Hellooo?
        </p>
      </main>
    </div>
  );
}
