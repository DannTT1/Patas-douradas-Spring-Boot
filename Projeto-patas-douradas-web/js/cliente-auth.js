// js/cliente-auth.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualiza o cabeçalho (Menu) para mostrar Login ou Sair
    atualizarMenuNavegacao();

    // 2. Configura o bloqueio do botão da Home (Se ele existir)
    configurarBotaoHome();
});

// --- LÓGICA DO BOTÃO DA HOME (O BLOQUEIO) ---
function configurarBotaoHome() {
    // Busca o botão pelo ID que colocamos no HTML
    const btnHome = document.getElementById("btn-ver-produtos");

    // Só adiciona o evento se o botão existir (ou seja, se estiver na index.html)
    if (btnHome) {
        btnHome.addEventListener("click", (event) => {
            event.preventDefault(); // Impede que o link abra imediatamente

            const usuarioLogado = localStorage.getItem("usuarioLogado");

            if (usuarioLogado) {
                // --- CENÁRIO 1: LOGADO (LIBERADO) ---
                // Redireciona para a lista de produtos
                window.location.href = "pages/cliente/produtos-lista.html";
            } else {
                // --- CENÁRIO 2: BLOQUEADO ---
                // Mostra o aviso e manda para o login
                alert("🔒 Conteúdo Exclusivo!\n\nVocê precisa fazer login para acessar a loja e ver os produtos.");
                window.location.href = "pages/login-cadastro/login.html";
            }
        });
    }
}

// --- LÓGICA DO MENU (CABEÇALHO) ---
function atualizarMenuNavegacao() {
    const navMenu = document.querySelector("header .menu");
    if (!navMenu) return; 

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    // Define os caminhos corretos dependendo de onde o arquivo está rodando
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    const raiz = isPaginaInterna ? "../../" : "";
    const prefixoPaginas = isPaginaInterna ? "" : "pages/cliente/";
    const prefixoLogin = isPaginaInterna ? "../login-cadastro/" : "pages/login-cadastro/";

    if (usuarioLogado) {
        // --- USUÁRIO LOGADO ---
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
        // --- VISITANTE (NÃO LOGADO) ---
        // Note que aqui ele vê os links, mas o botão "Ver Produtos" da Home estará protegido pela função acima.
        navMenu.innerHTML = `
            <a href="${raiz}index.html">Home</a>
            <a href="${linkLoginBotao(prefixoLogin)}" class="btn-login-destaque">Entrar / Cadastrar</a>
        `;
    }
}

// Auxiliar para gerar o link de login correto
function linkLoginBotao(prefixo) {
    return prefixo + "login.html";
}

// --- FUNÇÃO DE LOGOUT ---
function logoutCliente() {
    localStorage.removeItem("usuarioLogado");
    
    // Ao sair, redireciona para a Home pública
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    const destino = isPaginaInterna ? "../../index.html" : "index.html";
    
    window.location.href = destino;
}

// --- ESTILO DO BOTÃO DE LOGIN (INJETADO VIA JS) ---
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