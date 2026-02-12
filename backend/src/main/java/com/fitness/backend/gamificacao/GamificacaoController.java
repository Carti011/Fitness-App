package com.fitness.backend.gamificacao;

import com.fitness.backend.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/gamificacao")
@CrossOrigin(origins = "*")
public class GamificacaoController {

    @Autowired
    private GamificacaoService gamificacaoService;

    @PostMapping("/atividade")
    public ResponseEntity<Usuario> registrarAtividade(@RequestBody Map<String, Object> payload) {
        Long usuarioId = ((Number) payload.get("usuarioId")).longValue();
        int duracao = ((Number) payload.get("duracao")).intValue();
        String tipo = (String) payload.get("tipo");

        try {
            Usuario usuario = gamificacaoService.registrarAtividade(usuarioId, duracao, tipo);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
