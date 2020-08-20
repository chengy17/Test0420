
//% color="#836FFF" weight=25 icon="\uf11c"
namespace SBus {

    const COLOR_ADD = 0X15;
    const COLOR_REG = 0x00;
    const COLOR_R = 0X10;
    const COLOR_G = 0X0D;
    const COLOR_B = 0x13;

    let initialized = false;
    let val_red = 0;
    let val_green = 0;
    let val_blue = 0;

    function i2cWriteData(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    function i2cWriteArray(addr: number, reg: number, value1: number, value2: number) {
        let buf = pins.createBuffer(5);
        buf[0] = reg;
        buf[1] = (value1 >> 8) & 0xff;
        buf[2] = value1 & 0xff;
        buf[3] = (value2 >> 8) & 0xff;
        buf[4] = value2 & 0xff;
        pins.i2cWriteBuffer(addr, buf);
    }


    function initColorI2C(): void {
        initialized = true;
    }

    function Ctrl_Servo_1(): void {
        let buff_R = pins.createBuffer(2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        buff_R = pins.i2cReadBuffer(COLOR_ADD, 2);

    }

    /**
     * set servo value
     */
    //% blockId=SBus_Ctrl_Servo block="Ctrl_Servo|value %value"
    //% blockGap=20
    //% weight=100
    //% color="#836FFF"
    export function Ctrl_Servo(value: number) {
        if (!initialized) {
            initColorI2C();
        }

        i2cWriteArray(0x15, 0x11, value, 500);
        
    }

    /**
     * get servo value
     */
    //% blockId=SBus_Read_Servo block="Read_Servo|value %value"
    //% blockGap=20
    //% weight=100
    //% color="#836FFF"
    export function Read_Servo(id: number) :number{
        if (!initialized) {
            initColorI2C();
        }
        i2cWriteData(0x15, 0x31, 0x01);
        basic.pause(10);

        let buff_Read = pins.createBuffer(2);

        buff_Read = pins.i2cReadBuffer(0x15, 2);

        let value1 = ((buff_Read[0] & 0xff) << 8) + (buff_Read[1] & 0xff);
        return value1;
    }
}