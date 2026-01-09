function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const tituloSize = 18;
    const questaoSize = 14;

    function gerarQuestoes(tipo) {
        const set = new Set();

        while (set.size < 20) {
            let a = Math.floor(Math.random() * 11) + 2;
            let b = Math.floor(Math.random() * 11) + 2;

            if (tipo === "mult") {
                set.add(`${a} × ${b} = __________`);
            } else {
                set.add(`${a * b} ÷ ${a} = __________`);
            }
        }

        return Array.from(set);
    }

    function criarPagina(titulo, questoes) {
        doc.setFontSize(tituloSize);
        doc.text(titulo, 105, 20, { align: "center" });

        doc.setFontSize(questaoSize);

        let y = 40;

        for (let i = 0; i < questoes.length; i++) {
            let x = i % 2 === 0 ? 30 : 110;
            doc.text(questoes[i], x, y);

            if (i % 2 !== 0) y += 12;
        }
    }

    // Página 1
    criarPagina("Multiplicação", gerarQuestoes("mult"));

    // Página 2
    doc.addPage();
    criarPagina("Divisão", gerarQuestoes("div"));

    doc.save("atividade_estilo_kumon.pdf");
}
