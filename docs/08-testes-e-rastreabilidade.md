# 8. Guia de testes e rastreabilidade

[Índice](README.md) · [Anterior: fluxos](07-fluxos-e-estados.md)

## 8.1 Finalidade

Este guia orienta a elaboração de testes a partir da especificação. Ele não contém um conjunto de respostas, uma lista de ocorrências esperadas ou uma avaliação pronta. Cada equipe deve escolher sua massa sintética, detalhar os procedimentos, executar os cenários e registrar as evidências observadas.

Uma afirmação de conformidade precisa indicar qual requisito foi verificado, em qual versão, com quais dados e em qual ambiente. Um teste bem-sucedido não comprova todos os caminhos da funcionalidade.

## 8.2 Preparação do ambiente

1. Leia a visão e o escopo, distinguindo recursos atuais de evolução futura.
2. Registre commit/versão local ou URL e identificação do build publicado. Se não for possível identificar o commit do site, declare essa limitação.
3. Registre navegador, versão, sistema operacional, dispositivo, tamanho da tela, zoom e data/hora da execução.
4. Identifique se o ensaio utiliza catálogo local ou remoto. Não suponha a fonte apenas porque os eventos têm os mesmos títulos.
5. Separe dados sintéticos e preserve o isolamento do contato. Nunca use documentos, e-mails ou nomes de pessoas reais.
6. Defina o estado inicial: uma nova carga da aplicação começa sem inscrições; a navegação interna não equivale a reiniciar a aplicação.
7. Para ambiente local, execute as verificações disponíveis e registre individualmente se passaram, falharam ou não foram executadas.

```bash
npm ci
npm run typecheck
npm test
npm run build
```

Os testes existentes em `src/test/` verificam aspectos iniciais de navegação e catálogo. Eles não substituem testes dos requisitos, testes em navegadores reais ou avaliação manual de acessibilidade.

## 8.3 Estratégia recomendada

| Dimensão | Objetivo da avaliação | Abordagem |
| --- | --- | --- |
| Funcional | Verificar se cada fluxo cumpre sua finalidade. | Caminhos principais, alternativos, cancelamentos e transições entre seções. |
| Dados e cálculos | Verificar validação e consistência. | Partições de equivalência, combinações de fatores e limites definidos pela especificação. |
| Interação | Verificar sequências de ações. | Abrir, fechar, voltar, retomar, alterar opções e repetir ações de forma controlada. |
| Acessibilidade | Verificar acesso sem depender apenas de mouse ou percepção visual. | Teclado, foco, rótulos, contraste, zoom e leitura por tecnologia assistiva quando disponível. |
| Responsividade | Verificar os fluxos em diferentes dimensões. | Matriz de tamanhos definida em RNF-02, registrando o dispositivo utilizado. |
| Integração | Verificar a seleção da fonte de catálogo. | Simulação local controlada das condições de RN-15, sem modificar serviços compartilhados. |
| Privacidade e isolamento | Verificar os limites de dados e da prévia. | Inspeção autorizada de rede, armazenamento e restrições do documento isolado. |
| Regressão | Verificar efeitos de uma mudança autorizada. | Reexecutar cenários relacionados e fluxos dependentes, registrando o novo commit. |

Não gere grandes volumes de requisições contra a hospedagem ou o Supabase. Testes de carga, alterações de permissões, mutações de banco e avaliação de terceiros exigem autorização específica. Para a atividade comum, priorize testes locais e inspeções não destrutivas.

## 8.4 Matriz de rastreabilidade funcional

Esta matriz indica **cobertura a planejar**, não resultados de execução. A equipe deverá associar seus próprios identificadores CT aos itens.

| Objetivos | Requisitos | Regras | Casos de uso | Cobertura a planejar |
| --- | --- | --- | --- | --- |
| OE-08 | RF-01, RF-19, RF-20 | RN-12, RN-16 | UC-08 | Navegação principal e móvel, acesso direto, histórico, retorno e foco. |
| OE-01, OE-09 | RF-02, RF-18 | RN-03, RN-15 | UC-01, UC-09 | Catálogo local, leitura remota e alternativa local. |
| OE-02 | RF-03, RF-04, RF-05 | RN-04 | UC-02 | Critérios isolados e combinados, ausência de resultados e limpeza. |
| OE-03 | RF-06, RF-07 | RN-03, RN-12 | UC-03 | Dados do evento, abertura e fechamento do diálogo sem conclusão. |
| OE-04 | RF-08, RF-09 | RN-02, RN-05, RN-06 | UC-04 | Campos obrigatórios, formatos válidos/inválidos e correção. |
| OE-05 | RF-10, RF-11, RF-12 | RN-06, RN-07, RN-08, RN-09 | UC-04, UC-05, UC-10 | Categorias, quantidades, estado do cupom, composição e formatação de valores. |
| OE-04, OE-06 | RF-13, RF-14, RF-15 | RN-10, RN-11, RN-12 | UC-04, UC-06 | Conclusão, identidade do registro, consulta, estado vazio e ciclo de vida. |
| OE-07 | RF-16, RF-17 | RN-02, RN-13, RN-14 | UC-07 | Obrigatoriedade, assunto, mensagem, prévia e ausência de comunicação externa. |
| OE-04, OE-07 | RF-21 | RN-01, RN-02, RN-12, RN-13 | UC-04, UC-06, UC-07 | Compreensão do caráter demonstrativo, dos dados fictícios e da duração dos registros. |

