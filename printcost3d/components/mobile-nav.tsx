import Link from "next/link";
export function MobileNav() {
  return <nav className="mobileNav"><Link href="/app">Inicio</Link><Link href="/app/quote">Cotizar</Link><Link href="/app/history">Historial</Link><Link href="/app/settings">Ajustes</Link><Link href="/app/billing">Pro</Link></nav>;
}
