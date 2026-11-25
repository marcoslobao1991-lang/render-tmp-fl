// LOTE 3 — PRUEBA + OFERTA (VSL Friends LATAM): audio REAL del alumno, qué trae el entrenamiento, el app haciendo (oído y habla), precio US$ 49, fases.
// Base: netflix-trick/c3.tsx. El app aparece RECREADO en código (AppOuvido/AppFala/AppSeries en español, serie Friends) dentro del iPhone: la grabación real tiene la interfaz en portugués.
import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CP, FONTE, FUNDO, FUNDO_FRIO, FUNDO_QUENTE, FUNDO_VERDE, Tela, Slot, Pop, Reveal, Rotulo, Titulo, Traco, Celular, useLin, useNa } from "./tema";
import { useTx, ROXO, useAt, TK, Player, Clipe, Chip, Giga, Riscado, Barra, Cabeca, Meio, Sub, Coment, Painel, AudioMsg, Botao, Item, AppOuvido, AppFala, AppSeries, SERIES, VERM, VERDE, CINZA } from "./kit";
import { ALUNO } from "./legenda";
import { INS } from "./cortes";
import { PRECO } from "./preco";

const B: React.FC<{ children: React.ReactNode; cor?: string }> = ({ children, cor = "#fff" }) => { const { tx } = useTx(); return <span style={{ color: tx(cor), fontWeight: 800 }}>{children}</span>; };
const USD = `US$ ${PRECO}`;
// iPhone con el app: troca de tela en cada palabra (corte seco, sin animar de nuevo)
const Tel: React.FC<{ w?: number; children: React.ReactNode }> = ({ w = 560, children }) => <Celular w={w} seco>{children}</Celular>;

// el audio REAL del alumno (portugués, subtítulo grande en español). La frase "Mira lo que este alumno…" es AVATAR.
export const Aluno: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const na = useNa(de);
  const f = useCurrentFrame();
  const ini = na(INS[0]), fim = na(INS[1]);
  const p = interpolate(f, [ini, fim], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const toca = f >= ini && f < fim;
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="después de empezar el entrenamiento concentrado" top={150}>
        <Slot itens={[[0, <TK t="Lo que *este alumno* nos envió" d={0} size={100} />], [ini, <Titulo size={100}>Dejó su <span style={{ color: VERM }}>escuela de inglés</span> en EE. UU.</Titulo>]]} />
      </Cabeca>
      <Meio top={560}><AudioMsg p={p} tocando={toca} /></Meio>
      <Meio top={960} style={{ gap: 22 }}>
        {f < ini ? (
          <>
            <Reveal d={at("él vive en Estados Unidos")}><Chip size={58}>vive en <B>Estados Unidos</B></Chip></Reveal>
            <Reveal d={at("y estaba tomando clases presenciales")}><Chip size={58}>tomaba <B cor={VERM}>clases presenciales</B> allá</Chip></Reveal>
          </>
        ) : (
          <div style={{ width: 980, minHeight: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Slot itens={ALUNO.map(([a, , tx]) => [na(a), <div style={{ fontFamily: FONTE.tit, fontWeight: 700, fontSize: 100, lineHeight: 1.06, letterSpacing: -4, color: "var(--tx)", textAlign: "center", textWrap: "balance" } as React.CSSProperties}>“{tx}”</div>] as [number, React.ReactNode])} />
          </div>
        )}
      </Meio>
      {f >= ini && <Meio top={1480}><Rotulo cor={CINZA} size={32}>audio real · traducido</Rotulo></Meio>}
    </Tela>
  );
};

// es solo un ejemplo
export const Exemplo: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="y este es solo un ejemplo" top={150}>
        <Slot itens={[[0, <TK t="Los mensajes que *recibimos*" d={0} size={112} />], [at("Y esto también te puede pasar"), <Titulo size={112}>Te puede pasar <span style={{ color: VERM }}>a ti</span> también</Titulo>]]} />
      </Cabeca>
      <Meio top={640}>
        <Slot itens={[
          [0, <Coment user="cristina_b123santos" likes={4} size={62} texto={<>El mejor video que he visto sobre cómo aprender un idioma. <B>Pura verdad.</B></>} />],
          [at("cuando empiezan a sentir la evolución"), <Coment user="alexandredantas89" likes={1} size={66} texto={<>¡Hice el mismo camino para aprender! Esta técnica <B>funcionó muy bien.</B></>} />],
          [at("Y esto también te puede pasar") + 20, <Coment user="celsorocha514" likes={4} size={66} texto={<>Excelente. Lo que aprendí con películas <B>nunca lo olvidé.</B></>} />],
        ]} />
      </Meio>
      <Meio top={1380}><Rotulo cor={CINZA} size={32}>comentarios reales · traducidos</Rotulo></Meio>
    </Tela>
  );
};

