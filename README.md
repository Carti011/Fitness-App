# Fitness MVP 2.0 🏋️‍♂️🍎

## Sobre o Projeto
O **Fitness MVP 2.0** é uma aplicação web focada em saúde e bem-estar, combinando cálculos biológicos precisos (TMB, GET) com elementos de gamificação para aumentar o engajamento do usuário. O sistema atua como um "Hub de Saúde", gerenciando desde dados antropométricos até planos nutricionais personalizados gerados algoritmicamente.

O objetivo é transformar a jornada de saúde em uma experiência envolvente (estilo RPG/Duolingo), onde o usuário evolui seu "personagem" (sobe de nível, ganha XP) ao manter hábitos saudáveis na vida real.

## 🛠 Tecnologias Utilizadas

### Backend
- **Java 17+**: Linguagem core.
- **Spring Boot 3**: Framework para criação de APIs RESTful robustas.
- **Spring Data JPA**: Camada de persistência de dados.
- **H2 Database**: Banco de dados em memória para desenvolvimento ágil (dados são resetados ao reiniciar).
- **Lombok**: Redução de boilerplate code.

### Frontend
- **React**: Biblioteca para construção de interfaces.
- **Vite**: Build tool rápida e leve.
- **Recharts**: Biblioteca para visualização de dados (gráficos de evolução).
- **Lucide React**: Ícones modernos e consistentes.
- **CSS Modules / Variáveis**: Estilização com tema Dark Mode e Glassmorphism.

## ✨ Funcionalidades Principais

### 1. Núcleo Biológico (BioCore)
- Cálculo automático da **Taxa Metabólica Basal (TMB)** usando fórmulas padrão ouro (Mifflin-St Jeor) e atletas (Katch-McArdle).
- Estimativa de **Gasto Energético Total (GET)** baseado em níveis de atividade dinâmicos.

### 2. Motor de Gamificação
- **Sistema de XP**: Recompensas por atividades registradas.
- **Streak (Ofensiva)**: Monitoramento de consistência (dias consecutivos).
- **Níveis e Ligas**: Progressão visual e competitiva (Bronze, Prata, Ouro).

### 3. Agente de Nutrição Inteligente
- Geração de planos alimentares baseados no objetivo do usuário (Perda de Peso, Hipertrofia, Manutenção).
- Cálculo automático de macronutrientes (Proteínas, Carboidratos, Gorduras).
- Adaptação a preferências alimentares (Vegetariano, Sem Glúten, etc.).

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **Java JDK 17** ou superior.
- **Node.js** (v18 ou superior).
- **Maven** (opcional, o projeto inclui o wrapper `mvnw`).

### Passo 1: Inicializar o Backend
O backend deve estar rodando antes do frontend para que a API esteja disponível.

1. Navegue até o diretório do backend:
   ```bash
   cd backend
   ```
2. Execute a aplicação Spring Boot:
   ```bash
   mvn spring-boot:run
   ```
   *Aguarde a mensagem indicando que o servidor iniciou na porta `8080`.*

### Passo 2: Inicializar o Frontend
1. Abra um novo terminal e navegue até o diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências (caso seja a primeira execução):
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse a aplicação no navegador através do endereço exibido (geralmente `http://localhost:5173`).

## 📚 Documentação da API
Com o backend rodando, você pode acessar o console do banco de dados para inspeção:
- **H2 Console**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:fitnessdb`
- **User**: `SA`
- **Password**: *(vazio)*

## 🔮 Próximos Passos (Roadmap)
- [ ] Integração com APIs de Wearables (Google Fit / Apple Health).
- [ ] Implementação de IA Generativa para sugestão de receitas.
- [ ] Persistência de dados definitiva (PostgreSQL/MySQL).
- [ ] Versão Mobile (React Native).

---
Desenvolvido como projeto MVP para demonstração de arquitetura Fullstack e Gamificação aplicada à Saúde.
