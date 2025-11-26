package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.PedidoCriadoDTO;
import com.senacwebpatasdouradas.demo.dto.PedidoDTO;
import java.util.List; // <--- IMPORTANTE

public interface PedidoService {

    // Novo método para listar pedidos de um cliente específico
    List<PedidoDTO> listarPorCliente(int clienteId);

    PedidoDTO createPedido(PedidoCriadoDTO dto);
}