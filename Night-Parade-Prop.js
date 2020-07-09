var npSize = [ "Small", "Small", "Medium", "Medium", "Medium", "Large" ];
var npFeatures = [ "horns on head", "fangs or tusks", "oversized, pointed ears", "solid-colored eyes", "animal eyes", "furry/hairless body", "spinal ridges", "covered in feathers", "non-prehensile tail", "covered in scales", "clawed hands", "amorphous body", "unusually powerful smell", "extra set of smaller arms", "centaur-like body shape", "insect-like chitinous carapace", "multiple unified voices", "an extra head or face" ];
var npLocomotion = [ "swims", "walks", "walks", "walks", "walks", "walks", "oozes", "flies", "multiple", "multiple"];
var npSkinThickness = [ "normal", "thick", "waxy", "woody", "stoney", "metallic" ];
var npAttackForm = [ "claws", "claws", "claws", "bite", "bite", "bite", "tentacle", "tentacle", "tentacle", "extra arm/leg", "extra arm/leg", "multiple" ];
var npSkinPattern = [ "alternating stripes", "back of one color, softer color on the belly", "solid color", "head and limbs one color, body is another", "one color during the day, another color at night", "translucent, fading to opaque tones at the end of limbs", "randomly colored", "delicate coloration mixing two colors", "three colors banding alternately around the body", "iridescently glowing with a ever shifting light"];
var npSkinColors = [ "red", "orange", "yellow", "green", "blue", "indigo", "purple", "white", "black", "natural color of their race"];
var npSavingThrows = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
var npDamageTypes = [ "cold", "poison", "acid", "psychic", "fire", "necrotic", "radiant", "force", "thunder", "lightning"];
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

$(document).ready(function(){  
  $("#DivContent").load("StatBlocks/acolyte.mm", function() {
    /* When load is done */
    var outputString = "";
    var outputSize = npSize[Math.floor(Math.random() * npSize.length)];  
    outputString += outputSize + '</br>';

    outputString += npFeatures[Math.floor(Math.random() * npFeatures.length)]+ '</br>';
    outputString += npLocomotion[Math.floor(Math.random() * npLocomotion.length)]+ '</br>';
    outputString += npSkinThickness[Math.floor(Math.random() * npSkinThickness.length)]+ '</br>';
    outputString += npAttackForm[Math.floor(Math.random() * npAttackForm.length)]+ '</br>';
    outputString += npSkinPattern[Math.floor(Math.random() * npSkinPattern.length)]+ '</br>';
    outputString += npSkinColors[Math.floor(Math.random() * npSkinColors.length)]+ '</br>';
    outputString += npSavingThrows[Math.floor(Math.random() * npSavingThrows.length)]+ '</br>';
    outputString += npDamageTypes[Math.floor(Math.random() * npDamageTypes.length)];
    
    $('#test').append(outputString);  
    $('#mmSize').text(outputSize);    
  });   
});
