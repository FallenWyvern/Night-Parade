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

function CRMap(crValue){        
        switch (crValue){
            case "0":
                return 0;
            case "1/8":
                return 1;
            case "1/4":
                return 2;
            case "1/2":
                return 3;
        }
    
        return parseInt(crValue + 3);
}

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

function mmCRIndex(index){
    var count = 0;
    Object.keys(mmCRValues).forEach(function (key){
        console.log("FOUND: " + mmCRValues[key]);
        if (count == index){            
            //break;
            console.log("STOP");
        }
        count ++;                
    });    
};

function DoTheThing(){  
  $("#DivContent").load("StatBlocks/acolyte.mm", function() {
    /* When load is done */    
    creatureName += $('#mmName').text(); 
    creatureRace += $('#mmRace').text(); 
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
    
    creatureSpecialAbilityCount = numberOfSpecials();
    console.log("CR:" + creaturecr + " | Abilities: " + creatureSpecialAbilityCount);

    creatureBaseSpeed = parseInt($('#mmBaseSpeed').text());
    outputSize = npSize[Math.floor(Math.random() * npSize.length)];  
    
    MutatedAttacks();
    SavingThrows();            

    $('#test').append(Features());  
  });   
};

function Features(){
    var returnString = FeaturesCause();
    returnString += "this member of the night parade has ";
    returnString += npFeatures[Math.floor(Math.random() * npFeatures.length)];
    returnString += Abilities() + ". They move by " + Locomotion() + ". ";    
    returnString += SkinType() + "</br>";
    returnString += bigFeatures();
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
            statPlus = (parseInt(creatureStats[0].bonus()) + parseInt(mmCRValues[creatureCR][0]));
            break;
        case "dexterity":
            statPlus = (parseInt(creatureStats[1].bonus()) + parseInt(mmCRValues[creatureCR][0]));
            break;
        case "constitution":
            statPlus = (parseInt(creatureStats[2].bonus()) + parseInt(mmCRValues[creatureCR][0]));
            break;
        case "intelligence":
            statPlus = (parseInt(creatureStats[3].bonus()) + parseInt(mmCRValues[creatureCR][0]));
            break;
        case "wisdom":
            statPlus = (parseInt(creatureStats[4].bonus()) + parseInt(mmCRValues[creatureCR][0]));
            break;
        case "charisma":
            statPlus = (parseInt(creatureStats[5].bonus()) + parseInt(mmCRValues[creatureCR][0]));
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
        $('#mmAbilities').append("<property-block> <h4>Small Build.</h4> <p>The " + creatureName + 
        " is smaller than others of it's kind. It has disadvantage on Strength ability checks and saving throws.</p> </property-block>");

        returnString += ", and are smaller than most " + creatureRace.toLowerCase() + "s";
    };

    if (outputSize == "Large"){
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
        var statWithProf = (parseInt(creatureStats[0].bonus()) + parseInt(mmCRValues[creatureCR][0]));
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
    return Math.floor(parseInt(this / 2) - 5) + parseInt(mmCRValues[creatureCR][0]);
}

