import { Box, Button, Container, Stack } from "@chakra-ui/react";
import AircraftStore, { Aircraft } from "mode-s-aircraft-store";
import { useEffect, useRef, useState } from "react";
import { ADSBReceiver } from "./ads-b/ADSBReceiver";
import { Controller } from "./Controller";
import { Radar } from "./Radar";

function App() {
  const store = useRef(new AircraftStore({ timeout: 15000 }));
  const receiver = useRef(new ADSBReceiver(store.current));
  const [zoom, setZoom] = useState(9);
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
    useEffect(() => {
      const timer = setInterval(() => {
        setAircrafts(store.current.getAircrafts());
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }, []);
  return (
    <Box width="100vw" height="100vh" sx={{ overflow: "hidden" }}>
      <Radar aircrafts={aircrafts} zoom={zoom} setZoom={setZoom}/>
      <Controller receiver={receiver} aircrafts={aircrafts} />
    </Box>
  );
}

export default App
