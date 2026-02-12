package com.fitness.backend.nutricao;

import com.fitness.backend.usuario.Usuario;
import com.fitness.backend.usuario.UsuarioRepository;
import com.fitness.backend.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class NutritionService {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Map<String, Object> gerarPlanoNutricional(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        double get = usuarioService.calcularGET(usuarioId);
        String objetivo = usuario.getObjetivoNutricional();
        if (objetivo == null)
            objetivo = "MANTER";

        double caloriasAlvo = get;

        switch (objetivo) {
            case "PERDA_PESO":
                caloriasAlvo -= 500; // Deficit agressivo mas seguro
                break;
            case "GANHO_MASSA":
                caloriasAlvo += 300; // Superavit leve
                break;
            case "MANTER":
            default:
                break;
        }

        // Garantir que não fique abaixo da TMB (perigoso)
        double tmb = usuarioService.calcularTMB(usuarioId);
        if (caloriasAlvo < tmb) {
            caloriasAlvo = tmb;
        }

        // Distribuição de Macros (Simplificada)
        // Proteína: 2g/kg (Se sedentário, talvez menos, mas pra fitness é bom)
        double proteinaG = usuario.getPeso() * 2.0;
        double gorduraG = usuario.getPeso() * 0.8;

        // 1g Prot = 4kcal, 1g Fat = 9kcal
        double calProt = proteinaG * 4;
        double calFat = gorduraG * 9;

        double calCarbo = caloriasAlvo - (calProt + calFat);
        double carboG = calCarbo / 4;

        Map<String, Object> plano = new HashMap<>();
        plano.put("objetivo", objetivo);
        plano.put("caloriasAlvo", Math.round(caloriasAlvo));
        plano.put("proteinaG", Math.round(proteinaG));
        plano.put("carboG", Math.round(carboG));
        plano.put("gorduraG", Math.round(gorduraG));
        plano.put("preferencias", usuario.getDietaPreferencias());
        plano.put("alergias", usuario.getAlergias());

        return plano;
    }
}
