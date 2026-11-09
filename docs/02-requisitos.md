# 2. Requisitos funcionais e não funcionais

[Índice](README.md) · [Anterior: visão](01-visao-objetivos-escopo.md) · [Próximo: regras de negócio](03-regras-de-negocio.md)

## 2.1 Convenções de leitura

Os requisitos abaixo definem **comportamento esperado**, não resultados já verificados. Todos se referem ao escopo acadêmico da edição atual. O aluno deve produzir seus próprios casos de teste e registrar o resultado real sem modificar a referência para ajustá-la ao comportamento observado.

Prioridades: **Essencial** sustenta um fluxo principal ou um limite de segurança; **Importante** apoia sua compreensão e utilização. A prioridade não é uma nota nem a severidade automática de uma ocorrência.

## 2.2 Requisitos funcionais

| ID | Requisito | Critério de aceitação | Prioridade |
| --- | --- | --- | --- |
| RF-01 | O sistema deve disponibilizar navegação entre Eventos, Meus Ingressos e Contato. | Cada opção abre a seção correspondente, indica a seleção atual e mantém a URL coerente. | Essencial |
| RF-02 | O sistema deve apresentar os eventos do catálogo disponível. | Cada cartão identifica título, categoria, data resumida, horário, local e preço de referência. | Essencial |
| RF-03 | O sistema deve filtrar o catálogo por categoria. | “Todos” remove a restrição de categoria; as demais opções exibem somente eventos da categoria selecionada. | Essencial |
| RF-04 | O sistema deve pesquisar eventos por texto. | A busca considera título, local e categoria e não distingue maiúsculas de minúsculas. | Essencial |
| RF-05 | O sistema deve combinar busca e categoria e permitir recuperar a listagem completa. | Os critérios são aplicados juntos; ausência de resultados é informada e a ação de limpar restaura todos os eventos. | Importante |
| RF-06 | O sistema deve apresentar detalhes do evento selecionado. | O diálogo identifica o evento e mostra descrição, programação, data, horário e local antes da inscrição. | Essencial |
| RF-07 | O sistema deve permitir abrir e fechar o diálogo de inscrição. | Fechar ou cancelar não cria inscrição e devolve o usuário à interface utilizável, sem bloqueio residual. | Essencial |
| RF-08 | O sistema deve coletar os dados da inscrição demonstrativa. | Nome, e-mail, CPF e quantidade são obrigatórios; categoria possui opção inicial e cupom é opcional. | Essencial |
| RF-09 | O sistema deve validar os dados antes de concluir uma inscrição. | Entradas que não atendam às RN-05 e RN-06 não geram registro; a orientação permite corrigir o preenchimento. | Essencial |
| RF-10 | O sistema deve permitir selecionar a categoria de ingresso. | Inteira, Estudante e Comunidade aplicam os fatores definidos em RN-07. | Essencial |
| RF-11 | O sistema deve apresentar resumo de valores atualizado. | Alterações válidas de quantidade, categoria ou cupom aplicado refletem subtotal, desconto e total conforme RN-08 e RN-09. | Essencial |
| RF-12 | O sistema deve permitir aplicar um cupom opcional. | O comando Aplicar informa aceitação ou rejeição e atualiza o cálculo conforme RN-09, sem concluir a inscrição. | Importante |
| RF-13 | O sistema deve gerar um ingresso demonstrativo para uma conclusão válida. | Uma conclusão cria um registro identificável, associado ao evento e aos dados e valores daquela inscrição, conforme RN-10. | Essencial |
| RF-14 | O sistema deve listar as inscrições da instância atual em Meus Ingressos. | A lista apresenta evento, data resumida, horário, local, nome fictício, categoria, quantidade, total e código demonstrativo. | Essencial |
| RF-15 | O sistema deve informar a ausência de inscrições e o limite de duração dos registros. | A lista vazia oferece retorno à agenda; o usuário é informado de que os registros são temporários. | Importante |
| RF-16 | O sistema deve disponibilizar um formulário de contato demonstrativo. | Nome, e-mail, assunto e mensagem são apresentados; nome, e-mail e mensagem têm preenchimento obrigatório. | Importante |
| RF-17 | O sistema deve apresentar localmente a mensagem submetida no contato. | A ação usa uma prévia isolada, respeita RN-13 e não envia dados a terceiros. | Essencial |
| RF-18 | O sistema deve disponibilizar o catálogo local e permitir leitura remota quando configurada. | A configuração válida permite consultar `sqa_events`; indisponibilidade ou resposta inadequada mantém a alternativa local, conforme RN-15. | Essencial |
| RF-19 | O sistema deve adaptar os controles de navegação ao espaço disponível. | Em tela pequena, o menu pode ser aberto e fechado, e a seleção leva à seção solicitada. | Importante |
| RF-20 | O sistema deve preservar a coerência da navegação por fragmentos e histórico do navegador. | Acesso direto, Voltar e Avançar levam à seção indicada sem manter um diálogo incompatível com a página. | Importante |
| RF-21 | O sistema deve informar a natureza demonstrativa da experiência. | Os avisos deixam claro o uso de dados fictícios, a ausência de cobrança e a inexistência de envio real no contato. | Essencial |

