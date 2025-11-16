package com.senacwebpatasdouradas.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import org.springframework.data.annotation.Id;


// pensando e como fazer a heranca de usuario para cliente

@Entity
@Table(name = "clientes")
public class ClienteEntity extends UsuarioEntity {

    public ClienteEntity() {

    }






}


