// Sistema visual da VSL "The Netflix Trick" (espanhol pra americanos, faceless: voz + motion + cenas reais). 1080x1920.
// Base = sistema da mini-VSL Leve Ela (v6, aprovado): campos chapados, Geist + Geist Mono, UM acento solido.
// 23/11 (Marcos): acento ROXO da Fluency (#9D7BFF em texto, #6D3FF2 em campo chapado) + BRANCO; certo = branco/verde discreto; errado = cinza riscado.
// Regras da casa: 1 ideia por quadro, so entrada (sem fade-out), texto >= 36 px, nada entra antes da palavra, sem emoji,
// o que e dito em sequencia TROCA no mesmo lugar (Slot), nunca acumula.
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing, Img, staticFile, AbsoluteFill } from "remotion";
import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { WORDS } from "./words";

const geist = loadGeist("normal", { weights: ["500", "600", "700", "800"], subsets: ["latin", "latin-ext"] });
const mono = loadMono("normal", { weights: ["500", "600"], subsets: ["latin", "latin-ext"] });
const inter = loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"] });

// Geist (títulos e corpo) + Geist Mono (rótulos, horas, números de sistema). Inter só dentro do WhatsApp recriado. Sem serifa.
export const FONTE = { tit: geist.fontFamily, sans: geist.fontFamily, serif: geist.fontFamily, mono: mono.fontFamily, ui: inter.fontFamily };
export const W = 1080;
export const H = 1920;

export const C = {
  noite: "#07080A",
  carvao: "#17151A",
  carvao2: "#221F26",
  linha: "rgba(255,255,255,.14)",
  creme: "#F5F6F7",
  creme2: "#A7ABB3",
  ouro: "var(--ac)", // acento: #9D7BFF no escuro, #6D3FF2 no branco (definido pela Tela)
  ouroEsc: "#6D3FF2",
  brasa: "#DCD0FF",
  nao: "#8B9099",
  frio: "#7FB0F5",
  sim: "#2FE27C",
  papel: "#15171C",
  tinta: "#F3F4F6",
  waVerde: "#D9FDD3",
  waFundo: "#EFE7DE",
};
export const FUNDO = `radial-gradient(120% 80% at 50% 28%, #1E1A1F 0%, #100E12 55%, ${C.noite} 100%)`;
export const FUNDO_QUENTE = `radial-gradient(120% 80% at 50% 30%, #3A2313 0%, #1B120C 55%, ${C.noite} 100%)`;
export const FUNDO_VERDE = "#6D3FF2"; // campo de ACENTO chapado (texto escuro por cima): só nas frases-martelo e no preço
export const FUNDO_FRIO = `radial-gradient(120% 80% at 50% 30%, #17212E 0%, #0E1219 55%, ${C.noite} 100%)`;

export const easeOut = Easing.out(Easing.cubic);
// CAMPO BRANCO: a Tela liga este contexto; tx(cor) troca branco/creme por tinta escura e cinza claro por cinza escuro.
export const ClaroCtx = React.createContext(false);
export const TINTA = "#14111F", TINTA2 = "#6A667C";
export const useTx = () => {
  const claro = React.useContext(ClaroCtx);
  const tx = (c?: string) => (!claro || !c ? c : c === "#fff" || c === "#FFF" || c === "#ffffff" || c === C.creme || c === C.tinta ? TINTA : c === C.creme2 || c === "#8B9099" || c === "#C9CCD4" ? TINTA2 : c);
  return { claro, tx, tinta: claro ? TINTA : "#fff", suave: claro ? TINTA2 : "#8B9099", painel: claro ? "#FFFFFF" : "#15171C", fio: claro ? "rgba(20,17,31,.12)" : "rgba(255,255,255,.14)", trilho: claro ? "rgba(20,17,31,.1)" : "rgba(255,255,255,.12)", sombra: claro ? "0 30px 60px -30px rgba(40,20,110,.35)" : "none" };
};
import { VEL as VEL_, CORTES, INS } from "./cortes";
import { Ambiente, Flutua, Brilho, Grao, useFG, GRAD_OURO, GRAD_BRASA, GRAD_FRIO, Tom } from "./ambiente";
export { Ambiente, Flutua, Brilho, Grao };
export const VEL = VEL_;
// MAPA DE TEMPO: tudo no código é segundo da voz ORIGINAL; a composição toca a voz com os silêncios longos cortados e a VEL×.
// mapa(s) = segundo original → segundo do vídeo final · inv(t) = o contrário.
// removido(s) = segundos de silencio cortados ate s. O trecho do ALUNO (INS) toca a 1x e sem corte.
const rem = (s: number) => { let r = 0; for (const [a, b] of CORTES) { if (s >= b) r += b - a; else if (s > a) { r += s - a; break; } else break; } return r; };
const BASE_A = (INS[0] - rem(INS[0])) / VEL_;
export const mapa = (s: number) => { if (s <= INS[0]) return (s - rem(s)) / VEL_; if (s <= INS[1]) return BASE_A + (s - INS[0]); return BASE_A + (INS[1] - INS[0]) + (s - INS[1] - (rem(s) - rem(INS[0]))) / VEL_; };
export const inv = (t: number) => { let lo = 0, hi = 4000; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (mapa(m) < t) lo = m; else hi = m; } return hi; };
export type CP = { de: number };

