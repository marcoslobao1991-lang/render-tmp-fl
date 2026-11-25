// LOTE 1 — LEAD + PRESENTACIÓN (VSL Friends LATAM, Manuela). Base: Netflix Trick (mesma copy da /friends BR) com o kit Friends da BR2.
// Uma ideia por quadro; o que é dito em sequência TROCA no mesmo lugar. Frases de at() = texto EXATO do roteiro em espanhol.
import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, CP, FONTE, FUNDO, FUNDO_FRIO, FUNDO_QUENTE, Tela, Slot, Pop, Reveal, Rotulo, Titulo, Chave, Visto, Seta, Conta, useLin, useP } from "./tema";
import { EsforcoEps, Mapa, pinosMundo, TK, Player, SubES, SubCola, useClipT, Clipe, Chip, Giga, Riscado, Barra, Cabeca, Meio, Sub, Coment, Rosca, VERM, CINZA, CLIPS, ROXO, useAt } from "./kit";

// HOOK: a cena real de Friends já tocando no frame 0, legenda acendendo na fala
export const Hook: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const { tc } = useClipT("c1", 0);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="el truco simple" top={170} gap={10}>
        <TK t="Inglés con *Friends*" d={0} size={110} />
      </Cabeca>
      <Meio top={470}><Player clip="c1" d={-1} w={1000} barra={tc / CLIPS.c1.dur} sub={<SubES clip="c1" tc={tc} size={48} />} /></Meio>
      <Meio top={1120}>
        <Slot itens={[
          [at("mientras haces otras cosas"), <Clipe nome="dirigir" w={1000} h={520} rot="mientras manejas" seg={3} />],
          [at("en tu día"), <Clipe nome="bike" w={1000} h={520} rot="mientras entrenas" seg={3} />],
          [at("usando solo los audífonos"), <Clipe nome="fone" w={1000} h={520} rot="solo con los audífonos" seg={4} pos="50% 30%" />],
        ]} />
      </Meio>
    </Tela>
  );
};

// la traducción mental se apaga
export const Traducao: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const off = at("apagas la traducción mental");
  const on = 1 - useLin(off, 7);
  const apagado = f >= off + 4;
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="por qué funciona" top={150}>
        <TK t="Traducción mental" d={0} size={104} />
        <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 14 }}>
          <Chave on={on} w={300} corOn={CINZA} />
          <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 64, letterSpacing: 6, color: apagado ? VERM : CINZA }}>{apagado ? "OFF" : "ON"}</div>
        </div>
      </Cabeca>
      <Meio top={720} style={{ gap: 0 }}>
        <Chip size={76} fundo="#15171C">it's just some guy</Chip>
        <div style={{ height: 300, position: "relative", width: 900, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ position: "absolute", left: 449, top: 12, width: 4, height: 276, background: apagado ? VERM : "var(--tr)" }} />
          <div style={{ position: "relative", opacity: apagado ? 0.35 : 1 }}>
            <Chip size={50} cor={CINZA} fundo="#0E1014" borda="var(--tr)"><Riscado d={off + 2}>traducir al español primero</Riscado></Chip>
          </div>
        </div>
        <Pop d={at("adquiera el idioma")}><Chip size={76} fundo={ROXO} borda={ROXO} cor="#fff">simplemente entiendes</Chip></Pop>
      </Meio>
      <Meio top={1480}><Reveal d={at("adquiera el idioma", de, true) - 22}><Sub size={58}>Tu cerebro <span style={{ color: "var(--tx)", fontWeight: 800 }}>adquiere</span> el idioma</Sub></Reveal></Meio>
    </Tela>
  );
};

// la misma escena otra vez: el oído se afina
export const Repeticao: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const fim = at("cada vez mejor", de, true);
  const claro = interpolate(f, [0, fim], [0, 1], { extrapolateRight: "clamp" });
  const { tc } = useClipT("c2", 0);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="repetición" top={150}><TK t="La misma escena. *Otra vez.*" d={0} size={104} /></Cabeca>
      <Meio top={520}><Player clip="c2" w={1000} rep barra={tc / CLIPS.c2.dur} sub={<SubCola clip="c2" claro={claro} size={46} />} /></Meio>
      <Meio top={1190} style={{ gap: 26 }}>
        <Rotulo cor={CINZA} size={34}>lo que tu oído capta</Rotulo>
        <Barra v={0.1 + claro * 0.86} w={900} h={34} />
        <Giga size={210}><Conta d={0} dur={fim} de={10} ate={96} sufixo="%" /></Giga>
      </Meio>
    </Tela>
  );
};

