serial.redirectToUSB
serial.writeString
serial.writeString
serial.writeNumber
let string: String;
let len = string.length;
        let buff = pins.createBuffer(len);
        for (let i = 0; i < len; i++) {
            if (string.charCodeAt(i) > 64 && string.charCodeAt(i) < 91) {

            }
            buff[i] = string.charCodeAt(i);
        }