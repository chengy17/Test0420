
/*
Copyright (C): 2010-2019, Shenzhen Yahboom Tech
modified from chengengyue
load dependency
"CrocoKit": "file:../pxt-CrocoKit"
*/


//% color="#228B22" weight=25 icon="\uf0b2"
namespace CrocoKit_Sensor {

    const COLOR_ADD = 0x53;
    const COLOR_REG = 0x00;
    const COLOR_R = 0x10;
    const COLOR_G = 0x0D;
    const COLOR_B = 0x13;

    let initialized = false;
    let val_red = 0;
    let val_green = 0;
    let val_blue = 0;
  
    export enum enObstacle {
        //% blockId="Obstacle" block="Obstacle"
        Obstacle = 0,
        //% blockId="NoObstacle" block="NoObstacle"
        NoObstacle = 1
    }
	
	export enum enGetRGB {
        //% blockId="GetValueR" block="GetValueR"
        GetValueR = 0,
        //% blockId="GetValueG" block="GetValueG"
        GetValueG = 1,
        //% blockId="GetValueB" block="GetValueB"
        GetValueB = 2
    }
	
	function setRegConfig(): void {
        i2cwrite(COLOR_ADD, COLOR_REG, 0x06);
        i2cwrite(COLOR_ADD, 0x04, 0x41);
        i2cwrite(COLOR_ADD, 0x05, 0x01);
    }
	
	function initColorI2C(): void {
        setRegConfig();
        initialized = true;
    }
	
	function GetRGB(): void {
        let buff_R = pins.createBuffer(2);
        let buff_G = pins.createBuffer(2);
        let buff_B = pins.createBuffer(2);
        pins.i2cWriteNumber(COLOR_ADD, COLOR_R, NumberFormat.UInt8BE);
        buff_R = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_G, NumberFormat.UInt8BE);
        buff_G = pins.i2cReadBuffer(COLOR_ADD, 2);

        pins.i2cWriteNumber(COLOR_ADD, COLOR_B, NumberFormat.UInt8BE);
        buff_B = pins.i2cReadBuffer(COLOR_ADD, 2);

        let Red = (buff_R[1] & 0xff) << 8 | (buff_R[0] & 0xff);
        let Green = (buff_G[1] & 0xff) << 8 | (buff_G[0] & 0xff);
        let Blue = (buff_B[1] & 0xff) << 8 | (buff_B[0] & 0xff);

        if (Red > 4500) Red = 2300;
        if (Green > 7600) Green = 4600;
        if (Blue > 4600) Blue = 2700;

        val_red = Math.map(Red, 0, 2300, 0, 255);
        val_green = Math.map(Green, 0, 4600, 0, 255);
        val_blue = Math.map(Blue, 0, 2700, 0, 255);

        if (val_red == val_green && val_red == val_blue) {
            val_red = 255;
            val_green = 255;
            val_blue == 255;
        }
        else if (val_red > val_green && val_red > val_blue) {
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
	

    //% blockId=CrocoKit_Sensor_Light block="Light|pin %pin"
    //% weight=100
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5 
    export function Light(pin: AnalogPin): number {
        let value: number;
        value = pins.analogReadPin(pin);
        return value;
    }

    //% blockId=CrocoKit_Sensor_Sound block="Sound|pin %pin"
    //% weight=99
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Sound(pin: AnalogPin): number {
        let value: number;
        value = pins.analogReadPin(pin);
        return value;
    }

	//% blockId=CrocoKit_Sensor_GetRGBValue block="GetRGBValue |value %value"
    //% blockGap=20
    //% weight=98
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function GetRGBValue(value: enGetRGB): number {
        if (!initialized) {
            initColorI2C();
        }
        switch (value) {
            case enGetRGB.GetValueR:
                GetRGB();
                return val_red;
            case enGetRGB.GetValueG:
                GetRGB();
                return val_green;
            case enGetRGB.GetValueB:
                GetRGB();
                return val_blue;
            default:
                break;
        }
        return 0;
    }
	
    //% blockId=CrocoKit_Sensor_IR block="IR|pin %pin|value %value"
    //% weight=97
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function IR(pin: DigitalPin, value: enObstacle): boolean {
        pins.setPull(pin, PinPullMode.PullUp);
        return pins.digitalReadPin(pin) == value;
    }

    


    //% blockId=CrocoKit_Sensor_Vibration block="Vibration|pin %pin|get "
    //% weight=95
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Vibration(pin: DigitalPin, handle: () => void): void {
        pins.setPull(pin, PinPullMode.PullUp);
        pins.setEvents(pin, PinEventType.Pulse);
        pins.onPulsed(pin, PulseValue.High, handle);
    }

    //% blockId=CrocoKit_Sensor_Hall block="Hall|pin %pin|get "
    //% weight=94
    //% blockGap=20
    //% color="#228B22"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Hall(pin: DigitalPin, handle: () => void): void {
        pins.setPull(pin, PinPullMode.PullUp);
        pins.setEvents(pin, PinEventType.Pulse);
        pins.onPulsed(pin, PulseValue.High, handle);

    }

}

