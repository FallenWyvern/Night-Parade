var npSize = [ "Small", "Small", "Medium", "Medium", "Medium", "Large" ];
var npFeatures = [ "horns on head", "fangs or tusks", "oversized, pointed ears", "solid-colored eyes", "animal eyes", "a furry or hairless body", "spinal ridges", "feathered skin", "a non-prehensile tail", "scaled skin", "clawed hands", "an amorphous body", "an unusually powerful smell", "an extra set of smaller arms", "a centaur-like body shape", "an insect-like chitinous carapace", "multiple unified voices", "an extra head or face" ];
var npLocomotion = [ "swimming", "walking", "walking", "walking", "walking", "walking", "oozing", "flying", "multiple", "multiple"];
var npSkinThickness = [ "normal", "thick", "waxy", "woody", "stoney", "metallic" ];
var npAttackForm = [ "claws", "claws", "claws", "bite", "bite", "bite", "tentacle", "tentacle", "tentacle", "extra arm/leg", "extra arm/leg", "multiple" ];
var npSkinPattern = [ "alternating stripes", "back of one color, softer color on the belly", "solid color", "head and limbs one color, body is another", "one color during the day, another color at night", "translucent, fading to opaque tones at the end of limbs", "randomly colored", "delicate coloration mixing two colors", "three colors banding alternately around the body", "iridescently glowing with a ever shifting light"];
var npSkinColors = [ "red", "orange", "yellow", "green", "blue", "indigo", "purple", "white", "black", "natural color of their race"];
var npSavingThrows = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
var npDamageTypes = [ "cold", "poison", "acid", "psychic", "fire", "necrotic", "radiant", "force", "thunder", "lightning"];
var creatureName = "Night Parade ";
var creatureBaseSpeed = 0;
var outputSize = "";

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
    creatureName = $('#mmName').text();    
    creatureBaseSpeed = parseInt($('#mmBaseSpeed').text());

    outputSize = npSize[Math.floor(Math.random() * npSize.length)];  
    
    var outputFeatures = npFeatures[Math.floor(Math.random() * npFeatures.length)];
    //outputString += npSkinThickness[Math.floor(Math.random() * npSkinThickness.length)];
    //outputString += npAttackForm[Math.floor(Math.random() * npAttackForm.length)];
    //outputString += npSkinPattern[Math.floor(Math.random() * npSkinPattern.length)];
    //outputString += npSkinColors[Math.floor(Math.random() * npSkinColors.length)];
    //outputString += npSavingThrows[Math.floor(Math.random() * npSavingThrows.length)];
    //outputString += npDamageTypes[Math.floor(Math.random() * npDamageTypes.length)];
    
    $('#test').append(Features());          
  });   
};

function Features(){
    var returnString = FeaturesCause();
    returnString += "this member of the night parade has ";
    returnString += npFeatures[Math.floor(Math.random() * npFeatures.length)];
    returnString += ". It moves by " + Locomotion() + ". ";
    returnString += Abilities();
    return returnString;
}

function Abilities(){
    var returnString = "";
    
    if (outputSize == "Small"){
        $('#mmAbilities').append("<property-block> <h4>Small Build.</h4> <p>The " + creatureName + 
        " is smaller than others of it's kind. It has disadvantage on Strength ability checks and saving throws.</p> </property-block>");
        // $('#mmStats').childNodes[0].attr("data-str") = ($('#mmStats').attr("data-str") - 2);
    };

    if (outputSize == "Large"){
        $('#mmAbilities').append("<property-block>  <h4>Large Build.</h4> <p>The " + creatureName + 
        " is larger than others of it's kind. It has advantage on Strength ability checks and saving throws.</p> </property-block>");
        // $('#mmStats').childNodes[0].attr("data-str") = ($('#mmStats').attr("data-str") + 2);
    }; 
    
    return returnString;
}

function Locomotion(){
    var returnString = "walking";
    var walking = true;
    var flying = false;
    var swimming = false;
    var oozing = false;

    var list = LocomotionList(); 

    list.forEach((element) => {                 
        if (element == "walking") { creatureBaseSpeed += 10; $('#mmBaseSpeed').text(creatureBaseSpeed);}
    });

    list.forEach((element) => {
        console.log(element)            
        if (element == "flying") {             
            if (flying){
                $('#mmSpeed').text().replace(", fly " + creatureBaseSpeed + " ft.,", ", fly " + creatureBaseSpeed + " ft. (hover)");
            } else {
                $('#mmSpeed').append(", fly " + creatureBaseSpeed + " ft.");
            }        

            flying = true;               
        }
    });

    list.forEach((element) => {
        console.log(element)            
        if (element == "swimming") {             
            if (swimming){
                if (!$('#mmAbilities').text().includes("Amphibious")){
                    $('#mmAbilities').append("<property-block> <h4>Amphibious.</h4> <p>The " + creatureName + 
                    " can breathe air and water.</p> </property-block>");  
                }
            } else {
                $('#mmSpeed').append(", swimming " + creatureBaseSpeed + " ft.");
            }        

            swimming = true;               
        }
    });

        list.forEach((element) => {
        console.log(element)            
        if (element == "oozing") {             
            if (oozing){
                if (!$('#mmAbilities').text().includes("Amorphous")){
                    $('#mmAbilities').append("<property-block> <h4>Amorphous.</h4> <p>The " + creatureName + 
                    " can move through a space as narrow as 1 inch wide without squeezing.</p> </property-block>");  
                }
            } else {
                $('#mmSpeed').append(", climb " + creatureBaseSpeed + " ft.");
                if (!$('#mmAbilities').text().includes("Spider Climb")){
                    $('#mmAbilities').append("<property-block> <h4>Spider Climb.</h4> <p>The " + creatureName + 
                    " can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.</p> </property-block>");  
                }
            }        

            oozing = true;               
        }
    });
    
    if (flying) {returnString += " and flying"; }
    if (swimming) {returnString += " and swimming"; }
    if (oozing) {returnString += " and oozing"; }
    return returnString;
}

function LocomotionList(){    
    var listofspeeds = [];
    var temp = "";
    temp = npLocomotion[Math.floor(Math.random() * npLocomotion.length)];    
    
    if (temp == "multiple"){
        var move1 = Locomotion();
        var move2 = Locomotion();
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
        "Cursed by " + NightmareCourt() + " of the Nightmare Court, "
    ];

    return causes[Math.floor(Math.random() * causes.length)];
}

function NightmareCourt(){
    var courtMembers = [
        "The Nightmare Man", "Hypnos", "Mullonga", "The Ghost Dancer", "Morpheus", "The Rainbow Serpent"
    ];

    return courtMembers[Math.floor(Math.random() * courtMembers.length)];
}