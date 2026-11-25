// VSL Friends LATAM (espanhol, profesora Manuela Rodríguez = avatar de IA em ≤ 10 s por aparição) — voz Fish s2.1-pro + cenas full 1080×1920 @30.
// Copy = /friends BR traduzida (~/latam-friends/vsl-friends-latam-manuela.md). Cenas em segundos da voz BRUTA; mapa converte (silêncios + VEL; aluno a 1×).
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing, spring } from "remotion";
import { CENAS, AVATAR } from "./cenas";
import { t as tFrase } from "./kit";
import { Img, OffthreadVideo } from "remotion";
import fsAv from "./avatar.json";
import { LEGENDA } from "./legenda";
import { FONTE, mapa, inv } from "./tema";
import { WORDS } from "./words";
import { FrameGlobal } from "./ambiente";
import { VOZ_ORIG, INS } from "./cortes";
import { VOZ_ONDA } from "./vozOnda";

export const FL_FPS = 30;
// janelas de AVATAR em segundos da voz BRUTA: começa 0,12 s antes da 1ª palavra, termina 0,18 s depois da última
const JANELAS = (() => { let ant = 0; return AVATAR.map(([nome, a, b]) => { const s0 = tFrase(a, ant), s1 = tFrase(b, s0, true); ant = s1; return { nome, s0: Math.max(0, s0 - 0.12), s1: s1 + 0.18 }; }); })();
// MANUELA em tela cheia. Hoje = foto base; quando existir avatar/<nome>.mp4 (lipsync, listado em avatar.json) entra o vídeo no lugar.
// ENQUADRAMENTO (Marcos: "se a mão ficar parada, dá uns zooms pra esconder a mão"): nunca o plano aberto da foto; cada aparição alterna
// MÉDIO (peito pra cima, 1,38×) e PERTO (ombros, 1,62×), com um avanço lento de câmera (+4 % na fala) e leve deriva lateral. As mãos ficam fora do quadro.
// 24/11 Marcos: "não deixa tudo com a mão cortada, aproveita um pouco também, são variações". ABERTO (1,04×, mãos à vista) nos trechos curtos
// ou onde ela gesticula; ABERTO→MÉDIO com corte seco no meio da frase (mão só no começo); o resto fechado. Ordem = AVATAR do cenas.ts.
const PLANOS: { z: number; x: number; z2?: number; em?: number }[] = [{ z: 1.38, x: 0 }, { z: 1.04, x: 0 }, { z: 1.04, x: 0, z2: 1.42, em: 0.42 }, { z: 1.62, x: -18 }, { z: 1.04, x: 10 }, { z: 1.38, x: 14 }, { z: 1.04, x: 0, z2: 1.42, em: 0.45 }, { z: 1.62, x: 0 }, { z: 1.38, x: -12 }, { z: 1.04, x: 0 }];
// frames (30 fps) do começo do vídeo da Manuela que são pulados pra boca bater com a voz; medido em ~/latam-friends/voz/tmp/xcomp.cjs
// quadros de cada vídeo da fal (ffprobe nb_frames)
const QUADROS: Record<string, number> = { hook: 80, eua: 80, manuela: 128, concentrado: 80, reirse: 96, compromiso: 120, valor: 112, decision: 80, adios: 80 };
const PULA: Record<string, number> = { hook: 1, eua: 1, manuela: 1, concentrado: 1, reirse: 1, compromiso: 21, valor: 18, decision: 18, adios: 18 };
const Avatar: React.FC<{ nome: string; i: number; dur: number }> = ({ nome, i, dur }) => {
  const f = useCurrentFrame();
  const vid = (fsAv as string[]).includes(nome);
  const p = PLANOS[i % PLANOS.length];
  const k = Math.min(1, f / Math.max(1, dur));
  const corte = p.z2 !== undefined && k >= (p.em ?? 0.5);
  // GIMMICKS pra disfarçar a IA (Marcos: "zoom in andando RÁPIDO"): avanço rápido (+15 % na fala), punch seco de +7 % a cada 1,2 s
  // (alternado, como corte de editor) e tremido de mão leve (seno em x/y/rotação).
  // 25/11 Marcos: o chacoalhão e o punch são bons só no HOOK (i === 0, "pra acordar"); nas outras, só o zoom contínuo.
  const hook = i === 0;
  const beat = hook && Math.floor(f / 36) % 2 === 1 ? 1.07 : 1;
  const tre = hook ? 1 : 0;
  const z = (corte ? p.z2! : p.z) * (1 + 0.15 * k) * beat, dx = p.x * (1 - k) + tre * (Math.sin(f * 0.9) * 4 + Math.sin(f * 2.3) * 2), dy = tre * Math.cos(f * 1.1) * 3, rot = tre * Math.sin(f * 0.7) * 0.25;
  // 25/11 SINCRONIA medida por correlação cruzada (áudio do vídeo da fal × voz final no ponto onde a composição solta o vídeo):
  // as 4 últimas mexiam a boca ~0,6 s DEPOIS da voz (janelas recortadas antes de o depoimento sair). O vídeo pula esse começo (trimBefore).
  const pula = PULA[nome] ?? 0;
  const st: React.CSSProperties = { position: "absolute", left: 0, top: 0, width: 1080, height: 1920, objectFit: "cover", objectPosition: "50% 20%", transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${z})`, transformOrigin: "50% 27%" };
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      {vid ? <OffthreadVideo src={staticFile(`avatar/${nome}.mp4`)} trimBefore={pula} muted style={st} /> : <Img src={staticFile("img/manuela.png")} style={st} />}
    </AbsoluteFill>
  );
};

// 24/11 Marcos: "nas cenas que ela aparece, uma LEGENDA MEIO CHAMATIVA pra tirar o foco do rosto dela, e algo meio high tech".
// LEGENDA DO AVATAR: blocos de até 3 palavras (quebra na pontuação), grandes; a palavra falada acende numa pílula roxa (corte seco, sem fade).
const blocosAv = (s0: number, s1: number) => {
  const ws = WORDS.filter((w) => w[0] >= s0 - 0.05 && w[0] < s1 - 0.2 && !/^friends/i.test(w[2])); // s1 já tem 0,18 s de folga: corta a palavra da frase seguinte
  const out: [number, number, string][][] = []; let cur: [number, number, string][] = [];
  ws.forEach((w, i) => { cur.push(w); if (cur.length >= 3 || /[.,?!:]$/.test(w[2]) || i === ws.length - 1) { out.push(cur); cur = []; } });
  return out;
};
const LegendaAv: React.FC<{ s0: number; s1: number; t: number }> = ({ s0, s1, t }) => {
  const bl = blocosAv(s0, s1);
  let b = bl.find((x) => t >= x[0][0] - 0.06 && t < (x[x.length - 1][1] + 0.12)) || bl.filter((x) => x[0][0] <= t).pop();
  if (!b) b = bl[0];
  if (!b) return null;
  let atual = -1; b.forEach((w, i) => { if (t >= w[0] - 0.04) atual = i; }); // só UMA palavra acesa: a última que já começou
  return (
    <div style={{ position: "absolute", left: 50, right: 50, top: 1300, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px 18px" }}>
      {b.map((w, i) => {
        const on = i === atual;
        return <span key={i} style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 92, lineHeight: 1.08, letterSpacing: -3, color: "#fff", padding: "4px 22px 10px", borderRadius: 22, background: on ? "#6D3FF2" : "rgba(8,7,13,.55)", textShadow: on ? "none" : "0 4px 18px rgba(0,0,0,.55)", transform: on ? "scale(1.06)" : undefined, boxShadow: on ? "0 18px 40px -12px rgba(109,63,242,.8)" : undefined }}>{w[2].replace(/[¿¡",]/g, "")}</span>;
      })}
    </div>
  );
};

// "FRIENDS" do jeito da capa (Marcos 25/11): cartão escuro, letras brancas e pontinhos vermelho/amarelo/azul; quando ela fala a palavra,
// sai da legenda e entra GRANDE no CENTRO da tela (mola), fica até o fim da aparição.
const CartaoFriends: React.FC<{ d: number }> = ({ d }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f < d) return null;
  const s = spring({ frame: f - d, fps, config: { damping: 13, stiffness: 170, mass: 0.6 } });
  const cores = ["#E53935", "#F2B01E", "#1E88E5"];
  const letras = "FRIENDS".split("");
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 820, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `scale(${interpolate(s, [0, 1], [1.4, 1])})`, opacity: Math.min(1, s * 1.6), background: "rgba(10,10,10,.88)", borderRadius: 36, padding: "30px 44px 34px", boxShadow: "0 30px 80px rgba(0,0,0,.55)" }}>
        <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 800, fontSize: 108, color: "#fff", letterSpacing: "0.02em", lineHeight: 1, whiteSpace: "nowrap" }}>
          {letras.map((l, i) => <span key={i}>{l}{i < letras.length - 1 && <span style={{ color: cores[i % 3], margin: "0 0.04em" }}>·</span>}</span>)}
        </div>
      </div>
    </div>
  );
};
// ACABAMENTO HIGH-TECH: cantos de visor, selo GRABANDO + nome em mono, varredura na entrada e "glitch" de 3 quadros no corte.
const HiTech: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const scan = interpolate(f, [0, 10], [0, 1920], { extrapolateRight: "clamp" });
  const canto = (pos: React.CSSProperties, r: number) => <div style={{ position: "absolute", width: 90, height: 90, borderTop: "6px solid rgba(255,255,255,.9)", borderLeft: "6px solid rgba(255,255,255,.9)", transform: `rotate(${r}deg)`, ...pos }} />;
  const pisca = Math.floor(f / 15) % 2 === 0;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {canto({ left: 46, top: 200 }, 0)}{canto({ right: 46, top: 200 }, 90)}{canto({ right: 46, bottom: 120 }, 180)}{canto({ left: 46, bottom: 120 }, 270)}
      <div style={{ position: "absolute", left: 70, top: 226, display: "flex", alignItems: "center", gap: 16, fontFamily: FONTE.mono, fontWeight: 600, fontSize: 32, letterSpacing: 4, color: "#fff", background: "rgba(8,7,13,.5)", padding: "10px 20px", borderRadius: 12 }}>
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#FF3B3B", opacity: pisca ? 1 : 0.25 }} />GRABANDO · MANUELA RODRÍGUEZ
      </div>
      <div style={{ position: "absolute", right: 76, bottom: 150, fontFamily: FONTE.mono, fontWeight: 600, fontSize: 30, letterSpacing: 4, color: "rgba(255,255,255,.85)" }}>FLUENCY ROUTE</div>
      {f < 10 && <div style={{ position: "absolute", left: 0, right: 0, top: scan, height: 4, background: "#9D7BFF", boxShadow: "0 0 30px 8px rgba(157,123,255,.7)" }} />}
      {f < 3 && <AbsoluteFill style={{ background: "rgba(109,63,242,.22)", mixBlendMode: "screen" }} />}
      {f > dur - 3 && <AbsoluteFill style={{ background: "rgba(255,255,255,.08)" }} />}
    </AbsoluteFill>
  );
};

export const FL_DUR = Math.ceil((mapa(VOZ_ORIG) + 3.5) * FL_FPS); // 3,5 s depois da última palavra: o cartão final (logo + botão) fica na tela
export type FlProps = { legenda: boolean; trilha: boolean };
export const FL_DEFAULTS: FlProps = { legenda: true, trilha: true };

const Legenda: React.FC<{ t: number }> = ({ t }) => {
  if (t >= INS[0] - 0.2 && t <= INS[1] + 0.2) return null; // no áudio do aluno a tradução é a própria cena
  const b = LEGENDA.find(([a, z]) => t >= a - 0.04 && t < z + 0.1);
  if (!b) return null;
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: 1764, display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 920, textAlign: "center", fontFamily: FONTE.sans, fontWeight: 600, fontSize: 42, lineHeight: 1.22, color: "rgba(255,255,255,.94)", textWrap: "balance", background: "rgba(7,8,10,.66)", borderRadius: 12, padding: "8px 22px 10px" } as React.CSSProperties}>{b[2]}</div>
    </div>
  );
};

// CAPÍTULOS: [cena que abre, nome]
export const CAPS: [string, string][] = [["hook", "EL TRUCO"], ["manuela", "QUIÉN"], ["dica", "POR QUÉ FRIENDS"], ["essencialTit", "FLUIDEZ ESENCIAL"], ["tresTemp", "ENTRENAMIENTO"], ["musico", "REPETICIÓN"], ["aluno", "PRUEBA"], ["oQue", "EL ENTRENAMIENTO"], ["travados", "PRECIO"], ["fases", "3 FASES"], ["coragem", "GARANTÍA"], ["viraChave", "TU TURNO"]];

// HUD: leitura de sistema em mono (marca · cena NN/75 · timecode). mix-blend difference = legível no preto, no roxo e no branco.
const Hud: React.FC<{ t: number }> = ({ t }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let i = 0; CENAS.forEach((c, k) => { if (t >= c.de) i = k; });
  const s = f / fps, z = (x: number) => String(Math.floor(x)).padStart(2, "0");
  const st: React.CSSProperties = { position: "absolute", top: 26, fontFamily: FONTE.mono, fontWeight: 500, fontSize: 28, letterSpacing: 3, color: "#fff", mixBlendMode: "difference", opacity: 0.6, fontVariantNumeric: "tabular-nums" };
  const NB = 26;
  return (<><div style={{ ...st, left: 40 }}>{(() => { let ci = 0; CAPS.forEach((c, q) => { if (t >= CENAS.find((x) => x.nome === c[0])!.de) ci = q; }); return z(ci + 1) + " // " + CAPS[ci][1]; })()}</div>
    <div style={{ position: "absolute", top: 22, left: 548, width: NB * 6, height: 36, display: "flex", alignItems: "center", gap: 2, mixBlendMode: "difference", opacity: 0.75 }}>
      {Array.from({ length: NB }, (_, k) => { const v = +(VOZ_ONDA[f - NB / 2 + k] || 0) / 9; return <div key={k} style={{ flex: 1, height: Math.max(2, v * 34), background: "#fff", opacity: k === NB / 2 ? 1 : 0.55 }} />; })}
    </div><div style={{ ...st, right: 40 }}>{z(i + 1)}/{CENAS.length} · {z(s / 60)}:{z(s % 60)}:{z(f % 30)}</div></>);
};

// cada cena entra com um soco seco de zoom (3,5 % → 0 em 8 frames) e segue num empurrão lento
const Cena: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const soco = interpolate(f, [0, 8], [0.035, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const empurra = interpolate(f, [0, Math.max(30, dur)], [0, 0.018]);
  const scan = interpolate(f, [0, 9], [0, 1920], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `scale(${1 + soco + empurra})`, transformOrigin: "50% 42%" }}>{children}</AbsoluteFill>
      {f < 9 && <div style={{ position: "absolute", left: 0, right: 0, top: scan, height: 3, background: "#fff", mixBlendMode: "difference", opacity: 0.7 }} />}
    </AbsoluteFill>
  );
};

export const FriendsLatam: React.FC<FlProps> = ({ legenda, trilha }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = inv(f / fps);
  const noAluno = t >= INS[0] - 0.3 && t <= INS[1] + 0.3;
  return (
    <FrameGlobal.Provider value={f}>
      <AbsoluteFill style={{ background: "#08070D", overflow: "hidden" }}>
        <Audio src={staticFile("voz/voz-final.mp3")} />
        {trilha && <Audio src={staticFile("trilha/trilha.mp3")} loop volume={noAluno ? 0.06 : 0.17} />}  {/* 25/11 Marcos: "abaixa bem pouquinho" (0,20 → 0,17) */}
        {CENAS.map((c, i) => {
          const de = Math.round(mapa(c.de) * fps);
          const fim = i + 1 < CENAS.length ? Math.round(mapa(CENAS[i + 1].de) * fps) : FL_DUR;
          const dur = fim - de;
          const Comp = c.Comp;
          return (
            <Sequence key={c.nome} name={c.nome} from={de} durationInFrames={dur} layout="none">
              <FrameGlobal.Provider value={f}>
                <Cena dur={dur}><Comp de={c.de} /></Cena>
              </FrameGlobal.Provider>
            </Sequence>
          );
        })}
        {/* 25/11 Marcos: sem a barra de progresso roxa no topo */}
        {JANELAS.map((j) => { const a = Math.round(mapa(j.s0) * fps), z = Math.min(Math.round(mapa(j.s1) * fps), a + (QUADROS[j.nome] ?? 9999) - (PULA[j.nome] ?? 0) - 1); /* fecha quando o vídeo acaba (a fala está inteira dentro) */ return <Sequence key={"av-" + j.nome} name={"avatar " + j.nome} from={a} durationInFrames={Math.max(1, z - a)} layout="none"><Avatar nome={j.nome} i={JANELAS.indexOf(j)} dur={Math.max(1, z - a)} /><HiTech dur={Math.max(1, z - a)} /><LegendaAv s0={j.s0} s1={j.s1} t={t} />{(() => { const w = WORDS.find((x) => x[0] >= j.s0 && x[0] < j.s1 && /^friends/i.test(x[2])); return w ? <CartaoFriends d={Math.round((mapa(w[0]) - mapa(j.s0)) * fps) - 2} /> : null; })()}</Sequence>; })}
        {/* 24/11 Marcos: sem o mostrador do topo (capítulo · cena NN/73 · cronômetro) */}
        {legenda && !JANELAS.some((j) => t >= j.s0 && t < j.s1) && <Legenda t={t} />}
      </AbsoluteFill>
    </FrameGlobal.Provider>
  );
};
