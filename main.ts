//% color="#228B22" weight=25 icon="\uf0b2"
namespace TTT{

    const COLOR_ADD = 0x53;
    const COLOR_REG = 0x00;
    const COLOR_R = 0x10;
    const COLOR_G = 0x0D;
    const COLOR_B = 0x13;
    

    let initialized = false;
    let val_red = 0; 
    let val_green = 0;
    let val_blue = 0;

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
        setRegConfig();
        initialized = true;
    }

    function setRegConfig(): void {
        i2cwrite(COLOR_ADD, COLOR_REG, 0x06);
        i2cwrite(COLOR_ADD, 0x04, 0x41);
        i2cwrite(COLOR_ADD, 0x05, 0x01);
    }

    export function GetRGB(): void {
        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        let buff_R = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_G, NumberFormat.UInt8BE);
        let buff_G = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_B, NumberFormat.UInt8BE);
        let buff_B = pins.i2cReadBuffer(COLOR_ADD, 2);

        let Red = (buff_R[1] & 0xff) << 8 | (buff_R[0] & 0xff);
        let Green = (buff_G[1] & 0xff) << 8 | (buff_G[0] & 0xff);
        let Blue = (buff_B[1] & 0xff) << 8 | (buff_B[0] & 0xff);

        val_red = (Red * 10) / 1224 * 25.5;
        val_green = (Green * 10) / 2186 * 25.5;
        val_blue = (Blue * 10) / 1104 * 25.5;

        if (val_red > val_green && val_red > val_blue) {         
            val_red = 255;        
            val_green /= 2;       
            val_blue /= 2;   
        }    
        else if (val_green > val_red && val_green > val_blue) {    
            val_green = 255;    
            val_red /= 2;    
            val_blue /= 2;   
        } 
        else if (val_blue > val_red && val_blue > val_green) {
            val_blue = 255;        
            val_red /= 2;        
            val_green /= 2;   
        }

    }

    //% blockId=TTT_GetR block="ColorR"
    //% group="Color" weight=28
    export function GetR(): number {
        // pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        // let buff = pins.i2cReadBuffer(COLOR_ADD, 2);
        // return buff[0] * 2;
        if (!initialized) {
            initColorI2C();
        }
        GetRGB();
        return val_red;
    }

    //% blockId=TTT_GetG block="ColorG"
    //% group="Color" weight=28
    export function GetG(): number {
        // pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        // let buff = pins.i2cReadBuffer(COLOR_ADD, 2);
        // return buff[0] * 2;
        if (!initialized) {
            initColorI2C();
        }
        GetRGB();
        return val_green;
    }

    //% blockId=TTT_GetB block="ColorB"
    //% group="Color" weight=28
    export function GetB(): number {
        // pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        // let buff = pins.i2cReadBuffer(COLOR_ADD, 2);
        // return buff[0] * 2;
        if (!initialized) {
            initColorI2C();
        }
        GetRGB();
        return val_blue;
    }
    


    //% blockId=TTT_GetColor block="Color"
    //% group="Color" weight=28
    export function GetColor(): number {
        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
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