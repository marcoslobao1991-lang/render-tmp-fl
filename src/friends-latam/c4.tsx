// LOTE 4 — GARANTÍAS + CIERRE (VSL Friends LATAM). Base: netflix-trick/c4.tsx. Las frases "Y ahora déjame contarte algo…", "Ahora la decisión es tuya." y "Eso es todo. ¡Hasta pronto!" son AVATAR.
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { CP, FONTE, FUNDO, FUNDO_FRIO, FUNDO_QUENTE, FUNDO_VERDE, Tela, Slot, Pop, Reveal, Rotulo, Titulo, Traco, Celular, Chave, useLin } from "./tema";
import { useTx, ROXO, useAt, TK, Chip, Giga, Cabeca, Meio, Sub, Painel, Botao, Item, Selo, AppSeries, VERM, CINZA } from "./kit";
import { PRECO } from "./preco";

const B: React.FC<{ children: React.ReactNode; cor?: string }> = ({ children, cor = "#fff" }) => { const { tx } = useTx(); return <span style={{ color: tx(cor), fontWeight: 800 }}>{children}</span>; };
const USD = `US$ ${PRECO}`;

// lo que poca gente tiene el valor de ofrecer: salir del estancamiento, riesgo cero
export const Coragem: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const mis = at("nuestra misión es que salgas del estancamiento");
  const dois = at("tienes dos garantías");
  const sai = at("te desbloquees de una vez");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="aquí en Fluency Route" top={150}>
        <Slot itens={[[0, <TK t="Lo que pocos *se atreven a ofrecer*" d={0} size={104} />], [mis, <Titulo size={108}>Salir del <span style={{ color: VERM }}>estancamiento</span></Titulo>], [at("y sientas el inglés entrando"), <Titulo size={108}>El inglés en <span style={{ color: VERM }}>automático</span></Titulo>], [dois, <Titulo size={116}><span style={{ color: VERM }}>2</span> garantías</Titulo>]]} />
      </Cabeca>
      {f < dois ? (
        <div style={{ position: "absolute", left: 90, top: 640, width: 900, height: 600 }}>
          <Traco d={mis} dur={24} w={16} cor={CINZA} path="M0,460 L470,460" />
          <Traco d={sai} dur={26} w={16} cor={VERM} path="M470,460 C600,460 700,300 900,40" />
          <Reveal d={mis + 10} style={{ position: "absolute", left: 0, top: 500 }}><Rotulo cor={CINZA} size={36}>el estancamiento</Rotulo></Reveal>
          <Reveal d={sai + 10} style={{ position: "absolute", right: 0, top: -70 }}><Chip size={56} cor="#fff" fundo={ROXO} borda={ROXO}>desbloqueo</Chip></Reveal>
        </div>
      ) : (
        <Meio top={600} style={{ gap: 10 }}>
          <Rotulo cor={CINZA} size={38}>tu riesgo</Rotulo>
          <Pop d={at("simplemente en cero")} from={0.7}><Giga size={640} style={{ lineHeight: 0.95 }}>0</Giga></Pop>
        </Meio>
      )}
    </Tela>
  );
};

