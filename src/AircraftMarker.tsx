import { Box, Heading, Text } from "@chakra-ui/react";
import { Aircraft } from "mode-s-aircraft-store";
import { Marker } from "react-map-gl";

export const AircraftMarker: React.VFC<{ data: Aircraft,zoom:number }> = ({ data,zoom }) => {
  const callsign = data.callsign.length > 0 ? data.callsign : "---";
  const altitude =
    data.altitude === 0
      ? "---"
      : String(Math.floor(data.altitude / 100)).padStart(3, "0");
    const speed = data.speed === 0 ? "---" : String(Math.floor(data.speed)).padStart(3, '0');
    const isBottomMessageBox = (270 < data.heading && data.heading < 360) || (0 < data.heading && data.heading < 90)
  return (
    <Marker longitude={data.lng} latitude={data.lat} anchor="bottom">
      <Box sx={{ color: "white", fontFamily: "Menlo", lineHeight: 1 }}>
        <Box
          sx={{
            mt: 1,
            width: "14px",
            height: "14px",
            border: "1px solid white",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "6px",
              left: "6px",
              height: "1px",
              width: data.speed / 7,
              backgroundColor: "white",
              zIndex: -1,
              transform: `rotate(${Math.floor(data.heading) - 90}deg)`,
              transformOrigin: "left top",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "6px",
              left: "6px",
              height: "1px",
              width: "7px",
              backgroundColor: "black",
              zIndex: -1,
              transform: `rotate(${Math.floor(data.heading) - 90}deg)`,
              transformOrigin: "left top",
            }}
          />
          {zoom > 8.5 && (
            <Box
              sx={{
                position: "absolute",
                bottom: isBottomMessageBox ? -10 : 4,
                left: -1,
              }}
            >
              <Text>{callsign}</Text>
              <Text>{altitude}</Text>
              <Text>{speed}</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Marker>
  );
};