// ── tempo: segundos da VOZ → frame local da cena ──
export const useNa = (de: number) => {
  const { fps } = useVideoConfig();
  return (s: number) => Math.round((mapa(s) - mapa(de)) * fps);
};
// segundo da voz no frame atual (pra coisas contínuas: relógio, rolagem)
export const useT = (de: number) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return inv(mapa(de) + f / fps);
};
const limpa = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
export const pal = (palavra: string, perto: number, fim = false): number => {
  const alvo = limpa(palavra);
  let best: [number, number, string] | null = null;
  let dist = Infinity;
  for (const w of WORDS) {
    if (limpa(w[2]) !== alvo) continue;
    const d = Math.abs(w[0] - perto);
    if (d < dist) { dist = d; best = w; }
  }
  if (!best || dist > 5) throw new Error(`palavra "${palavra}" não achada perto de ${perto}s`);
  return fim ? best[1] : best[0];
};

export const useP = (d: number, dur = 12) => {
  const f = useCurrentFrame();
  return interpolate(f - d, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut });
};
export const useSpr = (d: number, cfg = { damping: 14, stiffness: 150, mass: 0.7 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - d, fps, config: cfg });
};
export const useLin = (d: number, dur: number) => {
  const f = useCurrentFrame();
  return interpolate(f - d, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};
export const useOn = (d: number) => useCurrentFrame() >= d;

// ── entradas ──
export const Reveal: React.FC<{ d: number; y?: number; x?: number; dur?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ d, y = 22, x = 0, dur = 8, style, children }) => {
  const p = useP(d, dur);
  const f = useCurrentFrame();
  if (f < d) return null;
  return <div style={{ opacity: p, transform: `translate(${(1 - p) * x}px, ${(1 - p) * y}px)`, ...style }}>{children}</div>;
};
export const Pop: React.FC<{ d: number; from?: number; damp?: number; rot?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ d, from = 0.7, damp = 13, rot = 0, style, children }) => {
  const s = useSpr(d, { damping: damp, stiffness: 190, mass: 0.6 });
  const p = useP(d, 5);
  const f = useCurrentFrame();
  if (f < d) return null;
  return <div style={{ opacity: p, transform: `scale(${interpolate(s, [0, 1], [from, 1])}) rotate(${(1 - s) * rot}deg)`, ...style }}>{children}</div>;
};
// Slot: o que é dito em sequência TROCA no mesmo lugar. itens = [frame, nó]; mostra o último cujo frame já passou.
export const Slot: React.FC<{ itens: [number, React.ReactNode][]; from?: number; style?: React.CSSProperties }> = ({ itens, from = 0.86, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let i = -1;
  itens.forEach(([d], k) => { if (f >= d) i = k; });
  if (i < 0) return null;
  const d = itens[i][0];
  const s = spring({ frame: f - d, fps, config: { damping: 14, stiffness: 210, mass: 0.6 } });
  const p = interpolate(f - d, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div key={i} style={{ opacity: p, transform: `translateY(${(1 - s) * 22}px) scale(${interpolate(s, [0, 1], [Math.max(from, 0.94), 1])})`, ...style }}>{itens[i][1]}</div>;
};

// ── tipografia ──
type TP = { size?: number; cor?: string; align?: React.CSSProperties["textAlign"]; style?: React.CSSProperties; children: React.ReactNode };
const metal = (cor: string): React.CSSProperties => ({ color: cor });
export const Titulo: React.FC<TP & { peso?: number }> = ({ size = 110, cor = C.creme, align = "center", peso = 700, style, children }) => { const { tx } = useTx(); cor = tx(cor)!; return (
  <div style={{ fontFamily: FONTE.tit, fontWeight: peso, fontSize: size * 0.94, lineHeight: 1.03, letterSpacing: -size * 0.042, textAlign: align, textWrap: "balance", ...metal(cor), ...style } as React.CSSProperties}>{children}</div>
); };
export const Corpo: React.FC<TP & { peso?: number }> = ({ size = 50, cor = C.creme2, peso = 600, align = "center", style, children }) => { const { tx } = useTx(); cor = tx(cor)!; return (
  <div style={{ fontFamily: FONTE.sans, fontWeight: peso, fontSize: size, lineHeight: 1.2, color: cor, textAlign: align, textWrap: "balance", ...style } as React.CSSProperties}>{children}</div>
); };
// a voz dela / o romance / a frase que dói: serifada itálica
export const Serifa: React.FC<TP & { it?: boolean }> = ({ size = 120, cor = C.creme, align = "center", it = true, style, children }) => (
  <div style={{ fontFamily: FONTE.sans, fontWeight: 500, fontSize: size * 0.78, lineHeight: 1.1, letterSpacing: -size * 0.03, textAlign: align, textWrap: "balance", color: cor, ...style } as React.CSSProperties}>{children}</div>
);
export const Rotulo: React.FC<{ cor?: string; size?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ cor = C.creme2, size = 36, style, children }) => { const { tx } = useTx(); cor = tx(cor)!; return (
  <div style={{ fontFamily: FONTE.mono, fontWeight: 500, fontSize: Math.max(40, size * 1.12), letterSpacing: size * 0.1, textTransform: "uppercase", color: cor, textAlign: "center", ...style }}>{children}</div>
); };
export const Ouro: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.ouro }}>{children}</span>;

