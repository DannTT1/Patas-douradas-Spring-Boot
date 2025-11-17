package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.PedidoCriadoDTO;
import com.senacwebpatasdouradas.demo.dto.PedidoDTO;

public interface PedidoService {


    PedidoDTO createPedido(PedidoCriadoDTO dto);
}