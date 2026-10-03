// Ponto de entrada (composition root): é o ÚNICO lugar que conhece todos os módulos.
// Ele busca os elementos do DOM, liga as peças e define como elas conversam.

import { iniciarMenu } from './menu.js';
import { iniciarSubmenu } from './submenu.js';
import { iniciarNavegacao } from './navegacao.js';
import { iniciarGaleria } from './galeria.js';
import { iniciarFormulario } from './formulario.js';
import { iniciarRascunho } from './rascunho.js';
import { iniciarModal } from './modal.js';
import { dadosGaleria } from './dados/galeria-dados.js';

const CHAVE_RASCUNHO = 'rascunhoCadastroTC';
const CHAVE_TERMOS = 'termosAceitosTC';

// Menu hambúrguer e submenu
const menu = iniciarMenu(
    document.querySelector('.menu-hamburguer'),
    document.querySelector('.menu')
);
const submenu = iniciarSubmenu(document.querySelector('.dropdown'));

// Modal de termos
const modalTermos = iniciarModal({
    modal: document.getElementById('modal-termos'),
    botaoFechar: document.getElementById('btn-fechar'),
    chave: CHAVE_TERMOS
});

// Navegação entre seções: ao navegar, fecha menu e submenu;
// ao chegar no cadastro, abre o modal de termos (se ainda não foi aceito)
iniciarNavegacao({
    links: document.querySelectorAll('.nav-link'),
    linksPrincipais: document.querySelectorAll('.menu > li > .nav-link'),
    secoes: document.querySelectorAll('.view-section'),
    sufixoTitulo: 'Teoria das Cordas',
    aoNavegar: (idSecao) => {
        menu.fechar();
        submenu.fechar();

        if (idSecao === 'secao-cadastro') {
            modalTermos.abrirSeNecessario();
        }
    }
});

// Galeria de fotos
iniciarGaleria(document.getElementById('galeria-container'), dadosGaleria);

// Cadastro: o rascunho é salvo enquanto digita e limpo quando o envio é válido
const formCadastro = document.getElementById('meu-formulario');
const rascunho = iniciarRascunho({
    formulario: formCadastro,
    chave: CHAVE_RASCUNHO,
    ignorar: ['cpf']
});

iniciarFormulario({
    formulario: formCadastro,
    aviso: document.getElementById('mensagem-sucesso'),
    aoEnviarComSucesso: rascunho.limpar
});
