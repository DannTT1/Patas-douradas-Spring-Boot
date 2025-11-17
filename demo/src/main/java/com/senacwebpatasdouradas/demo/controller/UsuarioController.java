package com.senacwebpatasdouradas.demo.controller;

import com.senacwebpatasdouradas.demo.dto.LoginDTO;
import com.senacwebpatasdouradas.demo.dto.SessaoDTO;
import com.senacwebpatasdouradas.demo.dto.UsuarioDTO;
import com.senacwebpatasdouradas.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;


    @PostMapping
    public UsuarioDTO create(@RequestBody UsuarioDTO dto) {
        return usuarioService.create(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<SessaoDTO> login(@RequestBody LoginDTO dto) {
        try {
            SessaoDTO sessaoDTO = usuarioService.login(dto);
            return ResponseEntity.ok(sessaoDTO);
        } catch (BadCredentialsException e) {
            SessaoDTO erroDto = new SessaoDTO();
            erroDto.setMensagem(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(erroDto);
        }
    }
}