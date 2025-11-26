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


document.addEventListener("DOMContentLoaded", () => {
    atualizarMenuNavegacao();
    configurarBloqueiosHome();
});

function configurarBloqueiosHome() {
    // 1. Bloqueio do Botão Principal "Ver Produtos"
    const btnHome = document.getElementById("btn-ver-produtos");
    if (btnHome) {
        btnHome.addEventListener("click", bloquearAcaoSeNaoLogado);
    }

    // 2. Bloqueio dos Cliques nas Imagens/Links dos Produtos (Vitrine)
    const containerProdutos = document.getElementById("produtos-destaque-lista");
    
    if (containerProdutos) {
        // Usamos 'addEventListener' no container para pegar cliques em qualquer produto dentro dele
        containerProdutos.addEventListener("click", (event) => {
            
            // Verifica se clicou em uma imagem ou link (que não seja o botão de carrinho)
            // O botão de carrinho já tem a trava dele no outro arquivo
            const clicouEmLink = event.target.closest('a');
            const clicouEmBotaoCarrinho = event.target.closest('.adicionar-carrinho-btn');

            // Se clicou num link (foto/nome) E NÃO foi no botão de carrinho...
            if (clicouEmLink && !clicouEmBotaoCarrinho) {
                bloquearAcaoSeNaoLogado(event);
            }
        });
    }
}

// Função auxiliar que faz a verificação
function bloquearAcaoSeNaoLogado(event) {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
        // Se estiver logado, deixa o clique acontecer normalmente (não faz nada)
        // O link vai abrir a página de detalhes ou produtos.
        return; 
    } else {
        // Se NÃO estiver logado:
        event.preventDefault(); // Impede de abrir a página
        event.stopPropagation(); // Impede outros scripts de rodarem
        
        alert("🔒 Conteúdo Exclusivo!\n\nVocê precisa fazer login para ver os detalhes ou comprar.");
        
        // Redireciona para o login
        const isPaginaInterna = window.location.pathname.includes("/pages/");
        const caminhoLogin = isPaginaInterna ? "../login-cadastro/login.html" : "pages/login-cadastro/login.html";
        window.location.href = caminhoLogin;
    }
}

// --- LÓGICA DO MENU (Mantida igual) ---
function atualizarMenuNavegacao() {
    const navMenu = document.querySelector("header .menu");
    if (!navMenu) return; 

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    const raiz = isPaginaInterna ? "../../" : "";
    const prefixoPaginas = isPaginaInterna ? "" : "pages/cliente/";
    const prefixoLogin = isPaginaInterna ? "../login-cadastro/" : "pages/login-cadastro/";

    if (usuarioLogado) {
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
        navMenu.innerHTML = `
            <a href="${raiz}index.html">Home</a>
            <a href="${linkLoginBotao(prefixoLogin)}" class="btn-login-destaque">Entrar / Cadastrar</a>
        `;
    }
}

function linkLoginBotao(prefixo) { return prefixo + "login.html"; }

function logoutCliente() {
    localStorage.removeItem("usuarioLogado");
    const isPaginaInterna = window.location.pathname.includes("/pages/");
    const destino = isPaginaInterna ? "../../index.html" : "index.html";
    window.location.href = destino;
}

// Estilo do botão Entrar (Injetado)
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
    .btn-login-destaque:hover { transform: scale(1.05); color: #e88e00 !important; }
`;
document.head.appendChild(styleBtn);