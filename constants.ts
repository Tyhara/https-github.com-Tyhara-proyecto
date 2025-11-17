

import { StoryLevel, ComparisonLevel, Question, AdventureMapData } from './types';

export const AVATAR_OPTIONS = [
  '/imagenes/avatar-1.png',
  '/imagenes/avatar-2.png',
  '/imagenes/avatar-3.png',
  '/imagenes/avatar-4.png',
  '/imagenes/avatar-5.png',
  '/imagenes/avatar-6.png',
  '/imagenes/avatar-7.png',
  '/imagenes/avatar-8.png',
  '/imagenes/avatar-9.png',
  '/imagenes/avatar-10.png',
  '/imagenes/avatar-11.png',
  '/imagenes/avatar-12.png',
  '/imagenes/avatar-13.png',
  '/imagenes/avatar-14.png',
  '/imagenes/avatar-15.png',
  '/imagenes/avatar-16.png',
  '/imagenes/avatar-17.png',
  '/imagenes/avatar-18.png',
  '/imagenes/avatar-19.png',
  '/imagenes/avatar-20.png',
];

export const DAILY_REWARDS = [10, 15, 20, 25, 30, 40, 100]; // Rewards for day 1 through 7

const createScenarioQuestion = (scenarioText: string, questionText: string, goodChoice: string, badChoice: string): Question => ({
    type: 'scenario' as const,
    scenario: scenarioText,
    question: questionText,
    options: [
      { text: badChoice, outcome: "Recuerda pensar en tus metas de ahorro a largo plazo.", effects: { score: -10, happiness: 5, knowledge: -10 } },
      { text: goodChoice, outcome: "¡Excelente decisión! Estás pensando como un verdadero maestro del ahorro.", effects: { score: 10, happiness: 10, knowledge: 10 } }
    ]
});


// --- MAPAS DE AVENTURA ---

