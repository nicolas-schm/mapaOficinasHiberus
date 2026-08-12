import type { Oficina, OficinaOrigen } from "@/types/office";

const SPAIN_IDS = [
  "zaragoza",
  "madrid",
  "barcelona",
  "alicante",
  "almeria",
  "asturias",
  "bilbao",
  "granada",
  "lleida",
  "logrono",
  "mallorca",
  "pamplona",
  "santander",
  "sevilla",
  "soria",
  "toledo",
  "valencia",
  "valladolid",
  "vitoria",
];

export const ORIGEN_INFO: Record<string, OficinaOrigen> = {
  ...Object.fromEntries(
    SPAIN_IDS.map((id) => [
      id,
      { pais: "España", iso: "es", region: "Europa" },
    ]),
  ),
  miami: { pais: "Estados Unidos", iso: "us", region: "América" },
  "buenos-aires": { pais: "Argentina", iso: "ar", region: "América" },
  bogota: { pais: "Colombia", iso: "co", region: "América" },
  quito: { pais: "Ecuador", iso: "ec", region: "América" },
  guayaquil: { pais: "Ecuador", iso: "ec", region: "América" },
  cdmx: { pais: "México", iso: "mx", region: "América" },
  queretaro: { pais: "México", iso: "mx", region: "América" },
  santiago: { pais: "Chile", iso: "cl", region: "América" },
  grafelfing: { pais: "Alemania", iso: "de", region: "Europa" },
  andorra: { pais: "Andorra", iso: "ad", region: "Europa" },
  milan: { pais: "Italia", iso: "it", region: "Europa" },
  wroclaw: { pais: "Polonia", iso: "pl", region: "Europa" },
  varsovia: { pais: "Polonia", iso: "pl", region: "Europa" },
  londres: { pais: "Reino Unido", iso: "gb", region: "Europa" },
  bucarest: { pais: "Rumanía", iso: "ro", region: "Europa" },
  tetuan: { pais: "Marruecos", iso: "ma", region: "África" },
};

export const PAISES_CON_OFICINA = [
  ...new Set(Object.values(ORIGEN_INFO).map((origen) => origen.iso.toUpperCase())),
];

