
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */


/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace COZIR {

    let value_str = ""
    let co2 = 0
    let temp = 0
    let rh = 0
    let response = ""

    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), () => {
        response = serial.readUntil(serial.delimiters(Delimiters.NewLine))
        //basic.showString(response)
        value_str = response.substr(3, 5)
        let value = parseInt(value_str)
        // basic.showString(response.charAt(1))
        if (response.charAt(1) == 'Z') {
            co2 = value
        }
        if (response.charAt(1) == 'T') {
            temp = (value - 1000) / 10
        }
        if (response.charAt(1) == 'H') {
            rh = value / 10
        }
    })

    /**
    * Return the CO2 concentration in parts per million (ppm)
    */
    //% block
    export function readCo2(): number {
        serial.writeString("Z\r\n")
        basic.pause(200)
        return co2
    }

    /**
    * Return the temperature in degrees Centigrade
    */
    //% block
    export function readTemp(): number {
        serial.writeString("T\r\n")
        basic.pause(200)
        return temp
    }

    /**
    * Return the relative humidty as a percentage
    */
    //% block
    export function readRh(): number {
        serial.writeString("H\r\n")
        basic.pause(200)
        return rh
    }

    /**
    * Run this block when in fresh air and the module will re-calibrate it
    * assuming that the CO2 level is 400ppm
    */
    //% block
    export function calibrateCo2(): void {
        serial.writeString("G\r\n")
        basic.pause(200)
    }

    /**
    * Setup the COZIR module -only used during manufacturing
    * this sets the mode of the COZIR to 'request'
    */
    //% block
    export function setupCozir(): void {
        serial.writeString("K 2\r\n")
        basic.pause(300)
    }

    /**
    * Compensate for altitude. Specify altitude in metres
    * @param metres altitude in metres
    */
    //% block
    export function setAltitude(metres: number): void {
        let param = 8192 + metres
        let message = "S " + param + "\r\n"
        //basic.showString(message)
        serial.writeString(message)
        basic.pause(300)
    }



}

