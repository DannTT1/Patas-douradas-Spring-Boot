package com.senacwebpatasdouradas.demo.dto;

import java.math.BigDecimal;


public class ItemValidadoDTO {

    private ProdutoDTO produto;
    private int quantidade;
    private BigDecimal subtotal;

    // Getters e Setters
    public ProdutoDTO getProduto() {
        return produto;
    }

    public void setProduto(ProdutoDTO produto) {
        this.produto = produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }
}