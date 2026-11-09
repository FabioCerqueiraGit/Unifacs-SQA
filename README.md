# UNIFACS Eventos · SQA

**Laboratório de Qualidade de Software para o projeto A3.**

Aplicação web acadêmica de consulta a eventos e simulação de inscrições, desenvolvida como objeto de estudo para os alunos da UC Qualidade de Software da UNIFACS. O projeto reúne uma interface navegável, documentação de referência e recursos para planejar, executar e registrar testes.

**[Acessar a aplicação](https://unifacs-sqa.vercel.app/) · [Ler a documentação](docs/README.md) · [Consultar o guia de testes](docs/08-testes-e-rastreabilidade.md)**

> Projeto acadêmico independente, sem vínculo institucional. Eventos, valores, inscrições e mensagens são demonstrativos. Utilize somente dados fictícios. Não há cobrança nem envio de mensagens a terceiros.

## Visão geral

O sistema apresenta uma agenda de experiências acadêmicas e permite percorrer o fluxo de seleção de evento, preenchimento de inscrição e consulta de ingressos na instância atual da aplicação.

| Área | Recursos do laboratório |
| --- | --- |
| **Eventos** | Agenda, busca textual, filtros por categoria, descrição, programação, data, horário e local. |
| **Inscrição** | Formulário com dados fictícios, quantidade, categoria de ingresso, cupom opcional e resumo de valores. |
| **Meus Ingressos** | Consulta dos registros demonstrativos criados durante o uso da página. |
| **Contato** | Formulário demonstrativo com prévia local da mensagem em documento isolado. |
| **Catálogo** | Base local incorporada à aplicação e leitura opcional de eventos no Supabase. |

A navegação utiliza os fragmentos `#eventos`, `#ingressos` e `#contato`. A interface contempla adaptação a telas menores e recursos de navegação por teclado, que também integram a avaliação de qualidade.

## Documentação de software

A pasta **[docs/](docs/README.md)** contém a referência de leitura para os alunos. Os documentos distinguem escopo atual, comportamento esperado e possibilidades de evolução futura. Um requisito descrito não equivale a um resultado de teste já aprovado.

| Documento | Conteúdo |
| --- | --- |
| [Índice e orientações de leitura](docs/README.md) | Organização do material, convenções, uso responsável e fontes. |
| [Visão, objetivos e escopo](docs/01-visao-objetivos-escopo.md) | Objetivo geral, objetivos específicos, público, limites e evolução futura. |
| [Requisitos funcionais e não funcionais](docs/02-requisitos.md) | Requisitos identificados, prioridades e critérios verificáveis. |
| [Regras de negócio](docs/03-regras-de-negocio.md) | Dados de inscrição, categorias, valores, descontos, sessão e contato. |
| [Casos de uso](docs/04-casos-de-uso.md) | Atores, diagrama e fluxos principais, alternativos e de exceção. |
| [Arquitetura e execução](docs/05-arquitetura-e-execucao.md) | Componentes, integração, configuração, execução e publicação. |
| [Modelo de dados](docs/06-modelo-de-dados.md) | Modelo conceitual, esquema do catálogo, dicionário e ciclo de vida dos dados. |
| [Fluxos e estados](docs/07-fluxos-e-estados.md) | Diagramas de atividades, sequência, navegação e estados. |
| [Testes e rastreabilidade](docs/08-testes-e-rastreabilidade.md) | Estratégia de avaliação, matrizes de cobertura, modelo de caso de teste e relatos. |

Os diagramas estão em **Mermaid**, com visualização nos arquivos Markdown do GitHub e explicações textuais de apoio.

## Roteiro para os alunos

1. Leia os [objetivos e limites do sistema](docs/01-visao-objetivos-escopo.md).
2. Relacione os [requisitos](docs/02-requisitos.md) às [regras de negócio](docs/03-regras-de-negocio.md) e aos [casos de uso](docs/04-casos-de-uso.md).
3. Prepare uma massa de dados sintética e elabore os próprios casos de teste.
4. Execute os cenários na [aplicação publicada](https://unifacs-sqa.vercel.app/) ou no ambiente local autorizado pelo docente.
5. Compare resultado esperado e obtido, registre evidências e mantenha a rastreabilidade dos requisitos avaliados.
6. Utilize o [guia de testes](docs/08-testes-e-rastreabilidade.md) e o [template de relato](.github/ISSUE_TEMPLATE/relato-de-teste.yml), seguindo o formato de entrega definido pelo docente.

Registre a versão ou commit testado, a URL quando aplicável, o navegador e o dispositivo. A versão publicada pode ser diferente da revisão mais recente do repositório.

## Tecnologias

| Finalidade | Tecnologias |
| --- | --- |
| Interface e tipagem | React 19 e TypeScript |
| Desenvolvimento e build | Vite |
| Estilização | Tailwind CSS 4 e CSS do projeto |
| Componentes e ícones | Componentes locais shadcn/ui com Radix e Lucide |
| Tipografia | Figtree e Marcellus, empacotadas localmente |
| Testes | Vitest, Testing Library e jsdom |
| Catálogo remoto opcional | Supabase REST e PostgreSQL |
| Hospedagem | Build estático, com configuração para Vercel |

As dependências estão declaradas em [package.json](package.json), com versões resolvidas em [package-lock.json](package-lock.json). O projeto não requer Docker.

## Executar localmente

### Pré-requisitos

- Node.js **22.12+** ou **24 LTS**.
- npm.
- Git, caso obtenha o projeto por clonagem.

### Instalação e desenvolvimento

```bash
git clone https://github.com/FabioCerqueiraGit/Unifacs-SQA.git
cd Unifacs-SQA
npm ci
npm run dev
```

Abra o endereço informado pelo Vite no terminal. A aplicação funciona com o catálogo local, sem necessidade de configurar banco de dados.

### Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Iniciar o servidor de desenvolvimento. |
| `npm run typecheck` | Verificar a tipagem TypeScript. |
| `npm test` | Executar a suíte automatizada existente. |
| `npm run test:watch` | Executar os testes em modo de acompanhamento. |
| `npm run build` | Verificar tipos e gerar os arquivos de produção em `dist/`. |
| `npm run preview` | Servir localmente o build já gerado. |

Para verificar o projeto e inspecionar o build:

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

A suíte automatizada incluída oferece verificações iniciais de navegação e catálogo. Ela não representa cobertura completa dos requisitos nem substitui a avaliação em navegadores reais.

## Arquitetura e dados

A aplicação é uma **SPA executada no navegador**. O build contém HTML, CSS, JavaScript e fontes. Não há backend próprio de inscrições, autenticação ou contato.

- **Catálogo:** utiliza dados locais ou, quando configurado, uma leitura da tabela `sqa_events` no Supabase.
- **Inscrições:** permanecem no estado React da instância atual da aplicação. Não são gravadas em banco, `localStorage` ou `sessionStorage`.
- **Contato:** apresenta uma prévia local em um documento isolado. Não cria chamado nem entrega mensagem a uma equipe.

Consulte os [diagramas de arquitetura](docs/05-arquitetura-e-execucao.md) e o [modelo de dados](docs/06-modelo-de-dados.md) para os contratos e as responsabilidades de cada componente.

### Catálogo Supabase opcional

A configuração deve ser realizada pelo responsável técnico em um projeto autorizado:

1. Prepare a tabela e as permissões com o script [supabase/catalog.sql](supabase/catalog.sql).
2. Crie um `.env.local` com base em [.env.example](.env.example), usando os valores do projeto escolhido.
3. Defina `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
4. Use apenas uma chave pública de cliente do tipo `publishable` ou `anon`. **Nunca coloque `service_role` ou outros segredos no frontend.**
5. Reinicie o servidor de desenvolvimento após alterar a configuração; para o site publicado, gere e publique um novo build.

O carregador atual aceita a integração por HTTPS em hosts terminados em `.supabase.co`. Configuração ausente ou inadequada, falha de leitura ou resposta vazia/incompatível levam ao catálogo local.

O SQL fornecido habilita RLS e concede apenas leitura aos clientes. O frontend não grava dados no Supabase. Variáveis com prefixo `VITE_` são incorporadas ao build e ficam acessíveis ao navegador, portanto não devem conter segredos. Não publique arquivos de ambiente com valores privados.

## Publicação

Acesse o laboratório em **[https://unifacs-sqa.vercel.app/](https://unifacs-sqa.vercel.app/)**.

O build de produção é gerado em `dist/`. O fluxo de disponibilização do laboratório usa artefato estático por **Vercel Drop**; atualizar o GitHub não implica deploy automático nesse fluxo.

O arquivo [vercel.json](vercel.json) também descreve a configuração para um projeto Vercel compatível:

- Instalação: `npm ci`.
- Build: `npm run build`.
- Diretório de saída: `dist`.

A aplicação dessa configuração depende do método de publicação. Mudanças nas variáveis de ambiente de um site estático exigem novo build. Alterações de infraestrutura e deploy ficam a cargo do responsável pelo laboratório.

## Limites e uso responsável

- Use somente **nomes, e-mails, CPFs e mensagens fictícios**.
- “Sessão” significa a vida da instância carregada na aba, sem autenticação. A navegação interna preserva os ingressos; recarregar ou fechar a página elimina esses registros.
- Outra aba ou dispositivo não compartilha as inscrições. Não há recuperação ou sincronização de ingressos.
- Não há pagamento, reserva real de lugares, emissão oficial de comprovantes, contas de usuário ou envio de mensagens.
- Preserve o sandbox e as políticas de segurança da prévia do contato.
- Não altere catálogo remoto, permissões ou serviços compartilhados e não execute testes de carga sem autorização específica.
- Remova dados pessoais, chaves, tokens e informações de outras aplicações antes de anexar capturas ou logs aos relatos.

## Organização do repositório

```text
.
├── docs/                         # Documentação de software e guia de testes
├── src/
│   ├── App.tsx                   # Navegação, telas e estado da aplicação
│   ├── components/ui/            # Componentes de interface reutilizáveis
│   ├── lib/                      # Catálogo, tipos, cálculos e prévia de contato
│   ├── test/                     # Testes automatizados e configuração
│   ├── index.css                 # Estilos e layout
│   └── main.tsx                  # Inicialização do React
├── public/                       # Recursos estáticos
├── supabase/catalog.sql          # Esquema e catálogo demonstrativo
├── .github/ISSUE_TEMPLATE/        # Modelo de relato de teste
├── .env.example                  # Referência de configuração
├── package.json                  # Dependências e comandos
├── package-lock.json             # Versões resolvidas das dependências
├── vercel.json                   # Configuração de publicação compatível
└── vite.config.ts                # Configuração do Vite e dos testes
```

**Próximo passo:** abra o [índice da documentação](docs/README.md) e siga o roteiro de leitura antes de iniciar a avaliação.
