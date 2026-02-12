package com.fitness.backend.gamificacao;

import com.fitness.backend.usuario.Usuario;
import com.fitness.backend.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class GamificacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrarAtividade(Long usuarioId, int duracaoMinutos, String tipoAtividade) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Calcular XP
        int xpGanho = calcularXP(duracaoMinutos, tipoAtividade);
        usuario.setXp((usuario.getXp() == null ? 0 : usuario.getXp()) + xpGanho);

        // Atualizar Nível (Exemplo simples: a cada 1000 XP sobe de nível)
        int novoNivel = (usuario.getXp() / 1000) + 1;
        usuario.setNivel(novoNivel);

        // Atualizar Streak (Ofensiva)
        atualizarOfensiva(usuario);

        return usuarioRepository.save(usuario);
    }

    private int calcularXP(int duracaoMinutos, String tipoAtividade) {
        // Lógica simples por enquanto
        int baseXp = duracaoMinutos * 10; // 10 XP por minuto
        return baseXp;
    }

    private void atualizarOfensiva(Usuario usuario) {
        LocalDate hoje = LocalDate.now();
        LocalDate ultimoTreino = usuario.getUltimoTreino();

        if (ultimoTreino == null) {
            usuario.setOfensiva(1);
        } else if (ultimoTreino.equals(hoje)) {
            // Já treinou hoje, não muda nada
            return;
        } else if (ultimoTreino.equals(hoje.minusDays(1))) {
            // Treinou ontem, incrementa
            usuario.setOfensiva(usuario.getOfensiva() + 1);
        } else {
            // Quebrou o streak
            usuario.setOfensiva(1);
        }

        usuario.setUltimoTreino(hoje);
    }
}
