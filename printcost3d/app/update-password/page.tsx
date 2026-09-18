import { updatePassword } from "@/app/actions/auth";

export default async function UpdatePassword({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  return <main className="authShell"><section className="authCard"><div className="brand"><span className="logoMark">P3</span><span>PrintCost 3D</span></div><div><div className="eyebrow">NUEVA CONTRASEÑA</div><h1>Elegí una nueva clave</h1><p>Usá al menos 8 caracteres.</p></div>{params.error && <div className="alert error">{String(params.error)}</div>}<form action={updatePassword} className="stack"><label>Nueva contraseña<input name="password" type="password" minLength={8} required autoComplete="new-password" /></label><button className="primary full">Guardar contraseña</button></form></section></main>;
}