function bigFeatures(){
    var randomFeature = Math.floor(Math.random() * 100) + 1;
    var DC = 10 + parseInt((creatureStats[5].bonus()));
    var returnString = "";

    randomFeature = 30;
    // $('#mmAttacks').append("<property-block> <h4>NAME.</h4> <p>The " + creatureName + "</p></property-block>")
    // $('#mmAbilities').append("<property-block> <h4>NAME.</h4> <p>The " + creatureName + "</p></property-block>");

    switch (randomFeature){
        case 1: 
        case 2:
        case 3:
        case 4:
            $('#mmAbilities').append("<property-block> <h4>Pustule Hide.</h4><p>At the end of each of its turns, if the " + creatureName  + " can see a hostile creature, " +
            "acid filled pustules on its skin inflate and burst. This casts <i>acid splash</i> on all valid targets for the spell (using no action)." +
            " The save DC for this effect is " + DC + ".</p></property-block>");
            break;
        case 5:
        case 6:
            $('#mmAbilities').append("<property-block> <h4>Reactionary Camouflage.</h4><p> If the  " + creatureName  + " takes damage, " +
            "as a reaction it turns invisible. This lasts until the " + creatureName + " makes an attack or casts a spell.</p></property-block>");
            break;
        case 7:
        case 8:
            $('#mmAbilities').append("<property-block> <h4>Magic Resistance.</h4><p>The " + creatureName  + " has advantage on saving throws against spells.</p></property-block>");
            break;
        case 9:
        case 10:            
            $('#mmAbilities').append("<property-block> <h4>Constant Laughter.</h4><p>The first time a creature sees the " + creatureName  + ", they are affected by the <i>tasha's hideous laughter</i> spell." +
            " The saving throw DC for this spell is " + DC + ".</p></property-block>");
            break;
        case 11:
        case 12:
            $('#mmAttacks').append("<property-block> <h4>Control Weather (Recharge short or long rest).</h4><p>The " + creatureName  + " can cast <i>control weather</i> " +
            "without using a spell slot or material components.</p></property-block>");
            break;
        case 13:
        case 14:
            $('#mmAttacks').append("<property-block> <h4>Call Lightning (Recharge short or long rest).</h4><p>The " + creatureName  + " can cast <i>call lightning</i> " +
            "without using a spell slot or material components. The saving throw DC for this spell is " + DC + ".</p></property-block>");
            break;
        case 15:
        case 16:
            $('#mmAbilities').append("<property-block> <h4>Corrosive Hide.</h4><p>When non-magical metal objects strike the  " + creatureName  + ", " +
            " they turn to rust at the end of the current turn.</p></property-block>");
            
            $('#mmAttacks').append("<property-block> <h4>Rusting Touch.</h4> <p> <i>Melee Weapon Attack: </i>+" + creatureStats[0].bonusplus() + " to hit, reach 5 ft., one target. " +
            "<i>Hit:</i> One non-magical metallic object worn or carried by the target crumbles to rust.</p></property-block>");            
            break;
        case 17:
        case 18:
            $('#mmAbilities').append("<property-block> <h4>Poisoned Hide.</h4><p>Any creature striking the " + creatureName  + " with a melee attack becomes " +
            " poisoned and takes 1d8 poison damage.</p></property-block>");
            break;
        case 19:
        case 20:
            $('#mmAttacks').append("<property-block> <h4>Shape Rock (Recharge short or long rest).</h4><p>The " + creatureName  + " can cast <i>transmute rock</i> " +
            "without using a spell slot or material components.</p></property-block>");
            break;
        case 21:
        case 22:
            $('#mmAbilities').append("<property-block> <h4>Cloud Kill Immunity.</h4><p> The " + creatureName  + " is immune to the <i>cloudkill</i> spell.</p></property-block>");

            $('#mmAttacks').append("<property-block> <h4>Death Cloud (Recharge long rest).</h4><p>The " + creatureName  + " can cast <i>cloudkill</i> " +
            "without using a spell slot or material components. The spell stays centered on the " + creatureName + " and the saving throw for this " +
            " effect is " + DC + ".</p></property-block>");
            break;
        case 23:
        case 24:
            $('#mmAttacks').append("<property-block> <h4>Screeching Hide.</h4><p> As a bonus action, an extra mouth appears on the  " + creatureName  + " which begins to scream." +
            "Any being within 30 feet who can hear the scream must succeed on a " + DC + " Wisdom saving throw or become stunned until the end of their next turn.</p></property-block>");
            break;
        case 25:
        case 26:
            $('#mmAttacks').append("<property-block> <h4>Fire Belch (Recharge 5-6).</h4><p>As a bonus action, the " + creatureName  + " can cast <i>burning hands</i>. " +
            "This effect is considered non-magical and the saving throw for this effect is " + DC + ".</p></property-block>");
            break;
        case 27:
        case 28:
            $('#mmAttacks').append("<property-block> <h4>Mistform (Recharge long rest).</h4><p>The " + creatureName  + " can cast <i>gaseous form</i>. " +
            "The " + creatureName + " can use this trait three times before it needs to be recharged.</p></property-block>");
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
            break;
    }
    return returnString;
}