// risco que atravessa (o "não")
export const Risco: React.FC<{ d: number; dur?: number; cor?: string; h?: number; rot?: number; style?: React.CSSProperties }> = ({ d, dur = 8, cor = C.nao, h = 12, rot = -4, style }) => {
  const p = useLin(d, dur);
  return <div style={{ position: "absolute", left: "-4%", right: "-4%", top: "50%", height: h, marginTop: -h / 2, background: cor, borderRadius: h, transform: `rotate(${rot}deg) scaleX(${p})`, transformOrigin: "left center", boxShadow: "0 4px 18px rgba(0,0,0,.5)", ...style }} />;
};
export const Xis: React.FC<{ d: number; size?: number; cor?: string; grossura?: number; style?: React.CSSProperties }> = ({ d, size = 200, cor = C.nao, grossura = 20, style }) => {
  const a = useLin(d, 6), b = useLin(d + 5, 6);
  const L = size * 1.5;
  return (
    <svg width={size} height={size} style={{ overflow: "visible", filter: "drop-shadow(0 6px 14px rgba(0,0,0,.55))", ...style }}>
      <path d={`M${size * 0.08},${size * 0.1} L${size * 0.92},${size * 0.9}`} style={{ stroke: cor }} strokeWidth={grossura} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - a)} />
      <path d={`M${size * 0.9},${size * 0.08} L${size * 0.1},${size * 0.92}`} style={{ stroke: cor }} strokeWidth={grossura} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - b)} />
    </svg>
  );
};
export const Visto: React.FC<{ d: number; size?: number; cor?: string; grossura?: number; style?: React.CSSProperties }> = ({ d, size = 70, cor = C.sim, grossura = 10, style }) => {
  const p = useLin(d, 8);
  const L = size * 2;
  return (
    <svg width={size} height={size} style={{ overflow: "visible", ...style }}>
      <path d={`M${size * 0.08},${size * 0.55} L${size * 0.4},${size * 0.85} L${size * 0.95},${size * 0.1}`} fill="none" style={{ stroke: cor }} strokeWidth={grossura} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={L} strokeDashoffset={L * (1 - p)} />
    </svg>
  );
};
// traço que se desenha (path em px do pai)
export const Traco: React.FC<{ d: number; path: string; dur?: number; cor?: string; w?: number; len?: number; dash?: string; style?: React.CSSProperties }> = ({ d, path, dur = 14, cor = C.ouro, w = 8, len = 3000, style }) => {
  const p = useLin(d, dur);
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, overflow: "visible", ...style }}>
      <path d={path} fill="none" style={{ stroke: cor }} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} />
    </svg>
  );
};
export const Seta: React.FC<{ d: number; x1: number; y1: number; x2: number; y2: number; curva?: number; cor?: string; grossura?: number; dur?: number }> = ({ d, x1, y1, x2, y2, curva = 0.2, cor = C.ouro, grossura = 9, dur = 12 }) => {
  const p = useLin(d, dur);
  const pc = useLin(d + dur - 2, 5);
  const mx = (x1 + x2) / 2 - (y2 - y1) * curva, my = (y1 + y2) / 2 + (x2 - x1) * curva;
  const L = Math.hypot(x2 - x1, y2 - y1) * 1.3;
  const ang = Math.atan2(y2 - my, x2 - mx);
  const a = 34;
  const p1 = [x2 - a * Math.cos(ang - 0.5), y2 - a * Math.sin(ang - 0.5)];
  const p2 = [x2 - a * Math.cos(ang + 0.5), y2 - a * Math.sin(ang + 0.5)];
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, width: 1, height: 1, overflow: "visible" }}>
      <path d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} fill="none" style={{ stroke: cor }} strokeWidth={grossura} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - p)} />
      <path d={`M${p1[0]},${p1[1]} L${x2},${y2} L${p2[0]},${p2[1]}`} fill="none" style={{ stroke: cor }} strokeWidth={grossura} strokeLinecap="round" strokeLinejoin="round" opacity={pc} />
    </svg>
  );
};

