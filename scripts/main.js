// on importe depuis l'autre fichier JS - gestionTemps

import tableauJoursEnOrdre from "./Utilitaire/gestionTemps.js";

const CLEFAPI = "fd92436702a6048c8cd958cdd65a2c04";
let resultatAPI;

const temps = document.querySelector(".temps")
const temperature = document.querySelector(".temperature")
const localisation = document.querySelector(".localisation")
const heure = document.querySelectorAll(".heure-nom-prevision")
const tempPourH = document.querySelectorAll(".heure-nom-valeur")
const joursDiv = document.querySelectorAll(".jour-prevision-nom")
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp")
const imgIcone = document.querySelector(".logo-meteo")
const chargementContainer = document.querySelector(".overlay-icone-chargement")


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation. L'application de pourra pas fonctionner. Veuillez l'acitiver SVP.`)
    })
}

function AppelAPI(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
        .then((reponse) => {
            return reponse.json();
        })
        .then((data) => {
            resultatAPI = data;

            console.log(resultatAPI);

            // on récupère les data qde l'API que l'on injecte dans notre html
            temps.textContent = resultatAPI.current.weather[0].description;
            temperature.textContent = `${Math.trunc(resultatAPI.current.temp)}°`;
            localisation.textContent = resultatAPI.timezone;

            //les heures par tranche de trois avec leur température

            // on récupère l'heure actuelle
            // par une boucle, on incrémente de 3h chaque case(7) du tableau heure
            let heureActuelle = new Date().getHours();
            for (let i = 0; i < heure.length; i++) {
                let heureIncr = heureActuelle + i * 3;

                // on gère les problèmes éventuels si l'heure est égale ou dépasse 24h
                if (heureIncr > 24) {
                    heure[i].textContent = `${heureIncr - 24}h`;
                } else if (heureIncr === 24) {
                    heure[i].textContent = "00 h"
                } else {
                    heure[i].textContent = `${heureIncr}h`;
                }
            }
            for (let j = 0; j < tempPourH.length; j++) {
                tempPourH[j].textContent = `${Math.trunc(resultatAPI.hourly[j * 3].temp)}°`
            }

            // 3 premières lettres des jours
            for (let k = 0; k < tableauJoursEnOrdre.length; k++) {
                joursDiv[k].textContent = tableauJoursEnOrdre[k].slice(0, 3);
            }

            // température par jour
            for (let m = 0; m < 7; m++) {
                tempJoursDiv[m].textContent = `${Math.trunc(resultatAPI.daily[m + 1].temp.day)}°`
            }

            // Icone météo dynamique
            if (heureActuelle >= 6 && heureActuelle < 21) {
                imgIcone.src = `ressources/jour/${resultatAPI.current.weather[0].icon}.svg`
            } else {
                imgIcone.src = ` ressources/nuit/${resultatAPI.current.weather[0].icon}.svg`
            }

            chargementContainer.classList.add("disparition");

        })
}

