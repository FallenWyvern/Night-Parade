var npSize = [ "Small", "Small", "Medium", "Medium", "Medium", "Large" ];
var npFeatures = [ "horns on head", "fangs or tusks", "oversized, pointed ears", "solid-colored eyes", "animal eyes", "a furry or hairless body", "spinal ridges", "feathered skin", "a non-prehensile tail", "scaled skin", "clawed hands", "an amorphous body", "an unusually powerful smell", "an extra set of smaller arms", "a centaur-like body shape", "an insect-like chitinous carapace", "multiple unified voices", "an extra head or face" ];
var npLocomotion = [ "swimming", "walking", "walking", "walking", "walking", "walking", "oozing", "flying", "multiple", "multiple"];
var npSkinThickness = [ "normal", "thick", "waxy", "woody", "stoney", "metallic" ];
var npSkinColors = [ "red", "orange", "yellow", "green", "blue", "indigo", "purple", "white", "black", "natural color of their race"];
var npSavingThrows = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
var npDamageTypes = [ "cold", "poison", "acid", "psychic", "fire", "necrotic", "radiant", "force", "thunder", "lightning"];
var numberWords  = ["one", "two", "three", "four", "five", "six", "seven", "eight"];

var creatureName = "Night Parade ";
var creatureRace = "";
var creatureCR = 0;
var creatureBaseSpeed = 0;
var outputSize = "";
var creatureStats = [];
var creatureSpecialAbilityCount = 0;
var buildChanged = false;

var mmCRValues = {
    "0": ["0", "2", "13", "3", "10", 3],
    "1/8":["1/8", "2", "13", "3", "25", 9],
    "1/4":["1/4", "2", "13", "3", "50", 15],
    "1/2":["1/2", "2", "13", "3", "100", 24],
    "1":["1", "2", "13", "3", "200", 30],
    "2":["2", "2", "13", "3", "450", 45],
    "3":["3", "2", "13", "4", "700", 60],
    "4":["4", "2", "14", "5", "1,100", 75],
    "5":["5", "3", "15", "6", "1,800", 90],
    "6":["6", "3", "15", "6", "2,300", 105],
    "7":["7", "3", "15", "6", "2,900", 120],
    "8":["8", "3", "16", "7", "3,900", 120],
    "9":["9", "4", "16", "7", "5,000", 135],
    "10":["10", "4", "17", "7", "5,900", 150],
    "11":["11", "4", "17", "8", "7,200", 165],
    "12":["12", "4", "17", "8", "8,400", 180],
    "13":["13", "5", "18", "8", "10,000", 195],
    "14":["14", "5", "18", "8", "11,500", 210],
    "15":["15", "5", "18", "8", "13,000", 225],
    "16":["16", "5", "18", "9", "15,000", 240],
    "17":["17", "6", "18", "10", "18,000", 255],
    "18":["18", "6", "19", "10", "20,000", 270],
    "19":["19", "6", "19", "10", "22,000", 285],
    "20":["20", "6", "19", "10", "25,000", 300],
    "21":["21", "7", "19", "11", "33,000", 315],
    "22":["22", "7", "19", "11", "41,000", 330],
    "23":["23", "7", "19", "11", "50,000", 345],
    "24":["24", "7", "19", "12", "62,000", 360],
    "25":["25", "8", "19", "12", "75,000", 375],
    "26":["26", "8", "19", "12", "90,000", 390],
    "27":["27", "8", "19", "13", "105,000", 405],
    "28":["28", "8", "19", "13", "120,000", 420],
    "29":["29", "9", "19", "13", "135,000", 435],
    "30":["30", "9", "19", "14", "155,000", 450]
 };

