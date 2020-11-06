function modifyResults(){
    var race = $("#raceBlock option:selected").text().toLowerCase();
    var abilities = $('#mmStats').first().children().data();
    $('#mmRace').text($("#raceBlock option:selected").text());

    switch(race) {
        case "human":
            break;
        case "aarakocra":
             //$('#mmStats').first().children().data('dex', 99);
            break;
    }
}