-- Catálogo demonstrativo. Não cria tabelas de dados pessoais.
CREATE TABLE IF NOT EXISTS public.sqa_events (
  id text PRIMARY KEY,
  title text NOT NULL,
  subtitle text NOT NULL,
  category text NOT NULL,
  date date NOT NULL,
  day text NOT NULL,
  month text NOT NULL,
  time text NOT NULL,
  venue text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  theme text NOT NULL CHECK (theme IN ('blue','red','sand')),
  icon text NOT NULL CHECK (icon IN ('ideas','code','art')),
  duration text NOT NULL,
  description text NOT NULL,
  program text[] NOT NULL
);
ALTER TABLE public.sqa_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.sqa_events FROM anon, authenticated;
GRANT SELECT ON public.sqa_events TO anon, authenticated;
DROP POLICY IF EXISTS "sqa_catalog_read" ON public.sqa_events;
CREATE POLICY "sqa_catalog_read" ON public.sqa_events FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.sqa_events (id,title,subtitle,category,date,day,month,time,venue,price,theme,icon,duration,description,program) VALUES
('conecta','Conecta: ideias que transformam','Um encontro com o que vem pela frente.','Inovação','2026-11-21','21','NOV','09h às 17h','Campus Tancredo Neves · Salvador',80,'blue','ideas','8 horas de conexão','Novas perspectivas nascem de boas conversas. Um dia para explorar tecnologia, criatividade e o impacto de ideias que saem do papel, ao lado de pessoas que também querem transformar o futuro.',ARRAY['09h · Boas-vindas e café de conexões','10h · Painel: o futuro se constrói agora','14h · Laboratório de ideias e colaboração','16h · Conversas, descobertas e próximos passos']),
('tech','Tech Experience','Aprenda, experimente, desenvolva.','Tecnologia','2026-11-26','26','NOV','18h30 às 21h30','Campus Santa Mônica · Feira de Santana',50,'red','code','3 horas de prática','Uma experiência prática para quem tem curiosidade, vontade de aprender e ideias para testar. Explore desenvolvimento de software e soluções digitais em um ambiente de troca.',ARRAY['18h30 · Abertura e apresentação dos desafios','19h · Oficina: construindo a primeira solução','20h30 · Demonstrações e troca de experiências']),
('criativa','Conexões criativas','Olhares diferentes. Novas possibilidades.','Cultura','2026-12-03','03','DEZ','14h às 18h','Campus Professor Barros · Salvador',40,'sand','art','4 horas de inspiração','Arte, design e cultura em um encontro para ampliar repertórios. Descubra processos criativos, compartilhe referências e encontre outras formas de olhar para o cotidiano.',ARRAY['14h · Percursos criativos: conversa de abertura','15h · Oficina de experimentação visual','17h · Mostra coletiva e encerramento'])
ON CONFLICT(id) DO UPDATE SET title=EXCLUDED.title, subtitle=EXCLUDED.subtitle, category=EXCLUDED.category, date=EXCLUDED.date, day=EXCLUDED.day, month=EXCLUDED.month, time=EXCLUDED.time, venue=EXCLUDED.venue, price=EXCLUDED.price, theme=EXCLUDED.theme, icon=EXCLUDED.icon, duration=EXCLUDED.duration, description=EXCLUDED.description, program=EXCLUDED.program;
