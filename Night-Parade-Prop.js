var npSize = [ "Small", "Small", "Medium", "Medium", "Medium", "Large" ];
var npFeatures = [ "horns on head", "fangs or tusks", "oversized, pointed ears", "solid-colored eyes", "animal eyes", "a furry or hairless body", "spinal ridges", "feathered skin", "a non-prehensile tail", "scaled skin", "clawed hands", "an amorphous body", "an unusually powerful smell", "an extra set of smaller arms", "a centaur-like body shape", "an insect-like chitinous carapace", "multiple unified voices", "an extra head or face" ];
var npLocomotion = [ "swimming", "walking", "walking", "walking", "walking", "walking", "oozing", "flying", "multiple", "multiple"];
var npSkinThickness = [ "normal", "thick", "waxy", "woody", "stoney", "metallic" ];
var npSkinColors = [ "red", "orange", "yellow", "green", "blue", "indigo", "purple", "white", "black", "natural color of their race"];
var npSavingThrows = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
var npDamageTypes = [ "cold", "poison", "acid", "psychic", "fire", "necrotic", "radiant", "force", "thunder", "lightning"];

var creatureName = "Night Parade ";
var creatureRace = "";
var creatureCR = 0;
var creatureBaseSpeed = 0;
var outputSize = "";
var creatureStats = [];
var creatureSpecialAbilityCount = 0;

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
  $("#DivContent").load("StatBlocks/acolyte.mm", function() {
    /* When load is done */    
    creatureName += $('#mmName').text(); 
    creatureRace += $('#mmRace').text(); 
    outputSize = $('#mmSize').text();

    $('#mmName').text(creatureName);

    var bonus = $('#mmStats').html().split('=');
    creatureStats.push(bonus[1].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[2].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[3].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[4].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[5].substring(1,3).replace('"', ''));
    creatureStats.push(bonus[6].substring(1,3).replace('"', ''));

    var cr = $('#mmCR').text().split('(')[0].trim();
    creaturecr = cr;
    
    creatureSpecialAbilityCount = numberOfSpecials();
    if (creaturecr.includes("/")){
        if (creatureSpecialAbilityCount >= 2){
            creaturecr = 1;
        }
    } else {
        var increasedCR = parseInt(creaturecr) + parseInt(creatureSpecialAbilityCount/2);
        console.log(increasedCR);
        creaturecr = mmCRValues[increasedCR][0];
    }
    console.log("CR:" + creaturecr + " | Abilities: " + creatureSpecialAbilityCount);

    creatureBaseSpeed = parseInt($('#mmBaseSpeed').text());
    if (outputSize != "Small"){
        outputSize = npSize[Math.floor(Math.random() * npSize.length)];  
    }
    
    MutatedAttacks();
    SavingThrows();            

    $('#test').append(Features());  
    $('#mmCR').text(creaturecr + " (" + mmCRValues[creaturecr][4] + " XP)");  
    $('#mmHP').text(HitPoints());
  });   
};

function Features(){
    var returnString = FeaturesCause();
    returnString += "this member of the night parade has ";
    returnString += npFeatures[Math.floor(Math.random() * npFeatures.length)];
    returnString += Abilities() + ". They move by " + Locomotion() + ". ";    
    returnString += SkinType() + "</br>";
    
    returnString += "<p style='margin-left:40px;'></p>";
    
    var randomFeature = [];    
    for (i = 0; i < creatureSpecialAbilityCount; i++){        
        randomFeature[i] = Math.floor(Math.random() * 100) + 1;
        randomFeature.forEach(element => 
            {
                while (element == randomFeature[i]){
                    randomFeature[i] = Math.floor(Math.random() * 100) + 1;
                }
            }
        );
    }

    for (i = 0; i < creatureSpecialAbilityCount; i++){   
        console.log(randomFeature[i]);     
        returnString += bigFeatures(randomFeature[i]) + " ";
    }
    
    return returnString;
}

