package com.senacwebpatasdouradas.demo.dto;

public class SessaoDTO {

    private String token;

    private String mensagem;

    public SessaoDTO() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
