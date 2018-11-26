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