function SavingThrows(){
    var saves = $('#mmSaves').text().trim();
    var save1 = SavingThrow();
    var save2 = SavingThrow();

    if (saves == ""){                
        while(save1 == save2 || save1.trim() == "" || save2.trim() == ""){
            save1 = SavingThrow();
            save2 = SavingThrow();
        }

         $('#mmSaves').append("<h4>Saving Throws.</h4> " +
        "<p>" + save1 + ", " + save2 + "</p>");        
    } else if (saves.split(',').length == 1){
        console.log(saves);
        save1 = saves.slice(14).trim();

        while(save1 == save2 || save1.trim() == "" || save2.trim() == ""){            
            save2 = SavingThrow();
        }

        $('#mmSaves').html("<h4>Saving Throws.</h4> " +
        "<p>" + save1 + ", " + save2) + "</p>";  
    }
}

function SavingThrow(){
    var ability = npSavingThrows[Math.floor(Math.random() * npSavingThrows.length)];    
    var stat = ability.substr(0, 3);
    var statPlus = "";

    switch (ability){
        case "strength":            
            statPlus = (parseInt(creatureStats[0].bonus()) + parseInt(mmCRValues[creatureCR][1]));
            break;
        case "dexterity":
            statPlus = (parseInt(creatureStats[1].bonus()) + parseInt(mmCRValues[creatureCR][1]));
            break;
        case "constitution":
            statPlus = (parseInt(creatureStats[2].bonus()) + parseInt(mmCRValues[creatureCR][1]));
            break;
        case "intelligence":
            statPlus = (parseInt(creatureStats[3].bonus()) + parseInt(mmCRValues[creatureCR][1]));
            break;
        case "wisdom":
            statPlus = (parseInt(creatureStats[4].bonus()) + parseInt(mmCRValues[creatureCR][1]));
            break;
        case "charisma":
            statPlus = (parseInt(creatureStats[5].bonus()) + parseInt(mmCRValues[creatureCR][1]));
            break;
    }

    var totalReturn = stat + " +" + statPlus;  
    if ($('#mmSaves').text().includes(stat)) { totalReturn = ""; }  
    return (totalReturn).capitalize();
}

function numberOfSpecials(){
    var amount = [1, 1, 1, 2, 2, 2, 2, 3, 3, 4];    
    var result = parseInt(amount[Math.floor(Math.random() * amount.length)]);    
    
    if (result == 4){
        console.log("HIGH ROLLER");
        return (numberOfSpecials() + 1);
    }

    console.log("NOS: " + result);
    return result;
}

