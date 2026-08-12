import { useRef, useState } from "react";
import { Map, type MapRef } from "@/components/ui/map";
import { OfficeSidebar } from "@/components/OfficeSidebar";
import { RegionSwitcher } from "@/components/map/RegionSwitcher";
import { BrandBadge } from "@/components/map/BrandBadge";
import { PresenceStats } from "@/components/map/PresenceStats";
import { BrandTag } from "@/components/map/BrandTag";
import { MapHint } from "@/components/map/MapHint";
import { MobileZoomControls } from "@/components/map/MobileZoomControls";
import { OfficeMarkers } from "@/components/map/OfficeMarkers";
import { useMapStyles } from "@/hooks/useMapStyles";
import { OFICINAS, ORIGEN_INFO, getRegionBounds } from "@/data/oficinas";
import { REGIONES } from "@/data/regiones";
import { getOfficePhotos } from "@/lib/officePhotos";
import { displayCiudad } from "@/lib/format";
import type { Oficina, Region } from "@/types/office";
import "./App.css";

const INITIAL_CENTER: [number, number] = [-3.7, 40.4];
const INITIAL_ZOOM = 1.5;
const OFFICE_ZOOM = 6;
const FLY_TO_DURATION = 1500;

const BACKGROUND_GRADIENT =
  "radial-gradient(circle at 50% 45%, #1a2fa0 0%, #0d1a78 45%, #030720 85%)";

function App() {
  const mapRef = useRef<MapRef>(null);
  const [activeRegionId, setActiveRegionId] = useState<string | null>(
    "todos",
  );
  const [selectedOficina, setSelectedOficina] = useState<Oficina | null>(
    null,
  );
  const mapStyles = useMapStyles();

  const handleMarkerSelect = (oficina: Oficina) => {
    setActiveRegionId(null);
    setSelectedOficina(oficina);
    mapRef.current?.flyTo({
      center: [oficina.longitude, oficina.latitude],
      zoom: OFFICE_ZOOM,
      duration: FLY_TO_DURATION,
    });
  };

  const handleRegionSelect = (region: Region) => {
    setActiveRegionId(region.id);
    setSelectedOficina(null);

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

  const handleSidebarClose = () => setSelectedOficina(null);

  const sidebarOficina = selectedOficina && {
    ...selectedOficina,
    ciudad: displayCiudad(selectedOficina.ciudad),
    fotos: getOfficePhotos(selectedOficina.id),
  };

  return (
    <div
      style={{ height: "100vh", width: "100vw", background: BACKGROUND_GRADIENT }}
    >
      <Map
        ref={mapRef}
        projection={{ type: "globe" }}
        center={INITIAL_CENTER}
        zoom={INITIAL_ZOOM}
        styles={mapStyles}
        className="h-full w-full bg-transparent"
      >
        <RegionSwitcher
          regiones={REGIONES}
          activeRegionId={activeRegionId}
          onSelect={handleRegionSelect}
        />
        <BrandBadge />
        <OfficeMarkers oficinas={OFICINAS} onSelect={handleMarkerSelect} />
        <PresenceStats total={OFICINAS.length} />
        <BrandTag />
        <MapHint />
        <MobileZoomControls />
        <OfficeSidebar
          key={selectedOficina?.id}
          oficina={sidebarOficina}
          meta={selectedOficina ? ORIGEN_INFO[selectedOficina.id] : null}
          onClose={handleSidebarClose}
        />
      </Map>
    </div>
  );
}

export default App;
