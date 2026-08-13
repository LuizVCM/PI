const fs = require("fs");
const path = require("path");

const pastaProjeto = __dirname;
const arquivoSaida = path.join(pastaProjeto, "projeto_completo.txt");

// Pastas que não queremos incluir
const ignorarPastas = [
    "node_modules",
    ".git"
];

// Extensões que queremos ler
const extensoesPermitidas = [
    ".js",
    ".ts",
    ".html",
    ".css",
    ".json",
    ".java",
    ".py",
    ".sql",
    ".php",
    ".jsx",
    ".tsx",
    ".xml",
    ".md"
];

let resultado = "";

function lerPasta(pasta) {
    const arquivos = fs.readdirSync(pasta);

    for (const nomeArquivo of arquivos) {
        const caminhoCompleto = path.join(pasta, nomeArquivo);
        const relativo = path.relative(pastaProjeto, caminhoCompleto);

        // Ignora pastas específicas
        if (fs.statSync(caminhoCompleto).isDirectory()) {
            if (!ignorarPastas.includes(nomeArquivo)) {
                lerPasta(caminhoCompleto);
            }

            continue;
        }

        // Não lê o próprio arquivo de saída
        if (caminhoCompleto === arquivoSaida) {
            continue;
        }

        const extensao = path.extname(nomeArquivo).toLowerCase();

        // Só lê extensões permitidas
        if (!extensoesPermitidas.includes(extensao)) {
            continue;
        }

        try {
            const conteudo = fs.readFileSync(caminhoCompleto, "utf8");

            resultado += "\n";
            resultado += "============================================================\n";
            resultado += `ARQUIVO: ${relativo}\n`;
            resultado += "============================================================\n\n";
            resultado += conteudo;
            resultado += "\n\n";

            console.log(`Lido: ${relativo}`);
        } catch (erro) {
            console.log(`Erro ao ler ${relativo}: ${erro.message}`);
        }
    }
}

console.log("Lendo projeto...\n");

lerPasta(pastaProjeto);

fs.writeFileSync(arquivoSaida, resultado, "utf8");

console.log("\n========================================");
console.log("Projeto lido com sucesso!");
console.log(`Arquivo gerado: ${arquivoSaida}`);
console.log("========================================");