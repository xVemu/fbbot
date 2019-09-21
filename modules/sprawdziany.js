`use strict`;

const request = require('request');
const fs = require('fs');

module.exports = () => {
    let form = {
        "PIN": 091774,
        "TokenKey": "TA103B",
        "AppVersion": "18.4.1.388",
        "DeviceId": "b0f4b169-48fd-4570-bbfb-0108e7ca2d1b",
        "DeviceName": "Vulcan#API",
        "DeviceNameUser": "",
        "DeviceDescription": "",
        "DeviceSystemType": "Android",
        "DeviceSystemVersion": "10.0",
        "RemoteMobileTimeKey": 1568704380,
        "TimeKey": 1568704379,
        "RequestId": "b0f4b169-48fd-4570-bbfb-0108e7ca2d1b",
        "RemoteMobileAppVersion": "18.4.1.388",
        "RemoteMobileAppName": "VULCAN-Android-ModulUcznia"
    };
    const headers = {
        'RequestMobileType': 'RegisterDevice',
        'User-Agent': 'MobileUserAgent',
        'Content-Type': 'application/json'
    };
    form = JSON.stringify(form);
    request.post({
        headers: headers,
        url: 'https://uonetplus-komunikacja.umt.tarnow.pl/tarnow/mobile-api/Uczen.v3.UczenStart/Certyfikat',
        form: form,
        method: 'POST'
    }, (err, res, body) => {
        fs.writeFile(`cert.json`, JSON.stringify(body[`TokenCert`]), (err) => {
            if(err) console.log(err);
            console.log(body);
        });
    });
    // https://uonetplus-komunikacja.umt.tarnow.pl
}