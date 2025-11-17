package com.senacwebpatasdouradas.demo.dto;

import java.math.BigDecimal;
import java.util.List;

public class CarrinhoValidadoDTO {

    private List<ItemValidadoDTO> itens;
    private BigDecimal totalGeral;

    // Getters e Setters
    public List<ItemValidadoDTO> getItens() {
        return itens;
    }

    public void setItens(List<ItemValidadoDTO> itens) {
        this.itens = itens;
    }

    public BigDecimal getTotalGeral() {
        return totalGeral;
    }

    public void setTotalGeral(BigDecimal totalGeral) {
        this.totalGeral = totalGeral;
    }
}