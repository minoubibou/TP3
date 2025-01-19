let clockID = 0; // Initialisation correcte de la variable

function UpdateClock() {
  // Si un minuteur existe déjà, on l'annule
  if (clockID) {
    clearTimeout(clockID);
    clockID = 0;
  }

  // Récupération de la date actuelle
  let tDate = new Date();

  // Mise à jour de l'affichage de l'horloge
  document.theClock.theTime.value = 
    tDate.getHours().toLocaleString('fr', { minimumIntegerDigits: 2, useGrouping: false }) + ":" +
    tDate.getMinutes().toLocaleString('fr', { minimumIntegerDigits: 2, useGrouping: false }) + ":" +
    tDate.getSeconds().toLocaleString('fr', { minimumIntegerDigits: 2, useGrouping: false });

  // Mise en place du prochain appel
  clockID = setTimeout(UpdateClock, 1000);
}

function KillClock() {
  if (clockID) {
    clearTimeout(clockID); // Arrêt du minuteur
    clockID = 0;
  }
}

function calendrier() {
  let date = new Date();
  let jour = date.getDate();
  let mois = date.getMonth();
  let annee = date.getFullYear();

  let mois_array = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  let date_aujourdhui = jour + ' ' + mois_array[mois] + ' ' + annee;

  let jours_dans_moi = [31, 28, 31, 30, 31, 30, 31, 31, 31, 31, 30, 31];
  if (annee % 4 === 0 && annee !== 1900) {
    jours_dans_moi[1] = 29; // Février 29 jours pour les années bissextiles
  }

  let total = jours_dans_moi[mois];
  let dep_j = new Date();
  dep_j.setDate(1);
  dep_j = dep_j.getDay();

  document.write('<table class="cal_calendrier"><tbody id="cal_body"><tr><th colspan="7">' + date_aujourdhui + '</th></tr>');
  document.write('<tr class="cal_j_semaines"><th>Dim</th><th>Lun</th><th>Mar</th><th>Mer</th><th>Jeu</th><th>Ven</th><th>Sam</th></tr><tr>');

  let sem = 0;
  for (let i = 1; i <= dep_j; i++) {
    document.write('<td class="cal_jours_av_ap">' + (mois > 0 ? jours_dans_moi[mois - 1] - dep_j : jours_dans_moi[11] - dep_j) + '</td>');
    sem++;
  }

  for (let i = 1; i <= total; i++) {
    if (sem === 0) {
      document.write('<tr>');
    }
    if (jour === i) {
      document.write('<td class="cal_aujourdhui">' + i + '</td>');
    } else {
      document.write('<td>' + i + '</td>');
    }
    sem++;

    if (sem === 7) {
      document.write('</tr>');
      sem = 0;
    }
  }

  for (let i = 1; sem !== 0; i++) {
    document.write('<td class="cal_jours_av_ap">' + i + '</td>');
    sem++;
    if (sem === 7) {
      document.write('</tr>');
      sem = 0;
    }
  }

  document.write('</tbody></table>');
}