// ── números ──
export const fmtBR = (n: number, dec = 0) => n.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
export const Conta: React.FC<{ ate: number; de?: number; d: number; dur?: number; prefixo?: string; sufixo?: string; dec?: number }> = ({ ate, de = 0, d, dur = 24, prefixo = "", sufixo = "", dec = 0 }) => {
  const p = useP(d, dur);
  return <>{prefixo}{fmtBR(de + (ate - de) * p, dec)}{sufixo}</>;
};

// ── b-roll: foto com Ken Burns + grade de cinema (a foto vira plano de filme) ──
export const Foto: React.FC<{ src: string; zoom?: [number, number]; pos?: [string, string]; dur?: number; escurece?: number; topo?: number; style?: React.CSSProperties }> = ({ src, zoom = [1.06, 1.2], pos = ["50%", "40%"], dur = 300, escurece = 0.75, topo = 0.35, style }) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, dur], zoom, { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000", ...style }}>
      <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: `${pos[0]} ${pos[1]}`, transform: `scale(${k})`, transformOrigin: `${pos[0]} ${pos[1]}`, filter: "contrast(1.06) saturate(.92)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(9,10,12,${topo}) 0%, rgba(9,10,12,0) 28%, rgba(9,10,12,0) 48%, rgba(9,10,12,${escurece}) 78%, rgba(9,10,12,${Math.min(1, escurece + 0.2)}) 100%)` }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 260px 60px rgba(0,0,0,.55)" }} />
    </AbsoluteFill>
  );
};
// polaroid/cartão de foto (objeto que cai na mesa e pode ser riscado)
export const Cartao: React.FC<{ src: string; w?: number; h?: number; rot?: number; pos?: string; legenda?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ src, w = 760, h = 760, rot = -2, pos = "50% 50%", legenda, style, children }) => (
  <div style={{ position: "relative", width: w, background: C.papel, border: "1.5px solid rgba(255,255,255,.14)", padding: 22, paddingBottom: legenda ? 0 : 22, borderRadius: 10, transform: `rotate(${rot}deg)`, boxShadow: "0 40px 90px -20px rgba(0,0,0,.85), 0 2px 4px rgba(0,0,0,.4)", ...style }}>
    <div style={{ position: "relative", width: "100%", height: h, overflow: "hidden", borderRadius: 4, background: "#222" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} />
    </div>
    {legenda && <div style={{ fontFamily: FONTE.sans, fontWeight: 500, fontSize: 64, color: C.tinta, textAlign: "center", padding: "14px 0 20px", lineHeight: 1 }}>{legenda}</div>}
    {children}
  </div>
);

// "Celular" = RECORTE da tela (sem moldura, sem ilha, sem barra de status): a moldura desenhada era mais larga e baixa que
// um aparelho real e deixava a conversa com cara de falsa. A tela é desenhada em 1080 de largura (390 pt) e escalada.
export const Celular: React.FC<{ w?: number; h?: number; seco?: boolean; style?: React.CSSProperties; children?: React.ReactNode }> = ({ w = 800, seco = false, style, children }) => {
  // iPhone em PROPORÇÃO REAL: tela 393 x 852 pt, borda preta fina, aro de titânio, cantos de 14 % da largura da tela.
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const aro = w * 0.006, borda = w * 0.017;
  const tw = w - 2 * (aro + borda), th = tw * 852 / 393;
  const alt = th + 2 * (aro + borda);
  const k = tw / 1080;
  const rt = tw * 0.14;
  const e = seco ? 1 : spring({ frame: f, fps, config: { damping: 18, stiffness: 110, mass: 0.8 } });
  const bt = (lado: "left" | "right", top: number, h: number) => <div style={{ position: "absolute", [lado]: -w * 0.004, top: alt * top, width: w * 0.008, height: alt * h, borderRadius: w * 0.004, background: "linear-gradient(90deg,#2a2a2d,#5a5a5f,#2a2a2d)" }} />;
  return (
    <div style={{ position: "relative", width: w, height: alt, transform: `translateY(${(1 - e) * 90}px)`, opacity: Math.min(1, e * 1.6), ...style }}>
      {bt("left", 0.165, 0.035)}{bt("left", 0.235, 0.062)}{bt("left", 0.315, 0.062)}{bt("right", 0.27, 0.1)}
      <div style={{ position: "absolute", inset: 0, boxSizing: "border-box", borderRadius: rt + aro + borda, padding: aro, background: "linear-gradient(140deg,#7b7b80 0%,#3a3a3d 22%,#232325 55%,#5d5d62 100%)", boxShadow: "0 60px 120px -36px rgba(0,0,0,.95), 0 0 0 1px rgba(0,0,0,.6)" }}>
        <div style={{ width: "100%", height: "100%", boxSizing: "border-box", borderRadius: rt + borda, background: "#000", padding: borda }}>
          <div style={{ position: "relative", width: tw, height: th, borderRadius: rt, overflow: "hidden", background: "#000" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: th / k, transform: `scale(${k})`, transformOrigin: "0 0" }}>{children}</div>
            {/* 25/11 iPhone ultrarrealista (Marcos): Dynamic Island + reflexo diagonal do vidro + brilho fino na borda da tela */}
            <div style={{ position: "absolute", left: "50%", top: tw * 0.028, width: tw * 0.31, height: tw * 0.092, marginLeft: -tw * 0.155, borderRadius: tw * 0.05, background: "#000", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.04)" }}><div style={{ position: "absolute", right: tw * 0.03, top: "50%", width: tw * 0.032, height: tw * 0.032, marginTop: -tw * 0.016, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #2a3550, #0a0d16 70%)" }} /></div>
            <div style={{ position: "absolute", inset: 0, borderRadius: rt, pointerEvents: "none", background: "linear-gradient(115deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.05) 22%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 70%, rgba(255,255,255,.06) 100%)", boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.08)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// pessoa nos diagramas = um NÓ (anel + ponto + rótulo mono), nunca boneco
export const Pessoa: React.FC<{ cor?: string; size?: number; ela?: boolean; style?: React.CSSProperties; rotulo?: string }> = ({ cor = C.creme, size = 200, style, rotulo }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.1, width: size, ...style }}>
    <div style={{ width: size, height: size * 1.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: size * 0.56, height: size * 0.56, borderRadius: "50%", border: `${Math.max(3, size * 0.022)}px solid ${cor}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${size * 0.3}px -${size * 0.08}px ${cor}` }}>
        <div style={{ width: size * 0.2, height: size * 0.2, borderRadius: "50%", background: cor }} />
      </div>
    </div>
    {rotulo && <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 38, letterSpacing: 6, textTransform: "uppercase", color: cor }}>{rotulo}</div>}
  </div>
);

