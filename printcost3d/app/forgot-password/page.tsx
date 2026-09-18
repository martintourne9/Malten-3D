import Link from "next/link";
import { requestPasswordReset } from "@/app/actions/auth";

export default async function ForgotPassword({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <main className="authShell"><section className="authCard"><Link href="/" className="brand"><span className="logoMark">P3</span><span>PrintCost 3D</span></Link><div><div className="eyebrow">RECUPERAR ACCESO</div><h1>Restablecé tu contraseña</h1><p>Te enviamos un enlace seguro al correo de tu cuenta.</p></div>{params.error && <div className="alert error">{String(params.error)}</div>}{params.sent && <div className="alert ok">Revisá tu email y abrí el enlace de recuperación.</div>}<form action={requestPasswordReset} className="stack"><label>Email<input name="email" type="email" required autoComplete="email" /></label><button className="primary full">Enviar enlace</button></form><p className="authFoot"><Link href="/login">Volver al inicio de sesión</Link></p></section></main>;
}
