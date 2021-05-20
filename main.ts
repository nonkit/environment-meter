function readRH () {
    rh = Math.round(COZIR.readRh())
}
input.onButtonPressed(Button.A, function () {
    readCO2()
    basic.showNumber(co2)
})
function readCO2 () {
    co2 = Math.round(COZIR.readCo2())
}
input.onButtonPressed(Button.AB, function () {
    readRH()
    basic.showNumber(rh)
})
function sendParam () {
    radio.sendString("" + co2 + "," + temp + "," + rh)
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == ":") {
        readCO2()
        readTemp()
        readRH()
        sendParam()
    }
})
input.onButtonPressed(Button.B, function () {
    readTemp()
    basic.showNumber(temp)
})
function readTemp () {
    temp = Math.round(COZIR.readTemp())
}
let temp = 0
let co2 = 0
let rh = 0
radio.setGroup(1)
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate9600
)
basic.pause(500)
