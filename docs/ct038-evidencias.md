# CT038 — Evidências e critérios de aprovação

## Identificação

- **Caso:** CT038 — fallback para catálogo local quando a leitura remota falha ou não fornece dados utilizáveis.
- **Implementação avaliada:** `src/lib/catalog.ts`.
- **Dados locais de referência:** `src/lib/events.ts`.
- **Teste automatizado:** `src/lib/catalog.test.ts`.
- **Automação:** `.github/workflows/ct038.yml`.
- **Ambiente:** Vitest/jsdom para testes unitários; GitHub Actions com Node.js 22.12.0 para validação contínua.
- **Escopo de segurança:** mocks locais; nenhuma chamada real ao Supabase e nenhuma alteração no banco, nas variáveis de ambiente ou na publicação Vercel.

## Cenários automatizados

| ID | Condição simulada | Resultado esperado |
| --- | --- | --- |
| CT038-01 | URL e chave Supabase ausentes | Retornar os eventos locais sem chamar `fetch`. |
| CT038-02 | Falha de rede/rejeição de `fetch` | Retornar os eventos locais. |
| CT038-03 | Resposta HTTP não OK (ex.: 500) | Retornar os eventos locais. |
| CT038-04 | Resposta remota vazia | Retornar os eventos locais. |
| CT038-05 | Evento remoto incompatível com o contrato | Retornar os eventos locais. |
| CT038-06 | Lista remota não vazia e válida | Retornar a lista remota. |

Os testes utilizam dados sintéticos e substituem `fetch`; portanto, não dependem de credenciais nem de disponibilidade de serviços externos.

## Como reproduzir

Na raiz do repositório, com Node.js 22.12.0 ou superior compatível:

```bash
npm ci
npx vitest run src/lib/catalog.test.ts
npm test
npm run typecheck
npm run build
```

A automação GitHub Actions executa a suíte completa, a verificação de tipos e o build em pushes para `main`, pull requests destinados a `main` e execução manual. O artefato `ct038-production-build` conserva o diretório `dist/` por 14 dias. Os logs da execução registram comandos, versões e resultados.

## Evidências e estado

Este documento descreve os cenários implementados e o mecanismo de coleta. **Não representa, por si só, evidência de execução bem-sucedida.** A aprovação só deve ser registrada após uma execução real do workflow e conferência de todos os passos como concluídos.

| Evidência | Onde consultar | Estado inicial deste registro |
| --- | --- | --- |
| Resultado CT038 isolado | GitHub Actions → execução do workflow → passo “Run automated tests (including CT038)” | Aguardando execução após o commit |
| Regressão da suíte completa | Mesmo workflow → passo “Run automated tests (including CT038)” | Aguardando execução após o commit |
| Tipagem | Mesmo workflow → passo “TypeScript typecheck” | Aguardando execução após o commit |
| Build | Mesmo workflow → passo “Production build” | Aguardando execução após o commit |
| Artefato compilado | GitHub Actions → Artifacts → `ct038-production-build` | Aguardando execução após o commit |
| Verificação visual em navegador real | Relato manual com navegador, versão, sistema, dimensões e capturas | Não coberta por testes unitários; execução manual pendente |

## Critérios para declarar aprovado

1. Os seis cenários CT038 passam.
2. A suíte geral passa, sem regressões.
3. Typecheck e build passam.
4. O log e o artefato da execução ficam acessíveis e associados ao SHA testado.
5. A revisão manual registra a interface e a fonte de catálogo efetivamente utilizada, quando exigida pela atividade.

Se algum passo falhar, registrar como reprovado ou bloqueado, anexar o log pertinente e não declarar aprovação integral. Testes unitários com mocks validam o comportamento do carregador, mas não provam disponibilidade, configuração ou conteúdo de uma instância Supabase real.

## Limitações conhecidas

- Não é feito teste de integração contra Supabase real, intencionalmente, para evitar efeitos em serviços compartilhados.
- Não há teste visual automatizado nem captura de navegador nesta automação.
- A aprovação acadêmica/formal continua sujeita à revisão do responsável pela atividade.
