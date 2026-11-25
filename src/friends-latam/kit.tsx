// KIT da VSL "The Netflix Trick": peças sob medida que as cenas combinam.
// PLAYER = cena REAL da série (public-netflix/clips, La Casa de Papel em espanhol) com a legenda nos 4 estados do treino
// (embolado, espanhol palavra a palavra, tradução, sem legenda). APP = app de treino recriado em código (mesma disposição
// do app da Fluency Route: cena, repetir / ES / EN, nota de dificuldade, treino de fala com nota por palavra).
import React from "react";
import { AbsoluteFill, Img, Loop, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { C, FONTE, Celular, Kin, Rotulo, Titulo, Corpo, useLin, useP, useSpr, VIDRO, mapa, useTx } from "./tema";
export { useTx };
import { WORDS } from "./words";
import { CLIP_ONDA } from "./clipsOnda";
import { TERRA } from "./mundo";

// ── tempo por FRASE: t("one single scene", 350) = segundo (voz bruta) em que a frase começa, 1ª ocorrência a partir de `apos` ──
const limpa = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const WN = WORDS.map((w) => limpa(w[2]));
export const t = (frase: string, apos = 0, fim = false): number => {
  const alvo = frase.split(/\s+/).map(limpa).filter(Boolean);
  for (let i = 0; i + alvo.length <= WN.length; i++) {
    if (WORDS[i][0] < apos - 0.35) continue;
    let ok = true;
    for (let k = 0; k < alvo.length; k++) if (WN[i + k] !== alvo[k]) { ok = false; break; }
    if (ok) return fim ? WORDS[i + alvo.length - 1][1] : WORDS[i][0];
  }
  throw new Error(`frase "${frase}" não achada depois de ${apos}s`);
};
// dentro da cena: at("frase") = frame local em que a frase começa (procura a partir do começo da cena)
export const useAt = (de: number) => {
  const { fps } = useVideoConfig();
  return (frase: string, apos = de, fim = false) => Math.round((mapa(t(frase, apos, fim)) - mapa(de)) * fps);
};

export const VERM = C.ouro; // acento único (variável CSS --ac)
export const ROXO = "#6D3FF2"; // roxo chapado (fundo de botão/pastilha com texto branco, igual nos dois campos)
export const VERDE = "#2FE27C";
export const CINZA = "#8B9099";

// título com palavras em acento: "The *Netflix trick*"
export const TK: React.FC<{ t: string; d?: number; size?: number; passo?: number; cor?: string; acento?: string; style?: React.CSSProperties }> = ({ t: txt, d = 0, size = 112, passo = 3, cor = C.creme, acento = VERM, style }) => {
  const partes = txt.split("*");
  let n = 0;
  return (
    <Titulo size={size} cor={cor} style={style}>
      {partes.map((p, i) => {
        const palavras = p.trim().split(/\s+/).filter(Boolean);
        const el = <Kin key={i} d={d + n * passo} t={palavras.join(" ")} passo={passo} cor={i % 2 ? acento : undefined} />;
        n += palavras.length;
        return el;
      })}
    </Titulo>
  );
};

// ── HIGH TECH (estrutura, não enfeite): mira de 4 cantos e leitura em mono nos cartões de mídia ──
export const Mira: React.FC<{ m?: number; l?: number; g?: number; cor?: string }> = ({ m = 16, l = 36, g = 3, cor = "rgba(255,255,255,.85)" }) => (
  <>
    {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
      <div key={i} style={{ position: "absolute", [x ? "right" : "left"]: m, [y ? "bottom" : "top"]: m, width: l, height: l, pointerEvents: "none", [y ? "borderBottom" : "borderTop"]: g + "px solid " + cor, [x ? "borderRight" : "borderLeft"]: g + "px solid " + cor } as React.CSSProperties} />
    ))}
  </>
);
export const Leitura: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ position: "absolute", fontFamily: FONTE.mono, fontWeight: 500, fontSize: 28, letterSpacing: 2, color: "rgba(255,255,255,.92)", background: "rgba(0,0,0,.55)", padding: "4px 12px", borderRadius: 6, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", ...style }}>{children}</div>
);
const p2 = (n: number) => String(Math.floor(n)).padStart(2, "0");
const relogio = (s: number) => "00:" + p2(s) + "." + Math.floor((s % 1) * 10);

// ── CENAS REAIS ──
export type Pal = [number, number, string];
export const CLIPS: Record<string, { dur: number; es: Pal[]; en: string; cola?: string }> = {
  c1: { dur: 3.0, en: "No hay nada que contar, es solo un chico del trabajo.", cola: "theresnothingtotellitsjustsomeguyiworkwith",
    es: [[0.13,0.34,"There's"],[0.34,0.68,"nothing"],[0.68,0.78,"to"],[0.78,1.4,"tell,"],[1.4,1.62,"it's"],[1.62,1.85,"just"],[1.85,2.06,"some"],[2.06,2.23,"guy"],[2.23,2.28,"I"],[2.28,2.52,"work"],[2.52,2.94,"with."]] },
  c2: { dur: 4.46, en: "Vamos, vas a salir con él. Algo malo debe tener.", cola: "comeonyouregoingoutwiththeguytheresgottobesomethingwrongwithhim",
    es: [[0.24,0.61,"Come"],[0.61,1.08,"on."],[1.08,1.34,"You're"],[1.34,1.58,"going"],[1.58,1.72,"out"],[1.72,1.91,"with"],[1.91,2.07,"the"],[2.07,2.4,"guy."],[2.4,2.65,"There's"],[2.65,2.75,"got"],[2.75,2.83,"to"],[2.83,2.9,"be"],[2.9,3.23,"something"],[3.23,3.41,"wrong"],[3.41,3.55,"with"],[3.55,3.8,"him."]] },
  c3: { dur: 6.38, en: "Vuelvo a la secundaria, estoy en medio de la cafetería y me doy cuenta de que estoy desnudo.",
    es: [[0.05,0.12,"All"],[0.12,0.41,"right,"],[0.41,0.49,"so"],[0.49,0.61,"I'm"],[0.61,0.78,"back"],[0.78,0.86,"in"],[0.86,1.03,"high"],[1.03,1.39,"school,"],[1.39,1.49,"I'm"],[1.49,1.79,"standing"],[1.79,1.86,"in"],[1.86,1.97,"the"],[1.97,2.19,"middle"],[2.19,2.26,"of"],[2.26,2.37,"the"],[2.37,2.87,"cafeteria,"],[2.87,3.06,"and"],[3.06,3.2,"I"],[3.2,3.72,"realize"],[3.72,3.88,"I"],[3.88,4.21,"am"],[4.21,5.69,"totally"],[5.69,6.06,"naked."]] },
  c4: { dur: 3.0, en: "Tranquilos, todos. Ni siquiera es una cita.",
    es: [[0.12,0.3,"Okay,"],[0.3,0.75,"everybody"],[0.75,1.16,"relax."],[1.6,1.75,"This"],[1.75,1.86,"is"],[1.86,2.01,"not"],[2.01,2.22,"even"],[2.22,2.3,"a"],[2.3,2.9,"date."]] },
  c5: { dur: 1.54, en: "A mí me suena a cita.",
    es: [[0.16,0.29,"Sounds"],[0.29,0.48,"like"],[0.48,0.52,"a"],[0.52,0.71,"date"],[0.71,0.81,"to"],[0.81,1.08,"me."]] },
  c6: { dur: 4.59, en: "No, no, no. Deja de limpiar mi aura.",
    es: [[0.07,0.39,"No,"],[0.39,0.64,"no,"],[0.64,0.96,"no,"],[0.96,1.65,"don't."],[1.65,2.19,"Stop"],[2.19,2.7,"cleansing"],[2.7,2.86,"my"],[2.86,3.44,"aura."]] },
  c7: { dur: 2.38, en: "¿Tiene joroba? ¿Joroba y peluquín?",
    es: [[0.04,0.11,"So"],[0.11,0.33,"does"],[0.33,0.44,"he"],[0.44,0.66,"have"],[0.66,0.71,"a"],[0.71,1.16,"hump?"],[1.16,1.35,"A hump"],[1.35,1.49,"and"],[1.49,1.53,"a"],[1.53,2.08,"hairpiece?"]] },
  c0: { dur: 16.4, en: "", es: [] },
};
// segundo do clipe no frame atual (o clipe entra no frame d e fica em laço)
export const useClipT = (clip: string, d = 0) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = CLIPS[clip].dur;
  const n = Math.max(0, f - d) / fps;
  return { tc: n % dur, volta: Math.floor(n / dur) + 1 };
};