function DoTheThing(){  
    creatureName = "";
    creatureRace = "";
    creatureCR = 0;
    creatureBaseSpeed = 0;
    outputSize = "";
    creatureStats = [];
    creatureSpecialAbilityCount = 0;
    buildChanged = false;
    
    // Racial mods
    var template = $("#templateBlock option:selected").text();
    modifyResults();    
    
    console.log("Loading: " + "StatBlocks/" + $("#npcBlock option:selected").text().replace(" ", "_").toLowerCase() + ".mm");
    $("#DivContent").load("StatBlocks/" + $("#npcBlock option:selected").text().replace(" ", "_").toLowerCase() + ".mm", function() {    

        creatureName = $('#mmName').text(); 
        creatureRace += $('#mmRace').text(); 
        
        $('#mmRace').text(race);
        $('#mmSize').text(raceSize); 
        
        outputSize = $('#mmSize').text(); 
        var cr = $('#mmCR').text().split('(')[0].trim();    
        var bonus = $('#mmStats').html().split('=');

        $('#mmBaseSpeed').text(raceBaseSpeed);
        if (raceSpeed.trim().length > 0) { $('#mmExtraSpeed').text(", " + raceSpeed); }
        
        creatureStats.push(Number(bonus[1].substring(1,3).replace('"', '')) + race_modifiers[0]);
        creatureStats.push(Number(bonus[2].substring(1,3).replace('"', '')) + race_modifiers[1]);
        creatureStats.push(Number(bonus[3].substring(1,3).replace('"', '')) + race_modifiers[2]);
        creatureStats.push(Number(bonus[4].substring(1,3).replace('"', '')) + race_modifiers[3]);
        creatureStats.push(Number(bonus[5].substring(1,3).replace('"', '')) + race_modifiers[4]);
        creatureStats.push(Number(bonus[6].substring(1,3).replace('"', '')) + race_modifiers[5]);
        
        creatureCR = cr;    
        PassivePerception();
        Language();
        EnergyStuff();    
        Skills();
        AC();

        // Night Parade Stuff    
        switch (template){            
            case "Night Parade":
                NightParade();
                break;
            default:
                $('#mmName').text(race.capitalize() + " " + creatureName);   
                break;
        }

        if (raceAbility.length > 0){        
            $('#mmAbilities').append(UpdateRacialAbilities(raceAbility.split(race).join(creatureName)));
        }
        
        if (raceAttacks.length > 0){
            $('#mmAttacks').append(UpdateRacialAbilities(raceAttacks.split(race).join(creatureName)));
        }
        if ($('#mmSpellcasting').text().length > 0){
            $('#mmSpellcasting').text(Spellcasting_Trait());
        }
        $('#mmHP').text(HitPoints());
        $('#mmCR').text(mmCRValues[creatureCR][0] + " (" + mmCRValues[creatureCR][4] + " XP; +" + mmCRValues[creatureCR][1] + ")");          
  });     
};

function AC(){
        if (raceACBonus != 0){            
            if (Number($('#mmAC').text().split('(')[0].trim()) < Number(10 + raceACBonus + creatureStats[1].bonus())){
                $('#mmAC').html((10 + raceACBonus + creatureStats[1].bonus()) + " (natural armor)");
            }
        }
}

function EnergyStuff(){
    if (damageVul.length > 0){
        if ($('#mmVul').text().trim().length > 0){                
            $('#mmVul').append(damageVul);
        } else {        
            $('#mmVul').html("<h4>Damage Vulnerability </h4><p>" + damageVul + "</p>");
        }
    }

    if (damageResist.length > 0) {
        if ($('#mmResistance').text().trim().length > 0){                
            $('#mmResistance').append(damageResist);
        } else {        
            $('#mmResistance').html("<h4>Damage Resistance </h4><p>" + damageResist + "</p>");
        }
    }

    if (damageImmune.length > 0){
        if ($('#mmImmunity').text().trim().length > 0){                
            $('#mmImmunity').append(damageImmune);
        } else {        
            $('#mmImmunity').html("<h4>Damage Immunity </h4><p>" + damageImmune + "</p>");
        }
    }

    if (conditionImmune.length > 0){
        if ($('#mmCImmunity').text().trim().length > 0){                
            $('#mmCImmunity').append(conditionImmune);
        } else {        
            $('#mmCImmunity').html("<h4>Condition Immunity </h4><p>" + conditionImmune + "</p>");
        }        
    }
}

