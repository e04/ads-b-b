export type ADSBRawMessage = {
    msg: number[];
    msgtype: number;
    crcOk: boolean;
    crc: number;
    errorbit: number;
    icao: number;
    phaseCorrected: boolean;
    ca: number;
    metype: number;
    mesub: number;
    headingIsValid: unknown;
    heading: number | null;
    aircraftType: unknown;
    fflag: unknown;
    tflag: unknown;
    rawLatitude: number | null;
    rawLongitude: number | null;
    callsign: string;
    ewDir: unknown;
    ewVelocity: unknown;
    nsDir: unknown;
    nsVelocity: unknown;
    vertRateSource: unknown;
    vertRateSign: unknown;
    vertRate: unknown;
    speed: number | null;
    fs: number;
    dr: number;
    um: number;
    identity: number;
    altitude: number;
    unit: number;
}
export default class Demodulator {
    constructor()
    public process(iq: Uint8Array, size: number, callback: (message: ADSBRawMessage) => void): void;
}