## 8.5 Matriz de qualidade não funcional

| Requisitos | Objetivos relacionados | Evidência sugerida |
| --- | --- | --- |
| RNF-01, RNF-14 | OE-01, OE-05, OE-08 | Revisão de textos, moeda e datas com capturas sintéticas. |
| RNF-02, RNF-03, RNF-09 | OE-08 | Matriz de telas/navegadores e registro de interação por teclado. |
| RNF-04, RNF-05 | OE-04, OE-05, OE-06 | Sequência de preenchimento, correção, cálculo e consulta. |
| RNF-06, RNF-07, RNF-10 | OE-04, OE-07, OE-09 | Inspeção autorizada e redigida sem chaves, tokens ou dados reais. |
| RNF-08 | OE-09 | Registro da condição de leitura do catálogo e da alternativa utilizada. |
| RNF-11 | OE-02, OE-03, OE-08 | Cinco medições, ambiente, ação medida e observações. |
| RNF-12 | OE-10 | Comandos executados, versões, commit e saídas relevantes. |
| RNF-13 | OE-10 | Revisão da possibilidade de outra pessoa repetir o teste. |

## 8.6 Modelo de caso de teste

Copie esta estrutura para o local de entrega definido pelo docente. Não preencha “Aprovado” antes de executar.

| Campo | Conteúdo a registrar |
| --- | --- |
| Identificador | CT-XXX, único na suíte da equipe. |
| Título e objetivo | Uma finalidade clara e específica. |
| Referências | RF/RNF, RN e UC relacionados. |
| Versão e ambiente | Commit ou build, URL quando aplicável, navegador, sistema e tela. |
| Precondições | Página, estado da instância, fonte de catálogo e preparação necessária. |
| Dados | Massa sintética e critérios de seleção, sem informações reais. |
| Passos | Ações numeradas, precisas e reproduzíveis. |
| Resultado esperado | Derivado da especificação, antes da execução. |
| Resultado obtido | Descrição objetiva do que ocorreu. |
| Evidências | Capturas, gravação curta ou saída técnica pertinente, sem segredos. |
| Situação | Não executado, aprovado, reprovado ou bloqueado. |
| Ocorrência associada | Identificador do relato, se necessário. |

Uma ambiguidade de requisito deve ser registrada como necessidade de esclarecimento. Diferencie “não atende à regra definida” de “eu preferiria que funcionasse de outro modo”. Não trate uma evolução futura como falha do escopo atual.

## 8.7 Registrar uma ocorrência

Use o [template de relato de teste](../.github/ISSUE_TEMPLATE/relato-de-teste.yml), respeitando a forma de entrega estabelecida pelo docente. Inclua cenário, passos, esperado, obtido, evidências, ambiente e severidade sugerida. Acrescente a referência ao requisito e à versão testada.

Descreva primeiro o impacto observado. Não presuma a causa técnica sem investigação suficiente. Remova dados pessoais, chaves, cabeçalhos de autenticação e conteúdo de outras aplicações de capturas e logs.

### Severidade sugerida

| Nível | Referência de impacto |
| --- | --- |
| Crítica | Comprometimento grave de segurança/isolamento ou indisponibilidade ampla que impeça o uso seguro do exercício. |
| Alta | Fluxo principal inviabilizado ou integridade essencial comprometida sem alternativa razoável. |
| Média | Função parcialmente prejudicada, com alternativa de uso ou impacto limitado. |
| Baixa | Problema de apresentação ou clareza que não impeça o fluxo principal. |

Severidade expressa impacto; prioridade de correção depende do contexto. Uma classificação deve vir acompanhada da justificativa. Não faça exploração adicional de um risco fora do ambiente autorizado para aumentar a evidência.

## 8.8 Critérios de conclusão do trabalho de avaliação

- Requisitos do escopo escolhido possuem casos de teste identificados e rastreáveis.
- Resultados reais estão separados dos esperados e das hipóteses.
- Há cobertura de caminhos principais, alternativas, cancelamentos, repetição e ciclo de vida.
- Ambiente, versão e massa sintética estão registrados.
- Limites de cobertura e cenários não executados são declarados, com motivo.
- Ocorrências possuem evidência suficiente para reprodução, sem dados privados.
- O relatório não conclui “sistema sem problemas” apenas porque uma suíte pequena passou.

A aprovação da atividade e o formato final de entrega pertencem ao docente. Estes critérios organizam a qualidade do trabalho e não estabelecem uma rubrica de notas.