function UpdateRacialAbilities(incomingAbility){    
    var returnString = incomingAbility;  
    returnString = returnString.split("_STR_").join(creatureStats[0].bonus());
    returnString = returnString.split("_STRP_").join(creatureStats[0].bonusplus());
    returnString = returnString.split("_STRDC_").join(Number(8 + creatureStats[0].bonusplus()));

    returnString = returnString.split("_DEX_").join(creatureStats[1].bonus());
    returnString = returnString.split("_DEXP_").join(creatureStats[1].bonusplus());
    returnString = returnString.split("_DEXDC_").join(Number(8 + creatureStats[1].bonusplus()));

    returnString = returnString.split("_CON_").join(creatureStats[2].bonus());
    returnString = returnString.split("_CONP_").join(creatureStats[2].bonusplus());
    returnString = returnString.split("_CONDC_").join(Number(8 + creatureStats[2].bonusplus()));

    returnString = returnString.split("_INT_").join(creatureStats[3].bonus()); 
    returnString = returnString.split("_INTP_").join(creatureStats[3].bonusplus());
    returnString = returnString.split("_INTDC_").join(Number(8 + creatureStats[3].bonusplus()));
    
    returnString = returnString.split("_WIS_").join(creatureStats[4].bonus());
    returnString = returnString.split("_WISP_").join(creatureStats[4].bonusplus());
    returnString = returnString.split("_WISDC_").join(Number(8 + creatureStats[4].bonusplus()));

    returnString = returnString.split("_CHA_").join(creatureStats[5].bonus());
    returnString = returnString.split("_CHAP_").join(creatureStats[5].bonusplus());
    returnString = returnString.split("_CHADC_").join(Number(8 + creatureStats[5].bonusplus()));
    
    var dragonBreath = "2d6";
    if (creatureCR > 5) dragonBreath = "3d6";
    if (creatureCR > 11) dragonBreath = "4d6";
    if (creatureCR > 16) dragonBreath = "5d6";
    returnString = returnString.split("_DRAGONBORNBREATH_").join(dragonBreath);
    returnString = returnString.split("_DOUBLEPROF_").join((Number(mmCRValues[creatureCR][1]) * 2));

    if (returnString.includes("_TIEFLINGSPELLS_")){
        var spellsString = "";

        if (Number(mmCRValues[creatureCR][0]) >= 3){
            spellsString += "It can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait";
        }         
        if (Number(mmCRValues[creatureCR][0] >= 5)){
            spellsString += " and it can cast the Darkness spell once with this trait"
        }

        if (Number(mmCRValues[creatureCR][0]) >= 3){
            spellsString += ". The tiefling regains all uses of spellcasting with this trait once it finishes a long rest.";
        }         

        returnString = returnString.split("_TIEFLINGSPELLS_").join(spellsString);         
    }

    return returnString;
}

function ExpandAttack(incomingAttack){
    return "haha";
}

function Skills(){    
    if (raceSkills.length == 0 && $('#mmSkills').text().trim().length == 0) return;

    if (raceSkills.length > 0){
        var splitSkills = raceSkills.split(',');
        splitSkills.forEach(element => {
            if (!$('#mmSkills').text().includes(element.trim())){                
                $('#mmSkills').append(", "  + element);
            }
        });        
    }
    var skills = $('#mmSkills').text().replace("Skills", "").trim().split(",");
    var finalString = "";

    skills.forEach(element => {                
        finalString += Skill (element) + ", ";        
    });

    if (finalString.trim().substr(0, 1) == ",") { finalString = finalString.replace(',', "");}
    $('#mmSkills').html("<h4>Skills</h4> " + finalString.substr(0, finalString.length - 2));
}

function Skill(skill = ""){
    var parsedSkill = skill.trim().split('+')[0].trim();
    var prof = Number(mmCRValues[creatureCR][1]);
    
    console.log(skill + " -" + parsedSkill + "-");

    switch (parsedSkill){
        case "Athletics":
            return parsedSkill + " +" + (Number(creatureStats[0].bonus()) + prof);
            break;
        case "Acrobatics":
        case "Sleight of Hand":
        case "Stealth":
            return parsedSkill + " +" + (Number(creatureStats[1].bonus()) + prof);
            break;
        case "Arcana":
        case "History":
        case "Investigation":
        case "Nature":
        case "Religion":
            return parsedSkill + " +" + (Number(creatureStats[3].bonus()) + prof);
            break;
        case "Animal Handling":
        case "Insight":
        case "Medicine":
        case "Perception":
        case "Survival":
            return parsedSkill + " +" + (Number(creatureStats[4].bonus()) + prof);
            break;
        case "Deception":
        case "Intimidation":
        case "Performance":
        case "Persuasion":
            return parsedSkill + " +" + (Number(creatureStats[5].bonus()) + prof);
            break;
        default:
            return skill;
    }
}