// qué esperar del entrenamiento
export const OQue: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Meio top={470} style={{ gap: 50 }}>
        <Rotulo cor="#fff" size={36}>tal vez te estés preguntando</Rotulo>
        <Pop d={at("vale, pero ¿qué puedo esperar") - 4} from={0.85}><Giga size={180} cor="#fff" style={{ lineHeight: 1 }}>¿Qué<br />recibo?</Giga></Pop>
        <Reveal d={at("del entrenamiento de Fluency Route")}><Sub size={66} cor="#fff">dentro del entrenamiento de <B>Fluency Route</B></Sub></Reveal>
      </Meio>
    </Tela>
  );
};

// una meta clara: los 5 primeros episodios y discursos
export const MetaClara: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const cinco = at("tus primeros cinco episodios");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="primero" top={150}>
        <Slot itens={[[0, <TK t="Una meta real, clara y *sólida*" d={0} size={108} />], [at("te hace sentir tu evolución cada día"), <Titulo size={108}>Evolución que <span style={{ color: VERM }}>sientes</span> cada día</Titulo>], [cinco - 40, <Titulo size={104}>Tus primeros <span style={{ color: VERM }}>5 episodios</span> y discursos</Titulo>], [at("Porque después de eso"), <Titulo size={104}>Tu oído <span style={{ color: VERM }}>nunca vuelve a ser el mismo</span></Titulo>]]} />
      </Cabeca>
      <Meio top={600}>
        <div style={{ display: "flex", gap: 20 }}>
          {[1, 2, 3, 4, 5].map((n) => {
            const d = cinco + (n - 1) * 6;
            const on = f >= d;
            return (
              <div key={n} style={{ width: 176, height: 300, borderRadius: 26, background: on ? VERM : "#15171C", border: `1.5px solid ${on ? VERM : "var(--tr)"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 40, letterSpacing: 3, color: on ? "#fff" : CINZA }}>EP</div>
                <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 150, lineHeight: 0.9, color: on ? "#fff" : CINZA }}>{n}</div>
              </div>
            );
          })}
        </div>
      </Meio>
      <Meio top={1010} style={{ gap: 26 }}>
        <Reveal d={at("100% en inglés", de + 8)}><Chip size={66}>100% en inglés</Chip></Reveal>
        <Reveal d={at("sin subtítulos", de + 8)}><Chip size={66} cor="#fff" fundo={ROXO} borda={ROXO}>sin subtítulos</Chip></Reveal>
      </Meio>
    </Tela>
  );
};

// y es solo el comienzo: series, discursos, bloques
const CartaoSerie: React.FC<{ fundo: string; nome: string }> = ({ fundo, nome }) => (
  <div style={{ position: "relative", width: 1000, height: 250, borderRadius: 30, overflow: "hidden", background: "#000", boxShadow: "0 0 0 1.5px rgba(255,255,255,.14)" }}>
    <Img src={staticFile(`img/${fundo}.jpg`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.85), rgba(0,0,0,.1) 78%)" }} />
    <div style={{ position: "absolute", left: 44, bottom: 40, fontFamily: FONTE.tit, fontWeight: 800, fontSize: 80, letterSpacing: -3, color: "#fff" }}>{nome}</div>
    <div style={{ position: "absolute", left: 46, top: 38, fontFamily: FONTE.mono, fontWeight: 600, fontSize: 30, letterSpacing: 3, color: "rgba(255,255,255,.85)" }}>TEMPORADAS COMPLETAS</div>
  </div>
);
export const Conteudo: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const sr = at("vas a tener acceso a todas las temporadas");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="y esto es solo el comienzo" top={150}>
        <Slot itens={[
          [0, <TK t="El entrenamiento *no se detiene*" d={0} size={104} />],
          [sr, <Titulo size={106}>Temporadas <span style={{ color: VERM }}>completas</span></Titulo>],
          [at("discursos enteros listos"), <Titulo size={110}>Discursos <span style={{ color: VERM }}>enteros</span></Titulo>],
          [at("los principales bloques esenciales"), <Titulo size={106}>Los <span style={{ color: VERM }}>bloques esenciales</span></Titulo>],
          [at("y todo el material que te va"), <Titulo size={104}>Fluidez esencial en <span style={{ color: VERM }}>tiempo récord</span></Titulo>],
        ]} />
      </Cabeca>
      <Meio top={560}>
        <Slot itens={[
          [0, <Player clip="c0" ini={6} w={1000} barra={null} />],
          [sr, (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
              <div style={{ display: "flex", gap: 24 }}>
                {SERIES.map(([img, nome], i) => <Pop key={nome} d={sr + i * 6} from={0.85}><div style={{ width: 310, height: 465, borderRadius: 24, overflow: "hidden", boxShadow: "0 30px 60px -24px rgba(0,0,0,.6)", transform: `rotate(${(i - 1) * 2}deg)` }}><Img src={staticFile(`img/${img}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div></Pop>)}
              </div>
              <Pop d={sr + 20}><Chip size={56} cor="#fff" fundo={ROXO} borda={ROXO}>temporadas completas</Chip></Pop>
            </div>
          )],
          [at("discursos enteros listos"), <Clipe nome="discurso" w={1000} h={760} rot="listos para entrenar" seg={4} />],
          [at("los principales bloques esenciales"), (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, width: 980 }}>
              {["what's up?", "I have to", "let's go", "come on", "no way", "the thing is", "really?", "right now"].map((b) => <Chip key={b} size={70}>{b}</Chip>)}
            </div>
          )],
        ]} />
      </Meio>
    </Tela>
  );
};

