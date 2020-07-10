var npSize = [ "Small", "Small", "Medium", "Medium", "Medium", "Large" ];
var npFeatures = [ "horns on head", "fangs or tusks", "oversized, pointed ears", "solid-colored eyes", "animal eyes", "a furry or hairless body", "spinal ridges", "feathered skin", "a non-prehensile tail", "scaled skin", "clawed hands", "an amorphous body", "an unusually powerful smell", "an extra set of smaller arms", "a centaur-like body shape", "an insect-like chitinous carapace", "multiple unified voices", "an extra head or face" ];
var npLocomotion = [ "swimming", "walking", "walking", "walking", "walking", "walking", "oozing", "flying", "multiple", "multiple"];
var npSkinThickness = [ "normal", "thick", "waxy", "woody", "stoney", "metallic" ];
var npSkinColors = [ "red", "orange", "yellow", "green", "blue", "indigo", "purple", "white", "black", "natural color of their race"];
var npSavingThrows = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
var npDamageTypes = [ "cold", "poison", "acid", "psychic", "fire", "necrotic", "radiant", "force", "thunder", "lightning"];

var creatureName = "Night Parade ";
var creatureCR = 0;
var creatureBaseSpeed = 0;
var outputSize = "";
var creatureStats = [];


var mmCRValues = {
    "0": ["2", "13", "3", "10"],
    "1/8":["2", "13", "3", "25"],
    "1/4":["2", "13", "3", "50"],
    "1/2":["2", "13", "3", "100"],
    "1":["2", "13", "3", "200"],
    "2":["2", "13", "3", "450"],
    "3":["2", "13", "4", "700"],
    "4":["2", "14", "5", "1100"],
    "5":["3", "15", "6", "1800"],
    "6":["3", "15", "6", "2300"],
    "7":["3", "15", "6", "2900"],
    "8":["3", "16", "7", "3900"],
    "9":["4", "16", "7", "5000"],
    "10":["4", "17", "7", "5900"],
    "11":["4", "17", "8", "7200"],
    "12":["4", "17", "8", "8400"],
    "13":["5", "18", "8", "10000"],
    "14":["5", "18", "8", "11500"],
    "15":["5", "18", "8", "13000"],
    "16":["5", "18", "9", "15000"],
    "17":["6", "18", "10", "18000"],
    "18":["6", "19", "10", "20000"],
    "19":["6", "19", "10", "22000"],
    "20":["6", "19", "10", "25000"],
    "21":["7", "19", "11", "33000"],
    "22":["7", "19", "11", "41000"],
    "23":["7", "19", "11", "50000"],
    "24":["7", "19", "12", "62000"],
    "25":["8", "19", "12", "75000"],
    "26":["8", "19", "12", "90000"],
    "27":["8", "19", "13", "105000"],
    "28":["8", "19", "13", "120000"],
    "29":["9", "19", "13", "135000"],
    "30":["9", "19", "14", "155000"]
 };

function DoTheThing(){  
  $("#DivContent").load("StatBlocks/acolyte.mm", function() {
    /* When load is done */    
    creatureName += $('#mmName').text(); 
    $('#mmName').text(creatureName);
    
    var bonus = $('#mmStats').html().split('=');
    creatureStats.push(bonus[1].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[2].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[3].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[4].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[5].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[6].substring(1,3).replace('"', ''));

    var cr = $('#mmCR').text().split('(')[0].trim();
    creaturecr =  cr;

    creatureBaseSpeed = parseInt($('#mmBaseSpeed').text());
    outputSize = npSize[Math.floor(Math.random() * npSize.length)];  
    
    //outputString += npAttackForm[Math.floor(Math.random() * npAttackForm.length)];
    //outputString += npSkinColors[Math.floor(Math.random() * npSkinColors.length)];
    //outputString += npSavingThrows[Math.floor(Math.random() * npSavingThrows.length)];
    //outputString += npDamageTypes[Math.floor(Math.random() * npDamageTypes.length)];
    
    $('#test').append(Features());  
    MutatedAttacks();        
  });   
};

function Features(){
    var returnString = FeaturesCause();
    returnString += "this member of the night parade has ";
    returnString += npFeatures[Math.floor(Math.random() * npFeatures.length)];
    returnString += ". They move by " + Locomotion() + ". ";
    returnString += SkinType() + "</br>";

    returnString += Abilities();
    return returnString;
}

