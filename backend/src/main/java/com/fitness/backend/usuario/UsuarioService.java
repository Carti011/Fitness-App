package com.fitness.backend.usuario;

import com.fitness.backend.calculadora.CalculadoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CalculadoraService calculadoraService;

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario salvar(Usuario usuario) {
        // Here we could re-calculate things if needed, but for now just save
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario atualizarBiometria(Long id, Usuario dadosAtualizados) {
        return usuarioRepository.findById(id)
                .map(usuario -> {
                    usuario.setPeso(dadosAtualizados.getPeso());
                    usuario.setAltura(dadosAtualizados.getAltura());
                    usuario.setDataNascimento(dadosAtualizados.getDataNascimento());
                    usuario.setSexo(dadosAtualizados.getSexo());
                    usuario.setNivelAtividade(dadosAtualizados.getNivelAtividade());
                    usuario.setPercentualGordura(dadosAtualizados.getPercentualGordura());
                    usuario.setObjetivoNutricional(dadosAtualizados.getObjetivoNutricional());
                    usuario.setDietaPreferencias(dadosAtualizados.getDietaPreferencias());
                    usuario.setAlergias(dadosAtualizados.getAlergias());
                    return usuarioRepository.save(usuario);
                })
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
    }

    public double calcularTMB(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow();
        int idade = calcularIdade(usuario.getDataNascimento());

        if (usuario.getPercentualGordura() != null && usuario.getPercentualGordura() > 0) {
            return calculadoraService.calcularTMBKatchMcArdle(usuario.getPeso(), usuario.getPercentualGordura());
        }

        return calculadoraService.calcularTMB(usuario.getPeso(), usuario.getAltura(), idade, usuario.getSexo());
    }

    public double calcularGET(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow();
        double tmb = calcularTMB(id);
        return calculadoraService.calcularGET(tmb, usuario.getNivelAtividade());
    }

    private int calcularIdade(java.time.LocalDate dataNascimento) {
        if (dataNascimento == null)
            return 25; // Default if missing
        return java.time.Period.between(dataNascimento, java.time.LocalDate.now()).getYears();
    }
}