// todo dentro del app: el APP HACIENDO (repetición, repaso, guion EN/ES, audios, clases, organizado)
export const AppEntrega: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const cont = at("con material de repetición continuada"), esp = at("material de repetición espaciada"), gui = at("guiones completos en inglés"), es = at("y español", de + 5), aud = at("audios de entrenamiento"), cls = at("y clases complementarias"), org = at("Y lo mejor: todo organizado");
  const tela = f >= org ? <AppSeries d={org} /> : f >= cls ? <AppSeries d={cls} /> : f >= aud ? <AppOuvido clip="c4" d={aud} n={6} ouvido={6} nota={3} /> : f >= es ? <AppOuvido clip="c1" d={gui} n={2} ouvido={2} modo="en" /> : f >= gui ? <AppOuvido clip="c1" d={gui} n={2} ouvido={2} modo="es" /> : f >= esp ? <AppOuvido clip="c2" d={esp} n={3} ouvido={3} nota={2} /> : f >= cont ? <AppOuvido clip="c1" d={cont} n={1} /> : <AppSeries d={0} />;
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="dentro del app de Fluency Route" top={130}>
        <Slot itens={[
          [0, <TK t="Todo, *en un solo app*" d={0} size={104} />],
          [cont, <Titulo size={100}>Repetición <span style={{ color: VERM }}>continuada</span></Titulo>],
          [esp, <Titulo size={100}>Repetición <span style={{ color: VERM }}>espaciada</span></Titulo>],
          [gui, <Titulo size={100}>Guiones <span style={{ color: VERM }}>en inglés y español</span></Titulo>],
          [aud, <Titulo size={100}>Audios de <span style={{ color: VERM }}>entrenamiento</span></Titulo>],
          [cls, <Titulo size={100}>Clases <span style={{ color: VERM }}>complementarias</span></Titulo>],
          [org, <Titulo size={100}>Paso a paso. <span style={{ color: VERM }}>Sin rodeos.</span></Titulo>],
        ]} />
      </Cabeca>
      <Meio top={420}><Tel>{tela}</Tel></Meio>
    </Tela>
  );
};

