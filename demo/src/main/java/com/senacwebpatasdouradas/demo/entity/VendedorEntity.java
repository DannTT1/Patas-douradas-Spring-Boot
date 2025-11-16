package com.senacwebpatasdouradas.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import org.springframework.data.annotation.Id;

import java.util.List;

@Entity
@Table(name = "vendedor")
public class VendedorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vendedorId;

    @Column(unique = true, nullable = false, length = 64)
    private String username;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 255)
    private String senha;

    @Column(nullable = false, length = 100)
    private String email;

    @OneToMany
    private List<ProdutoEntity> produtos;

    public VendedorEntity() {
    }

    public VendedorEntity(int vendedorId, String username, String nome, String senha, String email, List<ProdutoEntity> produtos) {
        this.vendedorId = vendedorId;
        this.username = username;
        this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.produtos = produtos;
    }

    public int getVendedorId() {
        return vendedorId;
    }

    public void setVendedorId(int vendedorId) {
        this.vendedorId = vendedorId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<ProdutoEntity> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<ProdutoEntity> produtos) {
        this.produtos = produtos;
    }
}
