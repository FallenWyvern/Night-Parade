function HalfDragon(){   
    if (raceSenses.length > 0){
        if (!raceSenses.includes("darkvision")){raceSenses += ", darkvision 60ft."}
        if (!raceSenses.includes("blindsight")){raceSenses += ", blindsight 10ft."}
    } else {
        raceSenses += "blindsight 10ft., darkvision 60ft."
    }
    color = ["black", "copper", "blue", "bronze", "brass", "gold", "red", "green", "silver", "white"];
    dragonHalf = color[Math.floor(Math.random() * color.length)].trim();    
    element = BreathDamageType();
    HDname = "Half-" + dragonHalf +  " dragon " + $('#mmName').text();

    raceAbility += "<property-block> <h4>Damage Resistance. </h4><p>The " + HDname + " has resistance to " + element + " damage.</p></property-block>";
    
    raceAttack = "";
    switch (dragonHalf){
        case "black":
            raceAttack += "<property-block> <h4>Acid Breath (Recharge 5-6). </h4> "
            raceAttack += "<p>The " + HDname + " exhales acid in a 15-­foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 22 (5d8) acid damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            break;
        case "copper":
            raceAttack += "<property-block> <h4>Breath Weapons (Recharge 5-6).</h4><p>The " + HDname + " uses one of the following breath weapons.</p></property-block>"
            raceAttack += "<property-block> <h4>Acid Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales acid in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 18 (4d8) acid damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            raceAttack += "<property-block> <h4>Slowing Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales acid in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 18 (4d8) acid damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            break;
        case "blue":
            raceAttack += "<property-block> <h4>Lightning Breath (Recharge 5-6). </h4> "
            raceAttack += "<p>The " + HDname + " exhales lightning in a 30-­foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 22 (4d10) lightning damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            break;
        case "bronze":        
            raceAttack += "<property-block> <h4>Breath Weapons (Recharge 5-6).</h4><p>The " + HDname + " uses one of the following breath weapons.</p></property-block>"
            raceAttack += "<property-block> <h4>Lightning Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales lightning in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 16 (3d10) lightning damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            raceAttack += "<property-block> <h4>Repulsion Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 12 Strength saving throw. On a failed save, the creature is pushed 30 feet away from the dragon.</p></property-block>";            
            break;
        case "brass":
            raceAttack += "<property-block> <h4>Breath Weapons (Recharge 5-6).</h4><p>The " + HDname + " uses one of the following breath weapons.</p></property-block>"
            raceAttack += "<property-block> <h4>Fire Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales fire in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 14 (4d6) fire damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            raceAttack += "<property-block> <h4>Sleep Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales sleep gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw or fall unconscious for 1 minute. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.</p></property-block>";            
            break;
        case "gold":
            raceAttack += "<property-block> <h4>Breath Weapons (Recharge 5-6).</h4><p>The " + HDname + " uses one of the following breath weapons.</p></property-block>"
            raceAttack += "<property-block> <h4>Fire Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales fire in a 15-foot cone. Each creature in that area must make a DC 13 Dexterity saving throw, taking 22 (4d10) fire damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            raceAttack += "<property-block> <h4>Weakening Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales gas in a 15-foot cone. Each creature in that area must succeed on a DC 13 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.</p></property-block>";            
            break;
        case "red":
            raceAttack += "<property-block> <h4>Fire Breath (Recharge 5-6). </h4> "
            raceAttack += "<p>The " + HDname + " exhales fire in a 15-foot cone. Each creature in that area must make a DC 13 Dexterity saving throw, taking 24 (7d6) fire damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            break;
        case "green":
            raceAttack += "<property-block> <h4>Poison Breath (Recharge 5-6). </h4> "
            raceAttack += "<p>The " + HDname + " exhales poisonous gas in a 15-foot cone. Each creature in that area must make a DC 11 Constitution saving throw, taking 21 (6d6) poison damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            break;
        case "silver":
            raceAttack += "<property-block> <h4>Breath Weapons (Recharge 5-6).</h4><p>The " + HDname + " uses one of the following breath weapons.</p></property-block>"
            raceAttack += "<property-block> <h4>Cold Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales an icy blast in a 15-foot cone. Each creature in that area must make a DC 13 Constitution saving throw, taking 18 (4d8) cold damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            raceAttack += "<property-block> <h4>Paralyzing Breath. </h4> "
            raceAttack += "<p>The " + HDname + " exhales paralyzing gas in a 15-foot cone. Each creature in that area must succeed on a DC 13 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.</p></property-block>";            
            break;
        case "white":
            raceAttack += "<property-block> <h4>Cold Breath (Recharge 5-6). </h4> "
            raceAttack += "<p>The " + HDname + " exhales an icy blast of hail in a 15-foot cone. Each creature in that area must make a DC 12 Constitution saving throw, taking 22 (5d8) cold damage on a failed save, or half as much damage on a successful one.</p></property-block>";            
            break;        
        break;
    }

    raceAttacks += raceAttack;
    // race = "Half-" + dragonHalf +  " dragon " + race;
    // racePlural = "Half-" + dragonHalf +  " dragon " + racePlural;
    $('#mmName').text(HDname);    

}

function BreathDamageType(){
    switch (dragonHalf){
        case "black":
        case "copper":
            return "acid";
        case "blue":
        case "bronze":
            return "lightning";
        case "brass":
        case "red":
        case "gold":
            return "fire";
        case "green":
            return "poison";
        case "silver":
        case "white":
            return "cold";
    }
}

function HalfDragonCRUpdate(){    
    if (parseFloat(creatureCR) < 2){
        creatureCR = 2;
    }
}