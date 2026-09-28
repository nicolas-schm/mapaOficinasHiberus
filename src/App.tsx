import { useRef, useState } from "react";
import { Map, type MapRef } from "@/components/ui/map";
import { OfficeSidebar } from "@/components/OfficeSidebar";
import { CountryOfficesPanel } from "@/components/CountryOfficesPanel";
import { RegionSwitcher } from "@/components/map/RegionSwitcher";
import { CountryDropdown } from "@/components/map/CountryDropdown";
import { BrandBadge } from "@/components/map/BrandBadge";
import { PresenceStats } from "@/components/map/PresenceStats";
import { BrandTag } from "@/components/map/BrandTag";
import { MapHint } from "@/components/map/MapHint";
import { MobileZoomControls } from "@/components/map/MobileZoomControls";
import { OfficeMarkers } from "@/components/map/OfficeMarkers";
import { CountryOfficeOverlay } from "@/components/map/CountryOfficeOverlay";
import { useMapStyles } from "@/hooks/useMapStyles";
import {
  OFICINAS,
  ORIGEN_INFO,
  PAISES,
  getRegionBounds,
  getCountryBounds,
  getOficinasByPais,
} from "@/data/oficinas";
import { REGIONES } from "@/data/regiones";
import { getOfficePhotos } from "@/lib/officePhotos";
import { displayCiudad } from "@/lib/format";
import type { Oficina, Region } from "@/types/office";
import "./App.css";

const INITIAL_CENTER: [number, number] = [-30.523865403512332, 6.621962644059004];
const INITIAL_ZOOM = 3.1833544906905806;
const OFFICE_ZOOM = 6;
const FLY_TO_DURATION = 1500;
const SIDE_PANEL_WIDTH = 507;
const DESKTOP_BREAKPOINT = 640;

const BACKGROUND_GRADIENT =
  "radial-gradient(circle at 50% 45%, #1a2fa0 0%, #0d1a78 45%, #030720 85%)";

function getSidePanelAwarePadding() {
  const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
  if (isDesktop) {
    return { top: 60, bottom: 60, left: SIDE_PANEL_WIDTH + 60, right: 60 };
  }
  return { top: 60, bottom: 220, left: 30, right: 30 };
}

function getPinnedOficina(): Oficina | null {
  const id = new URLSearchParams(window.location.search).get("oficina");
  if (!id) return null;
  return OFICINAS.find((oficina) => oficina.id === id) ?? null;
}

function App() {
  const mapRef = useRef<MapRef>(null);
  const [pinnedOficina] = useState<Oficina | null>(getPinnedOficina);
  const isPinned = pinnedOficina !== null;
  const [activeRegionId, setActiveRegionId] = useState<string | null>(
    isPinned ? null : "todos",
  );
  const [selectedOficina, setSelectedOficina] = useState<Oficina | null>(
    pinnedOficina,
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState(
    pinnedOficina
      ? `Mostrando oficina de ${pinnedOficina.nombre ?? pinnedOficina.ciudad}`
      : "",
  );
  const mapStyles = useMapStyles();

  const handleMarkerSelect = (oficina: Oficina) => {
    setActiveRegionId(null);
    setSelectedCountry(null);
    setSelectedOficina(oficina);
    setAnnouncement(
      `Mostrando oficina de ${oficina.nombre ?? oficina.ciudad}`,
    );
    mapRef.current?.flyTo({
      center: [oficina.longitude, oficina.latitude],
      zoom: OFFICE_ZOOM,
      duration: FLY_TO_DURATION,
    });
  };

  const handleRegionSelect = (region: Region) => {
    setActiveRegionId(region.id);
    setSelectedOficina(null);
    setSelectedCountry(null);
    setAnnouncement(`Mostrando región ${region.label}`);

    if (region.id === "todos") {
      mapRef.current?.flyTo({
        center: region.center,
        zoom: region.zoom,
        duration: FLY_TO_DURATION,
      });
      return;
    }

    mapRef.current?.fitBounds(getRegionBounds(region.label), {
      padding: 60,
      duration: FLY_TO_DURATION,
      maxZoom: 6,
    });
  };

  const handleCountrySelect = (pais: string) => {
    setActiveRegionId(null);
    setSelectedOficina(null);
    setSelectedCountry(pais);
    setAnnouncement(`Mostrando oficinas en ${pais}`);

    const isSingleOffice = getOficinasByPais(pais).length === 1;

    mapRef.current?.fitBounds(getCountryBounds(pais), {
      padding: getSidePanelAwarePadding(),
      duration: FLY_TO_DURATION,
      maxZoom: isSingleOffice ? 6 : 10,
    });
  };

  const handleCountryOfficeSelect = (id: string) => {
    const oficina = OFICINAS.find((o) => o.id === id);
    if (oficina) handleMarkerSelect(oficina);
  };

  const handleSidebarClose = () => setSelectedOficina(null);
  const handleCountryPanelClose = () => setSelectedCountry(null);

  const sidebarOficina = selectedOficina && {
    ...selectedOficina,
    ciudad: displayCiudad(selectedOficina.ciudad),
    fotos: getOfficePhotos(selectedOficina.id),
  };

  const countryIso = selectedCountry
    ? PAISES.find((p) => p.pais === selectedCountry)?.iso
    : undefined;
  const countryOficinas = selectedCountry
    ? getOficinasByPais(selectedCountry).map((o) => ({
        id: o.id,
        ciudad: displayCiudad(o.ciudad),
        nombre: o.nombre,
      }))
    : [];

  return (
    <main
      aria-label="Mapa interactivo de oficinas Hiberus"
      style={{ height: "100vh", width: "100vw", background: BACKGROUND_GRADIENT }}
    >
      <div role="status" aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <Map
        ref={mapRef}
        projection={{ type: "globe" }}
        center={
          pinnedOficina
            ? [pinnedOficina.longitude, pinnedOficina.latitude]
            : INITIAL_CENTER
        }
        zoom={pinnedOficina ? OFFICE_ZOOM : INITIAL_ZOOM}
        interactive={!isPinned}
        styles={mapStyles}
        className="h-full w-full bg-transparent"
      >
        <CountryOfficeOverlay />
        {!isPinned && (
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 sm:gap-2">
            <RegionSwitcher
              regiones={REGIONES}
              activeRegionId={activeRegionId}
              onSelect={handleRegionSelect}
            />
            <CountryDropdown paises={PAISES} onSelect={handleCountrySelect} />
          </div>
        )}
        <BrandBadge />
        <OfficeMarkers
          oficinas={pinnedOficina ? [pinnedOficina] : OFICINAS}
          onSelect={handleMarkerSelect}
        />
        <PresenceStats total={OFICINAS.length} />
        <BrandTag />
        {!isPinned && <MapHint />}
        {!isPinned && <MobileZoomControls />}
        <OfficeSidebar
          key={selectedOficina?.id}
          oficina={sidebarOficina}
          meta={selectedOficina ? ORIGEN_INFO[selectedOficina.id] : null}
          onClose={handleSidebarClose}
          closable={!isPinned}
        />
        {selectedCountry && countryIso && (
          <CountryOfficesPanel
            key={selectedCountry}
            pais={selectedCountry}
            iso={countryIso}
            oficinas={countryOficinas}
            onSelectOficina={handleCountryOfficeSelect}
            onClose={handleCountryPanelClose}
          />
        )}
      </Map>
    </main>
  );
}

export default App;
