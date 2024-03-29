-- DELETES
DELETE FROM ProThechnics.product_images;
DELETE FROM ProThechnics.products;
DELETE FROM ProThechnics.products_features;
DELETE FROM ProThechnics.categories;
DELETE FROM ProThechnics.features;
DELETE FROM ProThechnics.roles;
DELETE FROM ProThechnics.users;
DELETE FROM ProThechnics.roles;
DELETE FROM ProThechnics.fact_alquiler;


/*-------------------------------------------------------------------------------------------------------------------------*/ 

-- INSERTS
-- CATEGORIES
INSERT INTO ProThechnics.categories
(category_id, title, description, url)
values
(1, 'Sonido', 'En esta sección, encontrarás una amplia variedad de equipos de audio para satisfacer tus necesidades de sonido en eventos. Desde potentes parlantes y sub-woofers hasta micrófonos de alta calidad y consolas de sonido, nuestro catálogo de productos de audio te garantiza una experiencia auditiva excepcional.', '/src/assets/categories/sonido.svg'),
(2, 'Visualización', 'En esta sección, encontrarás una amplia variedad de equipos de audio para satisfacer tus necesidades de sonido en eventos. Desde potentes parlantes y sub-woofers hasta micrófonos de alta calidad y consolas de sonido, nuestro catálogo de productos de audio te garantiza una experiencia auditiva excepcional.', '/src/assets/categories/visualizacion.svg'),
(3, 'Iluminación', 'Transforma la atmósfera de tu evento con nuestra colección de equipos de iluminación. Desde cabezales de luces vibrantes hasta efectos flash y láseres cautivadores, nuestras opciones de iluminación te permitirán crear ambientes únicos y memorables.', '/src/assets/categories/iluminacion.svg'),
(4, 'Efectos Especiales', 'Añade un toque mágico a tu evento con nuestros efectos especiales. Desde máquinas de humo que crean ambientes misteriosos hasta luces estroboscópicas que generan emocionantes momentos, estos elementos son ideales para destacar y sorprender a tu audiencia.', '/src/assets/categories/efectos_especiales.svg'),
(5, 'Accesorios', 'Encuentra todos los accesorios necesarios para complementar tus equipos. Desde trípodes robustos hasta cables y conectores de alta calidad, estos accesorios aseguran un funcionamiento sin problemas y una configuración eficiente.', '/src/assets/categories/accesorios.svg'),
(6, 'Kits Completos', 'Simplifica la planificación de tu evento con nuestros kits completos preconfigurados. Estos paquetes incluyen una selección coordinada de equipos que se adaptan a diferentes tipos de eventos, ya sea una fiesta, una conferencia o cualquier ocasión especial. Ahorra tiempo y asegura el éxito de tu evento con nuestros kits.', '/src/assets/categories/kits_completos.svg');


