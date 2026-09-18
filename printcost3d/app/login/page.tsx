import Link from "next/link";
import { signIn } from "@/app/actions/auth";

export default async function Login({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  return <main className="authShell"><section className="authCard"><Link href="/" className="brand"><span className="logoMark">P3</span><span>PrintCost 3D</span></Link><div><div className="eyebrow">BIENVENIDO</div><h1>Entrá a tu taller</h1><p>Tu historial y configuraciones quedan sincronizados en la nube.</p></div>{params.error && <div className="alert error">{String(params.error)}</div>}{params.message && <div className="alert ok">{String(params.message)}</div>}<form action={signIn} className="stack"><label>Email<input name="email" type="email" required autoComplete="email" /></label><label>Contraseña<input name="password" type="password" minLength={6} required autoComplete="current-password" /></label><div style={{textAlign:"right",fontSize:13}}><Link href="/forgot-password">¿Olvidaste tu contraseña?</Link></div><button className="primary full">Entrar</button></form><p className="authFoot">¿No tenés cuenta? <Link href="/signup">Crear una gratis</Link></p></section></main>;
}