// legenda ES palavra a palavra (acende na fala real da cena)
export const SubES: React.FC<{ clip: string; tc: number; size?: number; cor?: string }> = ({ clip, tc, size = 46, cor = "#fff" }) => (
  <div style={{ fontFamily: FONTE.sans, fontWeight: 700, fontSize: size, lineHeight: 1.18, textAlign: "center", textWrap: "balance", textShadow: "0 3px 10px rgba(0,0,0,.9)" } as React.CSSProperties}>
    {CLIPS[clip].es.map(([a], i) => <span key={i} style={{ color: tc >= a - 0.05 ? cor : "rgba(255,255,255,.34)" }}>{CLIPS[clip].es[i][2]} </span>)}
  </div>
);
export const SubEN: React.FC<{ clip: string; size?: number }> = ({ clip, size = 44 }) => (
  <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: size, lineHeight: 1.18, color: C.brasa, textAlign: "center", textWrap: "balance", textShadow: "0 3px 10px rgba(0,0,0,.9)" } as React.CSSProperties}>{CLIPS[clip].en}</div>
);
// o EMBOLADO: tudo grudado e borrado; `claro` 0→1 separa e desborra
export const SubCola: React.FC<{ clip: string; claro?: number; size?: number }> = ({ clip, claro = 0, size = 46 }) => {
  const c = CLIPS[clip];
  return (
    <div style={{ fontFamily: FONTE.sans, fontWeight: 700, fontSize: size, lineHeight: 1.18, textAlign: "center", color: "#fff", filter: `blur(${(1 - claro) * 5}px)`, textShadow: "0 3px 10px rgba(0,0,0,.9)", whiteSpace: claro > 0.6 ? "normal" : "nowrap" }}>
      {c.es.map((w, i) => <span key={i} style={{ marginRight: `${claro * 0.26}em` }}>{claro > 0.5 ? w[2] : w[2].toLowerCase().replace(/[,.¿?]/g, "")}</span>)}
    </div>
  );
};