export const ADVENTURE_MAPS: AdventureMapData[] = [
    {
        id: 'birthday',
        name: 'Cumpleaños de la Aventura',
        theme: 'birthday',
        backgroundImage: '/imagenes/mapa-aventura-final.png',
        levels: [
            {
                title: "El Regalo Misterioso",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "¡Es tu cumpleaños! Recibes 10 monedas, pero ves un juguete increíble. ¿Qué es más importante ahora mismo?",
                questions: [
                    createScenarioQuestion("Un vendedor te ofrece un juguete por 8 de tus 10 monedas.", "¿Qué haces?", "Guardar las monedas", "Comprar el juguete"),
                    createScenarioQuestion("En la tienda ves leche (necesidad) y un cómic (deseo). Ambas cuestan lo mismo.", "¿Qué compras?", "Compro la leche", "Compro el cómic"),
                ]
            },
            {
                title: "La Lista de Deseos",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Para conseguir los mejores regalos, ¡necesitas un plan! Fijar una meta es el primer paso.",
                questions: [
                    createScenarioQuestion("Fíjate una meta: quieres un libro que cuesta 20 monedas. Hoy puedes ahorrar 5 o comprar un dulce por 3.", "¿Qué eliges?", "Ahorrar 5 monedas", "Comprar el dulce"),
                    createScenarioQuestion("Puedes ordenar tu cuarto por 5 monedas o jugar videojuegos.", "¿Qué haces?", "Ordenar mi cuarto", "Jugar videojuegos"),
                ]
            },
            {
                title: "La Alcancía Mágica",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Tu dinero necesita un lugar seguro para crecer. ¿Cuál es el mejor escondite para tus tesoros?",
                questions: [
                    createScenarioQuestion("Tienes 15 monedas. ¿Dónde es más seguro guardarlas?", "¿Cuál eliges?", "En una alcancía", "Debajo de la cama"),
                    createScenarioQuestion("Puedes depositar 10 monedas en el 'Banco MonedAventura' digital y seguro.", "¿Lo haces?", "Sí, deposito mis monedas", "No, prefiero tenerlas a mano"),
                ]
            },
            {
                title: "El Valor de las Cosas",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "No todo lo que brilla es oro. Aprende a comparar y a elegir lo que es mejor para tu bolsillo.",
                questions: [
                     createScenarioQuestion("Hay dos manzanas. Una grande por 10 monedas y una pequeña por 5.", "¿Cuál es mejor para tu dinero?", "La pequeña, me sobra para ahorrar", "La grande, aunque gaste más"),
                     createScenarioQuestion("Se rompe tu lápiz favorito. Arreglarlo cuesta 5 monedas.", "¿Qué haces?", "Lo arreglo ahora", "Uso otro lápiz"),
                ]
            },
            {
                title: "El Secreto del Ahorro",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "El verdadero poder del ahorro está en la constancia. ¡Cada pequeña moneda cuenta!",
                questions: [
                    createScenarioQuestion("El ahorro crece con constancia. Cada día encuentras 2 monedas. Un amigo te pide prestada una moneda para un chicle.", "¿Se la prestas?", "Explico que estoy ahorrando", "Le presto la moneda"),
                    createScenarioQuestion("Sales de tu cuarto y dejas la luz encendida.", "¿Qué deberías hacer?", "Apagar la luz", "Dejarla encendida"),
                ]
            },
            {
                title: "Ayudando a los Demás",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Ser próspero también significa compartir. ¿Estás listo para hacer una buena acción?",
                questions: [
                    // FIX: Added the missing 4th argument ("bad choice") to the createScenarioQuestion function call.
                    createScenarioQuestion("Tienes 20 monedas. Puedes donar 5 a una causa benéfica.", "¿Donas?", "Sí, dono 5 monedas", "No, me lo guardo todo"),
                ]
            },
            {
                title: "La Recompensa Final",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "¡Lo lograste! Con esfuerzo y paciencia, has reunido las 50 monedas para tu gran meta: ¡el libro de aventuras! Ahora, en la tienda, te enfrentas a una última decisión.",
                questions: [
                     createScenarioQuestion("Frente a ti está el libro que tanto querías. Justo al lado, ves un nuevo videojuego en oferta que todos tus amigos están comentando. Cuesta un poco menos.", "¿Qué te dará más felicidad a largo plazo?", "Comprar el libro. ¡La satisfacción de cumplir mi meta no tiene precio!", "Comprar el videojuego. ¡La oferta es ahora y no quiero quedarme fuera!"),
                ]
            }
        ]
    },
    {
        id: 'halloween',
        name: 'Halloween del Ahorro',
        theme: 'halloween',
        backgroundImage: '/imagenes/mapa-halloween.png',
        unlockRequirement: 'Completa el mapa de Cumpleaños',
        levels: [
             {
                title: "El Disfraz Perfecto",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "¡Se acerca Halloween! Necesitas un disfraz. ¿Lo compras hecho o usas tu creatividad para ahorrar?",
                questions: [
                     createScenarioQuestion("Necesitas una mochila. Una cuesta 40 y durará un año. Otra cuesta 25 y durará 6 meses.", "¿Cuál es la mejor compra a largo plazo?", "La de 40 monedas", "La de 25 monedas"),
                     createScenarioQuestion("Puedes hacer una tarea grande por 25 monedas o tres pequeñas por 5 cada una.", "¿Qué opción es más eficiente?", "La tarea grande", "Las tres pequeñas"),
                ]
            },
            {
                title: "El Trato o Truco",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Algunas ofertas parecen dulces, pero esconden un truco. ¡Aprende a identificarlas!",
                questions: [
                    createScenarioQuestion("Analiza el costo de oportunidad. Tienes 50 monedas. Te ofrecen un coleccionable raro por 45.", "¿Qué haces?", "Guardo y espero una mejor oportunidad", "Compro el coleccionable"),
                    createScenarioQuestion("Un producto cuesta 50 monedas. Hay una oferta de '2x1' por 90 monedas.", "¿Es una buena oferta?", "Sí, ahorro 10 monedas", "No, es más caro"),
                ]
            },
            {
                title: "La Casa Embrujada del Gasto",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "¡Cuidado con los gastos fantasma! Son pequeños, pero juntos pueden darte un buen susto.",
                questions: [
                    createScenarioQuestion("Planifica a mediano plazo. Quieres una patineta de 100 monedas. Puedes ahorrar 20 esta semana o ir al cine por 15.", "¿Qué haces?", "Ahorro las 20 monedas", "Voy al cine"),
                    createScenarioQuestion("Puedes comprar una botella de agua reutilizable por 20 monedas o botellas de plástico por 5 cada semana.", "¿Qué es más económico y ecológico?", "La botella reutilizable", "Las botellas de plástico"),
                ]
            },
            {
                title: "El Caldero de los Intereses",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "El interés es como una poción mágica que hace crecer tu dinero. ¿La usarás a tu favor?",
                questions: [
                    createScenarioQuestion("Comprende los instrumentos de ahorro. Puedes guardar tu dinero en una alcancía o en una 'cuenta de ahorro' que te da intereses.", "¿Qué eliges?", "La cuenta de ahorro", "La alcancía"),
                    createScenarioQuestion("La constancia genera interés. Cada día que ahorras, ganas 1 moneda extra. Hoy puedes ahorrar 10 o gastar 8 en una revista.", "¿Priorizas el ahorro?", "Sí, para ganar la moneda extra", "Compro la revista"),
                ]
            },
            {
                title: "El Fantasma del Fraude",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "No todos los espíritus son amistosos. Aprende a proteger tu tesoro de los engaños digitales.",
                questions: [
                    createScenarioQuestion("Quieres comprar un objeto online que cuesta 30 monedas. Debes hacer una transferencia.", "¿La realizas de forma segura?", "Sí, verifico la página antes", "Pongo mis datos sin mirar"),
                    createScenarioQuestion("Recibes un correo sospechoso pidiendo los datos de tu 'Banco MonedAventura'.", "¿Qué haces?", "Lo ignoro y lo reporto", "Doy mis datos"),
                ]
            },
            {
                title: "La Cripta de la Inversión",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Invertir es plantar una semilla para que crezca un árbol de monedas. ¿Te atreves a plantar la tuya?",
                questions: [
                    // FIX: Added the missing 4th argument ("bad choice") to the createScenarioQuestion function call.
                    createScenarioQuestion("Para tu meta final, necesitas 200. Tienes 150. Puedes invertir 20 con un riesgo bajo.", "¿Inviertes una parte?", "Sí, para que mi dinero crezca", "No, me quedo con lo que tengo"),
                ]
            },
            {
                title: "El Tesoro de Medianoche",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Has superado todos los sustos. Ahora, demuestra tu valentía con una última decisión financiera.",
                questions: [
                    createScenarioQuestion("Crea un fondo de emergencia. Tienes 100 de ahorro. Surge un gasto inesperado de 30.", "¿Usas tu fondo de emergencia?", "Sí, para eso está", "Pido un préstamo"),
                ]
            }
        ]
    },
    {
        id: 'christmas',
        name: 'Navidad Próspera',
        theme: 'christmas',
        backgroundImage: '/imagenes/mapa-navidad.png',
        unlockRequirement: 'Completa el mapa de Halloween',
        levels: [
             {
                title: "El Taller de Santa",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "¡Es Navidad! Tienes una lista de regalos que hacer. ¿Cómo organizarás tu presupuesto?",
                questions: [
                    createScenarioQuestion("Evalúa riesgo vs. recompensa. Tienes 100 monedas. Te ofrecen una herramienta por 70 que podría (o no) ayudarte a encontrar más tesoros.", "¿Inviertes?", "No, prefiero asegurar mi capital", "Sí, me arriesgo"),
                    createScenarioQuestion("Establece metas complejas. Quieres un viaje de 500 en 6 meses. Creas un plan de ahorro mensual de 85.", "¿Te apegas al plan?", "Sí, soy disciplinado", "Gasto en otras cosas"),
                ]
            },
            {
                title: "La Estrella del Presupuesto",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Un presupuesto es tu estrella guía. Te mostrará el camino para que no te falte nada en estas fiestas.",
                questions: [
                    createScenarioQuestion("Entiende el interés compuesto. Tu dinero en el 'Banco del Bosque' crece un 10% cada mes. Dejas 100 por dos meses.", "¿Calculas la ganancia? (121)", "Sí, entiendo el interés compuesto", "No, esperaba solo 120"),
                    createScenarioQuestion("Distingue productos financieros. Te ofrecen una cuenta de ahorro (segura) y un fondo de inversión (riesgo).", "¿Dónde pones la mayoría de tus ahorros?", "En la cuenta de ahorro", "En el fondo de inversión"),
                ]
            },
            {
                title: "El Grinch de la Inflación",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Hay un Grinch invisible que hace que tu dinero valga menos con el tiempo. ¡Aprende a combatirlo!",
                questions: [
                    createScenarioQuestion("Guardaste 100 monedas. Un año después, las cosas cuestan un 10% más por la inflación.", "¿Tu dinero vale lo mismo?", "No, perdí poder de compra", "Sí, siguen siendo 100 monedas"),
                    createScenarioQuestion("Analiza el costo-beneficio. Un dispositivo cuesta 300 y dura 3 años. Otro cuesta 200 y dura 1.5 años.", "¿Cuál tiene mejor valor?", "El de 300", "El de 200"),
                ]
            },
            {
                title: "Regalos con Valor",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "El mejor regalo no siempre es el más caro. ¿Qué es más valioso, un objeto o una experiencia?",
                questions: [
                    createScenarioQuestion("Genera ingresos pasivos. Puedes usar tus ahorros para comprar una máquina que genera 5 monedas al día. Cuesta 100.", "¿La compras?", "Sí, para generar ingresos pasivos", "No, prefiero gastar el dinero"),
                    createScenarioQuestion("Puedes invertir en una empresa que cuida el medio ambiente o en una que contamina pero da más ganancias.", "¿Cuál eliges?", "La empresa ecológica", "La que da más ganancias"),
                ]
            },
            {
                title: "El Espíritu de la Solidaridad",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "La Navidad es para compartir. Una pequeña parte de tu tesoro puede hacer muy feliz a alguien.",
                questions: [
                    // FIX: Added the missing 4th argument ("bad choice") to the createScenarioQuestion function call.
                    createScenarioQuestion("Te ofrecen un 'seguro' para tu bicicleta por 10 monedas al mes. Si se rompe, la reparación es gratis.", "¿Lo contratas?", "Sí, para estar protegido", "No, es un gasto innecesario"),
                ]
            },
            {
                title: "La Cena Familiar",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Organizar la cena de Navidad es un trabajo en equipo. ¡Aprende sobre economía familiar!",
                questions: [
                    // FIX: Added the missing 4th argument ("bad choice") to the createScenarioQuestion function call.
                    createScenarioQuestion("Instalar un panel solar en tu casa cuesta 200, pero te ahorra 20 al mes en energía.", "¿Es una buena inversión?", "Sí, se paga solo en 10 meses", "No, es muy caro al principio"),
                ]
            },
            {
                title: "Un Futuro Próspero",
                guide: { name: "Genio del Ahorro", avatar: "guide_genie.png" },
                introduction: "Has completado todos los mapas. ¡Ahora tienes las herramientas para un futuro brillante y próspero!",
                questions: [
                    createScenarioQuestion("Para tu meta final, distribuyes tu dinero: 60% en ahorro seguro, 30% en inversión moderada y 10% en alto riesgo.", "¿Es una estrategia inteligente?", "Sí, diversificar es clave", "No, pongo todo en alto riesgo"),
                ]
            }
        ]
    }
];



