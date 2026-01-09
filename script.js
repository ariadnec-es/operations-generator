function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const nivel = document.querySelector('input[name="nivel"]:checked').value;
    const paginas = parseInt(document.getElementById("paginas").value);

    const tiposSelecionados = [...document.querySelectorAll('input[type="checkbox"]:checked')]
        .map(el => el.value);

    if (tiposSelecionados.length === 0) {
        alert("Selecione pelo menos um tipo de questão");
        return;
    }

    // ================= GERADOR DE NÚMEROS (DÍGITOS) =================
    function gerarNumero() {
        let digitos;

        if (nivel === "facil") {
            digitos = Math.random() < 0.7 ? 1 : 2;
        } else if (nivel === "medio") {
            digitos = Math.random() < 0.5 ? 1 : 2;
        } else {
            const r = Math.random();
            digitos = r < 0.3 ? 1 : r < 0.6 ? 2 : 3;
        }

        const min = digitos === 1 ? 1 : Math.pow(10, digitos - 1);
        const max = Math.pow(10, digitos) - 1;

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ================= GERAR QUESTÃO =================
    function gerarQuestao() {
        const tipo = tiposSelecionados[
            Math.floor(Math.random() * tiposSelecionados.length)
        ];

        let a, b;

        switch (tipo) {
            case "soma":
                a = gerarNumero();
                b = gerarNumero();
                return `${a} + ${b} = __________`;

            case "sub":
                a = gerarNumero();
                b = gerarNumero();
                return `${Math.max(a, b)} − ${Math.min(a, b)} = __________`;

            case "mult":
                a = gerarNumero();
                b = gerarNumero();
                return `${a} × ${b} = __________`;

            case "div":
                a = gerarNumero();
                b = gerarNumero();
                return `${a * b} ÷ ${a} = __________`;
        }
    }

    // ================= CRIAR PÁGINA =================
    function criarPagina(numPagina) {
        doc.setFontSize(16);
        doc.text(`Página ${numPagina}`, 105, 20, { align: "center" });

        doc.setFontSize(13);
        let y = 40;

        for (let i = 0; i < 20; i++) {
            let x = i % 2 === 0 ? 25 : 110;
            doc.text(gerarQuestao(), x, y);

            if (i % 2 !== 0) y += 12;
        }
    }

    // ================= GERAR PDF =================
    for (let p = 1; p <= paginas; p++) {
        if (p > 1) doc.addPage();
        criarPagina(p);
    }

    doc.save("atividade_estilo_kumon.pdf");
}
