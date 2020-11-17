var race_modifiers = [0, 0, 0, 0, 0, 0];
var race = "";
var raceBaseSpeed = "30";
var raceSpeed = "";
var raceLanguage = "";
var raceAbility = "";
var raceAttacks = "";
var raceSenses = "";

var race_stats = []

function modifyResults(){    
    race = $("#raceBlock option:selected").text().toLowerCase();
    race_stats = $('#mmStats').first().children().data();

    switch(race) {        
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
            raceSenses = "";
            raceAbility = "<property-block> <h4>Dive Attack. </h4><p>If the aarakocra is flying and dives at least 30 feet straight toward a target and then hits it with a melee weapon attack, the attack deals an extra 3 (1d6) damage to the target.</p></property-block>";            
            raceAttacks = "<property-block> <h4>Talon. </h4><p><i>Melee Weapon Attack:</i> _DEXP_ to hit, reach 5 ft., one target. <i>Hit:</i> 1d4 + _DEX_ slashing damage.</p></property-block>";                        
            break;
        case "bullywug":                 
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = -2;
            race_modifiers[4] = 0;
            race_modifiers[5] = -2;
            baseSpeed = "20";
            raceSpeed = "swim 40 ft."
            raceLanguage = "Bullywug";  
            raceSenses = "";
            raceAbility = "<property-block> <h4>Amphibious. </h4> <p>The bullywug can breathe air and water.</p> </property-block>";
            raceAbility += "<property-block> <h4>Speak with Frogs and Toads. </h4> <p>The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug.</p> </property-block>";             
            raceAbility += "<property-block> <h4>Swamp Camouflage. </h4> <p>The bullywug has advantage on Dexterity (Stealth) checks made to hide in swampy terrain.</p> </property-block>";                          
            raceAbility += "<property-block> <h4>Standing Leap. </h4> <p>The bullywug’s long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start.</p> </property-block>";                                      
            break;
        case "dragonborn":
            var ancestry = ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"];
            var damage  = ["acid", "lightning", "fire", "lightning", "acid", "fire", "poison", "fire", "cold", "cold"];
            var ancestryIndex = [Math.floor(Math.random() * ancestry.length)];

            race_modifiers[0] = 2;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 1;
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Draconic";
            raceSenses = "";
                        
            raceAbility += "<property-block> <h4>Damage Resistance. </h4><p>The dragonborn has resistance to " + damage[ancestryIndex] + " damage.</p></property-block>";
            
            switch (ancestry[ancestryIndex]){
                case "black":
                case "blue":
                case "brass":
                case "copper":
                    raceAttacks = "<property-block> <h4>Breath Weapon. </h4> <p>The dragonborn can use their action to exhale a 5-foot-wide, 30-foot line of " + damage[ancestryIndex] + " (but can't do this again until they finish a short or long rest); each creature in the line must make a DC _CONDC_ Dexterity saving throw, taking _DRAGONBORNBREATH_ " + damage[ancestryIndex] + " damage on a failed save or half as much on a successful one.</p></property-block>";            
                break;       
                case "gold":
                case "red":
                    raceAttacks = "<property-block> <h4>Breath Weapon. </h4> <p>The dragonborn can use their action to exhale a 15-foot cone of " + damage[ancestryIndex] + " (but can't do this again until they finish a short or long rest); each creature in the line must make a DC _CONDC_ Dexterity saving throw, taking _DRAGONBORNBREATH_ " + damage[ancestryIndex] + " damage on a failed save or half as much on a successful one.</p></property-block>";            
                    break;         
                default:            
                    raceAttacks = "<property-block> <h4>Breath Weapon. </h4> <p>The dragonborn can use their action to exhale a 15-foot cone of " + damage[ancestryIndex] + " (but can't do this again until they finish a short or long rest); each creature in the line must make a DC _CONDC_ Constitution saving throw, taking _DRAGONBORNBREATH_ " + damage[ancestryIndex] + " damage on a failed save or half as much on a successful one.</p></property-block>";            
                break;
            }
            break;
        case "drow":
            race_modifiers[0] = 0;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 1;
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Elvish, Undercommon";
            raceSenses = "darkvision 120 ft.,";
            
            raceAbility = "<property-block> <h4>Sunlight Sensitivity. </h4><p>The drow has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when they, the target of their attack, or whatever they are trying to perceive is in direct sunlight.</p></property-block>";            
            raceAbility += "<property-block><h4>Fey Ancestry. </h4><p>The drow has advantage on saving throws against being charmed, and magic can’t put it to sleep.</p></property-block>";
            raceAbility += "<property-block><h4>Innate Spellcasting. </h4><p>The drow’s spellcasting ability is Charisma (spell save DC _CHADC_). It can innately cast the following spells, requiring no material components:</p><p>At will: <i>dancing lights</i></p><p>1/day each: <i>darkness, faerie fire</i></p></property-block>";            
            break;
        case "dwarf" :
            if (CoinFlip()){
                race_modifiers[0] = 2; 
            } else {
                race_modifiers[4] = 2;
            }
              
            race_modifiers[1] = 0;
            race_modifiers[2] = 2;
            race_modifiers[3] = 0;            
            race_modifiers[5] = 0;
            raceBaseSpeed = "25";
            raceSpeed = "";
            raceLanguage = "Common, Dwarvish";
            raceSenses = "darkvision 60 ft.,";
            
            raceAbility = "<property-block> <h4>Dwarven Resilience. </h4><p>The dwarf has advantage on saving throws against poison, and resistance against poison damage.</p></property-block>";            
            raceAbility += "<property-block> <h4>Stonecunning. </h4><p>Whenever the dwarf makes an Intelligence (History) check related to the origin of stonework, they are considered proficient in the History skill and adds +_DOUBLEPROF_ to the check.</p></property-block>";            

            raceAttacks = "<property-block> <h4>Title.</h4> <p> <i>Type Weapon Attack: </i>+x to hit, reach 5 ft., one target. <i>Hit:</i> Description.</p></property-block>";
            raceAttacks = "<property-block> <h4>Title.</h4><p>description.</p></property-block>";            
            console.log("resetting values");
            break;
        default :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "";
            raceSenses = "";
            
            raceAbility = "<property-block> <h4>Title.</h4><p>description.</p></property-block>";
            raceAbility = "";

            raceAttacks = "<property-block> <h4>Title.</h4> <p> <i>Type Weapon Attack: </i>+x to hit, reach 5 ft., one target. <i>Hit:</i> Description.</p></property-block>";
            raceAttacks = "<property-block> <h4>Title.</h4><p>description.</p></property-block>";
            raceAttacks = "";
            console.log("resetting values");
            break;
    }
}

function CoinFlip(){
    var prob1 = Math.floor(Math.random() * 2) +1;
    if (prob1 == 0) return false;
    return true;
}