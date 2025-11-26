document.addEventListener("DOMContentLoaded", () => {
    // 1. Primeiro: Verifica se pode estar aqui
    verificarPermissaoDeAcesso();

    atualizarMenuNavegacao();
});

function verificarPermissaoDeAcesso() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    const caminhoAtual = window.location.pathname;

    // Lista de páginas que NÃO precisam de login (Públicas)
    const paginasPublicas = [
        "index.html",
        "login.html",
        "cadastro.html",
        "/" // Raiz do site
    ];

    // Verifica se a página atual é pública
    // (O código abaixo verifica se o nome do arquivo atual está na lista de permitidos)
    const ehPublica = paginasPublicas.some(pagina => caminhoAtual.endsWith(pagina));

    // Se a página NÃO é pública e o usuário NÃO está logado...
    if (!ehPublica && !usuarioLogado) {
        alert("🔒 Conteúdo exclusivo!\nPor favor, faça login para acessar nossos produtos.");
        
        // Redireciona para o Login (ajuste o caminho conforme sua estrutura)
        // Se estiver dentro de pages/cliente/, volta para ../login-cadastro/login.html
        if (caminhoAtual.includes("/pages/")) {
            window.location.href = "../login-cadastro/login.html";
        } else {
            window.location.href = "pages/login-cadastro/login.html";
        }
    }
}

function atualizarMenuNavegacao() {
    const navMenu = document.querySelector("header .menu");
    if (!navMenu) return; 

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    // Caminhos relativos (Lógica para saber onde voltar)
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    const raiz = isPaginaInterna ? "../../" : "";
    const prefixoPaginas = isPaginaInterna ? "" : "pages/cliente/";
    // Link de login varia dependendo de onde estamos
    const linkLogin = isPaginaInterna ? "../login-cadastro/login.html" : "pages/login-cadastro/login.html";

    if (usuarioLogado) {
        // --- CLIENTE LOGADO (Vê tudo) ---
        const nome = usuarioLogado.nome.split(" ")[0]; 

        navMenu.innerHTML = `
            <span style="color: white; margin-right: 15px;">Olá, <b>${nome}</b></span>
            <a href="${raiz}index.html">Home</a>
            <a href="${prefixoPaginas}produtos-lista.html">Produtos</a>
            <a href="${prefixoPaginas}carrinho.html">Carrinho</a>
            <a href="${prefixoPaginas}pedidos-cliente.html">Meus Pedidos</a>
            <button class="btn-logout" onclick="logoutCliente()">Sair</button>
        `;
    } else {
        // --- VISITANTE (Só vê Home e Login) ---
        navMenu.innerHTML = `
            <a href="${raiz}index.html">Home</a>
            <a href="${linkLogin}" class="btn-login-destaque">Entrar / Cadastrar</a>
        `;
    }
}

function logoutCliente() {
    localStorage.removeItem("usuarioLogado");
    // Ao sair, manda para a Home pública
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    const destino = isPaginaInterna ? "../../index.html" : "index.html";
    window.location.href = destino;
}

// Estilo do botão
const styleBtn = document.createElement('style');
styleBtn.innerHTML = `
    .btn-login-destaque {
        background-color: white !important;
        color: var(--cor-primaria) !important;
        padding: 8px 15px;
        border-radius: 20px;
        font-weight: bold;
        transition: transform 0.2s;
    }
    .btn-login-destaque:hover {
        transform: scale(1.05);
        color: #e88e00 !important;
    }
`;
document.head.appendChild(styleBtn);