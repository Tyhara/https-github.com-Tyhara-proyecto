
import { MapConfig, LevelData, LevelType } from '../types';

export const AVATARS = [
  { 
    id: 'captain_alex', 
    name: 'Capitán Alex', 
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Alexander&backgroundColor=b6e3f4',
    emoji: '🏴‍☠️'
  },
  { 
    id: 'navigator_lisa', 
    name: 'Navegante Lisa', 
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Lisa&backgroundColor=ffdfbf',
    emoji: '🗺️'
  },
  { 
    id: 'buccaneer_max', 
    name: 'Bucanero Max', 
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Max&backgroundColor=c0aede',
    emoji: '⚔️'
  },
  { 
    id: 'gunner_sarah', 
    name: 'Artillera Sarah', 
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah&backgroundColor=ffd5dc',
    emoji: '💣'
  },
  { 
    id: 'scout_ryan', 
    name: 'Vigía Ryan', 
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ryan&backgroundColor=d1d4f9',
    emoji: '🔭'
  },
  { 
    id: 'quartermaster_zoe', 
    name: 'Maestre Zoe', 
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Zoe&backgroundColor=c0aede',
    emoji: '🪙'
  },
  { 
    id: 'corsair_jack', 
    name: 'Corsario Jack', 
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jack&backgroundColor=ffdfbf',
    emoji: '🦜'
  },
  { 
    id: 'raider_mia', 
    name: 'Incursora Mia', 
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mia&backgroundColor=b6e3f4',
    emoji: '⚓'
  },
];

export const MAPS: MapConfig[] = [
  {
    id: 'map_birthday',
    name: 'Cumpleaños de Aventura',
    theme: 'birthday',
    description: 'Aprende necesidades vs deseos.',
    minLevel: 1,
    bgGradient: 'from-green-400 to-sky-300'
  },
  {
    id: 'map_halloween',
    name: 'Halloween del Ahorro',
    theme: 'halloween',
    description: 'Cuidado con los gastos fantasma.',
    minLevel: 1,
    bgGradient: 'from-orange-500 to-purple-800'
  },
  {
    id: 'map_christmas',
    name: 'Navidad Próspera',
    theme: 'christmas',
    description: 'Presupuestos y regalos inteligentes.',
    minLevel: 1,
    bgGradient: 'from-red-500 to-green-800'
  },
  {
    id: 'map_summer',
    name: 'Verano Divertido',
    theme: 'summer',
    description: 'Vacaciones, turismo y ahorro.',
    minLevel: 1,
    bgGradient: 'from-cyan-400 to-blue-600'
  }
];

