import { useRef, useState } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  type MapRef,
} from "@/components/ui/map";
import { PhotoGallery } from "@/components/PhotoGallery";
import { CountryLabelFilter } from "@/components/CountryLabelFilter";
import { cn } from "@/lib/utils";
import officeImg from "@/assets/modern-office-space-interior.jpg";
import "./App.css";

const FOTOS_PLACEHOLDER = Array.from({ length: 7 }, () => officeImg);

// ISO 3166-1 alpha-2 codes for every country with an office.
const PAISES_CON_OFICINA = [
  "ES",
  "US",
  "AR",
  "CO",
  "EC",
  "MX",
  "CL",
  "DE",
  "AD",
  "IT",
  "PL",
  "GB",
  "RO",
  "MA",
];

type Region = {
  id: string;
  label: string;
  center: [number, number];
  zoom: number;
};

const REGIONES: Region[] = [
  { id: "europa", label: "Europa", center: [15, 52], zoom: 3.4 },
  { id: "america", label: "América", center: [-80, 10], zoom: 2 },
  { id: "africa", label: "África", center: [15, 10], zoom: 2.6 },
];

type Oficina = {
  id: string;
  ciudad: string;
  nombre?: string;
  direccion: string;
  longitude: number;
  latitude: number;
  fotos: string[];
};

