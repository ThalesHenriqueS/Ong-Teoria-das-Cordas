

export function iniciarRascunho({ formulario, chave, ignorar = [] }) {
    if (!formulario) return { limpar() {} };

    function salvar() {
        try {
            const dados = Object.fromEntries(new FormData(formulario));
            ignorar.forEach(campo => delete dados[campo]);
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
            if (ignorar.includes(nome)) continue;
            const campo = formulario.elements[nome];
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
