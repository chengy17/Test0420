const HT16K33_ADDRESS = 0x70
const HT16K33_BLINK_CMD = 0x80
const HT16K33_BLINK_DISPLAYON = 0x01
const HT16K33_CMD_BRIGHTNESS = 0xE0

basic.forever(function () {
    LEDShowStop();
})

let manStop = pins.createBuffer(17);
let manStop1: number[] = [0xC0, 0x03, 0xC0, 0x03, 0xC0, 0x03, 0xC0, 0x03, 0xA0, 0x05, 0x80, 0x01, 0x40, 0x02, 0x20, 0x04];

let matBuf = pins.createBuffer(17);
let initMatrix = false

function LEDShowStop(): void {
    if (!initMatrix) {
        matrixInit();
        initMatrix = true;
    }

    manStop[0] = manStop1[0];
    // for (let i = 1; i < 17; i += 2) {
    //     manStop[i] = manStop1[i + 1];
    //     manStop[i + 1] = manStop1[i];
    // }

    for (let i = 0; i < 17; i++) {
        manStop[i] = manStop1[i];
    }
    pins.i2cWriteBuffer(HT16K33_ADDRESS, manStop);

}

function matrixInit() {
    i2ccmd(HT16K33_ADDRESS, 0x21);// turn on oscillator
    i2ccmd(HT16K33_ADDRESS, HT16K33_BLINK_CMD | HT16K33_BLINK_DISPLAYON | (0 << 1));
    i2ccmd(HT16K33_ADDRESS, HT16K33_CMD_BRIGHTNESS | 0xF);
}

function i2ccmd(addr: number, value: number) {
    let buf = pins.createBuffer(1)
    buf[0] = value
    pins.i2cWriteBuffer(addr, buf)
}