package com.senacwebpatasdouradas.demo.repository;

import com.senacwebpatasdouradas.demo.entity.PedidoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<PedidoEntity, Integer> {
}