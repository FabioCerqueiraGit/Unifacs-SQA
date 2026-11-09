# 1. Visão, objetivos e escopo

[Índice da documentação](README.md) · [Próximo: requisitos](02-requisitos.md)

## 1.1 Contexto do sistema

O UNIFACS Eventos SQA representa um portal de eventos acadêmicos. A pessoa visitante consulta uma agenda, pesquisa experiências, abre os detalhes de um evento, preenche uma inscrição demonstrativa e consulta os ingressos gerados durante o uso da página. Um formulário de contato complementa a experiência com uma simulação local de mensagem.

O produto tem duas dimensões: uma experiência de software compreensível para o usuário e um objeto de estudo para planejamento, execução e documentação de testes. Não é um sistema oficial da instituição nem um serviço de venda de ingressos.

## 1.2 Objetivo geral do sistema

**Disponibilizar uma aplicação web de consulta a eventos e simulação de inscrições, com navegação acessível, informações organizadas e acompanhamento de ingressos durante a sessão de uso, servindo como ambiente de aprendizagem e avaliação da qualidade de software.**

## 1.3 Objetivos específicos do sistema

| ID | Objetivo específico | Evidência de alcance a avaliar |
| --- | --- | --- |
| OE-01 | Apresentar uma agenda organizada de eventos acadêmicos demonstrativos. | Eventos identificáveis, com categoria, local, data, horário e referência de preço. |
| OE-02 | Facilitar a localização de eventos por categoria e texto. | Busca e filtros combináveis, com recuperação após ausência de resultados. |
| OE-03 | Disponibilizar detalhes suficientes para a escolha de um evento. | Descrição, programação e condições da inscrição acessíveis antes de concluir. |
| OE-04 | Permitir simular uma inscrição com dados fictícios e critérios explícitos de validação. | Formulário verificável e geração de um registro demonstrativo válido. |
| OE-05 | Tornar compreensível o cálculo de valores por quantidade, categoria e cupom. | Subtotal, desconto e total consistentes com as regras de negócio. |
| OE-06 | Permitir consultar as inscrições criadas na instância atual da aplicação. | Lista coerente de ingressos, identificação dos registros e estado vazio informativo. |
| OE-07 | Oferecer uma experiência de contato demonstrativa, sem comunicação externa. | Prévia local da mensagem e aviso explícito de simulação. |
| OE-08 | Apoiar uso em diferentes telas, navegação por teclado e compreensão das respostas do sistema. | Avaliação de usabilidade, acessibilidade e responsividade. |
| OE-09 | Manter o catálogo utilizável com dados locais ou com uma fonte remota de leitura. | Consulta remota quando configurada e alternativa local quando necessária. |
| OE-10 | Fornecer uma base rastreável para análise e comunicação da qualidade. | Relação entre requisito, caso de uso, caso de teste, evidência e relato. |

## 1.4 Pessoas e papéis

- **Visitante/participante:** pessoa que consulta eventos e usa os formulários. Não precisa de conta. Esses nomes descrevem atividades do mesmo ator, não níveis de permissão.
- **Aluno avaliador:** usa os mesmos recursos da interface para elaborar e executar testes. Não recebe uma função administrativa no produto.
- **Docente/responsável pelo laboratório:** define o ambiente de exercício, orienta a avaliação e administra a disponibilização do material. A aplicação não contém uma área de docente.
- **Responsável técnico:** prepara o build, a hospedagem e, quando utilizado, o catálogo Supabase por ferramentas externas à aplicação.

## 1.5 Escopo da edição atual

| Área | Delimitação |
| --- | --- |
| Agenda | Catálogo demonstrativo, busca textual, filtros por categoria e detalhes do evento. |
| Inscrição | Nome, e-mail e CPF fictícios, quantidade, categoria de ingresso, cupom opcional e resumo de valores. |
| Ingressos | Consulta das inscrições mantidas em memória na mesma instância da aplicação. |
| Contato | Nome e e-mail fictícios, seleção de assunto, mensagem e prévia local. |
| Navegação | Eventos, Meus Ingressos e Contato por fragmentos de URL, com adaptação para telas menores. |
| Catálogo remoto | Leitura opcional da tabela `sqa_events` no Supabase. A mesma aplicação possui catálogo local de referência. |
| Execução | Frontend React/TypeScript, build estático Vite e hospedagem compatível, incluindo Vercel. |

### O que significa sessão neste laboratório

“Sessão” é a vida da instância da aplicação carregada em uma aba, **não uma sessão de usuário autenticado**. A navegação interna entre seções preserva os ingressos dessa instância. Recarregar ou fechar a página elimina os registros em memória. Outra aba ou outro dispositivo não compartilha os ingressos. Não se promete armazenamento em `localStorage`, `sessionStorage` ou banco de dados para inscrições.

O formulário de contato tem estado próprio e transitório. Sua prévia não representa uma caixa de entrada, um chamado ou um histórico persistente. Não confunda o catálogo remoto com persistência dos formulários.

## 1.6 Fora do escopo

- Cadastro de contas, autenticação, recuperação de senha e perfis de acesso.
- Pagamento, estorno, nota fiscal, cobrança ou comprovação real de desconto.
- Reserva real de lugares, controle de lotação, lista de espera ou check-in.
- Persistência, sincronização, edição ou cancelamento de inscrições entre sessões.
- Envio de e-mail, SMS, mensagens de contato ou notificações.
- Painel administrativo e manutenção de eventos pela interface.
- Certificados, comprovantes oficiais, QR codes de validação e exportação de ingressos.
- Garantia de disponibilidade ou desempenho equivalente a um serviço de produção.

## 1.7 Premissas e dependências

1. O navegador precisa executar JavaScript. A instalação local de desenvolvimento requer Node.js e npm compatíveis com o projeto.
2. Todos os dados de preenchimento devem ser sintéticos. Valores monetários são uma simulação.
3. O catálogo é material didático. As datas não representam compromissos reais nem autorizam participação em eventos.
4. O catálogo remoto depende de configuração de build, rede e permissões de leitura; sua ausência não impede o uso do catálogo local.
5. O ambiente publicado pode corresponder a um build anterior ao código do GitHub. Registre URL, data e versão ao testar.
6. Esta edição documenta a referência de aceitação. Uma capacidade listada no escopo não equivale a conformidade já demonstrada em todos os cenários.

## 1.8 Evoluções futuras, sem compromisso de entrega

Possibilidades para outro projeto incluem contas de usuário, backend de inscrições, controle de capacidade, comunicação real, edição/cancelamento e administração do catálogo. A adoção dessas funções exigiria novos requisitos de autorização, privacidade, retenção, auditoria e operação. Elas não devem ser cobradas como funcionalidades da edição atual.

