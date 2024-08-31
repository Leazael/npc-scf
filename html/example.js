sectionName(`Ludovico Zanni (Level 5)`); //Keyword: name
textPrimary(`This Should Default to !hp default despite the keyword`); //Primary text (default!)
textPrimary(`LG Medium Humanoid [Evil], <span class="bold">Age:</span> A Century`); //Keyword: Alignment + Age
textPrimary(`CE Medium Humanoid [Evil], <span class="bold">Age:</span> ∞ + 1`); //Keyword: Alignment + Age
alternateBold(`;`, `Init`, `+8 [uncanny dodge]`, `Senses`, `Perception +10, Darkvision, Life-Sense.`); //Keyword: Two Bold Keywords
textPrimary(`<span class="bold">AC</span> 18 [20], Touch 13 [15], Flat-footed 16`); //Keyword: AC
section(`Section`); //Header: Standard
hpSavesTable(`35 + 1d8`, `5d8 + 5`, `8, 8, 7, 7, ?`, `Fort||+4||+1||+1||Con||+1||luck||+1||res&&Ref||*+8||+4||+2||Dex||+1||luck||+1||res&&Will||+5||+4||−1||Wis||+1||luck||+1||res`); //Keyword: hp and save table
alternateBold(`;`, `hp`, `101 + ∞`); //Keyword: One Bold Keyword
alternateBold(`;`, `vp`, `(6d12 + 6 rage)`, `wp`, `99`, `DR`, `10 / Cold Iron`); //Keyword: Three Bold Keywords
alternateBold(`;`, `vp`, `99`, `wp`, `66`); //Keyword: Two Bold Keywords
alternateBold(`;`, `Fort`, `+9`, `REF`, `−1`, `WiLl`, `±∞`); //Keyword: Three Bold Keywords
alternateBold(`;`, `hp`, `10`, `dr`, `20/Gold`); //Keyword: Two Bold Keywords
alternateBold(`;`, `Fast Healing`, `2`, `DR`, `2/—`); //Keyword: Fast Healing + DR
alternateBold(`;`, `Resist`, `Fire 10`, `Immune`, `Lightning Strikes.`); //Keyword: Two Bold Keywords
alternateBold(`;`, `Speed`, `20 ft.`, `Carrying Capacity`, `10/20/30 lb.`); //Keyword: Speed + Carrying Capacity
alternateBold(`;`, `Space`, `10 ft.`, `Reach`, `100 ft.`); //Keyword: Two Bold Keywords
alternateBold(`;`, `Speed`, `10 ft.`); //Keyword: One Bold Keyword
section(`Section`); //Header: Standard
attackTable(`Ranged`, `+1 Composite (+2 Str) shortbow [+6 BAB +5 Str + 1 Enh]`, `Normal||+12/+7||1d6 + 3/x3&&Deadly Aim||+10/+5||1d8 + 7/x3&&Rapid Shot||+10/+10/+5||1d8 + 3/x3&&R. Shot + D. Aim||+8/ +8/+3||1d8 + 7/x3`); //Keyword: attack table
attackTable(`Melee`, `mwk Battle Axe [+6 BAB +2 Str + 1 Enh]`, `Normal||+9/+5||1d8 + 2/x3&&Two‐handed||+8/+4||1d8 + 3/x3 [−1 AC, buckler]`); //Keyword: attack table
alternateBold(`;`, `Melee`, `Cold Iron Longsword +10 (1d8 + 2; 18-20/×2)`); //Keyword: One Bold Keyword
alternateBold(`;`, `Ranged`, `mwk Longbow +3 (1d4 − 1; /×3)`); //Keyword: One Bold Keyword
sectionLabel(`Θ`, `Section labelled`); //Header: Labelled
alternateBold(`,`, `Str`, `10`, `Dex`, `12`, `Con`, `18`, `Int`, `20+1d4`, `Wis`, `33`, `Cha`, `8`); //Keyword: ability scores
abilityScoreTable(`Str||−1||8||11||−1||(age)||−2||(race)&&Dex||+2||14||13||−1||(age)||+2||(race)&&Con||+1||12||13||−1||(age)||&&Int||+3||16||15||+1||(age)||&&Wis||−1||8||9||+1||(age)||&&Cha||+5||20||17||+1||(age)||+2||(race)`); //Keyword: ability score table
alternateBold(`;`, `Base Attack`, `+10`, `CMB`, `+9`, `CMD`, `22 [+2 vs Trip]`); //Keyword: BAB + CMB + CMD
section(`Some Regular Text Example`); //Header: Standard
textPrimary(`This is normal text (The default)`); //Primary text (default!)
textPrimary(`This is normal text`); //Primary Text
newLinePrimary(); //Empty Line of Primary Size
textPrimary(`<span class="bold">This is just bold text</span>`); //Primary Text Bold
textPrimary(`<span class="bold">This is bold</span> this is rugular.`); //Primary Text + Bold Label.
textPrimaryIndent(`This is regular indented. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet ligula non nulla vulputate ullamcorper nec eu urna.`); //Primary Text Indented
textPrimaryIndent(`This is regular indented too.`); //Primary Text Indented
textPrimaryIndent(`<span class="bold">This is is bold and indented</span>`); //Primary Text Bold Indented
textPrimaryIndent(`<span class="bold">This is is bold</span> and regular indented and regular indented, and regular indented and regular indend and regular indented.`); //Primary Text Indented + Bold Label
newLineSecondary(); //Empty Line of Secondary Size
textSecondary(`This is small`); //Secondary Text
textSecondary(`<span class="bold">This is small and bold</span>`); //Secondary Text Bold
textSecondary(`<span class="bold">This is small bold</span> and regular`); //Secondary Text + Bold Label.
textSecondaryIndent(`This is small and indented.`); //Secondary Text Indented
textSecondaryIndent(`This is small and indented.`); //Secondary Text Indented
textSecondaryIndent(`<span class="bold">This is small bold and indented</span>`); //Secondary Text Bold Indented
textSecondaryIndent(`<span class="bold">This is small bold</span> and regular Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet ligula non nulla vulputate ullamcorper nec eu urna. Nulla quis augue nec metus feugiat dictum.`); //Secondary Text Indented + Bold Label
sectionBreak(`Break Here for Skills and Feats`); //Header: Break
textSecondary(`<span class="bold">Feats</span> Blindfold-fighting, merciless killing, elephant-room, triple punch, highlight casting, treant spculation, doppleganger mode.`); //Keyword: secondary text, one bold keyword.
featsTable(`1||Blindfold-fighting||Does a thing.&&1b||Merciless Killing||Does a different thing.&&3||Elephant-room||alternative ruleset.&&5||Triple punch||Punch one extra time when using Double punch, but not when using single punch, honestly, I just want this line long enough to lorum this impsum a bit.`); //Keyword: Feats table
textSecondary(`<span class="bold">Skills</span> Acrobatics +12, Bluff* +9, Climb +11, Craft [Fletching] +6, Heal +6, Know [Loc]* +9, Know [Geo]* +11, Know [Nob]* +7, Perception* +13, Ride +10, Sense Motive* +13, Stealth +19, Survival* +11 (+14 when tracking), Swim +7`); //Keyword: secondary text, one bold keyword.
skillTable(`||Acrobatics||+6||1||+3||+2||&&||Appraise||+13||2||+3||+3||+5 (cl/fam)&&||Bluff||+10||2||+3||+5||&&X||Craft [Woodworking]*||+17||5||+3||+5||+4 (tr/mwk)&&||Diplomacy||+12||4||+3||+5||&&||Fly||+6||1||+3||+2||&&𝅘𝅥𝅮||Intimidate†||+15||—||—||—||`); //Keyword: Skills table
newLineSecondary(); //Empty Line of Secondary Size
sectionLabel(`Q`, `Inventory`); //Header: Labelled
inventoryTable(`On Person`, `+1 Darkleaf Lamellar Armour||1810 gp||12½ lb.&&Mwk Rapier||20 gp||1 lb.&&Sling + 10 bullets||||2½ lb.&&Mwk Violin + Case||100 gp||1 lb.&&Mwk Artisan’s tools||55 gp||2½ lb.&&+1 Cloak of Resistance||1000 gp||½ lb&&Wand of Cure M. Wounds&&↪☐☐☐☐☐☐☐☐☐☐☐☐&&Wand of Grease&&↪☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐&&Symbol of Brigh&&White Keycard`); //Keyword: inventory table
textSecondary(`<span class="bold">Inventory</span> rope, lorum, ipsom [2×], dolor, tas, brillig, and, the/slithy, toves, did, gyre, and, gimble, in, the, wabe, all, mimsy.`); //Keyword: secondary text, one bold keyword.
section(`Some Magic Here`); //Header: Standard
textPrimary(`<span class="bold">Spells</span>`); //Primary Text Bold
spellDaily(`9th`, `∞/day`, `Rain of Exploding Fish`); //Spell: Daily and SLA
spellDaily(`3rd`, `3/day`, `Fireball (DC 12, reflex half), Haste, Narcolapsy, Greater Aphasia, Torrential Glaze`); //Spell: Daily and SLA
spellPrepared(`2nd`, `Acid Arrow, Cast-Iron.`); //Spell: Prepared/at-will spells and spell-like abilities
spellPrepared(`Cantrips`, `Acid Arrow, Cast-Iron.`); //Spell: Prepared/at-will spells and spell-like abilities
spellPrepared(`Spell-Like Abilities`, `Speak with Animals (3/day)`); //Spell: Prepared/at-will spells and spell-like abilities
textPrimary(`<span class="bold">Spell-Like Abilities</span>`); //Primary Text Bold
spellLikeAbility(`At Will`,`Detect evil, Light`); //Spell: Spell-like abilities.
spellLikeAbility(`3/day`,`Cure Light Wounds`); //Spell: Spell-like abilities.
spellLikeAbility(`Constant`,`Cure Light Wounds`); //Spell: Spell-like abilities.
section(`Abilities`); //Header: Standard
specialAbility(`Ennui [sp]`, `(3/day) does a thing, involving stuff.`); //Ability: Special Abilities that can be used a certain nr. of times per day.
specialAbility(`Excruciate [su]`, `very much pain, and all of the lorum ipsum dolor, dulce et decorum est pro patria mori.`); //Ability: Constant or at-will Special Abilities
specialAbility(`Aparture`, `Great for Science?`); //Ability: Generic Special Abilities
sectionBreak(`Break Yet Again`); //Header: Break
textPrimary(`Note how !name and ||= breaks properly start new columns of pages.`); //Primary text (default!)
textPrimary(`We could put more stuff here.`); //Primary text (default!)
sectionName(`Another NPC???`); //Keyword: name
textPrimary(`Even more? What in the Ipsum?`); //Primary text (default!)
