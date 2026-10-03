# ONG Teoria das Cordas

Site institucional da ONG **Teoria das Cordas**, organização que usa a música para transformar a vida de crianças e adolescentes em situação de vulnerabilidade social. O site apresenta a ONG, seus projetos e permite o cadastro de voluntários.

O projeto é uma página única (SPA) feita com **HTML, CSS e JavaScript puro**, sem frameworks nem dependências externas. O JavaScript é organizado em **módulos ES6**.

## Funcionalidades

- **Navegação entre seções** (Início, Projetos e Cadastro) sem recarregar a página
- **Menu responsivo** com botão hambúrguer em telas pequenas e submenu em *dropdown*, acessível por mouse e teclado
- **Galeria de fotos** gerada dinamicamente a partir de uma lista de dados
- **Formulário de cadastro de voluntários** com validação nativa do HTML5 e aviso de sucesso
- **Rascunho automático:** os dados digitados são salvos no `localStorage` e restaurados ao recarregar a página. O CPF nunca é salvo
- **Modal de termos de compromisso** acessível (foco preso, fecha com Esc) que não volta a aparecer depois de aceito
- **Acessibilidade:** landmarks, hierarquia de títulos, atributos WAI-ARIA, mensagens de erro em texto e navegação completa por teclado

> O envio do cadastro é simulado no navegador. Não há back-end, e nenhum dado é enviado a um servidor.

## Estrutura do projeto

```
teoria-das-cordas/
├── index.html              # Estrutura e conteúdo das três seções
├── style.css               # Estilos e layout responsivo
├── README.md
├── img/                    # Logo, QR Code, ícones e fotos da galeria
└── js/
    ├── main.js             # Ponto de entrada: importa e conecta os módulos
    ├── menu.js             # Abre e fecha o menu hambúrguer (aria-expanded)
    ├── submenu.js          # Submenu "Projetos" por mouse e teclado
    ├── navegacao.js        # Alterna as seções da SPA, título da página, foco e aria-current
    ├── galeria.js          # Renderiza as imagens da galeria
    ├── formulario.js       # Valida o cadastro, mostra erros em texto e anuncia o sucesso
    ├── rascunho.js         # Salva e restaura o formulário no localStorage
    ├── modal.js            # Modal de termos: abre, prende o foco, fecha e lembra o aceite
    └── dados/
        └── galeria-dados.js  # Lista de fotos (src e alt)
```

## Arquitetura do JavaScript

Cada módulo tem uma única responsabilidade e recebe tudo de que precisa por parâmetro. Nenhum módulo de funcionalidade importa outro: apenas o `main.js` conhece todos e faz as ligações entre eles.

| Módulo | Responsabilidade | Exporta |
|---|---|---|
| `menu.js` | Menu hambúrguer | `iniciarMenu(botao, menu)` → `{ fechar }` |
| `submenu.js` | Submenu em dropdown | `iniciarSubmenu(dropdown)` → `{ fechar }` |
| `navegacao.js` | Navegação entre seções | `iniciarNavegacao({ links, linksPrincipais, secoes, aoNavegar, sufixoTitulo })` → `{ mostrarSecao }` |
| `galeria.js` | Renderização das fotos | `iniciarGaleria(container, imagens)` |
| `galeria-dados.js` | Dados da galeria | `dadosGaleria` |
| `formulario.js` | Validação e aviso de sucesso | `iniciarFormulario({ formulario, aviso, aoEnviarComSucesso })` |
| `rascunho.js` | Rascunho no `localStorage` | `iniciarRascunho({ formulario, chave, ignorar })` → `{ limpar }` |
| `modal.js` | Modal de termos | `iniciarModal({ modal, botaoFechar, chave })` → `{ abrir, fechar, abrirSeNecessario }` |

Os módulos se comunicam por **callbacks** configurados no `main.js`:

```
Clique em link → navegacao.js → aoNavegar(id)         → menu.fechar(), submenu.fechar()
                                                      → modal.abrirSeNecessario() (se for o cadastro)
Envio válido   → formulario.js → aoEnviarComSucesso() → rascunho.limpar()
```

