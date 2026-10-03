// Módulo do FORMULÁRIO: valida os campos, mostra mensagens de erro em texto
// (ligadas aos campos por aria-describedby) e anuncia o sucesso para leitores de tela.
// Não conhece o rascunho: quem quiser agir após um envio válido passa aoEnviarComSucesso.

export function iniciarFormulario({ formulario, aviso, aoEnviarComSucesso }) {
    if (!formulario) return;

    // As mensagens nativas do navegador são substituídas pelas mensagens deste módulo.
    formulario.noValidate = true;

    // Para grupos de rádio, o primeiro botão representa o grupo inteiro.
    function representante(campo) {
        if (campo.type !== 'radio') return campo;
        return formulario.querySelector(`input[type="radio"][name="${campo.name}"]`);
    }

    function camposValidaveis() {
        return Array.from(formulario.elements).filter(campo =>
            campo.willValidate && campo.name && representante(campo) === campo
        );
    }

    function grupoDe(campo) {
        return campo.type === 'radio'
            ? formulario.querySelectorAll(`input[type="radio"][name="${campo.name}"]`)
            : [campo];
    }

    function obterContainerErro(campo) {
        const id = `erro-${campo.name}`;
        let span = document.getElementById(id);

        if (!span) {
            span = document.createElement('span');
            span.id = id;
            span.className = 'erro-campo';

            if (campo.type === 'radio') {
                campo.closest('fieldset').append(span);
            } else {
                campo.insertAdjacentElement('afterend', span);
            }
        }
        return span;
    }

    function mensagemDe(campo) {
        if (campo.validity.valueMissing) {
            return campo.dataset.erroVazio || 'Preencha este campo.';
        }
        return campo.dataset.erro || campo.validationMessage;
    }

    function mostrarErro(campo) {
        const span = obterContainerErro(campo);
        span.textContent = mensagemDe(campo);

        grupoDe(campo).forEach(item => {
            item.setAttribute('aria-invalid', 'true');
            item.setAttribute('aria-describedby', span.id);
        });
    }

    function limparErro(campo) {
        const span = document.getElementById(`erro-${campo.name}`);
        if (span) span.textContent = '';

        grupoDe(campo).forEach(item => {
            item.removeAttribute('aria-invalid');
            item.removeAttribute('aria-describedby');
        });
    }

    function mostrarAviso() {
        if (!aviso) return;
        const destaque = document.createElement('strong');
        destaque.textContent = aviso.dataset.titulo || '';
        aviso.replaceChildren(destaque, document.createTextNode(` ${aviso.dataset.mensagem || ''}`));
    }

    function limparAviso() {
        if (aviso) aviso.replaceChildren();
    }

    // Enquanto a pessoa corrige um campo com erro, a mensagem é atualizada ou removida.
    formulario.addEventListener('input', (evento) => {
        const campo = representante(evento.target);
        if (!campo || campo.getAttribute('aria-invalid') !== 'true') return;

        if (campo.validity.valid) {
            limparErro(campo);
        } else {
            mostrarErro(campo);
        }
    });

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const campos = camposValidaveis();
        const invalidos = campos.filter(campo => !campo.validity.valid);

        campos.forEach(campo => {
            if (campo.validity.valid) {
                limparErro(campo);
            } else {
                mostrarErro(campo);
            }
        });

        if (invalidos.length === 0) {
            mostrarAviso();

            // Chamado ANTES do reset, caso alguém precise ler os dados do formulário.
            if (typeof aoEnviarComSucesso === 'function') {
                aoEnviarComSucesso();
            }

            formulario.reset();
        } else {
            limparAviso();
            invalidos[0].focus();
        }
    });
}
