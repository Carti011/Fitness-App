package com.fitness.backend.calculadora;

import com.fitness.backend.usuario.Sexo;
import com.fitness.backend.usuario.NivelAtividade;
import org.springframework.stereotype.Service;

@Service
public class CalculadoraService {

    public double calcularTMB(double peso, double altura, int idade, Sexo sexo) {
        // Fórmula de Mifflin-St Jeor
        double tmb = (10 * peso) + (6.25 * altura) - (5 * idade);

        if (sexo == Sexo.MASCULINO) {
            tmb += 5;
        } else {
            tmb -= 161;
        }

        return tmb;
    }

    public double calcularGET(double tmb, NivelAtividade nivelAtividade) {
        return tmb * nivelAtividade.getFator();
    }

    public double calcularTMBKatchMcArdle(double peso, double percentualGordura) {
        double massaMagra = peso * (1 - (percentualGordura / 100));
        return 370 + (21.6 * massaMagra);
    }
}
