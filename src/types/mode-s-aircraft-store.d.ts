import { ADSBRawMessage } from "mode-s-demodulator";

export type Aircraft = {
    icao: number,
    altitude: number,
    speed: number,
    heading: number,
    lat: number,
    lng: number,
    callsign: string,
    count: number,
    seen: number
}

export default class AircraftStore {
    constructor(param: { timeout: number })
    addMessage(rawMessage: ADSBRawMessage): void
    getAircrafts(): Aircraft[]
}