function SkinType(){
    var returnString = "";

    var temp = npSkinThickness[Math.floor(Math.random() * npSkinThickness.length)];
    if (temp != "normal"){
        returnString += "They have an unusual hide that feels " + temp + ". " + SkinPattern();
        $('#mmAC').text((10 + (npSkinThickness.indexOf(temp) * 2)) + " (natural armor)");

    return returnString; 
}}

function SkinPattern(){
    var RandomNumber = Math.floor(Math.random() * 10);
    var returnString = "";

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
    
    if (outputSize == "Small"){
        $('#mmAbilities').append("<property-block> <h4>Small Build.</h4> <p>The " + creatureName + 
        " is smaller than others of it's kind. It has disadvantage on Strength ability checks and saving throws.</p> </property-block>");
    };

    if (outputSize == "Large"){
        $('#mmAbilities').append("<property-block>  <h4>Large Build.</h4> <p>The " + creatureName + 
        " is larger than others of it's kind. It has advantage on Strength ability checks and saving throws.</p> </property-block>");
    }; 
    
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

    var swim = ""
    list.forEach((element) => {                 
        if (element == "swimming") {             
            if (swimming){
                if (!amphibious){
                    $('#mmAbilities').append("<property-block> <h4>Amphibious.</h4> <p>The " + creatureName + 
                    " can breathe air and water.</p> </property-block>");  
                    amphibious = true;
                }
            } else {
                swimming = true;   
                swim = ", swimming " + creatureBaseSpeed + " ft.";
            }                                
        }
    });
    $('#mmSpeed').append(swim);

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

function FeaturesCause(){
    var causes = [
        "Due to it's time in the dream realms, ",
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

function MutatedAttacks(){
    var attacks = MutatedAttackResult();

    attacks.forEach((element) => {  
        console.log(element);

        var attack = ("<property-block> <h4>" + (element + '').capitalize() + ".</h4> <p>");
        var statWithProf = (parseInt(creatureStats[0].bonus()) + parseInt(mmCRValues[creatureCR][0]));
        var bonus = "";

        if (statWithProf != 0){
            if (statWithProf > 0){
                bonus = " +" + statWithProf;
            } else {
                bonus = " -" + statWithProf;
            }
        } 

        switch (element + ''){
            case "claws":
                attack  += "<i>Melee Weapon Attack: </i>" + bonus +  
                " to hit, reach 5 ft., one target. <i>Hit:</i> " +  
                parseInt(3 + parseInt(creatureStats[0].bonus())) + " (1d6 + " + parseInt(creatureStats[0].bonus()) +") slashing damage.";
                break;
            case  "bite":
                attack  += "<i>Melee Weapon Attack: </i>+" + bonus +  
                " to hit, reach 5 ft., one target. <i>Hit:</i> " +  
                parseInt(3 + parseInt(creatureStats[0].bonus())) + " (1d6 + " + parseInt(creatureStats[0].bonus()) +") slashing damage.";
                break;
            case "tentacle":
                attack  += "<i>Melee Weapon Attack: </i>+" + bonus +  
                " to hit, reach 5 ft., one target. <i>Hit:</i> " +  
                parseInt(3 + parseInt(creatureStats[0].bonus())) + " (1d6 + " + parseInt(creatureStats[0].bonus()) +") slashing damage.";
                break;
            case  "extra arm/leg":
                attack  = "<property-block> <h4>" + (element+'').capitalize() + ".</h4> <p>" +
                " Any turn the " + creatureName + " uses its action to make a melee attack," + 
                " as a bonus action it makes one additional attack using an attack it used this turn."
                break;
        }

        attack += "</p> </property-block>";      
        $('#mmAttacks').append(attack);
    });
}

function MutatedAttackResult(){
    var returnList = [];
    var npAttackForm = [ "claws", "claws", "claws", "bite", "bite", "bite", "tentacle", "tentacle", "tentacle", "extra arm/leg", "extra arm/leg", "multiple" ];
    var test = npAttackForm[Math.floor(Math.random() * npAttackForm.length)];
    if (test != "multiple"){
        returnList.push(test);
    } else {
        var attack1 = MutatedAttackResult();
        var attack2 = MutatedAttackResult();
        attack1.forEach((element) => { 
            returnList.push(attack1);
        });
        attack2.forEach((element) => { 
            returnList.push(attack2);
        });
    }

    return returnList;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.bonus = function() { return Math.floor((parseInt(this) / 2)-5); }