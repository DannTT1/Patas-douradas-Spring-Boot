package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.CarrinhoItemDTO;
import com.senacwebpatasdouradas.demo.dto.CarrinhoValidadoDTO;
import com.senacwebpatasdouradas.demo.dto.ItemValidadoDTO;
import com.senacwebpatasdouradas.demo.dto.ProdutoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarrinhoServiceImpl implements CarrinhoService {

    @Autowired
    private ProdutoService produtoService;

    @Override
    public CarrinhoValidadoDTO validarCarrinho(List<CarrinhoItemDTO> itens) {
        List<ItemValidadoDTO> itensValidados = new ArrayList<>();
        BigDecimal totalGeral = BigDecimal.ZERO;

        for (CarrinhoItemDTO item : itens) {
            ProdutoDTO produto = produtoService.findById(item.getProdutoId());

            if (produto.getEstoque() < item.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
            }

            BigDecimal subtotal = produto.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade()));

            ItemValidadoDTO itemValidado = new ItemValidadoDTO();
            itemValidado.setProduto(produto);
            itemValidado.setQuantidade(item.getQuantidade());
            itemValidado.setSubtotal(subtotal);

            itensValidados.add(itemValidado);

            totalGeral = totalGeral.add(subtotal);
        }

        CarrinhoValidadoDTO carrinhoValidado = new CarrinhoValidadoDTO();
        carrinhoValidado.setItens(itensValidados);
        carrinhoValidado.setTotalGeral(totalGeral);

        return carrinhoValidado;
    }
}