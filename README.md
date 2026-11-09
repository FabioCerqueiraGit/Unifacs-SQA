# UNIFACS Eventos · SQA

Repositório para o projeto A3 dos alunos Unifacs, UC Qualidade de Software.

Aplicação acadêmica independente para atividades de qualidade de software. Layout próprio inspirado na comunicação visual universitária. Sem vínculo institucional, eventos reais, pagamentos ou envio de mensagens.

## Tecnologias

React 19, TypeScript, Vite, Tailwind CSS 4, componentes shadcn/ui (Radix), Lucide e Vitest. Fontes Figtree e Marcellus incluídas localmente. Não requer Docker.

## Executar

Requer Node.js 22.12+ ou 24 LTS e npm.

```bash
npm ci
npm run dev
```

## Verificar e gerar produção

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

O build é gerado em `dist`. O arquivo `vercel.json` já configura o projeto Vite. Na Vercel, use `npm ci` para instalação, `npm run build` para build e `dist` como diretório de saída.

## Supabase opcional

A aplicação funciona com um catálogo local. Para usar um catálogo remoto:

1. Execute `supabase/catalog.sql` no projeto Supabase escolhido.
2. Defina `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` na Vercel ou em um `.env.local` baseado em `.env.example`.
3. Use somente a chave pública `publishable` ou `anon`. Nunca inclua a chave `service_role`.
4. Faça um novo deploy após alterar variáveis.

A tabela de catálogo possui RLS e permite apenas leitura aos clientes. O frontend não grava dados no Supabase.

## Uso em aula

- Use exclusivamente nomes, e-mails e CPFs fictícios.
- As inscrições ficam em memória na aba atual e desaparecem ao recarregar ou fechar a página.
- Não há pagamento, autenticação nem envio de mensagens a terceiros.
- O formulário de contato apresenta seu conteúdo em um documento isolado. Preserve o sandbox e as políticas de conteúdo.
- Relate resultados pelo template de issue do repositório, sem dados pessoais reais.

## Navegação

Eventos, Meus Ingressos e Contato usam fragmentos de URL. A agenda possui busca e filtros. Os formulários podem ser acessados pelo teclado e o layout se adapta a dispositivos móveis.

## Documentação de software para os alunos

Consulte a [documentação completa em `docs/`](docs/README.md), com objetivos, requisitos funcionais e não funcionais, regras de negócio, casos de uso, diagramas, arquitetura, modelo de dados e guia de testes com rastreabilidade.
