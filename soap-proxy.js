const express = require('express')
const soapsetting = require('./soap-settings.js')
const app = express()
const soap = require('soap');
const request = require('request');



const soapRequest = (url, method, params, user, pwd, cb) => {
    const specialRequest = request.defaults({
        strictSSL: false //simplified, but not recommended
    });
    const auth = "Basic " + new Buffer(`${user}:${pwd}`).toString("base64");
    const results = []
    soap.createClient(url, {
            wsdl_headers: { Authorization: auth },
            request: specialRequest
        },
        function (err, client) {
            params.forEach((param, pidx) => {
                client.setSecurity(new soap.BasicAuthSecurity(user, pwd)); //Token is also supported
                client[method](param, function (err, result, rawResponse, soapHeader, rawRequest) {
                    results.push(result)
                    if(results.length==params.length) {
                        cb(results)
                    }
                });
            })

    });
}

app.get('/:key', function (req, res) {
    let found = false
    Object.keys(soapsetting).forEach((key, idx) => {
        if (key === req.params.key) {
            let wsdlURL = soapsetting[key].WSDL;
            let method = soapsetting[key].Method;
            let params = soapsetting[key].Param;
            soapRequest(wsdlURL, method, params, null, null, (results)=>{
                res.json(results)
            })
            
            found = true
        }
    })
    if(!found) {
        res.send(`${req.params.key} Not Found`)
    }
})




app.listen(3000, () => console.log('SOAP Proxy listening on port 3000!'))
