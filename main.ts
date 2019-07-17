/*
Copyright (C): 2010-2019, Shenzhen Yahboom Tech
modified from chengengyue
*/


//% color="#228B22" weight=25 icon="far fa-truck-pickup"
namespace CrocoKit_Sensor {

    //% blockId=CrocoKit_Sensor_IR block="IR|pin %pin|value %value"
    //% weight=96
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function IR(pin: DigitalPin, value: enObstacle): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }

}

//% color="#C814B8" weight=24 icon="\uf63c"
namespace CrocoKit_Display {

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

//% color="#1E90FF" weight=23 icon="\uf207"
namespace CrocoKit_Input {
   
    //% blockId=CrocoKit_Input_Rocker block="Rocker|pin1 %pin1|pin2 %pin2|value %value"
    //% weight=99
    //% blockGap=20
    //% color="#808080"
    export function Rocker(pin1: AnalogPin, pin2: AnalogPin, value: enRocker): boolean {
        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin2);
        let now_state = enRocker.NoState;

        if (x < 100) // 左
        {
            now_state = enRocker.Left;
        }
        else if (x > 700) //右
        {
            now_state = enRocker.Right;
        }
        else  // 上下
        {
            if (y < 100) //下
            {
                now_state = enRocker.Down;
            }
            else if (y > 700) //上
            {
                now_state = enRocker.Up;
            }
        }
        return now_state == value;
    }

}

//% color="#0c98df" weight=22 icon="\uf207"
namespace CrocoKit_Motor {

    //% blockId=CrocoKit_Motor_Servo block="Servo|pin %pin|value %value"
    //% weight=100
    //% blockGap=20
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
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