// termômetro do casamento (o mesmo do quiz): congelado · frio · morno · quente
export const NIVEIS = ["CONGELADO", "FRIO", "MORNO", "QUENTE"] as const;
export const corNivel = (v: number) => (v < 0.3 ? C.frio : v < 0.55 ? "#9CC3D9" : v < 0.78 ? C.ouro : C.brasa);
export const Termometro: React.FC<{ v: number; h?: number; rotulos?: boolean; style?: React.CSSProperties }> = ({ v, h = 900, rotulos = true, style }) => {
  const cor = corNivel(v);
  const tubo = h - 190;
  return (
    <div style={{ position: "relative", width: rotulos ? 620 : 190, height: h, ...style }}>
      <div style={{ position: "absolute", left: 55, top: 0, width: 80, height: tubo + 40, borderRadius: 40, background: "rgba(255,255,255,.07)", border: `5px solid ${C.linha}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${8 + v * 92}%`, background: cor }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: tubo, width: 190, height: 190, borderRadius: 95, background: cor }} />
      {rotulos && NIVEIS.map((n, i) => {
        const on = Math.min(3, Math.floor(v * 4)) === i;
        return (
          <div key={n} style={{ position: "absolute", left: 190, top: tubo * (1 - (i + 0.5) / 4) - 30, display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 44, height: 6, background: on ? cor : C.linha, borderRadius: 3 }} />
            <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: on ? 72 : 50, letterSpacing: -1, color: on ? cor : "rgba(255,255,255,.32)" }}>{n}</div>
          </div>
        );
      })}
    </div>
  );
};

