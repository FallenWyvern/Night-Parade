<stat-block>
    <creature-heading>
      <h1><span id='mmName'>Assassin</span></h1>
      <h2><span id='mmSize'>Medium</span> humanoid (<span id='mmRace'>any race</span>), any alignment</h2>
    </creature-heading>

    <top-stats>
      <property-line>
        <h4>Armor Class</h4>
        <p id='mmAC'>15 (studded leather)</p>
      </property-line>
      <property-line>
        <h4>Hit Points</h4>        
        <p id='mmHP'>78 (12d8 + 24)</p>        
      </property-line>
      <property-line>
        <h4>Speed</h4>
        <p id='mmSpeed'><span id='mmBaseSpeed'>30</span> ft.</p>        
        </span>
      </property-line>
      <div id='mmStats'>
        <abilities-block data-str="11"
                        data-dex="16"
                        data-con="14"
                        data-int="13"
                        data-wis="11"
                        data-cha="10"></abilities-block>
      </div>
      <property-line>
        <h4>Skills</h4>
        <p>Acrobatics +6, Deception +3, Perception +3, Stealth +9</p>
      </property-line>
      <property-line id='mmSaves'> 
        <h4>Saving Throws</h4>
        <p>Dex +6, Int +4</p>            
      </property-line>
      <property-line>
        <h4>Damage Resistance</h4>
        <p>poison</p>
      </property-line>
      <property-line>
        <h4>Senses</h4>
        <p>passive Perception 13</p>
      </property-line>
      <property-line>
        <h4>Languages</h4>
        <p>Thieves cant plus any two languages</p>
      </property-line>
      <property-line>
        <h4>Challenge</h4>        
        <p id="mmCR">8 (3,900 XP)</p>
      </property-line>
    </top-stats>

    <div id = 'mmAbilities'>
        <property-block>        
                <h4>Assassinate.</h4>
                <p>During its first turn, the assassin has advantage on attack rolls against any creature that hasn't taken a turn. Any hit the assassin scores against a surprised creature is a critical hit.</p>
        </property-block>    
        <property-block>        
                <h4>Evasion.</h4>
                <p>If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin takes no damage if it succeeds on the saving throw, and only half damage if it fails.</p>
        </property-block>
        <property-block>        
                <h4>Sneak Attack.</h4>
                <p>Once per turn, the assassin deals an extra 14 (4d6) damage when it hits a target with a weapon attack and has advantage on the attack roll, or when the target is within 5 feet of an ally of the assassin that isn't incapacitated and the assassin doesn't have disadvantage on the attack roll.</p>
        </property-block>        
    </div>
    
    <h3>Actions</h3>
    <div id = 'mmAttacks'>
        <property-block>
            <h4>Multiattack.</h4>
            <p>The assassin makes two shortsword attacks.</p>        
        </property-block>
        <property-block>
            <h4>Shortsword.</h4>
            <p><i>Melee Weapon Attack:</i> +6 to hit, reach 5 ft., one target.
                <i>Hit:</i> 6 (1d6 + 3) piercing damage and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much on a successful one.</p>
        </property-block>
        <property-block>
            <h4>Light Crossbow.</h4>
            <p><i>Ranged Weapon Attack:</i> +6 to hit, range 80/320 ft., one target.
                <i>Hit:</i> 7 (1d8 + 3) piercing damage and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much on a successful one.</p>
        </property-block>
    </div>
  </stat-block>