// el plan de vuelo: cruzaste la línea, no se detiene
export const PlanoVoo: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const cruza = at("cruzas esa línea");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="este es tu" top={150}><TK t="Plan de vuelo a la *fluidez esencial*" d={0} size={104} /></Cabeca>
      <div style={{ position: "absolute", left: 80, top: 560, width: 920, height: 760 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 300, borderTop: "5px dashed var(--tr)" }} />
        <div style={{ position: "absolute", right: 0, top: 236, fontFamily: FONTE.mono, fontWeight: 600, fontSize: 38, letterSpacing: 3, color: "var(--tx)" }}>FLUIDEZ ESENCIAL</div>
        <div style={{ position: "absolute", left: 0, bottom: -60, fontFamily: FONTE.mono, fontWeight: 600, fontSize: 38, letterSpacing: 3, color: CINZA }}>HOY</div>
        <Traco d={6} dur={cruza - 6} w={16} cor={VERM} path="M0,740 C260,730 420,600 560,360 S760,60 900,10" />
        <Pop d={cruza} style={{ position: "absolute", left: 540, top: 260 }}><div style={{ width: 80, height: 80, borderRadius: "50%", background: "#fff", border: `12px solid ${VERM}`, boxSizing: "border-box" }} /></Pop>
      </div>
      <Meio top={1420}><Reveal d={at("entras en un ciclo de evolución")}><Sub size={66}>un ciclo de evolución que <B cor={VERM}>ya no se detiene</B></Sub></Reveal></Meio>
    </Tela>
  );
};

// entrenamiento de HABLA: graba, compara, nota de la IA por palabra
const FALA: [string, number][] = [["There's", 92], ["nothing", 88], ["to", 95], ["tell,", 64], ["it's", 90], ["just", 86], ["some", 91], ["guy", 70], ["I", 96], ["work", 84], ["with.", 93]];
export const Fala: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const grava = at("donde puedes grabar tu voz"), nota = at("feedback de pronunciación con inteligencia");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="no nos vamos a quedar ahí" top={130}>
        <Slot itens={[
          [0, <TK t="Entrena también tu *habla*" d={0} size={100} />],
          [at("Por eso, dentro de nuestra aplicación"), <Titulo size={98}>Pronunciación y <span style={{ color: VERM }}>conversación</span></Titulo>],
          [grava, <Titulo size={104}>Graba <span style={{ color: VERM }}>tu voz</span></Titulo>],
          [at("y compararla con la voz original"), <Titulo size={100}>Compárala con el <span style={{ color: VERM }}>original</span></Titulo>],
          [nota - 20, <Titulo size={100}>Feedback con <span style={{ color: VERM }}>IA</span></Titulo>],
          [at("dónde estás bien"), <Titulo size={100}>Dónde estás <span style={{ color: VERDE }}>bien</span></Titulo>],
          [at("y dónde necesitas mejorar"), <Titulo size={100}>Y dónde <span style={{ color: "#F5A524" }}>mejorar</span></Titulo>],
        ]} />
      </Cabeca>
      <Meio top={440}><Tel w={600}><AppFala clip="c1" d={0} grava={grava} nota={nota} palavras={FALA} /></Tel></Meio>
    </Tela>
  );
};
export const Shadowing: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const um = at("Así empiezas a ver cómo una cosa");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="entrenamientos de shadowing" top={130}>
        <Slot itens={[
          [0, <TK t="Con los *mismos episodios*" d={0} size={104} />],
          [um, <Titulo size={104}>Una cosa <span style={{ color: VERM }}>ayuda a la otra</span></Titulo>],
          [at("Y todo pensado dentro del inglés esencial"), <Titulo size={104}>Pensado en el <span style={{ color: VERM }}>inglés esencial</span></Titulo>],
          [at("y que te va a dar el empujón"), <Titulo size={104}>El empujón para aprender <span style={{ color: VERM }}>mucho más rápido</span></Titulo>],
        ]} />
      </Cabeca>
      <div style={{ position: "absolute", left: 40, top: 500, display: "flex", gap: 40, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}><Tel w={480}><AppOuvido clip="c1" d={0} n={1} ouvido={1} modo="es" /></Tel><Rotulo cor="#fff" size={36}>tu oído</Rotulo></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}><Tel w={480}><AppFala clip="c1" d={0} grava={10} nota={um} palavras={FALA} /></Tel><Rotulo cor="#fff" size={36}>tu habla</Rotulo></div>
      </div>
    </Tela>
  );
};