// --- NIVELES DE COMPARAHORRO POR DIFICULTAD ---

export const COMPARAHORRO_LEVELS_BEGINNER: ComparisonLevel[] = [
  { 
    id: 'B1', 
    title: 'Lápices para Dibujar', 
    objective: 'A veces, pagar un poco más significa que tus cosas durarán más.', 
    objects: [
      { name: 'Lápiz Barato', cost: 5, durability: 1, imageUrl: 'comparahorro-lapiz-barato.png' }, 
      { name: 'Lápiz Reforzado', cost: 10, durability: 4, imageUrl: 'comparahorro-lapiz-reforzado.png' }
    ], 
    correctChoiceIndex: 1, 
    explanation: '¡Buena vista! El lápiz reforzado dura mucho más, así que no tendrás que comprar otro tan pronto. ¡Pagar un poco más al principio es un gran ahorro!', 
    reward: 5 
  },
  { 
    id: 'B2', 
    title: 'Juguetes Divertidos', 
    objective: 'Elige el juguete que te dará más horas de diversión.', 
    objects: [
      { name: 'Carrito de Plástico', cost: 15, durability: 4, imageUrl: 'comparahorro-carrito.png' }, 
      { name: 'Pelota de Goma', cost: 10, durability: 2, imageUrl: 'comparahorro-pelota.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Exacto! El carrito es más resistente y te durará mucho más tiempo que la pelota, que podría pincharse. ¡Más juego por tus monedas!', 
    reward: 5 
  },
  { 
    id: 'B3', 
    title: 'Fruta Fresca', 
    objective: 'Piensa en cuánto tiempo te durará la comida antes de malograrse.', 
    objects: [
      { name: 'Manzana Roja', cost: 5, durability: 5, imageUrl: 'comparahorro-manzana.png' }, 
      { name: 'Plátano Maduro', cost: 3, durability: 2, imageUrl: 'comparahorro-platano.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Inteligente! La manzana se mantiene fresca por mucho más tiempo. El plátano es rico, pero hay que comerlo rápido. ¡Evitaste que la comida se desperdicie!', 
    reward: 5 
  },
  { 
    id: 'B4', 
    title: 'Ropa para Jugar', 
    objective: 'Una polera resistente aguantará todas tus aventuras.', 
    objects: [
      { name: 'Polera de Algodón', cost: 20, durability: 4, imageUrl: 'comparahorro-polera-algodon.png' }, 
      { name: 'Polera Sintética', cost: 15, durability: 2, imageUrl: 'comparahorro-polera-sintetica.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Bien pensado! La polera de algodón es de mejor calidad y no se romperá tan fácilmente como la sintética. ¡Calidad es ahorro!', 
    reward: 5 
  },
  { 
    id: 'B5', 
    title: 'Mochila para la Escuela', 
    objective: 'Necesitas una mochila que pueda llevar todos tus tesoros (y libros).', 
    objects: [
      { name: 'Mochila Reforzada', cost: 30, durability: 5, imageUrl: 'comparahorro-mochila-reforzada.png' }, 
      { name: 'Mochila Simple', cost: 20, durability: 3, imageUrl: 'comparahorro-mochila-simple.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Decisión de campeón! La mochila reforzada aguanta mucho más peso y durará todo el año escolar. ¡Una excelente inversión!', 
    reward: 5 
  },
  {
    id: 'B6',
    title: 'Colación de Media Tarde',
    objective: 'Elige la opción que es mejor para tu salud y tu energía a largo plazo.',
    objects: [
      { name: 'Papas Fritas', cost: 12, durability: 1, imageUrl: 'comparahorro-papas-fritas.png' },
      { name: 'Mix de Frutos Secos', cost: 15, durability: 5, imageUrl: 'comparahorro-frutos-secos.png' }
    ],
    correctChoiceIndex: 1,
    explanation: '¡Elección de campeón! Los frutos secos te dan energía por más tiempo y son más sanos. ¡Cuidar tu cuerpo también es una forma de ahorrar en el futuro!',
    reward: 5
  },
  {
    id: 'B7',
    title: 'Lápices de Colores',
    objective: 'A veces, comprar más cantidad de una vez puede ser más barato.',
    objects: [
      { name: 'Caja con 12 Lápices', cost: 25, durability: 4, imageUrl: 'comparahorro-caja-lapices.png' },
      { name: '3 Lápices Sueltos', cost: 10, durability: 4, imageUrl: 'comparahorro-lapices-sueltos.png' }
    ],
    correctChoiceIndex: 0,
    explanation: '¡Muy bien! Comprando la caja, cada lápiz te cuesta poco más de 2 monedas, mientras que sueltos cuestan más de 3 cada uno. ¡Comprar al por mayor ahorra dinero!',
    reward: 5
  },
  {
    id: 'B8',
    title: 'Limpieza en Casa',
    objective: 'Pequeñas acciones diarias pueden significar un gran ahorro.',
    objects: [
      { name: 'Dejar la llave abierta', cost: 5, durability: 1, imageUrl: 'comparahorro-llave-abierta.png' },
      { name: 'Cerrar la llave al lavar', cost: 1, durability: 5, imageUrl: 'comparahorro-llave-cerrada.png' }
    ],
    correctChoiceIndex: 1,
    explanation: '¡Exacto! Cada gota cuenta. Cerrar la llave mientras te enjabonas las manos o lavas los platos ahorra muchísima agua, y eso se nota en la cuenta a fin de mes.',
    reward: 5
  },
  {
    id: 'B9',
    title: 'El Juguete Soñado',
    objective: 'A veces, esperar un poco tiene una recompensa mayor.',
    objects: [
      { name: 'Juguete Pequeño Ahora', cost: 20, durability: 2, imageUrl: 'comparahorro-juguete-pequeno.png' },
      { name: 'Ahorrar para el Grande', cost: 0, durability: 5, imageUrl: 'comparahorro-alcancia.png' }
    ],
    correctChoiceIndex: 1,
    explanation: '¡Paciencia de sabio! Al ahorrar, podrás comprar el juguete grande que realmente quieres en vez de gastar en uno más pequeño solo por la prisa. ¡La espera valdrá la pena!',
    reward: 5
  }
];

export const COMPARAHORRO_LEVELS_INTERMEDIATE: ComparisonLevel[] = [
  { 
    id: 'I1', 
    title: 'Zapatillas para Correr', 
    objective: 'Analiza la relación costo-beneficio a mediano plazo.', 
    objects: [
      { name: 'Zapatillas de Lona', cost: 100, durability: 2, imageUrl: 'comparahorro-zapatillas-lona.png' }, 
      { name: 'Zapatillas de Cuero', cost: 180, durability: 5, imageUrl: 'comparahorro-zapatillas-cuero.png' }
    ], 
    correctChoiceIndex: 1, 
    explanation: '¡Excelente análisis! Las zapatillas de cuero cuestan más, pero su durabilidad significa que no necesitarás reemplazarlas en mucho tiempo, ahorrando dinero a la larga.', 
    reward: 10
  },
  { 
    id: 'I2', 
    title: 'Hidratación Inteligente', 
    objective: 'Piensa en el impacto a largo plazo de tus compras.', 
    objects: [
      { name: 'Botella Reutilizable', cost: 40, durability: 5, imageUrl: 'comparahorro-botella-reutilizable.png' }, 
      { name: 'Pack de Agua Plástica', cost: 20, durability: 1, imageUrl: 'comparahorro-agua-plastica.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Genial! La botella reutilizable es una sola compra que te sirve cientos de veces. Ahorras muchas monedas y además cuidas el planeta. ¡Doble ganancia!', 
    reward: 10
  },
  { 
    id: 'I3', 
    title: 'Música para tus Oídos', 
    objective: 'No siempre lo más moderno es lo más duradero.', 
    objects: [
      { name: 'Audífonos con Cable', cost: 60, durability: 4, imageUrl: 'comparahorro-audifonos-cable.png' }, 
      { name: 'Audífonos Inalámbricos Baratos', cost: 80, durability: 2, imageUrl: 'comparahorro-audifonos-inalambricos.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Muy astuto! Los audífonos con cable no necesitan batería y suelen tener menos piezas que fallen. A veces, la tecnología más simple es la más confiable y económica.', 
    reward: 10
  },
  { 
    id: 'I4', 
    title: 'Tesoros de Lectura', 
    objective: 'Un libro bien cuidado es un tesoro para siempre.', 
    objects: [
      { name: 'Libro Tapa Dura', cost: 50, durability: 5, imageUrl: 'comparahorro-libro-dura.png' }, 
      { name: 'Libro Tapa Blanda', cost: 35, durability: 3, imageUrl: 'comparahorro-libro-blanda.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Perfecto! Un libro de tapa dura protege mucho mejor las páginas y resiste el paso del tiempo. ¡Ideal para tu colección de tesoros!', 
    reward: 10
  },
  { 
    id: 'I5', 
    title: 'Aventura Digital', 
    objective: 'Considera los beneficios extra que no están en el precio.', 
    objects: [
      { name: 'Videojuego Físico', cost: 120, durability: 5, imageUrl: 'comparahorro-juego-fisico.png' }, 
      { name: 'Videojuego en Oferta Digital', cost: 100, durability: 5, imageUrl: 'comparahorro-juego-digital.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Interesante! Aunque el juego digital es más barato, el físico lo puedes intercambiar con amigos o revenderlo cuando lo termines, recuperando parte de tu dinero.', 
    reward: 10
  },
  { 
    id: 'I6', 
    title: 'La Lámpara Tramposa', 
    objective: '¡Cuidado! A veces las ofertas esconden costos secretos.', 
    objects: [
      { name: 'Lámpara Mágica ¡EN OFERTA!', cost: 30, durability: 5, imageUrl: 'comparahorro-lampara-magica.png' }, 
      { name: 'Lámpara Normal Confiable', cost: 50, durability: 3, imageUrl: 'comparahorro-lampara-normal.png' }
    ], 
    correctChoiceIndex: 1, 
    explanation: '¡Caíste en la trampa! La Lámpara Mágica usa "polvo de estrellas" muy caro (¡10 monedas por semana!). La Lámpara Normal, aunque más cara al inicio, ahorra mucho más a largo plazo. ¡A veces lo barato sale caro!', 
    reward: 15
  },
  {
    id: 'I7',
    title: '¿Cómo me muevo?',
    objective: 'Considera el costo a largo plazo frente a la inversión inicial.',
    objects: [
      { name: 'Bicicleta Usada', cost: 150, durability: 4, imageUrl: 'comparahorro-bicicleta.png' },
      { name: 'Tickets de Autobús (1 mes)', cost: 50, durability: 1, imageUrl: 'comparahorro-tickets-bus.png' }
    ],
    correctChoiceIndex: 0,
    explanation: '¡Excelente visión! La bicicleta es una inversión inicial, pero después de 3 meses ya habrás ahorrado lo que gastarías en tickets. Además, ¡haces ejercicio!',
    reward: 10
  },
  {
    id: 'I8',
    title: 'El Dilema del Jugador',
    objective: 'Elige la opción que te da más valor por tu dinero.',
    objects: [
      { name: 'Comprar un Juego Nuevo', cost: 200, durability: 3, imageUrl: 'comparahorro-juego-nuevo.png' },
      { name: 'Suscripción de Juegos (3 meses)', cost: 100, durability: 5, imageUrl: 'comparahorro-suscripcion-juegos.png' }
    ],
    correctChoiceIndex: 1,
    explanation: '¡Inteligente! Con la suscripción, tienes acceso a cientos de juegos por la mitad del precio de uno solo. ¡Maximizaste tu diversión y tu presupuesto!',
    reward: 10
  },
  {
    id: 'I9',
    title: 'Reparar o Reemplazar',
    objective: 'A veces, arreglar tus cosas es la opción más económica y sostenible.',
    objects: [
      { name: 'Reparar la Mochila', cost: 30, durability: 3, imageUrl: 'comparahorro-reparar-mochila.png' },
      { name: 'Comprar Mochila Nueva Barata', cost: 50, durability: 2, imageUrl: 'comparahorro-mochila-nueva.png' }
    ],
    correctChoiceIndex: 0,
    explanation: '¡Bien hecho! Reparar tu mochila no solo es más barato, sino que también es mejor para el planeta. ¡Le diste una segunda vida a tus cosas!',
    reward: 10
  },
  {
    id: 'I10',
    title: 'Invertir en Conocimiento',
    objective: 'El mejor tesoro es el que guardas en tu mente.',
    objects: [
      { name: 'Comprar un Curso de Dibujo', cost: 80, durability: 5, imageUrl: 'comparahorro-curso-dibujo.png' },
      { name: 'Comprar Ropa de Marca', cost: 100, durability: 3, imageUrl: 'comparahorro-ropa-marca.png' }
    ],
    correctChoiceIndex: 0,
    explanation: '¡Esa es una inversión que te dará frutos toda la vida! Aprender una nueva habilidad es un tesoro que nadie te puede quitar y que te abrirá muchas puertas.',
    reward: 15
  },
  {
    id: 'I11',
    title: 'El Deseo del Fin de Semana',
    objective: 'Analiza el costo de oportunidad. ¿Qué dejas de ganar al elegir una opción?',
    objects: [
      { name: 'Juego Barato', cost: 40, durability: 2, imageUrl: 'comparahorro-juego-barato.png' },
      { name: 'Jugo Caro', cost: 20, durability: 1, imageUrl: 'comparahorro-jugo-caro.png' },
      { name: 'Ahorrar para Invertir', cost: 0, durability: 5, imageUrl: 'comparahorro-invertir.png' }
    ],
    correctChoiceIndex: 2,
    explanation: '¡Pensamiento de inversionista! Sacrificaste un placer pequeño y momentáneo por una meta mucho más grande. ¡Así es como los grandes tesoros se construyen!',
    reward: 15
  }
];

export const COMPARAHORRO_LEVELS_ADVANCED: ComparisonLevel[] = [
  { 
    id: 'A1', 
    title: 'Tablets Tecnológicas', 
    objective: 'Evalúa la depreciación y el valor de reventa de un activo.', 
    objects: [
      { name: 'Tablet Genérica', cost: 500, durability: 2, imageUrl: 'comparahorro-tablet-generica.png' }, 
      { name: 'Tablet de Marca', cost: 800, durability: 4, imageUrl: 'comparahorro-tablet-marca.png' }
    ], 
    correctChoiceIndex: 1, 
    explanation: '¡Visión de estratega! La tablet de marca, aunque más cara, no solo dura más, sino que mantiene mejor su valor si decides venderla en el futuro. ¡Pensaste en la depreciación!', 
    reward: 20
  },
  { 
    id: 'A2', 
    title: 'Iluminando el Futuro', 
    objective: 'El costo inicial no lo es todo; el costo de uso es clave.', 
    objects: [
      { name: 'Ampolleta LED', cost: 100, durability: 5, imageUrl: 'comparahorro-ampolleta-led.png' }, 
      { name: 'Ampolleta Halógena', cost: 40, durability: 2, imageUrl: 'comparahorro-ampolleta-halogena.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Brillante! La ampolleta LED consume un 80% menos de energía. Aunque cuesta más al comprarla, el ahorro en la cuenta de la luz es gigante a largo plazo.', 
    reward: 20
  },
  { 
    id: 'A3', 
    title: 'El Dilema de la Impresión', 
    objective: 'Analiza el costo total de propiedad, incluyendo los consumibles.', 
    objects: [
      { name: 'Impresora Tinta Económica', cost: 300, durability: 4, imageUrl: 'comparahorro-impresora-tinta.png' }, 
      { name: 'Impresora Láser Barata', cost: 150, durability: 3, imageUrl: 'comparahorro-impresora-laser.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Impresionante! Descubriste que la impresora barata es una trampa, porque sus tóners son carísimos. La inversión inicial en la de tinta se paga sola con el ahorro en consumibles.', 
    reward: 20
  },
  { 
    id: 'A4', 
    title: 'Energía que se Renueva', 
    objective: 'Invertir en reutilizable es una de las mejores formas de ahorrar.', 
    objects: [
      { name: 'Baterías Recargables', cost: 80, durability: 5, imageUrl: 'comparahorro-baterias-recargables.png' }, 
      { name: 'Pack Baterías Desechables', cost: 30, durability: 1, imageUrl: 'comparahorro-baterias-desechables.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Súper elección! Un pack de baterías recargables puede reemplazar la compra de cientos de desechables. El ahorro para tu bolsillo y para el planeta es enorme.', 
    reward: 20
  },
  { 
    id: 'A5', 
    title: 'Seguridad sobre Ruedas', 
    objective: 'La calidad no solo afecta la durabilidad, sino también la seguridad y eficiencia.', 
    objects: [
      { name: 'Neumáticos Calidad Premium', cost: 400, durability: 5, imageUrl: 'comparahorro-neumaticos-premium.png' }, 
      { name: 'Neumáticos Económicos', cost: 250, durability: 3, imageUrl: 'comparahorro-neumaticos-economicos.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Decisión muy madura! Los neumáticos premium no solo duran más kilómetros, sino que mejoran el frenado y pueden reducir el consumo de combustible. ¡Invertiste en seguridad y eficiencia!', 
    reward: 20
  },
  { 
    id: 'A6', 
    title: 'El Café del Ahorrador', 
    objective: 'Evalúa cómo los pequeños gastos recurrentes impactan tu presupuesto.', 
    objects: [
      { name: 'Cafetera Espresso Manual', cost: 200, durability: 4, imageUrl: 'comparahorro-cafetera-manual.png' }, 
      { name: 'Cafetera de Cápsulas', cost: 100, durability: 3, imageUrl: 'comparahorro-cafetera-capsulas.png' }
    ], 
    correctChoiceIndex: 0, 
    explanation: '¡Excelente! La cafetera de cápsulas parece más barata, pero el costo de cada cápsula es muy alto. Comprar café en grano y usar la máquina manual representa un ahorro increíble a lo largo del tiempo.', 
    reward: 20
  },
  {
    id: 'A7',
    title: 'Mantenimiento del PC',
    objective: 'Un pequeño gasto preventivo puede evitar una catástrofe financiera.',
    objects: [
      { name: 'Limpieza y Antivirus Anual', cost: 150, durability: 5, imageUrl: 'comparahorro-mantencion-pc.png' },
      { name: 'Esperar a que falle', cost: 0, durability: 1, imageUrl: 'comparahorro-pc-roto.png' }
    ],
    correctChoiceIndex: 0,
    explanation: '¡Prevención inteligente! Gastar un poco en mantener tu PC en buen estado te puede ahorrar cientos o miles en reparaciones costosas o en tener que comprar uno nuevo.',
    reward: 20
  },
  {
    id: 'A8',
    title: 'Elige tu Banco',
    objective: 'No todos los bancos son iguales. Busca el que te da más beneficios.',
    objects: [
      { name: 'Banco Tradicional (con comisiones)', cost: 20, durability: 2, imageUrl: 'comparahorro-banco-tradicional.png' },
      { name: 'Banco Digital (sin comisiones y con cashback)', cost: 0, durability: 5, imageUrl: 'comparahorro-banco-digital.png' }
    ],
    correctChoiceIndex: 1,
    explanation: '¡Excelente investigación! Elegir un banco que no te cobra por mantener tu dinero y que además te devuelve un porcentaje de tus compras es una forma inteligente de hacer crecer tu patrimonio.',
    reward: 20
  },
  {
    id: 'A9',
    title: 'Fuente de Ingresos',
    objective: 'Diversificar tus ingresos te protege de imprevistos.',
    objects: [
      { name: 'Depender de una sola fuente', cost: 0, durability: 2, imageUrl: 'comparahorro-un-ingreso.png' },
      { name: 'Crear una pequeña tienda online', cost: 100, durability: 5, imageUrl: 'comparahorro-tienda-online.png' }
    ],
    correctChoiceIndex: 1,
    explanation: '¡Mentalidad de emprendedor! Invertir en una segunda fuente de ingresos, aunque sea pequeña, te da seguridad financiera. Si una falla, tienes la otra como respaldo.',
    reward: 25
  },
  {
    id: 'A10',
    title: 'El Poder del Seguro',
    objective: 'Un seguro es pagar un poco para protegerte de un gasto gigante.',
    objects: [
      { name: 'Asegurar tu celular', cost: 40, durability: 5, imageUrl: 'comparahorro-celular-seguro.png' },
      { name: 'Arriesgarse sin seguro', cost: 0, durability: 1, imageUrl: 'comparahorro-celular-roto.png' }
    ],
    correctChoiceIndex: 0,
    explanation: '¡Decisión sabia y prudente! Pagar un pequeño monto por el seguro te protege de tener que gastar muchísimo dinero si tu celular se pierde, se rompe o te lo roban. ¡Protegiste tu inversión!',
    reward: 20
  },
  {
    id: 'A11',
    title: 'Marca Personal vs. Genérico',
    objective: 'A veces, la marca no justifica el sobreprecio.',
    objects: [
      { name: 'Medicamento de Marca', cost: 150, durability: 4, imageUrl: 'comparahorro-medicamento-marca.png' },
      { name: 'Medicamento Genérico (mismo efecto)', cost: 50, durability: 4, imageUrl: 'comparahorro-medicamento-generico.png' }
    ],
    correctChoiceIndex: 1,
    explanation: '¡Compra de genio! Investigaste y descubriste que el medicamento genérico tiene el mismo principio activo y efecto que el de marca, pero a un tercio del precio. ¡Es uno de los mejores secretos del ahorro!',
    reward: 25
  }
];


export const BUDGET_BLITZ_CHALLENGES = [
  {
    day: '🌞 Lunes',
    scenario: '¡Comienza la semana! Tienes 100 monedas. Un buen plan es la clave del éxito.',
    choices: [
      { text: 'Planificar metas claras', budgetChange: 0, happinessChange: 10, message: '¡Excelente comienzo! Planificar te pone en el camino correcto.' },
      { text: 'Gastar sin pensar', budgetChange: -20, happinessChange: 5, message: 'La diversión es buena, pero un gasto grande el lunes puede complicar la semana.' },
    ],
  },
  {
    day: '🍎 Martes',
    scenario: 'Es día de compras. Necesitas fruta, pero ves una oferta de galletas.',
    choices: [
      { text: 'Comprar fruta fresca', budgetChange: -10, happinessChange: 5, message: '¡Elección saludable y responsable! Cuidas tu salud y tu bolsillo.' },
      { text: 'Comprar paquete de galletas', budgetChange: -15, happinessChange: 10, message: '¡Qué rico! Solo recuerda que las necesidades van primero.' },
    ],
  },
  {
    day: '🚌 Miércoles',
    scenario: '¡Gasto necesario! Necesitas pagar el transporte para un paseo escolar.',
    choices: [
      { text: 'Pagar el transporte', budgetChange: -15, happinessChange: 5, message: 'A veces hay que gastar en cosas importantes. ¡Bien hecho!' },
      { text: 'Pedir dinero extra', budgetChange: 0, happinessChange: -5, message: 'Es bueno aprender a usar tu propio presupuesto para estas cosas.' },
    ],
  },
  {
    day: '🎨 Jueves',
    scenario: 'Tus amigos te invitan al cine, pero también puedes jugar gratis en el parque.',
    choices: [
      { text: 'Ir al cine', budgetChange: -25, happinessChange: 15, message: '¡Disfruta la película! La diversión es parte importante de un buen presupuesto.' },
      { text: 'Jugar en el parque', budgetChange: 0, happinessChange: 10, message: '¡Ahorraste y te divertiste! Hay muchas formas de pasarlo bien sin gastar.' },
    ],
  },
  {
    day: '🏦 Viernes',
    scenario: '¡Día de ahorro! ¿Cuánto guardarás en tu alcancía mágica esta semana?',
    choices: [
      { text: 'Guardar 20 monedas', budgetChange: -20, happinessChange: 15, message: '¡Increíble! Ese es un gran aporte a tus sueños. Tu yo del futuro te lo agradece.' },
      { text: 'Guardar 10 monedas', budgetChange: -10, happinessChange: 10, message: '¡Cada moneda cuenta! Sigue así y verás crecer tu tesoro.' },
    ],
  },
  {
    day: '🪙 Sábado',
    scenario: '¡Gasto sorpresa! Se rompió tu juguete favorito y repararlo cuesta 15 monedas.',
    choices: [
      { text: 'Repararlo ahora', budgetChange: -15, happinessChange: 5, message: '¡Buena decisión! Cuidar tus cosas es una forma de ahorrar a largo plazo.' },
      { text: 'Dejarlo roto por ahora', budgetChange: 0, happinessChange: -10, message: 'A veces, posponer un gasto necesario puede traer más problemas después.' },
    ],
  },
  {
    day: '🌈 Domingo',
    scenario: 'Es el último día. ¿Un pequeño capricho para celebrar la semana?',
    choices: [
      { text: 'Comprar un helado', budgetChange: -10, happinessChange: 10, message: '¡Te lo mereces! Un pequeño premio es una gran motivación.' },
      { text: 'Guardar ese extra', budgetChange: 0, happinessChange: 5, message: '¡Wow! Tu disciplina es impresionante. Estás muy cerca de tus metas.' },
    ],
  },
];

export const BUDGET_BLITZ_CHALLENGES_INTERMEDIATE = [
    {
        day: '🌞 Lunes',
        scenario: '¡Comienza la semana! Tienes 150 monedas. Un presupuesto es tu mapa.',
        choices: [
            { text: 'Definir 3 metas de ahorro', budgetChange: 0, happinessChange: 10, message: '¡Mente de estratega! Tener metas claras te guiará.' },
            { text: 'Comprar un videojuego en oferta', budgetChange: -40, happinessChange: 15, message: '¡Qué buena oferta! Solo asegúrate de que encaje en tu plan semanal.' },
        ],
    },
    {
        day: '🍎 Martes',
        scenario: 'Día de mercado. Ves fruta de temporada (barata) y fruta importada (cara).',
        choices: [
            { text: 'Comprar fruta de temporada', budgetChange: -15, happinessChange: 5, message: '¡Decisión inteligente! Ahorras y comes delicioso.' },
            { text: 'Darse un gusto con fruta importada', budgetChange: -25, happinessChange: 10, message: 'Un gusto de vez en cuando está bien. ¡Disfrútalo!' },
        ],
    },
    {
        day: '🚌 Miércoles',
        scenario: 'Necesitas materiales para un proyecto de arte que cuestan 20 monedas.',
        choices: [
            { text: 'Comprar los materiales exactos', budgetChange: -20, happinessChange: 5, message: '¡Perfecto! Tienes lo que necesitas para tu proyecto.' },
            { text: 'Buscar materiales más baratos o reciclados', budgetChange: -10, happinessChange: 10, message: '¡Creatividad y ahorro! Una combinación ganadora.' },
        ],
    },
    {
        day: '🎨 Jueves',
        scenario: 'Una salida grupal. El plan es ir por pizza (cuesta 30) pero tú propones ir por helados (cuesta 15).',
        choices: [
            { text: 'Insistir en la pizza con todos', budgetChange: -30, happinessChange: 15, message: '¡La pizza es genial! A veces los planes en grupo cuestan un poco más.' },
            { text: 'Convencer al grupo de ir por helado', budgetChange: -15, happinessChange: 10, message: '¡Lograste un plan más económico y divertido para todos!' },
        ],
    },
    {
        day: '🏦 Viernes',
        scenario: 'Es día de ahorro para tu meta: un libro de 50 monedas. ¿Cuánto aportas hoy?',
        choices: [
            { text: 'Aportar 30 monedas a tu meta', budgetChange: -30, happinessChange: 15, message: '¡Estás muy cerca! Tu dedicación es impresionante.' },
            { text: 'Aportar 15 monedas', budgetChange: -15, happinessChange: 10, message: '¡Cada paso cuenta! Sigue constante y lo lograrás.' },
        ],
    },
    {
        day: '🪙 Sábado',
        scenario: '¡Tus auriculares se rompieron! Repararlos cuesta 20, unos nuevos baratos cuestan 25.',
        choices: [
            { text: 'Repararlos', budgetChange: -20, happinessChange: 5, message: 'Buena decisión. Reparar es a menudo más sostenible y económico.' },
            { text: 'Comprar los nuevos baratos', budgetChange: -25, happinessChange: -5, message: 'A veces lo barato sale caro. Esperemos que estos duren.' },
        ],
    },
    {
        day: '🌈 Domingo',
        scenario: 'Fin de la semana. ¿Te das un gusto con una skin para tu juego online por 15 monedas?',
        choices: [
            { text: 'Sí, me la compro', budgetChange: -15, happinessChange: 10, message: '¡Disfruta tu recompensa! Te la has ganado.' },
            { text: 'No, guardo para algo más grande', budgetChange: 0, happinessChange: 5, message: '¡Excelente autocontrol! Estás pensando en metas más importantes.' },
        ],
    },
];

export const BUDGET_BLITZ_CHALLENGES_ADVANCED = [
    {
        day: '🌞 Lunes',
        scenario: 'Semana de finanzas avanzadas. Tienes 250 monedas y un fondo de emergencia de 50.',
        choices: [
            { text: 'Revisar presupuesto y buscar "gastos hormiga"', budgetChange: 0, happinessChange: 15, message: '¡Excelente disciplina! Eliminar pequeños gastos innecesarios es clave.' },
            { text: 'Invertir en una herramienta para un proyecto', budgetChange: -50, happinessChange: 5, message: 'Una inversión inteligente puede generar ganancias futuras. ¡Bien pensado!' },
        ],
    },
    {
        day: '🍎 Martes',
        scenario: 'Comparas dos suscripciones. Una es más barata mensualmente (15), pero la otra tiene un gran descuento anual (120).',
        choices: [
            { text: 'Pagar la suscripción anual', budgetChange: -120, happinessChange: 10, message: '¡Visión a largo plazo! Ahorraste 60 monedas al final del año.' },
            { text: 'Pagar la suscripción mensual', budgetChange: -15, happinessChange: 5, message: 'La flexibilidad es buena, pero a veces el pago anual ahorra mucho más.' },
        ],
    },
    {
        day: '🚌 Miércoles',
        scenario: '¡Gasto inesperado! Tu bicicleta necesita una reparación urgente que cuesta 60 monedas.',
        choices: [
            { text: 'Usar el fondo de emergencia', budgetChange: -10, happinessChange: 5, message: '¡Para esto son las emergencias! Solo recuerda reponer 50 a tu fondo.' },
            { text: 'Usar tu presupuesto semanal', budgetChange: -60, happinessChange: -10, message: 'Eso complica la semana. El fondo de emergencia te hubiera protegido.' },
        ],
    },
    {
        day: '🎨 Jueves',
        scenario: 'Oportunidad de emprendimiento: puedes comprar materiales por 40 para vender pulseras con una ganancia potencial de 80.',
        choices: [
            { text: '¡Emprender!', budgetChange: -40, happinessChange: 10, message: '¡Mentalidad de tiburón! Asumes un riesgo para duplicar tu inversión.' },
            { text: 'No, es muy arriesgado', budgetChange: 0, happinessChange: 0, message: 'La seguridad es importante, pero a veces arriesgar trae grandes recompensas.' },
        ],
    },
    {
        day: '🏦 Viernes',
        scenario: 'Decisión de inversión: ¿donas 30 monedas a una causa benéfica o las inviertes en "acciones" simuladas del juego?',
        choices: [
            { text: 'Donar a caridad', budgetChange: -30, happinessChange: 20, message: '¡Tu generosidad es inspiradora! La riqueza también es compartir.' },
            { text: 'Invertir en acciones', budgetChange: -30, happinessChange: 5, message: 'Una apuesta por el futuro. ¡Esperemos que tus acciones suban!' },
        ],
    },
    {
        day: '🪙 Sábado',
        scenario: 'Calidad vs. Precio: un gadget tecnológico cuesta 100 y dura 2 años, otro cuesta 70 y dura 1 año.',
        choices: [
            { text: 'Comprar el de 100', budgetChange: -100, happinessChange: 10, message: '¡Inversión inteligente! Pagas más ahora, pero ahorras 40 a largo plazo.' },
            { text: 'Comprar el de 70', budgetChange: -70, happinessChange: 5, message: 'Ahorraste 30 hoy, pero a la larga gastarás más. ¡Una lección valiosa!' },
        ],
    },
    {
        day: '🌈 Domingo',
        scenario: 'Balance final de la semana. ¿Cuánto creció tu patrimonio total (presupuesto + inversiones)?',
        choices: [
            { text: 'Calcular el rendimiento', budgetChange: 0, happinessChange: 15, message: '¡Análisis financiero completo! Entender tu rendimiento es clave.' },
            { text: 'Solo ver las monedas restantes', budgetChange: 0, happinessChange: 5, message: 'Es un buen comienzo, pero mira siempre el panorama completo.' },
        ],
    },
];