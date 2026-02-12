package com.fitness.backend.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.salvar(usuario));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable("id") Long id) {
        return usuarioService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/biometria")
    public ResponseEntity<Usuario> atualizarBiometria(@PathVariable("id") Long id, @RequestBody Usuario dados) {
        try {
            Usuario atualizado = usuarioService.atualizarBiometria(id, dados);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/metabolismo")
    public ResponseEntity<Map<String, Double>> buscarMetabolismo(@PathVariable("id") Long id) {
        try {
            double tmb = usuarioService.calcularTMB(id);
            double get = usuarioService.calcularGET(id);

            Map<String, Double> resposta = new HashMap<>();
            resposta.put("tmb", tmb);
            resposta.put("get", get);

            return ResponseEntity.ok(resposta);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
