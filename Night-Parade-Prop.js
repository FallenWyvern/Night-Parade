var npSize = [ "small", "small", "medium", "medium", "medium", "large" ];
var npFeatures = [ "horns on head", "fangs or tusks", "oversized, pointed ears", "solid-colored eyes", "animal eyes", "furry/hairless body", "spinal ridges", "covered in feathers", "non-prehensile tail", "covered in scales", "clawed hands", "amorphous body", "unusually powerful smell", "extra set of smaller arms", "centaur-like body shape", "insect-like chitinous carapace", "multiple unified voices", "an extra head or face" ];
var npLocomotion = [ "swims", "walks", "walks", "walks", "walks", "walks", "oozes", "flies", "multiple", "multiple"];
var npSkinThickness = [ "normal", "thick", "waxy", "woody", "stoney", "metallic" ];
var npAttackForm = [ "claws", "claws", "claws", "bite", "bite", "bite", "tentacle", "tentacle", "tentacle", "extra arm/leg", "extra arm/leg", "multiple" ];
var npSkinPattern = [ "alternating stripes", "back of one color, softer color on the belly", "solid color", "head and limbs one color, body is another", "one color during the day, another color at night", "translucent, fading to opaque tones at the end of limbs", "randomly colored", "delicate coloration mixing two colors", "three colors banding alternately around the body", "iridescently glowing with a ever shifting light"];
var npSkinColors = [ "red", "orange", "yellow", "green", "blue", "indigo", "purple", "white", "black", "natural color of their race"];
var npSavingThrows = [ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charism"];
var npDamageTypes = [ "cold", "poison", "acid", "psychic", "fire", "necrotic", "radiant", "force", "thunder", "lightning"];

$(document).ready(function(){
  var outputString = "";
  outputString += npSize[Math.floor(Math.random() * npSize.length)] + '\r\n';
  outputString += npFeatures[Math.floor(Math.random() * npFeatures.length)]+ '\r\n';
  outputString += npLocomotion[Math.floor(Math.random() * npLocomotion.length)]+ '\r\n';
  outputString += npSkinThickness[Math.floor(Math.random() * npSkinThickness.length)]+ '\r\n';
  outputString += npAttackForm[Math.floor(Math.random() * npAttackForm.length)]+ '\r\n';
  outputString += npSkinPattern[Math.floor(Math.random() * npSkinPattern.length)]+ '\r\n';
  outputString += npSkinColors[Math.floor(Math.random() * npSkinColors.length)]+ '\r\n';
  outputString += npSavingThrows[Math.floor(Math.random() * npSavingThrows.length)]+ '\r\n';
  outputString += npDamageTypes[Math.floor(Math.random() * npDamageTypes.length)];
  
  $('#test').append(outputString);
});