export const Player: React.FC<{ clip: string; d?: number; w?: number; raio?: number; tag?: string; tagCor?: string; rep?: boolean; sub?: React.ReactNode; barra?: number | null; escuro?: number; ini?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ clip, d = 0, w = 980, raio = 30, tag, tagCor = ROXO, rep = false, sub, barra = null, escuro = 0, ini = 0, style, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = CLIPS[clip].dur;
  const { tc, volta } = useClipT(clip, d);
  const h = Math.round(w * 9 / 16);
  const e = spring({ frame: f - d, fps, config: { damping: 18, stiffness: 160, mass: 0.7 } });
  if (f < d) return null;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: raio, overflow: "hidden", background: "#000", boxShadow: "0 50px 100px -34px rgba(0,0,0,.95), 0 0 0 1.5px rgba(255,255,255,.12)", transform: `scale(${interpolate(e, [0, 1], [0.94, 1])})`, ...style }}>
      <Sequence from={d} layout="none">
        <Loop durationInFrames={Math.max(1, Math.round((dur - ini - 0.05) * fps))}>
          <OffthreadVideo src={staticFile(`clips/${clip}.mp4`)} muted startFrom={Math.round(ini * fps)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </Loop>
      </Sequence>
      {escuro > 0 && <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${escuro})` }} />}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "46%", background: "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.82))" }} />
      {tag && <div style={{ position: "absolute", left: w * 0.028, top: w * 0.026, fontFamily: FONTE.mono, fontWeight: 600, fontSize: Math.max(28, w * 0.032), letterSpacing: 3, textTransform: "uppercase", color: "#fff", background: tagCor, padding: `${w * 0.008}px ${w * 0.018}px`, borderRadius: 8 }}>{tag}</div>}
      {rep && <div key={volta} style={{ position: "absolute", right: w * 0.028, top: w * 0.026, fontFamily: FONTE.mono, fontWeight: 600, fontSize: Math.max(34, w * 0.046), color: "#fff", background: "rgba(0,0,0,.66)", border: "1.5px solid rgba(255,255,255,.3)", padding: `${w * 0.006}px ${w * 0.02}px`, borderRadius: 10 }}>{volta}×</div>}
      {sub && <div style={{ position: "absolute", left: w * 0.05, right: w * 0.05, bottom: w * 0.05 }}>{sub}</div>}
      {w >= 600 && <Mira m={w * 0.022} l={w * 0.04} />}
      {w >= 600 && !rep && <Leitura style={{ right: w * 0.05, top: w * 0.034 }}>EN · {relogio(tc)}</Leitura>}
      {barra !== null && (() => {
        const env = CLIP_ONDA[clip] || [], NB = Math.round(w / 9), p = barra ?? tc / dur, hh = Math.max(26, w * 0.05);
        return (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hh, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", gap: 2, padding: "0 6px", boxSizing: "border-box" }}>
            {Array.from({ length: NB }, (_, i) => { const a = Math.floor((i / NB) * env.length), b = Math.max(a + 1, Math.floor(((i + 1) / NB) * env.length)); let m = 0; for (let q = a; q < b; q++) m = Math.max(m, env[q] || 0); return <div key={i} style={{ flex: 1, height: Math.max(3, m * (hh - 8)), borderRadius: 2, background: i / NB <= p ? "#9D7BFF" : "rgba(255,255,255,.34)" }} />; })}
            {CLIPS[clip].es.map((x, i) => <div key={"m" + i} style={{ position: "absolute", left: `${(x[0] / dur) * 100}%`, top: 0, width: 2, height: 7, background: "rgba(255,255,255,.75)" }} />)}
            <div style={{ position: "absolute", left: `${p * 100}%`, top: 0, bottom: 0, width: 3, background: "#fff" }} />
          </div>
        );
      })()}
      {children}
    </div>
  );
};

// ── peças de interface ──
export const Chip: React.FC<{ children: React.ReactNode; cor?: string; fundo?: string; size?: number; borda?: string; style?: React.CSSProperties }> = ({ children, cor, fundo, borda, size = 46, style }) => {
  const T = useTx();
  const neutro = !fundo || fundo.startsWith("rgba(255,255,255") || fundo.startsWith("rgba(0,0,0") || fundo === "#15171C" || fundo === "#0E1014";
  if (neutro) { cor = T.tx(cor ?? C.creme); if (T.claro) { fundo = "#FFFFFF"; borda = T.fio; } else { fundo = fundo ?? "rgba(255,255,255,.06)"; borda = borda ?? "rgba(255,255,255,.16)"; } }
  else { cor = cor ?? "#fff"; borda = borda ?? fundo; }
  return (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 14, fontFamily: FONTE.sans, fontWeight: 600, fontSize: size, color: cor, background: fundo, border: `1.5px solid ${borda}`, borderRadius: size * 0.42, padding: `${size * 0.3}px ${size * 0.62}px`, lineHeight: 1.1, boxShadow: neutro ? T.sombra : undefined, ...style }}>{children}</div>
); };
export const Painel: React.FC<{ w?: number; pad?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ w = 940, pad = 44, style, children }) => { const T = useTx(); return (
  <div style={{ position: "relative", width: w, boxSizing: "border-box", padding: pad, borderRadius: 14, border: `1.5px solid ${T.fio}`, background: T.painel, boxShadow: T.sombra, ...style }}><Mira m={10} l={22} g={2.5} cor="var(--ac)" />{children}</div>
); };
// número gigante
export const Giga: React.FC<{ children: React.ReactNode; size?: number; cor?: string; style?: React.CSSProperties }> = ({ children, size = 420, cor = C.creme, style }) => { const { tx } = useTx(); cor = tx(cor)!; return (
  <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: size, lineHeight: 0.9, letterSpacing: -size * 0.05, color: cor, textAlign: "center", fontVariantNumeric: "tabular-nums", ...style }}>{children}{size >= 250 && <Regua w={Math.min(760, size * 1.7)} />}</div>
); };
// risca um texto (o caminho antigo): cinza + traço que atravessa
export const Riscado: React.FC<{ d: number; children: React.ReactNode; cor?: string; h?: number; style?: React.CSSProperties }> = ({ d, children, cor = VERM, h = 9, style }) => {
  const p = useLin(d, 9);
  const f = useCurrentFrame();
  const T = useTx();
  return (
    <span style={{ position: "relative", display: "inline-block", color: f >= d + 4 ? T.suave : undefined, ...style }}>
      {children}
      <span style={{ position: "absolute", left: "-3%", top: "54%", height: h, width: `${p * 106}%`, background: cor, borderRadius: h }} />
    </span>
  );
};
// barra de progresso com rótulo
export const Barra: React.FC<{ v: number; w?: number; h?: number; cor?: string; fundo?: string; leitura?: boolean; style?: React.CSSProperties }> = ({ v, w = 820, h = 26, cor = VERM, fundo, leitura = true, style }) => { const T = useTx(); cor = T.tx(cor)!; return (
  <div style={{ position: "relative", width: w, ...style }}>
    <div style={{ width: w, height: h, borderRadius: Math.min(h, 8), background: fundo ?? T.trilho, overflow: "hidden" }}><div style={{ width: `${Math.max(0, Math.min(1, v)) * 100}%`, height: "100%", background: cor }} /></div>
    {leitura && w >= 600 && Array.from({ length: 11 }, (_, i) => <div key={i} style={{ position: "absolute", left: (w * i) / 10 - 1, top: h + 5, width: 2, height: i % 5 === 0 ? 14 : 8, background: T.claro ? "rgba(20,17,31,.4)" : "rgba(255,255,255,.45)" }} />)}
    {leitura && w >= 600 && h >= 24 && <div style={{ position: "absolute", right: 0, top: -40, fontFamily: FONTE.mono, fontWeight: 600, fontSize: 30, letterSpacing: 1, color: T.claro ? "#14111F" : "#fff", fontVariantNumeric: "tabular-nums" }}>{String(Math.round(Math.max(0, Math.min(1, v)) * 100)).padStart(3, "0")}%</div>}
  </div>
); };
// dedo fantasma (toque): anel que aperta no frame d
export const Toque: React.FC<{ d: number; x: number; y: number; size?: number }> = ({ d, x, y, size = 120 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f - d, [0, 5, 16], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s = interpolate(f - d, [0, 16], [0.6, 1.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  if (f < d || f > d + 16) return null;
  return <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: "50%", background: "rgba(124,92,255,.28)", border: "5px solid rgba(124,92,255,.9)", opacity: p, transform: `scale(${s})` }} />;
};

// ── APP DE TREINO (recriado). Tela desenhada em 1080 de largura, vai dentro de <Celular>. ──
const APP = { fundo: "#FFFFFF", tinta: "#141427", cinza: "#6B6F80", roxo: "#6C4DFF", teal: "#12B5AC", linha: "#E8E9F0" };
const Status: React.FC = () => (
  <div style={{ height: 150, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 78px 22px", fontFamily: FONTE.ui, fontWeight: 600, fontSize: 44, color: APP.tinta }}>
    <span>9:41</span>
    <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <span style={{ display: "flex", gap: 5, alignItems: "flex-end" }}>{[14, 20, 26, 32].map((h) => <span key={h} style={{ width: 8, height: h, background: APP.tinta, borderRadius: 2 }} />)}</span>
      <span style={{ width: 66, height: 32, border: `3px solid ${APP.tinta}`, borderRadius: 9, padding: 3, boxSizing: "border-box" }}><span style={{ display: "block", width: "82%", height: "100%", background: APP.tinta, borderRadius: 4 }} /></span>
    </span>
  </div>
);
const Cab: React.FC<{ tit: string; sub: string }> = ({ tit, sub }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 32, padding: "26px 56px 34px", borderBottom: `2px solid ${APP.linha}` }}>
    <div style={{ width: 104, height: 104, borderRadius: 30, border: `3px solid ${APP.linha}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTE.ui, fontSize: 52, color: APP.tinta }}>←</div>
    <div>
      <div style={{ fontFamily: FONTE.ui, fontWeight: 700, fontSize: 52, color: APP.tinta, letterSpacing: -1 }}>{tit}</div>
      <div style={{ fontFamily: FONTE.ui, fontWeight: 600, fontSize: 36, color: APP.teal }}>{sub}</div>
    </div>
  </div>
);
const Pil: React.FC<{ children: React.ReactNode; on?: boolean; w?: number }> = ({ children, on = false, w }) => (
  <div style={{ width: w, textAlign: "center", fontFamily: FONTE.ui, fontWeight: 700, fontSize: 42, color: on ? "#fff" : APP.tinta, background: on ? APP.roxo : "#fff", border: `3px solid ${on ? APP.roxo : APP.linha}`, borderRadius: 60, padding: "24px 44px", boxShadow: "0 6px 16px rgba(20,20,60,.06)" }}>{children}</div>
);
const Nota: React.FC<{ rot: string; quando: string; cor: string; on?: boolean }> = ({ rot, quando, cor, on = false }) => (
  <div style={{ flex: 1, height: 168, borderRadius: 34, border: `3px solid ${cor}`, background: on ? cor : `${cor}14`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: on ? "scale(1.04)" : undefined }}>
    <div style={{ fontFamily: FONTE.ui, fontWeight: 800, fontSize: 44, color: on ? "#fff" : cor }}>{rot}</div>
    <div style={{ fontFamily: FONTE.ui, fontWeight: 600, fontSize: 32, color: on ? "#fff" : cor }}>{quando}</div>
  </div>
);
// TREINO DE OUVIDO (LATAM: textos em espanhol, série Friends). modo = o que a legenda mostra; nota = qual botão está apertado; n = número da cena
export const AppOuvido: React.FC<{ clip: string; d?: number; n?: number; modo?: "nada" | "es" | "en"; nota?: number; ouvido?: number; ep?: string }> = ({ clip, d = 0, n = 1, modo = "nada", nota = -1, ouvido = 0, ep = "Episodio 1" }) => {
  const { tc } = useClipT(clip, d);
  return (
    <AbsoluteFill style={{ background: APP.fundo }}>
      <Status />
      <Cab tit={ep} sub={`Friends · ${ouvido} ${ouvido === 1 ? "escena" : "escenas"} en tu oído`} />
      <div style={{ textAlign: "center", fontFamily: FONTE.ui, fontWeight: 800, fontSize: 36, letterSpacing: 5, color: APP.teal, marginTop: 150 }}>{n === 1 ? "NUEVA" : "REPASO"} · ESCENA {n}/247</div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
        <Player clip={clip} d={d} w={980} raio={44} barra={tc / CLIPS[clip].dur} sub={modo === "es" ? <SubES clip={clip} tc={tc} size={42} /> : modo === "en" ? <SubEN clip={clip} size={40} /> : undefined} />
      </div>
      <div style={{ textAlign: "center", fontFamily: FONTE.ui, fontWeight: 500, fontSize: 38, color: APP.cinza, marginTop: 34 }}>{modo === "nada" ? "Mírala sin subtítulos e intenta entender." : modo === "es" ? "Ahora lee lo que dijeron de verdad." : "Y esto es lo que significa."}</div>
      <div style={{ display: "flex", justifyContent: "center", gap: 22, marginTop: 34 }}>
        <Pil>repetir</Pil><Pil on={modo === "es"}>EN</Pil><Pil on={modo === "en"}>ES</Pil>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, borderTop: `2px solid ${APP.linha}`, padding: "34px 44px 90px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <Pil>‹ anterior</Pil><div style={{ fontFamily: FONTE.ui, fontWeight: 700, fontSize: 40, color: APP.cinza }}>{n} / 247</div><Pil>siguiente ›</Pil>
        </div>
        <div style={{ display: "flex", gap: 22, marginBottom: 22 }}><Nota rot="no entendí" quando="ahora" cor="#F04452" on={nota === 0} /><Nota rot="difícil" quando="1 día" cor="#F5A524" on={nota === 1} /></div>
        <div style={{ display: "flex", gap: 22 }}><Nota rot="entendí" quando="1 día" cor={APP.teal} on={nota === 2} /><Nota rot="fácil" quando="3 días" cor="#22B85F" on={nota === 3} /></div>
      </div>
    </AbsoluteFill>
  );
};
// TREINO DE FALA (shadowing): grava, compara com a voz original, nota por palavra
export const AppFala: React.FC<{ clip: string; d?: number; grava: number; nota: number; palavras: [string, number][] }> = ({ clip, d = 0, grava, nota, palavras }) => {
  const f = useCurrentFrame();
  const g = f >= grava && f < nota;
  const pronto = f >= nota;
  const pulso = 1 + Math.sin(f / 3.2) * 0.07;
  return (
    <AbsoluteFill style={{ background: APP.fundo }}>
      <Status />
      <Cab tit="Habla" sub="Friends · shadowing" />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 110 }}><Player clip={clip} d={d} w={980} raio={44} barra={null} /></div>
      <div style={{ margin: "44px 60px 0", textAlign: "center", fontFamily: FONTE.ui, fontWeight: 800, fontSize: 60, lineHeight: 1.2, letterSpacing: -1 }}>
        {palavras.map(([w, n], i) => <span key={i} style={{ color: !pronto ? APP.tinta : n >= 80 ? "#22B85F" : n >= 60 ? "#F5A524" : "#F04452" }}>{w} </span>)}
      </div>
      {/* duas ondas: a voz original e a sua */}
      {[["ORIGINAL", APP.teal, 0], ["TÚ", APP.roxo, 1]].map(([rot, cor, k]) => (
        <div key={rot as string} style={{ margin: "40px 70px 0", display: "flex", alignItems: "center", gap: 28, opacity: k === 1 && f < grava ? 0.25 : 1 }}>
          <div style={{ width: 210, fontFamily: FONTE.ui, fontWeight: 800, fontSize: 32, letterSpacing: 3, color: cor as string }}>{rot}</div>
          <div style={{ flex: 1, height: 96, display: "flex", alignItems: "center", gap: 6 }}>
            {Array.from({ length: 44 }, (_, i) => {
              const base = 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7 + (k as number) * 0.6) * Math.cos(i * 0.43));
              const vivo = k === 1 ? (g ? Math.min(1, Math.max(0, (f - grava) / 2 - i * 0.55)) : pronto ? 1 : 0) : 1;
              return <div key={i} style={{ flex: 1, height: `${Math.max(8, base * 100 * vivo)}%`, background: cor as string, borderRadius: 6, opacity: 0.9 }} />;
            })}
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        {pronto ? (
          <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontFamily: FONTE.ui, fontWeight: 800, color: "#22B85F" }}><span style={{ fontSize: 190, letterSpacing: -8, lineHeight: 1 }}>86</span><span style={{ fontSize: 52, color: APP.cinza }}>/ 100</span></div>
        ) : (
          <div style={{ width: 230, height: 230, borderRadius: "50%", background: APP.roxo, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${g ? pulso : 1})`, boxShadow: g ? "0 0 0 26px rgba(108,77,255,.18)" : "0 20px 40px rgba(108,77,255,.35)" }}>
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="#fff" /><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" /></svg>
          </div>
        )}
        <div style={{ fontFamily: FONTE.ui, fontWeight: 600, fontSize: 38, color: APP.cinza }}>{pronto ? "Feedback de pronunciación con IA" : g ? "Grabando tu voz…" : "Toca y repite la frase"}</div>
      </div>
    </AbsoluteFill>
  );
};
// LISTA DE SÉRIES
// as 3 séries do app real de inglês (cartões coloridos como no app; sem foto de terceiro)
// CAPA = quadro REAL de cada série (cenas do próprio app: Supabase media/<serie>), Marcos 25/11: "coloca capas nas séries do app, ultrarrealista"
// 25/11 Marcos: "pega capa no google, pra ficar ajeitada de verdade" → PÔSTER oficial de cada série (public-latam/img/poster-*.jpg, 600x900)
export const SERIES: [string, string][] = [["poster-friends", "Friends"], ["poster-tahm", "Two and a Half Men"], ["poster-himym", "How I Met Your Mother"]];
export const AppSeries: React.FC<{ d?: number }> = ({ d = 0 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: APP.fundo }}>
      <Status />
      <Cab tit="Escucha" sub="Elige tu serie" />
      <div style={{ padding: "70px 44px 0", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}>
        {SERIES.map(([img, nome], i) => {
          const p = interpolate(f - d - i * 5, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          return (
            <div key={img} style={{ opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "2 / 3", borderRadius: 26, overflow: "hidden", boxShadow: "0 22px 44px -18px rgba(20,20,60,.55)" }}>
                <Img src={staticFile(`img/${img}.jpg`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ fontFamily: FONTE.ui, fontWeight: 800, fontSize: 36, color: APP.tinta, marginTop: 16, lineHeight: 1.1 }}>{nome}</div>
              <div style={{ fontFamily: FONTE.ui, fontWeight: 600, fontSize: 28, color: APP.teal, marginTop: 4 }}>{i === 0 ? "24 episodios" : i === 1 ? "24 episodios" : "22 episodios"}</div>
            </div>
          );
        })}
      </div>
      {/* "Continúa entrenando": o episódio em andamento, como no app real */}
      <div style={{ padding: "64px 44px 0" }}>
        <div style={{ fontFamily: FONTE.ui, fontWeight: 800, fontSize: 44, color: APP.tinta, marginBottom: 24 }}>Continúa entrenando</div>
        <div style={{ display: "flex", gap: 28, alignItems: "center", background: "#F4F5FA", borderRadius: 34, padding: 26 }}>
          <div style={{ width: 200, height: 300, borderRadius: 22, overflow: "hidden", flex: "0 0 200px" }}><Img src={staticFile("img/poster-friends.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONTE.ui, fontWeight: 800, fontSize: 44, color: APP.tinta }}>Friends</div>
            <div style={{ fontFamily: FONTE.ui, fontWeight: 600, fontSize: 34, color: APP.cinza, marginTop: 6 }}>Episodio 1 · escena 86/247</div>
            <div style={{ height: 18, borderRadius: 9, background: APP.linha, marginTop: 26, overflow: "hidden" }}><div style={{ width: "35%", height: "100%", background: APP.roxo }} /></div>
            <div style={{ display: "inline-block", marginTop: 28, fontFamily: FONTE.ui, fontWeight: 800, fontSize: 36, color: "#fff", background: APP.roxo, borderRadius: 60, padding: "18px 40px" }}>Seguir ▸</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
export const Fone: React.FC<{ w?: number; d?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ w = 640, children, style }) => <Celular w={w} seco style={style}>{children}</Celular>;

// rótulo + título padrão do topo
export const Cabeca: React.FC<{ rot?: string; rotCor?: string; children?: React.ReactNode; top?: number; gap?: number }> = ({ rot, rotCor = CINZA, children, top = 150, gap = 26 }) => (
  <div style={{ position: "absolute", left: 60, right: 60, top, display: "flex", flexDirection: "column", alignItems: "center", gap }}>
    {rot && <Rotulo cor={rotCor} size={34}><Cifra t={rot} /></Rotulo>}
    {children}
  </div>
);
export const Meio: React.FC<{ top: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ top, children, style }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", flexDirection: "column", alignItems: "center", ...style }}>{children}</div>
);
export const Sub: React.FC<{ children: React.ReactNode; size?: number; cor?: string; style?: React.CSSProperties }> = ({ children, size = 54, cor = C.creme, style }) => <Corpo size={size} cor={cor} peso={600} style={{ maxWidth: 940, ...style }}>{children}</Corpo>;
export { useLin, useP, useSpr };

// ── b-roll em cartão (clipe real mudo) com rótulo em cima ──
import { BROLL } from "./broll";
export const Clipe: React.FC<{ nome: string; d?: number; w?: number; h?: number; rot?: string; ini?: number; seg?: number; pos?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ nome, d = 0, w = 940, h = 560, rot, ini = 0, seg = 6, pos = "50% 50%", style, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const disp = (BROLL[nome] ?? 6) - ini - 0.2;
  const e = spring({ frame: f - d, fps, config: { damping: 18, stiffness: 170, mass: 0.7 } });
  if (f < d) return null;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: 30, overflow: "hidden", background: "#111", boxShadow: "0 50px 100px -34px rgba(0,0,0,.95), 0 0 0 1.5px rgba(255,255,255,.12)", transform: `scale(${interpolate(e, [0, 1], [0.94, 1])})`, ...style }}>
      <Sequence from={d} layout="none">
        <OffthreadVideo src={staticFile(`broll/${nome}.mp4`)} muted playbackRate={Math.max(0.5, Math.min(1, disp / seg))} startFrom={Math.round(ini * fps)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, filter: "contrast(1.05) saturate(.85)" }} />
      </Sequence>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "52%", background: "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.86))" }} />
      <Mira m={18} l={34} />
      {rot && <div style={{ position: "absolute", left: 40, right: 40, bottom: 34, fontFamily: FONTE.tit, fontWeight: 700, fontSize: 68, letterSpacing: -2, lineHeight: 1.04, color: "#fff" }}>{rot}</div>}
      {children}
    </div>
  );
};
// comentário REAL do YouTube (traduzido fiel; public/es-comentarios.json do site)
export const Coment: React.FC<{ user: string; texto: React.ReactNode; likes: number; w?: number; size?: number }> = ({ user, texto, likes, w = 940, size = 50 }) => { const T = useTx(); return (
  <div style={{ position: "relative", width: w, boxSizing: "border-box", padding: "38px 42px", borderRadius: 14, background: T.painel, border: `1.5px solid ${T.fio}`, boxShadow: T.sombra, display: "flex", gap: 28 }}>
    <Mira m={10} l={22} g={2.5} cor="var(--ac)" />
    <div style={{ flex: "0 0 96px", height: 96, borderRadius: "50%", background: T.claro ? "#E9E5F7" : "#2A2D36", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTE.sans, fontWeight: 700, fontSize: 46, color: T.claro ? "#5B4BB0" : "#C9CCD4" }}>{user[0].toUpperCase()}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: 36, color: CINZA, marginBottom: 10 }}>@{user}</div>
      <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: size, lineHeight: 1.22, color: T.tinta }}>{texto}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, fontFamily: FONTE.mono, fontWeight: 500, fontSize: 36, color: CINZA }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={CINZA} strokeWidth="2" strokeLinejoin="round"><path d="M7 10v10H3V10zM7 10l4-7c1.6 0 2.6 1.2 2.3 2.8L12.6 9H19a2 2 0 0 1 2 2.4l-1.3 6.9A2 2 0 0 1 17.7 20H7" /></svg>
        {likes}
      </div>
    </div>
  </div>
); };
// rosca que enche até v (0..1) com o número no centro
export const Rosca: React.FC<{ v: number; size?: number; cor?: string; grossura?: number; children?: React.ReactNode }> = ({ v, size = 560, cor = VERM, grossura = 46, children }) => {
  const r = (size - grossura) / 2, L = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={grossura} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" style={{ stroke: cor }} strokeWidth={grossura} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - v)} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  );
};
// escada de esforço: barras que caem a cada episódio
export const Escada: React.FC<{ itens: { rot: string; h: number; d: number; acento?: boolean }[]; alt?: number; larg?: number }> = ({ itens, alt = 620, larg = 150 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = useTx();
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 34, height: alt + 90 }}>
      {itens.map((it, i) => {
        const s = spring({ frame: f - it.d, fps, config: { damping: 16, stiffness: 120, mass: 0.8 } });
        if (f < it.d) return <div key={i} style={{ width: larg }} />;
        return (
          <div key={i} style={{ width: larg, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <div style={{ width: larg, height: Math.max(10, alt * it.h * s), borderRadius: 20, background: it.acento ? VERM : T.claro ? "#D9D5EA" : "rgba(255,255,255,.16)", border: it.acento ? undefined : `1.5px solid ${T.fio}` }} />
            <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 42, letterSpacing: 2, color: it.acento ? T.tinta : T.suave }}>{it.rot}</div>
          </div>
        );
      })}
    </div>
  );
};

// ── peças da oferta ──
import { ONDA } from "./onda";
// mensagem de voz (áudio REAL do aluno): onda = envelope real; p = progresso 0..1
export const AudioMsg: React.FC<{ p: number; tocando: boolean; w?: number }> = ({ p, tocando, w = 980 }) => {
  const N = 64;
  const barras = Array.from({ length: N }, (_, i) => { const a = Math.floor((i / N) * ONDA.length), b = Math.floor(((i + 1) / N) * ONDA.length); let m = 0; for (let k = a; k < b; k++) m = Math.max(m, ONDA[k]); return m; });
  return (
    <div style={{ width: w, boxSizing: "border-box", background: "#15171C", border: "1.5px solid rgba(255,255,255,.14)", borderRadius: 34, padding: "36px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26, marginBottom: 30 }}>
        <div style={{ width: 104, height: 104, borderRadius: "50%", background: "#2A2D36", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="#8B9099"><circle cx="12" cy="8" r="4.2" /><path d="M3.5 21c.6-4.6 4-7 8.5-7s7.9 2.4 8.5 7z" /></svg>
        </div>
        <div>
          <div style={{ fontFamily: FONTE.sans, fontWeight: 700, fontSize: 48, color: "#fff" }}>alumno de Fluency Route</div>
          <div style={{ fontFamily: FONTE.sans, fontWeight: 500, fontSize: 36, color: CINZA }}>vive en Estados Unidos · audio real</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <div style={{ flex: "0 0 110px", height: 110, borderRadius: "50%", background: VERDE, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {tocando ? <div style={{ display: "flex", gap: 12 }}><div style={{ width: 14, height: 46, background: "#0B0C0F", borderRadius: 4 }} /><div style={{ width: 14, height: 46, background: "#0B0C0F", borderRadius: 4 }} /></div> : <svg width="52" height="52" viewBox="0 0 24 24" fill="#0B0C0F"><path d="M7 4.5v15l13-7.5z" /></svg>}
        </div>
        <div style={{ flex: 1, height: 130, display: "flex", alignItems: "center", gap: 4 }}>
          {barras.map((v, i) => <div key={i} style={{ flex: 1, height: `${Math.max(7, v * 100)}%`, borderRadius: 5, background: i / N <= p ? VERDE : "rgba(255,255,255,.22)" }} />)}
        </div>
      </div>
    </div>
  );
};
// selo de garantia: número gigante dentro de um anel que se desenha
export const Selo: React.FC<{ n: number; rot: string; d?: number; size?: number; cor?: string }> = ({ n, rot, d = 0, size = 620, cor = "#fff" }) => {
  const p = useLin(d, 18);
  const r = size / 2 - 22, L = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth={10} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" style={{ stroke: cor }} strokeWidth={18} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - p)} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: size * 0.5, lineHeight: 0.9, letterSpacing: -size * 0.03, color: cor }}>{n}</div>
        <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: size * 0.085, letterSpacing: size * 0.012, color: cor, marginTop: 6 }}>{rot}</div>
      </div>
    </div>
  );
};
export const Botao: React.FC<{ children?: React.ReactNode; w?: number; cor?: string; texto?: string; size?: number; seta?: boolean }> = ({ w = 900, seta = true }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ width: w, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <div style={{ fontFamily: FONTE.tit, fontWeight: 700, fontSize: 76, letterSpacing: -2, color: "var(--tx)", lineHeight: 1 }}>Desliza hacia abajo</div>
      <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 32, letterSpacing: 3, color: "var(--ac)", textTransform: "uppercase" }}>el botón está debajo de este video</div>
      {seta && <svg width="150" height="190" viewBox="0 0 150 190" style={{ marginTop: 6 }}>{[0, 1, 2].map((i) => <path key={i} d={`M20 ${18 + i * 56}l55 46 55-46`} fill="none" style={{ stroke: "var(--ac)" }} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity={0.25 + 0.75 * Math.max(0, Math.sin(f / 5 - i * 1.1))} />)}</svg>}
    </div>
  );
};
// item de lista com check que se desenha (um por vez no Slot, ou empilhado em listas de ENTREGA)
export const Item: React.FC<{ d: number; children: React.ReactNode; size?: number; img?: string; w?: number }> = ({ d, children, size = 58, img, w = 940 }) => {
  const f = useCurrentFrame();
  const p = useP(d, 8);
  const pc = useLin(d + 4, 8);
  const T = useTx();
  if (f < d) return null;
  return (
    <div style={{ width: w, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 28, padding: "24px 30px", borderRadius: 26, background: T.painel, border: `1.5px solid ${T.fio}`, boxShadow: T.sombra, opacity: p, transform: `translateY(${(1 - p) * 22}px)` }}>
      {img && <Img src={staticFile(`img/${img}.jpg`)} style={{ width: 170, height: 100, objectFit: "cover", borderRadius: 14 }} />}
      <div style={{ flex: 1, fontFamily: FONTE.sans, fontWeight: 700, fontSize: size, lineHeight: 1.1, color: T.tinta, letterSpacing: -1 }}>{children}</div>
      <svg width={64} height={64} style={{ overflow: "visible" }}><path d="M6,34 L26,54 L60,8" fill="none" stroke={T.claro ? "#12A150" : VERDE} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={130} strokeDashoffset={130 * (1 - pc)} /></svg>
    </div>
  );
};

// ── APP REAL: gravação de tela do produto no ar (fluencyroute.com.br/spanish-app.html), feita por ~/spy-meta/_es-grava.mjs.
// A = segundo da gravação em que cada toque acontece. `segs` = [frame da cena, segundo da gravação, quanto roda antes de congelar].
import { Freeze } from "remotion";
export const A = { home: 4.63, series: 6.98, licoes: 10.31, licao: 13.21, eps: 19.79, ep: 22.28, cena: 24.77, repeat: 30.29, nota: 35.16, es: 42.24, en: 49.32, fala: 55.67, grava: 60.96, notaFala: 67.69, fone: 75.03, fonePlay: 77.12, foneTxt: 83.9, fim: 88.9 };
export const AppReal: React.FC<{ segs: [number, number, number?][]; w?: number; style?: React.CSSProperties }> = ({ segs, w = 780, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let s = segs[0];
  for (const x of segs) if (f >= x[0]) s = x;
  const tv = s[1] + Math.min(Math.max(0, (f - s[0]) / fps), s[2] ?? 99);
  const h = Math.round(w * 1300 / 780);
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: w * 0.06, overflow: "hidden", background: "#050509", boxShadow: "0 50px 100px -34px rgba(20,10,60,.7), 0 0 0 1.5px rgba(255,255,255,.14), 0 0 0 10px rgba(20,17,31,.9)", ...style }}>
      <Leitura style={{ right: 18, top: 16, zIndex: 2, fontSize: Math.max(22, w * 0.034), background: "rgba(109,63,242,.92)" }}>REAL APP</Leitura>
      {/* quadro congelado em 0 + startFrom = tempo da gravação: não depende de quanto falta pro fim da composição */}
      <Freeze frame={0}>
        <OffthreadVideo src={staticFile("app/demo.mp4")} muted startFrom={Math.round(tv * fps)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      </Freeze>
    </div>
  );
};

// MOLDURA DE GRAVAÇÃO: o take dele de corpo inteiro dentro de um visor de câmera (REC piscando, timecode, miras, terços)
export const Gravacao: React.FC<{ nome: string; w?: number; h?: number; seg?: number; pos?: string }> = ({ nome, w = 760, h = 1010, seg = 10, pos = "50% 30%" }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = f / fps;
  return (
    <div style={{ position: "relative", width: w, height: h }}>
      <Clipe nome={nome} w={w} h={h} seg={seg} pos={pos} style={{ borderRadius: 18 }} />
      {/* terços do visor */}
      {[1, 2].map((i) => <div key={"v" + i} style={{ position: "absolute", left: (w * i) / 3, top: 0, width: 1.5, height: h, background: "rgba(255,255,255,.16)" }} />)}
      {[1, 2].map((i) => <div key={"h" + i} style={{ position: "absolute", top: (h * i) / 3, left: 0, height: 1.5, width: w, background: "rgba(255,255,255,.16)" }} />)}
      <Mira m={22} l={54} g={4} cor="#fff" />
      <div style={{ position: "absolute", left: 44, top: 40, display: "flex", alignItems: "center", gap: 12, fontFamily: FONTE.mono, fontWeight: 600, fontSize: 34, letterSpacing: 3, color: "#fff" }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#FF3B30", opacity: Math.floor(s * 2) % 2 ? 0.25 : 1 }} />REC
      </div>
      <Leitura style={{ right: 44, top: 38, fontSize: 32, background: "transparent" }}>{"00:00:" + p2(s) + ":" + p2(f % 30)}</Leitura>
      <Leitura style={{ left: 44, bottom: 40, fontSize: 28, background: "transparent" }}>4K · 30 FPS</Leitura>
    </div>
  );
};

// texto em mono que DECODIFICA: os caracteres resolvem da esquerda pra direita nos primeiros quadros da cena
const GLIFOS = "01<>/#=+%";
export const Cifra: React.FC<{ t: string; d?: number; dur?: number }> = ({ t: txt, d = 0, dur = 14 }) => {
  const f = useCurrentFrame() - d;
  if (f >= dur) return <>{txt}</>;
  const n = Math.floor((Math.max(0, f) / dur) * txt.length);
  return <>{txt.split("").map((c, i) => (i < n || c === " " ? c : GLIFOS[(i * 7 + Math.max(0, f) * 3) % GLIFOS.length])).join("")}</>;
};
// MAPA-MÚNDI em malha de pontos (terra firme real, Natural Earth). Pinos acendem no quadro d de cada um; arcos saem da origem.
const PROJ = (lon: number, lat: number, w: number, h: number): [number, number] => [((lon + 170) / 350) * w, ((78 - lat) / 134) * h];
export type Pino = { lon: number; lat: number; d: number; rot?: string };
export const Mapa: React.FC<{ d?: number; w?: number; h?: number; origem?: [number, number]; pinos: Pino[] }> = ({ d = 0, w = 1040, h = 600, origem = [-74.1, 4.7], pinos }) => {
  const f = useCurrentFrame();
  const T = useTx();
  const varre = interpolate(f - d, [0, 22], [0, w], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const [ox, oy] = PROJ(origem[0], origem[1], w, h);
  if (f < d) return null;
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      {TERRA.map(([lon, lat], i) => { const [x, y] = PROJ(lon, lat, w, h); if (x > varre) return null; return <circle key={i} cx={x} cy={y} r={3.1} fill={T.claro ? "rgba(40,30,90,.3)" : "rgba(255,255,255,.3)"} />; })}
      {f - d < 24 && <rect x={varre - 2} y={0} width={3} height={h} fill={T.claro ? "#6D3FF2" : "#fff"} opacity={0.8} />}
      {pinos.map((p, i) => {
        if (f < p.d) return null;
        const [x, y] = PROJ(p.lon, p.lat, w, h);
        const e = f - p.d;
        const arco = interpolate(e, [0, 16], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
        const mx = (ox + x) / 2, my = Math.min(oy, y) - Math.abs(x - ox) * 0.28 - 30;
        const L = Math.hypot(x - ox, y - oy) * 1.5 + 60;
        const pulso = (e % 40) / 40;
        return (
          <g key={i}>
            <path d={`M${ox},${oy} Q${mx},${my} ${x},${y}`} fill="none" style={{ stroke: "var(--ac)" }} strokeWidth={3} strokeLinecap="round" strokeDasharray={L} strokeDashoffset={L * (1 - arco)} opacity={0.9} />
            {e >= 14 && <><circle cx={x} cy={y} r={10 + pulso * 26} fill="none" style={{ stroke: "var(--ac)" }} strokeWidth={2.5} opacity={1 - pulso} /><circle cx={x} cy={y} r={9} style={{ fill: "var(--ac)" }} /><circle cx={x} cy={y} r={3.5} fill="#fff" /></>}
            {e >= 14 && p.rot && <text x={x + 18} y={y - 14} style={{ fill: "var(--tx)", fontFamily: FONTE.mono, fontWeight: 600, fontSize: 30, letterSpacing: 2 }}>{p.rot}</text>}
          </g>
        );
      })}
      <circle cx={ox} cy={oy} r={12} fill="#fff" style={{ stroke: "var(--ac)" }} strokeWidth={6} />
      <text x={ox + 20} y={oy + 34} style={{ fill: "var(--tx)", fontFamily: FONTE.mono, fontWeight: 600, fontSize: 30, letterSpacing: 2 }}>FLUENCY ROUTE</text>
    </svg>
  );
};
// pinos padrão: o 1º entra no quadro d0, os outros a cada `passo` quadros
export const pinosMundo = (d0: number, passo = 7): Pino[] => [
  { lon: -99.1, lat: 19.4, rot: "MÉXICO" }, { lon: -77, lat: 39, rot: "EE. UU." }, { lon: -3.7, lat: 40.4 }, { lon: -0.1, lat: 51.5 }, { lon: 13.4, lat: 52.5 },
  { lon: -70.6, lat: -33.4 }, { lon: -77, lat: -12 }, { lon: 139.7, lat: 35.7 }, { lon: 151.2, lat: -33.9 }, { lon: -58.4, lat: -34.6 }, { lon: 55.3, lat: 25.2 }, { lon: 18.4, lat: -33.9 },
].map((p, i) => ({ ...p, d: d0 + i * passo }));

// NETFLIX TRICK: o nome do mecanismo, sempre numa linha só (logo oficial + "Trick")
export const NetflixTrickMarca: React.FC<{ h?: number; cor?: string }> = ({ h = 120, cor = "#fff" }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: h * 0.26, whiteSpace: "nowrap" }}>
    <Img src={staticFile("img/netflix.svg")} style={{ height: h, width: h * 3.7 }} />
    <span style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: h * 1.16, lineHeight: 1, letterSpacing: -h * 0.05, color: cor, textTransform: "uppercase" }}>Trick</span>
  </div>
);
// régua de medição (ticks) que se desenha: vai sob número gigante
export const Regua: React.FC<{ w?: number; d?: number }> = ({ w = 560, d = 0 }) => {
  const p = useLin(d, 14);
  const T = useTx();
  const n = 28;
  return (
    <div style={{ position: "relative", width: w, height: 30, margin: "10px auto 0" }}>
      <div style={{ position: "absolute", left: 0, top: 0, height: 2.5, width: w * p, background: T.claro ? "rgba(20,17,31,.55)" : "rgba(255,255,255,.6)" }} />
      {Array.from({ length: n + 1 }, (_, i) => (i / n <= p ? <div key={i} style={{ position: "absolute", left: (w * i) / n, top: 0, width: 2.5, height: i % 7 === 0 ? 22 : 11, background: i % 7 === 0 ? "var(--ac)" : T.claro ? "rgba(20,17,31,.45)" : "rgba(255,255,255,.5)" }} /> : null))}
    </div>
  );
};

// ── O EPISÓDIO EM PALAVRAS (show don't tell do "o 2º fica muito mais fácil") ──
// estagios = [{ d: quadro em que o episódio entra, novos: quantas palavras são novas nele }]. No 1º tudo é novo.
const EP_BASE = ["you", "I", "the", "to", "a", "it", "and", "that", "what", "is", "know", "no", "oh", "just", "this", "okay", "yeah", "me", "so", "don't", "we", "have", "of", "do", "in", "my", "are", "it's", "not", "I'm", "like", "right", "go", "on", "with", "her", "out", "get", "he", "all"];
const EP_NOVAS = ["date", "guy", "coffee", "wedding", "naked", "hump", "aura", "marry", "divorce", "sister", "dinosaur", "apartment"];
const EP_ORDEM = [17, 4, 31, 9, 26, 13, 38, 2, 21, 35, 7, 29, 15, 0, 33, 11, 24, 19, 5, 37, 28, 1, 14, 22, 39, 8, 32, 16, 3, 27, 10, 36, 20, 6, 30, 12, 25, 18, 34, 23];
export const EpPalavras: React.FC<{ estagios: { d: number; novos: number }[]; enche0?: number }> = ({ estagios, enche0 = 10 }) => {
  const f = useCurrentFrame();
  const T = useTx();
  let s = 0; estagios.forEach((e, i) => { if (f >= e.d) s = i; });
  const E = estagios[s], fim = s + 1 < estagios.length ? estagios[s + 1].d : E.d + 110;
  const novos = s === 0 ? EP_BASE.length : E.novos;
  const setNovos = new Map<number, number>(); // índice da casa → ordem em que é treinada
  for (let i = 0; i < novos; i++) setNovos.set(EP_ORDEM[(i + s * 11) % 40], i);
  const ini = s === 0 ? enche0 : E.d + 14;
  const passo = Math.max(0.6, Math.min(3, (fim - ini - 14) / Math.max(1, novos)));
  let faltam = 0;
  const casas = EP_BASE.map((w, i) => {
    const ord = setNovos.get(i);
    const novo = ord !== undefined;
    const treinada = novo && f >= ini + ord! * passo;
    if (novo && !treinada) faltam++;
    const txt = novo && s > 0 ? EP_NOVAS[(ord! + s * 3) % EP_NOVAS.length] : w;
    const entra = interpolate(f - E.d - i * 0.35, [0, 5], [0.86, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const soco = treinada ? interpolate(f - (ini + ord! * passo), [0, 5], [1.16, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
    // já era sua (branca) · acabou de treinar (roxo) · nova, ainda por treinar (contorno)
    const st: React.CSSProperties = !novo ? { background: T.claro ? "#14111F" : "#fff", color: T.claro ? "#fff" : "#14111F", border: "2px solid transparent" } : treinada ? { background: "#6D3FF2", color: "#fff", border: "2px solid #6D3FF2" } : { background: "transparent", color: T.suave, border: `2px dashed ${T.claro ? "rgba(20,17,31,.4)" : "rgba(255,255,255,.4)"}` };
    return <div key={i} style={{ height: 116, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTE.sans, fontWeight: 700, fontSize: 42, transform: `scale(${entra * soco})`, ...st }}>{txt}</div>;
  });
  return (
    <div style={{ width: 1010, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <div style={{ display: "flex", gap: 12 }}>
        {estagios.map((_, i) => <div key={i} style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 40, letterSpacing: 3, padding: "12px 26px", borderRadius: 10, background: i === s ? "#6D3FF2" : "transparent", color: i === s ? "#fff" : T.suave, border: `1.5px solid ${i === s ? "#6D3FF2" : T.fio}`, opacity: i <= s ? 1 : 0.45 }}>EP {i + 1}</div>)}
      </div>
      <div style={{ width: 1010, display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 12 }}>{casas}</div>
      <div style={{ display: "flex", gap: 34, alignItems: "center", fontFamily: FONTE.mono, fontWeight: 600, fontSize: 30, letterSpacing: 2, color: T.suave, textTransform: "uppercase" }}>
        {s > 0 && <span style={{ display: "flex", alignItems: "center", gap: 10 }}><i style={{ width: 26, height: 26, borderRadius: 6, background: T.claro ? "#14111F" : "#fff" }} />ya son tuyas</span>}
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}><i style={{ width: 26, height: 26, borderRadius: 6, background: "#6D3FF2" }} />entrenando ahora</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}><i style={{ width: 26, height: 26, borderRadius: 6, border: `2px dashed ${T.suave}`, boxSizing: "border-box" }} />nuevas</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 14 }}>
        <div key={s} style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 300, lineHeight: 0.9, letterSpacing: -14, color: T.tinta, fontVariantNumeric: "tabular-nums", transform: `scale(${interpolate(f - E.d, [0, 6], [1.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})` }}>{novos}</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: FONTE.tit, fontWeight: 700, fontSize: 64, lineHeight: 1.02, letterSpacing: -2, color: T.tinta }}>palabras nuevas<br />para entrenar</div>
          <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 34, letterSpacing: 2, color: "var(--ac)", marginTop: 12 }}>{String(faltam).padStart(2, "0")} FALTAN · {String(Math.round((1 - novos / 40) * 100)).padStart(2, "0")}% YA SON TUYAS</div>
        </div>
      </div>
    </div>
  );
};

// ESFUERZO POR EPISODIO (Marcos 24/11: a grade de 40 palavras ficou "cognitivamente pesada pra quem tá no cold").
// UMA ideia: o esforço pra entender cada episódio, em barras que encolhem. Cada barra entra na palavra (d) e cresce com mola.
export const EsforcoEps: React.FC<{ linhas: { d: number; ep: string; v: number; rot: string }[]; w?: number }> = ({ linhas, w = 960 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ width: w, display: "flex", flexDirection: "column", gap: 46 }}>
      <Rotulo cor={CINZA} size={34} style={{ textAlign: "left" }}>esfuerzo para entender</Rotulo>
      {linhas.map((l, i) => {
        if (f < l.d) return <div key={i} style={{ height: 196 }} />;
        const s = spring({ frame: f - l.d, fps, config: { damping: 20, stiffness: 120, mass: 0.8 } });
        const cor = i === 0 ? "#8B9099" : VERM;
        return (
          <div key={i} style={{ height: 196 }}>
            <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 44, letterSpacing: 3, color: "var(--tx)", marginBottom: 14 }}>{l.ep}</div>
            <div style={{ position: "relative", width: w, height: 126, borderRadius: 30, background: "var(--tr)" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: Math.max(126, w * l.v * s), borderRadius: 30, background: cor }} />
              <div style={{ position: "absolute", left: Math.max(126, w * l.v * s) + 28, top: 0, bottom: 0, display: "flex", alignItems: "center", fontFamily: FONTE.tit, fontWeight: 800, fontSize: 64, letterSpacing: -2, color: i === 0 ? CINZA : "var(--tx)", opacity: s, whiteSpace: "nowrap", ...(l.v > 0.6 ? { left: 36, color: "#fff" } : {}) }}>{l.rot}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
