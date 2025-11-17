package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.ProdutoDTO;
import com.senacwebpatasdouradas.demo.entity.ProdutoEntity;
import com.senacwebpatasdouradas.demo.repository.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoServiceImpl implements ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    private ProdutoDTO toDto(ProdutoEntity entity) {
        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(entity.getId());
        dto.setNome(entity.getNome());
        dto.setPrecoUnitario(entity.getPrecoUnitario());
        dto.setEstoque(entity.getEstoque());
        dto.setImagemUrl(entity.getImagemUrl());
        return dto;
    }

    private ProdutoEntity toEntity(ProdutoDTO dto) {
        ProdutoEntity entity = new ProdutoEntity();
        entity.setNome(dto.getNome());
        entity.setPrecoUnitario(dto.getPrecoUnitario());
        entity.setEstoque(dto.getEstoque());
        entity.setImagemUrl(dto.getImagemUrl());
        return entity;
    }

    @Override
    public ProdutoDTO create(ProdutoDTO dto) {
        ProdutoEntity entity = toEntity(dto);
        ProdutoEntity savedEntity = produtoRepository.save(entity);
        return toDto(savedEntity);
    }

    @Override
    public ProdutoDTO findById(Integer id) {
        ProdutoEntity entity = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com ID: " + id));
        return toDto(entity);
    }

    @Override
    public List<ProdutoDTO> findAll() {
        List<ProdutoEntity> entities = produtoRepository.findAll();
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProdutoDTO update(Integer id, ProdutoDTO dto) {
        ProdutoEntity entity = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com ID: " + id));

        entity.setNome(dto.getNome());
        entity.setPrecoUnitario(dto.getPrecoUnitario());
        entity.setEstoque(dto.getEstoque());
        entity.setImagemUrl(dto.getImagemUrl());

        ProdutoEntity updatedEntity = produtoRepository.save(entity);
        return toDto(updatedEntity);
    }

    @Override
    public void delete(Integer id) {
        if (!produtoRepository.existsById(id)) {
            throw new EntityNotFoundException("Produto não encontrado com ID: " + id);
        }
        produtoRepository.deleteById(id);
    }
}