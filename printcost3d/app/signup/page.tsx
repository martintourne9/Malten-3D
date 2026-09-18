import Link from "next/link";
import { signUp } from "@/app/actions/auth";

export default async function Signup({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <main className="authShell"><section className="authCard"><Link href="/" className="brand"><span className="logoMark">P3</span><span>PrintCost 3D</span></Link><div><div className="eyebrow">EMPEZÁ GRATIS</div><h1>Creá tu cuenta</h1><p>Incluye 5 cotizaciones por mes sin tarjeta.</p></div>{params.error && <div className="alert error">{String(params.error)}</div>}<form action={signUp} className="stack"><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Contraseña<input name="password" type="password" minLength={6} required autoComplete="new-password" /></label><button className="primary full">Crear cuenta</button></form><p className="authFoot">¿Ya tenés cuenta? <Link href="/login">Entrar</Link></p></section></main>;
}
