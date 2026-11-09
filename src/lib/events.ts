export interface CampusEvent {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  day: string;
  month: string;
  time: string;
  venue: string;
  price: number;
  theme: "blue" | "red" | "sand";
  icon: "ideas" | "code" | "art";
  duration: string;
  description: string;
  program: string[];
}
export const events: CampusEvent[] = [
  {
    id: "conecta",
    title: "Conecta: ideias que transformam",
    subtitle: "Um encontro com o que vem pela frente.",
    category: "Inovação",
    date: "2026-11-21",
    day: "21",
    month: "NOV",
    time: "09h às 17h",
    venue: "Campus Tancredo Neves · Salvador",
    price: 80,
    theme: "blue",
    icon: "ideas",
    duration: "8 horas de conexão",
    description:
      "Novas perspectivas nascem de boas conversas. Um dia para explorar tecnologia, criatividade e o impacto de ideias que saem do papel, ao lado de pessoas que também querem transformar o futuro.",
    program: [
      "09h · Boas-vindas e café de conexões",
      "10h · Painel: o futuro se constrói agora",
      "14h · Laboratório de ideias e colaboração",
      "16h · Conversas, descobertas e próximos passos",
    ],
  },
  {
    id: "tech",
    title: "Tech Experience",
    subtitle: "Aprenda, experimente, desenvolva.",
    category: "Tecnologia",
    date: "2026-11-26",
    day: "26",
    month: "NOV",
    time: "18h30 às 21h30",
    venue: "Campus Santa Mônica · Feira de Santana",
    price: 50,
    theme: "red",
    icon: "code",
    duration: "3 horas de prática",
    description:
      "Uma experiência prática para quem tem curiosidade, vontade de aprender e ideias para testar. Explore desenvolvimento de software e soluções digitais em um ambiente de troca.",
    program: [
      "18h30 · Abertura e apresentação dos desafios",
      "19h · Oficina: construindo a primeira solução",
      "20h30 · Demonstrações e troca de experiências",
    ],
  },
  {
    id: "criativa",
    title: "Conexões criativas",
    subtitle: "Olhares diferentes. Novas possibilidades.",
    category: "Cultura",
    date: "2026-12-03",
    day: "03",
    month: "DEZ",
    time: "14h às 18h",
    venue: "Campus Professor Barros · Salvador",
    price: 40,
    theme: "sand",
    icon: "art",
    duration: "4 horas de inspiração",
    description:
      "Arte, design e cultura em um encontro para ampliar repertórios. Descubra processos criativos, compartilhe referências e encontre outras formas de olhar para o cotidiano.",
    program: [
      "14h · Percursos criativos: conversa de abertura",
      "15h · Oficina de experimentação visual",
      "17h · Mostra coletiva e encerramento",
    ],
  },
];
export type TicketCategory = "Inteira" | "Estudante" | "Comunidade";
export const categoryFactors: Record<TicketCategory, number> = {
  Inteira: 1,
  Estudante: 0.5,
  Comunidade: 0.8,
};
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export function calculateTotal(
  price: number,
  quantity: number,
  category: TicketCategory,
  coupon: string,
) {
  const subtotal = price * quantity * categoryFactors[category];
  return {
    subtotal,
    discount: coupon.trim().toUpperCase() === "UNIFACS10" ? subtotal : 0,
    total: coupon.trim().toUpperCase() === "UNIFACS10" ? 0 : subtotal,
  };
}
export function checkNameRuntime(name: string) {
  if (name.length > 200)
    throw new Error("RegistrationRuntimeError: name exceeds 200 characters");
}
export interface Ticket {
  id: string;
  event: CampusEvent;
  name: string;
  email: string;
  cpf: string;
  quantity: number;
  category: TicketCategory;
  total: number;
  createdAt: string;
}
