// LOTE 2 — LA CLASE (VSL Friends LATAM): por qué Friends, inglés esencial, el embudo hasta 1 escena, entrenamiento concentrado, el músico, las metas.
// Base: netflix-trick/c2.tsx (mismo motion) con escenas reales de Friends, palabras de ejemplo en INGLÉS y textos en español. at() = texto exacto del guion.
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CP, FONTE, FUNDO, FUNDO_FRIO, FUNDO_QUENTE, Tela, Slot, Pop, Reveal, Rotulo, Titulo, Chave, Visto, Conta, Traco, useLin } from "./tema";
import { EsforcoEps, Mapa, pinosMundo, useTx, ROXO, useAt, TK, Player, SubES, SubCola, useClipT, Clipe, Chip, Giga, Riscado, Barra, Cabeca, Meio, Sub, Coment, Painel, VERM, CINZA, CLIPS } from "./kit";

const B: React.FC<{ children: React.ReactNode; cor?: string }> = ({ children, cor = "#fff" }) => { const { tx } = useTx(); return <span style={{ color: tx(cor), fontWeight: 800 }}>{children}</span>; };

// "ya oíste hablar de Friends"
export const Dica: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="si ya intentaste aprender inglés" top={150}><TK t="Ya oíste *este consejo*" d={0} size={108} /></Cabeca>
      <Meio top={520}>
        <Pop d={at("ya oíste hablar de la serie Friends") - 4} from={0.9}>
          <div style={{ width: 920, background: "#6D3FF2", borderRadius: "70px 70px 70px 16px", padding: "64px 60px", fontFamily: FONTE.tit, fontWeight: 700, fontSize: 118, lineHeight: 1.04, letterSpacing: -5, color: "#FFFFFF", boxShadow: "0 40px 80px -30px rgba(109,63,242,.6)" }}>“Aprende inglés con Friends.”</div>
        </Pop>
      </Meio>
      <Meio top={1260}>
        <Slot itens={[
          [at("Hay a quien le gusta"), <Sub size={76}>a unos <B>les encanta</B></Sub>],
          [at("y a quien no"), <Sub size={76} cor={CINZA}>otros dicen que <B cor={VERM}>no funciona</B></Sub>],
        ]} />
      </Meio>
    </Tela>
  );
};

// quien se volvió fluido usó Friends
export const Series: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="quienes son fluidos de verdad" top={150}>
        <Slot itens={[[0, <TK t="Usaron *Friends*" d={0} size={130} />], [at("Lo interesante es analizar"), <Titulo size={150}>¿Por qué?</Titulo>], [at("¿Y cuál es, entonces,"), <Titulo size={104}>La <span style={{ color: VERM }}>mejor manera</span> de aprender inglés con Friends</Titulo>]]} />
      </Cabeca>
      <Meio top={640}><Player clip="c0" ini={4} w={1000} barra={null} /></Meio>
    </Tela>
  );
};

// conversación del día a día = inglés esencial
export const Cotidiano: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const { tc } = useClipT("c4", 0);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="el tipo de serie correcto" top={150}><TK t="Conversaciones *del día a día*" d={0} size={104} /></Cabeca>
      <Meio top={520}><Player clip="c4" w={1000} barra={tc / CLIPS.c4.dur} sub={<SubES clip="c4" tc={tc} size={46} />} /></Meio>
      <Meio top={1200} style={{ gap: 30 }}>
        <Reveal d={at("Exactamente el tipo de temas")}><Sub size={60}>lo que decimos en una <B>conversación común</B></Sub></Reveal>
        <Pop d={at("el inglés esencial")}><Chip size={84} fundo={ROXO} borda={ROXO} cor="#fff">inglés esencial</Chip></Pop>
      </Meio>
    </Tela>
  );
};

// película de ciencia ficción × serie de conversación: el vocabulario
const Lista: React.FC<{ tit: string; itens: string[]; d: number; morto?: number; vivo?: boolean }> = ({ tit, itens, d, morto = 99999, vivo = false }) => {
  const f = useCurrentFrame();
  if (f < d) return null;
  const m = f >= morto;
  return (
    <Painel w={960} pad={46} style={{ opacity: m ? 0.5 : 1, border: vivo ? `3px solid ${VERM}` : undefined }}>
      <Rotulo cor={vivo ? "#fff" : CINZA} size={32} style={{ textAlign: "left", marginBottom: 22 }}>{tit}</Rotulo>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 34px", fontFamily: FONTE.tit, fontWeight: 700, fontSize: 76, letterSpacing: -2, lineHeight: 1.1, color: vivo ? "var(--tx)" : CINZA }}>
        {itens.map((w, i) => <span key={i}>{m ? <Riscado d={morto + i * 3}>{w}</Riscado> : w}</span>)}
      </div>
    </Painel>
  );
};
export const Vocab: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const conv = at("Friends usa exactamente el tipo de vocabulario");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="lo que te enseña cada una" top={150}><TK t="No toda serie *sirve*" d={0} size={112} /></Cabeca>
      <Meio top={520} style={{ gap: 44 }}>
        <Lista tit="ciencia ficción · temas al azar" itens={["wormhole", "hyperdrive", "quantum flux"]} d={at("a diferencia de ver una película")} morto={conv} />
        <Lista tit="Friends · conversación" itens={["I don't know", "come on", "what's up?", "I mean", "you know"]} d={conv} vivo />
      </Meio>
    </Tela>
  );
};

