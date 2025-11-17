package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.ProdutoDTO;
import java.util.List;

public interface ProdutoService {

    ProdutoDTO create(ProdutoDTO dto);

    ProdutoDTO findById(Integer id);

    List<ProdutoDTO> findAll();

    ProdutoDTO update(Integer id, ProdutoDTO dto);

    void delete(Integer id);
}