-- PRODUCTS
INSERT INTO ProThechnics.products
(product_id, name, description, price, category_id)
VALUES
(1, 'Bafle activo 15 STS', 'Sistema diseñado para ser usado en espacios pequeños a medianos, en recintos o al aire libre, teatros, discotecas, vivo, corporativos, producciones de audio y video, estudios de TV, pudiéndose usar tanto como refuerzo o monitor de piso, en todo lugar donde sea necesario manejar convenientemente un alto nivel de presión sonora, con la posibilidad de poder realizar arreglos horizontales para aumentar dicha cobertura.', 149.40, 1),
(2, 'Sub Woofer Activo 18 STS', 'Sistema diseñado para ser usado en espacios pequeños a medianos, en recintos o al aire libre, teatros, discotecas, vivo, corporativos, producciones de audio y video, estudios de TV, en todo lugar donde sea necesario manejar convenientemente un alto nivel de presión sonora en la banda de muy bajas frecuencias.', 119.55, 1),
(3, 'Bafle Activo 15 Apogee', 'Apogee A15 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Al ser activo solo necesitarás conectarlo a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que uno pasivo. Es la solución más conveniente si querés producir música en tu casa o en un estudio, y también para DJs. Usalo en donde quieras, este dispositivo está diseñado para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.', 27.5, 1),
(4, 'Sub Woofer Activo 18 Apogee', 'Apogee A15 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Al ser activo solo necesitarás conectarlo a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que uno pasivo. Es la solución más conveniente si querés producir música en tu casa o en un estudio, y también para DJs. Usalo en donde quieras, este dispositivo está diseñado para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.', 42.5, 1),
(5, 'Microfono Shure Pga48', 'Encuentra el micrófono más adecuado para tus necesidades, tanto si buscas uno vocal, de instrumento o inalámbrico. Desde 1925, artistas y entusiastas de la música de todo el mundo han elegido a Shure por el rendimiento incomparable de sus productos.', 7.2, 1),
(6, 'Mini Cabezal Movil Led RGBW', 'Cabezal Movil led RGBW, es la mejor opcion para llenar de color tu fiesta, con sus 7 LED de alta intensidad, su reducido tamaño y peso lo convierten en un practico equipo para su facil montado. Cuenta con un display digital para su configuración, se puede utilizar en modo audiorítmico o DMX. ideal para salones de fiesta, DJs.', 8.2, 3),
(7, 'Cabezal Movil Pls Beam 7r', 'El PLS Beam 7R Moving Head es un potente cabezal móvil de haz de luz que es perfecto para una variedad de aplicaciones de iluminación. Cuenta con una lámpara de 230 vatios que produce un haz de luz brillante y nítido, y tiene una variedad de características que lo hacen una opción versátil para iluminadores.', 44.9, 3),
(8, 'Spider led RGB', 'El Cabezal Spider Led Rgbw Doble Barra De Led Móvil Beam es un efecto de iluminación versátil que se puede utilizar para crear una variedad de looks para eventos y producciones. Cuenta con dos barras de LED móviles que se pueden controlar de forma independiente, lo que permite crear una amplia gama de efectos de haz y proyección. El cabezal también es muy brillante y tiene una larga vida útil, lo que lo convierte en una opción rentable para lugares de entretenimiento.', 9.5, 3),
(9, 'Tripode para Bafle', 'Construcción robusta: Fabricado con acero resistente para una máxima durabilidad y capacidad de carga. Altura ajustable: Patas telescópicas con perillas de bloqueo que te permiten ajustar la altura del trípode desde 100 cm hasta 200 cm para una configuración personalizada. Base estable: Amplia base con patas de goma antideslizantes para una máxima estabilidad y evitar vibraciones no deseadas. Fácil de transportar: Diseño plegable y compacto para un fácil almacenamiento y transporte. Versátil: Ideal para una amplia gama de aplicaciones, como eventos en vivo, fiestas, presentaciones, ensayos y más.', 4.7, 5),
(10, 'Consola Yamaha MG10XU', 'En general, el Yamaha MG10XU es un mezclador analógico versátil y de alta calidad que es una buena opción para una variedad de aplicaciones de sonido en vivo. Si está buscando un mezclador asequible con un sonido excelente y características útiles, el MG10XU es una excelente opción.', 19.9, 1),
(11, 'Megaflash de 1.500W', '¡Ilumina tu evento con el Megaflash de 1.500W! Es la solución perfecta para añadir un toque de emoción y energía a cualquier evento. Crea un ambiente electrizante: Los efectos de flash del Megaflash de 1.500W son perfectos para crear un ambiente de fiesta o evento lleno de energía. Atrae la atención: La luz brillante y los efectos llamativos del Megaflash no pasarán desapercibidos. Versátil: Ideal para una amplia gama de eventos, como bodas, fiestas, conciertos, eventos deportivos y más. Fácil de configurar y usar: El Megaflash de 1.500W es fácil de instalar y operar, incluso para usuarios principiantes.', 6.2, 3),
(12, 'Consola DMX 512CH PLS', 'La consola DMX 512CH PLS es una buena opción para aquellos que buscan una controladora de iluminación DMX asequible y fácil de usar. Es perfecta para una variedad de aplicaciones, desde pequeñas producciones teatrales hasta conciertos en vivo y clubes nocturnos.', 4.3, 3),
(13, 'Láser DMX Venetian VT4', 'El Láser DMX Venetian VT4 es una excelente opción para aquellos que buscan un láser potente y versátil para animar fiestas, eventos y celebraciones. Con su amplia gama de funciones, efectos llamativos y facilidad de control, te permitirá crear un ambiente único y emocionante.', 20.5, 3),
(14, 'Maquina Humo Venetian Z-900', 'La máquina de humo Venetian Z-900 es una herramienta ideal para crear efectos de humo impresionantes en diversos eventos y presentaciones. Su diseño robusto, su potente rendimiento y su facilidad de uso la convierten en una opción popular tanto para profesionales como para principiantes.', 7, 4),
(15, 'Proyector Gadnic', 'Simplifica la planificación de tu evento con nuestros kits completos preconfigurados. Estos paquetes incluyen una selección coordinada de equipos que se adaptan a diferentes tipos de eventos, ya sea una fiesta, una conferencia o cualquier ocasión especial. Ahorra tiempo y asegura el éxito de tu evento con nuestros kits.', 11.2, 2);

