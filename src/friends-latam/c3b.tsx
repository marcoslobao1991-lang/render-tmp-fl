// 25/11 TRANSIÇÃO PRA OFERTA (Marcos: "não fizemos uma boa transição pra oferta, nem microcompromisso nem ancoragem").
// Copy nova em ~/latam-friends/voz/novos.json (encaixada pelo pipeline.mjs): microcompromisso (Honestidad), custo de não agir (Custo),
// pilha antes do preço (Pilha) e a âncora despencando depois do avatar "compromiso" (Baixa).
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { CP, FONTE, FUNDO, FUNDO_FRIO, Tela, Slot, Pop, Reveal, Rotulo, Titulo } from "./tema";
import { ROXO, useAt, TK, Chip, Giga, Riscado, Cabeca, Meio, Painel, Item, VERM, CINZA } from "./kit";

// MICROCOMPROMISSO: 3 perguntas reais sobre a vida dele; cada uma vira uma cena que ele reconhece.
const Anos: React.FC<{ d: number }> = ({ d }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
    {[2021, 2022, 2023, 2024, 2025].map((a, i) => (
      <Pop key={a} d={d + i * 5} from={0.85}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 30, fontFamily: FONTE.tit, fontWeight: 800, whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 84, color: CINZA, letterSpacing: -3 }}>{a}</span>
          <Riscado d={d + i * 5 + 10} h={12}><span style={{ fontSize: 84, color: "var(--tx)", letterSpacing: -3 }}>«este año sí»</span></Riscado>
        </div>
      </Pop>
    ))}
  </div>
);
const SerieEsp: React.FC<{ volta: number }> = ({ volta }) => {
  const f = useCurrentFrame();
  const es = f >= volta;
  return (
    <Painel w={960} pad={40}>
      <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
        <div style={{ width: 230, height: 345, borderRadius: 18, overflow: "hidden", flex: "0 0 230px" }}><Img src={staticFile("img/poster-friends.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 66, color: "var(--tx)", letterSpacing: -2 }}>Friends</div>
          <div style={{ height: 14, borderRadius: 7, background: "rgba(255,255,255,.14)", margin: "26px 0 12px", overflow: "hidden" }}><div style={{ width: "45%", height: "100%", background: VERM }} /></div>
          <div style={{ fontFamily: FONTE.sans, fontWeight: 700, fontSize: 40, color: CINZA }}>10:00 / 22:00</div>
          <div style={{ marginTop: 30, fontFamily: FONTE.sans, fontWeight: 700, fontSize: 40, color: "var(--tx2)" }}>Subtítulos</div>
          <div style={{ display: "flex", gap: 14, marginTop: 12 }}>
            <Chip size={44} cor={es ? CINZA : "#fff"} fundo={es ? "transparent" : ROXO} borda={es ? CINZA : ROXO}>Inglés</Chip>
            <Chip size={44} cor={es ? "#fff" : CINZA} fundo={es ? VERM : "transparent"} borda={es ? VERM : CINZA}>Español</Chip>
          </div>
        </div>
      </div>
    </Painel>
  );
};
const YesYes: React.FC<{ d: number; yes: number }> = ({ d, yes }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26, width: 960 }}>
      <Pop d={d} from={0.85} style={{ alignSelf: "flex-start" }}>
        <div style={{ maxWidth: 780, background: "#2A2C33", borderRadius: "40px 40px 40px 10px", padding: "34px 42px", fontFamily: FONTE.sans, fontWeight: 600, fontSize: 52, lineHeight: 1.2, color: "#fff", filter: "blur(5px)" }}>So tell me about your last project and how you handled the pressure?</div>
      </Pop>
      <Rotulo cor={CINZA} size={34} style={{ textAlign: "left" }}>entrevista · aeropuerto · reunión</Rotulo>
      {f >= yes && <Pop d={yes} from={0.8} style={{ alignSelf: "flex-end" }}>
        <div style={{ background: ROXO, borderRadius: "40px 40px 10px 40px", padding: "30px 46px", fontFamily: FONTE.tit, fontWeight: 800, fontSize: 72, color: "#fff" }}>yes, yes...</div>
      </Pop>}
    </div>
  );
};
export const Honestidad: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const q1 = at("¿Cuántos años llevas"), q3 = at("Y si mañana alguien");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="respóndeme, aunque sea en tu cabeza" top={150}>
        <Slot itens={[
          [0, <TK t="Con *honestidad*" d={0} size={120} />],
          [at("Si alguna de estas respuestas"), <Titulo size={108}>¿Alguna te <span style={{ color: VERM }}>incomodó</span>?</Titulo>],
          [at("Lo que viene ahora"), <Titulo size={108}>Esto es <span style={{ color: VERM }}>para ti</span></Titulo>],
        ]} />
      </Cabeca>
      <Meio top={600}>
        <Slot itens={[
          [q1, <Anos d={q1 + 4} />],
          [at("¿Cuántas veces pusiste"), <SerieEsp volta={at("volviste al español")} />],
          [q3, <YesYes d={q3 + 4} yes={at("diciendo yes")} />],
        ]} />
      </Meio>
    </Tela>
  );
};

