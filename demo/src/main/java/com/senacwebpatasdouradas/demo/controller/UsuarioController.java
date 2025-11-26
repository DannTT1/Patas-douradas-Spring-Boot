package com.senacwebpatasdouradas.demo.controller;

import com.senacwebpatasdouradas.demo.dto.LoginDTO;
import com.senacwebpatasdouradas.demo.dto.UsuarioDTO;
import com.senacwebpatasdouradas.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // Importa o CrossOrigin

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public UsuarioDTO create(@RequestBody UsuarioDTO dto) {
        return usuarioService.create(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        try {
            UsuarioDTO usuario = (UsuarioDTO) usuarioService.login(dto);
            String permissao = usuario.getTipoConta().toString();
            return ResponseEntity.ok(new SaidaLogin(usuario.getNome(), permissao));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erro: " + e.getMessage());
        }
    }
    
   public record SaidaLogin(String nome, String permissao) {
   }
}