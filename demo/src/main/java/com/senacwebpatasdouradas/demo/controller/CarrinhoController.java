package com.senacwebpatasdouradas.demo.controller;

import com.senacwebpatasdouradas.demo.dto.CarrinhoItemDTO;
import com.senacwebpatasdouradas.demo.dto.CarrinhoValidadoDTO;
import com.senacwebpatasdouradas.demo.service.CarrinhoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;


    @PostMapping("/validar")
    public ResponseEntity<CarrinhoValidadoDTO> validar(@Valid @RequestBody List<CarrinhoItemDTO> itens) {
        CarrinhoValidadoDTO carrinhoValidado = carrinhoService.validarCarrinho(itens);
        return ResponseEntity.ok(carrinhoValidado);
    }
}