from pathlib import Path

RAIZ = Path(__file__).resolve().parent
SAIDA = RAIZ / "estrutura_projeto.txt"

PASTAS_IGNORADAS = {
    "node_modules",
    ".git",
    ".next",
    ".venv",
    "venv",
    "__pycache__",
    "dist",
    "build",
    "coverage",
}

ARQUIVOS_IGNORADOS = {
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    ".DS_Store",
    "package-lock.json",
    SAIDA.name,
}

EXTENSOES_IGNORADAS = {
    ".png", ".jpg", ".jpeg", ".gif",
    ".ico", ".webp", ".pdf", ".zip",
    ".exe", ".dll", ".woff", ".woff2",
    ".lock",
}


def deve_ignorar(caminho: Path) -> bool:
    if any(parte in PASTAS_IGNORADAS for parte in caminho.parts):
        return True

    if caminho.name in ARQUIVOS_IGNORADOS:
        return True

    if caminho.name.startswith(".env"):
        return True

    if caminho.suffix.lower() in EXTENSOES_IGNORADAS:
        return True

    return False


def listar_arquivos():
    arquivos = []

    for caminho in RAIZ.rglob("*"):
        relativo = caminho.relative_to(RAIZ)

        if caminho.is_symlink() or deve_ignorar(relativo):
            continue

        if caminho.is_file():
            arquivos.append(relativo)

    return sorted(arquivos)


def exportar():
    arquivos = listar_arquivos()

    with SAIDA.open("w", encoding="utf-8") as saida:

        saida.write("# ESTRUTURA DO PROJETO\n\n")

        diretorios = set()

        for arquivo in arquivos:
            for pasta in arquivo.parents:
                if pasta != Path("."):
                    diretorios.add(pasta)

        caminhos = sorted(
            list(diretorios) + arquivos,
            key=lambda p: str(p),
        )

        for caminho in caminhos:
            nivel = len(caminho.parts) - 1
            indentacao = "    " * nivel

            if caminho in diretorios:
                saida.write(f"{indentacao}{caminho.name}/\n")
            else:
                saida.write(f"{indentacao}{caminho.name}\n")

        saida.write("\n\n# CONTEÚDO DOS ARQUIVOS\n")

        for arquivo in arquivos:
            caminho_completo = RAIZ / arquivo

            try:
                conteudo = caminho_completo.read_text(
                    encoding="utf-8"
                )
            except (UnicodeError, OSError):
                continue

            saida.write(f"\n{'=' * 60}\n")
            saida.write(f"ARQUIVO: {arquivo}\n")
            saida.write(f"{'=' * 60}\n\n")
            saida.write(conteudo)
            saida.write("\n")

    print(f"Projeto exportado para: {SAIDA}")
    print(f"Total de arquivos: {len(arquivos)}")


if __name__ == "__main__":
    exportar()