INSERT INTO ProThechnics.product_images
(product_image_id, title, url, is_primary, product_id)
values
(1, 'Bafle activo 15 STS 1', '/src/assets/products/id_1_img_1.jpeg', 1, 1),
(2, 'Bafle activo 15 STS 2', '/src/assets/products/id_1_img_2.jpeg', 0, 1),
(3, 'Bafle activo 15 STS 3', '/src/assets/products/id_1_img_3.jpeg', 0, 1),
(4, 'Bafle activo 15 STS 4', '/src/assets/products/id_1_img_4.jpeg', 0, 1),
(5, 'Bafle activo 15 STS 5', '/src/assets/products/id_1_img_5.jpeg', 0, 1),
(6, 'Sub Woofer Activo 18 STS 1', '/src/assets/products/id_2_img_1.jpeg', 1, 2),
(7, 'Sub Woofer Activo 18 STS 2', '/src/assets/products/id_2_img_2.jpeg', 0, 2),
(8, 'Sub Woofer Activo 18 STS 3', '/src/assets/products/id_2_img_3.jpeg', 0, 2),
(9, 'Sub Woofer Activo 18 STS 4', '/src/assets/products/id_2_img_4.jpeg', 0, 2),
(10, 'Sub Woofer Activo 18 STS 5', '/src/assets/products/id_2_img_5.jpeg', 0, 2),
(11, 'Bafle Activo 15 Apogee 1', '/src/assets/products/id_3_img_1.jpeg', 1, 3),
(12, 'Bafle Activo 15 Apogee 2', '/src/assets/products/id_3_img_2.jpeg', 0, 3),
(13, 'Bafle Activo 15 Apogee 3', '/src/assets/products/id_3_img_3.jpeg', 0, 3),
(14, 'Bafle Activo 15 Apogee 4', '/src/assets/products/id_3_img_4.jpeg', 0, 3),
(15, 'Bafle Activo 15 Apogee 5', '/src/assets/products/id_3_img_5.jpeg', 0, 3),
(16, 'Sub Woofer Activo 18 Apogee 1', '/src/assets/products/id_4_img_1.jpeg', 1, 4),
(17, 'Sub Woofer Activo 18 Apogee 2', '/src/assets/products/id_4_img_2.jpeg', 0, 4),
(18, 'Sub Woofer Activo 18 Apogee 3', '/src/assets/products/id_4_img_3.jpeg', 0, 4),
(19, 'Sub Woofer Activo 18 Apogee 4', '/src/assets/products/id_4_img_4.jpeg', 0, 4),
(20, 'Sub Woofer Activo 18 Apogee 5', '/src/assets/products/id_4_img_5.jpeg', 0, 4),
(21, 'Microfono Shure Pga48 1', '/src/assets/products/id_5_img_1.jpeg', 1, 5),
(22, 'Microfono Shure Pga48 2', '/src/assets/products/id_5_img_2.jpeg', 0, 5),
(23, 'Microfono Shure Pga48 3', '/src/assets/products/id_5_img_3.jpeg', 0, 5),
(24, 'Microfono Shure Pga48 4', '/src/assets/products/id_5_img_4.jpeg', 0, 5),
(25, 'Microfono Shure Pga48 5', '/src/assets/products/id_5_img_5.jpeg', 0, 5),
(26, 'Mini Cabezal Movil Led RGBW 1', '/src/assets/products/id_6_img_1.jpeg', 1, 6),
(27, 'Mini Cabezal Movil Led RGBW 2', '/src/assets/products/id_6_img_2.jpeg', 0, 6),
(28, 'Mini Cabezal Movil Led RGBW 3', '/src/assets/products/id_6_img_3.jpeg', 0, 6),
(29, 'Mini Cabezal Movil Led RGBW 4', '/src/assets/products/id_6_img_4.jpeg', 0, 6),
(30, 'Mini Cabezal Movil Led RGBW 5', '/src/assets/products/id_6_img_5.jpeg', 0, 6),
(31, 'Cabezal Movil Pls Beam 7r 1', '/src/assets/products/id_7_img_1.jpeg', 1, 7),
(32, 'Cabezal Movil Pls Beam 7r 2', '/src/assets/products/id_7_img_2.jpeg', 0, 7),
(33, 'Cabezal Movil Pls Beam 7r 3', '/src/assets/products/id_7_img_3.jpeg', 0, 7),
(34, 'Cabezal Movil Pls Beam 7r 4', '/src/assets/products/id_7_img_4.jpeg', 0, 7),
(35, 'Cabezal Movil Pls Beam 7r 5', '/src/assets/products/id_7_img_5.jpeg', 0, 7),
(36, 'Spider led RGB 1', '/src/assets/products/id_8_img_1.jpeg', 1, 8),
(37, 'Spider led RGB 2', '/src/assets/products/id_8_img_2.jpeg', 0, 8),
(38, 'Spider led RGB 3', '/src/assets/products/id_8_img_3.jpeg', 0, 8),
(39, 'Spider led RGB 4', '/src/assets/products/id_8_img_4.jpeg', 0, 8),
(40, 'Spider led RGB 5', '/src/assets/products/id_8_img_5.jpeg', 0, 8),
(41, 'Tripode para Bafle 1', '/src/assets/products/id_9_img_1.jpeg', 1, 9),
(42, 'Tripode para Bafle 2', '/src/assets/products/id_9_img_2.jpeg', 0, 9),
(43, 'Tripode para Bafle 3', '/src/assets/products/id_9_img_3.jpeg', 0, 9),
(44, 'Tripode para Bafle 4', '/src/assets/products/id_9_img_4.jpeg', 0, 9),
(45, 'Tripode para Bafle 5', '/src/assets/products/id_9_img_5.jpeg', 0, 9),
(46, 'Consola Yamaha MG10XU 1', '/src/assets/products/id_10_img_1.jpeg', 1, 10),
(47, 'Consola Yamaha MG10XU 2', '/src/assets/products/id_10_img_2.jpeg', 0, 10),
(48, 'Consola Yamaha MG10XU 3', '/src/assets/products/id_10_img_3.jpeg', 0, 10),
(49, 'Consola Yamaha MG10XU 4', '/src/assets/products/id_10_img_4.jpeg', 0, 10),
(50, 'Consola Yamaha MG10XU 5', '/src/assets/products/id_10_img_5.jpeg', 0, 10),
(51, 'Megaflash de 1.500W 1', '/src/assets/products/id_11_img_1.jpeg', 1, 11),
(52, 'Megaflash de 1.500W 2', '/src/assets/products/id_11_img_2.jpeg', 0, 11),
(53, 'Megaflash de 1.500W 3', '/src/assets/products/id_11_img_3.jpeg', 0, 11),
(54, 'Megaflash de 1.500W 4', '/src/assets/products/id_11_img_4.jpeg', 0, 11),
(55, 'Megaflash de 1.500W 5', '/src/assets/products/id_11_img_5.jpeg', 0, 11),
(56, 'Consola DMX 512CH PLS 1', '/src/assets/products/id_12_img_1.jpeg', 1, 12),
(57, 'Consola DMX 512CH PLS 2', '/src/assets/products/id_12_img_2.jpeg', 0, 12),
(58, 'Consola DMX 512CH PLS 3', '/src/assets/products/id_12_img_3.jpeg', 0, 12),
(59, 'Consola DMX 512CH PLS 4', '/src/assets/products/id_12_img_4.jpeg', 0, 12),
(60, 'Consola DMX 512CH PLS 5', '/src/assets/products/id_12_img_5.jpeg', 0, 12),
(61, 'Láser DMX Venetian VT4 1', '/src/assets/products/id_13_img_1.jpeg', 1, 13),
(62, 'Láser DMX Venetian VT4 2', '/src/assets/products/id_13_img_2.jpeg', 0, 13),
(63, 'Láser DMX Venetian VT4 3', '/src/assets/products/id_13_img_3.jpeg', 0, 13),
(64, 'Láser DMX Venetian VT4 4', '/src/assets/products/id_13_img_4.jpeg', 0, 13),
(65, 'Láser DMX Venetian VT4 5', '/src/assets/products/id_13_img_5.jpeg', 0, 13),
(66, 'Maquina Humo Venetian Z-900 1', '/src/assets/products/id_14_img_1.jpeg', 1, 14),
(67, 'Maquina Humo Venetian Z-900 2', '/src/assets/products/id_14_img_2.jpeg', 0, 14),
(68, 'Maquina Humo Venetian Z-900 3', '/src/assets/products/id_14_img_3.jpeg', 0, 14),
(69, 'Maquina Humo Venetian Z-900 4', '/src/assets/products/id_14_img_4.jpeg', 0, 14),
(70, 'Maquina Humo Venetian Z-900 5', '/src/assets/products/id_14_img_5.jpeg', 0, 14),
(71, 'Proyector Gadnic 1', '/src/assets/products/id_15_img_1.jpeg', 1, 15),
(72, 'Proyector Gadnic 2', '/src/assets/products/id_15_img_2.jpeg', 0, 15),
(73, 'Proyector Gadnic 3', '/src/assets/products/id_15_img_3.jpeg', 0, 15),
(74, 'Proyector Gadnic 4', '/src/assets/products/id_15_img_4.jpeg', 0, 15),
(75, 'Proyector Gadnic 5', '/src/assets/products/id_15_img_5.jpeg', 0, 15);


