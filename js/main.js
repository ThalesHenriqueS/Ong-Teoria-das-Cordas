// Ponto de entrada (composition root): é o ÚNICO lugar que conhece todos os módulos.
// Ele busca os elementos do DOM, liga as peças e define como elas conversam.

import { iniciarMenu } from './menu.js';
import { iniciarNavegacao } from './navegacao.js';
import { iniciarGaleria } from './galeria.js';
import { iniciarFormulario } from './formulario.js';
import { iniciarRascunho } from './rascunho.js';
import { iniciarModal } from './modal.js';
import { dadosGaleria } from './dados/galeria-dados.js';

const CHAVE_RASCUNHO = 'rascunhoCadastroTC';

// Menu hambúrguer
const menu = iniciarMenu(
    document.querySelector('.menu-hamburguer'),
    document.querySelector('.menu')
);

// Navegação entre seções: ao navegar, o menu fecha
iniciarNavegacao({
    links: document.querySelectorAll('.nav-link'),
    secoes: document.querySelectorAll('.view-section'),
    aoNavegar: menu.fechar
});

// Galeria de fotos
iniciarGaleria(document.getElementById('galeria-container'), dadosGaleria);

// Cadastro: o rascunho é salvo enquanto digita e limpo quando o envio é válido
const formCadastro = document.getElementById('meu-formulario');
const rascunho = iniciarRascunho({ formulario: formCadastro, chave: CHAVE_RASCUNHO });

iniciarFormulario({
    formulario: formCadastro,
    aviso: document.getElementById('mensagem-sucesso'),
    aoEnviarComSucesso: rascunho.limpar
});

// Modal de termos
iniciarModal({
    modal: document.getElementById('modal-termos'),
    botaoFechar: document.getElementById('btn-fechar')
});