//% color="#8FBC8F" weight=21 icon="\uf001"
namespace CrocoKit {

    export enum enMusic {
        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,
        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }

    export enum touch {
        //% blockId="None" block="None"
        None = 0x0000,
        //% blockId="C" block="C"
        C = 0x0001,
        //% blockId="D" block="D"
        D = 0x0002,
        //% blockId="E" block="E"
        E = 0x0004,
        //% blockId="F" block="F"
        F = 0x0008,
        //% blockId="G" block="G"
        G = 0x0010,
        //% blockId="A" block="A"
        A = 0x0020,
        //% blockId="B" block="B"
        B = 0x0040,
        //% blockId="CH" block="CH"
        CH = 0x0080,
    }

    export enum enKeys {
        A = 65,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V,
        W,
        X,
        Y,
        Z
    }

    export enum enKeyBoard {
        //% blockId="VK_LEFT" block="VK_LEFT"
        VK_LEFT = 37,
        //% blockId="VK_UP" block="VK_UP"
        VK_UP = 38,
        //% blockId="VK_RIGHT" block="VK_RIGHT"
        VK_RIGHT = 39,
        //% blockId="VK_DOWN" block="VK_DOWN"
        VK_DOWN = 40,
        //% blockId="VK_SPACE" block="VK_SPACE"
        VK_SPACE = 32,
        //% blockId="VK_DELETE" block="VK_DELETE"
        VK_DELETE = 46,
        //% blockId="VK_W" block="VK_W"
        VK_W = 87,
        //% blockId="VK_S" block="VK_S"
        VK_S = 83,
        //% blockId="VK_A" block="VK_A"
        VK_A = 65,
        //% blockId="VK_D" block="VK_D"
        VK_D = 68
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(addr, buf);
    }