// garantía 1: 7 días incondicional
export const G7: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const como = at("Entras hoy");
  const se = at("Y si en hasta siete días");
  const volta = at("solo tienes que pedir el reembolso");
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Cabeca rot="garantía número uno" rotCor="#fff" top={150}>
        <Slot itens={[[0, <TK t="Incondicional" d={at("una garantía incondicional") - 4} size={130} acento="#fff" />], [como, <Titulo size={110}>Prueba <span style={{ color: "var(--tx)" }}>todo</span></Titulo>], [se, <Titulo size={110}>¿No es para ti?</Titulo>], [volta, <Titulo size={110}>Tu dinero de vuelta</Titulo>]]} />
      </Cabeca>
      <Meio top={500}>
        {f < volta ? <Selo n={7} rot="DÍAS" d={at("garantía incondicional de siete días") - 6} /> : <Pop d={volta} from={0.8}><Giga size={330} cor="#fff" style={{ marginTop: 130 }}>100%</Giga></Pop>}
      </Meio>
      <Meio top={1200}>
        <Slot itens={[
          [como, <Sub size={70} cor="#fff">entras hoy</Sub>],
          [at("empiezas a ver las clases"), <Sub size={70} cor="#fff">ves las clases</Sub>],
          [at("conoces los entrenamientos concentrados"), <Sub size={70} cor="#fff">conoces los entrenamientos</Sub>],
          [at("accedes a la aplicación"), <Sub size={70} cor="#fff">abres el app</Sub>],
          [at("empiezas tus entrenamientos"), <Sub size={70} cor="#fff">empiezas a entrenar</Sub>],
          [se, <Sub size={66} cor="#fff">no es para ti</Sub>],
          [at("que no te gustó mi manera"), <Sub size={66} cor="#fff">no te gustó cómo enseño</Sub>],
          [at("que no crees que esto vaya"), <Sub size={66} cor="#fff">no crees que funcione</Sub>],
          [at("o que preferías gastar"), <Sub size={66} cor="#fff">preferías comprar <B>pizza</B></Sub>],
          [volta, <Sub size={70} cor="#fff">de tu dinero de vuelta</Sub>],
        ]} />
      </Meio>
    </Tela>
  );
};
export const SemPergunta: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const hm = at("Simplemente entras a la plataforma de Hotmart");
  const um = at("con un solo clic");
  const f = useCurrentFrame();
  return (
    <Tela fundo={FUNDO}>
      <Meio top={330} style={{ gap: 36 }}>
        {[["Sin preguntas.", at("Sin preguntas")], ["Sin formularios.", at("sin formularios")], ["Sin explicar nada.", at("sin tener que explicarle")]].map(([tx, d]) => <Pop key={tx as string} d={d as number} from={0.9}><Giga size={116} style={{ lineHeight: 1 }}>{tx}</Giga></Pop>)}
      </Meio>
      <Meio top={1060} style={{ gap: 30 }}>
        <Reveal d={hm}><Rotulo cor={CINZA} size={36}>en la propia Hotmart</Rotulo></Reveal>
        <Reveal d={hm}><div style={{ width: 860, textAlign: "center", fontFamily: FONTE.tit, fontWeight: 700, fontSize: 66, color: "var(--tx)", border: `3px solid ${f >= um ? VERM : "var(--tr)"}`, background: f >= um ? VERM : "transparent", borderRadius: 30, padding: "40px 0" }}>Pedir reembolso</div></Reveal>
        <Reveal d={um}><Sub size={64}>con <B cor={VERM}>un solo clic</B></Sub></Reveal>
      </Meio>
    </Tela>
  );
};