## Como executar

Os módulos ES6 **não funcionam ao abrir o `index.html` com duplo clique** (endereço `file://`), porque o navegador bloqueia o `import` por segurança. É preciso servir os arquivos por HTTP.

### Pré-requisitos

- Um navegador moderno (Chrome, Edge, Firefox ou Safari)
- Uma das opções de servidor local abaixo

### Opção 1: Python

Dentro da pasta do projeto:

```bash
python -m http.server 8000
```

Acesse **http://localhost:8000**. Em alguns sistemas o comando é `python3`.

### Opção 2: VS Code com Live Server

1. Instale a extensão **Live Server**
2. Abra a pasta do projeto no VS Code
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**

### Opção 3: Node.js

```bash
npx serve
```

O endereço aparece no terminal.

### Verificação rápida

Com o site aberto, pressione **F12** e abra a aba **Console**. Se não houver mensagens em vermelho, o JavaScript carregou. Um erro de **CORS** indica que o site foi aberto sem servidor.

## Acessibilidade

O projeto segue as diretrizes WCAG e pode ser usado por teclado e leitores de tela.

**Estrutura semântica**
- Landmarks `<header>`, `<nav aria-label>`, `<main>` e `<footer>`, este último fora do `<main>` para ser reconhecido como `contentinfo`
- Um único `<h1>` (visível apenas para leitores de tela) e hierarquia de títulos sem saltos
- `<fieldset>` e `<legend>` nos grupos do formulário, `<label>` em todos os campos e `autocomplete` nos dados pessoais
- Texto alternativo em todas as imagens

**WAI-ARIA**
- **Menu hambúrguer:** `aria-expanded`, `aria-controls` e `aria-label` atualizado ("Abrir menu" / "Fechar menu")
- **Submenu:** `aria-haspopup` e `aria-expanded` sincronizados; abre com foco ou seta para baixo e fecha com Esc
- **Modal:** `role="dialog"`, `aria-modal`, `aria-labelledby` e `aria-describedby`, com foco movido para o botão ao abrir, foco preso dentro do modal e foco devolvido ao fechar
- **Formulário:** `aria-invalid` e `aria-describedby` ligando cada campo à sua mensagem de erro em texto; o foco vai para o primeiro campo inválido
- **Aviso de sucesso:** região viva (`role="status"`), anunciada por leitores de tela
- **Navegação:** `aria-current="page"` no link ativo, título do documento atualizado e foco movido para o título da nova seção

**Visual**
- Indicador de foco visível (`:focus-visible`) em links, botões e campos
- Link em `:hover` com contraste superior a 4,5:1
- Erros e página atual indicados também por texto e sublinhado, e não apenas por cor

## Solução de problemas

| Sintoma | Causa provável | Como resolver |
|---|---|---|
| Menu, navegação e galeria não funcionam | Página aberta por `file://` | Usar um servidor local |
| Imagens não aparecem | Pasta `img/` ausente ou nomes diferentes | Conferir se `img/` está ao lado do `index.html` e se os nomes batem, inclusive maiúsculas e minúsculas |
| Modal de termos não reaparece | O aceite já está salvo | Apagar a chave `termosAceitosTC` em **F12 → Application → Local Storage** |
| Formulário volta preenchido | Rascunho salvo | Enviar o cadastro ou apagar a chave `rascunhoCadastroTC` |

## Convenções do projeto

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat`, `fix`, `refactor`, `docs`, `chore`)
- **Versionamento:** [Versionamento Semântico](https://semver.org/lang/pt-BR/) (`MAJOR.MINOR.PATCH`), com uma tag para cada release
- **Fluxo de trabalho:** issues vinculadas a milestones, uma branch por tarefa e pull requests com descrição

O histórico de versões está na aba **Releases** do repositório.

## Licença e contato

Projeto desenvolvido para a ONG Teoria das Cordas. Contato: contato@teoriadascordas.org.br
