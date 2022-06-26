const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

let ajd = new Date();
let options = { weekday: "long" };
let jourActuel = ajd.toLocaleDateString("fr-FR", options);
jourActuel = (`${jourActuel[0].toUpperCase()}${jourActuel.slice(1)}`);

let tableauJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
// console.log(tableauJoursEnOrdre);

// on exporte le code JS
export default tableauJoursEnOrdre;