// el inglés enredado: todo pegado → se separa
export const Embolado: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const some = at("desaparece");
  const p = useP(some, 12);
  const corre = interpolate(f, [0, some], [60, -2300], { extrapolateRight: "clamp" });
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Cabeca rot={f < some ? "cómo suena el inglés hoy" : "después del truco"} rotCor="#fff" top={150}>
        {f < some ? <TK t="Todo *enredado*" d={0} size={124} acento="#fff" /> : <Pop d={some}><Titulo size={124}>Clarísimo</Titulo></Pop>}
      </Cabeca>
      {f < some ? (
        <>
          <div style={{ position: "absolute", top: 640, left: corre, whiteSpace: "nowrap", fontFamily: FONTE.tit, fontWeight: 800, fontSize: 210, letterSpacing: -10, color: "var(--tx)", filter: "blur(5px)" }}>theresnothingtotellitsjustsomeguyiworkwith</div>
          <Meio top={1010}><Slot itens={[[at("todo pegado"), <Chip size={60} fundo="rgba(0,0,0,.4)">todo pegado</Chip>], [at("demasiado rápido"), <Chip size={60} fundo="rgba(0,0,0,.4)">demasiado rápido</Chip>]]} /></Meio>
        </>
      ) : (
        <div style={{ position: "absolute", left: "50%", top: 600, transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          {["There's nothing", "to tell,", "it's just some guy", "I work with."].map((l, i) => {
            const q = interpolate(p, [i * 0.14, i * 0.14 + 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return <div key={i} style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 104, letterSpacing: -4, lineHeight: 1.04, whiteSpace: "nowrap", color: "var(--tx)", opacity: q, transform: `translateX(${(1 - q) * -40}px)` }}>{l}</div>;
          })}
        </div>
      )}
    </Tela>
  );
};

// la primera meta: 1 episodio, 100 % en inglés, sin subtítulos
export const PrimeiroEp: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const sem = at("sin subtítulos");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="tu primera meta" top={150}><TK t="Tu primer *episodio*" d={0} size={112} /></Cabeca>
      <Meio top={500}>
        <Player clip="c0" ini={2} w={1000} tag="Episodio 1" barra={null}>
          {f >= sem && <div style={{ position: "absolute", left: 0, right: 0, bottom: 44, display: "flex", justifyContent: "center" }}><Pop d={sem}><Chip size={46} fundo="rgba(0,0,0,.72)" cor="#fff">subtítulos: OFF</Chip></Pop></div>}
        </Player>
      </Meio>
      <Meio top={1130} style={{ gap: 8 }}>
        <Pop d={at("100% en inglés")}><Giga size={300}><Conta d={at("100% en inglés")} dur={16} ate={100} sufixo="%" /></Giga></Pop>
        <Slot itens={[
          [at("en inglés", de + 2), <Sub size={64}>en inglés</Sub>],
          [sem, <Sub size={64}>sin subtítulos</Sub>],
          [at("en cuestión de días"), <Sub size={72}><span style={{ color: VERM, fontWeight: 800 }}>días</span>, no <Riscado d={at("no de años")}>años</Riscado></Sub>],
        ]} />
      </Meio>
    </Tela>
  );
};