// garantía 2: 90 días de aplicación
export const G90: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Cabeca rot="garantía número dos" rotCor="#fff" top={150}>
        <Slot itens={[[0, <TK t="No nos vamos a *quedar ahí*" d={0} size={104} acento="#fff" />], [at("que deja tu riesgo simplemente en cero"), <Titulo size={110}>Riesgo: <span style={{ color: "var(--tx)" }}>cero</span></Titulo>], [at("Entonces ahora te quiero mostrar la garantía"), <Titulo size={116}>Extendida</Titulo>], [at("Para quien quiere de verdad entrar"), <Titulo size={104}>Para quien <span style={{ color: "var(--tx)" }}>lo aplica</span></Titulo>]]} />
      </Cabeca>
      <Meio top={520}><Selo n={90} rot="DÍAS" d={at("garantía extendida de 90 días") - 8} size={640} /></Meio>
      <Meio top={1250}>
        <Slot itens={[
          [at("y te muestra cuán comprometidos"), <Sub size={66} cor="#fff">comprometidos con <B>tu éxito</B></Sub>],
          [at("para la aplicación real"), <Sub size={66} cor="#fff">para la <B>aplicación real</B> del sistema</Sub>],
          [at("vamos más allá contigo"), <Sub size={70} cor="#fff">vamos <B>más allá</B> contigo</Sub>],
        ]} />
      </Meio>
    </Tela>
  );
};
export const G90cond: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const mesmo = at("y aun así en hasta 90 días");
  const dev = at("solo tienes que escribirnos");
  if (f >= dev) return (
    <Tela fundo={FUNDO_VERDE}>
      <Meio top={480} style={{ gap: 40 }}>
        <Rotulo cor="#fff" size={38}>solo tienes que escribirnos</Rotulo>
        <Giga size={140} cor="#fff" style={{ lineHeight: 1.02 }}>Te devolvemos<br />toda tu<br />inversión</Giga>
      </Meio>
    </Tela>
  );
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot={f >= mesmo ? "si en hasta 90 días no sientes" : "tu parte"} top={150}>
        <Slot itens={[[0, <TK t="Si *haces el entrenamiento*" d={0} size={108} />], [mesmo, <Titulo size={112}>…estos <span style={{ color: VERM }}>4 resultados</span></Titulo>]]} />
      </Cabeca>
      <Meio top={560} style={{ gap: 24 }}>
        {f < mesmo ? (
          <>
            <Item d={at("Si sigues los entrenamientos concentrados")} size={60}>Sigues los entrenamientos concentrados</Item>
            <Item d={at("pones en práctica el paso a paso")} size={60}>Aplicas el paso a paso</Item>
            <Item d={at("y entrenas de verdad tu oído")} size={60}>Entrenas oído y habla con constancia</Item>
          </>
        ) : (
          <>
            <Item d={at("que tu percepción de oído mejoró")} size={58}>Tu oído mejoró <B cor={VERM}>de forma impresionante</B></Item>
            <Item d={at("que empezaste a entender episodios")} size={58}>Episodios <B cor={VERM}>sin subtítulos</B></Item>
            <Item d={at("que ya logras entender tus primeros discursos")} size={58}>Tus primeros <B cor={VERM}>discursos completos</B></Item>
            <Item d={at("y que incluso tu habla")} size={58}>Tu habla fluyendo <B cor={VERM}>natural</B></Item>
          </>
        )}
      </Meio>
    </Tela>
  );
};
export const Risco: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="porque no tiene sentido seguir" top={150}><TK t="en algo que *no te entrega*" d={0} size={104} /></Cabeca>
      <Meio top={640} style={{ gap: 44 }}>
        <Pop d={at("o te desbloqueas y sientes")} from={0.9}><Painel w={940} pad={56} style={{ border: `3px solid ${VERM}` }}><div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 100, letterSpacing: -4, lineHeight: 1.04, color: "var(--tx)", textAlign: "center" }}>O te<br /><span style={{ color: VERM }}>desbloqueas</span></div></Painel></Pop>
        <Pop d={at("o nosotros asumimos el riesgo")} from={0.9}><Painel w={940} pad={56}><div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 100, letterSpacing: -4, lineHeight: 1.04, color: "var(--tx)", textAlign: "center" }}>o <span style={{ color: VERM }}>nosotros</span> asumimos<br />el riesgo</div></Painel></Pop>
      </Meio>
    </Tela>
  );
};
export const Recap: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const melhor = at("Y lo mejor: ya puedes empezar");
  if (f >= melhor) return (
    <Tela fundo={FUNDO_VERDE}>
      <Meio top={430} style={{ gap: 20 }}>
        <Rotulo cor="#fff" size={38}>y ya puedes empezar ahora</Rotulo>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 18, whiteSpace: "nowrap" }}><span style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 120, color: "#fff", marginTop: 48 }}>US$</span><Giga size={400} cor="#fff" style={{ lineHeight: 1 }}>{PRECO}</Giga></div>
        <Reveal d={at("con un valor ridículo")}><Sub size={66} cor="#fff" style={{ maxWidth: 900 }}>ridículo, comparado con lo que <B>vale este método</B></Sub></Reveal>
      </Meio>
    </Tela>
  );
  return (
    <Tela fundo={FUNDO_QUENTE}>
      <Cabeca rot="entonces ahí está" rotCor="#fff" top={150}><TK t="Dos garantías" d={0} size={130} acento="#fff" /></Cabeca>
      <div style={{ position: "absolute", left: 50, top: 560, display: "flex", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}><Selo n={7} rot="DÍAS" d={at("garantía total de 7 días")} size={470} /><Reveal d={at("para que entres sin ningún miedo")}><Sub size={52} cor="#fff" style={{ maxWidth: 460 }}>para entrar <B>sin miedo</B></Sub></Reveal></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}><Selo n={90} rot="DÍAS" d={at("y una garantía extendida de 90")} size={470} /><Reveal d={at("para que apliques y sientas")}><Sub size={52} cor="#fff" style={{ maxWidth: 460 }}>para <B>aplicar</B> y sentir el resultado</Sub></Reveal></div>
      </div>
    </Tela>
  );
};

// cuando yo cambié el enfoque a ENTRENAR, todo cambió
export const ViraChave: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const vira = at("todo cambió para mí");
  const on = useLin(vira, 8);
  return (
    <Tela fundo={f >= vira + 4 ? FUNDO_QUENTE : FUNDO}>
      <Cabeca rot="cuando yo misma cambié el enfoque a" rotCor={f >= vira + 4 ? "#fff" : CINZA} top={150}>
        <Slot itens={[[0, <TK t="Entrenar" d={0} size={170} acento="#fff" />], [vira, <Titulo size={116}>Todo cambió</Titulo>], [at("Y hoy tienes la oportunidad"), <Titulo size={112}>Ahora es <span style={{ color: "var(--tx)" }}>tu turno</span></Titulo>]]} />
      </Cabeca>
      <Meio top={600} style={{ gap: 60 }}>
        <Slot itens={[[at("entrenar el oído"), <Chip size={78}>el oído</Chip>], [at("entrenar el habla"), <Chip size={78}>el habla</Chip>], [at("entrenar lo esencial del inglés"), <Chip size={78}>lo esencial</Chip>], [vira, <span />]]} />
        <Chave on={on} w={620} corOn="#fff" />
        <Reveal d={at("de dar ese giro también")}><Sub size={70} cor="#fff">dar ese <B>giro</B> tú también</Sub></Reveal>
      </Meio>
    </Tela>
  );
};

