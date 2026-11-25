// REGISTRO DE CENAS da VSL Friends LATAM (Manuela). c(nome, frase que abre a cena, componente). A cena vai da sua frase até a frase da próxima.
// Frase = texto EXATO do roteiro em espanhol (words.ts). 4 lotes: c1 lead+presentación · c2 la clase · c3 prueba+oferta · c4 garantías+cierre.
import React from "react";
import { t } from "./kit";
import * as A from "./c1";
import * as B from "./c2";
import * as D from "./c3";
import * as E from "./c4";
import * as T from "./c3b";
export type Cena = { nome: string; de: number; Comp: React.FC<{ de: number }> };
let ant = 0;
const c = (nome: string, frase: string | number, Comp: React.FC<{ de: number }>): Cena => { const de = typeof frase === "number" ? frase : t(frase, ant); ant = de; return { nome, de, Comp }; };
export const CENAS: Cena[] = [
  c("hook", 0, A.Hook),
  c("traducao", "Y funciona porque", A.Traducao),
  c("repeticao", "Y la propia repetición de las escenas", A.Repeticao),
  c("embolado", "Hasta el punto en que", A.Embolado),
  c("primeiroEp", "Y empiezas a entender tu primer episodio", A.PrimeiroEp),
  c("aulaEUA", "Y no es casualidad que en Fluency Route", A.AulaEUA),
  c("segundo", "Porque después de que entiendes", A.Segundo),
  c("dePrimeira", "Hasta que la propia repetición de las palabras", A.DePrimeira),
  c("operacional", "Ya vas a poder ver películas", A.Operacional),
  c("metas", "Entonces, si quieres aprender inglés", A.Metas),
  c("unica", "te voy a mostrar lo único", A.Unica),
  c("manuela", "Un placer.", A.Manuela),
  c("noventa", "la primera escuela del mundo", A.Noventa),
  c("mundo", "Hoy Fluency Route tiene alumnos", A.Mundo),
  c("dica", "Y si ya intentaste aprender inglés antes", B.Dica),
  c("series", "Pero la mayoría de las personas que son fluidas", B.Series),
  c("cotidiano", "Lo primero para entender esto", B.Cotidiano),
  c("vocab", "Entonces, a diferencia de ver una película", B.Vocab),
  c("quinhentas", "Incluso hay un lingüista muy famoso", B.Quinhentas),
  c("calculadora", "Y yo tomé el guion", B.Calculadora),
  c("mesmas", "Y hay palabras como", B.Mesmas),
  c("semSentido", "Cuando entiendes esto, empiezas a darte cuenta", B.SemSentido),
  c("essencialTit", "Y para eso ahora te quiero mostrar la fluidez esencial", B.EssencialTit),
  c("peso", "Y lo primero de la fluidez esencial", B.Peso),
  c("jaConhece", "Y lo interesante es que, si ya estudiaste", B.JaConhece),
  c("palavraDia", "Y ahora te voy a mostrar cómo", B.PalavraDia),
  c("temTudo", "Y es aquí donde empezamos a usar Friends", B.TemTudo),
  c("tresTemp", "Y hay gente que ya tiene esta idea", B.TresTemp),
  c("funil", "Entonces vamos, piensa una cosa conmigo", B.Funil),
  c("focado", "Yo lo llamo entrenamiento concentrado", B.Focado),
  c("nitido", "Cuando haces esto, pasan algunas cosas", B.Nitido),
  c("segundaCena", "Pero lo más interesante es lo que pasa", B.SegundaCena),
  c("metaEp", "Y vas entrenando cada escena", B.MetaEp),
  c("resultado", "Y la sensación que tienes", B.Resultado),
  c("musico", "Y quienes entienden muy bien de entrenamiento concentrado", B.Musico),
  c("trechos", "Y no entrena la canción entera", B.Trechos),
  c("vantagem", "Pero aquí, como estamos hablando de entrenamiento de oído", B.Vantagem),
  c("confianca", "Entonces, como el inglés esencial empieza a repetirse", B.Confianca),
  c("cinco", "En realidad, con cinco episodios", B.Cinco),
  c("risada", "No es casualidad que aquí en Fluency Route", B.Risada),
  c("escada5", "Porque después de que entiendes ese primer episodio", B.Escada5),
  c("musico2", "Y de nuevo, muy parecido a un músico", B.Musico2),
  c("blocos", "Justamente por la fluidez esencial", B.Blocos),
  c("centenas", "Y por eso hoy Fluency Route cuenta con cientos", B.Centenas),
  c("exemplo", "Y bueno, este es solo un ejemplo", D.Exemplo),
  c("honestidad", "Y antes de seguir, respóndeme", T.Honestidad), // 25/11 microcompromisso
  c("oQue", "Y ahora que entendiste cómo funciona todo esto", D.OQue),
  c("metaClara", "Primero, que aquí tienes una meta real", D.MetaClara),
  c("conteudo", "Y claro que esto es solo el comienzo", D.Conteudo),
  c("appEntrega", "Y todo eso entregado dentro de una aplicación", D.AppEntrega),
  c("planoVoo", "Este es tu plan de vuelo", D.PlanoVoo),
  c("fala", "Pero no nos vamos a quedar ahí. Porque además de entrenar tu oído", D.Fala),
  c("shadowing", "Y todo esto dentro de entrenamientos de shadowing", D.Shadowing),
  c("travados", "Y ahora déjame contarte algo. Cuando entiendes la lógica", D.Travados),
  c("custo", "Y piensa en lo que ya te costó", T.Custo), // 25/11 âncora: custo de não agir
  c("poderia", "Y la verdad es que podríamos seguir", D.Poderia),
  c("pilha", "Mira todo lo que tienes", T.Pilha), // 25/11 pilha antes do preço
  c("baixa", "Entonces hoy no vas a pagar", T.Baixa),
  c("preco", "Y hoy puedes asegurar el acceso", D.Preco),
  c("naoCurso", "Pero con un detalle", D.NaoCurso),
  c("clique", "Y ahora ya puedes hacer clic", D.Clique),
  c("fases", "Y ahora te quiero dar más detalles", D.Fases),
  c("fase1", "Fase 1:", D.Fase1),
  c("fase2", "Fase 2:", D.Fase2),
  c("fase3", "Fase 3:", D.Fase3),
  c("acesso", "Y todo esto dentro de un acceso completo", D.Acesso),
  c("coragem", "Y ahora déjame contarte algo que poca gente", E.Coragem),
  c("g7", "Garantía número uno", E.G7),
  c("semPergunta", "Sin preguntas, sin formularios", E.SemPergunta),
  c("g90", "Pero no nos vamos a quedar ahí, porque pensamos", E.G90),
  c("g90cond", "Si sigues los entrenamientos concentrados", E.G90cond),
  c("risco", "Porque no tiene ningún sentido que sigas", E.Risco),
  c("recap", "Entonces ahí está", E.Recap),
  c("viraChave", "Y déjame decirte una cosa", E.ViraChave),
  c("decisao", "Ahora la decisión es tuya", E.Decisao),
  c("pronto", "Todo está listo para ti", E.Pronto),
];
// PONTOS DE AVATAR (Marcos 24/11: no máx 5 s cada, menos de 1 min no total, escolhidos pelo impacto; lipsync gerado 1 vez).
// [nome, frase que abre, frase que fecha (fim da última palavra)] no texto do roteiro. Áudio separado: ~/latam-friends/voz/lipsync.mjs
export const AVATAR: [string, string, string][] = [
  ["hook", "Hay un truco simple", "inglés con Friends"],
  ["eua", "¿sabes dónde? En Estados", "En Estados Unidos."],
  ["manuela", "Un placer. Mi nombre", "completamente adicta al inglés."],
  ["concentrado", "Yo lo llamo entrenamiento", "lo llamo entrenamiento concentrado."],
  ["reirse", "cuando los alumnos hacen esto,", "literalmente empiezan a reírse"],
  ["compromiso", "Pero desde el primer día aquí", "nuestro compromiso fue otro."],
  ["valor", "Y ahora déjame contarte algo que poca", "de ofrecer por ahí."],
  ["decision", "Ahora la decisión es tuya.", "decisión es tuya."],
  ["adios", "Eso es todo.", "¡Hasta pronto!"],
];
