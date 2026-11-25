// AMBIENTE da mini-VSL — v3 MINIMALISTA (22/11, Marcos: "moderno, minimalista, premium; a beleza não está em purpurina").
// Um fundo só: grafite quase preto com um foco de luz bem suave no terço de cima. Sem orbe, sem feixe, sem poeira, sem grão.
// O tom (noite/quente/frio) só desloca a temperatura do foco em poucos graus: quem carrega o sentido é o OBJETO da cena.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const FrameGlobal = React.createContext<number | null>(null);
export const useFG = () => { const g = React.useContext(FrameGlobal); const f = useCurrentFrame(); return g ?? f; };

export type Tom = "noite" | "quente" | "frio";
const CAMPO: Record<Tom, [string, string]> = { noite: ["#0D0B14", "#08070D"], quente: ["#2B1670", "#150A3A"], frio: ["#15131F", "#0B0A12"] };

export const Grao: React.FC<{ o?: number }> = () => null;

export const Ambiente: React.FC<{ tom?: Tom; base?: string; po?: boolean }> = ({ tom = "noite", base }) => (
  <AbsoluteFill style={{ background: base ?? `linear-gradient(180deg, ${CAMPO[tom][0]} 0%, ${CAMPO[tom][1]} 100%)` }}>
    {/* grade de pontos (some nas bordas): o único "enfeite", e é estrutura */}
    <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px), radial-gradient(rgba(255,255,255,.22) 1.6px, rgba(255,255,255,0) 1.8px)", backgroundSize: "90px 90px, 90px 90px, 90px 90px", backgroundPosition: "0 0, 0 0, -45px -45px", WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 38%, #000 0%, rgba(0,0,0,0) 100%)", maskImage: "radial-gradient(ellipse 75% 55% at 50% 38%, #000 0%, rgba(0,0,0,0) 100%)" }} />
  </AbsoluteFill>
);

// objeto apoiado no espaço: um balanço mínimo (2,5 px, 0,8°), só pra não ficar morto. Nada de inclinação de vitrine.
export const Flutua: React.FC<{ amp?: number; tilt?: number; fase?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ fase = 0, style, children }) => {
  const f = useFG() + fase;
  return (
    <div style={{ perspective: 2400, ...style }}>
      <div style={{ transform: `translateY(${Math.sin(f / 41) * 2.5}px) rotateY(${Math.sin(f / 67) * 0.8}deg)` }}>{children}</div>
    </div>
  );
};
export const Brilho: React.FC<{ fase?: number; forca?: number; periodo?: number }> = () => null;

// acento ÚNICO, em cor sólida (regra da VidroZap v2: cores sólidas). Os nomes GRAD_* ficam por compatibilidade.
export const OURO = "#9D7BFF";
export const GRAD_OURO = OURO;
export const GRAD_BRASA = "#F0913E";
export const GRAD_FRIO = "#8FB4E3";
