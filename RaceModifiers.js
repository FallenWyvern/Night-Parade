var race_modifiers = [0, 0, 0, 0, 0, 0];
var race = "";
var raceBaseSpeed = "30";
var raceSpeed = "";
var language = "";

function modifyResults(){    
    race = $("#raceBlock option:selected").text().toLowerCase();
    var abilities = $('#mmStats').first().children().data();

    switch(race) {
        case "human":
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            raceBaseSpeed = "30";
            raceSpeed = "";
            language = "";
            break;
        case "aarakocra":                 
            race_modifiers[0] = 0;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 2;
            race_modifiers[5] = 0;
            baseSpeed = "20";
            raceSpeed = "fly 50 ft."
            raceLanguage = "Auran";
            break;
    }
}