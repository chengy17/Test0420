//% color="#228B22" weight=25 icon="\uf0b2"
namespace TTT{

    const COLOR_ADD = 0x53;
    const COLOR_REG = 0x00;
    const COLOR_R = 0x10;
    const COLOR_G = 0x0D;
    const COLOR_B = 0x13;
    

    let initialized = false;

    export enum enColor {

        //% blockId="OFF" block="无"
        OFF = 0,
        //% blockId="Red" block="红色"
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"
        White,
        //% blockId="Cyan" block="青色"
        Cyan,
        //% blockId="Pinkish" block="品红"
        Pinkish,
        //% blockId="Yellow" block="黄色"
        Yellow,
    }

    export enum enRGB {
        //% block=brightness
        Brightness = 0,
        //% block=red
        Red = 1,
        //% block=green
        Green = 2,
        //% block=blue
        Blue = 3
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initColorI2C(): void {
        // i2cwrite(COLOR_ADD, COLOR_R, 0X06);
        // i2cwrite(COLOR_ADD, COLOR_G, 0X41);
        // i2cwrite(COLOR_ADD, COLOR_B, 0X01);
        //setFreq(50);
        
        setRegConfig();
        initialized = true;
    }

    function setRegConfig(): void {
        i2cwrite(COLOR_ADD, COLOR_REG, 0x06);
        i2cwrite(COLOR_ADD, 0x04, 0x41);
        i2cwrite(COLOR_ADD, 0x05, 0x01);
    }

    //% blockId=TTT_GetColor block="Color"
    //% group="Color" weight=28
    export function GetColor(): number {
        pins.i2cWriteNumber(COLOR_ADD, COLOR_G, NumberFormat.UInt8BE);
        let buff = pins.i2cReadBuffer(COLOR_ADD, 2);
        return buff[0] * 2;
    }
    
    //% blockId=TTT_RGB block="RGB|%rgb"
    //% group="Color" weight=21
    //% blockGap = 50
    export function RGB(rgb: enRGB): number {
        if (!initialized) {
            initColorI2C();
        }
        return 1;

    }






}