// por qué tanta gente sigue estancada durante años
const Caro: React.FC<{ rot: string; valor: string; un?: string; linha: React.ReactNode }> = ({ rot, valor, un, linha }) => (
  <Painel w={980} pad={56}>
    <Rotulo cor={CINZA} size={34} style={{ textAlign: "left" }}>{rot}</Rotulo>
    <div style={{ display: "flex", alignItems: "baseline", gap: 18, margin: "24px 0 20px" }}>
      <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 112, letterSpacing: -5, lineHeight: 1, color: "var(--tx)", whiteSpace: "nowrap" }}>{valor}</div>
      {un && <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: 56, color: CINZA }}>{un}</div>}
    </div>
    <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: 58, lineHeight: 1.18, color: "var(--tx2)" }}>{linha}</div>
  </Painel>
);
export const Travados: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="solo mira a tu alrededor" top={150}>
        <Slot itens={[[0, <TK t="Por qué tantos siguen *estancados*" d={0} size={100} />], [at("Y no es falta de esfuerzo"), <Titulo size={108}>No es falta de <span style={{ color: CINZA }}>esfuerzo</span></Titulo>], [at("es falta del método correcto"), <Titulo size={108}>Es el <span style={{ color: VERM }}>método</span></Titulo>]]} />
      </Cabeca>
      <Meio top={640}>
        <Slot itens={[
          [at("Cursos tradicionales que cobran"), <Caro rot="cursos tradicionales" valor="US$ 500–800" un="/ mes" linha={<>durante <B>años</B>, memorizando reglas que no sirven</>} />],
          [at("O clases presenciales que parecen"), <Caro rot="clases presenciales" valor="Contenido nuevo" linha={<>cada semana, y no dominas ni <B>lo básico</B></>} />],
          [at("O peor, gente que ya gastó"), <Caro rot="cursos y viajes" valor="US$ 10–15 mil" linha={<>y todavía se <B>bloquea</B> al pedir un café</>} />],
        ]} />
      </Meio>
    </Tela>
  );
};

// podríamos cobrar 3 mil (25/11: o "no vas a pagar 3 mil / 1.500" foi pra Baixa, em c3b.tsx, depois da pilha e do avatar "compromiso")
export const Poderia: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="podríamos cobrar" top={150}>
        <Slot itens={[
          [0, <TK t="Por un método que *funciona de verdad*" d={at("por un método que realmente funciona") - 10} size={100} />],
          [at("Un resultado sólido"), <Titulo size={100}>Que sientes en el <span style={{ color: VERM }}>oído</span> y en la <span style={{ color: VERM }}>boca</span></Titulo>],
          [at("valdría cada centavo"), <Titulo size={104}>Valdría <span style={{ color: VERM }}>cada centavo</span></Titulo>],
        ]} />
      </Cabeca>
      <Meio top={640} style={{ gap: 50 }}>
        <Pop d={at("cobrar 2, 3 mil dólares")} from={0.8}><Giga size={170} cor="#fff" style={{ whiteSpace: "nowrap" }}>US$ 3.000</Giga></Pop>
      </Meio>
    </Tela>
  );
};
export const Preco: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const menos = at("Menos que el precio de un solo libro");
  const v = useLin(at("Así es.") + 6, 16);
  return (
    <Tela fundo={FUNDO_VERDE}>
      <Meio top={230} style={{ gap: 10 }}>
        <Rotulo cor="#fff" size={36}>el entrenamiento completo</Rotulo>
        <Pop d={at("por solo un único pago") + 14} from={0.7}><div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 18, whiteSpace: "nowrap" }}><span style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 120, color: "#fff", marginTop: 48 }}>US$</span><Giga size={400} cor="#fff" style={{ lineHeight: 1 }}>{PRECO}</Giga></div></Pop>
        <Reveal d={at("por solo un único pago")}><div style={{ fontFamily: FONTE.tit, fontWeight: 700, fontSize: 84, letterSpacing: -3, color: "var(--tx)" }}>pago único</div></Reveal>
      </Meio>
      <Meio top={1060} style={{ gap: 26 }}>
        <Reveal d={at("Así es.")}>
          <div style={{ width: 940, background: "rgba(0,0,0,.28)", borderRadius: 30, padding: "40px 44px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 26 }}>
            {[["un mes de curso tradicional", 1, "US$ 500+", "var(--tr)"], ["tu entrenamiento completo, una vez", PRECO / 500, USD, "#fff"]].map(([r, w, val, cor]) => (
              <div key={r as string}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONTE.sans, fontWeight: 700, fontSize: 42, color: "var(--tx)", marginBottom: 12 }}><span>{r}</span><span>{val}</span></div>
                <Barra leitura={false} v={(w as number) * v} w={852} h={38} cor={cor as string} fundo="rgba(0,0,0,.25)" />
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal d={menos}><Sub size={56} cor="#fff">menos que <B>un libro de texto</B> o una <B>cena de fin de semana</B></Sub></Reveal>
      </Meio>
    </Tela>
  );
};

// no estás comprando un curso
export const NaoCurso: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const nc = at("no estás comprando un curso");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot={`por ${USD}`} top={150}><Titulo size={108}>No estás comprando <Riscado d={nc + 18} h={14}>un curso</Riscado></Titulo></Cabeca>
      <Meio top={620} style={{ gap: 26 }}>
        <Item d={at("Estás recibiendo todos los entrenamientos")} size={60}>Todos los <B cor={VERM}>entrenamientos concentrados</B> que necesitas</Item>
        <Item d={at("y contratándonos como tu Personal")} size={60}>Tu <B cor={VERM}>Personal English Trainer</B></Item>
        <Item d={at("Dentro de un método de entrenamiento")} size={60}>Contigo hasta que la <B cor={VERM}>fluidez esencial</B> suceda</Item>
        <Item d={at("Y todo siguiendo las fases naturales")} size={60}>Siguiendo las <B cor={VERM}>fases naturales</B> de tu evolución</Item>
      </Meio>
    </Tela>
  );
};

