package com.senacwebpatasdouradas.demo.repository;

import com.senacwebpatasdouradas.demo.entity.ProdutoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<ProdutoEntity, Integer> {
}