function PassivePerception(){
    var senses = $('#mmSenses').text().replace("Senses", "");
    var wisMod = Number(creatureStats[4].bonus());
    var prof = Number(mmCRValues[creatureCR][1]);
 
    if (!$('#mmSkills').text().includes("Perception")) { prof = 0; }
    
    var existingSenses = "";
    var passPer = "passive Perception " + (10 + wisMod + prof);

    if (senses.trim().length == 0){
        existingSenses = "<h4>Senses</h4> " + passPer;
        raceSenses.split(',').forEach(element => {             
            if (!existingSenses.includes(element.trim())){ 
                existingSenses += ", " + element.trim(); 
            } 
        })        
    } else {
        existingSenses = "<h4>Senses</h4> " + passPer + ", " + senses;
        raceSenses.split(',').forEach(element => {             
            if (!existingSenses.includes(element.trim())){ 
                existingSenses += ", " + element.trim(); 
            } 
        })        
    }

    $('#mmSenses').html(existingSenses);
}

function SkinType(){
    var returnString = "";

    var temp = npSkinThickness[Math.floor(Math.random() * npSkinThickness.length)];
    console.log("TYPE: " + temp);

    if (temp != "normal"){
        returnString += "They have an unusual hide that feels " + temp + ". " + SkinPattern();
        
        var addendum = " (natural armor)";
        if ($('#mmAC').text().includes('mage armor')) { 
            addendum = " (" + ((10 + raceACBonus) + (npSkinThickness.indexOf(temp) * 2) + 3) + " with <i>mage armor</i>)"; 
        }
        if ($('#mmAC').text().includes('barkskin')) { 
            addendum = " (can't be less than 16 with <i>barkskin</i>)"; 
        }
        $('#mmAC').html(((10 + raceACBonus) + (npSkinThickness.indexOf(temp) * 2)) + addendum);
    } else {
        if (raceACBonus != 0){
            $('#mmAC').html((10 + raceACBonus + creatureStats[1].bonus()) + " (natural armor)");
        }
    }

    return returnString; 
}

function SkinPattern(){
    var RandomNumber = Math.floor(Math.random() * 10);
    var returnString = "";
    console.log("Skin Pattern: " + RandomNumber);

    switch (RandomNumber){
        case 0:
            returnString = "Their skin is a pattern of alternating " + SkinColor() + " and " + SkinColor() + " stripes. ";
            break;
        case 1:
            returnString = "Their back is " + SkinColor() +  " which fades to " + SkinColor() +  " on their belly and palms. ";
            break;
        case 2:
            returnString =  "Their skin is a solid " + SkinColor() + ". ";
            break;
        case 3:
            returnString = "Their head and limbs are "  + SkinColor() + " while their body is " + SkinColor() + ". ";
            break;
        case 4:
            returnString = "During the day, their skin is " + SkinColor() + " which becomes " + SkinColor() + " under the night sky. ";
            break;
        case 5:
            returnString = "Their body is translucent, only showing an opaque " + SkinColor() + " at the ends of their limbs.  ";
            break;
        case 6:
            returnString = "Their body is randomly colored in splotches."
            break;
        case 7:
            returnString = "Their body is a delicate mixture of " + SkinColor() + " and " + SkinColor() + ", creating a gentle marble effect. ";
            break;
        case 8:
            returnString = SkinColor() + ", " +  SkinColor() + ", and " + SkinColor() + " bands swirl and alternate across their skin. ";
            break;
        case 9:
            returnString = "Their " + SkinColor() + " skin is marked with " + SkinColor() + " lines that gently glow in the dark. ";
            break;
    }

    return returnString.capitalize();
}

function SkinColor(){
    var tone = [ "light", "", "", "", "", "dark"]
    return (tone[Math.floor(Math.random() * tone.length)] + " " + npSkinColors[Math.floor(Math.random() * npSkinColors.length)]).trim();
}