// 500 palabras (Paul Nation)
export const Quinhentas: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const q = at("500 palabras");
  const n = Math.round(useLin(q, 50) * 500);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="Paul Nation · lingüista" top={150} />
      <Meio top={290}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(25, 30px)", gap: 8 }}>
          {Array.from({ length: 500 }, (_, i) => <div key={i} style={{ width: 30, height: 30, borderRadius: 7, background: f >= q && i < n ? VERM : "var(--tr)" }} />)}
        </div>
      </Meio>
      <Meio top={1100} style={{ gap: 0 }}>
        <Giga size={330}>{f >= q ? n : 0}</Giga>
        <Slot itens={[[q, <Sub size={70}>palabras</Sub>], [at("es más que suficiente"), <Sub size={64}>suficiente para conversar<br /><B cor={VERM}>el resto de tu vida</B></Sub>]]} />
      </Meio>
    </Tela>
  );
};

// la calculadora de palabras (una temporada entera de Friends)
const ROTEIRO = ["— So, what's going on with you?", "— Nothing. There's nothing to tell.", "— Come on, you're going out with the guy.", "— It's not even a date.", "— Okay, so what do you want to do?", "— I don't know. What do you want?", "— You know what? I'm fine.", "— Are you sure you're okay?", "— Yeah, I just need some coffee.", "— Me too. Let's go.", "— Wait, who is that?", "— I have no idea.", "— Okay, that's not what I meant."];
export const Calculadora: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const res = at("800 palabras diferentes");
  const liga = at("calculadora de palabras");
  const sobe = interpolate(f, [0, res], [0, -520], { extrapolateRight: "clamp" });
  const rola = f >= liga && f < res;
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="Friends · una temporada" top={150}><TK t="El guion en una *calculadora de palabras*" d={0} size={96} /></Cabeca>
      <Meio top={500}>
        <Painel w={980} pad={0} style={{ height: 500, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", left: 44, right: 30, top: 34, transform: `translateY(${sobe}px)`, fontFamily: FONTE.mono, fontWeight: 500, fontSize: 40, lineHeight: 1.75, color: "var(--tx2)", whiteSpace: "nowrap" }}>
            {[...ROTEIRO, ...ROTEIRO].map((l, i) => <div key={i}>{l}</div>)}
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, background: "linear-gradient(180deg, transparent, var(--pn))" }} />
        </Painel>
      </Meio>
      <Meio top={1060} style={{ gap: 4 }}>
        <Slot itens={[[liga, <Rotulo cor={CINZA} size={34}>contando palabras diferentes…</Rotulo>], [at("en un solo episodio"), <Rotulo cor={CINZA} size={34}>un episodio · una temporada</Rotulo>], [res, <Rotulo cor="#fff" size={34}>palabras diferentes en toda la temporada</Rotulo>]]} />
        <Giga size={340} cor={f >= res ? "#fff" : CINZA} style={{ filter: rola ? "blur(3px)" : undefined, marginTop: 20 }}>{f >= res ? <Conta d={res} dur={20} ate={800} /> : rola ? String(100 + ((f * 37) % 899)) : "000"}</Giga>
        <Reveal d={res + 12}><Sub size={62}>solo <B cor={VERM}>800</B>. Nada más.</Sub></Reveal>
      </Meio>
    </Tela>
  );
};

// you, that, me, who, what, I: más de 100 veces en un solo episodio
export const Mesmas: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const ds = [at("you that me"), at("that me who"), at("me who what"), at("who what I"), at("what I que"), at("I que se usan")];
  const ws = ["you", "that", "me", "who", "what", "I"];
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Cabeca rot="las mismas palabras" rotCor="#fff" top={150}><TK t="se repiten todo el tiempo" d={0} size={112} acento="#fff" /></Cabeca>
      <Meio top={560}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 300px)", gap: 30 }}>
          {ws.map((w, i) => {
            const on = f >= ds[i];
            const s = interpolate(f - ds[i], [0, 6], [1.18, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return <div key={w} style={{ height: 280, borderRadius: 36, background: on ? "#fff" : "rgba(0,0,0,.28)", border: "2px solid var(--tr)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTE.tit, fontWeight: 800, fontSize: 150, letterSpacing: -6, color: on ? "#1A0F3D" : "var(--tr)", transform: on ? `scale(${s})` : undefined }}>{w}</div>;
          })}
        </div>
      </Meio>
      <Meio top={1260}><Pop d={at("más de 100 veces")}><Sub size={70} cor="#fff"><B>más de 100 veces</B> en un solo episodio</Sub></Pop></Meio>
    </Tela>
  );
};

// no tiene sentido aprender cosas nuevas que no vas a usar
export const SemSentido: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const dif = at("Pero aquí te quiero mostrar");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="cuando entiendes esto" top={150}>
        <Slot itens={[[0, <TK t="Más cosas nuevas *no tiene sentido*" d={0} size={100} />], [dif, <Titulo size={110}>Un uso <span style={{ color: VERM }}>inteligente</span> de tu tiempo</Titulo>]]} />
      </Cabeca>
      <Meio top={640}>
        <Slot itens={[
          [at("aprendiendo un montón de cosas nuevas"), (
            <Painel w={900} pad={56}>
              <Rotulo cor={CINZA} size={32} style={{ textAlign: "left" }}>palabra del día</Rotulo>
              <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 116, letterSpacing: -5, color: "var(--tx)", margin: "22px 0 8px" }}><Riscado d={at("que no vas a usar")}>pencil sharpener</Riscado></div>
              <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: 54, color: CINZA }}>el sacapuntas</div>
              <Reveal d={at("que no vas a usar") + 4}><div style={{ marginTop: 34 }}><Chip size={50} cor="#fff" fundo={ROXO} borda={ROXO}>nunca la vas a usar</Chip></div></Reveal>
            </Painel>
          )],
          [dif, <Clipe nome="fone" w={1000} h={700} seg={6} pos="50% 30%" />],
        ]} />
      </Meio>
    </Tela>
  );
};

