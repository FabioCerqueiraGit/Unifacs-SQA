# 7. Diagramas de fluxos e estados

[Índice](README.md) · [Anterior: dados](06-modelo-de-dados.md) · [Próximo: testes](08-testes-e-rastreabilidade.md)

Os diagramas 7.1, 7.3, 7.4 e 7.5 descrevem comportamento esperado do escopo atual. O diagrama 7.2 representa o fluxo técnico de leitura do catálogo na base consultada. Nenhum diagrama comprova, por si só, aprovação de testes.

## 7.1 Atividade: inscrição demonstrativa

```mermaid
flowchart TD
    A(["Início"]) --> B["Consultar agenda"]
    B --> C["Escolher evento e abrir detalhes"]
    C --> D{"Prosseguir com inscrição?"}
    D -->|"Não"| X["Fechar diálogo sem criar registro"]
    X --> Z(["Fim"])
    D -->|"Sim"| E["Preencher dados sintéticos, quantidade e categoria"]
    E --> F["Revisar resumo e aplicar cupom opcional"]
    F --> G["Acionar Finalizar inscrição"]
    G --> H{"Dados e valores válidos?"}
    H -->|"Não"| I["Informar correção necessária"]
    I --> E
    H -->|"Sim"| J["Criar uma inscrição em memória"]
    J --> K["Consultar registro em Meus Ingressos"]
    K --> Z
```

A criação acontece após a validação. A consulta em Meus Ingressos é uma ação disponível após a conclusão, não uma promessa de redirecionamento automático. Fechar sem concluir não cria registro. Este fluxo relaciona UC-03, UC-04, UC-05, UC-06 e UC-10.

## 7.2 Sequência: resolução do catálogo

```mermaid
sequenceDiagram
    participant App as Aplicação
    participant Loader as Carregador de catálogo
    participant Local as Catálogo local
    participant Remote as Supabase REST
    App->>Local: Carregar base incorporada
    Local-->>App: Eventos locais
    App->>Loader: Solicitar catálogo
    alt Configuração remota ausente ou inadequada
        Loader-->>App: Utilizar eventos locais
    else Configuração remota válida
        Loader->>Remote: GET de sqa_events
        alt Resposta compatível e não vazia
            Remote-->>Loader: Lista JSON de eventos
            Loader-->>App: Utilizar eventos remotos
        else Falha, resposta vazia ou incompatível
            Loader-->>App: Utilizar eventos locais
        end
    end
    Note over App,Remote: Não há envio de dados de inscrição nem escrita de eventos
```

O catálogo local já permite apresentar a agenda durante a leitura. A substituição ocorre somente quando o resultado remoto é utilizável. A leitura pendente pode ser cancelada com o encerramento da instância, sem atualizar uma instância já desmontada.

## 7.3 Sequência esperada: criação e consulta de inscrição

```mermaid
sequenceDiagram
    actor Pessoa as Participante
    participant Form as Formulário
    participant Domain as Validação e cálculo
    participant App as Estado da aplicação
    participant List as Meus Ingressos
    Pessoa->>Form: Informar dados sintéticos e opções
    Form->>Domain: Calcular resumo
    Domain-->>Form: Subtotal, desconto e total
    Pessoa->>Form: Finalizar inscrição
    Form->>Domain: Validar conclusão
    alt Conclusão válida
        Domain-->>Form: Dados e valores aceitos
        Form->>App: Adicionar uma inscrição identificada
        Pessoa->>List: Abrir Meus Ingressos
        App-->>List: Inscrições da instância atual
        List-->>Pessoa: Apresentar registro demonstrativo
    else Conclusão inválida
        Domain-->>Form: Correções necessárias
        Form-->>Pessoa: Orientar sem criar registro
    end
    Note over Form,List: Sem pagamento, persistência remota ou envio de e-mail
```

“Validação e cálculo” representa uma responsabilidade lógica, não um servidor ou módulo adicional já existente. A aplicação continua sendo executada no navegador.

## 7.4 Estados: vida das inscrições

```mermaid
stateDiagram-v2
    [*] --> SemInscricoes: Carregar aplicação
    SemInscricoes --> SemInscricoes: Navegar ou cancelar preenchimento
    SemInscricoes --> ComInscricoes: Concluir inscrição válida
    ComInscricoes --> ComInscricoes: Navegar ou consultar registros
    ComInscricoes --> ComInscricoes: Concluir nova inscrição deliberada
    SemInscricoes --> Encerrada: Fechar ou recarregar página
    ComInscricoes --> Encerrada: Fechar ou recarregar página
    Encerrada --> [*]
```

Recarregar cria uma nova instância, que inicia em SemInscricoes. O encerramento não é um cancelamento comercial nem conserva dados para recuperação. O diagrama descreve o estado da coleção da aplicação, não os estados de um pagamento.

## 7.5 Mapa de navegação e interação

```mermaid
flowchart LR
    Inicio["URL sem fragmento ou desconhecido"] --> Eventos["Eventos\n#eventos"]
    Eventos <-->|"Navegação"| Ingressos["Meus Ingressos\n#ingressos"]
    Eventos <-->|"Navegação"| Contato["Contato\n#contato"]
    Ingressos <-->|"Navegação"| Contato
    Eventos -->|"Selecionar evento"| Modal["Diálogo de detalhes e inscrição"]
    Modal -->|"Fechar sem navegar"| Eventos
    Contato -->|"Submeter simulação"| Previa["Prévia local isolada"]
```

O diálogo não possui rota própria no escopo atual. A prévia faz parte da seção Contato. Voltar e Avançar devem acompanhar o histórico de fragmentos, e a navegação não deve conservar sobreposições incompatíveis com a seção atual. Esses comportamentos devem ser avaliados em conjunto com o foco de teclado e o menu móvel.