// alumnos que dejaron las clases presenciales en Estados Unidos
export const AulaEUA: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const larga = at("Y dejaron las clases presenciales");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="nuestros alumnos" top={150}>
        <Slot itens={[[0, <TK t="Clases *presenciales*" d={0} size={104} />], [at("En Estados Unidos"), <Titulo size={108}>en <span style={{ color: VERM }}>Estados Unidos</span></Titulo>], [larga, <Titulo size={108}><Riscado d={larga + 3}>Clases presenciales</Riscado></Titulo>]]} />
      </Cabeca>
      <Meio top={480}>
        <div style={{ position: "relative", filter: f >= larga + 6 ? "grayscale(1) brightness(.55)" : undefined }}>
          <Clipe nome="sala2" w={1000} h={600} seg={9} />
        </div>
      </Meio>
      <Meio top={1150} style={{ gap: 30 }}>
        {f >= larga && <Seta d={larga + 4} x1={540} y1={-50} x2={540} y2={20} curva={0} cor={VERM} />}
        <Pop d={at("este mismo truco")}><div style={{ marginTop: 50 }}><Player clip="c1" w={640} tag="este mismo truco" barra={null} /></div></Pop>
      </Meio>
    </Tela>
  );
};

// el 2º episodio es más fácil
export const Segundo: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const e2 = at("el segundo episodio");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="qué pasa en el episodio 2" top={130}>
        <Slot itens={[[0, <TK t="Episodio 1: *todo es nuevo*" d={0} size={96} />], [e2, <Titulo size={96}>Episodio 2: <span style={{ color: VERM }}>ya conoces casi todo</span></Titulo>], [at("Va a ser mucho más fácil"), <Titulo size={104}>Mucho <span style={{ color: VERM }}>más fácil</span></Titulo>], [at("Pero mucho, mucho más fácil"), <Titulo size={104}>Mucho, <span style={{ color: VERM }}>mucho</span> más fácil</Titulo>]]} />
      </Cabeca>
      <Meio top={560}><EsforcoEps linhas={[{ d: 0, ep: "EPISODIO 1", v: 1, rot: "difícil" }, { d: e2, ep: "EPISODIO 2", v: 0.42, rot: "más fácil" }, { d: at("Pero mucho, mucho más fácil"), ep: "EPISODIO 3", v: 0.16, rot: "mucho más fácil" }]} /></Meio>
    </Tela>
  );
};

// entiendes a la primera → inglés operativo
export const DePrimeira: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const op = at("tu inglés ya va a ser totalmente");
  const f = useCurrentFrame();
  return (
    <Tela fundo={f >= op ? FUNDO_QUENTE : FUNDO}>
      <Cabeca rot={f >= op ? "y cuando eso pase" : "las palabras se repiten"} rotCor={f >= op ? "#fff" : CINZA} top={150}>
        <Slot itens={[[0, <TK t="Entendido. *A la primera.*" d={0} size={104} />], [op, <Titulo size={132}>Totalmente operativo</Titulo>]]} />
      </Cabeca>
      <Meio top={560}><Player clip="c5" w={1000} tag="primera escucha" tagCor="rgba(0,0,0,.7)" barra={null} sub={<SubES clip="c5" tc={99} size={52} />} /></Meio>
      <Meio top={1230}><Pop d={at("a la primera")}><div style={{ display: "flex", alignItems: "center", gap: 26 }}><Visto d={at("a la primera") + 3} size={110} cor="#fff" grossura={16} /><Sub size={70} cor="#fff">lo entendiste todo</Sub></div></Pop></Meio>
    </Tela>
  );
};

// lo que significa "operativo"
export const Operacional: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const dia = at("Y esa misma inmersión");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="inglés operativo" top={150}><TK t="Ya puedes" d={0} size={112} /></Cabeca>
      <Meio top={470}>
        <Slot itens={[
          [0, <Clipe nome="tv" w={1000} h={760} rot="ver películas sin subtítulos" seg={3} />],
          [at("conversar en inglés"), <Clipe nome="ligacao" w={1000} h={760} rot="conversar en inglés" seg={3} />],
          [at("leer libros"), <Clipe nome="estudo" w={1000} h={760} rot="leer libros en inglés" seg={3} />],
        ]} />
      </Meio>
      <Meio top={1330} style={{ gap: 26 }}>
        <Reveal d={dia}><Sub size={62}>más fluido <span style={{ color: VERM, fontWeight: 800 }}>cada día</span></Sub></Reveal>
        <Reveal d={dia}><Barra v={useLin(dia, 80) * 0.9 + 0.1} w={900} h={30} /></Reveal>
      </Meio>
    </Tela>
  );
};

