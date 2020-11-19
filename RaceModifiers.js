var race_modifiers = [0, 0, 0, 0, 0, 0];
var race = "";
var racePlural = "";
var raceBaseSpeed = "30";
var raceSpeed = "";
var raceLanguage = "";
var raceAbility = "";
var raceAttacks = "";
var raceSenses = "";
var raceSkills = "";
var raceSize = "Medium";
var conditionImmune = "";
var damageImmune = "";
var damageResist = "";
var damageVul = "";
var raceACBonus = 0;

var race_stats = []

function modifyResults(){    
    race = $("#raceBlock option:selected").text().toLowerCase();
    race_stats = $('#mmStats').first().children().data();

    switch(race) {        
        case "aarakocra":                 
            race_modifiers[0] = 0;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 2;
            race_modifiers[5] = 0;
            racePlural = "aarakrocra";
            baseSpeed = "20";
            raceSpeed = "fly 50 ft."
            raceLanguage = "Auran";
            raceSize = "Medium";
            raceSenses = "";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";

            raceAbility = "<property-block> <h4>Dive Attack. </h4><p>If the aarakocra is flying and dives at least 30 feet straight toward a target and then hits it with a melee weapon attack, the attack deals an extra 3 (1d6) damage to the target.</p></property-block>";            
            raceAttacks = "<property-block> <h4>Talon. </h4><p><i>Melee Weapon Attack:</i> _DEXP_ to hit, reach 5 ft., one target. <i>Hit:</i> 1d4 + _DEX_ slashing damage.</p></property-block>";                        
            break;
        case "bullywug":                 
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = -2;
            race_modifiers[4] = 0;
            race_modifiers[5] = -2;
            racePlural = "bullywugs";
            baseSpeed = "20";
            raceSpeed = "swim 40 ft."
            raceLanguage = "Bullywug";  
             raceSize = "Medium";
            raceSenses = "";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";

            raceAbility = "<property-block> <h4>Amphibious. </h4> <p>The bullywug can breathe air and water.</p> </property-block>";
            raceAbility += "<property-block> <h4>Speak with Frogs and Toads. </h4> <p>The bullywug can communicate simple concepts to frogs and toads when it speaks in Bullywug.</p> </property-block>";             
            raceAbility += "<property-block> <h4>Swamp Camouflage. </h4> <p>The bullywug has advantage on Dexterity (Stealth) checks made to hide in swampy terrain.</p> </property-block>";                          
            raceAbility += "<property-block> <h4>Standing Leap. </h4> <p>The bullywug’s long jump is up to 20 feet and its high jump is up to 10 feet, with or without a running start.</p> </property-block>";                                      
            raceAttacks = "";
            break;
        case "dragonborn":
            var ancestry = ["black", "blue", "brass", "bronze", "copper", "gold", "green", "red", "silver", "white"];
            var damage  = ["acid", "lightning", "fire", "lightning", "acid", "fire", "poison", "fire", "cold", "cold"];
            var ancestryIndex = [Math.floor(Math.random() * ancestry.length)];

            race_modifiers[0] = 2;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 1;
            racePlural = "dragonborn";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Draconic";
            raceSize = "Medium";
            raceSenses = "";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";

            raceAbility += "<property-block> <h4>Damage Resistance. </h4><p>The dragonborn has resistance to " + damage[ancestryIndex] + " damage.</p></property-block>";
            
            switch (ancestry[ancestryIndex]){
                case "black":
                case "blue":
                case "brass":
                case "copper":
                    raceAttacks = "<property-block> <h4>Breath Weapon. </h4> <p>The dragonborn can use their action to exhale a 5-foot-wide, 30-foot line of " + damage[ancestryIndex] + " (but can't do this again until they finish a short or long rest); each creature in the line must make a DC _CONDC_ Dexterity saving throw, taking _DRAGONBORNBREATH_ " + damage[ancestryIndex] + " damage on a failed save or half as much on a successful one.</p></property-block>";            
                break;       
                case "gold":
                case "red":
                    raceAttacks = "<property-block> <h4>Breath Weapon. </h4> <p>The dragonborn can use their action to exhale a 15-foot cone of " + damage[ancestryIndex] + " (but can't do this again until they finish a short or long rest); each creature in the line must make a DC _CONDC_ Dexterity saving throw, taking _DRAGONBORNBREATH_ " + damage[ancestryIndex] + " damage on a failed save or half as much on a successful one.</p></property-block>";            
                    break;         
                default:            
                    raceAttacks = "<property-block> <h4>Breath Weapon. </h4> <p>The dragonborn can use their action to exhale a 15-foot cone of " + damage[ancestryIndex] + " (but can't do this again until they finish a short or long rest); each creature in the line must make a DC _CONDC_ Constitution saving throw, taking _DRAGONBORNBREATH_ " + damage[ancestryIndex] + " damage on a failed save or half as much on a successful one.</p></property-block>";            
                break;
            }
            break;
        case "drow":
            race_modifiers[0] = 0;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 1;
            racePlural = "drow elves";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Elvish, Undercommon";
            raceSize = "Medium";
            raceSenses = "darkvision 120 ft.,";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";

            raceAbility = "<property-block> <h4>Sunlight Sensitivity. </h4><p>The drow has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when they, the target of their attack, or whatever they are trying to perceive is in direct sunlight.</p></property-block>";            
            raceAbility += "<property-block><h4>Fey Ancestry. </h4><p>The drow has advantage on saving throws against being charmed, and magic can’t put it to sleep.</p></property-block>";
            raceAbility += "<property-block><h4>Innate Spellcasting. </h4><p>The drow’s spellcasting ability is Charisma (spell save DC _CHADC_). It can innately cast the following spells, requiring no material components:</p><p>At will: <i>dancing lights</i></p><p>1/day each: <i>darkness, faerie fire</i></p></property-block>";            
            raceAttacks = "";
            break;
        case "dwarf" :
            if (CoinFlip()){
                race_modifiers[0] = 2; 
            } else {
                race_modifiers[4] = 2;
            }
              
            race_modifiers[1] = 0;
            race_modifiers[2] = 2;
            race_modifiers[3] = 0;            
            race_modifiers[5] = 0;
            racePlural = "dwarves";
            raceBaseSpeed = "25";
            raceSpeed = "";
            raceLanguage = "Common, Dwarvish";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft.,";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Dwarven Resilience. </h4><p>The dwarf has advantage on saving throws against poison, and resistance against poison damage.</p></property-block>";            
            raceAbility += "<property-block> <h4>Stonecunning. </h4><p>Whenever the dwarf makes an Intelligence (History) check related to the origin of stonework, they are considered proficient in the History skill and adds +_DOUBLEPROF_ to the check.</p></property-block>";            
            raceAttacks = "";
            break;
        case "elf" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
             if (CoinFlip()){
                race_modifiers[3] = 1; 
            } else {
                race_modifiers[4] = 1;
            }
            race_modifiers[5] = 0;
            racePlural = "elves";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Elvish";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft., ";
            raceSkills = "Perception +2";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility += "<property-block><h4>Fey Ancestry. </h4><p>The drow has advantage on saving throws against being charmed, and magic can’t put it to sleep.</p></property-block>";            
            raceAttacks = "";
            break;
        case "gnoll" :
            race_modifiers[0] = 2;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = -2;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "gnolls";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Gnoll";
            raceSenses = "darkvision 60 ft.,";
            raceSize = "Medium";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block><h4>Rampage. </h4><p>When the gnoll reduces a creature to 0 hit points with a melee attack on its turn, the gnoll can take a bonus action to move up to half its speed and make a bite attack.</p></property-block>";          
            raceAttacks = "";
            break;
        case "gnome" :
            race_modifiers[0] = 0;
            if (CoinFlip()){
                race_modifiers[1] = 2; 
            } else {
                race_modifiers[2] = 2;
            }               
            race_modifiers[3] = 2;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "gnomes";
            raceBaseSpeed = "25";
            raceSpeed = "";
            raceLanguage = "Common, Gnomish";
            raceSize = "Small";
            raceSenses = "darkvision 60 ft., ";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Gnome Cunning.</h4><p> The gnome has advantage on all Intelligence, Wisdom, and Charisma Saving Throws against magic.</p></property-block>";
            raceAttacks = "";
            break;
        case "deep gnome" :
            race_modifiers[0] = 1;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "deep gnomes";
            raceBaseSpeed = "20";
            raceSpeed = "";
            raceLanguage = "Gnomish, Terran, Undercommon";
            raceSize = "Small";
            raceSenses = "darkvision 120 ft., ";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";

            raceAbility = "<property-block> <h4>Gnome Cunning.</h4><p> The deep gnome has advantage on all Intelligence, Wisdom, and Charisma Saving Throws against magic.</p></property-block>";
            raceAbility += "<property-block> <h4>Stone Camouflage.</h4><p>The deep gnome has advantage on Dexterity (Stealth) checks to hide in rocky terrain.</p></property-block>";
            raceAbility += "<property-block><h4>Innate Spellcasting. </h4><p>The deep gnome’s spellcasting ability is Intelligence (spell save DC _INTDC_). It can innately cast the following spells, requiring no material components:</p><p>At will: <i>nondetection (self only)</i></p><p>1/day each: <i>blindness/deafness, blur, disguise self</i></p></property-block>";            
            raceAttacks = ""; 
            break;
        case "goblin" :
            race_modifiers[0] = -2;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "goblins";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Goblin";
            raceSize = "Small";
            raceSenses = "";
            raceSkills = "Darkvision 60 ft.,";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Nimble Escape.</h4><p>The goblin can take the Disengage or Hide action as a bonus action on each of its turns.</p></property-block>";            
            raceAttacks = "";
            break;
        case "grimlock" :
            race_modifiers[0] = 2;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = -2;
            racePlural = "grimlock";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "speaks Undercommon";
            raceSize = "Medium";
            raceSenses = "Blindsight 30 Ft. Or 10 Ft. While Deafened (Blind Beyond This Radius)";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Blind Senses. </h4><p>The grimlock can't use its blindsight while deafened and unable to smell.</p></property-block>";            
            raceAbility = "<property-block> <h4>Keen Hearing and Smell. </h4><p>The grimlock has advantage on Wisdom (Perception) checks that rely on hearing or smell.</p></property-block>";
            raceAbility = "<property-block> <h4>Stone Camouflage. </h4><p>The grimlock has advantage on Dexterity (Stealth) checks made to hide in rocky terrain.</p></property-block>";      
            raceAttacks = "";
            break;
        case "half-elf" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 1;
            race_modifiers[2] = 0;
            race_modifiers[3] = 1;
            race_modifiers[4] = 0;
            race_modifiers[5] = 2;
            racePlural = "half-elves";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Elvish";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft., ";
            raceSkills = RandomProficiency() + ", " + RandomProficiency();
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block><h4>Fey Ancestry. </h4><p>The half-elf has advantage on saving throws against being charmed, and magic can’t put it to sleep.</p></property-block>";            
            raceAttacks = "";
            break;
        case "half-orc" :
            race_modifiers[0] = 2;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 1;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "half-orcs";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Orc";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft., ";
            raceSkills = "Intimidation";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Relentless Endurance.</h4><p>When the half-orc is reduced to 0 Hit Points but not killed outright, it can drop to 1 hit point instead. It can’t use this feature again until it finishes a Long Rest.</p></property-block>";            
            raceAttacks = "";
            break;
        case "halfling" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 2;            
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;            
            if (CoinFlip()){
                race_modifiers[2] = 1;
            } else {
                race_modifiers[5] = 1;
            }               
            racePlural = "halflings";
            raceBaseSpeed = "25";
            raceSpeed = "";
            raceLanguage = "Common, Halfling";
            raceSize = "Small";
            raceSenses = "";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Lucky. </h4><p>When the halfling rolls a 1 on the d20 for an attack roll, ability check, or saving throw, it can reroll the die and must use the new roll.</p></property-block>";            
            raceAbility += "<property-block> <h4>Brave. </h4><p>The halfling has advantage on saving throws against being frightened..</p></property-block>";
            raceAbility += "<property-block> <h4>Halfling Nimbleness. </h4><p>The halfling can move through the space of any creature that is of a size larger than it.</p></property-block>";
            raceAttacks = "";
            break;
        case "hobgoblin" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "hobgoblins";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Goblin";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft., ";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Martial Advantage. </h4><p>Once per turn, the hobgoblin can deal an extra 7 (2d6) damage to a creature it hits with a weapon Attack if that creature is within 5 ft. of an ally of the hobgoblin that isn't Incapacitated.</p></property-block>";
            raceAttacks = "";
            break;
        case "kenku" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "kenku";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Understands Auran and Common but can only speak using mimicry";
            raceSize = "Medium";
            raceSenses = "";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Ambusher. </h4><p>In the first round of a combat, the kenku has advantage on attack rolls against any creature it surprised..</p></property-block>";
            raceAbility = "<property-block> <h4>Mimicry. </h4><p>The kenku can mimic any sounds it has heard, including voices. A creature that hears the sounds can tell they are imitations with a successful DC 14 Wisdom (Insight) check.</p></property-block>";
            raceAttacks = "";
            break;
        case "kuo-toa" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "kuo-toa";
            raceBaseSpeed = "30";
            raceSpeed = "swim 30 ft.";
            raceLanguage = "Undercommon";
            raceSize = "Medium";
            raceSenses = "darkvision 120 ft.,";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Amphibious. </h4> <p>The kuo-toa can breathe air and water.</p> </property-block>";
            raceAbility += "<property-block> <h4>Otherworldly Perception. </h4><p>The kuo-toa can sense the presence of any creature within 30 feet of it that is invisible or on the Ethereal Plane. It can pinpoint such a creature that is moving.</p></property-block>";
            raceAbility += "<property-block> <h4>Slippery. </h4><p>The kuo-toa has advantage on ability checks and saving throws made to escape a grapple.</p></property-block>";
            raceAbility += "<property-block> <h4>Sunlight Sensitivity. </h4><p>While in sunlight, the kuo-toa has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.</p></property-block>";
            raceAttacks = "";
            break;
        case "lizardfolk" :
            race_modifiers[0] = 2;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = -2;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "lizardfolk";
            raceBaseSpeed = "30";
            raceSpeed = "swim 30 ft.";
            raceLanguage = "Draconic";
            raceSize = "Medium";
            raceSenses = "";
            raceSkills = "";
            raceACBonus = 3;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Hold Breath.</h4><p>The lizardfolk can hold its breath for 15 minutes.</p></property-block>";
            raceAttacks = "";
            break;
        case "merfolk" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "merfolk";
            raceBaseSpeed = "10";
            raceSpeed = "swim 40 ft.";
            raceLanguage = "Aquan, Common";
            raceSize = "Medium";
            raceSenses = "";
            raceSkills = "";
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Amphibious.</h4><p>The merfolk can breathe air and water.</p></property-block>";
            raceAttacks = "";
            break;
        case "orc" :
            race_modifiers[0] = 2;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = -2;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "orcs";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Orc";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft.";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Aggressive.</h4><p>As a bonus action, the orc can move up to its speed toward a hostile creature that it can see.</p></property-block>";
            raceAttacks = "";
            break;
        case "skeleton" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 2;
            race_modifiers[2] = 0;
            race_modifiers[3] = -4;
            race_modifiers[4] = 0;
            race_modifiers[5] = -4;
            racePlural = "skeletons";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Can't speak but understands the languages it knew in life";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft.";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "exhaustion, poison";
            damageImmune = "poison";
            damageResist = "";
            damageVul = "bludgeoning";
            
            raceAbility = "<property-block> <h4>Title.</h4><p>description.</p></property-block>";
            raceAbility = "";

            raceAttacks = "<property-block> <h4>Title.</h4> <p> <i>Type Weapon Attack: </i>+x to hit, reach 5 ft., one target. <i>Hit:</i> Description.</p></property-block>";
            raceAttacks = "<property-block> <h4>Title.</h4><p>description.</p></property-block>";
            raceAttacks = "";
            break;
        case "tiefling" :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 1;
            race_modifiers[4] = 0;
            race_modifiers[5] = 2;
            racePlural = "tieflings";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Common, Infernal";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft.";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "fire";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Infernal Legacy.</h4><p>The tiefling knows the <i>Thaumaturgy</i> cantrip. _TIEFLINGSPELLS_ The tiefling uses Charisma for its Spellcasting Ability for these Spells. (+_CHAP_ to hit, DC _CHADC_)</p></property-block>";            
            raceAttacks = "";
            break;
        case "troglodyte" :
            race_modifiers[0] = 2;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 2;
            race_modifiers[3] = -4;
            race_modifiers[4] = 0;
            race_modifiers[5] = -4;
            racePlural = "troglodytes";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Troglodyte";
            raceSize = "Medium";
            raceSenses = "darkvision 60 ft.";
            raceSkills = "";
            raceACBonus = 1;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Chameleon Skin. </h4><p>The troglodyte has advantage on Dexterity (Stealth) checks made to hide.</p></property-block>";            
            raceAbility += "<property-block> <h4>Stench. </h4><p>Any creature other than a troglodyte that starts its turn within 5 feet of the troglodyte must succeed on a DC _CONDC_ Constitution saving throw or be poisoned until the start of the creature's next turn. On a successful saving throw, the creature is immune to the stench of all troglodytes for 1 hour.</p></property-block>"; 
            raceAbility += "<property-block> <h4>Sunlight Sensitivity. </h4><p>While in sunlight, the troglodyte has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.</p></property-block>"; 
            raceAttacks = "";
            break;
        case "zombie" :
            race_modifiers[0] = 1;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 2;
            race_modifiers[3] = -6;
            race_modifiers[4] = -4;
            race_modifiers[5] = -4;
            racePlural = "zombies";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "Can't speak but understands the languages it knew in life";
            raceSize = "Medium";
            raceSenses = "";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "poisoned";
            damageImmune = "poison";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Undead Fortitude.</h4><p>If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead.</p></property-block>";            
            raceAttacks = "";
            break;
        default :
            race_modifiers[0] = 0;   
            race_modifiers[1] = 0;
            race_modifiers[2] = 0;
            race_modifiers[3] = 0;
            race_modifiers[4] = 0;
            race_modifiers[5] = 0;
            racePlural = "humans";
            raceBaseSpeed = "30";
            raceSpeed = "";
            raceLanguage = "";
            raceSize = "Medium";
            raceSenses = "";
            raceSkills = "";
            raceACBonus = 0;
            conditionImmune = "";
            damageImmune = "";
            damageResist = "";
            damageVul = "";
            
            raceAbility = "<property-block> <h4>Title.</h4><p>description.</p></property-block>";
            raceAbility = "";

            raceAttacks = "<property-block> <h4>Title.</h4> <p> <i>Type Weapon Attack: </i>+x to hit, reach 5 ft., one target. <i>Hit:</i> Description.</p></property-block>";
            raceAttacks = "<property-block> <h4>Title.</h4><p>description.</p></property-block>";
            raceAttacks = "";
            break;
    }
}

function CoinFlip(){
    var prob1 = Math.floor(Math.random() * 2) +1;
    if (prob1 == 1) return false;
    return true;
}

function RandomProficiency(){
    var skills = ["Athletics", "Acrobatics", "Sleight of Hand", "Stealth", "Arcana", "History", "Investigation", "Nature", "Religion", "Animal Handling", "Insight", "Medicine", "Perception", "Survival", "Deception", "Intimidation", "Performance", "Persuasion"]
    return skills[Math.floor(Math.random() * skills.length)];
}