// interruptor (ligado/desligado) — o "botão" do desejo
export const Chave: React.FC<{ on: number; w?: number; corOn?: string; style?: React.CSSProperties }> = ({ on, w = 420, corOn = C.ouro, style }) => {
  const h = w * 0.5;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: h, background: on > 0.5 ? corOn : "#3A3648", border: `6px solid ${on > 0.5 ? corOn : "rgba(120,110,150,.5)"}`, boxShadow: "inset 0 6px 18px rgba(0,0,0,.35)", ...style }}>
      <div style={{ position: "absolute", top: h * 0.07, left: h * 0.07 + on * (w - h - 12), width: h * 0.86 - 12, height: h * 0.86 - 12, borderRadius: h, background: on > 0.5 ? "#fff" : "#8C8792", boxShadow: "0 10px 26px rgba(0,0,0,.5)" }} />
    </div>
  );
};

// ícones de traço (sem emoji)
const PATH: Record<string, string> = {
  lupa: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM16 16l5 5",
  olho: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  play: "M7 4.5v15l13-7.5z",
  livro: "M3 5.5C6 4 9 4 12 6c3-2 6-2 9-.5V19c-3-1.5-6-1.5-9 .5-3-2-6-2-9-.5zM12 6v13.5",
  cadeado: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM12 15v3",
  relogio: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6.5V12l3.5 2.5",
  presente: "M4 11h16v10H4zM2.5 7h19v4h-19zM12 7v14M12 7c-1.5-4-6-4-6-1.5S10 7 12 7zM12 7c1.5-4 6-4 6-1.5S14 7 12 7z",
  carta: "M3 6h18v13H3zM3 7l9 7 9-7",
  coracao: "M12 20.5s-8-5-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 6-8 11-8 11z",
  chama: "M12 22c4.4 0 7-3 7-6.8 0-3.4-2.2-5.4-3.3-7.6-.6 1.6-1.5 2.4-2.6 2.9C13.6 7 12.6 4 10 2c.3 3.4-4.9 6.2-4.9 12.6C5.1 19 7.6 22 12 22z",
  casa: "M3 11.5 12 4l9 7.5M5.5 10v10h13V10M10 20v-6h4v6",
  porta: "M6 21V3.5h12V21M3 21h18M14.5 12.5h0",
  escudo: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  copiar: "M9 9h11v12H9zM5 15H4V3h11v2",
  enviar: "M3 11.5 21 3l-7 18-3-7.5z",
  seta: "M5 12h14M13 6l6 6-6 6",
  espelho: "M12 15.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM12 15.5V22M8.5 22h7",
};
export const Icone: React.FC<{ n: string; size?: number; cor?: string; sw?: number; fill?: string; style?: React.CSSProperties }> = ({ n, size = 64, cor = C.creme, sw = 1.7, fill = "none", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={cor} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}><path d={PATH[n] || ""} /></svg>
);

