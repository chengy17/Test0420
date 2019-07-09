namespace CrocoKit_Sensor {
    //% blockId=CrocoKit_Sensor_Ultrasonic block="Ultrasonic|Trig %Trig|Echo %Echo"
    //% color="#228B22"
    //% weight=97
    //% blockGap=20
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number {
        let list: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 10; i++) {
            pins.setPull(Trig, PinPullMode.PullNone);
            pins.digitalWritePin(Trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(Trig, 1);
            control.waitMicros(15);
            pins.digitalWritePin(Trig, 0);

            let d = pins.pulseIn(Echo, PulseValue.High);   //read the hight level of time
            d = d / 58;    //get the distance_cm,  Y_m=(X_s*340)/2 -> cm=ms/58
            list[i] = Math.floor(d);
        }
        list.sort();
        let length = (list[3] + list[4] + list[5] + list[6] ) / 4;
        return Math.floor(length);
    }
}