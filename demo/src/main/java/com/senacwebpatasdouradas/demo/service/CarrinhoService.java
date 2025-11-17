package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.CarrinhoItemDTO;
import com.senacwebpatasdouradas.demo.dto.CarrinhoValidadoDTO;

import java.util.List;

public interface CarrinhoService {


    CarrinhoValidadoDTO validarCarrinho(List<CarrinhoItemDTO> itens);
}