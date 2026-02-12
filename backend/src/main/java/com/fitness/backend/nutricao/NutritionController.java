package com.fitness.backend.nutricao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/nutricao")
@CrossOrigin(origins = "*")
public class NutritionController {

    @Autowired
    private NutritionService nutritionService;

    @GetMapping("/plano/{usuarioId}")
    public ResponseEntity<Map<String, Object>> getPlanoNutricional(@PathVariable("usuarioId") Long usuarioId) {
        try {
            Map<String, Object> plano = nutritionService.gerarPlanoNutricional(usuarioId);
            return ResponseEntity.ok(plano);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
