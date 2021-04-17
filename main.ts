input.onButtonPressed(Button.A, function () {
    readCO2()
    basic.showNumber(co2)
})
function readCO2 () {
    co2 = Math.round(COZIR.readCo2())
}
input.onButtonPressed(Button.AB, function () {
    readHu()
    basic.showNumber(hu)
})
function sendParam () {
    radio.sendString("" + co2 + "," + temp + "," + hu)
}
input.onButtonPressed(Button.B, function () {
    readTemp()
    basic.showNumber(temp)
})
function readTemp () {
    temp = input.temperature()
}
function readHu () {
    hu = Math.round(COZIR.readRh())
}
let temp = 0
let hu = 0
let co2 = 0
radio.setGroup(1)
serial.redirect(
SerialPin.P0,
SerialPin.P1,
BaudRate.BaudRate9600
)
basic.pause(500)
basic.forever(function () {
    readCO2()
    readTemp()
    readHu()
    sendParam()
    basic.pause(10000)
})