-- FEATURES
INSERT INTO ProThechnics.features
(feature_id, title, url)
VALUES
(1, 'Alimentación', '/src/assets/features/id_1.svg'),
(2, 'Canales', '/src/assets/features/id_2.svg'),
(3, 'Cantidad Efectos', '/src/assets/features/id_3.svg'),
(4, 'Colores', '/src/assets/features/id_4.svg'),
(5, 'Consumo', '/src/assets/features/id_5.svg'),
(6, 'Dimensiones', '/src/assets/features/id_6.svg'),
(7, 'Entradas', '/src/assets/features/id_7.svg'),
(8, 'Frecuencia de Respuesta', '/src/assets/features/id_8.svg'),
(9, 'Lúmenes', '/src/assets/features/id_9.svg'),
(10, 'Lugar de Colocación', '/src/assets/features/id_10.svg'),
(11, 'Material Construcción', '/src/assets/features/id_11.svg'),
(12, 'Otros', '/src/assets/features/id_12.svg'),
(13, 'Peso', '/src/assets/features/id_13.svg'),
(14, 'Potencia', '/src/assets/features/id_14.svg'),
(15, 'Salidas', '/src/assets/features/id_15.svg'),
(16, 'Tipo', '/src/assets/features/id_16.svg'),
(17, 'Ángulo de apertura', '/src/assets/features/id_17.svg'),
(18, 'Capacidad', '/src/assets/features/id_18.svg');