// para qué quieres el inglés
export const Metas: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const m = at("medir tu propia evolución");
  const b = at("para pasar una entrevista");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="si quieres" top={150}><TK t="Inglés *definitivo*" d={0} size={116} /></Cabeca>
      {f < b ? (
        <Meio top={640} style={{ gap: 60 }}>
          <Reveal d={m}><Sub size={60}>y medir cada paso</Sub></Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {[0, 1, 2, 3].map((i) => {
              const d = m + 8 + i * 14;
              const on = f >= d;
              return (
                <React.Fragment key={i}>
                  {i > 0 && <div style={{ width: 150, height: 8, background: on ? VERM : "var(--tr)" }} />}
                  <div style={{ width: 130, height: 130, borderRadius: "50%", border: `8px solid ${on ? VERM : "var(--tr)"}`, background: on ? VERM : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTE.mono, fontWeight: 600, fontSize: 56, color: on ? "#fff" : CINZA }}>{i + 1}</div>
                </React.Fragment>
              );
            })}
          </div>
          <Reveal d={m + 8}><Rotulo cor={CINZA} size={34}>cada nueva meta alcanzada</Rotulo></Reveal>
        </Meio>
      ) : (
        <Meio top={470}>
          <Slot itens={[
            [b, <Clipe nome="entrevista" w={1000} h={760} rot="una entrevista de trabajo" seg={3} />],
            [at("para trabajar en una multinacional"), <Clipe nome="ligacao" w={1000} h={760} rot="una multinacional" seg={3} />],
            [at("o incluso para vivir en el extranjero"), <Clipe nome="aviao2" w={1000} h={760} rot="vivir en el extranjero" seg={4} />],
          ]} />
        </Meio>
      )}
    </Tela>
  );
};

// lo único que funcionó (prueba: comentarios reales)
export const Unica: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const nao = at("Y no solo a mí");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="después de todo lo que intenté" top={150}>
        <Slot itens={[[0, <TK t="Lo único que *funcionó*" d={0} size={110} />], [nao, <Titulo size={104}>Y <span style={{ color: VERM }}>miles</span> de alumnos</Titulo>]]} />
      </Cabeca>
      <Meio top={640}>
        <Slot itens={[
          [0, <Giga size={170} style={{ lineHeight: 1.04 }}>fluida en<br /><span style={{ color: VERM }}>inglés</span></Giga>],
          [nao + 6, <Coment user="alexandredantas89" likes={1} size={70} texto={<>¡Hice el mismo camino para aprender! Esta técnica <span style={{ color: "var(--tx)", fontWeight: 800 }}>funcionó muy bien.</span></>} />],
          [at("que aplicaron estos"), <Coment user="celsorocha514" likes={4} size={70} texto={<>Excelente. Lo que aprendí con películas <span style={{ color: "var(--tx)", fontWeight: 800 }}>nunca lo olvidé.</span></>} />],
        ]} />
      </Meio>
      <Meio top={1610}><Reveal d={nao + 6}><Rotulo cor={CINZA} size={30}>comentarios reales · traducidos</Rotulo></Reveal></Meio>
      <Meio top={1215}><Mapa d={at("en toda Latinoamérica") - 6} w={720} h={350} pinos={pinosMundo(at("en toda Latinoamérica"), 5)} /></Meio>
    </Tela>
  );
};