// FLUIDEZ ESENCIAL (la idea central)
export const EssencialTit: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Meio top={520} style={{ gap: 40 }}>
        <Rotulo cor="#fff" size={36}>la idea detrás del truco</Rotulo>
        <Giga size={210} cor="#fff" style={{ lineHeight: 0.98 }}>Fluidez<br />esencial</Giga>
        <Reveal d={at("que es cuando eres fluido")}><Sub size={66} cor="#fff" style={{ maxWidth: 900 }}>fluido en lo <B>más usado</B> del inglés</Sub></Reveal>
      </Meio>
    </Tela>
  );
};
export const Peso: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const foco = at("y enfocamos todo tu tiempo");
  const f = useCurrentFrame();
  const v = useLin(foco, 70);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="lo primero" top={150}>
        <Slot itens={[[0, <TK t="Fuera el *peso*" d={0} size={120} />], [foco, <Titulo size={108}>Todo tu tiempo en <span style={{ color: VERM }}>lo esencial</span></Titulo>], [at("Exactamente el tipo de fluidez"), <Titulo size={110}>La fluidez de <span style={{ color: VERM }}>Friends</span></Titulo>]]} />
      </Cabeca>
      {f < foco ? (
        <Meio top={640} style={{ gap: 30 }}>
          {["una palabra nueva", "una regla nueva", "un tiempo verbal nuevo"].map((w, i) => <Pop key={w} d={at("de quedarte aprendiendo cosas nuevas") - 6 + i * 7}><Chip size={70} cor={CINZA}><Riscado d={at("de quedarte aprendiendo cosas nuevas") + 10 + i * 6}>{w}</Riscado></Chip></Pop>)}
        </Meio>
      ) : f < at("Exactamente el tipo de fluidez") ? (
        <Meio top={700} style={{ gap: 30 }}>
          <Rotulo cor={CINZA} size={34}>qué tan bueno eres en lo esencial</Rotulo>
          <Barra v={0.12 + v * 0.84} w={920} h={56} />
          <Sub size={64}>cada vez <B>mejor</B></Sub>
        </Meio>
      ) : (
        <Meio top={640}><Player clip="c3" w={1000} barra={null} /></Meio>
      )}
    </Tela>
  );
};

// ya conoces esas palabras; solo no eres fluido en ellas
export const JaConhece: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const nf = at("Solo que no eres fluido");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="si ya estudiaste un poco" top={150}>
        <Slot itens={[[0, <TK t="Ya *conoces* estas palabras" d={0} size={108} />], [nf, <Titulo size={108}>Solo no eres <span style={{ color: VERM }}>fluido</span> en ellas</Titulo>], [at("Y por eso te va a resultar"), <Titulo size={108}>Por eso es <span style={{ color: VERM }}>mucho más fácil</span></Titulo>]]} />
      </Cabeca>
      <Meio top={600}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 22, width: 960 }}>
          {["hello", "thanks", "I want", "I have", "okay", "let's go", "what?", "I don't know"].map((w, i) => <Pop key={w} d={at("probablemente ya conoces") - 10 + i * 3}><Chip size={70}>{w}</Chip></Pop>)}
        </div>
      </Meio>
      <Meio top={1130} style={{ gap: 26 }}>
        <Reveal d={nf}>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, width: 920 }}>
            {[["las conoces", 1, "#fff"], ["eres fluido en ellas", 0.14, VERM]].map(([r, v, cor]) => (
              <div key={r as string}>
                <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 40, letterSpacing: 3, textTransform: "uppercase", color: CINZA, marginBottom: 12 }}>{r}</div>
                <Barra v={(v as number) * useLin(nf + 4, 16)} w={920} h={44} cor={cor as string} />
              </div>
            ))}
          </div>
        </Reveal>
      </Meio>
    </Tela>
  );
};

// una palabra nueva por día no resuelve
export const PalavraDia: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const np = at("Porque no sirve de nada");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="cómo lo vas a hacer" top={150}>
        <Slot itens={[[0, <TK t="Así es *cómo*" d={0} size={130} />], [np, <Titulo size={84} style={{ whiteSpace: "nowrap" }}><Riscado d={np + 6}>Una palabra nueva por día</Riscado></Titulo>]]} />
      </Cabeca>
      <Meio top={560}><Clipe nome="calendario" d={np} w={1000} h={640} seg={7} /></Meio>
      <Meio top={1270}><Reveal d={at("si no eres fluido ni siquiera")}><Sub size={64}>primero, fluido en <B cor={VERM}>lo esencial</B></Sub></Reveal></Meio>
    </Tela>
  );
};

// Friends tiene todo lo que necesitas
export const TemTudo: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const { tc } = useClipT("c3", 0);
  const linha = (n: string, txt: React.ReactNode) => (
    <div style={{ display: "flex", alignItems: "center", gap: 30, width: 940 }}>
      <div style={{ flex: "0 0 120px", height: 120, borderRadius: 30, background: VERM, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTE.mono, fontWeight: 600, fontSize: 64, color: "var(--tx)" }}>{n}</div>
      <div style={{ fontFamily: FONTE.tit, fontWeight: 700, fontSize: 76, letterSpacing: -3, lineHeight: 1.04, color: "var(--tx)" }}>{txt}</div>
    </div>
  );
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="aquí entra Friends" top={150}><TK t="Todo lo que necesitas, *en un solo lugar*" d={0} size={98} /></Cabeca>
      <Meio top={540}><Player clip="c3" w={1000} barra={tc / CLIPS.c3.dur} sub={<SubES clip="c3" tc={tc} size={46} />} /></Meio>
      <Meio top={1220}>
        <Slot itens={[
          [at("Con las principales expresiones"), linha("1", "las principales expresiones")],
          [at("las principales uniones de palabras"), linha("2", "cómo se unen las palabras")],
          [at("y el vocabulario exacto"), linha("3", "el vocabulario que más se usa")],
          [at("usado de la manera más común"), linha("4", "usado como se usa de verdad")],
        ]} />
      </Meio>
    </Tela>
  );
};

