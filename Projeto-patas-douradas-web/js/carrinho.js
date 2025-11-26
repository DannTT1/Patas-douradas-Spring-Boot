document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrinho();
    inicializarEventos();
});

// --- FUNÇÕES UTILITÁRIAS ---

function obtainingCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}

// --- RENDERIZAÇÃO NA TELA ---

function renderizarCarrinho() {
    const carrinho = obtainingCarrinho();
    const container = document.getElementById("itens-carrinho");
    const totalSpan = document.getElementById("total");
    const botaoFinalizar = document.getElementById("finalizar-pedido-btn");
    
    if (!container) return;

    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<tr><td colspan='5' class='carrinho-vazio'>Seu carrinho está vazio.</td></tr>";
        if (totalSpan) totalSpan.textContent = "R$ 0,00";
        if (botaoFinalizar) botaoFinalizar.disabled = true;
        return;
    }
    
    if (botaoFinalizar) botaoFinalizar.disabled = false;

    let totalGeral = 0;

    carrinho.forEach(item => {
        // Garante que preço é número
        const preco = parseFloat(item.preco || item.precoUnitario || 0); 
        const subtotal = preco * item.quantidade;
        totalGeral += subtotal;
        
        // Tratamento de Imagem
        let imagePath = item.imagem || item.imagemUrl;
        if (!imagePath || imagePath === "null") {
            imagePath = '../../assets/img/sem-imagem.png';
        } else if (!imagePath.startsWith("http")) {
            imagePath = `../../assets/img/${imagePath}`;
        }

        const itemHtml = `
            <tr data-id="${item.id}">
                <td data-label="Produto">
                    <div class="produto-carrinho-info">
                        <img src="${imagePath}" onerror="this.src='../../assets/img/sem-imagem.png'">
                        <span>${item.nome}</span>
                    </div>
                </td>
                <td data-label="Preço">R$ ${preco.toFixed(2)}</td>
                <td data-label="Quantidade">
                    <div class="quantidade-controls">
                        <button class="btn-acao btn-ver diminuir" style="background:#ddd; color:#333">-</button>
                        <span style="margin: 0 10px; font-weight:bold">${item.quantidade}</span>
                        <button class="btn-acao btn-ver aumentar" style="background:#ddd; color:#333">+</button>
                    </div>
                </td>
                <td data-label="Subtotal">R$ ${subtotal.toFixed(2)}</td>
                <td data-label="Ação"><button class="btn-acao btn-excluir btn-remover">Remover</button></td>
            </tr>
        `;
        container.innerHTML += itemHtml;
    });

    if (totalSpan) totalSpan.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

// --- EVENTOS (CLIQUES) ---

function inicializarEventos() {
    const container = document.getElementById("itens-carrinho");
    const botaoFinalizar = document.getElementById("finalizar-pedido-btn");

    if (container) {
        container.addEventListener('click', (event) => {
            const target = event.target;
            const tr = target.closest('tr');
            if (!tr) return;
            
            const produtoId = tr.dataset.id;
            let carrinho = obtainingCarrinho();
            // Compara IDs (convertendo para string ou número para garantir)
            const itemIndex = carrinho.findIndex(p => p.id == produtoId);

            if (itemIndex === -1) return;

            if (target.classList.contains('aumentar')) {
                carrinho[itemIndex].quantidade++;
                salvarCarrinho(carrinho);
            } else if (target.classList.contains('diminuir')) {
                if (carrinho[itemIndex].quantidade > 1) {
                    carrinho[itemIndex].quantidade--;
                } else {
                    if(confirm("Remover este item do carrinho?")) carrinho.splice(itemIndex, 1);
                }
                salvarCarrinho(carrinho);
            } else if (target.classList.contains('btn-remover')) {
                if(confirm("Tem certeza que deseja remover este item?")) {
                    carrinho.splice(itemIndex, 1);
                    salvarCarrinho(carrinho);
                }
            }
        });
    }

    if (botaoFinalizar) {
        botaoFinalizar.addEventListener('click', finalizarPedidoBackend);
    }
}

// --- FINALIZAR PEDIDO (CONECTADO AO JAVA) ---

async function finalizarPedidoBackend() {
    console.log("Iniciando finalização de pedido...");

    // 1. Verifica se está logado
    const usuarioString = localStorage.getItem("usuarioLogado");
    
    if (!usuarioString) {
        const irParaLogin = confirm("Você precisa estar logado para finalizar a compra.\nDeseja entrar ou cadastrar-se agora?");
        if (irParaLogin) {
            // Redireciona para o login
            window.location.href = "../login-cadastro/login.html";
        }
        return; 
    }

    // 2. Prepara os dados
    const usuario = JSON.parse(usuarioString);
    const carrinho = obtainingCarrinho(); // Usa a função auxiliar

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const payload = {
        usuarioId: parseInt(usuario.id),
        itens: carrinho.map(item => ({
            produtoId: parseInt(item.id),
            quantidade: parseInt(item.quantidade)
        }))
    };

    // 4. Envia para o Backend
    try {
        const response = await fetch("http://localhost:8080/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const pedido = await response.json();
            alert(`✅ Sucesso! Pedido #${pedido.id} realizado.\nValor Total: R$ ${pedido.total.toFixed(2)}`);
            
            // Limpa o carrinho e redireciona
            localStorage.removeItem("carrinho");
            window.location.href = "pedidos-cliente.html";
        } else {
            // Tenta ler a mensagem de erro do servidor
            const erroTexto = await response.text();
            alert("Erro ao finalizar pedido: " + erroTexto);
            console.error("Erro do servidor:", erroTexto);
        }
    } catch (e) {
        console.error("Erro de rede:", e);
        alert("Erro de conexão com o servidor. Verifique se o Backend Java está rodando.");
    }
}