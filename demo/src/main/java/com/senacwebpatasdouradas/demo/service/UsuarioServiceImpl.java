package com.senacwebpatasdouradas.demo.service;

import com.senacwebpatasdouradas.demo.dto.LoginDTO;
import com.senacwebpatasdouradas.demo.dto.SessaoDTO;
import com.senacwebpatasdouradas.demo.dto.UsuarioDTO;
import com.senacwebpatasdouradas.demo.entity.ClienteEntity;
import com.senacwebpatasdouradas.demo.entity.TipoConta;
import com.senacwebpatasdouradas.demo.entity.UsuarioEntity;
import com.senacwebpatasdouradas.demo.entity.VendedorEntity;
import com.senacwebpatasdouradas.demo.repository.UsuarioRepository;
import com.senacwebpatasdouradas.demo.securityconfig.JwtService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    @Autowired
    @Lazy
    private AuthenticationManager authenticationManager;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
    }

    @Override
    public SessaoDTO login(LoginDTO dto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            dto.getUsername(),
                            dto.getSenha()
                    )
            );
        } catch (Exception e) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        UsuarioEntity usuario = usuarioRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("Erro ao carregar usuário pós-login"));

        String jwtToken = jwtService.generateToken(usuario);

        SessaoDTO sessaoDTO = new SessaoDTO();
        sessaoDTO.setMensagem("Login bem-sucedido!");
        sessaoDTO.setToken(jwtToken);

        return sessaoDTO;
    }



    private UsuarioDTO toDto(UsuarioEntity usr) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setUsername(usr.getUsername());
        dto.setNome(usr.getNome());
        dto.setEmail(usr.getEmail());

        if (usr instanceof ClienteEntity) {
            dto.setTipoConta(TipoConta.CLIENTE);
        } else if (usr instanceof VendedorEntity) {
            dto.setTipoConta(TipoConta.VENDEDOR);
        }

        return dto;
    }

    @Override
    public List<UsuarioDTO> findAll() {
        List<UsuarioEntity>  usuarios = usuarioRepository.findAll();
        List<UsuarioDTO> resultado = new ArrayList<>();
        for (UsuarioEntity usr : usuarios) {
            resultado.add(toDto(usr));
        }
        return resultado;
    }

    @Override
    public UsuarioDTO create(UsuarioDTO dto) {
        if (dto.getSenha() == null || dto.getRepeticaoSenha() == null || !dto.getSenha().equals(dto.getRepeticaoSenha())) {
            throw new IllegalArgumentException("As senhas não conferem ou estão nulas!");
        }

        UsuarioEntity novaEntidade;
        if (dto.getTipoConta() == TipoConta.CLIENTE) {
            novaEntidade = new ClienteEntity();
        } else if (dto.getTipoConta() == TipoConta.VENDEDOR) {
            novaEntidade = new VendedorEntity();
        } else {
            throw new IllegalArgumentException("Tipo de conta inválido ou não fornecido.");
        }

        novaEntidade.setUsername(dto.getUsername());
        novaEntidade.setNome(dto.getNome());
        novaEntidade.setEmail(dto.getEmail());
        novaEntidade.setSenha(passwordEncoder.encode(dto.getSenha()));

        UsuarioEntity entidadeSalva = usuarioRepository.save(novaEntidade);
        return toDto(entidadeSalva);
    }

    @Override
    public Boolean existByEmail(String email) {
        return usuarioRepository.findByEmail(email).isPresent();
    }

    @Override
    public void delete(int id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public UsuarioDTO update(int id, String username, String novaSenha) {
        if(id < 1 ) {
            throw new IllegalArgumentException("ID invalido");
        }

        UsuarioEntity usrExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usrExistente.setNome(username);
        usrExistente.setSenha(passwordEncoder.encode(novaSenha));
        usuarioRepository.save(usrExistente);
        return toDto(usrExistente);
    }

    @Override
    public UsuarioDTO findByEmail(String emailV) {
        if (emailV == null || emailV.isEmpty()) {
            throw new IllegalArgumentException("Email inválido");
        }
        UsuarioEntity usr = usuarioRepository.findByEmail(emailV)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com email: " + emailV));
        return toDto(usr);
    }

    @Override
    public UsuarioDTO findByUsername(String username) {
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username inválido");
        }
        UsuarioEntity usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado: " + username));
        return toDto(usuario);
    }
}