function Abilities(){
    var returnString = "";
    
    if (buildChanged){
        console.log(outputSize + " " + raceSize);
        if (outputSize == "Small"){
            switch (raceSize){
                case "Small":
                    $('#mmSize').text("Small");
                    break;
                case "Large":
                    $('#mmSize').text("Medium");
                    break;
                default:
                    $('#mmSize').text("Small");
                    break;
            }
            
            $('#mmAbilities').append("<property-block> <h4>Small Build.</h4> <p>The " + creatureName + 
            " is smaller than others of it's kind. It has disadvantage on Strength ability checks and saving throws.</p> </property-block>");

            returnString += ", and are smaller than most " + racePlural;
        };

        if (outputSize == "Large"){
            switch (raceSize){
                case "Small":
                    $('#mmSize').text("Medium");
                    break;
                case "Large":
                    $('#mmSize').text("Large");
                    break;
                default:
                    $('#mmSize').text("Large");
                    break;
            }
            
            $('#mmAbilities').append("<property-block>  <h4>Large Build.</h4> <p>The " + creatureName + 
            " is larger than others of it's kind. It has advantage on Strength ability checks and saving throws.</p> </property-block>");
            returnString += ", and are larger than most other " + racePlural;
        }; 
    }
    return returnString;
}

function Locomotion(){    
    var returnString = "walking";
    var walking = true;
    var flying = false;
    var swimming = false;
    var oozing = false;
    var amorphous = false;    
    var spiderclimb = false;
    var climb = false;
    var amphibious = false;

    var list = LocomotionList(); 
    list.forEach((element) => {                 
        console.log(element + " ");
    });

    list.forEach((element) => {                 
        if (element == "walking") { creatureBaseSpeed += 10; }
    });
    $('#mmBaseSpeed').text(creatureBaseSpeed);

    var fly = "";
    if (!raceSpeed.includes("fly")){
        list.forEach((element) => {              
            if (element == "flying") {             
                if (flying){
                    fly = ", fly " + creatureBaseSpeed + " ft. (hover)";
                } else {
                    flying = true;      
                    fly = ", fly " + creatureBaseSpeed + " ft.";
                }                                         
            }
        });
    $('#mmSpeed').append(fly);
    } 

    var swim = ""
    if (!raceSpeed.includes("swim")){
    list.forEach((element) => {                 
        if (element == "swimming") {             
            if (swimming){
                if (!amphibious){
                    if (!$('#mmAbilities').text().includes("Amphibious")){
                        $('#mmAbilities').append("<property-block> <h4>Amphibious.</h4> <p>The " + creatureName + 
                        " can breathe air and water.</p> </property-block>");
                    }  
                    amphibious = true;
                }
            } else {
                swimming = true;   
                swim = ", swimming " + creatureBaseSpeed + " ft.";
            }                                
        }
    });
    $('#mmSpeed').append(swim);
    }
    
    var ooze = "";
    list.forEach((element) => {                  
        if (element == "oozing") {             
            if (oozing){
                if (!amorphous){
                    $('#mmAbilities').append("<property-block> <h4>Amorphous.</h4> <p>The " + creatureName + 
                    " can move through a space as narrow as 1 inch wide without squeezing.</p> </property-block>");  
                    amorphous = true;
                }
            } else {
                oozing = true; 
                ooze = ", climb " + creatureBaseSpeed + " ft.";
                if (!spiderclimb){
                    $('#mmAbilities').append("<property-block> <h4>Spider Climb.</h4> <p>The " + creatureName + 
                    " can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.</p> </property-block>");  
                    spiderclimb = true;
                }
            }                                  
        }
    });
    $('#mmSpeed').append(ooze);

    if (flying) { returnString += " and flying"; }
    if (oozing) { returnString += " and oozing"; }
    if (swimming) { returnString += " and swimming"; }
    if (climb) {returnString += " and climbing"; }
    return returnString;
}

function LocomotionList(){    
    var listofspeeds = [];
    var temp = "";
    temp = npLocomotion[Math.floor(Math.random() * npLocomotion.length)];    
    
    if (temp == "multiple"){
        var move1 = LocomotionList();
        var move2 = LocomotionList();
        listofspeeds.push(move1);
        listofspeeds.push(move2);
    } else {
        listofspeeds.push(temp);
    }

    return listofspeeds;
}