// tela base das cenas de gráfico
export const Tela: React.FC<{ fundo?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ fundo = FUNDO, children, style }) => {
  const claro = fundo === FUNDO_FRIO;
  const tom: Tom = fundo === FUNDO_QUENTE ? "quente" : "noite";
  const cru = fundo !== FUNDO && fundo !== FUNDO_QUENTE && fundo !== FUNDO_FRIO;
  return (
    <ClaroCtx.Provider value={claro}>
      <AbsoluteFill style={{ ["--ac" as string]: claro ? "#6D3FF2" : "#9D7BFF", ["--tx" as string]: claro ? TINTA : "#fff", ["--tx2" as string]: claro ? TINTA2 : "#C9CCD4", ["--tr" as string]: claro ? "rgba(20,17,31,.12)" : "rgba(255,255,255,.16)", ["--pn" as string]: claro ? "#FFFFFF" : "#15171C", ...style } as React.CSSProperties}>
        {claro ? (
          <AbsoluteFill style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F3F1FA 100%)" }}>
            <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(60,40,140,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(60,40,140,.07) 1px, transparent 1px), radial-gradient(rgba(60,40,140,.32) 1.6px, rgba(60,40,140,0) 1.8px)", backgroundSize: "90px 90px, 90px 90px, 90px 90px", backgroundPosition: "0 0, 0 0, -45px -45px", WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 38%, #000 0%, rgba(0,0,0,0) 100%)", maskImage: "radial-gradient(ellipse 75% 55% at 50% 38%, #000 0%, rgba(0,0,0,0) 100%)" }} />
          </AbsoluteFill>
        ) : cru ? <AbsoluteFill style={{ background: fundo }}><Grao /></AbsoluteFill> : <Ambiente tom={tom} />}
        {children}
      </AbsoluteFill>
    </ClaroCtx.Provider>
  );
};
// faixa de topo padrão (rótulo + título) em y 150
export const Topo: React.FC<{ children: React.ReactNode; top?: number; style?: React.CSSProperties }> = ({ children, top = 170, style }) => (
  <div style={{ position: "absolute", left: 70, right: 70, top, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, ...style }}>{children}</div>
);
// centraliza horizontalmente num y
export const Centro: React.FC<{ top: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ top, children, style }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center", ...style }}>{children}</div>
);

