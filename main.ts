input.onButtonPressed(Button.A, function () {
    readCO2()
    basic.showNumber(co2)
})
function beforeRead () {
    if (mode == 0) {
        serial.redirect(
        SerialPin.P0,
        SerialPin.P1,
        BaudRate.BaudRate9600
        )
        basic.pause(500)
        mode = 1
    }
}
function readCO2 () {
    beforeRead()
    co2 = Math.round(COZIR.readCo2())
}
input.onButtonPressed(Button.AB, function () {
    readHu()
    basic.showNumber(hu)
})
function sendParam () {
    if (mode == 1) {
        serial.redirect(
        SerialPin.USB_TX,
        SerialPin.USB_RX,
        BaudRate.BaudRate9600
        )
        basic.pause(500)
        mode = 0
    }
    serial.writeNumbers([co2, temp, hu])
}
input.onButtonPressed(Button.B, function () {
    readTemp()
    basic.showNumber(temp)
})
function readTemp () {
    temp = input.temperature()
}
function readHu () {
    beforeRead()
    hu = Math.round(COZIR.readRh())
}
let send = 0
let _hu = 0
let _temp = 0
let _co2 = 0
let temp = 0
let hu = 0
let co2 = 0
let mode = 0
mode = 0
basic.forever(function () {
    readCO2()
    readTemp()
    readHu()
    if (_co2 != co2) {
        send = 1
    } else if (_temp != temp) {
        send = 1
    } else if (_hu != hu) {
        send = 1
    } else {
        send = 0
    }
    _co2 = co2
    _temp = temp
    _hu = hu
    if (send == 1) {
        sendParam()
    }
    basic.pause(10000)
})