function Language(){
    var languages = $('#mmLanguage').text().replace("Languages", "").trim();
    var numString = 1;

    if (languages.includes("two")) {numString = 2;}
    if (languages.includes("three")) {numString = 3;}
    if (languages.includes("four")) {numString = 4;}
    if (languages.includes("five")) {numString = 5;}
    if (languages.includes("six")) {numString = 6;}
    if (languages.includes("seven")) {numString = 7;}
    if (languages.includes("eight")) {numString = 8;}

    var importLanguage = raceLanguage.trim();
    var existingLanugage = "";

    if (languages.includes("plus")){        
         existingLanugage = languages.split("plus")[0].trim();         
    }

    if (importLanguage.length == 0) {        
        return;
    } else {                
        numString = numString - importLanguage.split(',').length;
        
        if (numString <= 0 && !(languages.includes("plus"))){            
            $('#mmLanguage').html("<h4>Languages</h4> " + raceLanguage);
        } else {                        
            var outputString = "<h4>Languages</h4> " + raceLanguage;            
            
            if (languages.includes("plus")){                                
                outputString += ", " + existingLanugage;
            }

            if ((numString-1) > 0){
                outputString += ", plus any " + numberWords[numString-1] + " language";
            }
            
            if (numString > 1) {outputString += "s.";} else {outputString +=".";}
            $('#mmLanguage').html(outputString);
        }
    }    
}

function FeaturesCause(){
    var causes = [
        "Due to their time in the dream realms, ",
        "After having wandered for too long in the alleyways of Nod, ",
        "Ravaged by miscast magics, ",
        "Twisted by the black ichor blood of a maelephant, ",
        "Cursed by " + NightmareCourt() + " of the nightmare court, "
    ];

    return causes[Math.floor(Math.random() * causes.length)];
}

function NightmareCourt(){
    var courtMembers = [
        "The Nightmare Man", "Hypnos", "Mullonga", "The Ghost Dancer", "Morpheus", "The Rainbow Serpent"
    ];

    return courtMembers[Math.floor(Math.random() * courtMembers.length)];
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Number.prototype.bonus = function() {
    return Math.floor(parseInt(this / 2) - 5);
}

Number.prototype.bonusplus = function() {
    return Math.floor(parseInt(this / 2) - 5) + parseInt(mmCRValues[creatureCR][1]);
}

function HitPoints(){
    var targetHP = mmCRValues[creatureCR][5];
    var currentHP = 0;
    var lastValue = 1000;
    var currentMultiplier = 0;
    var dieSize = 8;
    var conMod = creatureStats[2].bonus()

    if (outputSize == "Large") {dieSize = 10;}
    if (outputSize == "Small") {dieSize = 6;}
    
    while (currentHP < targetHP){
        currentMultiplier++;        
        currentHP = (currentMultiplier * ((dieSize / 2) + 0.5)) + (currentMultiplier * conMod);        
        //console.log("TARGET: " + targetHP + " | " + currentHP + " " + currentMultiplier + " " + dieSize + " (" + ((dieSize / 2) + 0.5) + ") " + conMod);
    }

    returnstring = parseInt(currentHP);
    returnstring = returnstring + " (" + currentMultiplier + "d" + dieSize;
    if (conMod != 0) {returnstring = returnstring +  " + "  + (conMod * currentMultiplier)};    
    returnstring = returnstring + ")";
    return returnstring;
}

function Spellcasting_Trait(){    
    return "The " + creatureName + " is a " + $('#mmSpellcasting').attr("data-level") + " level spellcaster. " +
    " Its spellcasting ability is " + $('#mmSpellcasting').attr("data-ability") + 
    " (spell save DC " + Spellcasting_DC($('#mmSpellcasting').attr("data-ability")) + ", +" +
    SpellcastingAttack($('#mmSpellcasting').attr("data-ability")) + " to hit with spell attacks). The " +
    creatureName + " has the following " + $('#mmSpellcasting').attr("data-spelllist") + " spells prepared:";
}

function Spellcasting_DC(abilityName){
    console.log("ABILITY: " + abilityName);
    console.log(Number(creatureStats[3].bonus()) + " " + creatureCR + " " + (mmCRValues[creatureCR]));
    switch(abilityName.toLowerCase()){
        case "intelligence":
            return (8 + Number(creatureStats[3].bonusplus()));
        case "wisdom":
            return (8 + Number(creatureStats[4].bonusplus()));
        case "charisma":
            return (8 + Number(creatureStats[5].bonusplus()));
    }
}

function SpellcastingAttack(abilityName){
switch(abilityName.toLowerCase()){
        case "intelligence":
            return (Number(creatureStats[3].bonusplus()));
        case "wisdom":
            return (Number(creatureStats[4].bonusplus()));
        case "charisma":
            return (Number(creatureStats[5].bonusplus()));
    }
}