// clic en el botón
export const Clique: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="inscríbete ahora" top={150}><TK t="Haz clic en el *botón de abajo*" d={0} size={116} /></Cabeca>
      <Meio top={600} style={{ gap: 40 }}>
        <svg width="140" height="220" viewBox="0 0 70 110" style={{ transform: `translateY(${Math.sin(f / 5) * 14}px)` }}><path d="M35 6v86M8 66l27 30 27-30" fill="none" style={{ stroke: VERM }} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <Botao seta={false} />
      </Meio>
      <Meio top={1190}>
        <Reveal d={at("vas a ser dirigido a Hotmart")}>
          <Painel w={940} pad={46} style={{ display: "flex", alignItems: "center", gap: 34 }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" style={{ stroke: "var(--tx)" }} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z" /></svg>
            <div>
              <div style={{ fontFamily: FONTE.tit, fontWeight: 700, fontSize: 66, color: "var(--tx)", letterSpacing: -2 }}>Pago seguro · Hotmart</div>
              <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: 44, color: CINZA, marginTop: 8 }}>una de las mayores plataformas de productos digitales del mundo</div>
            </div>
          </Painel>
        </Reveal>
      </Meio>
    </Tela>
  );
};

// las 3 fases
const Abas: React.FC<{ n: number }> = ({ n }) => (
  <div style={{ display: "flex", gap: 16 }}>
    {[1, 2, 3].map((i) => <div key={i} style={{ fontFamily: FONTE.mono, fontWeight: 600, fontSize: 44, letterSpacing: 3, padding: "16px 36px", borderRadius: 60, background: i === n ? VERM : "rgba(255,255,255,.07)", color: i === n ? "#fff" : CINZA, border: "1.5px solid var(--tr)" }}>FASE {i}</div>)}
  </div>
);
export const Fases: React.FC<CP> = () => (
  <Tela fundo={FUNDO_QUENTE}>
    <Meio top={520} style={{ gap: 50 }}>
      <Rotulo cor="#fff" size={36}>lo que recibes al entrar ahora</Rotulo>
      <Giga size={200} cor="#fff" style={{ lineHeight: 0.98 }}>3 fases</Giga>
      <Abas n={0} />
    </Meio>
  </Tela>
);
export const Fase1: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const proc = at("Aquí empiezas el proceso"), ref = at("Tu oído va a ser pulido");
  return (
    <Tela fundo={FUNDO}>
      <Meio top={110} style={{ gap: 24 }}>
        <Abas n={1} />
        <Slot itens={[[0, <TK t="Entrenamientos de *oído*" d={0} size={110} />], [proc, <Titulo size={100}>Desbloquea tu <span style={{ color: VERM }}>listening</span></Titulo>], [ref, <Titulo size={96}>Hasta que deje de sonar <span style={{ color: VERM }}>demasiado rápido</span></Titulo>]]} />
      </Meio>
      <Meio top={520}><Tel w={560}>{f >= ref ? <AppOuvido clip="c2" d={ref} n={3} ouvido={3} modo="es" /> : f >= proc ? <AppOuvido clip="c1" d={proc} n={1} nota={2} /> : <AppSeries d={0} />}</Tel></Meio>
    </Tela>
  );
};
export const Fase2: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const grava = at("donde vas a hacer literalmente"), nota = at("con feedback de pronunciación en tiempo real");
  return (
    <Tela fundo={FUNDO}>
      <Meio top={110} style={{ gap: 24 }}>
        <Abas n={2} />
        <Slot itens={[[0, <TK t="Entrenamientos de *habla*" d={0} size={110} />], [at("Es hora de desbloquear la boca"), <Titulo size={100}>Desbloquea la <span style={{ color: VERM }}>boca</span></Titulo>], [grava, <Titulo size={100}>Imita cómo hablan los <span style={{ color: VERM }}>nativos</span></Titulo>], [at("Para soltar la frase entera"), <Titulo size={100}>La frase entera, en <span style={{ color: VERM }}>automático</span></Titulo>], [nota - 30, <Titulo size={100}>Feedback con <span style={{ color: VERM }}>IA</span> en tiempo real</Titulo>]]} />
      </Meio>
      <Meio top={520}><Tel w={560}><AppFala clip="c1" d={0} grava={grava} nota={nota} palavras={FALA} /></Tel></Meio>
    </Tela>
  );
};
export const Fase3: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const nada = at("Es en ese momento que el inglés");
  return (
    <Tela fundo={FUNDO}>
      <Meio top={110} style={{ gap: 24 }}>
        <Abas n={3} />
        <Slot itens={[[0, <TK t="La ruta a la *inmersión*" d={0} size={110} />], [at("te expandes hacia lo que realmente"), <Titulo size={100}>Hacia lo que <span style={{ color: VERM }}>te gusta</span></Titulo>], [at("todo sin subtítulos"), <Titulo size={106}>Todo <span style={{ color: VERM }}>sin subtítulos</span></Titulo>], [at("De una manera en la que puedes"), <Titulo size={100}>En tu <span style={{ color: VERM }}>día a día</span></Titulo>], [nada, <Titulo size={86}>Ya ni parece que <Riscado d={nada + 30}>estudias</Riscado></Titulo>]]} />
      </Meio>
      <Meio top={560}>
        <Slot itens={[
          [0, <Player clip="c3" w={1000} barra={null} />],
          [at("Películas, series, podcasts"), <Clipe nome="tv" w={1000} h={800} rot="películas" seg={2} />],
          [at("series, podcasts"), <Player clip="c0" ini={10} w={1000} tag="series" barra={null} />],
          [at("podcasts, todo sin"), <Clipe nome="fone" w={1000} h={800} rot="podcasts" seg={3} pos="50% 30%" />],
          [at("De una manera en la que puedes"), <Clipe nome="celular2" w={1000} h={800} rot="lo que te encanta" seg={8} />],
        ]} />
      </Meio>
    </Tela>
  );
};

