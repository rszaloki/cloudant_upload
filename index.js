/**
 * Created by robi on 2017. 02. 17..
 */
let persons = require('./persons.json');
let http = require('http');

let options = {
    hostname: 'euedge.cloudant.com',
    port: 443,
    path: '/persons',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'

    }
};


function sendPerson(person) {
    "use strict";
    return new Promise(function (resolve) {
        let req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
                resolve();
            });
        });

        req.write(JSON.stringify(person));
        req.end();
    });
}


persons.reduce((prev, current) => {
    return prev.then(() => sendPerson(current));
}, Promise.resolve());