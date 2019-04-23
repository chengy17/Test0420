//% color="#228B22" weight=25 icon="\uf0b2"
namespace TTT{

    const COLOR_ADD = 0x53;
    const COLOR_REG = 0x00;
    const COLOR_R = 0x00;
    const COLOR_G = 0x04;
    const COLOR_B = 0x05;
    

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
        // setRegConfig();

        
        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        pins.i2cWriteNumber(COLOR_ADD, COLOR_G, NumberFormat.UInt8BE);
        pins.i2cWriteNumber(COLOR_ADD, COLOR_B, NumberFormat.UInt8BE);

        initialized = true;
    }

    // function setRegConfig(): void {
        
    // }

    // function setFreq(freq: number): void {
    //     // Constrain the frequency
    //     let prescaleval = 25000000;
    //     prescaleval /= 4096;
    //     prescaleval /= freq;
    //     prescaleval -= 1;
    //     let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
    //     let oldmode = i2cread(COLOR_ADD, COLOR_MODE);
    //     let newmode = (oldmode & 0x7F) | 0x10; // sleep
    //     i2cwrite(COLOR_ADD, COLOR_MODE, newmode); // go to sleep
    //     i2cwrite(COLOR_ADD, COLOR_MODE, prescale); // set the prescaler
    //     i2cwrite(COLOR_ADD, COLOR_MODE, oldmode);
    //     control.waitMicros(5000);
    //     i2cwrite(COLOR_ADD, COLOR_MODE, oldmode | 0xa1);
    // }

    
    //% blockId=TTT_RGB block="RGB|%rgb"
    //% group="Color" weight=21
    //% blockGap = 50
    export function RGB(rgb: enRGB): number {
        if (!initialized) {
            initColorI2C();
        }
        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        let buff = pins.i2cReadBuffer(COLOR_ADD, 4);
        return buff[rgb];
        
        // let buff: number = 0;
        // switch (rgb) {
        //     case enRGB.Blue:
        //         buff = i2cread(COLOR_ADD, COLOR_B);
        //         return buff;
        //         break;
        //     case enRGB.Green:
        //         buff = i2cread(COLOR_ADD, COLOR_G);
        //         return buff;
        //         break;
        //     case enRGB.Red:
        //         buff = i2cread(COLOR_ADD, COLOR_R);
        //         return buff;
        //         break;
        //     case enRGB.Brightness:
        //         buff = i2cread(COLOR_ADD, COLOR_REG);
        //         return buff;
        //         break;
        //     default:
        //         return 9;
        //         break;
        // }
        
        
        
    }

}