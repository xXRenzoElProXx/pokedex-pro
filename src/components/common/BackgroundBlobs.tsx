/** Fondo animado de `design-system.md` (fondo base #120607, glows rojo/naranja,
 *  grid sutil, blobs con blur 100–110px). Vive fijo detrás de toda la app:
 *  header, contenido y footer comparten el mismo fondo, tal como pide el md.
 *  Variante `light` con la misma composición pero sobre parchment y glows
 *  más suaves, para que el fondo acompañe el theme store en vez de taparlo. */
export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:bg-[#120607] light:bg-parchment-100">
      <div
        className="absolute inset-0 dark:block light:hidden"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 15% 10%, rgba(190,18,60,0.35), transparent 60%),' +
            'radial-gradient(ellipse 55% 45% at 85% 25%, rgba(234,88,12,0.22), transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(127,29,29,0.35), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0 light:block dark:hidden"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 15% 10%, rgba(220,38,38,0.10), transparent 60%),' +
            'radial-gradient(ellipse 55% 45% at 85% 25%, rgba(234,88,12,0.08), transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(190,18,60,0.08), transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.15] dark:block light:hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.15] light:block dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />
      <div className="animate-float absolute -left-16 top-8 h-72 w-72 rounded-full blur-[105px] dark:bg-red-700/40 light:bg-red-300/40" />
      <div className="animate-float-slow absolute -right-10 top-48 h-80 w-80 rounded-full blur-[110px] dark:bg-orange-600/25 light:bg-orange-300/25" />
      <div className="animate-pulse-glow absolute bottom-0 left-1/3 h-96 w-96 rounded-full blur-[100px] dark:bg-rose-800/30 light:bg-rose-300/25" />
    </div>
  )
}
