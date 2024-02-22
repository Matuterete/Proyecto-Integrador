import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import "../Components/Styles/Home.css"

const Home = () => {
  // ARRAY PARA CATEGORIAS
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Eventos grandes',
      description: 'Descripción de eventos grandes',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Eventos medianos',
      description: 'Descripción de eventos medianos',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Eventos pequeños',
      description: 'Descripción de eventos pequeños',
      photo: 'https://via.placeholder.com/150'
    }
  ]);

  // ARRAY PARA SIMULAR LLAMADO A API
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Bafle activo 15 STS',
      price:149.40,
      description: 'Sistema diseñado para ser usado en espacios pequeños a medianos, en recintos o al aire libre, teatros, discotecas, vivo, corporativos, producciones de audio y video, estudios de TV, pudiéndose usar tanto como refuerzo o monitor de piso, en todo lugar donde sea necesario manejar convenientemente un alto nivel de presión sonora, con la posibilidad de poder realizar arreglos horizontales para aumentar dicha cobertura.',
      technicalData: `
      - RESPUESTA EN FRECUENCIA: 48 Hz - 18 kHz +/- 3dB
      - PARLANTES: 1 x 1,4" driver / 1 x 15" woofer B&C SPEAKERS
      - SENSIBILIDAD: 100 dB watt/metro
      - CAPACIDAD DE POTENCIA: 960 W programa continuo
      - DISPERSIÓN: 80º H x 60º V (rotable)
      - IMPEDANCIA: 8 ohm nominal
      - GABINETE: reflector de bajos, trapezoidal multiángulo
      - TERMINACIÓN: Cubierta con poliurea, texturada, azul-gris oscuro
      - REJA DE PROTECCIÓN: Negra, hierro perforado
      - ANCLAJES: 24 puntos con roscas de ¼ para montaje de herrería exterior de colgado; 1 x sombrero (35mm)
      - DIMENSIONES: (Al) 760 mm x (An) 500 mm x (P) 400 mm
      - PESO: 37 Kg.
      `,
      photo: 'src/assets/products/ID 1.1.jpeg'
    },
    {
      id: 2,
      name: 'Sub Woofer Activo 18 STS',
      price:119.55,
      description: 'Sistema diseñado para ser usado en espacios pequeños a medianos, en recintos o al aire libre, teatros, discotecas, vivo, corporativos, producciones de audio y video, estudios de TV, en todo lugar donde sea necesario manejar convenientemente un alto nivel de presión sonora en la banda de muy bajas frecuencias.',
      technicalData: `
      - TIPO: Una vía, activo, configurable en arreglos cardioides
      - RESPUESTA EN FRECUENCIA: 40 Hz – 200 Hz +/- 3dB
      - PARLANTES: 1 x 18”
      - SENSIBILIDAD: 99 dB watt/metro
      - CAPACIDAD DE POTENCIA: 1200 W programa continuo
      - DISPERSIÓN: Cuasi omnidireccional
      - IMPEDANCIA: 4 u 8 ohm nominal
      - GABINETE: Reflector de bajos, carga frontal
      - TERMINACIÓN: Cubierta con poliurea, texturada, azul-gris oscuro
      - REJA DE PROTECCIÓN: Negra, chapa hierro perforado
      - ANCLAJES: 24 puntos con roscas de ¼ para montaje de herrería exterior de colgado, vaso de 35 mm
      - DIMENSIONES: (Al) 550 mm, (An) 610 mm, (P) 610 mm
      - PESO: 37 Kg.
      `,
      photo: 'src/assets/products/ID 2.1.jpeg'
    },
    {
      id: 3,
      name: 'Bafle Activo 15 Apogee',
      price:27.5,
      description: 'Apogee A15 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Al ser activo solo necesitarás conectarlo a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que uno pasivo. Es la solución más conveniente si querés producir música en tu casa o en un estudio, y también para DJs. Usalo en donde quieras, este dispositivo está diseñado para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.',
      technicalData: `
      Tipo de parlante: bafle.
      Apto para uso en exteriores.
      Respuesta mínima de frecuencia de 52Hz y máxima de 18kHz.
      Potencia de 300W.
      Conector de entrada: XLR/TRS.
      Lugar de colocación: el piso.
      Dimensiones: 46cm de ancho, 76cm de alto y 40cm de profundidad.
      Ideal para escuchar tu música preferida.
      `,
      photo: 'src/assets/products/ID 3.1.jpeg'
    },
    {
      id: 4,
      name: 'Sub Woofer Activo 18 Apogee',
      price:42.5,
      description: 'Apogee A15 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Al ser activo solo necesitarás conectarlo a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que uno pasivo. Es la solución más conveniente si querés producir música en tu casa o en un estudio, y también para DJs. Usalo en donde quieras, este dispositivo está diseñado para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.',
      technicalData: `
      - Bafle Activo
      - Subwoofer 18"
      - Potencia Rms: 350 Watts
      - Potencia de Programa: 700 Watts
      - Potencia Pico: 1400 Watts
      - Rango: 35Hz-4.5Khz
      - Sensibilidad: 97dB
      - Max SPL: 126 dB
      - Construida con MDF de 18mm texturada con pintura Epoxi
      - Reja Frontal metálica con pintura electroestática
      - Crossover interno
      - 2 Manijas resistentes
      - Sombrero para caño de 35mm
      - Dimensiones: 56 cm (Alto) x 55 cm (Ancho) x 58 cm (Profundidad)
      `,
      photo: 'src/assets/products/ID 4.1.jpeg'
    },
    {
      id: 5,
      name: 'Microfono Shure Pga48',
      price:7,
      description: 'Encuentra el micrófono más adecuado para tus necesidades, tanto si buscas uno vocal, de instrumento o inalámbrico. Desde 1925, artistas y entusiastas de la música de todo el mundo han elegido a Shure por el rendimiento incomparable de sus productos.',
      technicalData: `
      Formato:de mano.
      Frecuencia máxima: 15000Hz.
      Frecuencia mínima: 70Hz.
      La mejor calidad para tus transmisiones.
      Alta resolución.
      `,
      photo: 'src/assets/products/ID 5.1.jpeg'
    },
    {
      id: 6,
      name: 'Mini Cabezal Movil Led RGBW',
      price:8.2,
      description: 'Cabezal Movil led RGBW, es la mejor opcion para llenar de color tu fiesta, con sus 7 LED de alta intensidad, su reducido tamaño y peso lo convierten en un practico equipo para su facil montado. Cuenta con un display digital para su configuración, se puede utilizar en modo audiorítmico o DMX. ideal para salones de fiesta, DJs.',
      technicalData: `
      activación por sonido - audioritmico
      master o slave
      funcion dmx 8 o 13 canales
      movimiento pan: 540º
      movimiento tilt: 200º
      efecto dimmer(0 a 100%) - flash - ajuste de velocidad
      se puede instalar en barra de sujeción o apoyado en piso o superficie plana
      medidas: 22 x 22 x 29 cm
      peso aprox 4kg
      consumo total 100w
      `,
      photo: 'src/assets/products/ID 6.1.jpeg'
    },
    {
      id: 7,
      name: 'Cabezal Movil Pls Beam 7r',
      price:44.9,
      description: 'El PLS Beam 7R Moving Head es un potente cabezal móvil de haz de luz que es perfecto para una variedad de aplicaciones de iluminación. Cuenta con una lámpara de 230 vatios que produce un haz de luz brillante y nítido, y tiene una variedad de características que lo hacen una opción versátil para iluminadores. ',
      technicalData: `
      Lámpara de 230 vatios
      Haz de luz brillante y nítido
      Rueda de gobo estática con 17 gobos + abierto
      Prisma giratorio de 8 facetas
      Enfoque motorizado
      Atenuador lineal
      Modo estroboscópico
      DMX512 control
      `,
      photo: 'src/assets/products/ID 7.1.jpeg'
    },
    {
      id: 8,
      name: 'Spider led RGB',
      price:9.5,
      description: 'El Cabezal Spider Led Rgbw Doble Barra De Led Móvil Beam es un efecto de iluminación versátil que se puede utilizar para crear una variedad de looks para eventos y producciones. Cuenta con dos barras de LED móviles que se pueden controlar de forma independiente, lo que permite crear una amplia gama de efectos de haz y proyección. El cabezal también es muy brillante y tiene una larga vida útil, lo que lo convierte en una opción rentable para lugares de entretenimiento. ',
      technicalData: `
      Dos barras de LED móviles con 8 LED de 3 W cada una
      Colores RGBW
      Ángulo de haz de 4,5 grados
      Atenuador y estroboscopio incorporados
      Control DMX512
      Modos de sonido y automático
      Soporte para montaje en truss
      `,
      photo: 'src/assets/products/ID 8.1.jpeg'
    },
    {
      id: 9,
      name: 'Tripode para Bafle',
      price:4.7,
      description: 'Construcción robusta: Fabricado con acero resistente para una máxima durabilidad y capacidad de carga. Altura ajustable: Patas telescópicas con perillas de bloqueo que te permiten ajustar la altura del trípode desde 100 cm hasta 200 cm para una configuración personalizada. Base estable: Amplia base con patas de goma antideslizantes para una máxima estabilidad y evitar vibraciones no deseadas. Fácil de transportar: Diseño plegable y compacto para un fácil almacenamiento y transporte. Versátil: Ideal para una amplia gama de aplicaciones, como eventos en vivo, fiestas, presentaciones, ensayos y más.',
      technicalData: `
      - Marca : Winco
      - Trípode Soporte Pie De Bafle Soporta 80kg
      - Compatibles con parlantes de hasta 15 pulgadas
      - Tripode reforzado
      - Ajuste a rosca
      - Traba de seguridad
      - Base reforzada
      - Base con traba de seguridad
      - Altura entre 1 - 2 mts
      `,
      photo: 'src/assets/products/ID 9.1.jpeg'
    },
    {
      id: 10,
      name: 'Consola Yamaha MG10XU',
      price:19.9,
      description: 'En general, el Yamaha MG10XU es un mezclador analógico versátil y de alta calidad que es una buena opción para una variedad de aplicaciones de sonido en vivo. Si está buscando un mezclador asequible con un sonido excelente y características útiles, el MG10XU es una excelente opción.',
      technicalData: `
      Consola de mezcla: analógica.
      Fabricada en metal.
      Con equalizador.
      Software incluido.
      Tipo de alimentación: corriente eléctrica.
      Mezcla de sonido con un resultado único.
      La Yamaha MG10XU ofrece 24 efectos incorporados, incluyendo reverb, delay y chorus, para una versatilidad sonora sin igual.
      `,
      photo: 'src/assets/products/ID 10.1.jpeg'
    },
    {
      id: 11,
      name: 'Megaflash de 1.500W',
      price:6.2,
      description: '¡Ilumina tu evento con el Megaflash de 1.500W! Es la solución perfecta para añadir un toque de emoción y energía a cualquier evento. Crea un ambiente electrizante: Los efectos de flash del Megaflash de 1.500W son perfectos para crear un ambiente de fiesta o evento lleno de energía. Atrae la atención: La luz brillante y los efectos llamativos del Megaflash no pasarán desapercibidos. Versátil: Ideal para una amplia gama de eventos, como bodas, fiestas, conciertos, eventos deportivos y más. Fácil de configurar y usar: El Megaflash de 1.500W es fácil de instalar y operar, incluso para usuarios principiantes.',
      technicalData: `
      Megaflash de 1.500W, DMX-512 profesional.
      Lámpara XOP-15.
      2 canales DMX-512.
      Control de velocidad de flasheo / segundo.
      Dimmer.
      Posibilidad de trabajo sincronizado mediante conexión Maestro-esclavo.
      `,
      photo: 'src/assets/products/ID 11.1.jpg'
    },
    {
      id: 12,
      name: 'consola DMX 512CH PLS',
      price:4.3,
      description: 'La consola DMX 512CH PLS es una buena opción para aquellos que buscan una controladora de iluminación DMX asequible y fácil de usar. Es perfecta para una variedad de aplicaciones, desde pequeñas producciones teatrales hasta conciertos en vivo y clubes nocturnos.',
      technicalData: `
      512 canales DMX
      30 presets de persecución / escena programables
      8 faders maestros
      Pantalla LCD retroiluminada
      Salida DMX XLR-3
      Entrada MIDI
      `,
      photo: 'src/assets/products/ID 12.1.jpeg'
    },
    {
      id: 13,
      name: 'Láser DMX Venetian VT4',
      price:20.5,
      description: 'El Láser DMX Venetian VT4 es una excelente opción para aquellos que buscan un láser potente y versátil para animar fiestas, eventos y celebraciones. Con su amplia gama de funciones, efectos llamativos y facilidad de control, te permitirá crear un ambiente único y emocionante.',
      technicalData: `
      Marca: Venetian
      Tipo de láser: Diodo láser
      Potencia de salida: 600mW (total)
      Colores: Rojo, verde y azul (RGB)
      Salidas: 4 salidas independientes
      Control: DMX512, modo automático, modo audio rítmico
      Efectos: Preprogramados y personalizables
      Refrigeración: Ventilador
      Alimentación: AC 110-240V, 50/60Hz
      Dimensiones: 440 x 200 x 75 mm
      Peso: 4.5 kg
      `,
      photo: 'src/assets/products/ID 13.1.jpeg'
    },
    {
      id: 14,
      name: 'Maquina Humo Venetian Z-900',
      price:7,
      description: 'La máquina de humo Venetian Z-900 es una herramienta ideal para crear efectos de humo impresionantes en diversos eventos y presentaciones. Su diseño robusto, su potente rendimiento y su facilidad de uso la convierten en una opción popular tanto para profesionales como para principiantes.',
      technicalData: `
      Fuente de alimentación: AC220Vca 50/60 Hz
      Consumo: 900W
      Controles: Manual + Control remoto inalámbrico
      Alcance del Control remoto: 25 Metros
      Capacidad del tanque: 0.9 Lts
      Tiempo de calentamiento: 110 Segundos
      Salida de humo: 4800 pies cúbicos x minuto
      Alcance del disparo: 5 metros
      Dimensiones: 375 x 260 x 220 mm
      Peso neto: 3 Kgs
      Peso con empaque: 4.1 Kgs
      `,
      photo: 'src/assets/products/ID 14.1.jpeg'
    },
    {
      id: 15,
      name: 'Proyector Gadnic',
      price:11.2,
      description: 'Potente Proyector Gadnic con una resolución nativa de 1920x1080P compatible con 4K que garantiza colores e imágenes nítidos, el proyector cuenta con una clasificación de alto brillo de 6200 Lumens. Ofrece una calidad de imagen similar al cine para cine en casa.',
      technicalData: `
      Conexiones de entrada: VGA.
      Conexiones de salida: Mini jack.
      Consumo energético de 150W.
      Resolución nativa: 1920px x 1080px
      Soporta resoluciones Full HD 1080p.
      Tecnología de proyección LED.
      Relación de contraste 4000:1.
      Proyecta imagen de 70" - 250".
      Conectividad Bluetooth
      Incluye control remoto
      Con parlante incorporado en el proyector
      Te permite ajustar brillo, nitidez y color en la
      proyección.

      `,
      photo: 'src/assets/products/ID 15.1.jpeg'
    },
  ]);

  const [productsRandom, setProductsRandom] = useState([]);

  useEffect(() => {
    // Generar 4 índices aleatorios únicos ¡¡esto lo debe generar la api!!
    const indicesAleatorios = [];
    while (indicesAleatorios.length < 6) {
      const indiceAleatorio = Math.floor(Math.random() * products.length);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    // Mostrar los objetos correspondientes a los índices seleccionados
    const productsSeleccionados = indicesAleatorios.map(indice => products[indice]);
    setProductsRandom(productsSeleccionados);
  }, []);

  return (
    <div className='body'>
      <div className="buscador">
        <input className="buscador-input" type="search" placeholder="Buscador" />
      </div>
      <div>
        <p className='cardTitle'>Categorias</p>
        <div className='cardGrid'>
          {categories.map(product => <Card product={product} key={product.id} />)}
        </div>
      </div>
      <div>
        <p className='cardTitle'>Recomendados</p>
        <div className='cardGrid'>
          {productsRandom.map(product => <Card product={product} key={product.id} />)}
        </div>
      </div>

    </div>
  );
};

export default Home;
