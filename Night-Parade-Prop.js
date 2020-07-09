var npSize = [ "Small", "Small", "Medium", "Medium", "Medium", "Large" ];
var npFeatures = [ "horns on head", "fangs or tusks", "oversized, pointed ears", "solid-colored eyes", "animal eyes", "furry/hairless body", "spinal ridges", "covered in feathers", "non-prehensile tail", "covered in scales", "clawed hands", "amorphous body", "unusually powerful smell", "extra set of smaller arms", "centaur-like body shape", "insect-like chitinous carapace", "multiple unified voices", "an extra head or face" ];
var npLocomotion = [ "swims", "walks", "walks", "walks", "walks", "walks", "oozes", "flies", "multiple", "multiple"];
var npSkinThickness = [ "normal", "thick", "waxy", "woody", "stoney", "metallic" ];
var npAttackForm = [ "claws", "claws", "claws", "bite", "bite", "bite", "tentacle", "tentacle", "tentacle", "extra arm/leg", "extra arm/leg", "multiple" ];
var npSkinPattern = [ "alternating stripes", "back of one color, softer color on the belly", "solid color", "head and limbs one color, body is another", "one color during the day, another color at night", "translucent, fading to opaque tones at the end of limbs", "randomly colored", "delicate coloration mixing two colors", "three colors banding alternately around the body", "iridescently glowing with a ever shifting light"];
var npSkinColors = [ "red", "orange", "yellow", "green", "blue", "indigo", "purple", "white", "black", "natural color of their race"];
var npSavingThrows = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
var npDamageTypes = [ "cold", "poison", "acid", "psychic", "fire", "necrotic", "radiant", "force", "thunder", "lightning"];

$(document).ready(function(){  
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
  $("#DivContent").load("StatBlocks/acolyte.mm"); 
  $('#mmSize').append(outputSize);
});
