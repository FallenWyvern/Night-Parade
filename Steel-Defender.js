var profMod = 2;
var intMod = 0;
var level =  1;

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
 
 var creatureStats = [];
 var creatureCR = 0;
 var race_modifiers = [0, 0, 0, 0, 0, 0];

function DoTheThing(){
    intMod = parseInt($('#spinner2').spinner("value"));
    level =  parseInt($('#spinner').spinner("value")); 
    profMod = 2 + (parseInt(level / 4));
    
    $("#DivContent").load("StatBlocks/steel_defender.mm", function(){
        $('#mmHP').text(HitPoints());
        $('#mmCR').text("--; Proficiency: +" + profMod);
        $('#mmSenses').text("darkvision 60 ft., passive Perception +" + (profMod * 2));
        $('#mmSkills').append("Athletics +" + (2 + profMod) + ", Perception +" + (2 * profMod));
        $('#mmSaves').append("Dex +" + (1 + profMod) + ", Con +" + (2 + profMod));
        $('#mmAttacks').append("<property-block><h4>Force-Empowered Rend. </h4><p><i>Melee Weapon Attack:</i>+" + (profMod + intMod) +" to hit, reach 5 ft., one target you can see. <i>Hit:</i> 1d8 + " + profMod + " force damage.</p></property-block>");        
        $('#mmAttacks').append("<property-block> <h4>Repair (3/Day). </h4><p>The magical mechanisms inside the defender restore 2d8 + " + profMod + " hit points to itself or to one construct or object within 5 feet of it.</p></property-block>");

        if (level < 15){
            $('#mmReactions').append("<property-block><h4>Deflect Attack. </h4><p>The defender imposes disadvantage on the attack roll of one creature it can see that is within 5 feet of it, provided the attack roll is against a creature other than the defender.</p></property-block>");
        } else {
            $('#mmAC').text("17 (natural armor)");
            $('#mmReactions').append("<property-block><h4>Deflect Attack. </h4><p>The defender imposes disadvantage on the attack roll of one creature it can see that is within 5 feet of it, provided the attack roll is against a creature other than the defender. The attacking creature takes 1d4 + " + intMod + " force damage.</p></property-block>");
        }
    });
}

function HitPoints(){
    var targetHP = 2 + intMod + (5 * level);
    
    returnstring = targetHP;
    returnstring = returnstring + " (" + level + "d8";
    returnstring = returnstring +  " + "  + (2 * level);    
    returnstring = returnstring + ")";
    return returnstring;
}
