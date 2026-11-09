# Documentação de software · UNIFACS Eventos SQA

Material de referência para o projeto A3 da UC Qualidade de Software. O sistema é uma aplicação acadêmica independente de consulta a eventos e simulação de inscrições. Os eventos, os ingressos e os valores são demonstrativos, sem vínculo institucional ou cobrança.

## Comece por aqui

| Ordem | Documento | O que você encontrará |
| --- | --- | --- |
| 1 | [Visão, objetivos e escopo](01-visao-objetivos-escopo.md) | Objetivo geral, objetivos específicos, público, limites e evolução futura. |
| 2 | [Requisitos](02-requisitos.md) | Requisitos funcionais e não funcionais com identificadores e critérios verificáveis. |
| 3 | [Regras de negócio](03-regras-de-negocio.md) | Cadastro demonstrativo, categorias, preços, cupom, inscrições e contato. |
| 4 | [Casos de uso](04-casos-de-uso.md) | Atores, diagrama e especificação dos fluxos principais e alternativos. |
| 5 | [Arquitetura e execução](05-arquitetura-e-execucao.md) | Componentes, integrações, publicação, configuração e limites técnicos. |
| 6 | [Modelo de dados](06-modelo-de-dados.md) | Modelo conceitual, modelo físico do catálogo e dicionário de dados. |
| 7 | [Fluxos e estados](07-fluxos-e-estados.md) | Diagramas de atividades, sequência, navegação e ciclo de vida. |
| 8 | [Guia de testes e rastreabilidade](08-testes-e-rastreabilidade.md) | Como planejar, executar, registrar evidências e relacionar testes aos requisitos. |

## Como interpretar esta documentação

- **Escopo atual:** funcionalidades e infraestrutura que fazem parte desta edição do laboratório.
- **Comportamento esperado:** contrato a ser usado como referência ao avaliar a aplicação. A palavra **deve** expressa um requisito, não um resultado de teste já aprovado.
- **Evolução futura:** ideia fora do escopo atual, sem compromisso de implementação.
- **Verificação:** comparação feita pelo aluno entre os resultados esperados e os obtidos, com evidências reproduzíveis.

Os requisitos não substituem a execução dos testes. Esta documentação não apresenta resultados de avaliação, soluções de exercício ou um inventário de problemas da aplicação.

### Convenções

| Prefixo | Significado |
| --- | --- |
| OE | Objetivo específico do sistema |
| RF | Requisito funcional |
| RNF | Requisito não funcional |
| RN | Regra de negócio |
| UC | Caso de uso |
| CT | Identificador sugerido para um caso de teste elaborado pelo aluno |

Os diagramas usam blocos Mermaid compatíveis com a visualização de arquivos Markdown no GitHub. Cada diagrama tem uma explicação textual para apoiar a leitura e a acessibilidade. O diagrama de casos de uso emprega elipses e associações em um fluxograma Mermaid, como representação conceitual, e não um formato de intercâmbio UML.

## Uso responsável

Use somente dados sintéticos. Não informe nomes, e-mails, documentos ou mensagens de pessoas reais. Os ingressos existem apenas na memória da instância da aplicação aberta na aba. Recarregar ou fechar a página encerra essa instância. O contato é uma simulação local e não envia mensagens.

Testes devem ocorrer no ambiente autorizado pelo docente. Não realize carga contra serviços compartilhados, alteração do catálogo remoto ou exploração de sistemas de terceiros sem autorização específica.

## Versão e fontes

- Documentação: **1.0**, de **9 de novembro de 2026**.
- Base técnica consultada: [commit 5a74e147](https://github.com/FabioCerqueiraGit/Unifacs-SQA/tree/5a74e1476f58846a3e44d96891cc3bd1315869fe).
- Fontes: [README do projeto](../README.md), [aplicação](../src/App.tsx), [domínio](../src/lib/events.ts), [catálogo](../src/lib/catalog.ts), [contato](../src/lib/contact.ts), [esquema SQL](../supabase/catalog.sql) e [configuração de dependências](../package.json).
- Mudanças de requisito devem atualizar a regra correspondente, os casos de uso, os diagramas e a matriz de rastreabilidade. Registre a versão usada em cada execução de testes.

