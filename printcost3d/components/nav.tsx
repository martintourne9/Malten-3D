import Link from "next/link";
import { signOut } from "@/app/actions/auth";

export function AppNav({ plan }: { plan: string }) {
  return (
    <header className="appbar">
      <Link href="/app" className="brand"><span className="logoMark">P3</span><span>PrintCost 3D</span></Link>
      <nav className="desktopNav">
        <Link href="/app/quote">Cotizar</Link>
        <Link href="/app/history">Historial</Link>
        <Link href="/app/settings">Ajustes</Link>
        <Link href="/app/billing" className="planBadge">{plan.toUpperCase()}</Link>
        <form action={signOut}><button className="linkButton">Salir</button></form>
      </nav>
    </header>
  );
}
