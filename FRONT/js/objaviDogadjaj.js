function PostaviDogadjaj(marker){
    var entries = document.getElementById("mainForm");
    var naziv_dogadjaja = entries.naziv_dogadjaja_input.value;
    var tip_dogadjaja = entries.tip_dogadjaja_select.value;
    var datum_dogadjaja = entries.datum_dogadjaja_input.value;
    var vreme_dogadjaja = entries.vreme_dogadjaja_input.value;
    var opis_dogadjaja = entries.opis_dogadjaja_input.value;
    var min_god = entries.min_god_dogadjaja_input.value;
    var max_god = entries.max_god_dogadjaja_input.value;
    var naziv_lokacije = entries.naziv_lokacije_input.value;
    var poz_lat = marker.position.lat();
    var poz_lng = marker.position.lng();
}