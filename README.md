# Moment 3 – NoSQL – Backend 

Det här är ett backendprojekt som jag har byggt med Node.js, Express och MongoDB. Det är ett REST API för att hantera arbetserfarenheter, till exempel företag, titel, beskrivning och datum.

## Funktioner

- Hämta alla arbetserfarenheter (GET)
- Lägga till en ny arbetserfarenhet (POST)
- Uppdatera en befintlig erfarenhet (PUT)
- Ta bort en erfarenhet (DELETE)

## Teknik som används

- Node.js
- Express
- MongoDB (via Mongoose)
- Dotenv för hantering av hemliga nycklar
- CORS för att tillåta anrop från frontend
- MongoDB Atlas för datalagring vid publicering

## Testning av api:et
Jag har använt Thunder Client för att testa mina endpoints:

Hämta alla erfarenheter:
GET http://localhost:3000/workexperiences

Lägg till erfarenhet:
POST http://localhost:3000/workexperiences

{
  "companyname": "Företagsnamn",
  "jobtitle": "Titel",
  "location": "Stad",
  "startdate": "2021-05-01",
  "enddate": "2021-09-30",
  "description": "En beskrivning av arbetet"
}

## Deployment
Projektet (databasen) är skapad i MongoDB Atlas och api:et/webbservices är publicerat på render: https://moment-3-nosql-backend.onrender.com