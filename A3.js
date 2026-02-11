window.onload = function(){
    console.log("link test");
    let url = "flights.json";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        jsonParse(xhr.responseText);
    }
    };
    xhr.open("GET", url, true);
    xhr.send();
    
    let btnApply = this.document.querySelector("#apply");
    let btnShowAll = this.document.querySelector("#showAll");
    btnApply.addEventListener("click", apply);
    btnShowAll.addEventListener("click", showAll);

}

let allFlights;
function jsonParse(text){
    allFlights = JSON.parse(text);
    alert("File data is ready!");
}

function showAll(){
    buildTable();
    console.log("show click")
}

function apply(){
    
}

function buildTable(){
    let flight = allFlights.flights;
    console.log(flight);
    let htmlString = "<table>";
    htmlString += "<tr>";
    htmlString += "<th>Flight Number</th>";
    htmlString += "<th>Day</th>";
    htmlString += "<th>Time</th>";
    htmlString += "<th>Destination</th>";
    htmlString += "<th>Pilot</th>";
    htmlString += "<th>Co-Pilot</th>";
    htmlString += "</tr>";
    for (let i = 0; i < flight.length; i++) {
        let obj = flight[i];
        htmlString += "<tr>";
        htmlString += "<td>" + obj.flightNumber + "</td>";
        htmlString += "<td>" + obj.dayOfWeek + "</td>";
        htmlString += "<td>" + obj.departureTime + "</td>";
        htmlString += "<td>" + obj.destination.code + ' ' + "(" + obj.destination.city + ", " + obj.destination.country + ")" + ", region=" + obj.destination.region + "</td>";
        htmlString += "<td>" + (obj.pilot ? obj.pilot.firstName + " " + obj.pilot.lastName + (obj.pilot.nickName ? " (" + obj.pilot.nickName  + ")" : ""): "not yet assigned") + "</td>";
        htmlString += "<td>" + (obj.copilot ? obj.copilot.firstName + " " + obj.copilot.lastName : "not yet assigned") + "</td>";
        htmlString += "</tr>";
    }
    let container = document.querySelector("#table");
    container.innerHTML = htmlString;
}