INSERT INTO ProThechnics.products_features
(product_id, feature_id, feature_value)
VALUES
(1, 1, '220v'),
(1, 2, '1 canal'),
(1, 14, '960 W'),
(1, 6, '(Al) 760 mm x (An) 500 mm x (P) 400 mm'),
(1, 7, '2 entradas (plug y canon)'),
(1, 8, '48 Hz - 18 kHz +/- 3dB'),
(1, 10, 'Trípode, Colgante, Exterior'),
(1, 11, 'Madera y metal'),
(1, 13, '37 kg'),
(1, 16, 'Sonido pasivo'),
(2, 1, '220 V'),
(2, 2, '1 canal'),
(2, 14, '1200 W'),
(2, 6, '(Al) 550 mm, (An) 610 mm, (P) 610 mm'),
(2, 7, '2 entradas (plug y canon)'),
(2, 8, '40 Hz – 200 Hz +/- 3dB'),
(2, 10, 'Trípode, Colgante, Exterior'),
(2, 11, 'Madera y metal'),
(2, 13, '40 kg'),
(2, 16, 'Sonido pasivo'),
(3, 1, '220 V'),
(3, 2, '1 canal'),
(3, 14, '300 W'),
(3, 6, '46cm de ancho, 76cm de alto y 40cm prof.'),
(3, 7, '2 entradas (plug y canon)'),
(3, 8, '52Hz y máxima de 18kHz.'),
(3, 10, 'Piso, Trípode'),
(3, 11, 'Madera y metal'),
(3, 13, '35 kg'),
(3, 16, 'Sonido Activo'),
(4, 1, '220 V'),
(4, 2, '1 canal'),
(4, 14, '350 W'),
(4, 6, '56 cm (Alto) x 55 cm (Ancho) x 58 cm (prof)'),
(4, 7, '2 entradas (plug y canon)'),
(4, 8, '35Hz-4.5Khz'),
(4, 10, 'Piso, Trípode'),
(4, 11, 'MDF de 18mm texturada Epoxi'),
(4, 13, '38 kg'),
(4, 16, 'Sonido Activo'),
(5, 1, '12/24V'),
(5, 2, '1 canal'),
(5, 4, 'Negro'),
(5, 6, '50 mm de diámetro 21 cm de largo.'),
(5, 8, '70 Hz a 1500 Hz'),
(5, 10, 'Pie de micrófono o mano'),
(5, 11, 'Plástico'),
(5, 13, '230 gr'),
(5, 15, '1 sola tipo plug'),
(5, 16, 'Sonido'),
(6, 1, '220v'),
(6, 2, '8 canales DMX'),
(6, 3, 'Efectos audioritmico, audioslave y máster'),
(6, 4, 'Negro'),
(6, 5, '100 W'),
(6, 6, '22 x 22 x 29 CM'),
(6, 7, '1 DMX'),
(6, 9, '3500 LM'),
(6, 10, 'Sujeción, piso o base plana'),
(6, 11, 'Plástico'),
(6, 12, 'Ajuste de efecto dimmer 0 a 100%'),
(6, 13, '3,4 KG'),
(6, 14, '100W'),
(6, 16, 'Iluminación'),
(7, 1, '220v'),
(7, 2, '16 canales DMX'),
(7, 3, 'Efectos audioritmico, DMX'),
(7, 4, 'Negro y Gris'),
(7, 5, '40 W'),
(7, 6, '80 x 15 CM'),
(7, 7, '1 DMX'),
(7, 9, '1200 LM'),
(7, 10, 'Sujeción, piso o base plana, truss'),
(7, 11, 'Metálico'),
(7, 12, 'Vida útil 4000 horas'),
(7, 13, '2 KG'),
(7, 14, '40W'),
(7, 16, 'Iluminación'),
(8, 1, '220v'),
(8, 2, '13 canales DMX'),
(8, 3, 'Efectos audioritmico, audioslave, esclavo-master'),
(8, 4, 'Negro'),
(8, 5, '270 W'),
(8, 6, '33 x 33 x 45 CM'),
(8, 7, '1 DMX'),
(8, 9, '5000 LM'),
(8, 10, 'Sujeción, piso o base plana, truss'),
(8, 11, 'Plástico'),
(8, 12, 'Ajuste de efecto dimmer 0 a 100%'),
(8, 13, '16 KG'),
(8, 14, '270W'),
(8, 16, 'Iluminación'),
(9, 4, 'Negro'),
(9, 6, '200 x 100 CM'),
(9, 10, 'Base plana'),
(9, 11, 'Hierro'),
(9, 12, 'Compatibles hasta parlantes de 15’ o 80 KG'),
(9, 13, '7 KG'),
(9, 16, 'Accesorios'),
(10, 1, '220 V'),
(10, 2, '4 Canales'),
(10, 3, '24 efectos'),
(10, 4, 'Negro y gris'),
(10, 5, '150 W'),
(10, 6, '54 X 48 CM'),
(10, 7, '8 entradas'),
(10, 11, 'Metal'),
(10, 12, 'Analógico'),
(10, 13, '3,8 KG'),
(10, 15, '4 Salidas (plug y canon)'),
(10, 16, 'Sonido'),
(11, 1, '220 V'),
(11, 2, '2 Canal DMX 512'),
(11, 3, '1 efecto 1 a 18 FPS'),
(11, 4, 'Negro'),
(11, 5, '1500 W'),
(11, 6, '60 x 22 CM'),
(11, 9, '6000 LM'),
(11, 10, 'Estructura truss o soporte'),
(11, 11, 'Metal y vidrio'),
(11, 13, '3 KG'),
(11, 14, '1500 W'),
(11, 16, 'Iluminación'),
(12, 1, '220 V'),
(12, 2, '512 DMX'),
(12, 3, '30 efectos preset'),
(12, 4, 'Negro y gris'),
(12, 5, '230 W'),
(12, 6, '45 x 23 CM'),
(12, 7, '8 entradas'),
(12, 11, 'Metal y plástico'),
(12, 13, '5 KG'),
(12, 15, '8 salidas'),
(12, 16, 'Iluminación'),
(13, 1, '220 V'),
(13, 2, '2 Canal DMX 512'),
(13, 3, '25 efectos DMX'),
(13, 4, 'Negro'),
(13, 5, '1500 W'),
(13, 6, '44 X 20 CM'),
(13, 9, '10000 LM'),
(13, 10, 'Estructura truss o soporte'),
(13, 11, 'Metal'),
(13, 13, '4,5 KG'),
(13, 14, '1500 W'),
(13, 15, '4 salidas independientes'),
(13, 16, 'Iluminación'),
(14, 1, '220 V'),
(14, 2, '1 canal DMX y mando inalámbrico'),
(14, 4, 'Gris'),
(14, 5, '900 W'),
(14, 6, '37 x 26 x 22 CM'),
(14, 10, 'Colgado o piso'),
(14, 11, 'Metálico'),
(12, 12, '110 segundos de calentamiento'),
(14, 13, '3 KG'),
(14, 14, '4800 pies cúbicos x minuto'),
(14, 16, 'Efectos'),
(15, 1, '220 V'),
(15, 5, '150 W'),
(15, 6, '40 x 35 CM'),
(15, 7, 'VGA, HDMI y DP'),
(15, 9, '7000 LM'),
(15, 10, 'Base plana o colgado con soporte'),
(15, 11, 'Plástico'),
(15, 12, '3840 x 2160 P 4K'),
(15, 13, '1,5 KG'),
(15, 15, 'Audi AUX y micro plug'),
(15, 16, 'Visuales');

-- USERS
INSERT INTO ProThechnics.users
(user_id, name, last_name, email, password)
values
(1, 'John', 'Doe', 'user@domain.com', 'User.123'),
(2, 'Iron', 'Man', 'admin@domain.com', 'Admin.123'),
(3, 'Super', 'Man', 'super_admin@domain.com', 'Super.123');


INSERT INTO ProThechnics.roles
(role_id, `role`, user_id)
values
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);