// ANCORAGEM NO CUSTO DE NÃO AGIR: a "factura" do que ele já perdeu por não falar inglês.
const LINHAS: [string, string, string][] = [["La vacante que pedía inglés", "y ni intentaste", "La vacante que pedía"], ["El aumento", "fue para otro", "El aumento que fue"], ["El viaje", "dependiste de alguien", "El viaje en el que"]];
export const Custo: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const tot = at("Eso vale mucho más");
  return (
    <Tela fundo={FUNDO}>
      <Cabeca rot="la factura" top={150}>
        <TK t="Lo que ya te *costó*" d={0} size={116} />
      </Cabeca>
      <Meio top={560}>
        <Painel w={980} pad={56}>
          <Rotulo cor={CINZA} size={34} style={{ textAlign: "left" }}>no hablar inglés</Rotulo>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
            {LINHAS.map(([rot, val, frase]) => (
              <Reveal key={rot} d={at(frase)}>
                <div style={{ padding: "30px 0", borderBottom: "2px dashed rgba(255,255,255,.18)" }}>
                  <div style={{ fontFamily: FONTE.sans, fontWeight: 700, fontSize: 56, color: "var(--tx)" }}>{rot}</div>
                  <div style={{ fontFamily: FONTE.sans, fontWeight: 600, fontSize: 48, color: VERM, marginTop: 6 }}>{val}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Pop d={tot} from={0.85}>
            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 60, color: "var(--tx)" }}>Total</div>
              <div style={{ fontFamily: FONTE.tit, fontWeight: 800, fontSize: 76, color: VERM, letterSpacing: -2, lineHeight: 1.05 }}>más que cualquier curso</div>
            </div>
          </Pop>
        </Painel>
      </Meio>
    </Tela>
  );
};

// PILHA ANTES DO PREÇO (stack do Brunson): cada item entra com check NA palavra; o preço só vem depois.
export const Pilha: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const series = at("las temporadas completas");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="todo lo que recibes" top={150}>
        <TK t="Mira todo lo que *tienes*" d={0} size={112} />
      </Cabeca>
      <Meio top={480} style={{ gap: 22 }}>
        <Item d={at("el método de entrenamiento concentrado")} size={52}>Método de entrenamiento concentrado</Item>
        <Item d={series} size={52}>Temporadas completas de 3 series</Item>
        <Pop d={series + 6} from={0.85}>
          <div style={{ display: "flex", gap: 20 }}>
            {["friends", "tahm", "himym"].map((p, i) => <div key={p} style={{ width: 190, height: 285, borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 50px -22px rgba(0,0,0,.6)", transform: `rotate(${(i - 1) * 2}deg)` }}><Img src={staticFile(`img/poster-${p}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>)}
          </div>
        </Pop>
        <Item d={at("el área de pronunciación")} size={52}>Pronunciación con inteligencia artificial</Item>
        <Item d={at("los guiones en inglés")} size={52}>Guiones en inglés y español</Item>
        <Item d={at("los audios")} size={52}>Audios de entrenamiento</Item>
        <Item d={at("las tres fases")} size={52}>3 fases: del oído a la inmersión</Item>
      </Meio>
    </Tela>
  );
};

// depois do avatar "nuestro compromiso fue otro": a âncora despenca (3 mil → 1.500); o preço vem na cena seguinte.
export const Baixa: React.FC<CP> = ({ de }) => {
  const at = useAt(de);
  const nao15 = at("no vas a pagar 1.500 dólares");
  return (
    <Tela fundo={FUNDO_FRIO}>
      <Cabeca rot="desde el primer día, otro compromiso" top={150}>
        <Slot itens={[
          [0, <Titulo size={104}>Hoy <span style={{ color: VERM }}>no</span> vas a pagar</Titulo>],
          [at("Decidimos hacerlo totalmente diferente"), <Titulo size={104}>Lo hicimos <span style={{ color: VERM }}>totalmente diferente</span></Titulo>],
        ]} />
      </Cabeca>
      <Meio top={640} style={{ gap: 50 }}>
        <Pop d={0} from={0.85}><Giga size={170} cor={CINZA} style={{ whiteSpace: "nowrap" }}><Riscado d={6} h={22}>US$ 3.000</Riscado></Giga></Pop>
        <Pop d={nao15} from={0.8}><Giga size={150} cor={CINZA} style={{ whiteSpace: "nowrap" }}><Riscado d={nao15 + 8} h={20}>US$ 1.500</Riscado></Giga></Pop>
      </Meio>
    </Tela>
  );
};
