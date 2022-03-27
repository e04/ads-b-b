import { Text, HStack, Stack, Badge, Switch, Box } from "@chakra-ui/react";
import AircraftStore, { Aircraft } from "mode-s-aircraft-store";
import { useState } from "react";
import { useThrottle } from "react-use";
import { ADSBReceiver } from "./ads-b/ADSBReceiver";

export const Controller: React.VFC<{
  receiver: React.MutableRefObject<ADSBReceiver>;
  aircrafts: Aircraft[]
}> = ({ receiver, aircrafts }) => {
  const [receiveIsRunning, setReceiverIsRunning] = useState(false);
  const [isReceiveIndicatorOn, setIsReceiveIndicatorOn] = useState(false);
  const throttledIsReceiveIndicatorOn = useThrottle(isReceiveIndicatorOn);

  const handleReceive = () => {
    setIsReceiveIndicatorOn(true);
    setTimeout(() => {
      setIsReceiveIndicatorOn(false);
    }, 500);
  };

  const handleStart = async () => {
    await receiver.current.init();
    receiver.current.start(handleReceive);
    setReceiverIsRunning(true);
  };

  const statusText = () => {
    const decodedAircraftCount = String(aircrafts.length).padStart(3, ' ');
    const positionAvailableAircraftCount = String(
      aircrafts.filter((aircraft) => aircraft.lat !== 0)
        .length
    ).padStart(3, " ");
    return `SHOW:${positionAvailableAircraftCount} / DECD:${decodedAircraftCount}`
  }

  return (
    <>
      <HStack
        align="center"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: 10,
          px: 2,
        }}
        spacing={4}
      >
        <Stack justify="center">
          <Badge
            fontSize="1rem"
            variant={throttledIsReceiveIndicatorOn ? "solid" : "outline"}
            colorScheme={throttledIsReceiveIndicatorOn ? "green" : "gray"}
            px={2}
          >
            RCEV
          </Badge>
        </Stack>
        <Text color="gray" fontFamily="Menlo" whiteSpace="pre-wrap">{statusText()}</Text>
      </HStack>
      {!receiveIsRunning && (
        <Stack
          align="center"
          justify="center"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(5px) brightness(300%)",
          }}
          onClick={handleStart}
        ></Stack>
      )}
    </>
  );
};