## 2.3 Requisitos não funcionais

Estes critérios são referências de avaliação do laboratório. Não representam certificação de acessibilidade, auditoria de segurança ou SLA contratado.

| ID | Atributo e requisito | Como verificar | Prioridade |
| --- | --- | --- | --- |
| RNF-01 | **Usabilidade:** rótulos, ações e respostas devem ser compreensíveis em português brasileiro. | Revisar nomes de campos, obrigatoriedade, estados vazios, mensagens e consistência dos termos. | Importante |
| RNF-02 | **Responsividade:** os fluxos principais devem permanecer utilizáveis em telas de 360, 768 e 1280 pixels de largura. | Executar navegação, formulário e consulta de ingressos sem campos inacessíveis, sobreposição impeditiva ou rolagem horizontal estrutural. | Essencial |
| RNF-03 | **Acessibilidade:** os fluxos devem ser operáveis por teclado, com foco visível, nomes acessíveis e leitura coerente. | Avaliar Tab, Shift+Tab, Enter e Escape; rótulos; ordem de foco; abertura/fechamento do diálogo; contraste e zoom de 200%. Usar WCAG 2.2 nível AA como referência de avaliação, sem presumir conformidade integral. | Essencial |
| RNF-04 | **Robustez:** entradas inválidas ou extensas não devem interromper a aplicação. | Variar formatos e comprimentos com dados sintéticos; verificar orientação, preservação da navegação e possibilidade de correção. | Essencial |
| RNF-05 | **Integridade:** os dados e valores da inscrição devem permanecer coerentes entre formulário, resumo e ingresso. | Comparar uma mesma conclusão nos três pontos e observar ações interrompidas ou repetidas. | Essencial |
| RNF-06 | **Privacidade:** inscrições e mensagens devem permanecer locais, sem persistência de dados pessoais ou transmissão a um backend de negócio. | Inspecionar o escopo de estado e as requisições, usando apenas dados sintéticos. Distinguir requisições normais de hospedagem/leitura do catálogo de envio de conteúdo de formulário. | Essencial |
| RNF-07 | **Isolamento:** a prévia do contato não deve comprometer o documento principal nem acessar serviços externos. | Inspecionar sandbox e política de conteúdo; verificar isolamento de origem, bloqueio de rede, formulários e navegação externa a partir da prévia no ambiente autorizado. | Essencial |
| RNF-08 | **Resiliência do catálogo:** a indisponibilidade da fonte remota não deve inutilizar a agenda local. | Em ambiente controlado, observar configuração ausente, falha de leitura e resposta incompatível, sem alterar o serviço compartilhado. | Essencial |
| RNF-09 | **Compatibilidade:** os fluxos principais devem funcionar nas versões estáveis de Chrome/Edge, Firefox e Safari adotadas pela turma. | Registrar navegador, versão, sistema e dispositivo, comparando os mesmos cenários. A matriz efetivamente executada deve constar no relatório. | Importante |
| RNF-10 | **Segurança de configuração:** o frontend deve operar apenas com acesso público de leitura ao catálogo. | Não publicar segredos; verificar políticas de leitura e ausência de gravações pelo cliente. A configuração deve usar HTTPS para a integração. | Essencial |
| RNF-11 | **Desempenho percebido:** busca, filtros e abertura de detalhes devem responder sem bloqueio perceptível no catálogo de referência. | Meta de laboratório: resposta visível em até 1 segundo após a ação, com a aplicação carregada. Fazer 5 medições no mesmo ambiente e registrar todas, sem confundir essa meta com tempo de rede ou SLA. | Importante |
| RNF-12 | **Manutenibilidade:** o código deve permanecer tipado, organizado por responsabilidade e com comandos de verificação reproduzíveis. | Executar os scripts de tipos, testes e build e registrar versão do Node.js e commit. Documentar qualquer etapa não executada. | Importante |
| RNF-13 | **Reprodutibilidade:** as evidências devem identificar ambiente, dados sintéticos, versão, passos e resultados. | Outra pessoa deve conseguir repetir o cenário sem depender da memória do autor ou de dados privados. | Essencial |
| RNF-14 | **Localização:** datas, textos e valores devem ser apresentados de forma consistente para o público brasileiro. | Conferir moeda BRL, casas decimais, nomes das categorias e correspondência entre data do catálogo e apresentação. | Importante |

## 2.4 Decisões que não devem ser presumidas

Não há limite comercial de capacidade, limite máximo de ingressos por pessoa ou prova real de elegibilidade definidos nesta edição. Não invente essas restrições no relatório. Para limites técnicos ainda não definidos, registre a necessidade de esclarecimento em vez de afirmar uma violação.

Os pontos de avaliação de responsividade e desempenho acima são critérios desta documentação para organizar o laboratório, não medições de produção. Antes de transformar o exercício em um serviço real, os requisitos precisariam ser negociados e ampliados.