// 3 temporadas sin entender nada → lo contrario
export const TresTemp: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const op = at("que es haciendo exactamente lo contrario");
  const t3 = at("Va y ve tres temporadas");
  if (f >= op) return (
    <Tela fundo={FUNDO_QUENTE}>
      <Meio top={600} style={{ gap: 30 }}>
        <Rotulo cor="#fff" size={36}>una manera mucho mejor</Rotulo>
        <Pop d={op} from={0.8}><Giga size={150} cor="#fff" style={{ lineHeight: 1 }}>Exactamente<br />lo contrario</Giga></Pop>
      </Meio>
    </Tela>
  );
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="lo que hace la mayoría" top={150}>
        <Slot itens={[[0, <TK t="Series y películas" d={0} size={112} />], [t3, <Titulo size={112}><span style={{ color: "var(--tx)" }}>3 temporadas enteras</span></Titulo>], [at("Y la idea parece hasta buena"), <Titulo size={112}>Funciona… <span style={{ color: CINZA }}>un poco</span></Titulo>], [at("Pero hay una manera mucho mejor"), <Titulo size={112}>Hay una <span style={{ color: VERM }}>manera mejor</span></Titulo>]]} />
      </Cabeca>
      <Meio top={520}>
        <Player clip="c0" ini={8} w={1000} barra={null} escuro={0.25} sub={<div style={{ fontFamily: FONTE.sans, fontWeight: 700, fontSize: 48, color: "var(--tx)", textAlign: "center", filter: "blur(6px)" }}>theresgottobesomethingwrongwithhim</div>} />
      </Meio>
      <Meio top={1160} style={{ gap: 24 }}>
        {[1, 2, 3].map((s) => {
          const d = t3 + (s - 1) * 14;
          return (
            <Reveal key={s} d={d}>
              <div style={{ display: "flex", alignItems: "center", gap: 28, width: 940 }}>
                <div style={{ width: 330, fontFamily: FONTE.mono, fontWeight: 600, fontSize: 44, letterSpacing: 3, color: "var(--tx)" }}>TEMPORADA {s}</div>
                <Barra v={interpolate(f - d, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} w={380} h={30} cor="#fff" />
                <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: 40, color: CINZA }}>vista</div>
              </div>
            </Reveal>
          );
        })}
        <Reveal d={at("aunque no entienda nada")}><div style={{ marginTop: 16 }}><Chip size={60} cor="#fff" fundo="rgba(0,0,0,.4)">entendido: <B cor={VERM}>casi nada</B></Chip></div></Reveal>
      </Meio>
    </Tela>
  );
};