// ── b-roll em VÍDEO (Pexels, public-leve/broll) com grade de cinema. `d` = frame local em que o plano entra;
// `seg` = quantos segundos ele precisa cobrir (o clipe desacelera até 0,5× pra caber; nunca acelera).
import { OffthreadVideo, Sequence } from "remotion";
import { BROLL } from "./broll";
export const Broll: React.FC<{ nome: string; d?: number; seg?: number; ini?: number; pos?: string; zoom?: [number, number]; escurece?: number; topo?: number; brilho?: number; cantos?: boolean; style?: React.CSSProperties }> = ({ cantos = true, nome, d = 0, seg = 6, ini = 0, pos = "50% 50%", zoom = [1.03, 1.12], escurece = 0.78, topo = 0.4, brilho = 0.82, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const disp = (BROLL[nome] ?? 6) - ini - 0.2;
  const rate = Math.max(0.5, Math.min(1, disp / seg));
  const k = interpolate(f - d, [0, seg * fps], zoom, { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (f < d) return null;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000", ...style }}>
      <Sequence from={d} layout="none">
        <OffthreadVideo src={staticFile(`broll/${nome}.mp4`)} muted playbackRate={rate} startFrom={Math.round(ini * fps)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transform: `scale(${k})`, transformOrigin: pos, filter: `contrast(1.06) saturate(.72) brightness(${brilho})` }} />
      </Sequence>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(9,10,12,${topo}) 0%, rgba(9,10,12,0) 28%, rgba(9,10,12,0) 46%, rgba(9,10,12,${escurece}) 76%, rgba(9,10,12,${Math.min(1, escurece + 0.2)}) 100%)` }} />
      {cantos && [[44, 44, 1, 1], [1036, 44, -1, 1], [44, 1640, 1, -1], [1036, 1640, -1, -1]].map(([x, y, sx, sy], i) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, width: 0, height: 0 }}>
          <div style={{ position: "absolute", left: sx > 0 ? 0 : -54, top: 0, width: 54, height: 3, background: "rgba(255,255,255,.6)" }} />
          <div style={{ position: "absolute", left: 0, top: sy > 0 ? 0 : -54, width: 3, height: 54, background: "rgba(255,255,255,.6)" }} />
        </div>
      ))}
    </AbsoluteFill>
  );
};
// cartão (polaroid) com o clipe dentro
export const CartaoV: React.FC<{ nome: string; d?: number; seg?: number; ini?: number; w?: number; h?: number; rot?: number; pos?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ nome, d = 0, seg = 4, ini = 0, w = 760, h = 760, rot = -2, pos = "50% 50%", style, children }) => {
  const { fps } = useVideoConfig();
  const disp = (BROLL[nome] ?? 6) - ini - 0.2;
  return (
    <Flutua amp={7} tilt={3.4}><div style={{ position: "relative", width: w, background: C.papel, border: "1.5px solid rgba(255,255,255,.14)", padding: 22, borderRadius: 10, transform: `rotate(${rot}deg)`, boxShadow: "0 40px 80px -24px rgba(0,0,0,.85)", ...style }}>
      <div style={{ position: "relative", width: "100%", height: h, overflow: "hidden", borderRadius: 4, background: "#222" }}>
        <Sequence from={d} layout="none">
          <OffthreadVideo src={staticFile(`broll/${nome}.mp4`)} muted playbackRate={Math.max(0.5, Math.min(1, disp / seg))} startFrom={Math.round(ini * fps)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, filter: "contrast(1.05) saturate(.9)" }} />
        </Sequence>
        <Brilho forca={0.22} />
      </div>
      {children}
    </div></Flutua>
  );
};

// vidro: toda caixa/placa de diagrama usa isto em vez de retângulo chapado
export const VIDRO: React.CSSProperties = { background: "rgba(255,255,255,.045)", border: "1.5px solid rgba(255,255,255,.14)" };
// produto/papel projetado: flutua em 3D, tem aro de luz e brilho de vidro passando
export const Prod: React.FC<{ raio?: number; fase?: number; amp?: number; tilt?: number; children: React.ReactNode }> = ({ raio = 24, fase = 0, amp = 8, tilt = 4, children }) => (
  <Flutua amp={amp} tilt={tilt} fase={fase}>
    <div style={{ position: "relative", display: "inline-block", lineHeight: 0, borderRadius: raio, overflow: "hidden", boxShadow: "0 50px 100px -30px rgba(0,0,0,.9)" }}>
      {children}
      <Brilho fase={fase * 40} forca={0.22} />
    </div>
  </Flutua>
);
// texto cinético: palavra a palavra, com desfoque (a "Palavras" da Sofy). ouro = palavras em ouro metálico
export const Kin: React.FC<{ d?: number; t: string; passo?: number; ouro?: boolean; brasa?: boolean; cor?: string }> = ({ d = 0, t, passo = 3, ouro = false, brasa = false, cor }) => {
  const f = useCurrentFrame();
  const c = cor ?? (ouro ? C.ouro : brasa ? C.brasa : undefined);
  return (
    <>
      {t.split(" ").map((w, i) => {
        const p = interpolate(f - (d + i * passo), [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.exp) });
        return (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", marginRight: "0.22em", paddingBottom: "0.12em", marginBottom: "-0.12em" }}>
            <span style={{ display: "inline-block", transform: `translateY(${(1 - p) * 108}%)`, color: c }}>{w}</span>
          </span>
        );
      })}
    </>
  );
};
