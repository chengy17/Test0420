//% color="#228B22" weight=25 icon="\uf0b2"
namespace CrocoKit_Sensor {

    //% blockId=CrocoKit_Sensor_Ultrasonic block="Ultrasonic |Trig %Trig|Echo %Echo"
    //% color="#228B22"
    //% weight=96
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number {

        let list: Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            pins.setPull(Trig, PinPullMode.PullNone);
            pins.digitalWritePin(Trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(Trig, 1);
            control.waitMicros(15);
            pins.digitalWritePin(Trig, 0);

            let d = pins.pulseIn(Echo, PulseValue.High, 43200);
            list[i] = Math.floor(d / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3]) / 3;
        return Math.floor(length);
    }
}