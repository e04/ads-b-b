import { Box } from "@chakra-ui/react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { Aircraft } from "mode-s-aircraft-store";
import { mapStyle } from "./mapStyle";

export const Radar: React.VFC<{
  aircrafts: Aircraft[];
  zoom: number;
  setZoom: (newValue: number) => void;
}> = ({ aircrafts, zoom, setZoom }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: mapStyle as any,
      center: [139.5, 35.8],
      zoom: zoom,
    });

    map.current.on("zoomend", () => {
      if (map.current) {
        setZoom(map.current.getZoom());
      }
    });
  }, [zoom, setZoom]);

  useEffect(() => {
    if (!map.current) return;

    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    aircrafts.forEach((aircraft) => {
      const el = document.createElement("div");
      el.style.color = "white";
      el.style.fontFamily = "Menlo";
      el.style.lineHeight = "1";

      const callsign = aircraft.callsign.length > 0 ? aircraft.callsign : "---";
      const altitude =
        aircraft.altitude === 0
          ? "---"
          : String(Math.floor(aircraft.altitude / 100)).padStart(3, "0");
      const speed =
        aircraft.speed === 0
          ? "---"
          : String(Math.floor(aircraft.speed)).padStart(3, "0");
      const isBottomMessageBox =
        (270 < aircraft.heading && aircraft.heading < 360) ||
        (0 < aircraft.heading && aircraft.heading < 90);

      el.innerHTML = `
        <div style="margin-top: 4px; width: 14px; height: 14px; border: 1px solid white; position: relative;">
          <div style="
            position: absolute;
            top: 6px;
            left: 6px;
            height: 1px;
            width: ${aircraft.speed / 7}px;
            background-color: white;
            z-index: -1;
            transform: rotate(${Math.floor(aircraft.heading) - 90}deg);
            transform-origin: left top;
          "></div>
          <div style="
            position: absolute;
            top: 6px;
            left: 6px;
            height: 1px;
            width: 7px;
            background-color: black;
            z-index: -1;
            transform: rotate(${Math.floor(aircraft.heading) - 90}deg);
            transform-origin: left top;
          "></div>
          ${
            zoom > 8.5
              ? `
            <div style="
              position: absolute;
              bottom: ${isBottomMessageBox ? "-40px" : "14px"};
              left: -1px;
              font-size: 12px;
            ">
              <div>${callsign}</div>
              <div>${altitude}</div>
              <div>${speed}</div>
            </div>
          `
              : ""
          }
        </div>
      `;

      const marker = new maplibregl.Marker(el)
        .setLngLat([aircraft.lng, aircraft.lat])
        .addTo(map.current!);
      markers.current.push(marker);
    });
  }, [aircrafts, zoom]);

  return <Box ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
};