// MANUELA — o começo da cena é AVATAR em tela cheia ("Un placer… adicta al inglés"). Quando ele sai (Marcos 25/11: "crachá tá zoado, mais criativo"):
// TIPOGRAFIA EM MOVIMENTO: o nome se DIGITA gigante com cursor (como uma assinatura), "PROFESORA" cai como CARIMBO na palavra, e o logo da Fluency sobe.
export const Manuela: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prof = at("Y hoy soy profesora");
  const fr = at("aquí en Fluency Route");
  const ini = Math.max(0, prof - 14);
  const nome = "Manuela Rodríguez";
  const n = Math.max(0, Math.min(nome.length, Math.floor((f - ini) * 1.6)));
  const cursor = Math.floor(f / 8) % 2 === 0;
  const st = spring({ frame: f - prof, fps, config: { damping: 11, stiffness: 220, mass: 0.6 } });
  const sl = spring({ frame: f - fr, fps, config: { damping: 16, stiffness: 140, mass: 0.7 } });
  const [l1, l2] = [nome.slice(0, Math.min(n, 7)), n > 8 ? nome.slice(8, n) : ""];
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <div style={{ position: "absolute", left: 80, right: 60, top: 470 }}>
        <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 34, letterSpacing: 6, color: "rgba(255,255,255,.7)", marginBottom: 18, opacity: f >= ini ? 1 : 0 }}>TU PROFESORA</div>
        <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 168, lineHeight: 0.94, letterSpacing: -8, color: "#fff" }}>
          {l1}{n <= 7 && cursor && <span style={{ color: "#C9B8FF" }}>|</span>}<br />{l2}{n > 7 && n < nome.length && cursor && <span style={{ color: "#C9B8FF" }}>|</span>}
        </div>
      </div>
      {f >= prof && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 960, display: "flex", justifyContent: "center" }}>
          <div style={{ transform: `rotate(-6deg) scale(${interpolate(st, [0, 1], [2.2, 1])})`, opacity: Math.min(1, st * 2), border: "10px solid #fff", borderRadius: 26, padding: "14px 46px 18px", fontFamily: FONTE.tit, fontWeight: 800, fontSize: 124, letterSpacing: 6, color: "#fff", boxShadow: "0 30px 70px -20px rgba(0,0,0,.45)" }}>PROFESORA</div>
        </div>
      )}
      {f >= fr && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 1300, display: "flex", justifyContent: "center", alignItems: "center", gap: 22, transform: `translateY(${(1 - sl) * 80}px)`, opacity: sl }}>
          <Img src={staticFile("img/logo.png")} style={{ width: 120, height: 120 }} />
          <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 92, letterSpacing: -3, color: "#fff" }}>Fluency Route</div>
        </div>
      )}
    </Tela>
  );
};

// Fluency Route y el 90 %
export const Noventa: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const n = at("el 90% del tiempo");
  const v = useLin(n, 24) * 0.9;
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Cabeca rot="la primera escuela del mundo" rotCor="#fff" top={150}><TK t="Fluidez esencial" d={at("fluidez esencial") - 8} size={120} acento="#fff" /></Cabeca>
      <Meio top={560}>
        <Rosca v={v} size={640} cor="#fff" grossura={54}>
          <Giga size={230} cor="#fff">{Math.round(v * 100)}%</Giga>
        </Rosca>
      </Meio>
      <Meio top={1280} style={{ gap: 14 }}>
        <Reveal d={at("el inglés que más se habla")}><Sub size={64} cor="#fff">del inglés que más se habla</Sub></Reveal>
        <Reveal d={at("en discursos y conversaciones")}><Sub size={64} cor="#fff">en <span style={{ fontWeight: 800 }}>conversaciones reales</span></Sub></Reveal>
      </Meio>
    </Tela>
  );
};

// alumnos en todo el mundo (comentarios reales)
export const Mundo: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="Fluency Route hoy" top={130}><TK t="Alumnos *en todo el mundo*" d={0} size={104} /></Cabeca>
      <Meio top={470}><Mapa d={0} pinos={pinosMundo(at("en todo el mundo") - 4, 6)} /></Meio>
      <Meio top={1130}>
        <Slot itens={[
          [at("día tras día"), <Coment user="cristina_b123santos" likes={4} size={62} texto={<>El mejor video que he visto sobre cómo aprender un idioma. <span style={{ color: "var(--tx)", fontWeight: 800 }}>Pura verdad.</span></>} />],
          [at("y hoy están sintiendo"), <Coment user="1claudiosilva" likes={3} size={62} texto={<>¡Excelente video! <span style={{ color: "var(--tx)", fontWeight: 800 }}>Me gustó el método.</span> Lo voy a hacer.</>} />],
        ]} />
      </Meio>
      <Meio top={1668}><Reveal d={at("día tras día")}><Rotulo cor={CINZA} size={30}>comentarios reales · traducidos</Rotulo></Reveal></Meio>
    </Tela>
  );
};