const OFICINAS: Oficina[] = [
  {
    id: "zaragoza",
    ciudad: "Zaragoza",
    direccion: "Paseo de Isabel la Católica, 6, 50009 Zaragoza",
    longitude: -0.8994828,
    latitude: 41.6369548,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "madrid",
    ciudad: "Madrid",
    nombre: "Hiberus Mobility Hub",
    direccion: "C/ de Méndez Álvaro, 9, 28045 Madrid",
    longitude: -3.6861337,
    latitude: 40.4013758,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "barcelona",
    ciudad: "Barcelona",
    direccion: "C/ Llacuna 166, planta 1, 08018 Barcelona",
    longitude: 2.1918856,
    latitude: 41.4065911,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "alicante",
    ciudad: "Alicante",
    direccion: "Avenida Jean Claude Combaldieu, s/n, 03008 Alicante",
    longitude: -0.518516,
    latitude: 38.3127873,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "almeria",
    ciudad: "Almería",
    direccion: "Plaza Villa Pepita, 3, 04007 Almería",
    longitude: -2.4597,
    latitude: 36.8381,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "asturias",
    ciudad: "Asturias",
    direccion:
      "Plaza de Santa Bárbara, 4, Edificio Asipo II, 2º, oficina 35, 33428 Cayés, Llanera (Asturias)",
    longitude: -5.8506737,
    latitude: 43.4544808,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "bilbao",
    ciudad: "Bilbao",
    direccion: "Máximo Aguirre 18 bis 4º piso, 48009 Bilbao (Vizcaya)",
    longitude: -2.9383573,
    latitude: 43.2630233,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "granada",
    ciudad: "Granada",
    direccion:
      "C/ Periodista Rafael Gómez Mont 61, Chana, Planta 0 Oficina 6, 18014 Granada",
    longitude: -3.6606855,
    latitude: 37.1968638,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "lleida",
    ciudad: "Lleida",
    direccion:
      "Parque de Gardeny, edificio H2, 2º, Ala B1, 25071 Lérida",
    longitude: 0.6070762,
    latitude: 41.6062303,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "logrono",
    ciudad: "Logroño",
    direccion: "Gran Vía Juan Carlos I, 41, Entreplanta 1ª, 26005 Logroño",
    longitude: -2.4504569,
    latitude: 42.4639026,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "mallorca",
    ciudad: "Mallorca",
    direccion:
      "C/ Isaac Newton, edificio Naorte, bloque A, 07121 Palma de Mallorca (Mallorca)",
    longitude: 2.6502,
    latitude: 39.5696,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "pamplona",
    ciudad: "Pamplona",
    direccion:
      "Avenida de Guipúzcoa, 40 trasera, Oficinas 16, 31012 Pamplona (Navarra)",
    longitude: -1.6635992,
    latitude: 42.8298302,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "santander",
    ciudad: "Santander",
    direccion:
      "CDTUC - Fase A - Módulo 211, Avenida de los Castros s/n, 39005 Santander",
    longitude: -3.814155,
    latitude: 43.468875,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "sevilla",
    ciudad: "Sevilla",
    direccion: "C/ Luis Fuentes Bejarano, 60, 41020 Sevilla",
    longitude: -5.9448673,
    latitude: 37.4084576,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "soria",
    ciudad: "Soria",
    direccion: "Calle del Collado, 17, 1º, 42002 Soria",
    longitude: -2.479,
    latitude: 41.7666,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "toledo",
    ciudad: "Toledo",
    direccion:
      "Edificio San Prudencio nº 10, Calle de Gabriel Alonso de Herrera, 1ª planta, 45600 Talavera de la Reina (Toledo)",
    longitude: -4.8314071,
    latitude: 39.9589094,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "valencia",
    ciudad: "Valencia",
    direccion: "Calle Cirilo Amorós n62, 46004 Valencia",
    longitude: -0.3680927,
    latitude: 39.4685176,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "valladolid",
    ciudad: "Valladolid",
    direccion: "Calle de los Vinos de la Ribera del Duero, 7, 47008 Valladolid",
    longitude: -4.7486757,
    latitude: 41.6191462,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "vitoria",
    ciudad: "Vitoria-Gasteiz",
    direccion:
      "Plaza de España 13, 2º izquierda, 01001 Vitoria-Gasteiz (Álava)",
    longitude: -2.6724055,
    latitude: 42.8464694,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "miami",
    ciudad: "Estados Unidos - Miami",
    direccion: "2620 SW 27th Avenue, Miami, FL 33133, USA",
    longitude: -80.2382637,
    latitude: 25.7427896,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "buenos-aires",
    ciudad: "Argentina - Buenos Aires",
    direccion: "Patagones 2550, CABA - Buenos Aires - Argentina",
    longitude: -58.397726,
    latitude: -34.6369193,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "bogota",
    ciudad: "Colombia - Bogotá",
    direccion:
      "Calle 98 Nº 70-91 Suite 712, Centro Empresarial Vardí, Bogotá - Colombia",
    longitude: -74.0836331,
    latitude: 4.6533817,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "quito",
    ciudad: "Ecuador - Quito",
    direccion:
      "Av. 6 de Diciembre N24-417 y Luis Cordero, Edif. Novus, 4to Piso, Oficina 401, Quito - Ecuador",
    longitude: -78.5123274,
    latitude: -0.2201641,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "guayaquil",
    ciudad: "Ecuador - Guayaquil",
    direccion:
      "Av. Joaquín Orrantia y Leopoldo Benítez, Galería Comercial del hotel TRYP BY WYNDHAM, Mezzanine 2 oficina 213, Guayaquil - Ecuador",
    longitude: -79.9002101,
    latitude: -2.0829656,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "cdmx",
    ciudad: "México - Ciudad de México",
    direccion:
      "Prol. Pº de la Reforma 1200, Santa Fe, Contadero, Cuajimalpa de Morelos, 05349 Ciudad de México, México",
    longitude: -99.2728019,
    latitude: 19.3587457,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "queretaro",
    ciudad: "México - Querétaro",
    direccion:
      "World Trade Center Querétaro, Piso 13, Oficina 1305, Pº de la República Km 13020, 76230 Juriquilla, Querétaro, México",
    longitude: -100.458387,
    latitude: 20.7125923,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "santiago",
    ciudad: "Chile - Santiago",
    direccion: "Av. Providencia 111, 7500776 Providencia, Región Metropolitana, Chile",
    longitude: -70.632271,
    latitude: -33.4370521,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "grafelfing",
    ciudad: "Alemania - Gräfelfing",
    direccion: "Würmstraße 55, 82166 Gräfelfing, Alemania",
    longitude: 11.4426362,
    latitude: 48.1243524,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "andorra",
    ciudad: "Andorra – Andorra la Vella",
    direccion: "Av. Meritxell 75, AD500 - Andorra la Vella",
    longitude: 1.5229483,
    latitude: 42.5076947,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "milan",
    ciudad: "Italia – Milán",
    direccion: "Via Andegari, 4, 20121 - Milán (Italia)",
    longitude: 9.1896692,
    latitude: 45.4684918,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "wroclaw",
    ciudad: "Polonia – Wrocław",
    direccion: "Plac Teatralny 1/22, 50–051 Wrocław (Polonia)",
    longitude: 17.0316757,
    latitude: 51.1055189,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "varsovia",
    ciudad: "Polonia – Varsovia",
    direccion: "ul. Kopernika 5/7, 00-367 Warszawa (Polonia)",
    longitude: 21.0711489,
    latitude: 52.2333742,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "londres",
    ciudad: "Reino Unido – Londres",
    direccion: "20-22 Wenlock Road, Shoreditch, N1 7GU Londres (Reino Unido)",
    longitude: -0.093654,
    latitude: 51.5307035,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "bucarest",
    ciudad: "Rumanía – Bucarest",
    direccion: "Șoseaua Pipera-Tunari, nr. 1H-L13, 077191 - Voluntari, Ilfov (Rumanía)",
    longitude: 26.1772794,
    latitude: 44.4902779,
    fotos: FOTOS_PLACEHOLDER,
  },
  {
    id: "tetuan",
    ciudad: "Marruecos – Tetuán",
    direccion:
      "Oficinas Wilaya Center, Avenida Ali Yata, 2º Piso, Oficina Nº 19, 93000 - Tetuán (Marruecos)",
    longitude: -5.3746918,
    latitude: 35.5697958,
    fotos: FOTOS_PLACEHOLDER,
  },
];

