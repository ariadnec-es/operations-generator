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

    // ================= NÚMEROS (DÍGITOS) =================
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

    // ================= QUESTÃO POR TIPO =================
    function gerarQuestao(tipo) {
        let a, b;

        if (tipo === "soma") {
            a = gerarNumero();
            b = gerarNumero();
            return `${a} + ${b} = __________`;
        }

        if (tipo === "sub") {
            a = gerarNumero();
            b = gerarNumero();
            return `${Math.max(a, b)} - ${Math.min(a, b)} = __________`;
        }

        if (tipo === "mult") {
            a = gerarNumero();
            b = gerarNumero();
            return `${a} x ${b} = __________`;
        }

        if (tipo === "div") {
            a = gerarNumero();
            b = gerarNumero();
            return `${a * b} / ${a} = __________`;
        }
    }

    // ================= TÍTULOS =================
    const titulos = {
        soma: "ADIÇÃO",
        sub: "SUBTRAÇÃO",
        mult: "MULTIPLICAÇÃO",
        div: "DIVISÃO"
    };

    // ================= CRIAR PÁGINA =================
    function criarPagina(tipo, numPagina) {
        doc.setFontSize(18);
        doc.text(titulos[tipo], 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.text(`Página ${numPagina}`, 105, 28, { align: "center" });

        let y = 45;

        for (let i = 1; i <= 20; i++) {
            doc.text(`${i}) ${gerarQuestao(tipo)}`, 30, y);
            y += 12;
        }
    }

    // ================= GERAR PDF =================
    let paginaAtual = 1;

    tiposSelecionados.forEach(tipo => {
        for (let p = 1; p <= paginas; p++) {
            if (paginaAtual > 1) doc.addPage();
            criarPagina(tipo, p);
            paginaAtual++;
        }
    });

    doc.save("atividades_matematica_estilo_kumon.pdf");
}