// el acceso completo
export const Acesso: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const inc = at("Y todo ya incluido");
  if (f >= inc) return (
    <Tela fundo={FUNDO_VERDE}>
      <Meio top={420} style={{ gap: 20 }}>
        <Rotulo cor="#fff" size={38}>todo esto, ya incluido</Rotulo>
        <Pop d={at("por solo un único pago", de + 10)} from={0.7}><div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 18, whiteSpace: "nowrap" }}><span style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 120, color: "#fff", marginTop: 48 }}>US$</span><Giga size={400} cor="#fff" style={{ lineHeight: 1 }}>{PRECO}</Giga></div></Pop>
        <div style={{ fontFamily: FONTE.tit, fontWeight: 700, fontSize: 84, letterSpacing: -3, color: "var(--tx)" }}>pago único</div>
      </Meio>
    </Tela>
  );
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="dentro del app de Fluency Route" top={150}><TK t="Tu *acceso completo*" d={0} size={120} /></Cabeca>
      <Meio top={500} style={{ gap: 22 }}>
        <Item d={at("con todo el material organizado")} size={58}>Todo el material, organizado</Item>
        <Item d={at("series completas como Friends")} size={62}>Friends</Item>
        <Item d={at("Two and a Half Men")} size={62}>Two and a Half Men</Item>
        <Item d={at("How I Met Your Mother")} size={62}>How I Met Your Mother</Item>
        <Item d={at("e integrado además con inteligencia")} size={58}>Integrado con <B cor={VERM}>IA</B></Item>
      </Meio>
    </Tela>
  );
};