// EL EMBUDO: el idioma entero → esencial → 1 episodio → 1 escena
const NUVEM = "you I the to a it and that what is know no oh just this okay yeah me so don't we have of do in my are it's not I'm like right go on with her out get he all your can was there here want think be well hey for at mean gonna look come guys really she good got one about wait sorry thanks why who time how did all believe tell little love now could would never something nothing everything wormhole hyperdrive photosynthesis jurisprudence thermodynamics otorhinolaryngologist deoxyribonucleic idiosyncrasy".split(" ");
export const Funil: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = [at("Cuando pensamos en el idioma inglés"), at("Entonces lo reducimos al inglés esencial"), at("Entonces lo reducimos a un solo episodio"), at("Y entonces lo reducimos a una sola escena"), at("Y es a partir de aquí")];
  let est = -1; e.forEach((d, i) => { if (f >= d) est = i; });
  const W = [980, 700, 470, 470, 1000][Math.max(0, est)], H = [860, 600, 400, 264, 562][Math.max(0, est)];
  const s = est < 0 ? 0 : spring({ frame: f - e[est], fps, config: { damping: 18, stiffness: 130, mass: 0.8 } });
  const Wa = est > 0 ? [980, 700, 470, 470][est - 1] : W, Ha = est > 0 ? [860, 600, 400, 264][est - 1] : H;
  const w = Wa + (W - Wa) * s, h = Ha + (H - Ha) * s;
  const ROT = ["el idioma inglés entero", "inglés esencial", "1 episodio", "1 escena", "aquí empieza todo"];
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="piensa esto conmigo" top={150}>
        <Slot itens={[[0, <TK t="Menos para entrenar = *más foco*" d={0} size={104} />], [e[0], <Titulo size={108}>Es <span style={{ color: CINZA }}>mucho</span> para aprender</Titulo>], [e[1], <Titulo size={104}>Fuera el <span style={{ color: VERM }}>90%</span> del vocabulario</Titulo>], [e[2], <Titulo size={108}>Un solo <span style={{ color: VERM }}>episodio</span></Titulo>], [e[3], <Titulo size={108}>Una sola <span style={{ color: VERM }}>escena</span></Titulo>]]} />
      </Cabeca>
      {est >= 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 500, height: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {est > 0 && est < 4 && <div style={{ position: "absolute", width: 980, height: 860, borderRadius: 30, border: "2px dashed var(--tr)" }} />}
          <div style={{ position: "relative", width: w, height: h, borderRadius: 30, overflow: "hidden", background: "#15171C", border: `${est >= 1 ? 4 : 1.5}px solid ${est >= 1 ? VERM : "var(--tr)"}` }}>
            {est <= 1 && <div style={{ position: "absolute", inset: 24, display: "flex", flexWrap: "wrap", gap: "6px 16px", alignContent: "flex-start", fontFamily: FONTE.sans, fontWeight: 600, fontSize: 34, lineHeight: 1.2, color: est === 1 ? "#fff" : "#9DA2AD" }}>{(est === 1 ? NUVEM.slice(0, 60) : NUVEM).map((p, i) => <span key={i}>{p}</span>)}</div>}
            {est >= 2 && <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%,-50%) scale(${w / 1000})`, transformOrigin: "50% 50%" }}><Player clip={est === 2 ? "c0" : "c1"} ini={est === 2 ? 2 : 0} d={e[Math.min(est, 3)]} w={1000} raio={0} barra={null} tag={est === 2 ? "Episodio 1" : est === 3 ? "Escena 1" : undefined} /></div>}
          </div>
        </div>
      )}
      <Meio top={1440}><Slot itens={e.map((d, i) => [d, <Chip size={62} cor="#fff" fundo={i >= 1 ? VERM : "rgba(255,255,255,.08)"} borda={i >= 1 ? VERM : "var(--tr)"}>{ROT[i]}</Chip>] as [number, React.ReactNode])} /></Meio>
    </Tela>
  );
};

// ENTRENAMIENTO CONCENTRADO: la misma escena, varias veces, hasta dominarla (los 1,9 s de la frase son AVATAR)
export const Focado: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const dom = at("hasta que domines esa escena");
  const claro = interpolate(f, [at("y repetirla varias veces"), dom + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const { tc } = useClipT("c1", 0);
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Cabeca rot="yo lo llamo" rotCor="#fff" top={150}><TK t="Entrenamiento concentrado" d={0} size={112} acento="#fff" /></Cabeca>
      <Meio top={520}><Player clip="c1" w={1000} rep barra={tc / CLIPS.c1.dur} sub={claro > 0.95 ? <SubES clip="c1" tc={tc} size={46} /> : <SubCola clip="c1" claro={claro} size={46} />} /></Meio>
      <Meio top={1200} style={{ gap: 26 }}>
        <Slot itens={[
          [at("en vez de ver un montón"), <Sub size={64} cor="#fff"><Riscado d={at("de forma superficial y aleatoria") + 4} cor="#fff">un montón de cosas al azar</Riscado></Sub>],
          [at("vas a tomar una sola escena"), <Sub size={70} cor="#fff"><B>una escena</B>, en repetición</Sub>],
          [dom, <div style={{ display: "flex", alignItems: "center", gap: 24 }}><Visto d={dom + 4} size={100} cor="#fff" grossura={15} /><Sub size={74} cor="#fff">escena <B>dominada</B></Sub></div>],
        ]} />
      </Meio>
    </Tela>
  );
};

// lo enredado se vuelve nítido; la velocidad era normal
export const Nitido: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const { tc } = useClipT("c1", 0);
  const vel = at("hablan a una velocidad normal");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="lo que pasa después" top={150}>
        <Slot itens={[[0, <TK t="Pasan *algunas cosas*" d={0} size={112} />], [at("Primero, ese inglés enredado"), <Titulo size={112}>Lo enredado se vuelve <span style={{ color: VERM }}>nítido</span></Titulo>], [at("Empiezas a darte cuenta de que, en realidad,"), <Titulo size={112}>Nunca fue <span style={{ color: VERM }}>demasiado rápido</span></Titulo>]]} />
      </Cabeca>
      <Meio top={540}><Player clip="c1" w={1000} barra={tc / CLIPS.c1.dur} sub={<SubES clip="c1" tc={tc} size={48} />} /></Meio>
      <Meio top={1220}><Pop d={vel}><div style={{ display: "flex", alignItems: "baseline", gap: 26 }}><Giga size={230}>1.0×</Giga><Sub size={64}>velocidad normal</Sub></div></Pop></Meio>
    </Tela>
  );
};

// la segunda escena ya es más fácil
export const SegundaCena: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const { tc } = useClipT("c2", 0);
  const rep = at("Empiezas a ver cómo el inglés se repite");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="después pasas a la siguiente" top={150}><TK t="La escena 2 es *mucho más fácil*" d={0} size={104} /></Cabeca>
      <Meio top={520}><Player clip="c2" w={1000} tag="Escena 2" barra={tc / CLIPS.c2.dur} sub={<SubES clip="c2" tc={tc} size={48} />} /></Meio>
      <Meio top={1190} style={{ gap: 30 }}>
        <Reveal d={rep}><Sub size={64}>el inglés <B cor={VERM}>se repite</B> todo el tiempo</Sub></Reveal>
        <div style={{ display: "flex", gap: 18 }}>{["you", "the", "that", "what", "with"].map((w, i) => <Pop key={w} d={rep + 6 + i * 4}><Chip size={62} cor="#fff" fundo={ROXO} borda={ROXO}>{w}</Chip></Pop>)}</div>
        <Reveal d={rep + 26}><Rotulo cor={CINZA} size={32}>palabras que ya entrenaste</Rotulo></Reveal>
      </Meio>
    </Tela>
  );
};

// escena por escena hasta la 1ª meta: el episodio entero, 100 %, sin subtítulos
export const MetaEp: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const cem = at("100% en inglés, sin subtítulos");
  const ep = at("20 minutos de conversación");
  const n = Math.round(interpolate(f, [0, cem + 10], [0, 96], { extrapolateRight: "clamp" }));
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="tu primera meta de fluidez" top={150}>
        <Slot itens={[[0, <TK t="Escena por escena" d={0} size={116} />], [at("La meta de entender ese episodio"), <Titulo size={108}>El <span style={{ color: VERM }}>episodio</span> entero</Titulo>], [at("Y puedes hacerlo en cuestión de días"), <Titulo size={108}>En <span style={{ color: VERM }}>días</span>. No en <Riscado d={at("y no de años", de + 10) + 2}>años</Riscado>.</Titulo>]]} />
      </Cabeca>
      {f < ep ? (
        <>
          <Meio top={520}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 66px)", gap: 12 }}>
              {Array.from({ length: 96 }, (_, i) => <div key={i} style={{ width: 66, height: 66, borderRadius: 14, background: i < n ? VERM : "var(--tr)" }} />)}
            </div>
          </Meio>
          <Meio top={1200} style={{ gap: 6 }}>
            <Giga size={260}>{Math.round((n / 96) * 100)}%</Giga>
            <Slot itens={[[0, <Sub size={60}>escenas que entiendes</Sub>], [cem, <Sub size={60}>100% en inglés</Sub>], [at("sin subtítulos", de + 5), <Sub size={64}><B cor={VERM}>sin subtítulos</B></Sub>]]} />
          </Meio>
        </>
      ) : (
        <>
          <Meio top={540}><Player clip="c0" ini={2} d={ep} w={1000} tag="Episodio 1 · sin subtítulos" barra={Math.min(1, (f - ep) / (at("Y puedes hacerlo en cuestión de días") - ep + 60))} /></Meio>
          <Meio top={1220}><Slot itens={[[ep, <Sub size={66}>de principio <B>a fin</B></Sub>], [at("y tú entendiendo absolutamente"), <Sub size={70}>entendiendo <B cor={VERM}>absolutamente todo</B></Sub>]]} /></Meio>
        </>
      )}
    </Tela>
  );
};

// por primera vez: entrenamiento → resultado
export const Resultado: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const d = at("estás entrenando inglés de verdad");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="la sensación" top={150}><TK t="Por *primera vez*" d={0} size={124} /></Cabeca>
      <div style={{ position: "absolute", left: 90, top: 560, width: 900, height: 620 }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 900, height: 3, background: "var(--tr)" }} />
        <Traco d={d} dur={50} w={14} cor={VERM} path="M0,600 C200,590 320,520 450,380 S760,90 900,20" />
        <Reveal d={d} style={{ position: "absolute", left: 0, bottom: -70 }}><Rotulo cor={CINZA} size={32}>tu entrenamiento</Rotulo></Reveal>
        <Reveal d={at("y viendo el resultado")} style={{ position: "absolute", right: 0, top: -90 }}><Chip size={56} cor="#fff" fundo={ROXO} borda={ROXO}>resultados</Chip></Reveal>
      </div>
      <Meio top={1340}><Reveal d={d}><Sub size={68}>estás <B>entrenando</B> inglés de verdad</Sub></Reveal></Meio>
    </Tela>
  );
};

// los músicos conocen el entrenamiento concentrado
export const Musico: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="quién conoce el entrenamiento concentrado" top={150}>
        <Slot itens={[[0, <TK t="Los músicos" d={0} size={140} />], [at("aprende una sola canción a la vez"), <Titulo size={112}><span style={{ color: VERM }}>Una canción</span> a la vez</Titulo>]]} />
      </Cabeca>
      <Meio top={520}><Clipe nome="violao" w={1000} h={900} seg={9} /></Meio>
    </Tela>
  );
};
// la canción en fragmentos: un fragmento en repetición; los siguientes son más fáciles. Después: inglés = habilidad
export const Trechos: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const q = at("La divide en fragmentos");
  const r = at("y repite cada fragmento");
  const facil = at("Y ese fragmento se vuelve más fácil");
  const prox = at("Se van volviendo cada vez más fáciles");
  const esp = at("Y bueno, en el inglés pasa exactamente");
  const seg = [0.18, 0.14, 0.2, 0.16, 0.17, 0.15];
  const voltas = f >= r ? Math.min(6, 1 + Math.floor((f - r) / 14)) : 0;
  return (
    <Tela fundo={f >= esp ? FUNDO_QUENTE : FUNDO_FRIO}>
      <Cabeca rot={f >= esp ? "y en el inglés" : "cómo practica un músico"} rotCor={f >= esp ? "#fff" : CINZA} top={150}>
        <Slot itens={[[0, <TK t="No la *canción entera*" d={0} size={112} />], [q, <Titulo size={112}>Fragmento por <span style={{ color: VERM }}>fragmento</span></Titulo>], [esp, <Titulo size={116}>Exactamente igual</Titulo>], [at("porque el inglés también es"), <Titulo size={108}>El inglés es una <span style={{ color: "var(--tx)" }}>habilidad</span></Titulo>]]} />
      </Cabeca>
      <Meio top={640} style={{ gap: 40 }}>
        <Rotulo cor={f >= esp ? "#fff" : CINZA} size={34}>{f >= esp ? "un episodio" : "una canción"}</Rotulo>
        <div style={{ display: "flex", gap: f >= q ? 14 : 0, width: 960, height: 200 }}>
          {seg.map((w, i) => {
            const feito = i === 0 ? f >= facil : f >= prox + (i - 1) * 7;
            const ativo = i === 0 && f >= r && f < facil;
            return <div key={i} style={{ flex: w, borderRadius: f >= q ? 22 : 0, background: feito ? (f >= esp ? "#fff" : VERM) : "var(--tr)", border: ativo ? `5px solid ${VERM}` : "1.5px solid var(--tr)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTE.mono, fontWeight: 600, fontSize: 54, color: "var(--tx)" }}>{ativo ? `${voltas}×` : ""}</div>;
          })}
        </div>
        <Slot itens={[
          [r, <Sub size={66}>repite <B>un fragmento</B></Sub>],
          [facil, <Sub size={66}>ese fragmento se vuelve <B cor={VERM}>más fácil</B></Sub>],
          [at("¿Y adivina qué pasa"), <Sub size={66}>¿y los siguientes?</Sub>],
          [prox, <Sub size={66}><B cor={VERM}>cada vez más fáciles</B></Sub>],
          [esp, <Sub size={66} cor="#fff">fragmentos = <B>escenas</B></Sub>],
          [at("necesita entrenamiento y repetición"), <Sub size={66} cor="#fff">entrenamiento + <B>repetición</B></Sub>],
        ]} />
      </Meio>
    </Tela>
  );
};

// la ventaja: el entrenamiento de oído cabe en tu día
export const Vantagem: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const off = at("apagar la traducción mental");
  const on = 1 - useLin(off, 7);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="entrenamiento de oído" top={150}>
        <Slot itens={[[0, <TK t="Tienes una *ventaja*" d={0} size={112} />], [at("justamente porque estás entrenando el automático"), <Titulo size={108}>El <span style={{ color: VERM }}>automático</span> de tu cerebro</Titulo>], [off - 30, <Titulo size={100}>Traducción mental: <span style={{ color: f >= off + 4 ? VERM : CINZA }}>{f >= off + 4 ? "OFF" : "ON"}</span></Titulo>]]} />
      </Cabeca>
      <Meio top={540}>
        <Slot itens={[
          [0, <Clipe nome="fone" w={1000} h={700} rot="con los audífonos" seg={4} pos="50% 30%" />],
          [at("puedes hacerlo mientras haces otras cosas"), <Clipe nome="dirigir" w={1000} h={700} rot="mientras manejas" seg={4} />],
          [at("justamente porque estás entrenando el automático"), <Clipe nome="bike" w={1000} h={700} rot="mientras entrenas" seg={5} />],
          [at("Cuando estás haciendo otras cosas"), <Clipe nome="dirigir" ini={6} w={1000} h={700} rot="mientras haces cualquier cosa" seg={7} />],
        ]} />
      </Meio>
      <Meio top={1310} style={{ gap: 26 }}>
        {f >= off - 30 && <Chave on={on} w={320} corOn={CINZA} />}
        <Reveal d={at("adquirir el idioma de verdad")}><Sub size={66}>ahí sí <B cor={VERM}>adquieres</B> el idioma</Sub></Reveal>
      </Meio>
    </Tela>
  );
};

// la confianza para ver otras cosas
export const Confianca: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="después de pocos episodios" top={150}><TK t="Mucha más *confianza*" d={0} size={116} /></Cabeca>
      <Meio top={520}>
        <Slot itens={[
          [0, <Player clip="c5" w={1000} barra={null} />],
          [at("para ver otras cosas en inglés"), <Clipe nome="tv" w={1000} h={760} rot="otras series en inglés" seg={4} />],
          [at("O incluso para empezar a ver"), <Clipe nome="celular2" w={1000} h={760} rot="lo que te gusta ver" seg={4} />],
          [at("o un libro en inglés"), <Clipe nome="estudo" w={1000} h={760} rot="un libro en inglés" seg={3} />],
        ]} />
      </Meio>
    </Tela>
  );
};

// 5 episodios · todo el mundo estudia, tú entrenas
export const Cinco: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const tr = at("Porque mientras todo el mundo");
  if (f >= tr) return (
    <Tela fundo={FUNDO}>
      <Meio top={420} style={{ gap: 70 }}>
        <div style={{ textAlign: "center" }}>
          <Rotulo cor={CINZA} size={36}>todo el mundo</Rotulo>
          <Giga size={160} cor={CINZA} style={{ marginTop: 16 }}><Riscado d={at("y quedándose estancado")} h={16}>estudiando</Riscado></Giga>
          <Reveal d={at("y quedándose estancado")}><Sub size={56} cor={CINZA} style={{ marginTop: 14 }}>y estancado</Sub></Reveal>
        </div>
        <Pop d={at("tú vas a estar, de verdad,")}>
          <div style={{ textAlign: "center" }}>
            <Rotulo cor="#fff" size={36}>tú</Rotulo>
            <Giga size={170} cor={VERM} style={{ marginTop: 16 }}>entrenando</Giga>
          </div>
        </Pop>
        <Reveal d={at("para desbloquear tu fluidez")}><Sub size={60}>fluidez <B>desbloqueada</B>. Sin traducir.</Sub></Reveal>
      </Meio>
    </Tela>
  );
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Meio top={360} style={{ gap: 0 }}>
        <Rotulo cor="#fff" size={36}>con solo</Rotulo>
        <Giga size={760} cor="#fff" style={{ lineHeight: 0.92 }}>5</Giga>
        <Giga size={170} cor="#fff">episodios</Giga>
        <Reveal d={at("tu inglés ya entra en un nivel")}><Sub size={64} cor="#fff" style={{ marginTop: 44 }}>un nivel que <B>nunca viste antes</B></Sub></Reveal>
      </Meio>
    </Tela>
  );
};

// los alumnos se ríen (la primera frase es AVATAR)
export const Risada: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="aquí en Fluency Route" top={150}>
        <Slot itens={[[0, <TK t="Los alumnos *se ríen*" d={0} size={112} />], [at("Y por eso, dentro de nuestro entrenamiento"), <Titulo size={112}>La <span style={{ color: VERM }}>primera meta</span></Titulo>]]} />
      </Cabeca>
      <Meio top={520}><Clipe nome="rindo" w={1000} h={720} seg={9} /></Meio>
      <Meio top={1300} style={{ gap: 20 }}>
        <Slot itens={[
          [at("cuando se dan cuenta"), <Sub size={62}>“espera… lo estoy <B>entendiendo</B>”</Sub>],
          [at("su primer episodio 100%"), <Sub size={62}>primer episodio · <B cor={VERM}>100%</B> · sin subtítulos</Sub>],
          [at("y la primera meta que ponemos"), <Sub size={62}>episodio 1, <B cor={VERM}>sin subtítulos</B></Sub>],
        ]} />
      </Meio>
    </Tela>
  );
};

// cada episodio se vuelve más fácil
export const Escada5: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="cada episodio nuevo" top={130}>
        <Slot itens={[[0, <TK t="Episodio 2: *mucho más fácil*" d={0} size={96} />], [at("y el tercero ni te cuento"), <Titulo size={96}>Episodio 3: <span style={{ color: VERM }}>ni te cuento</span></Titulo>], [at("no quieres dejar de entrenar"), <Titulo size={96}>No quieres <span style={{ color: VERM }}>parar</span></Titulo>], [at("Hasta porque todo empieza a ser más fácil"), <Titulo size={96}>Más fácil. Y <span style={{ color: VERM }}>más divertido.</span></Titulo>]]} />
      </Cabeca>
      <Meio top={560}><EsforcoEps linhas={[{ d: 0, ep: "EPISODIO 1", v: 1, rot: "difícil" }, { d: at("el segundo es mucho más fácil"), ep: "EPISODIO 2", v: 0.42, rot: "mucho más fácil" }, { d: at("y el tercero ni te cuento"), ep: "EPISODIO 3", v: 0.14, rot: "ni te cuento" }]} /></Meio>
    </Tela>
  );
};

// otra vez el músico: la 1ª canción es la más difícil
export const Musico2: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="muy parecido a un músico" top={150}>
        <Slot itens={[
          [0, <TK t="Canción 1: *difícil*" d={at("la primera canción es difícil") - 4} size={120} acento={CINZA} />],
          [at("la segunda es mucho más disfrutable"), <Titulo size={120}>Canción 2: <span style={{ color: VERM }}>divertida</span></Titulo>],
          [at("la tercera todavía más"), <Titulo size={116}>Canción 3: <span style={{ color: VERM }}>todavía más</span></Titulo>],
          [at("en cuestión de minutos") - 20, <Titulo size={112}>Una canción nueva en <span style={{ color: VERM }}>minutos</span></Titulo>],
          [at("En el inglés también pasa"), <Titulo size={116}>En el inglés, <span style={{ color: VERM }}>igual</span></Titulo>],
        ]} />
      </Cabeca>
      <Meio top={520}><Clipe nome="violao2" w={1000} h={900} seg={12} /></Meio>
    </Tela>
  );
};

// el episodio nuevo ya viene lleno de lo que entrenaste
const BLOCOS = ["what's up?", "come on", "I don't know", "I have to", "let's go", "why?", "I'm sorry", "it's okay", "no way", "right now", "I swear", "really?"];
export const Blocos: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const cheio = at("ya está lleno de palabras");
  const salto = at("Y ahí empiezas a sentir");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="por la fluidez esencial" top={150}>
        <Slot itens={[[0, <TK t="Cada episodio nuevo" d={0} size={116} />], [cheio, <Titulo size={110}>ya te <span style={{ color: VERM }}>suena</span></Titulo>], [salto, <Titulo size={110}>Una evolución <span style={{ color: VERM }}>brusca</span></Titulo>]]} />
      </Cabeca>
      <Meio top={520}>
        <Painel w={980} pad={40}>
          <Rotulo cor="#fff" size={34} style={{ textAlign: "left", marginBottom: 26 }}>Episodio 2 · lo que tiene adentro</Rotulo>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {BLOCOS.map((b, i) => {
              const novo = i === 5 || i === 10;
              const on = f >= cheio + i * 3 && !novo;
              return <div key={b} style={{ fontFamily: FONTE.sans, fontWeight: 700, fontSize: 56, padding: "16px 28px", borderRadius: 20, background: on ? VERM : "rgba(255,255,255,.07)", color: on ? "#fff" : CINZA, border: "1.5px solid var(--tr)" }}>{b}</div>;
            })}
          </div>
        </Painel>
      </Meio>
      <Meio top={1480} style={{ gap: 18 }}>
        <Slot itens={[
          [at("palabras, expresiones y bloques"), <Sub size={60}>palabras, expresiones, bloques de conversación</Sub>],
          [at("que entrenaste en el anterior"), <div style={{ display: "flex", gap: 30, alignItems: "center" }}><Chip size={50} cor="#fff" fundo={ROXO} borda={ROXO}>ya entrenado</Chip><Chip size={50} cor={CINZA}>nuevo</Chip></div>],
        ]} />
      </Meio>
    </Tela>
  );
};

// cientos de alumnos
export const Centenas: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="Fluency Route hoy" top={130}><TK t="*Cientos* de alumnos en todo el mundo" d={0} size={90} /></Cabeca>
      <Meio top={500}><Mapa d={0} pinos={pinosMundo(at("en todo el mundo") - 6, 5)} /></Meio>
      <Meio top={1160}>
        <Slot itens={[
          [at("que están desbloqueando"), <Coment user="edwilsontoledo4499" likes={5} size={54} texto={<>Aprendí a tocar guitarra solo y es exactamente como dices. <B>Mis oídos fueron mis maestros.</B></>} />],
          [at("internalizando el idioma"), <Coment user="thimdk6" likes={1} size={62} texto={<>Esta clase no es solo de inglés, <B>es de aprendizaje.</B> ¡MUY BUENA!</>} />],
        ]} />
      </Meio>
      <Meio top={1610}><Reveal d={at("que están desbloqueando")}><Rotulo cor={CINZA} size={30}>comentarios reales · traducidos</Rotulo></Reveal></Meio>
    </Tela>
  );
};