export const OFICINAS: Oficina[] = [
  {
    id: "zaragoza",
    ciudad: "Zaragoza",
    direccion: "Paseo de Isabel la Católica, 6, 50009 Zaragoza",
    longitude: -0.8994828,
    latitude: 41.6369548,
  },
  {
    id: "madrid",
    ciudad: "Madrid",
    nombre: "Hiberus Mobility Hub",
    direccion: "C/ de Méndez Álvaro, 9, 28045 Madrid",
    longitude: -3.6861337,
    latitude: 40.4013758,
  },
  {
    id: "barcelona",
    ciudad: "Barcelona",
    direccion: "C/ Llacuna 166, planta 1, 08018 Barcelona",
    longitude: 2.1918856,
    latitude: 41.4065911,
  },
  {
    id: "alicante",
    ciudad: "Alicante",
    direccion: "Avenida Jean Claude Combaldieu, s/n, 03008 Alicante",
    longitude: -0.518516,
    latitude: 38.3127873,
  },
  {
    id: "almeria",
    ciudad: "Almería",
    direccion: "Plaza Villa Pepita, 3, 04007 Almería",
    longitude: -2.4597,
    latitude: 36.8381,
  },
  {
    id: "asturias",
    ciudad: "Asturias",
    direccion:
      "Plaza de Santa Bárbara, 4, Edificio Asipo II, 2º, oficina 35, 33428 Cayés, Llanera (Asturias)",
    longitude: -5.8506737,
    latitude: 43.4544808,
  },
  {
    id: "bilbao",
    ciudad: "Bilbao",
    direccion: "Máximo Aguirre 18 bis 4º piso, 48009 Bilbao (Vizcaya)",
    longitude: -2.9383573,
    latitude: 43.2630233,
  },
  {
    id: "granada",
    ciudad: "Granada",
    direccion:
      "C/ Periodista Rafael Gómez Mont 61, Chana, Planta 0 Oficina 6, 18014 Granada",
    longitude: -3.6606855,
    latitude: 37.1968638,
  },
  {
    id: "lleida",
    ciudad: "Lleida",
    direccion: "Parque de Gardeny, edificio H2, 2º, Ala B1, 25071 Lérida",
    longitude: 0.6070762,
    latitude: 41.6062303,
  },
  {
    id: "logrono",
    ciudad: "Logroño",
    direccion: "Gran Vía Juan Carlos I, 41, Entreplanta 1ª, 26005 Logroño",
    longitude: -2.4504569,
    latitude: 42.4639026,
  },
  {
    id: "mallorca",
    ciudad: "Mallorca",
    direccion:
      "C/ Isaac Newton, edificio Naorte, bloque A, 07121 Palma de Mallorca (Mallorca)",
    longitude: 2.6502,
    latitude: 39.5696,
  },
  {
    id: "pamplona",
    ciudad: "Pamplona",
    direccion:
      "Avenida de Guipúzcoa, 40 trasera, Oficinas 16, 31012 Pamplona (Navarra)",
    longitude: -1.6635992,
    latitude: 42.8298302,
  },
  {
    id: "santander",
    ciudad: "Santander",
    direccion:
      "CDTUC - Fase A - Módulo 211, Avenida de los Castros s/n, 39005 Santander",
    longitude: -3.814155,
    latitude: 43.468875,
  },
  {
    id: "sevilla",
    ciudad: "Sevilla",
    direccion: "C/ Luis Fuentes Bejarano, 60, 41020 Sevilla",
    longitude: -5.9448673,
    latitude: 37.4084576,
  },
  {
    id: "soria",
    ciudad: "Soria",
    direccion: "Calle del Collado, 17, 1º, 42002 Soria",
    longitude: -2.479,
    latitude: 41.7666,
  },
  {
    id: "toledo",
    ciudad: "Toledo",
    direccion:
      "Edificio San Prudencio nº 10, Calle de Gabriel Alonso de Herrera, 1ª planta, 45600 Talavera de la Reina (Toledo)",
    longitude: -4.8314071,
    latitude: 39.9589094,
  },
  {
    id: "valencia",
    ciudad: "Valencia",
    direccion: "Calle Cirilo Amorós n62, 46004 Valencia",
    longitude: -0.3680927,
    latitude: 39.4685176,
  },
  {
    id: "valladolid",
    ciudad: "Valladolid",
    direccion: "Calle de los Vinos de la Ribera del Duero, 7, 47008 Valladolid",
    longitude: -4.7486757,
    latitude: 41.6191462,
  },
  {
    id: "vitoria",
    ciudad: "Vitoria-Gasteiz",
    direccion:
      "Plaza de España 13, 2º izquierda, 01001 Vitoria-Gasteiz (Álava)",
    longitude: -2.6724055,
    latitude: 42.8464694,
  },
  {
    id: "miami",
    ciudad: "Estados Unidos - Miami",
    direccion: "2620 SW 27th Avenue, Miami, FL 33133, USA",
    longitude: -80.2382637,
    latitude: 25.7427896,
  },
  {
    id: "buenos-aires",
    ciudad: "Argentina - Buenos Aires",
    direccion: "Patagones 2550, CABA - Buenos Aires - Argentina",
    longitude: -58.397726,
    latitude: -34.6369193,
  },
  {
    id: "bogota",
    ciudad: "Colombia - Bogotá",
    direccion:
      "Calle 98 Nº 70-91 Suite 712, Centro Empresarial Vardí, Bogotá - Colombia",
    longitude: -74.0836331,
    latitude: 4.6533817,
  },
  {
    id: "quito",
    ciudad: "Ecuador - Quito",
    direccion:
      "Av. 6 de Diciembre N24-417 y Luis Cordero, Edif. Novus, 4to Piso, Oficina 401, Quito - Ecuador",
    longitude: -78.5123274,
    latitude: -0.2201641,
  },
  {
    id: "guayaquil",
    ciudad: "Ecuador - Guayaquil",
    direccion:
      "Av. Joaquín Orrantia y Leopoldo Benítez, Galería Comercial del hotel TRYP BY WYNDHAM, Mezzanine 2 oficina 213, Guayaquil - Ecuador",
    longitude: -79.9002101,
    latitude: -2.0829656,
  },
  {
    id: "cdmx",
    ciudad: "México - Ciudad de México",
    direccion:
      "Prol. Pº de la Reforma 1200, Santa Fe, Contadero, Cuajimalpa de Morelos, 05349 Ciudad de México, México",
    longitude: -99.2728019,
    latitude: 19.3587457,
  },
  {
    id: "queretaro",
    ciudad: "México - Querétaro",
    direccion:
      "World Trade Center Querétaro, Piso 13, Oficina 1305, Pº de la República Km 13020, 76230 Juriquilla, Querétaro, México",
    longitude: -100.458387,
    latitude: 20.7125923,
  },
  {
    id: "santiago",
    ciudad: "Chile - Santiago",
    direccion:
      "Av. Providencia 111, 7500776 Providencia, Región Metropolitana, Chile",
    longitude: -70.632271,
    latitude: -33.4370521,
  },
  {
    id: "grafelfing",
    ciudad: "Alemania - Gräfelfing",
    direccion: "Würmstraße 55, 82166 Gräfelfing, Alemania",
    longitude: 11.4426362,
    latitude: 48.1243524,
  },
  {
    id: "andorra",
    ciudad: "Andorra – Andorra la Vella",
    direccion: "Av. Meritxell 75, AD500 - Andorra la Vella",
    longitude: 1.5229483,
    latitude: 42.5076947,
  },
  {
    id: "milan",
    ciudad: "Italia – Milán",
    direccion: "Via Andegari, 4, 20121 - Milán (Italia)",
    longitude: 9.1896692,
    latitude: 45.4684918,
  },
  {
    id: "wroclaw",
    ciudad: "Polonia – Wrocław",
    direccion: "Plac Teatralny 1/22, 50–051 Wrocław (Polonia)",
    longitude: 17.0316757,
    latitude: 51.1055189,
  },
  {
    id: "varsovia",
    ciudad: "Polonia – Varsovia",
    direccion: "ul. Kopernika 5/7, 00-367 Warszawa (Polonia)",
    longitude: 21.0711489,
    latitude: 52.2333742,
  },
  {
    id: "londres",
    ciudad: "Reino Unido – Londres",
    direccion: "20-22 Wenlock Road, Shoreditch, N1 7GU Londres (Reino Unido)",
    longitude: -0.093654,
    latitude: 51.5307035,
  },
  {
    id: "bucarest",
    ciudad: "Rumanía – Bucarest",
    direccion:
      "Șoseaua Pipera-Tunari, nr. 1H-L13, 077191 - Voluntari, Ilfov (Rumanía)",
    longitude: 26.1772794,
    latitude: 44.4902779,
  },
  {
    id: "tetuan",
    ciudad: "Marruecos – Tetuán",
    direccion:
      "Oficinas Wilaya Center, Avenida Ali Yata, 2º Piso, Oficina Nº 19, 93000 - Tetuán (Marruecos)",
    longitude: -5.3746918,
    latitude: 35.5697958,
  },
];
