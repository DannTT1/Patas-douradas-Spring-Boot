function inicializarBotoesAdicionar() {
    // Ouve cliques na página inteira (para funcionar mesmo se os produtos carregarem depois)
    document.body.addEventListener('click', function(event) {
        // Verifica se clicou no botão de adicionar
        const btn = event.target.closest('.adicionar-carrinho-btn');
        
        if (btn) {
            const produtoId = btn.dataset.id;
            console.log("Botão clicado! ID do produto:", produtoId); // Debug no Console
            adicionarProdutoAoCarrinho(produtoId);
        }
    });
}

async function adicionarProdutoAoCarrinho(produtoId) {
    try {
        // 1. Vai no Java buscar os dados ATUAIS do produto (Preço, Estoque, Imagem)
        console.log(`Buscando dados do produto ${produtoId} no servidor...`);
        const response = await fetch(`http://localhost:8080/produtos/${produtoId}`);
        
        if (!response.ok) {
            throw new Error("Erro ao comunicar com o servidor.");
        }

        const produtoDoBanco = await response.json();
        console.log("Produto recebido do Java:", produtoDoBanco);

        // 2. Monta o objeto para salvar no carrinho
        // ATENÇÃO: Mapeamos os nomes do Java para o padrão do carrinho
        const itemParaCarrinho = {
            id: produtoDoBanco.id,
            nome: produtoDoBanco.nome,
            // O Java manda 'precoUnitario', mas o carrinho espera 'preco'
            preco: produtoDoBanco.precoUnitario, 
            // O Java manda 'imagemUrl', mas o carrinho espera 'imagem'
            imagem: produtoDoBanco.imagemUrl,    
            estoque: produtoDoBanco.estoque,
            quantidade: 1
        };

        // 3. Lógica de Adicionar/Incrementar no LocalStorage
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.id == produtoId);

        if (itemExistente) {
            if (itemExistente.quantidade < itemParaCarrinho.estoque) {
                itemExistente.quantidade++;
                alert(`Mais uma unidade de "${itemParaCarrinho.nome}" adicionada!`);
            } else {
                alert(`Limite de estoque atingido para "${itemParaCarrinho.nome}"!`);
                return; // Não salva se não tiver estoque
            }
        } else {
            if (itemParaCarrinho.estoque > 0) {
                carrinho.push(itemParaCarrinho);
                alert(`"${itemParaCarrinho.nome}" adicionado ao carrinho!`);
            } else {
                alert(`Produto esgotado!`);
                return;
            }
        }

        // 4. Salva e notifica
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        console.log("Carrinho atualizado:", carrinho);

    } catch (erro) {
        console.error("Erro ao adicionar:", erro);
        alert("Não foi possível adicionar. Verifique se o Backend está rodando.");
    }
}

// Inicia a escuta
document.addEventListener('DOMContentLoaded', inicializarBotoesAdicionar);


// js/carrinho-eventos.js

// Variável para simular produtos se necessário (Mantenha se você usa Mock)
// ...

// Função global que os botões chamam
window.adicionarProdutoAoCarrinho = async function(produtoId) {
    
    // --- 🔒 TRAVA DE SEGURANÇA (Adicionar ao Carrinho) ---
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    
    if (!usuarioLogado) {
        alert("🔒 Você precisa entrar na sua conta!\n\nFaça login ou cadastre-se para comprar este produto.");
        
        // Redireciona para o login (ajuste o caminho se necessário)
        const isPaginaInterna = window.location.pathname.includes("/pages/");
        const caminhoLogin = isPaginaInterna ? "../login-cadastro/login.html" : "pages/login-cadastro/login.html";
        window.location.href = caminhoLogin;
        
        return; // <--- O CÓDIGO PARA AQUI. Nada é adicionado.
    }
    // -----------------------------------------------------

    console.log(`Usuário logado. Adicionando produto ${produtoId}...`);

    // ... (Mantenha aqui todo o resto do seu código original de adicionar: fetch, localStorage, etc.) ...
    // ... Código que busca no Java e salva no carrinho ...
};