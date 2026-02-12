package com.fitness.backend.calculadora;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculadora")
@CrossOrigin(origins = "*") // Permitir acesso do Frontend React
public class CalculadoraController {

    @Autowired
    private CalculadoraService calculadoraService;

    @PostMapping
    public CalculoResponseDTO calcular(@RequestBody CalculoRequestDTO request) {
        double tmb = calculadoraService.calcularTMB(
                request.getPeso(),
                request.getAltura(),
                request.getIdade(),
                request.getSexo());
        double get = calculadoraService.calcularGET(tmb, request.getNivelAtividade());

        return new CalculoResponseDTO(tmb, get);
    }
}
