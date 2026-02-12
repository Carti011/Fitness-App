package com.fitness.backend.usuario;

public enum NivelAtividade {
    SEDENTARIO(1.2),
    LEVE(1.375),
    MODERADO(1.55),
    MUITO_ATIVO(1.725),
    EXTREMAMENTE_ATIVO(1.9);

    private final double fator;

    NivelAtividade(double fator) {
        this.fator = fator;
    }

    public double getFator() {
        return fator;
    }
}
