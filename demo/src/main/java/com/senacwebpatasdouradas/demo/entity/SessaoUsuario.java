package com.senacwebpatasdouradas.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class SessaoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer sessionId;

    @Column(unique = true)
    private String token;

    @Column(unique = true)
    private int userId;

    private Enum tipoUsuario;

    private LocalDateTime sessaoInicio;

    private LocalDateTime sessaoFim;

    public SessaoUsuario() {
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Enum getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(Enum tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public LocalDateTime getSessaoInicio() {
        return sessaoInicio;
    }

    public void setSessaoInicio(LocalDateTime sessaoInicio) {
        this.sessaoInicio = sessaoInicio;
    }

    public LocalDateTime getSessaoFim() {
        return sessaoFim;
    }

    public void setSessaoFim(LocalDateTime sessaoFim) {
        this.sessaoFim = sessaoFim;
    }
}
