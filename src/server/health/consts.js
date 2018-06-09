module.exports.urls = [
	"https://bim360dm-dev.autodesk.com/health?self=true",
    "https://commands.bim360dm-dev.autodesk.com/health",
    "https://360-staging.autodesk.com/health" 
    ];

module.exports.servicesNames = [
    "bim360dm-dev.autodesk.com",
    "commands.bim360dm-dev.autodesk.com",
    "my"
];

module.exports.goodResults = ["GOOD", "Good", "OK"];

module.exports.contentTypes = {
    "xml": "text/xml; charset=utf-8",
    "json": "application/json; charset=utf-8"
};