// la decisión: un año más dando vueltas, o entrenar de la manera correcta hoy
export const Decisao: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const ou = at("O puedes entrar a Fluency Route");
  const ang = (f / 46) * Math.PI * 2;
  if (f >= ou) return (
    <Tela fundo={FUNDO_QUENTE}>
      <Meio top={400} style={{ gap: 40 }}>
        <Rotulo cor="#fff" size={38}>o entras a Fluency Route</Rotulo>
        <Giga size={140} cor="#fff" style={{ lineHeight: 1 }}>Entrenar inglés<br />de la manera<br />correcta</Giga>
        <Pop d={at("de la manera correcta") + 16} from={0.8}><Chip size={110} cor="#1A0F3D" fundo="#fff" borda="#fff">hoy</Chip></Pop>
      </Meio>
    </Tela>
  );
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="ahora" top={150}><TK t="La decisión *es tuya*" d={0} size={124} /></Cabeca>
      <Meio top={560}>
        <div style={{ position: "relative", width: 560, height: 560 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "14px solid var(--tr)" }} />
          <div style={{ position: "absolute", left: 280 + Math.cos(ang) * 273 - 34, top: 280 + Math.sin(ang) * 273 - 34, width: 68, height: 68, borderRadius: "50%", background: CINZA }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTE.mono, fontWeight: 600, fontSize: 44, letterSpacing: 4, color: CINZA, textAlign: "center" }}>DANDO<br />VUELTAS</div>
        </div>
      </Meio>
      <Meio top={1220}>
        <Slot itens={[
          [at("Puedes salir de este video"), <Sub size={66} cor={CINZA}>seguir como estás</Sub>],
          [at("tomando un consejo suelto"), <Sub size={66} cor={CINZA}>otro <B>consejo suelto</B></Sub>],
          [at("haciendo un curso más"), <Sub size={66} cor={CINZA}>un <B>curso</B> más</Sub>],
          [at("o comprando un libro más"), <Sub size={66} cor={CINZA}>un <B>libro</B> más</Sub>],
          [at("y quedándote un año más"), <Sub size={72} cor="#fff">un <B cor={VERM}>año</B> más dando vueltas</Sub>],
        ]} />
      </Meio>
    </Tela>
  );
};

// todo está listo: el app esperando + botón; después de la despedida (AVATAR), el cierre
export const Pronto: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const f = useCurrentFrame();
  const fimD = at("Eso es todo.");
  if (f >= fimD) return (
    <Tela fundo={FUNDO}>
      <Meio top={380} style={{ gap: 54 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}><Img src={staticFile("img/logo.png")} style={{ width: 300, objectFit: "contain" }} /><div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 72, letterSpacing: -2, color: "var(--tx)" }}>Fluency Route</div></div>
        <Giga size={160} style={{ lineHeight: 1 }}>Nos vemos <span style={{ color: VERM }}>adentro</span></Giga>
        <Botao />
      </Meio>
    </Tela>
  );
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="Fluency Route" top={120}>
        <Slot itens={[[0, <TK t="Todo está *listo*" d={0} size={112} />], [at("Todo te está esperando"), <Titulo size={112}>Te está <span style={{ color: VERM }}>esperando</span></Titulo>], [at("Solo falta que hagas clic"), <Titulo size={104}>Haz clic en el <span style={{ color: VERM }}>botón</span> de abajo</Titulo>], [at("Y ahí sí, la próxima historia"), <Titulo size={100}>La próxima historia puede ser <span style={{ color: VERM }}>la tuya</span></Titulo>]]} />
      </Cabeca>
      <Meio top={450}><Celular w={540} seco><AppSeries d={0} /></Celular></Meio>
      <Meio top={1480}><Reveal d={at("Solo falta que hagas clic")}><Botao w={860} seta={false} /></Reveal></Meio>
    </Tela>
  );
};
