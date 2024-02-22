import { useReducer } from "react";

const TOGGLE_THEME = "TOGGLE_THEME";

const initialState = {
  theme: "light",
  data:[
    {
      id: 1,
      name: 'Bafle activo 15 STS',
      price: 149.40,
      description: 'Sistema diseñado para ser usado en espacios pequeños a medianos, en recintos o al aire libre, teatros, discotecas, vivo, corporativos, producciones de audio y video, estudios de TV, pudiéndose usar tanto como refuerzo o monitor de piso, en todo lugar donde sea necesario manejar convenientemente un alto nivel de presión sonora, con la posibilidad de poder realizar arreglos horizontales para aumentar dicha cobertura.',
      technicalData: `
    - RESPUESTA EN FRECUENCIA: 48 Hz - 18 kHz +/- 3dB<br/>
    - PARLANTES: 1 x 1,4" driver / 1 x 15" woofer B&C SPEAKERS<br/>
    - SENSIBILIDAD: 100 dB watt/metro<br/>
    - CAPACIDAD DE POTENCIA: 960 W programa continuo<br/>
    - DISPERSIÓN: 80º H x 60º V (rotable)<br/>
    - IMPEDANCIA: 8 ohm nominal<br/>
    - GABINETE: reflector de bajos, trapezoidal multiángulo<br/>
    - TERMINACIÓN: Cubierta con poliurea, texturada, azul-gris oscuro<br/>
    - REJA DE PROTECCIÓN: Negra, hierro perforado<br/>
    - ANCLAJES: 24 puntos con roscas de ¼ para montaje de herrería exterior de colgado; 1 x sombrero (35mm)<br/>
    - DIMENSIONES: (Al) 760 mm x (An) 500 mm x (P) 400 mm<br/>
    - PESO: 37 Kg.
    `,
      photo: 'src/assets/products/ID 1.1.jpeg'
    },
    {
      id: 2,
      name: 'Sub Woofer Activo 18 STS',
      price: 119.55,
      description: 'Sistema diseñado para ser usado en espacios pequeños a medianos, en recintos o al aire libre, teatros, discotecas, vivo, corporativos, producciones de audio y video, estudios de TV, en todo lugar donde sea necesario manejar convenientemente un alto nivel de presión sonora en la banda de muy bajas frecuencias.',
      technicalData: `
    - TIPO: Una vía, activo, configurable en arreglos cardioides<br/>
    - RESPUESTA EN FRECUENCIA: 40 Hz 200 Hz +/- 3dB<br/>
    - PARLANTES: 1 x 18”<br/>
    - SENSIBILIDAD: 99 dB watt/metro<br/>
    - CAPACIDAD DE POTENCIA: 1200 W programa continuo<br/>
    - DISPERSIÓN: Cuasi omnidireccional<br/>
    - IMPEDANCIA: 4 u 8 ohm nominal<br/>
    - GABINETE: Reflector de bajos, carga frontal<br/>
    - TERMINACIÓN: Cubierta con poliurea, texturada, azul-gris oscuro<br/>
    - REJA DE PROTECCIÓN: Negra, chapa hierro perforado<br/>
    - ANCLAJES: 24 puntos con roscas de ¼ para montaje de herrería exterior de colgado, vaso de 35 mm<br/>
    - DIMENSIONES: (Al) 550 mm, (An) 610 mm, (P) 610 mm<br/>
    - PESO: 37 Kg.
    `,
      photo: 'src/assets/products/ID 2.1.jpeg'
    },
    {
      id: 3,
      name: 'Bafle Activo 15 Apogee',
      price: 27.5,
      description: 'Apogee A15 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Al ser activo solo necesitarás conectarlo a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que uno pasivo. Es la solución más conveniente si querés producir música en tu casa o en un estudio, y también para DJs. Usalo en donde quieras, este dispositivo está diseñado para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.',
      technicalData: `
    - Tipo de parlante: bafle.<br/>
    - Apto para uso en exteriores.<br/>
    - Respuesta mínima de frecuencia de 52Hz y máxima de 18kHz.<br/>
    - Potencia de 300W.<br/>
    - Conector de entrada: XLR/TRS.<br/>
    - Lugar de colocación: el piso.<br/>
    - Dimensiones: 46cm de ancho, 76cm de alto y 40cm de profundidad.<br/>
    - Ideal para escuchar tu música preferida.<br/>
    `,
      photo: 'src/assets/products/ID 3.1.jpeg'
    },
    {
      id: 4,
      name: 'Sub Woofer Activo 18 Apogee',
      price: 42.5,
      description: 'Apogee A15 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Al ser activo solo necesitarás conectarlo a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que uno pasivo. Es la solución más conveniente si querés producir música en tu casa o en un estudio, y también para DJs. Usalo en donde quieras, este dispositivo está diseñado para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.',
      technicalData: `
    - Bafle Activo<br/>
    - Subwoofer 18"<br/>
    - Potencia Rms: 350 Watts<br/>
    - Potencia de Programa: 700 Watts<br/>
    - Potencia Pico: 1400 Watts<br/>
    - Rango: 35Hz-4.5Khz<br/>
    - Sensibilidad: 97dB<br/>
    - Max SPL: 126 dB<br/>
    - Construida con MDF de 18mm texturada con pintura Epoxi<br/>
    - Reja Frontal metálica con pintura electroestática<br/>
    - Crossover interno<br/>
    - 2 Manijas resistentes<br/>
    - Sombrero para caño de 35mm<br/>
    - Dimensiones: 56 cm (Alto) x 55 cm (Ancho) x 58 cm (Profundidad)<br/>
    `,
      photo: 'src/assets/products/ID 4.1.jpeg'
    },
    {
      id: 5,
      name: 'Microfono Shure Pga48',
      price: 7,
      description: 'Encuentra el micrófono más adecuado para tus necesidades, tanto si buscas uno vocal, de instrumento o inalámbrico. Desde 1925, artistas y entusiastas de la música de todo el mundo han elegido a Shure por el rendimiento incomparable de sus productos.',
      technicalData: `
    - Formato:de mano.<br/>
    - Frecuencia máxima: 15000Hz.<br/>
    - Frecuencia mínima: 70Hz.<br/>
    - La mejor calidad para tus transmisiones.<br/>
    - Alta resolución.<br/>
    `,
      photo: 'src/assets/products/ID 5.1.jpeg'
    },
    {
      id: 6,
      name: 'Mini Cabezal Movil Led RGBW',
      price: 8.2,
      description: 'Cabezal Movil led RGBW, es la mejor opcion para llenar de color tu fiesta, con sus 7 LED de alta intensidad, su reducido tamaño y peso lo convierten en un practico equipo para su facil montado. Cuenta con un display digital para su configuración, se puede utilizar en modo audiorítmico o DMX. ideal para salones de fiesta, DJs.',
      technicalData: `
    - activación por sonido - audioritmico<br/>
    - master o slave<br/>
    - funcion dmx 8 o 13 canales<br/>
    - movimiento pan: 540º<br/>
    - movimiento tilt: 200º<br/>
    - efecto dimmer(0 a 100%) - flash - ajuste de velocidad<br/>
    - se puede instalar en barra de sujeción o apoyado en piso o superficie plana<br/>
    - medidas: 22 x 22 x 29 cm<br/>
    - peso aprox 4kg<br/>
    - consumo total 100w<br/>
    `,
      photo: 'src/assets/products/ID 6.1.jpeg'
    },
    {
      id: 7,
      name: 'Cabezal Movil Pls Beam 7r',
      price: 44.9,
      description: 'El PLS Beam 7R Moving Head es un potente cabezal móvil de haz de luz que es perfecto para una variedad de aplicaciones de iluminación. Cuenta con una lámpara de 230 vatios que produce un haz de luz brillante y nítido, y tiene una variedad de características que lo hacen una opción versátil para iluminadores. ',
      technicalData: `
    - Lámpara de 230 vatios<br/>
    - Haz de luz brillante y nítido<br/>
    - Rueda de gobo estática con 17 gobos + abierto<br/>
    - Prisma giratorio de 8 facetas<br/>
    - Enfoque motorizado<br/>
    - Atenuador lineal<br/>
    - Modo estroboscópico<br/>
    - DMX512 control<br/>
    `,
      photo: 'src/assets/products/ID 7.1.jpeg'
    },
    {
      id: 8,
      name: 'Spider led RGB',
      price: 9.5,
      description: 'El Cabezal Spider Led Rgbw Doble Barra De Led Móvil Beam es un efecto de iluminación versátil que se puede utilizar para crear una variedad de looks para eventos y producciones. Cuenta con dos barras de LED móviles que se pueden controlar de forma independiente, lo que permite crear una amplia gama de efectos de haz y proyección. El cabezal también es muy brillante y tiene una larga vida útil, lo que lo convierte en una opción rentable para lugares de entretenimiento. ',
      technicalData: `
    - Dos barras de LED móviles con 8 LED de 3 W cada una<br/>
    - Colores RGBW<br/>
    - Ángulo de haz de 4,5 grados<br/>
    - Atenuador y estroboscopio incorporados<br/>
    - Control DMX512<br/>
    - Modos de sonido y automático<br/>
    - Soporte para montaje en truss
    `,
      photo: 'src/assets/products/ID 8.1.jpeg'
    },
    {
      id: 9,
      name: 'Tripode para Bafle',
      price: 4.7,
      description: 'Construcción robusta: Fabricado con acero resistente para una máxima durabilidad y capacidad de carga. Altura ajustable: Patas telescópicas con perillas de bloqueo que te permiten ajustar la altura del trípode desde 100 cm hasta 200 cm para una configuración personalizada. Base estable: Amplia base con patas de goma antideslizantes para una máxima estabilidad y evitar vibraciones no deseadas. Fácil de transportar: Diseño plegable y compacto para un fácil almacenamiento y transporte. Versátil: Ideal para una amplia gama de aplicaciones, como eventos en vivo, fiestas, presentaciones, ensayos y más.',
      technicalData: `
    - Marca : Winco<br/>
    - Trípode Soporte Pie De Bafle Soporta 80kg<br/>
    - Compatibles con parlantes de hasta 15 pulgadas<br/>
    - Tripode reforzado<br/>
    - Ajuste a rosca<br/>
    - Traba de seguridad<br/>
    - Base reforzada<br/>
    - Base con traba de seguridad<br/>
    - Altura entre 1 - 2 mts
    `,
      photo: 'src/assets/products/ID 9.1.jpeg'
    },
    {
      id: 10,
      name: 'Consola Yamaha MG10XU',
      price: 19.9,
      description: 'En general, el Yamaha MG10XU es un mezclador analógico versátil y de alta calidad que es una buena opción para una variedad de aplicaciones de sonido en vivo. Si está buscando un mezclador asequible con un sonido excelente y características útiles, el MG10XU es una excelente opción.',
      technicalData: `
    - Consola de mezcla: analógica.<br/>
    - Fabricada en metal.<br/>
    - Con equalizador.<br/>
    - Software incluido.<br/>
    - Tipo de alimentación: corriente eléctrica.<br/>
    - Mezcla de sonido con un resultado único.<br/>
    - La Yamaha MG10XU ofrece 24 efectos incorporados, incluyendo reverb, delay y chorus, para una versatilidad sonora sin igual.
    `,
      photo: 'src/assets/products/ID 10.1.jpeg'
    },
    {
      id: 11,
      name: 'Megaflash de 1.500W',
      price: 6.2,
      description: '¡Ilumina tu evento con el Megaflash de 1.500W! Es la solución perfecta para añadir un toque de emoción y energía a cualquier evento. Crea un ambiente electrizante: Los efectos de flash del Megaflash de 1.500W son perfectos para crear un ambiente de fiesta o evento lleno de energía. Atrae la atención: La luz brillante y los efectos llamativos del Megaflash no pasarán desapercibidos. Versátil: Ideal para una amplia gama de eventos, como bodas, fiestas, conciertos, eventos deportivos y más. Fácil de configurar y usar: El Megaflash de 1.500W es fácil de instalar y operar, incluso para usuarios principiantes.',
      technicalData: `
    - Megaflash de 1.500W, DMX-512 profesional.<br/>
    - Lámpara XOP-15.<br/>
    - 2 canales DMX-512.<br/>
    - Control de velocidad de flasheo / segundo.<br/>
    - Dimmer.<br/>
    - Posibilidad de trabajo sincronizado mediante conexión Maestro-esclavo.
    `,
      photo: 'src/assets/products/ID 11.1.jpg'
    },
    {
      id: 12,
      name: 'consola DMX 512CH PLS',
      price: 4.3,
      description: 'La consola DMX 512CH PLS es una buena opción para aquellos que buscan una controladora de iluminación DMX asequible y fácil de usar. Es perfecta para una variedad de aplicaciones, desde pequeñas producciones teatrales hasta conciertos en vivo y clubes nocturnos.',
      technicalData: `
    - 512 canales DMX<br/>
    - 30 presets de persecución / escena programables<br/>
    - 8 faders maestros<br/>
    - Pantalla LCD retroiluminada<br/>
    - Salida DMX XLR-3<br/>
    - Entrada MIDI
    `,
      photo: 'src/assets/products/ID 12.1.jpeg'
    },
    {
      id: 13,
      name: 'Láser DMX Venetian VT4',
      price: 20.5,
      description: 'El Láser DMX Venetian VT4 es una excelente opción para aquellos que buscan un láser potente y versátil para animar fiestas, eventos y celebraciones. Con su amplia gama de funciones, efectos llamativos y facilidad de control, te permitirá crear un ambiente único y emocionante.',
      technicalData: `
    - Marca: Venetian<br/>
    - Tipo de láser: Diodo láser<br/>
    - Potencia de salida: 600mW (total)<br/>
    - Colores: Rojo, verde y azul (RGB)<br/>
    - Salidas: 4 salidas independientes<br/>
    - Control: DMX512, modo automático, modo audio rítmico<br/>
    - Efectos: Preprogramados y personalizables<br/>
    - Refrigeración: Ventilador<br/>
    - Alimentación: AC 110-240V, 50/60Hz<br/>
    - Dimensiones: 440 x 200 x 75 mm<br/>
    - Peso: 4.5 kg
    `,
      photo: 'src/assets/products/ID 13.1.jpeg'
    },
    {
      id: 14,
      name: 'Maquina Humo Venetian Z-900',
      price: 7,
      description: 'La máquina de humo Venetian Z-900 es una herramienta ideal para crear efectos de humo impresionantes en diversos eventos y presentaciones. Su diseño robusto, su potente rendimiento y su facilidad de uso la convierten en una opción popular tanto para profesionales como para principiantes.',
      technicalData: `
    - Fuente de alimentación: AC220Vca 50/60 Hz<br/>
    - Consumo: 900W<br/>
    - Controles: Manual + Control remoto inalámbrico<br/>
    - Alcance del Control remoto: 25 Metros<br/>
    - Capacidad del tanque: 0.9 Lts<br/>
    - Tiempo de calentamiento: 110 Segundos<br/>
    - Salida de humo: 4800 pies cúbicos x minuto<br/>
    - Alcance del disparo: 5 metros<br/>
    - Dimensiones: 375 x 260 x 220 mm<br/>
    - Peso neto: 3 Kgs<br/>
    - Peso con empaque: 4.1 Kgs
    `,
      photo: 'src/assets/products/ID 14.1.jpeg'
    },
    {
      id: 15,
      name: 'Proyector Gadnic',
      price: 11.2,
      description: 'Potente Proyector Gadnic con una resolución nativa de 1920x1080P compatible con 4K que garantiza colores e imágenes nítidos, el proyector cuenta con una clasificación de alto brillo de 6200 Lumens. Ofrece una calidad de imagen similar al cine para cine en casa.',
      technicalData: `
    - Conexiones de entrada: VGA.<br/>
    - Conexiones de salida: Mini jack.<br/>
    - Consumo energético de 150W.<br/>
    - Resolución nativa: 1920px x 1080px<br/>
    - Soporta resoluciones Full HD 1080p.<br/>
    - Tecnología de proyección LED.<br/>
    - Relación de contraste 4000:1.<br/>
    - Proyecta imagen de 70" - 250".<br/>
    - Conectividad Bluetooth<br/>
    - Incluye control remoto<br/>
    - Con parlante incorporado en el proyector<br/>
    - Te permite ajustar brillo, nitidez y color en la proyección.
    `,
      photo: 'src/assets/products/ID 15.1.jpeg'
    },
  ]

};

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

const userHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch,];
};

export {
  userHook,
  TOGGLE_THEME,
};
