package com.senacwebpatasdouradas.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PedidoDTO {

    private Integer id;
    private LocalDateTime data;
    private BigDecimal total;
    private String nomeCliente;
    private List<PedidoItemDTO> itens;

    // Getters e Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public LocalDateTime getData() {
        return data;
    }
    public void setData(LocalDateTime data) {
        this.data = data;
    }
    public BigDecimal getTotal() {
        return total;
    }
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    public String getNomeCliente() {
        return nomeCliente;
    }
    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }
    public List<PedidoItemDTO> getItens() {
        return itens;
    }
    public void setItens(List<PedidoItemDTO> itens) {
        this.itens = itens;
    }
}