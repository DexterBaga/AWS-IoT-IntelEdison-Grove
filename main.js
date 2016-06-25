var awsIot = require('aws-iot-device-sdk');
var lcd = require('./display.js');

var device = awsIot.device({
   keyPath: __dirname + '/certs/private.pem.key',
  certPath: __dirname + '/certs/certificate.pem.crt',
    caPath: __dirname + '/certs/root-ca.pem',
  clientId: 'tobeiot',
    region: 'us-east-1'
});

var colorOptions = ['R','G','B'];

device
  .on('connect', function() {
    console.log('connected');
    device.subscribe('topic_1');
  });
  
  device
  .on('message', function(topic, payload) {
    lcd.setLine1Text(payload.toString());
    console.log('Topic:', topic, 'Payload:', payload.toString());
    
    var data = JSON.parse(payload.toString());
    if (data.Color === 'R') {
       lcd.setBackgroundColor(255,0,0);
    }
    if (data.Color === 'G') {
       lcd.setBackgroundColor(0,255,0);
    }
    if (data.Color === 'B') {
       lcd.setBackgroundColor(0,0,255);
    }
    
  });


function selectColor(){
    var index = Math.floor(Math.random() * 3);
    var colorcode = colorOptions[index];
    device.publish('topic_1','{"Color": "' + colorcode + '"}');
}

setInterval(selectColor,2000);

