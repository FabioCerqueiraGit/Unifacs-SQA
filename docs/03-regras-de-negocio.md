# 3. Regras de negócio

[Índice](README.md) · [Anterior: requisitos](02-requisitos.md) · [Próximo: casos de uso](04-casos-de-uso.md)

Estas regras definem a referência de comportamento esperado para o exercício. Elas não informam o resultado da execução da aplicação.

## 3.1 Natureza e catálogo

| ID | Regra |
| --- | --- |
| RN-01 | O sistema tem finalidade exclusivamente acadêmica. Eventos, inscrições, preços e mensagens são demonstrativos, sem cobrança, reserva real ou vínculo institucional. |
| RN-02 | O preenchimento e as evidências devem utilizar somente dados sintéticos. Não é permitida a inclusão de dados pessoais reais no exercício. |
| RN-03 | Um evento deve ser identificado de forma única no catálogo e possuir título, categoria, data, horário, local, preço base não negativo, descrição e programação. O preço base corresponde à categoria Inteira, por ingresso. |
| RN-04 | A busca considera título, local e categoria, sem distinção de maiúsculas e minúsculas. Categoria e texto são condições cumulativas. Texto vazio não restringe a busca, e “Todos” não restringe a categoria. A pesquisa não promete correção ortográfica nem equivalência entre palavras com e sem acentos. |

## 3.2 Dados de inscrição

### RN-05 · Identificação demonstrativa

Nome, e-mail e CPF são obrigatórios. Nome não pode consistir somente em espaços; deve representar uma identificação fictícia legível. E-mail deve ter formato sintaticamente válido, sem exigir entrega de mensagem nem verificação de propriedade.

Para o CPF de teste, a referência é uma sequência de 11 dígitos com dígitos verificadores consistentes, admitindo entrada sem pontuação ou no formato usual com pontos e hífen. Sequências de um mesmo dígito não são válidas. A verificação é apenas sintática/matemática e não consulta órgão público nem comprova identidade. Um número matematicamente válido não é garantia de não pertencer a alguém: use a massa sintética controlada indicada pelo docente.

Os dados não devem ser submetidos a serviços externos de validação. Não existe autenticação de participante nesta edição.

### RN-06 · Quantidade

A quantidade deve ser um número inteiro positivo, com valor inicial de 1. Um registro representa uma inscrição que pode conter mais de um ingresso da mesma categoria. Valores vazios, não numéricos, fracionários ou não positivos não satisfazem essa regra. Não há limite máximo comercial definido nesta edição; a capacidade técnica deve ser tratada com robustez, sem criar um limite de negócio arbitrário.

## 3.3 Valores e descontos

### RN-07 · Categorias de ingresso

| Categoria | Fator sobre o preço base | Interpretação |
| --- | --- | --- |
| Inteira | 1,00 | 100% do preço base. |
| Estudante | 0,50 | 50% do preço base. |
| Comunidade | 0,80 | 80% do preço base. |

Inteira é a opção inicial. A categoria de ingresso é diferente da categoria temática do evento, como Tecnologia ou Cultura. A elegibilidade é simulada, sem envio de comprovantes.

### RN-08 · Composição do total

O cálculo esperado segue a ordem:

1. `subtotal = preço base × quantidade × fator da categoria`.
2. Calcular o desconto do cupom sobre esse subtotal, quando um cupom válido estiver aplicado.
3. `total = subtotal − desconto`.

Os valores devem ser apresentados em reais, com duas casas decimais e formatação brasileira. Para a referência de comparação, primeiro arredonde o subtotal a centavos; calcule o desconto sobre esse subtotal já arredondado e arredonde o desconto também a centavos. Nos empates de meio centavo, arredonde para cima (regra comercial para valores não negativos). O total é a diferença entre os dois valores em centavos. O total não pode ficar negativo. Não existem taxas, frete ou encargos adicionais nesta edição.

O “a partir de” apresentado no cartão representa o menor preço unitário entre as categorias de ingresso, sem cupom. O preço não comprova compra nem gera obrigação financeira.

### RN-09 · Cupom demonstrativo

O cupom **UNIFACS10** concede **10% de desconto sobre o subtotal já ajustado pela categoria e quantidade**. A leitura desconsidera diferenças entre maiúsculas e minúsculas e espaços nas extremidades. O desconto só passa a compor o resumo após o comando **Aplicar**; apenas editar o campo não constitui uma nova aplicação.

Cupom vazio ou desconhecido não concede desconto. Aplicações sucessivas substituem a tentativa anterior, sem acumular descontos. Aplicar um cupom não conclui a inscrição. O código é uma regra pública da simulação, não uma credencial.

## 3.4 Inscrições e sessão

| ID | Regra |
| --- | --- |
| RN-10 | Uma conclusão válida deve criar exatamente uma inscrição identificável com o evento selecionado, os dados fictícios, a quantidade, a categoria, o total calculado e a data/hora de criação. Repetição involuntária da mesma ação não deve produzir duplicação acidental. Uma nova inscrição deliberada é outra operação. |
| RN-11 | O registro deve representar os dados e valores do momento de sua criação. O contador de Meus Ingressos informa o número de inscrições, não a soma de todas as quantidades. Cada inscrição deve informar separadamente sua quantidade. |
| RN-12 | As inscrições existem apenas na instância atual da aplicação. Navegação interna não deve removê-las. Recarregar ou fechar a página encerra essa instância; não há recuperação, sincronização entre abas ou consulta por identidade. Fechar um formulário sem concluir não cria inscrição. |

Não existe restrição geral de “uma inscrição por CPF” ou mecanismo de comparação entre usuários nesta edição. A proteção contra repetição involuntária de uma ação não deve ser confundida com proibição de novas inscrições.

## 3.5 Contato e infraestrutura

| ID | Regra |
| --- | --- |
| RN-13 | O contato é uma simulação local. Nome e e-mail fictícios e mensagem são obrigatórios; o e-mail deve ter formato válido. O assunto é escolhido entre as opções da interface. A mensagem deve ser apresentada em uma prévia isolada, sem envio a terceiros, abertura de chamado ou confirmação de recebimento por uma equipe. |
| RN-14 | O conteúdo da prévia não deve alterar a aplicação principal, acessar seus dados ou realizar comunicação externa. O isolamento e as políticas de conteúdo devem ser preservados durante o exercício. |
| RN-15 | O catálogo local é a base de funcionamento. Quando houver configuração remota válida e leitura bem-sucedida de uma lista não vazia compatível com o contrato, a aplicação pode usar o catálogo remoto. Configuração ausente, resposta vazia/incompatível ou falha de leitura deve levar ao catálogo local. O cliente consulta, mas não cria, altera ou remove eventos remotos. |
| RN-16 | A navegação usa `#eventos`, `#ingressos` e `#contato`. Um fragmento vazio ou não reconhecido corresponde à seção Eventos. Os caminhos não identificam contas, compras ou sessões autenticadas. |

## 3.6 Pontos que exigem nova definição de produto

Política de cancelamento, reembolso, retenção permanente, capacidade de eventos, limite por pessoa, termos contratuais e validação real de benefícios não existem neste escopo. Não use convenções de uma loja real para criar regras adicionais. Alterações devem ser acordadas e versionadas antes de servir como referência de avaliação.
