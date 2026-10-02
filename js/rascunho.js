// Módulo de RASCUNHO: salva e restaura qualquer formulário no localStorage.
// Lê os campos pelo atributo "name", então não precisa listar cada campo manualmente.

export function iniciarRascunho({ formulario, chave }) {
    if (!formulario) return { limpar() {} };

    function salvar() {
        try {
            const dados = Object.fromEntries(new FormData(formulario));
            localStorage.setItem(chave, JSON.stringify(dados));
        } catch (erro) {
            console.warn('Não foi possível salvar o rascunho:', erro);
        }
    }

    function carregar() {
        let dados;
        try {
            const bruto = localStorage.getItem(chave);
            if (!bruto) return;
            dados = JSON.parse(bruto);
        } catch (erro) {
            limpar();
            return;
        }

        for (const [nome, valor] of Object.entries(dados)) {
            const campo = formulario.elements[nome];
            // Funciona para inputs comuns e também para grupos de radio (RadioNodeList).
            if (campo) campo.value = valor;
        }
    }

    function limpar() {
        try {
            localStorage.removeItem(chave);
        } catch (erro) {
            console.warn('Não foi possível limpar o rascunho:', erro);
        }
    }

    carregar();
    formulario.addEventListener('input', salvar);

    return { limpar };
}