export const LEVELS: LevelData[] = [
  // --- MAP 1: BIRTHDAY (7 Levels - Frases Cortas) ---
  {
    id: 'lvl_b_1', mapId: 'map_birthday', title: 'Sed vs Juguete', type: LevelType.SCENARIO, difficulty: 'easy', description: 'Priorizar',
    scenario: {
      prompt: "¡Misión 1! Tienes mucha sed y solo $10. ¿Qué compras?",
      options: [
        { text: "Un juguete ($10)", outcome: "¡Error! Sigues con sed y sin dinero.", rewards: { coins: 0, happiness: 10, knowledge: 0 } },
        { text: "Agua ($2)", outcome: "¡Bien! Se quitó la sed y te sobraron $8.", rewards: { coins: 8, happiness: 40, knowledge: 20 } }
      ]
    }
  },
  {
    id: 'lvl_b_2', mapId: 'map_birthday', title: 'Mochila Escolar', type: LevelType.COMPARISON, difficulty: 'easy', description: '¿Cuál dura más?',
    comparison: {
      productA: { name: "Mochila Barata (Mala)", price: 15, stars: 1, icon: "🎒❌" },
      productB: { name: "Mochila Resistente", price: 25, stars: 5, icon: "🎒✅" },
      correctProduct: 'B',
      reason: "¡Exacto! Lo barato sale caro si se rompe rápido."
    }
  },
  {
    id: 'lvl_b_3', mapId: 'map_birthday', title: 'Dinero Extra', type: LevelType.SCENARIO, difficulty: 'easy', description: 'Hábito',
    scenario: {
      prompt: "¡Desafío! Encontraste $5 en tu bolsillo. ¿Qué haces?",
      options: [
        { text: "Compro dulces ya", outcome: "Ups. El dinero desapareció en segundos.", rewards: { coins: 0, happiness: 20, knowledge: 0 } },
        { text: "A la alcancía", outcome: "¡Genio! Tu tesoro sigue creciendo.", rewards: { coins: 5, happiness: 30, knowledge: 30 } }
      ]
    }
  },
  {
    id: 'lvl_b_4', mapId: 'map_birthday', title: 'Regalo de Mamá', type: LevelType.SCENARIO, difficulty: 'medium', description: 'Creatividad',
    scenario: {
      prompt: "Es el cumple de mamá y tienes poco dinero. ¿Qué le das?",
      options: [
        { text: "Algo barato y feo", outcome: "Mala idea. Gastaste y no gustó.", rewards: { coins: -5, happiness: 10, knowledge: 0 } },
        { text: "Una carta hecha a mano", outcome: "¡Perfecto! Es gratis y vale mucho amor.", rewards: { coins: 0, happiness: 50, knowledge: 40 } }
      ]
    }
  },
  {
    id: 'lvl_b_5', mapId: 'map_birthday', title: 'Zapatillas', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Marca vs Calidad',
    comparison: {
      productA: { name: "Marca Famosa", price: 80, stars: 4, icon: "👟🔥" },
      productB: { name: "Marca Normal", price: 40, stars: 4, icon: "👟✨" },
      correctProduct: 'B',
      reason: "¡Bien! Son igual de buenas pero cuestan la mitad."
    }
  },
  {
    id: 'lvl_b_6', mapId: 'map_birthday', title: 'La Bicicleta', type: LevelType.SCENARIO, difficulty: 'medium', description: 'Metas',
    scenario: {
      prompt: "Quieres una bici de $100. Tienes $20. ¿El plan?",
      options: [
        { text: "Pedir prestado", outcome: "No. La deuda te atrapa.", rewards: { coins: 0, happiness: 10, knowledge: 5 } },
        { text: "Ahorrar cada semana", outcome: "¡Sí! La paciencia te dará la bici.", rewards: { coins: 10, happiness: 40, knowledge: 50 } }
      ]
    }
  },
  {
    id: 'lvl_b_7', mapId: 'map_birthday', title: 'Gran Fiesta', type: LevelType.SCENARIO, difficulty: 'hard', description: 'Fin',
    scenario: {
      prompt: "Lograste tus metas. ¿Cómo celebras?",
      options: [
        { text: "Gasto todo en fiesta", outcome: "¡No! Quedaste en cero otra vez.", rewards: { coins: -50, happiness: 50, knowledge: 0 } },
        { text: "Fiesta pequeña", outcome: "¡Sabio! Te diviertes y sigues teniendo ahorros.", rewards: { coins: 0, happiness: 50, knowledge: 50 } }
      ]
    }
  },

  // --- MAP 2: HALLOWEEN (7 Levels - Frases Cortas) ---
  {
    id: 'lvl_h_1', mapId: 'map_halloween', title: 'El Disfraz', type: LevelType.COMPARISON, difficulty: 'easy', description: 'DIY',
    comparison: {
      productA: { name: "Comprado en tienda", price: 50, stars: 3, icon: "🧛‍♂️💲" },
      productB: { name: "Hecho en casa", price: 10, stars: 4, icon: "🧛‍♂️🧵" },
      correctProduct: 'B',
      reason: "¡Eso! Usaste imaginación y ahorraste $40."
    }
  },
  {
    id: 'lvl_h_2', mapId: 'map_halloween', title: 'Gasto Fantasma', type: LevelType.SCENARIO, difficulty: 'easy', description: 'Fugas',
    scenario: {
      prompt: "Te falta dinero. Compras un chicle todos los días. ¿Qué pasa?",
      options: [
        { text: "Un fantasma me roba", outcome: "Falso. Culpa a tus gastos hormiga.", rewards: { coins: 0, happiness: 0, knowledge: 10 } },
        { text: "Gastos pequeños suman", outcome: "¡Correcto! Deja el chicle y tendrás dinero.", rewards: { coins: 5, happiness: 20, knowledge: 40 } }
      ]
    }
  },
  {
    id: 'lvl_h_3', mapId: 'map_halloween', title: 'Oferta Trampa', type: LevelType.SCENARIO, difficulty: 'medium', description: 'Matemáticas',
    scenario: {
      prompt: "Oferta: '10 dulces por $20'. (Sueltos valen $1). ¿Compras?",
      options: [
        { text: "¡Sí, oferta!", outcome: "¡Caíste! 10x1 es 10. Te cobraron el doble.", rewards: { coins: -10, happiness: 0, knowledge: 30 } },
        { text: "No, es trampa", outcome: "¡Muy listo! Calculaste bien.", rewards: { coins: 10, happiness: 30, knowledge: 40 } }
      ]
    }
  },
  {
    id: 'lvl_h_4', mapId: 'map_halloween', title: 'Calabazas', type: LevelType.SCENARIO, difficulty: 'medium', description: 'Inversión',
    scenario: {
      prompt: "¿Qué compras para ganar dinero después?",
      options: [
        { text: "Calabaza decorada ($15)", outcome: "Es un gasto. Se pudre en 3 días.", rewards: { coins: -15, happiness: 20, knowledge: 10 } },
        { text: "Semillas ($2)", outcome: "¡Inversión! Plantas y vendes muchas.", rewards: { coins: 20, happiness: 30, knowledge: 50 } }
      ]
    }
  },
  {
    id: 'lvl_h_5', mapId: 'map_halloween', title: 'Luz Eterna', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Largo plazo',
    comparison: {
      productA: { name: "Usa Pilas (Gasta)", price: 5, stars: 2, icon: "🔦🔋" },
      productB: { name: "Recargable (Ahorra)", price: 15, stars: 5, icon: "🔦⚡" },
      correctProduct: 'B',
      reason: "¡Bien! No gastarás dinero en pilas nunca más."
    }
  },
  {
    id: 'lvl_h_6', mapId: 'map_halloween', title: 'Paciencia', type: LevelType.SCENARIO, difficulty: 'hard', description: 'Espera',
    scenario: {
      prompt: "¿Quieres 1 dulce AHORA o 5 dulces MAÑANA?",
      options: [
        { text: "¡Ahora!", outcome: "Poco premio por impaciente.", rewards: { coins: 1, happiness: 10, knowledge: 0 } },
        { text: "Espero a mañana", outcome: "¡Inversionista! Ganaste 5 veces más.", rewards: { coins: 5, happiness: 40, knowledge: 40 } }
      ]
    }
  },
  {
    id: 'lvl_h_7', mapId: 'map_halloween', title: 'Secreto Final', type: LevelType.SCENARIO, difficulty: 'hard', description: 'Concepto',
    scenario: {
      prompt: "¿Qué hace crecer tu dinero en el banco?",
      options: [
        { text: "El Interés", outcome: "¡Correcto! Es dinero gratis por ahorrar.", rewards: { coins: 50, happiness: 50, knowledge: 50 } },
        { text: "La Magia", outcome: "No. Es matemáticas, no magia.", rewards: { coins: 0, happiness: 0, knowledge: 10 } }
      ]
    }
  },

  // --- MAP 3: CHRISTMAS (7 Levels - Frases Cortas) ---
  {
    id: 'lvl_x_1', mapId: 'map_christmas', title: 'Regalos', type: LevelType.SCENARIO, difficulty: 'easy', description: 'Repartir',
    scenario: {
      prompt: "Tienes $50 para 5 amigos. ¿Qué haces?",
      options: [
        { text: "1 regalo gigante", outcome: "Mal. 4 amigos se quedaron sin nada.", rewards: { coins: 0, happiness: 10, knowledge: 0 } },
        { text: "$10 para cada uno", outcome: "¡Justo! Presupuesto perfecto.", rewards: { coins: 0, happiness: 50, knowledge: 40 } }
      ]
    }
  },
  {
    id: 'lvl_x_2', mapId: 'map_christmas', title: 'Luces LED', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Energía',
    comparison: {
      productA: { name: "Luces Viejas", price: 10, stars: 2, icon: "💡🔥" },
      productB: { name: "Luces LED Ahorro", price: 20, stars: 5, icon: "💡🌱" },
      correctProduct: 'B',
      reason: "¡Sí! Gastas menos electricidad cada mes."
    }
  },
  {
    id: 'lvl_x_3', mapId: 'map_christmas', title: 'Solidaridad', type: LevelType.SCENARIO, difficulty: 'medium', description: 'Dar',
    scenario: {
      prompt: "Hay una colecta de juguetes. ¿Qué haces?",
      options: [
        { text: "Dono uno bueno", outcome: "¡Excelente! Dar te hace rico de corazón.", rewards: { coins: 5, happiness: 100, knowledge: 30 } },
        { text: "No doy nada", outcome: "Ahorraste dinero pero perdiste amigos.", rewards: { coins: 0, happiness: 10, knowledge: 0 } }
      ]
    }
  },
  {
    id: 'lvl_x_4', mapId: 'map_christmas', title: 'La Cena', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Cocinar',
    comparison: {
      productA: { name: "Comprar hecho", price: 100, stars: 4, icon: "🍕🛵" },
      productB: { name: "Cocinar en casa", price: 40, stars: 5, icon: "🥘👨‍🍳" },
      correctProduct: 'B',
      reason: "¡Chef Ahorrador! Ahorraste $60 cocinando tú."
    }
  },
  {
    id: 'lvl_x_5', mapId: 'map_christmas', title: 'Inflación', type: LevelType.SCENARIO, difficulty: 'hard', description: 'Valor',
    scenario: {
      prompt: "Las cosas costarán más el otro año. ¿Dónde guardas tu dinero?",
      options: [
        { text: "Bajo el colchón", outcome: "Mal. Perderá valor.", rewards: { coins: 20, happiness: 20, knowledge: 10 } },
        { text: "En el Banco", outcome: "¡Bien! Gana intereses y no pierde valor.", rewards: { coins: 25, happiness: 30, knowledge: 60 } }
      ]
    }
  },
  {
    id: 'lvl_x_6', mapId: 'map_christmas', title: 'Galletas', type: LevelType.SCENARIO, difficulty: 'hard', description: 'Vender',
    scenario: {
      prompt: "Hacer galletas te costó $5. ¿A cuánto las vendes?",
      options: [
        { text: "A $3", outcome: "¡Pierdes dinero! Mal negocio.", rewards: { coins: -10, happiness: 10, knowledge: 20 } },
        { text: "A $8", outcome: "¡Bien! Cubres el costo y ganas $3.", rewards: { coins: 30, happiness: 40, knowledge: 50 } }
      ]
    }
  },
  {
    id: 'lvl_x_7', mapId: 'map_christmas', title: 'El Final', type: LevelType.SCENARIO, difficulty: 'hard', description: 'Maestro',
    scenario: {
      prompt: "¿Cuál es el secreto de la riqueza?",
      options: [
        { text: "Suerte", outcome: "No. La suerte se acaba.", rewards: { coins: 0, happiness: 0, knowledge: 0 } },
        { text: "Gastar menos de lo que ganas", outcome: "¡CORRECTO! Eres un Maestro Financiero.", rewards: { coins: 100, happiness: 100, knowledge: 100 } }
      ]
    }
  },

  // --- MAP 4: SUMMER (7 Levels - NEW!) ---
  {
    id: 'lvl_s_1', mapId: 'map_summer', title: 'Viaje', type: LevelType.SCENARIO, difficulty: 'easy', description: 'Planear',
    scenario: {
      prompt: "Queremos ir a la playa en verano. ¿Cuándo ahorramos?",
      options: [
        { text: "Una semana antes", outcome: "Muy tarde. No alcanzará.", rewards: { coins: 0, happiness: 10, knowledge: 10 } },
        { text: "Meses antes", outcome: "¡Genial! Planificar hace posible el viaje.", rewards: { coins: 20, happiness: 50, knowledge: 30 } }
      ]
    }
  },
  {
    id: 'lvl_s_2', mapId: 'map_summer', title: 'Bloqueador', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Salud',
    comparison: {
      productA: { name: "Aceite Bronceador", price: 10, stars: 2, icon: "🧴🔥" },
      productB: { name: "Protector Solar", price: 15, stars: 5, icon: "🧴🛡️" },
      correctProduct: 'B',
      reason: "¡Sí! Cuidar tu piel te ahorra medicinas después."
    }
  },
  {
    id: 'lvl_s_3', mapId: 'map_summer', title: 'Recuerdos', type: LevelType.SCENARIO, difficulty: 'medium', description: 'Souvenirs',
    scenario: {
      prompt: "Ves muchos recuerdos caros en la tienda. ¿Qué haces?",
      options: [
        { text: "Compro conchitas", outcome: "Mal. Las puedes juntar gratis en la arena.", rewards: { coins: -10, happiness: 20, knowledge: 0 } },
        { text: "Saco fotos", outcome: "¡El mejor recuerdo! Y es gratis.", rewards: { coins: 10, happiness: 50, knowledge: 40 } }
      ]
    }
  },
  {
    id: 'lvl_s_4', mapId: 'map_summer', title: 'Hotel', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Alojamiento',
    comparison: {
      productA: { name: "Hotel 5 Estrellas", price: 200, stars: 5, icon: "🏨💸" },
      productB: { name: "Camping Familiar", price: 30, stars: 4, icon: "⛺🔥" },
      correctProduct: 'B',
      reason: "¡Aventura! El camping es divertido y ahorras muchísimo."
    }
  },
  {
    id: 'lvl_s_5', mapId: 'map_summer', title: 'Sed Playera', type: LevelType.SCENARIO, difficulty: 'hard', description: 'Reutilizar',
    scenario: {
      prompt: "Hace calor. ¿Cómo llevas agua a la playa?",
      options: [
        { text: "Compro botellas allá", outcome: "¡Carísimo! Y contaminas.", rewards: { coins: -10, happiness: 10, knowledge: 0 } },
        { text: "Termo recargable", outcome: "¡Excelente! Agua fría todo el día y gratis.", rewards: { coins: 15, happiness: 40, knowledge: 50 } }
      ]
    }
  },
  {
    id: 'lvl_s_6', mapId: 'map_summer', title: 'Helados', type: LevelType.COMPARISON, difficulty: 'hard', description: 'Casero',
    comparison: {
      productA: { name: "Helado de Marca", price: 5, stars: 4, icon: "🍦🏪" },
      productB: { name: "Helado Casero", price: 1, stars: 5, icon: "🍦🏠" },
      correctProduct: 'B',
      reason: "¡Rico y sano! Hacer helado es divertido y barato."
    }
  },
  {
    id: 'lvl_s_7', mapId: 'map_summer', title: 'Vuelta a Casa', type: LevelType.SCENARIO, difficulty: 'hard', description: 'Balance',
    scenario: {
      prompt: "Terminó el viaje. ¿Te quedó dinero?",
      options: [
        { text: "No, pedí prestado", outcome: "¡Oh no! Volviste con deudas.", rewards: { coins: -20, happiness: 10, knowledge: 10 } },
        { text: "Sí, me sobró un poco", outcome: "¡Campeón! Listo para la próxima aventura.", rewards: { coins: 50, happiness: 100, knowledge: 60 } }
      ]
    }
  },

  // --- MINIGAME LEVELS: COMPARAHORRO (30 Visual Levels) ---
  {
    id: 'mg_comp_1', mapId: '', title: 'Jugo', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Volumen',
    comparison: { productA: { name: "Cajita Chica", price: 2, stars: 3, icon: "🧃" }, productB: { name: "Botella Grande", price: 6, stars: 4, icon: "🍼" }, correctProduct: 'B', reason: "La grande rinde 5 veces más por menos precio." }
  },
  {
    id: 'mg_comp_2', mapId: '', title: 'Videojuego', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Espera',
    comparison: { productA: { name: "Estreno Hoy", price: 60, stars: 5, icon: "🎮🔥" }, productB: { name: "Esperar 3 meses", price: 30, stars: 5, icon: "🎮📉" }, correctProduct: 'B', reason: "¡Mismo juego a mitad de precio!" }
  },
  {
    id: 'mg_comp_3', mapId: '', title: 'Merienda', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Salud',
    comparison: { productA: { name: "Papas Fritas", price: 5, stars: 1, icon: "🍟" }, productB: { name: "Manzana", price: 1, stars: 5, icon: "🍎" }, correctProduct: 'B', reason: "Más barato y más sano. Doble ganancia." }
  },
  {
    id: 'mg_comp_4', mapId: '', title: 'Cuaderno', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Diseño',
    comparison: { productA: { name: "Con Dibujos", price: 12, stars: 3, icon: "📒✨" }, productB: { name: "Color Liso", price: 4, stars: 3, icon: "📓" }, correctProduct: 'B', reason: "¡Ahorras $8! Puedes dibujar tú la portada." }
  },
  {
    id: 'mg_comp_5', mapId: '', title: 'Ropa', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Marca',
    comparison: { productA: { name: "Solo la Marca", price: 40, stars: 3, icon: "👕🏷️" }, productB: { name: "Buena Tela", price: 15, stars: 5, icon: "👕🧵" }, correctProduct: 'B', reason: "Pagas calidad, no publicidad." }
  },
  {
    id: 'mg_comp_6', mapId: '', title: 'Transporte', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Compartir',
    comparison: { productA: { name: "Taxi Solo", price: 100, stars: 5, icon: "🚕" }, productB: { name: "Bus Escolar", price: 30, stars: 4, icon: "🚌" }, correctProduct: 'B', reason: "Compartir viaje ahorra mucho dinero." }
  },
  {
    id: 'mg_comp_7', mapId: '', title: 'Regalo', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Manualidad',
    comparison: { productA: { name: "Juguete Plástico", price: 25, stars: 2, icon: "🤖" }, productB: { name: "Álbum de Fotos", price: 8, stars: 5, icon: "📸" }, correctProduct: 'B', reason: "Los recuerdos valen más que el plástico." }
  },
  {
    id: 'mg_comp_8', mapId: '', title: 'Cine', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Día Barato',
    comparison: { productA: { name: "Sábado (Caro)", price: 15, stars: 5, icon: "🎟️💲" }, productB: { name: "Miércoles (Oferta)", price: 7, stars: 5, icon: "🎟️📉" }, correctProduct: 'B', reason: "Misma película, mitad de precio." }
  },
  {
    id: 'mg_comp_9', mapId: '', title: 'Libros', type: LevelType.COMPARISON, difficulty: 'hard', description: 'Biblioteca',
    comparison: { productA: { name: "Comprar Nuevo", price: 20, stars: 5, icon: "📕" }, productB: { name: "Biblioteca Gratis", price: 0, stars: 5, icon: "🏫" }, correctProduct: 'B', reason: "¡Lectura gratis e infinita!" }
  },
  {
    id: 'mg_comp_10', mapId: '', title: 'Audífonos', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Calidad',
    comparison: { productA: { name: "Muy Baratos", price: 5, stars: 1, icon: "🎧🗑️" }, productB: { name: "Buenos", price: 25, stars: 4, icon: "🎧✅" }, correctProduct: 'B', reason: "Los baratos se rompen. Lo bueno dura." }
  },
  {
    id: 'mg_comp_11', mapId: '', title: 'Mascota', type: LevelType.COMPARISON, difficulty: 'hard', description: 'Adopción',
    comparison: { productA: { name: "Comprar", price: 500, stars: 5, icon: "🐕💰" }, productB: { name: "Adoptar", price: 20, stars: 5, icon: "🐕🏠" }, correctProduct: 'B', reason: "Adoptar es un acto de amor y ahorro." }
  },
  {
    id: 'mg_comp_12', mapId: '', title: 'Juegos', type: LevelType.COMPARISON, difficulty: 'hard', description: 'Usado',
    comparison: { productA: { name: "Nuevo", price: 400, stars: 5, icon: "💿✨" }, productB: { name: "Usado Garantizado", price: 250, stars: 4, icon: "💿♻️" }, correctProduct: 'B', reason: "Funciona igual y te sobra dinero." }
  },
  {
    id: 'mg_comp_13', mapId: '', title: 'Agua', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Reutilizar',
    comparison: { productA: { name: "Botella Plástico", price: 2, stars: 3, icon: "🥤" }, productB: { name: "Botella Tuya", price: 0, stars: 5, icon: "🍶" }, correctProduct: 'B', reason: "Cuidas el planeta y tu bolsillo." }
  },
  {
    id: 'mg_comp_14', mapId: '', title: 'Tarjeta', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Arte',
    comparison: { productA: { name: "Comprada", price: 5, stars: 3, icon: "🃏" }, productB: { name: "Dibujada", price: 0, stars: 5, icon: "🎨" }, correctProduct: 'B', reason: "Tu arte es único y gratis." }
  },
  {
    id: 'mg_comp_15', mapId: '', title: 'Helado', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Local',
    comparison: { productA: { name: "Industrial", price: 8, stars: 3, icon: "🍦🏭" }, productB: { name: "Artesanal", price: 6, stars: 5, icon: "🍦🏠" }, correctProduct: 'B', reason: "Más rico, más sano y apoyas al vecino." }
  },
  {
    id: 'mg_comp_16', mapId: '', title: 'Pack Yogurt', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Por Mayor',
    comparison: { productA: { name: "1 Unidad", price: 2, stars: 4, icon: "🥣" }, productB: { name: "Pack de 6", price: 9, stars: 4, icon: "📦" }, correctProduct: 'B', reason: "¡Matemáticas! El pack baja el precio a $1.50 cada uno." }
  },
  {
    id: 'mg_comp_17', mapId: '', title: 'Reparar Juguete', type: LevelType.COMPARISON, difficulty: 'hard', description: 'Arreglar',
    comparison: { productA: { name: "Comprar Nuevo", price: 50, stars: 5, icon: "🚂✨" }, productB: { name: "Herramientas", price: 10, stars: 4, icon: "🔧" }, correctProduct: 'B', reason: "Arreglar lo viejo ahorra mucho dinero y reduce basura." }
  },
  {
    id: 'mg_comp_18', mapId: '', title: 'Fruta', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Temporada',
    comparison: { productA: { name: "Fuera de temporada", price: 8, stars: 3, icon: "🍉❄️" }, productB: { name: "De temporada", price: 3, stars: 5, icon: "🍉☀️" }, correctProduct: 'B', reason: "La fruta de temporada es más rica y barata." }
  },
  {
    id: 'mg_comp_19', mapId: '', title: 'Entradas Cine', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Anticipación',
    comparison: { productA: { name: "En Puerta", price: 12, stars: 4, icon: "🎟️🏃" }, productB: { name: "Online Antes", price: 8, stars: 4, icon: "🎟️💻" }, correctProduct: 'B', reason: "Planificar y comprar antes suele tener descuento." }
  },
  {
    id: 'mg_comp_20', mapId: '', title: 'Comida Cine', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Ahorro Extra',
    comparison: { productA: { name: "Comprar ahí", price: 20, stars: 4, icon: "🍿💲" }, productB: { name: "Traer de casa", price: 5, stars: 4, icon: "🍿🏠" }, correctProduct: 'B', reason: "La comida del cine es muy cara. ¡Trae la tuya!" }
  },
  // NEW LEVELS (21-30)
  {
    id: 'mg_comp_21', mapId: '', title: 'Cepillo Dientes', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Bambú',
    comparison: { productA: { name: "Plástico", price: 2, stars: 2, icon: "🪥" }, productB: { name: "Bambú", price: 3, stars: 5, icon: "🎍" }, correctProduct: 'B', reason: "Dura más y no contamina el océano." }
  },
  {
    id: 'mg_comp_22', mapId: '', title: 'Pizza', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Delivery',
    comparison: { productA: { name: "Pedir a Domicilio", price: 15, stars: 5, icon: "🍕🛵" }, productB: { name: "Congelada Súper", price: 5, stars: 4, icon: "🍕🧊" }, correctProduct: 'B', reason: "Casi igual de rica, pero ahorras $10." }
  },
  {
    id: 'mg_comp_23', mapId: '', title: 'Pilas', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Duración',
    comparison: { productA: { name: "Comunes (x4)", price: 4, stars: 2, icon: "🔋" }, productB: { name: "Recargables (x2)", price: 12, stars: 5, icon: "⚡" }, correctProduct: 'B', reason: "Inversión inicial alta, pero duran años." }
  },
  {
    id: 'mg_comp_24', mapId: '', title: 'Cereal', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Marca Propia',
    comparison: { productA: { name: "Marca Famosa", price: 6, stars: 4, icon: "🥣🐯" }, productB: { name: "Marca del Súper", price: 3, stars: 4, icon: "🥣🛒" }, correctProduct: 'B', reason: "Es el mismo cereal en otra caja." }
  },
  {
    id: 'mg_comp_25', mapId: '', title: 'Jardín', type: LevelType.COMPARISON, difficulty: 'hard', description: 'Agua',
    comparison: { productA: { name: "Pasto Inglés", price: 50, stars: 5, icon: "🌱💧" }, productB: { name: "Cactus/Suculentas", price: 20, stars: 5, icon: "🌵☀️" }, correctProduct: 'B', reason: "Ahorras muchísimo dinero en agua de riego." }
  },
  {
    id: 'mg_comp_26', mapId: '', title: 'Limpieza', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Vinagre',
    comparison: { productA: { name: "Limpiador Químico", price: 8, stars: 4, icon: "🧪" }, productB: { name: "Vinagre y Bicarbonato", price: 1, stars: 5, icon: "🍋" }, correctProduct: 'B', reason: "El truco de la abuela: Barato y ecológico." }
  },
  {
    id: 'mg_comp_27', mapId: '', title: 'Café', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Cafetería',
    comparison: { productA: { name: "Café de Sirena", price: 5, stars: 5, icon: "☕🧜‍♀️" }, productB: { name: "Termo de Casa", price: 0.5, stars: 4, icon: "☕🏠" }, correctProduct: 'B', reason: "Si tomas café diario, ahorras $100 al mes." }
  },
  {
    id: 'mg_comp_28', mapId: '', title: 'Muebles', type: LevelType.COMPARISON, difficulty: 'hard', description: 'Restaurar',
    comparison: { productA: { name: "Comprar Nuevo", price: 300, stars: 5, icon: "🪑✨" }, productB: { name: "Lijar y Pintar", price: 30, stars: 5, icon: "🪑🎨" }, correctProduct: 'B', reason: "Tu mueble viejo queda como nuevo." }
  },
  {
    id: 'mg_comp_29', mapId: '', title: 'Ejercicio', type: LevelType.COMPARISON, difficulty: 'medium', description: 'Gimnasio',
    comparison: { productA: { name: "Membresía Gym", price: 40, stars: 5, icon: "🏋️‍♂️" }, productB: { name: "Correr en Parque", price: 0, stars: 5, icon: "🏃‍♂️🌳" }, correctProduct: 'B', reason: "El parque es gratis y tiene aire puro." }
  },
  {
    id: 'mg_comp_30', mapId: '', title: 'Coche', type: LevelType.COMPARISON, difficulty: 'easy', description: 'Lavado',
    comparison: { productA: { name: "Autolavado", price: 15, stars: 5, icon: "🚗🚿" }, productB: { name: "Lavarlo tú", price: 1, stars: 4, icon: "🚗🧽" }, correctProduct: 'B', reason: "Haces ejercicio y ahorras dinero." }
  }
];
