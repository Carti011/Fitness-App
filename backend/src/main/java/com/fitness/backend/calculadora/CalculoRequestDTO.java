package com.fitness.backend.calculadora;

import com.fitness.backend.usuario.NivelAtividade;
import com.fitness.backend.usuario.Sexo;
import lombok.Data;

@Data
public class CalculoRequestDTO {
    private double peso;
    private double altura;
    private int idade;
    private Sexo sexo;
    private NivelAtividade nivelAtividade;
}