function App() {
  const mapRef = useRef<MapRef>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const handleMarkerClick = (oficina: Oficina) => {
    setActiveRegion(null);
    mapRef.current?.flyTo({
      center: [oficina.longitude, oficina.latitude],
      zoom: 12,
      duration: 1500,
    });
  };

  const handleRegionClick = (region: Region) => {
    setActiveRegion(region.id);
    mapRef.current?.flyTo({
      center: region.center,
      zoom: region.zoom,
      duration: 1500,
    });
  };

  return (
    <div style={{ height: "100vh", width: "100vw", background: "#071B7F" }}>
      <Map
        ref={mapRef}
        projection={{ type: "globe" }}
        center={[-3.7, 40.4]}
        zoom={1.5}
        className="h-full w-full bg-[#071B7F]"
      >
        <CountryLabelFilter codes={PAISES_CON_OFICINA} />
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          {REGIONES.map((region) => (
            <button
              key={region.id}
              type="button"
              onClick={() => handleRegionClick(region)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm transition-colors",
                activeRegion === region.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background/90 text-foreground border-border hover:bg-accent",
              )}
            >
              {region.label}
            </button>
          ))}
        </div>
        {OFICINAS.map((oficina) => (
          <MapMarker
            key={oficina.id}
            longitude={oficina.longitude}
            latitude={oficina.latitude}
            onClick={() => handleMarkerClick(oficina)}
          >
            <MarkerContent />
            <MarkerPopup closeButton className="w-72 max-w-72">
              <div className="pr-5">
                <strong className="text-sm">
                  {oficina.nombre ?? oficina.ciudad}
                </strong>
                <p className="text-muted-foreground text-xs">
                  {oficina.direccion}
                </p>
              </div>
              <PhotoGallery photos={oficina.fotos} className="mt-2" />
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

export default App;
