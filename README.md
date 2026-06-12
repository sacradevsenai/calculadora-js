# 🧮 Calculadora Web Vanilla JS

Uma aplicação de calculadora minimalista construída com tecnologias web puras (HTML5, CSS3 Grid/Flexbox e JavaScript Vanilla). O projeto foca em uma interface responsiva com tema escuro (Dark Mode) e na reprodução fiel dos fluxos lógicos e matemáticos de uma calculadora física de mesa.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estruturação semântica dos blocos de controle e visor.
* **CSS3 (Modern Design):** Uso de **CSS Grid** para a malha de botões, **Flexbox** para o visor, variáveis nativas (`:root`) para gerenciamento de paleta de cores (JetBrains theme) e pseudo-classes para feedback ativo de cliques.
* **JavaScript (ES6+):** Manipulação dinâmica de DOM, delegação de eventos em árvore e persistência lógica de estados de memória (`variavelA`, `variavelB` e `operacao`).

---

## 🧠 Relato de Aprendizado & Desafios com o DOM

A construção desta calculadora trouxe aprendizados profundos sobre o desenvolvimento através do **aprendizado ativo**. Abaixo estão pontuados os principais marcos e superações conceituais deste projeto:

### 1. A Barreira Inicial da Compreensão do DOM
No início do aprendizado prático, a manipulação do DOM pode parecer intimidadora e abstrata. Entender que o HTML renderizado é uma árvore viva que o JavaScript lê e altera em tempo real exige uma mudança de mentalidade. 
* **O Desafio:** Associar funções de cálculo a disparos assíncronos gerados pelo usuário, lidando com variáveis de escopo que mudam de valor a cada clique, frequentemente gerava "nós lógicos" e árvores de decisão (`if/else`) redundantes ou mal estruturadas (como aninhar capturas dentro de escopos errados).
* **A Virada de Chave (O Padrão Natural):** Uma vez compreendido o ecossistema de eventos — como o uso da **Delegação de Eventos** anexando um único *Event Listener* no `container` pai e filtrando cliques fantasmas com `e.target.tagName !== 'BUTTON'` —, a estrutura clareou. O padrão se tornou previsível: o DOM entrega a entrada do usuário, o motor lógico processa os estados em memória e devolve a resposta visual atualizando o `textContent`. Compreendido esse fluxo, a aplicação de novas lógicas torna-se orgânica e natural.

### 2. A Complexidade Escondida da Porcentagem (`%`)
O maior desafio lógico do projeto foi decodificar o comportamento do botão `%`. Engenheiros iniciantes tendem a tratar a porcentagem como um operador aritmético binário linear comum (como `+` ou `-`), o que se provou um erro de escopo.
A validação prática e os testes de mesa revelaram que a porcentagem é um modificador de estado camaleônico:
* **Sem Operação Pendente:** Funciona como conversor fracionário simples ($50 \rightarrow 0.5$).
* **Com Operação de Soma/Subtração (`+`, `-`):** Age calculando um valor absoluto proporcional ao primeiro número guardado ($200 + 10\% \rightarrow 10\%$ de $200 = 20$).
* **Com Operação de Multiplicação/Divisão (`*`, `/`):** Age aplicando diretamente a taxa decimal correspondente ($200 \times 5\% \rightarrow 200 \times 0.05 = 10$).

A quebra minuciosa dessas condições e a unificação das operações normais dentro de uma estrutura limpa de `switch` purificaram o código, eliminando redundâncias e "gambiarras" de reaproveitamento de variáveis textuais.

---

## 🚀 Funcionalidades Implementadas

* **Delegação de Eventos Otimizada:** Apenas um escutador de clique gerencia a calculadora inteira.
* **Sanitização Decimal Inteligente:** Função `paraNumero()` que converte automaticamente strings com vírgula (padrão visual brasileiro `,`) em pontos (`.`) para que operações flutuantes com `parseFloat()` ocorram sem erros de coerção (`NaN`).
* **Bloqueio de Ponto Repetido:** Validação via `.includes(',')` impedindo que o usuário digite múltiplos separadores decimais em um mesmo número.
* **Tratamento de Divisão por Zero:** Interrupção controlada retornando `Erro` no display caso ocorra tentativa de divisão por `0`, limpando a memória imediatamente para evitar travamentos do sistema (`Infinity`).
* **Backspace Funcional (`⬅️`):** Permite a correção de dígitos em tempo real utilizando tratamento de string com `.slice(0, -1)`.

---

## 📂 Estrutura de Arquivos

```text
├── index.html   # Estrutura e mapeamento dos botões da interface
├── styles.css   # Identidade visual, responsividade e variáveis de cor
└── script.js    # Motor lógico, tratamento do DOM e validações matemáticas
```

## 🚀 Como Rodar o Projeto

* Faça o clone ou baixe os arquivos deste repositório.
* Abra o arquivo index.html diretamente em qualquer navegador moderno, ou
* utilize a extensão Live Server no VS Code para rodar localmente.