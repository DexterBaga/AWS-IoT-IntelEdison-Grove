var mraa = require('mraa');
var lcd = require('jsupm_i2clcd');
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);

function setLine1Text(text){
    display.setCursor(0,0);
    display.write(text);
}
function setLine2Text(text){
    display.setCursor(1,1);
    display.write(text);
}
function setBackgroundColor(red,green,blue){
    display.setColor(red, green, blue);
}
    
module.exports = {
    setLine1Text: setLine1Text,
    setLine2Text: setLine2Text,
    setBackgroundColor: setBackgroundColor
}