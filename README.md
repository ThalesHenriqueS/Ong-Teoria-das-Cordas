# ONG Teoria das Cordas

Site institucional da ONG **Teoria das Cordas**, organização que usa a música para transformar a vida de crianças e adolescentes em situação de vulnerabilidade social. O site apresenta a ONG, seus projetos e permite o cadastro de voluntários.

O projeto é uma página única (SPA) feita com **HTML, CSS e JavaScript puro**, sem frameworks nem dependências externas. O JavaScript é organizado em **módulos ES6**.

## Funcionalidades

- **Navegação entre seções** (Início, Projetos e Cadastro) sem recarregar a página
- **Menu responsivo** com botão hambúrguer em telas pequenas e submenu em *dropdown*
- **Galeria de fotos** gerada dinamicamente a partir de uma lista de dados
- **Formulário de cadastro de voluntários** com validação nativa do HTML5 e aviso de sucesso
- **Rascunho automático:** os dados digitados são salvos no `localStorage` e restaurados ao recarregar a página. O CPF nunca é salvo
- **Modal de termos de compromisso** que não volta a aparecer depois de aceito

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
    ├── menu.js             # Abre e fecha o menu hambúrguer
    ├── navegacao.js        # Alterna as seções da SPA
    ├── galeria.js          # Renderiza as imagens da galeria
    ├── formulario.js       # Valida o cadastro e exibe o aviso de sucesso
    ├── rascunho.js         # Salva e restaura o formulário no localStorage
    ├── modal.js            # Fecha o modal de termos e lembra o aceite
    └── dados/
        └── galeria-dados.js  # Lista de fotos (src e alt)
```

## Arquitetura do JavaScript

Cada módulo tem uma única responsabilidade e recebe tudo de que precisa por parâmetro. Nenhum módulo de funcionalidade importa outro: apenas o `main.js` conhece todos e faz as ligações entre eles.

| Módulo | Responsabilidade | Exporta |
|---|---|---|
| `menu.js` | Menu hambúrguer | `iniciarMenu(botao, menu)` → `{ fechar }` |
| `navegacao.js` | Navegação entre seções | `iniciarNavegacao({ links, secoes, aoNavegar })` → `{ mostrarSecao }` |
| `galeria.js` | Renderização das fotos | `iniciarGaleria(container, imagens)` |
| `galeria-dados.js` | Dados da galeria | `dadosGaleria` |
| `formulario.js` | Validação e aviso de sucesso | `iniciarFormulario({ formulario, aviso, aoEnviarComSucesso })` |
| `rascunho.js` | Rascunho no `localStorage` | `iniciarRascunho({ formulario, chave, ignorar })` → `{ limpar }` |
| `modal.js` | Modal de termos | `iniciarModal({ modal, botaoFechar, chave })` |

Os módulos se comunicam por **callbacks** configurados no `main.js`:

```
Clique em link → navegacao.js → aoNavegar()          → menu.fechar()
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
