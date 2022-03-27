import { Box } from "@chakra-ui/react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { AircraftMarker } from "./AircraftMarker";
import { useEffect, useState } from "react";
import AircraftStore, { Aircraft } from "mode-s-aircraft-store";

export const Radar: React.VFC<{
  aircrafts: Aircraft[];
  zoom: number;
  setZoom: (newValue: number) => void
}> = ({ aircrafts,zoom,setZoom }) => {

  return (
    <Box>
      <Map
        initialViewState={{
          latitude: parseFloat(import.meta.env.VITE_HOME_LAT as string),
          longitude: parseFloat(import.meta.env.VITE_HOME_LNG as string),
          zoom: 8,
        }}
        zoom={zoom}
        onZoom={(e) => setZoom(e.viewState.zoom)}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/refwfrewfre/cl151p0ww002h14lg0lt58q24"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN as string}
      >
        {aircrafts.map((aircraft) => (
          <AircraftMarker key={aircraft.icao} data={aircraft} zoom={zoom}/>
        ))}
      </Map>
    </Box>
  );
};
