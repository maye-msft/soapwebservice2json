## Simple SOAP to Rest Proxy

This is a very simple nodejs based web application to call soap and return result as JSON format. So it can work with PowerBI to load XML data from SOAP as JSON.

To run the proxy you need a configuration file named **soap-settings.js**.



It needs WSDL url, method name and a set of params, it also supports basic authentication. the SOAP client is based on https://github.com/vpulim/node-soap

### Demo

We use a simple soap service by java, and start it with the below commands

    git clone https://github.com/spring-guides/gs-soap-service.git
    cd gs-soap-service
    mvn package
    java -jar target/gs-soap-service-0.1.0.jar

Get the code of soapwebservice2json.

    git clone https://github.com/maye-msft/soapwebservice2json.git
    cd soapwebservice2json
    
And then we config the soap-settings.js as

``` javascript
module.exports = {
    "Countries": {
        "WSDL":"http://localhost:8080/ws/countries.wsdl",
        "Method":"getCountry",
        "Param":[
            {"name":"Spain"},
            {"name":"Poland"},
            {"name":"United Kingdom"},
        ],
        "Security":{
            "Method":"Basic",
            "User":"user",
            "Pwd":"pwd",
        }
    }
}
```

Run it

    npm install
    node ./soap-proxy.js
    

Now it can try the rest API

    curl http://localhost:3000/Countries

The Result is 

```json
[{
    "country": {
        "name": "Poland",
        "population": 38186860,
        "capital": "Warsaw",
        "currency": "PLN"
    }
}, {
    "country": {
        "name": "United Kingdom",
        "population": 63705000,
        "capital": "London",
        "currency": "GBP"
    }
}, {
    "country": {
        "name": "Spain",
        "population": 46704314,
        "capital": "Madrid",
        "currency": "EUR"
    }
}]
```

