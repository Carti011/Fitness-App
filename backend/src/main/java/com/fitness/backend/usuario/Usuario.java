package com.fitness.backend.usuario;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha; // Em prod, usar hash!

    private LocalDate dataNascimento;

    @Enumerated(EnumType.STRING)
    private Sexo sexo;

    private Double peso; // em kg
    private Double altura; // em cm

    @Enumerated(EnumType.STRING)
    private NivelAtividade nivelAtividade;

    // Gamification Stats
    private Integer xp = 0;
    private Integer nivel = 1;
    private Integer ofensiva = 0; // dias consecutivos
}