    //% blockId=CrocoKit_Play_Music block="Music_Handle|%index"
    //% weight=99
    //% blockGap=20
    //% color="#8FBC8F"
    //% index.min=0 index.max=19
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Play_Music(index: number): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }

    //% blockId=CrocoKit_Music_Handle block="Music_Handle|%index"
    //% weight=98
    //% blockGap=20
    //% color="#8FBC8F"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Handle(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }

    //% blockId=CrocoKit_Touch block="Music Touch return"
    //% weight=97
    //% blockGap=20
    //% color="#8FBC8F"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Touch(): number {
        let a = 0;
        let b = 0;
        let c = 0;
        pins.i2cWriteNumber(0x50, 8, NumberFormat.UInt8BE, false);
        a = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, true);
        b = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, false);
        c = (b << 8) | a;
        return c;
    }

    //% blockId=CrocoKit_TouchButton block="Music Button|%value"
    //% weight=96
    //% blockGap=20
    //% color="#8FBC8F"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function TouchButton(value: touch): number {

        let c = value;
        return c;
    }

    //% blockId=CrocoKit_PlayPiano block="Play Piano|tone %value"
    //% weight=95
    //% blockGap=20
    //% color="#8FBC8F"
    //% value.min=1 value.max=3 value.defl=2
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function PlayPiano(value: number): void {
        let a = 0;
        let b = 0;
        let c = 0;
        let temp = 0;
        pins.i2cWriteNumber(0x50, 8, NumberFormat.UInt8BE, false);
        a = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, true);
        b = pins.i2cReadNumber(0x50, NumberFormat.UInt8BE, false);
        c = (b << 8) | a;

        if (value == 1) {
            if ((c & temp) != 0) {
                c = c & temp;
            } else if (c & touch.C) {
                music.ringTone(131);
            } else if (c & touch.D) {
                music.ringTone(147);
            } else if (c & touch.E) {
                music.ringTone(165);
            } else if (c & touch.F) {
                music.ringTone(175);
            } else if (c & touch.G) {
                music.ringTone(196);
            } else if (c & touch.A) {
                music.ringTone(220);
            } else if (c & touch.B) {
                music.ringTone(247);
            } else if (c & touch.CH) {
                music.ringTone(262);
            } else if (c == touch.None) {
                //music.ringTone(0);
                pins.digitalWritePin(DigitalPin.P0, 0);
            }
        }
        else if (value == 2) {
            if ((c & temp) != 0) {
                c = c & temp;
            } else if (c & touch.C) {
                music.ringTone(262);
            } else if (c & touch.D) {
                music.ringTone(294);
            } else if (c & touch.E) {
                music.ringTone(330);
            } else if (c & touch.F) {
                music.ringTone(349);
            } else if (c & touch.G) {
                music.ringTone(392);
            } else if (c & touch.A) {
                music.ringTone(440);
            } else if (c & touch.B) {
                music.ringTone(494);
            } else if (c & touch.CH) {
                music.ringTone(523);
            } else if (c == touch.None) {
                //music.ringTone(0);
                pins.digitalWritePin(DigitalPin.P0, 0);
            }
        }
        else if (value == 3) {
            if ((c & temp) != 0) {
                c = c & temp;
            } else if (c & touch.C) {
                music.ringTone(523);
            } else if (c & touch.D) {
                music.ringTone(587);
            } else if (c & touch.E) {
                music.ringTone(659);
            } else if (c & touch.F) {
                music.ringTone(698);
            } else if (c & touch.G) {
                music.ringTone(784);
            } else if (c & touch.A) {
                music.ringTone(880);
            } else if (c & touch.B) {
                music.ringTone(988);
            } else if (c & touch.CH) {
                music.ringTone(1046);
            } else if (c == touch.None) {
                //music.ringTone(0);
                pins.digitalWritePin(DigitalPin.P0, 0);
            }
        }
    }

    //% blockId=CrocoKit_KeyBoard_SetBaudRate block="KeyBoard SetBaudRate|%baudRate"
    //% weight=94
    //% blockGap=20 
    //% color="#8FBC8F"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard_SetBaudRate(baudRate: BaudRate): void {
        serial.redirect(SerialPin.USB_TX, SerialPin.USB_RX, baudRate);
    }

    //% blockId=CrocoKit_KeyBoard block="KeyBoard|%key"
    //% weight=93
    //% blockGap=20 
    //% color="#8FBC8F"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard(key: enKeyBoard): void {
        switch (key) {
            case enKeyBoard.VK_UP: serial.writeString("&"); break;
            case enKeyBoard.VK_DOWN: serial.writeString("("); break;
            case enKeyBoard.VK_LEFT: serial.writeString("%"); break;
            case enKeyBoard.VK_RIGHT: serial.writeString("'"); break;
            case enKeyBoard.VK_SPACE: serial.writeString(" "); break;
            case enKeyBoard.VK_DELETE: serial.writeString("."); break;
            case enKeyBoard.VK_W: serial.writeString("W"); break;
            case enKeyBoard.VK_S: serial.writeString("S"); break;
            case enKeyBoard.VK_A: serial.writeString("A"); break;
            case enKeyBoard.VK_D: serial.writeString("D"); break;
            default: break;
        }
    }

    //% blockId=CrocoKit_KeyBoard_Number block="KeyBoard sendNumber|%value"
    //% weight=92
    //% blockGap=20 
    //% color="#8FBC8F"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard_Number(value: number): void {
        serial.writeNumber(value);
    }

    //% blockId=CrocoKit_KeyBoard_Keys block="KeyBoard sendKeys|%key"
    //% weight=91
    //% blockGap=20 
    //% color="#8FBC8F"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function KeyBoard_Keys(key: enKeys): void {
        switch (key) {
            case enKeys.A: serial.writeString("A"); break;
            case enKeys.B: serial.writeString("B"); break;
            case enKeys.C: serial.writeString("C"); break;
            case enKeys.D: serial.writeString("D"); break;
            case enKeys.E: serial.writeString("E"); break;
            case enKeys.F: serial.writeString("F"); break;
            case enKeys.G: serial.writeString("G"); break;
            case enKeys.H: serial.writeString("H"); break;
            case enKeys.I: serial.writeString("I"); break;
            case enKeys.J: serial.writeString("J"); break;
            case enKeys.K: serial.writeString("K"); break;
            case enKeys.L: serial.writeString("L"); break;
            case enKeys.M: serial.writeString("M"); break;
            case enKeys.N: serial.writeString("N"); break;
            case enKeys.O: serial.writeString("O"); break;
            case enKeys.P: serial.writeString("P"); break;
            case enKeys.Q: serial.writeString("Q"); break;
            case enKeys.R: serial.writeString("R"); break;
            case enKeys.S: serial.writeString("S"); break;
            case enKeys.T: serial.writeString("T"); break;
            case enKeys.U: serial.writeString("U"); break;
            case enKeys.V: serial.writeString("V"); break;
            case enKeys.W: serial.writeString("W"); break;
            case enKeys.X: serial.writeString("X"); break;
            case enKeys.Y: serial.writeString("Y"); break;
            case enKeys.Z: serial.writeString("Z"); break;
            default: break;
        }
    }


}
