/*
Copyright (C): 2010-2019, Shenzhen Yahboom Tech
modified from chengengyue
*/


//% color="#ECA40D" weight=25 icon="\uf1b9"
namespace OmniBit_0 {

    //% blockId=CrocoKit_Sensor_IR block="IR|pin %pin"
    //% weight=96
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function IR(pin: DigitalPin): boolean {
        
        return true;
    }

}

//% color="#ECA40D" weight=24 icon="\uf1e3"
namespace OmniBit_1 {

    //% blockId=CrocoKit_Display_LED2 block="LED2|pin %pin|value %value"
    //% weight=4
    //% blockGap=20
    //% color="#C814B8"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function LED2(pin: AnalogPin, value: number): void {
        pins.analogWritePin(pin, value * 1024 / 256);
    }
    
}

//% color="#ECA40D" weight=23 icon="\uf0d1"
namespace OmniBit_2 {
   
    //% blockId=CrocoKit_Input_Rocker block="Rocker|pin1 %pin1|pin2 %pin2"
    //% weight=99
    //% blockGap=20
    //% color="#808080"
    export function Rocker(pin1: AnalogPin, pin2: AnalogPin): boolean {
        
        return true;
    }

}

//% color="#ECA40D" weight=22 icon="\uf047"
namespace OmniBit_3 {

    //% blockId=CrocoKit_Motor_Servo block="Servo|pin %pin|value %value"
    //% weight=100
    //% blockGap=20
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
	//% advanced=true
    export function Servo(pin: AnalogPin, value: number): void {
        pins.servoWritePin(pin, value);
    }

    //% blockId=CrocoKit_Motor_MotorRun block="Motor|%pin|speed %speed"
    //% weight=99
    //% blockGap=20
    //% speed.min=0 speed.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function MotorRun(pin: AnalogPin, speed: number): void {
        pins.analogWritePin(pin, speed);
    }

    //% blockId=CrocoKit_Motor_MotorStop block="MotorStop |pin %pin"
    //% weight=98
    //% blockGap=20
    export function MotorStop(pin: AnalogPin): void {
        pins.analogWritePin(pin, 0);
    }
}