function SkinType(){
    var returnString = "";

    var temp = npSkinThickness[Math.floor(Math.random() * npSkinThickness.length)];
    console.log("TYPE: " + temp);
    if (temp != "normal"){
        returnString += "They have an unusual hide that feels " + temp + ". " + SkinPattern();
        $('#mmAC').text((10 + (npSkinThickness.indexOf(temp) * 2)) + " (natural armor)");
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
    
    if (outputSize == "Small"){
        $('#mmSize').text("Small");
        $('#mmAbilities').append("<property-block> <h4>Small Build.</h4> <p>The " + creatureName + 
        " is smaller than others of it's kind. It has disadvantage on Strength ability checks and saving throws.</p> </property-block>");

        returnString += ", and are smaller than most " + creatureRace.toLowerCase() + "s";
    };

    if (outputSize == "Large"){
        $('#mmSize').text("Large");
        $('#mmAbilities').append("<property-block>  <h4>Large Build.</h4> <p>The " + creatureName + 
        " is larger than others of it's kind. It has advantage on Strength ability checks and saving throws.</p> </property-block>");
        returnString += ", and are larger than most other " + creatureRace.toLowerCase() + "s";
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
        var attack = ("<property-block> <h4>" + (element + '').capitalize() + ".</h4> <p>");
        var statWithProf = (parseInt(creatureStats[0].bonus()) + parseInt(mmCRValues[creatureCR][1]));
        var bonus = "";

        if (statWithProf >= 0){
            bonus = " +" + statWithProf;
        } else {
            bonus = " -" + statWithProf;
        }

        switch (element + ''){
            case "claws":
                attack  += "<i>Melee Weapon Attack: </i>" + bonus +  
                " to hit, reach 5 ft., one target. <i>Hit:</i> " +  
                parseInt(3 + parseInt(creatureStats[0].bonus())) + " (1d6 + " + parseInt(creatureStats[0].bonus()) +") slashing damage.";
                break;
            case  "bite":
                attack  += "<i>Melee Weapon Attack: </i>" + bonus +  
                " to hit, reach 5 ft., one target. <i>Hit:</i> " +  
                parseInt(3 + parseInt(creatureStats[0].bonus())) + " (1d6 + " + parseInt(creatureStats[0].bonus()) +") slashing damage.";
                break;
            case "tentacle":
                attack  += "<i>Melee Weapon Attack: </i>" + bonus +  
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

    console.log(">" + test);

    if (test != "multiple"){
        returnList.push(test);
    } else {
        var attack1 = MutatedAttackResult();
        var attack2 = MutatedAttackResult();
        attack1.forEach((element) => { 
            returnList.push(attack1);
            console.log(">>" + attack1);
        });
        attack2.forEach((element) => { 
            returnList.push(attack2);
            console.log(">>" + attack2);
        });
    }

    return returnList;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.bonus = function() {
    return Math.floor(parseInt(this / 2) - 5);
}

String.prototype.bonusplus = function() {
    return Math.floor(parseInt(this / 2) - 5) + parseInt(mmCRValues[creatureCR][1]);
}

function bigFeatures(randomFeature){    
    var DC = 8 + parseInt((creatureStats[5].bonus())) + parseInt(mmCRValues[creaturecr][1]);
    console.log("Creature DC: " + DC + " " + creatureStats[5].bonus() + " " + mmCRValues[creaturecr][1]);
    var returnString = "";

    // $('#mmAttacks').append("<property-block> <h4>NAME.</h4> <p>The " + creatureName + "</p></property-block>")
    // $('#mmAbilities').append("<property-block> <h4>NAME.</h4> <p>The " + creatureName + "</p></property-block>");
    console.log(randomFeature);
    switch (randomFeature){
        case 1: 
        case 2:
        case 3:
        case 4:
            $('#mmAbilities').append("<property-block> <h4>Pustule Hide.</h4><p> At the end of each of its turns, if the " + creatureName  + " can see a hostile creature, " +
            "acid filled pustules on its skin inflate and burst. This casts <i>acid splash</i> on all valid targets for the spell (using no action)." +
            " The save DC for this effect is " + DC + ".</p></property-block>");
            
            returnString += "The " + creatureName + " has a hide coated thick with disgusting acid-filled pustules.";
            break;
        case 5:
        case 6:
            $('#mmAbilities').append("<property-block> <h4>Reactionary Camouflage.</h4><p> If the  " + creatureName  + " takes damage, " +
            "as a reaction it turns invisible. This lasts until the " + creatureName + " makes an attack or casts a spell.</p></property-block>");
            
            returnString += "The " + creatureName + "'s hide shimmers with colors and patterns, trying to blend into the surrounding environment.";
            break;
        case 7:
        case 8:
            $('#mmAbilities').append("<property-block> <h4>Magic Resistance.</h4><p> The " + creatureName  + " has advantage on saving throws against spells.</p></property-block>");            
            break;
        case 9:
        case 10:            
            $('#mmAbilities').append("<property-block> <h4>Constant Laughter.</h4><p> The first time a creature sees the " + creatureName  + ", they are affected by the <i>tasha's hideous laughter</i> spell." +
            " The saving throw DC for this spell is " + DC + ".</p></property-block>");
            
            returnString += "The " + creatureName + " is constantly laughing and giggling, as though they find everything they see and hear as some hillarious joke.";
            break;
        case 11:
        case 12:
            $('#mmAttacks').append("<property-block> <h4>Control Weather (Recharge short or long rest).</h4><p> The " + creatureName  + " can cast <i>control weather</i> " +
            "without using a spell slot or material components.</p></property-block>");   
            
            returnString += "With each step the " + creatureName + " takes, the sound of rainfall mixed with thunder can be heard.";
            break;
        case 13:
        case 14:
            $('#mmAttacks').append("<property-block> <h4>Call Lightning (Recharge short or long rest).</h4><p> The " + creatureName  + " can cast <i>call lightning</i> " +
            "without using a spell slot or material components. The saving throw DC for this spell is " + DC + ".</p></property-block>");

            returnString += "With each step the " + creatureName + " takes, lightning bolts dance away from their feet."
            break;
        case 15:
        case 16:
            $('#mmAbilities').append("<property-block> <h4>Corrosive Hide.</h4><p> When non-magical metal objects strike the  " + creatureName  + ", " +
            " they turn to rust at the end of the current turn.</p></property-block>");            
            
            $('#mmAttacks').append("<property-block> <h4>Rusting Touch.</h4> <p> <i>Melee Weapon Attack: </i>+" + creatureStats[0].bonusplus() + " to hit, reach 5 ft., one target. " +
            "<i>Hit:</i> One non-magical metallic object worn or carried by the target crumbles to rust.</p></property-block>");            

            returnString += "The " + creatureName + " has a rust-colored dust falling from it's skin.";
            break;
        case 17:
        case 18:
            $('#mmAbilities').append("<property-block> <h4>Poisoned Hide.</h4><p> Any creature striking the " + creatureName  + " with a melee attack becomes " +
            " poisoned and takes 1d8 poison damage.</p></property-block>");

            returnString += "The " + creatureName + " is thick with a sickly-" + SkinColor() + " toxic liquid.";
            break;
        case 19:
        case 20:
            $('#mmAttacks').append("<property-block> <h4>Shape Rock (Recharge short or long rest).</h4><p> The " + creatureName  + " can cast <i>transmute rock</i> " +
            "without using a spell slot or material components.</p></property-block>");

            returnString += "The ground flexes under the " + creatureName + "s steps, as though the solid ground is trying to run from their presence.";
            break;
        case 21:
        case 22:
            $('#mmAbilities').append("<property-block> <h4>Cloud Kill Immunity.</h4><p> The " + creatureName  + " is immune to the <i>cloudkill</i> spell.</p></property-block>");

            $('#mmAttacks').append("<property-block> <h4>Death Cloud (Recharge long rest).</h4><p>The " + creatureName  + " can cast <i>cloudkill</i> " +
            "without using a spell slot or material components. The spell stays centered on the " + creatureName + " and the saving throw for this " +
            " effect is " + DC + ".</p></property-block>");

            returnString += "A thick yellow cloud hangs and clings to the " + creatureName + ".";
            break;
        case 23:
        case 24:
            $('#mmAttacks').append("<property-block> <h4>Screeching Hide.</h4><p> As a bonus action, an extra mouth appears on the  " + creatureName  + " which begins to scream." +
            "Any being within 30 feet who can hear the scream must succeed on a " + DC + " Wisdom saving throw or become stunned until the end of their next turn.</p></property-block>");

            returnString += "The " + creatureName + " has dozens of seemingly vestigial mouths spread across their torso and limbs.";
            break;
        case 25:
        case 26:
            $('#mmAttacks').append("<property-block> <h4>Fire Belch (Recharge 5-6).</h4><p> As a bonus action, the " + creatureName  + " can cast <i>burning hands</i>. " +
            "This effect is considered non-magical and the saving throw for this effect is " + DC + ".</p></property-block>");

            returnString += "The " + creatureName + " exhales small flames and smoke with each breath it takes.";
            break;
        case 27:
        case 28:
            $('#mmAttacks').append("<property-block> <h4>Mistform (Recharge long rest).</h4><p> The " + creatureName  + " can cast <i>gaseous form</i>. " +
            "The " + creatureName + " can use this trait three times before it needs to be recharged.</p></property-block>");

            returnString += "The " + creatureName + " seems to shift in and out of view, as though it was composed of clouds.";
            break;
        case 29:
        case 30:
            var element1 = "";
            var element2 = "";
            while (element1 == element2){
                element1 = npDamageTypes[Math.floor(Math.random() * npDamageTypes.length)];
                element2 = npDamageTypes[Math.floor(Math.random() * npDamageTypes.length)];
            }
            $('#mmAbilities').append("<property-block> <h4>Regeneration.</h4><p> At the start of each of its turns, the " + creatureName  + " regains 5 hit points. Additionally, it" +
            " is resistant to " + element1 + " and " + element2 + " damage.</p></property-block>");

            returnString += "The " + creatureName + " has buildup of skin in thick patches that seemingly fall off at random, as though healing from unseen wounds.";
            break;
        case 31:
        case 32:            
            $('#mmAttacks').append("<property-block> <h4>Gorgon Skin (Recharge 6).</h4><p> As a reaction to being hit with a melee attack, the " + creatureName  + " can " +
            " attempt to paralyze the attacker. The target must succeed on a DC 13 Constitution saving throw, or start turning to stone. " +
            " The target gains the restrained condition. At the end of its next turn, the target may attempt a new saving throw, ending the effect on a success. " +
            "On a failure, the target is petrified until freed by the greater restoration spell or other magic </p></property-block>");

            returnString += "The " + creatureName + " has an oily green sheen spread across their skin.";
            break;
        case 33:
        case 34:
            $('#mmAbilities').append("<property-block> <h4>Breathless.</h4><p> The " + creatureName  + " does not need to breathe.</p></property-block>");

            returnString += "The " + creatureName + " does not seem to draw breaths.";
            break;
        case 35:
        case 36:            
            $('#mmAbilities').append("<property-block> <h4>Sight Beyond Sight.</h4><p> The " + creatureName  + " has advantage on Wisdom (Perception) checks made using sight.</p></property-block>");
            
            returnString += "The " + creatureName +  " possesses " + (Math.floor(Math.random() * 9) + 1) + " extra eyes.";            
            break;
        case 37:
        case 38:
            $('#mmAbilities').append("<property-block> <h4>Powerful Nose.</h4><p> The " + creatureName  + " has advantage on Wisdom (Perception) checks made using scent.</p></property-block>");
            
            returnString += "The " + creatureName + "'s head is more lupine than other " + creatureRace + "s";
            break;
        case 39:
        case 40:
            $('#mmAbilities').append("<property-block> <h4>Large Ears.</h4><p> The " + creatureName  + " has advantage on Wisdom (Perception) checks made using sound.</p></property-block>");
            
            returnString += "The " + creatureName + "'s ears are large and bat-like.";
            break;
        case 41:
        case 42:
            $('#mmAbilities').append("<property-block> <h4>Arcane Ablation.</h4><p> The " + creatureName  + " is immune to damage from magic spells and weapons. The " + creatureName + " is vulnerable" +
            " to non-magical damage.</p></property-block>");
            break;
        case 43:
        case 44:
            $('#mmAttacks').append("<property-block> <h4>Darkcloak (Recharge long rest).</h4><p> The " + creatureName  + " can cast <i>darkness</i>. " +
            "The " + creatureName + " can use this trait three times before it needs to be recharged.</p></property-block>");

            returnString += "The " + creatureName + "'s shadow seems to move about with a mind of its own.";
            break;
        case 45:
        case 46:
            $('#mmAttacks').append("<property-block> <h4>Paralytic Touch (Recharge long rest).</h4><p> The " + creatureName  + " reaches out to a creature within 5 feet. " +
            "The target must succeed on a " + DC + " Constitution saving throw, or become paralyzed. The target can attempt a new saving throw at the end of each of its turns" +
            ", ending the effect on a success. The " + creatureName + " can use this ability three times before it needs to be recharged.</p></property-block>");

            returnString += "The " + creatureName + "'s fingertips look deformed and disfigured, more like weapons than fingers.";
            break;
        case 47:
        case 48:
            $('#mmAbilities').append("<property-block> <h4>Pack Alpha.</h4><p> The " + creatureName  + " can innately cast <i>conjure animals</i> without using a spell slot or components." +
            " It can only summon creatures of CR 1/4 or lower.</p></property-block>");
            
            returnString += "The " + creatureName + "'s torso is patterned with a series of holes which small animals crawl, hide, scury, or otherwise occupy.";
            break;
        case 49:
        case 50:
             $('#mmAttacks').append("<property-block> <h4>Master of Flames (Recharge long rest).</h4><p> The " + creatureName  + " can cast <i>fireball</i>. " +
            "The " + creatureName + " can use this trait three times before it needs to be recharged.</p></property-block>");

            returnString += "The " + creatureName + " always seems surrounded by a nimbus of flames that lick and dance up their limbs and torso.";
            break;
        case 51:
        case 52:
            $('#mmAbilities').append("<property-block> <h4>Mind Reader.</h4><p> The " + creatureName  + " can read any mind within 30 feet.</p></property-block>");
            
            returnString += "The " + creatureName + "'s head is oversized, with thick veins pulsing under its skin.";
            break;
        case 53:
        case 54:
            $('#mmAttacks').append("<property-block> <h4>Wall of Force (Recharge long rest).</h4><p> The " + creatureName  + " can cast <i>wall of force</i> " +
            "without using a spell slot or using components.</p></property-block>");

            returnString += "The " + creatureName + " always seems surrounded by a nimbus of flames that lick and dance up their limbs and torso.";
            break; 
        case 55:
        case 56:
            $('#mmAttacks').append("<property-block> <h4>Misfortune Manipulator.</h4><p> If the  " + creatureName  + " is within 30 feet of a creature making" +
            " an ability check, attack roll, or saving throw, as a reaction it imposes disadvantage on the roll.</p></property-block>");
            
            returnString += "The " + creatureName + "'s very presence seems to cause small amounts of chaos to explode around them. Stonework crumbles, metal rings as though struck," +
            " and loose objects move as though knocked from their position.";
            break;
        case 57:
        case 58:
            $('#mmAttacks').append("<property-block> <h4>Rime Blessed (Recharge long rest).</h4><p> The " + creatureName  + " can cast <i>ice storm</i> " +
            "without using a spell slot or using components.</p></property-block>");

            returnString += "The " + creatureName + " always seems surrounded by whipping winds, their presence causing frost to form on unattended surfaces.";
            break; 
        case 59:
        case 60:
            $('#mmAttacks').append("<property-block> <h4>Mucus Construction (Recharge long rest).</h4><p> The " + creatureName  + " pukes mucus which instantly hardens, creating " +
            " a barrier half as tall as they are. This barrier provides half cover. The " + creatureName + " can use this trait three times before it needs to be " +
            "recharged.</p></property-block>");

            returnString += "The " + creatureName + " makes constant noises as though its throat, lungs, and entire respitory system is filled with mucus.";
            break;
        case 61:
        case 62:
            $('#mmAttacks').append("<property-block> <h4>Chronal Clone (Recharge long rest).</h4><p> The " + creatureName  + " pulls a copy of itself from an earlier time. " +
            "The clone counts as an exact duplicate as this creature at full hit points, and without the Chronal Clone trait.</p></property-block>");

            returnString += "The " + creatureName + " movements seem to echo themselves, as though each action the creature takes has been run through a dozen iterations until they found the right move to take.";
        case 63:
        case 64:
             $('#mmAbilities').append("<property-block> <h4>Displacement.</h4><p> Whenever a creature rolls a weapon attack targeting the " + creatureName  + ", they must roll 1d20." +
             " On a 11+, the attack targets a different random creature within the attacker's reach.</p></property-block>");
            
            returnString += "The " + creatureName + " seems to be in a dozen different places all at the same time.";
            break;
        case 65:
        case 66:
            $('#mmAbilities').append("<property-block> <h4>Friendly Face.</h4><p> The first time a creature sees the " + creatureName  + ", they must roll a" +
             " DC " + DC + " Wisdom saving throw, or become Charmed by the " + creatureName + ", seeing them as a close friend." +
             " This lasts until the target can no longer see the " + creatureName + " or the " + creatureName + " takes a hostile action against" + 
             " the target or its allies. Once they are no longer charmed, targets are immune to the " + creatureName + "'s Friendly Face trait.</p></property-block>");
            
            returnString += "The " + creatureName + " has a face that is implausibly trustworthy.";
            break;
        case 67:
        case 68:
        case 69:
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
            $('#mmAbilities').append("<property-block> <h4>Hive.</h4><p> The " + creatureName  + " is surrounded by a swarm of bees. Melee attacks have disadvantage" +
            " against the " + creatureName + ".</p></property-block>");
            
            returnString += "The " + creatureName + " is surrounded by bees, although they don't seem to be able to direct them.";
            break;
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
        case 80:
        case 81:        
            $('#mmAbilities').append("<property-block> <h4>Wind Aura.</h4><p> The " + creatureName  + " is surrounded by a wall of wind. Ranged attacks have disadvantage" +
            " against the " + creatureName + ".</p></property-block>");
            
            returnString += "The " + creatureName + " is surrounded by wind, which seems to be created by small holes in their limbs.";
            break;
        case 82:
        case 83:
            $('#mmAbilities').append("<property-block> <h4>Grabby.</h4><p> The " + creatureName  + " is covered in dozens of small fingers. The " + 
            creatureName + " has advantage on all grapple checks.</p></property-block>");
            
            returnString += "The " + creatureName + "'s skin is covered with small fingers, constantly wiggling.";
            break;
        case 84:
        case 85:
            $('#mmAbilities').append("<property-block> <h4>Unstable Phase Shifting.</h4><p> At the start of its turn, the " + creatureName  + " becomes incorporeal if it isn't already. " + 
            "If it is, it stops being incorporeal. While incorporeal, the " + creatureName + " can move through other creatures and objects as though they were difficult terrain." +
            " It takes 5 (1d10) force damage if it ends it's turn in an object.</p></property-block>");
            
            returnString += "The " + creatureName + " rapidly switches between opaque and translucent, a bridge between life and death.";
            break;
        case 86:
        case 87:         
            $('#mmAbilities').append("<property-block> <h4>Unhinge Jaw.</h4><p> At the start of its turn, if the " + creatureName  + " is grappling another creature that is no larger than. " + 
            " one size category smaller than itself, it holds the target in it's mouth. The creature is still grappled, but the " + creatureName + " doesn't count as being in a grapple .</p></property-block>");
            
            returnString += "The " + creatureName + " has a distended neck, nearly a pouch, that swells with each breath they take.";
            break;
        case 88:
        case 89:
            $('#mmAttack').append("<property-block> <h4>Blood Pet.</h4><p> The " + creatureName  + " vomits a pool of blood into an unoccupied space within 5 feet. " + 
            " It can telepathically control this blood as though it were an ooze. It sees using their own senses and those of the ooze." +
            " The ooze is small sized, has truesight to 20 feet, an AC of 7, 10 hit points," +
            " and a climb speed of 30 feet. It possesses no attacks and can move through a space no larger than 1 inch without squeezing." +
            " If the " + creatureName + " uses this trait while an ooze is active, the existing ooze dies and becomes a large clot.</p></property-block>");
            
            returnString += "The " + creatureName + " has thick clotted blood along most of it's orifices, slowly dripping down the rest of their body.";
            break;
        default:            
            $('#mmAbilities').append("<property-block> <h4>Shapechanger.</h4><p> The " + creatureName  + " can use its action to Polymorph into a humanoid it has seen of small or medium size, or back to its true form. " + 
            "Its statistics, other than tis size, ar the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts" +
            " to its true form if it dies.</p></property-block>");
            
            returnString += "The " + creatureName + "'s muscles twitch and bulge, as though preparing for immediate action.";
            break;
    }
    return returnString;
}

function HitPoints(){
    var targetHP = mmCRValues[creaturecr][5];
    var currentHP = 0;
    var lastValue = 1000;
    var currentMultiplier = 0;
    var dieSize = 8;
    var conMod = parseInt((creatureStats[2].bonus()))

    if (outputSize == "Large") {dieSize = 10;}
    if (outputSize == "Small") {dieSize = 6;}
    
    while (currentHP < targetHP){
        currentMultiplier++;        
        currentHP = (currentMultiplier * ((dieSize / 2) + 0.5)) + (currentMultiplier * conMod);        
        console.log("TARGET: " + targetHP + " | " + currentHP + " " + currentMultiplier + " " + dieSize + " (" + ((dieSize / 2) + 0.5) + ") " + conMod);
    }

    returnstring = parseInt(currentHP);
    returnstring = returnstring + " (" + currentMultiplier + "d" + dieSize;
    if (conMod != 0) {returnstring = returnstring +  " + "  + (conMod * currentMultiplier)};    
    returnstring = returnstring + ")";
    return returnstring;
}