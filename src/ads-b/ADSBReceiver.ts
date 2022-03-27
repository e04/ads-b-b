import RtlSdr from "../radio/rtlsdr.js";
import Demodulator, { ADSBRawMessage } from 'mode-s-demodulator'
import AircraftStore from "mode-s-aircraft-store.js";

export class ADSBReceiver {
    private enableRead = false;
    private device: any = null;
    private demodulator:Demodulator  | null = null;

    constructor(private store: AircraftStore) {
    }

    async init() {
        this.device = await RtlSdr.requestDevice()
        await this.device.open({
            ppm: 0,
        });
        await this.device.setSampleRate(2000000);
        await this.device.setCenterFrequency(1090000000);
        await this.device.resetBuffer();

        this.demodulator = new Demodulator()
    }

    async start(onReceive?: () => void) {
        this.enableRead = true;
        try {
            while (this.enableRead) {
                const samples = await this.device.readSamples(16 * 16384);
                const array = new Uint8Array(samples)

                this.demodulator!.process(array, array.length, ((message: ADSBRawMessage) => {
                    this.store.addMessage(message)
                    if (onReceive != null) onReceive()
                }).bind(this))
            }
        } catch (e) {
            alert(e)
        }
    }

    stop() {
        this.enableRead = false
    }
}