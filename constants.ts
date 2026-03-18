import { InstrumentCategory } from './types';

export const INSTRUMENT_INVENTORY: InstrumentCategory[] = [
  {
    name: "Synthesizers and Keyboards",
    items: [
      // Classics & Vintage
      "Yamaha DX7", "Yamaha DX7 II", "Yamaha DX-100", "Yamaha TX802", "Yamaha TX816",
      "Roland Jupiter-8", "Roland Jupiter-6", "Roland JP-08", "Roland Juno-60", "Roland Juno-6", "Roland Juno-106", "Roland Alpha Juno 2",
      "Korg M1", "Korg 01/W Pro", "Korg Triton", "Korg Lambda", "Korg PS-3100", "Korg MS-10", "Korg MS-20",
      "Sequential Circuits Prophet-5", "Sequential Circuits Prophet-10", "Sequential Circuits Prophet Bass",
      "Casio CZ-101", "Casio CZ-1000", "Casio CZ-5000",
      "Yamaha CS-80", "Yamaha CS01",
      "Moog Minimoog", "Moog Polymoog",
      "ARP Quadra", "ARP Odyssey",
      "Oberheim OB-8", "Oberheim OB-Xa", "Oberheim Xpander",
      "Roland D-50", "Roland JV-1080", "Roland JV-2080",
      "E-Mu Proteus 1 XR", "E-Mu Proteus 3 XR",
      "Fender Rhodes", "Dyno-My-Piano", "Yamaha CP-30", "Steinway Concert Grand Piano", "Hohner Clavinet", "Hammond Organ",
      
      // Native Instruments & Modern Synthesis
      "Massive X", "Massive", "Razor", "FM8", "Reaktor 6", "Reaktor Prism", "Reaktor Spark", "Blocks Primes",
      "Monark", "bx_oberhausen", "Retro Machines MK2", "Super 8", "Form", "Skanner XT", "Flesh", "Kontour", "Rounds",
      "Analog Dreams", "Ethereal Earth", "Hybrid Keys", "Modular Icons", "Cloud Supply", "Lo-Fi Glow", "Melted Vibes",
      "Soul Sessions", "Utopia", "Deft Lines", "Homage", "Bazzazian Tapes", "Feel It", "Sway", "Bouquet", "Nacht",
      "Duets", "Glaze 2", "Playbox", "Piano Colors", "Ashlight", "Pharlight", "Straylight", "Kinetic Metal", "Kinetic Toys",
      "Conflux", "Scene: Saffron", "Schema: Dark", "Schema: Light",
      
      // Keys & Pianos (NI)
      "Alicia's Electric Keys", "Alicia's Keys", "Electric Keys – Diamond", "Electric Keys – Phoenix",
      "Noire", "The Grandeur", "The Maverick", "The Giant", "The Gentleman", "Una Corda", "Vintage Organs",
      "Ignition Keys", "40's Very Own Keys",

      // Modern & Virtual Analog Presets
      "8Bit Runner", "Alien 10", "Aphex Antenna", "Arpman Analogue", "Arpman Trance",
      "Brass Synth Vibrato", "Cinematic Clocks", "Cinematic Synth Steps", "Crazy Distortion",
      "Daft Arp Machine", "Dark Film Element", "Deep Cinepad", "Deep Space", "Dirty Crush",
      "Aboveness", "Alienized", "Amnyze", "Aqualets", "Arpatoms", "Atonalogue", "Avix",
      "Barking Duck", "Beat yngz", "Beautylogue", "Big Grains", "Biugos", "Bixyr", "Bowalog",
      "Breathikyz", "Brighterlings", "Brightlets", "Brut", "Cervyzu", "Combo Electrons",
      "Crinity", "Crown", "Crystalbelli", "Darpishort", "Datowuz", "Denom", "Descent",
      "Djohz", "Dophia", "Effemlings", "Electronight",
      "Acid Party", "Alive Mau5", "Angry Man", "Asperas Helix", "Black Ashes", "Brass Carnival",
      "Brazilian Flow", "Broken Bits", "Catch Me", "Chasing Car", "Coin Sweeper", "Deep Sense",
      "Dizzy Vox", "Do not Disturb", "Dub Break", "Easy Life", "Evo Devotion", "Extra Sauce",
      "Fast Food", "Fast Pace", "Full On", "Future Slap", "Gas Station", "Grasshopper",
      "Greasy Hands", "Growling Machine",
      
      // FM & Digital Design
      "2-OpFM Designer", "4-OpFM Designer", "A U R O R A", "A-HA!", "Abience", "Aesthetic",
      "Affirmator", "Aggressive One X", "Aggressive Poly", "Aggressive Punk", "Ahead",
      "Analog Bells", "Analog Strings", "Apaixona", "Ascending", "Asterisma", "Astonishing",
      "Atavista", "Awbass", "Batlery", "Bending Circuitry", "Bionic Bells", "Bitonica",
      "Black Flash", "Brasiana", "Bully Fat", "Buzzlyzer",
      "DXEP mk I", "DXEP mk II", "DXEP XL", "Dyabrass", "Dynakey", "Dynama", "Dystopad",
      
      // J-Series Emulations
      "J60 Replica", "J60 Resonator", "J62 Florgan", "J62 Laser Synth", "J64 Generic PWM",
      "J106 Baritone", "J106 Brass Lite", "J106 Horn", "J106 Organ", "J106 Varishape",
      "JBells", "JCompact", "JComposite", "J6 Flanging Strings", "J6 Harp", "J7 Orch",
      "J11 Flexiverse", "J11 Plusitron", "J60 Monolead",
      
      // Pads & Atmospheres
      "ATM Abyss Swells", "ATM Badabook", "ATM Dissonant Bassmaphere", "ATM Drama", "ATM Dystopian Horizon",
      "ATM Lamenting", "ATM Mist", "ATM Oram", "ATM Quake", "ATM Space Ambient Drone", "ATM Spectres", "ATM Voodoo Organ",
      "PAD JP Aristopad", "PAD JP Lunar Dune", "PAD JP Moonlight", "PAD MM Dark Sleep", 
      "PAD OB Infusion", "PAD OB Jolie Choir", "PAD P1 Ambience", "PAD P1 Anthemic Mod",
      "PAD Blaq Flock", "PAD Ding", "PAD Grumbo", "PAD Inso", "PAD Nova", "PAD Polarize", "PAD SwordSLinger",
      
      // Leads & Plucks
      "LED JP Funk Trish", "LED JP Mono Me", "LED MM Big Short Lead", "LED MM Nasty Tremolead",
      "LED OB Clicky Lead", "LED OB Dirty Fresh", "LED OB Metal Bottom Lead", "LED P1 Mosquitox", "LED P1 Sync Lead",
      "PLK JP Analog Pluck", "PLK JP Attack Flute", "PLK MM Relax", "PLK OB Harp X", "PLK P1 Prophet Soft",
      "PLK Anim Wood Box", "PLK Big Butterfly", "PLK Custom Zither", "PLK Fretless Pluck", "PLK Guzheng Secret",
      
      // Keys & Organs (General)
      "KEY JP CP JP 70", "KEY MM Cat Keys", "KEY OB Magic Keys", "KEY P1 Granular Keys",
      "KEY Bones", "KEY Clues", "KEY Drama", "KEY Jamiso", "KEY JavlinSyn", "KEY Modje",
      "ORG JP Klikoss", "ORG MM Organ Chapel", "ORG OB Modern Organ", "ORG P1 Expressive Organ", "ORG Tegrity",
      "E Piano Basic Dry", "E Piano Broken Toy", "E Piano Chorused", "E Piano Phaser", "E Piano Space Bells",
      "Clav C Basic Dry", "Clav C Wah", "Clav L1 Phase Dark", "Clav Viba Rotary",
      
      // Pianos (General)
      "Bosendorfer", "Bosendorfer Lite", "Close Grand", "Electric Eighties", "Electric Piano Bright",
      "Grand Piano", "Pianomix", "Pianopad", "Rhodes Basic", "Rhodes MK1", "Stage Grand",
      "Steinway D", "Westworld", "Yamaha C7", "Zero Eighties"
    ]
  },
  {
    name: "Rhythm and Drum Machines",
    items: [
      // Classics
      "Linn LM-1", "LinnDrum", "Roland TR-808", "Roland TR-909", "Roland TR-08",
      "Roland CR-78", "Roland CR-8000", "Oberheim DMX", "Sequential Circuits Drumtraks",
      "Alesis SR-16", "Alesis SR-18", "Simmons Electronic Drums",
      
      // Native Instruments Drums & Percussion
      "Battery 4", "Studio Drummer", "Polyplex", "Drumlab", "TRK-01", "Butch Vig Drums",
      "40's Very Own Drums", "Karriem Riggins Drums", "Empire Breaks", "Rudiments",
      "Abbey Road Vintage Drummer", "Abbey Road 50s Drummer", "Abbey Road 60s Drummer", 
      "Abbey Road 70s Drummer", "Abbey Road 80s Drummer", "Abbey Road Modern Drummer",
      "Session Percussionist", "Damage",
      
      // Modern Drum Libraries
      "GetGood Drums Modern & Massive", "GetGood Drums P IV Matt Halpern", "GetGood Drums One Kit Wonder Metal",
      "Toontrack Superior Drummer 3", "Toontrack EZdrummer 3", "Toontrack Death & Darkness SDX",
      "Toontrack The Rock Foundry SDX", "Toontrack Metal Foundry SDX",
      "Steven Slate Drums SSD 5.5", "MixWave Drums", "Solemn Tones Drums", "Ugritone Drums",
      "Chaostones Deviant Drums", "XLN Audio Addictive Drums 2", "Krimh Drums Free (Bogren Digital)",
      "AVA Music PRISM Drums Lite",
      
      // Percussion Design & Hits
      "Analogue Machine Perc", "Blasternoise", "Cinematic Clocks",
      "HIT Blended Hell", "HIT Brass Low", "HIT Cluster Punch Strings", "HIT Loki", "HIT Mammoth",
      "HIT Mars", "HIT Menacing", "HIT Mordor", "HIT Oxford Whydah", "HIT Power Stomp", "HIT Sledgehammer",
      
      // Stick & Experimental Percussion
      "Stick Big Stax", "Stick Blind", "Stick Cellular", "Stick Crazy", "Stick Cymbal Shift",
      "Stick Fellaw", "Stick Ghost Not", "Stick Machine Gut", "Stick Roller Track", "Stick Tennessee", "Stick Trap Attack",
      "WET Attackless Stadium", "WET Comp Punishment", "WET DnB Mood", "WET Fat Metal", "WET Filter Transient",
      "WET Gabber Thriller", "WET Garage Ricochets", "WET Old Sampler", "WET Phase Along", "WET Resonant Trap",
      "WET Water Kit",
      
      // Loops & FX
      "Drum Loop 1", "Drum Loop 2", "Drum Loop 3", "Ultimate Kick", "Ultimate Snare",
      "FX Box of Bees", "FX Factory Machine", "FX Intoxicated Clown", "FX Lunar Gravity", "FX OuterSpace", "FX Slaughter Swells"
    ]
  },
  {
    name: "Guitars and Basses",
    items: [
      // Classic Guitars
      "Fender Telecaster (1978-80)", "Martin D-28", "Gibson Nick Lucas", "Fender Jazz Bass ('66)",
      "Fender Precision Bass", "Yamaha MB-1 Motion Bass", "Hofner 500/5 President Bass", "Takamine B10 Bass", "Electric Sitar",
      
      // Native Instruments Session Guitarist/Bassist
      "Session Guitarist – Acoustic Sunburst Deluxe", "Session Guitarist – Acoustic Sunburst", 
      "Session Guitarist – Electric Mint", "Session Guitarist – Electric Sunburst Deluxe", 
      "Session Guitarist – Electric Vintage", "Session Guitarist – Picked Nylon", 
      "Session Guitarist – Picked Acoustic", "Session Guitarist – Strummed Acoustic", 
      "Session Guitarist – Strummed Acoustic 2", "Session Ukulele",
      "Session Bassist – Icon Bass", "Session Bassist – Upright Bass", 
      "Session Bassist – Prime Bass", "Scarbee Rickenbacker Bass",
      
      // Third Party Guitars (VSTs)
      "Indiginus Generation", "Soniccouture Sunbird",
      "Prominy V-METAL", "Prominy SC Electric Guitar 2", "Prominy LPC Electric Guitar",
      "Shreddage 3 Stratus", "Shreddage 3 Hydra", "Shreddage 3 Abyss", "Shreddage 3 Serpent",
      "Orange Tree Evolution Infinity", "Orange Tree Evolution Strawberry", "Three-Body Tech Heavier7Strings",
      "Ilya Efimov LP Electric Guitar", "MusicLab RealGuitar 6", "MusicLab RealStrat",
      "Ample Metal Eclipse", "Ample Metal Hellrazer", "Ample Guitar LP", "Ample Guitar TC",
      "UJAM Virtual Guitarist IRON 2", "UJAM Virtual Guitarist CARBON",
      "Spitfire Audio LABS Electric Guitars", "Spitfire Audio Electric Mint", "8Dio Electric Guitar",
      "Pettinhouse Funky Guitar",
      
      // Virtual Basses
      "Prominy SR5 Rock Bass 2", "Ample Metal Ray5", "Ample Bass P", "Ample Bass J",
      "Orange Tree Evolution Roundwound Bass", "Eurobass 3 (Submission Audio)",
      "Modo Bass 2 (IK Multimedia)", "Trilian (Spectrasonics)",
      
      // Guitar Presets & Textures
      "Ace Nylon Lite", "Ace of Space", "Bright Humbucker AC15", "BritBlub X", "Chill Guitar",
      "Daisy Rock Acoustic", "Dark Star Metal", "Dark Star Overdriven", "Ebow", "Finger Neck Humb",
      "Metal Chords 1", "Muted Strat 2", "Nylon Shimmer", "Ovation Elite", "Piezo Dub",
      "Pignose FullGain", "Power Chorder", "Steel MK I", "TalkBox Wah",
      "GTR Acoustic Muted", "GTR Big Strat", "GTR Dreamable", "GTR Feedback Sat", "GTR Lo End Wah",
      "GTR Mutamonic Arp", "GTR Pure Muted", "GTR Strange Clavi", "GTR Wobbling Reso",
      
      // Bass Presets (Synth & Electric)
      "BAS JP Analogie", "BAS JP Decay", "BAS JP Japan Taurus", "BAS JP Vibra Lows",
      "BAS MM 3 Oct Sub Click", "BAS OB Grain Bass", "BAS OB Power Bass", "BAS P1 Prophet 5 Bass",
      "BAS D'andria", "BAS Deriv", "BAS Ginzu", "BAS Hamptoni", "BAS Kesi", "BAS Pongo", "BAS Wizard",
      "BSS Electric Muted", "BSS Evolving Reso", "BSS Fat Detune", "BSS Mega Man", "BSS Muted Bass Arp",
      
      // Amps & FX
      "Neural DSP Archetype: Gojira X", "Neural DSP Archetype: Nolly X", "Neural DSP Archetype: Petrucci",
      "Neural DSP Granophyre", "Friedman Be100 (Neural DSP)",
      "Positive Grid BIAS FX 2", "Waves GTR 3", "Line6 Helix Native", "Audified AmpLion Pro",
      "UAD Fender 55 Tweed Deluxe", "UAD Marshall Plexi Super Lead",
      "Blackstar St James", "Engl Amp Room", "Friedman Buxom Betty", "Peavey 5150",
      "Mesa Boogie Triple Rectifier", "Marshall JCM800",
      "TSE X50 V2", "Audio Assault RVXX", "Mercuriall Unchained"
    ]
  },
  {
    name: "Wind, Orchestral & Percussion",
    items: [
      // Traditional
      "Tenor Saxophone", "Baritone Saxophone", "Alto Saxophone", "Soprano Saxophone",
      "Trumpet", "Flugelhorn", "Trombone", "Bass Trombone", "Flute", "Piccolo Flute",
      "Oboe", "Bassoon", "Clarinet", "Lyricon", "Glockenspiel", "Kalimba", "Marimba",
      
      // Native Instruments Orchestral & Cinematic
      "Action Strings 2", "Emotive Strings", "Session Strings Pro 2", "Stradivari Violin", 
      "Symphony Essentials – String Ensemble", "Symphony Essentials – Woodwind Ensemble", 
      "Symphony Essentials – Brass Ensemble", "Symphony Essentials – Brass Solo", 
      "Symphony Essentials – Woodwind Solo", "Symphony Essentials – Percussion",
      "Action Woodwinds", "Action Strikes", "Session Horns Pro", "Valves",
      "Sequis", "Vocal Colors", "Mysteria", "Jacob Collier Audience Choir",
      "Thrill", "Rise & Hit", "Mallet Flux",
      
      // World / Ethnic
      "Spotlight Collection: Ireland", "East Asia", "India", "Cuba", "Middle East", 
      "Balinese Gamelan", "West Africa",
      
      // Orchestral Libraries & Presets
      "Spitfire Audio Georgian Voices", "Basic Cinematic", "Basic Hall", "Basic Strings",
      "Bassoon Staccato", "Bassoon Sustain", "Clarinets Staccato", "Clarinets Sustain",
      "Flutes Staccato", "Flutes Sustain", "Full Brass Staccato", "Full Brass Sustain",
      "Full Winds Staccato", "Full Winds Sustain", "Horns Staccato", "Horns Sustain",
      "Oboes Staccato", "Oboes Sustain", "Trombones Staccato", "Trombones Sustain",
      "Trumpets Staccato", "Trumpets Sustain", "Tubas Staccato", "Tubas Sustain",
      
      // Synth/Hybrid Orchestral
      "STR JP Large Orchestra", "STR JP Orchestrash", "STR MM Mellow Strings", "STR MM Pure Old Analog",
      "STR OB Square Strings", "STR P1 Pizzicati", "STR P1 Soft Orchestra Hit",
      "BRS JP OB Style", "BRS JP Royal O Bar", "BRS MM Brabrass", "BRS OB Staccato Brass",
      "BRS P1 Prophet Brass", "Heroichestra mk I", "Heroichestra mk II", "Heroichestra mk III",
      "HiStrings mk I", "HiStrings mk II", "Matrix Strings", "Matrix Syncstrings"
    ]
  },
  {
    name: "Sequencers and Samplers",
    items: [
      "Kontakt 8", "Roland MC-4 MicroComposer", "Roland MC-8 MicroComposer",
      "Fairlight CMI (Series I, II, III)", "Synclavier", "Synclavier II",
      "E-Mu Emulator I", "E-Mu Emulator II", "Akai S5000", "Akai S900", "Akai S612",
      "Yamaha QX-1", "Yamaha QY70",
      
      // Sampler Presets & Textures
      "WET Old Sampler", "EPC Black Hole SEQ", "EPC Gladiators Arena", "EPC Moby Glitch",
      "Samplephonics The Synth Vol 1-5"
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
You are an expert musical director and prompt engineer specifically for AI music generation (Suno).
Your goal is to transform the user's input (which is often a list of specific instruments) into a **concise, high-fidelity musical arrangement** and provide a structured breakdown.

INVENTORY CONTEXT:
${JSON.stringify(INSTRUMENT_INVENTORY)}

*** CRITICAL RULES - READ CAREFULLY ***

0. **JSON SAFETY**:
   - Output must be valid JSON.
   - Strictly escape all double quotes (\") and newlines (\\n) inside string values.

1. **MANDATORY FORMULA (for fullPrompt)**:
   You must structure the text output strictly in this order:
   **[Genre & Era Stylization] + [Sonic/Production Specs] + [Performance/Vocal Delivery] + [Lyrical Themes & Technique] + [Song Structure Dynamics] + [Final Mood Descriptors] + [Audio Fidelity Meta-Tags]**

2. **SECTION GUIDELINES**:
   - **[Genre & Era Stylization]**: Define the specific sub-genre, time period, and cultural context (approx. 15-20 words). If a Tempo or Key is suggested, you MUST explicitly include them here (e.g., "120 BPM, C Major").
   - **[Sonic/Production Specs]**: This is the CORE section. You **MUST** include every instrument from the user's input here. 
     - **CRITICAL**: Keep instrument descriptions **concise and punchy**. 
     - Use **2-3 high-impact adjectives or technical specs** per instrument (e.g., "gated reverb," "fuzzy," "staccato," "wide stereo field").
     - **Avoid** long, flowing sentences for each instrument. Group them efficiently within the mix.
   - **[Performance/Vocal Delivery]**: Describe the vocal style or lead performance intensity.
   - **[Lyrical Themes & Technique]**: Describe the subject matter and rhyming style (if applicable).
   - **[Song Structure Dynamics]**: Briefly outline the arrangement flow.
   - **[Final Mood Descriptors]**: A comma-separated list of 5-7 mood keywords.
   - **[Audio Fidelity Meta-Tags]**: See Rule #5 below.

3. **BREAKDOWN GUIDELINES (for elementBreakdown)**:
   - For every major instrument or element mentioned in the prompt, create a breakdown entry.
   - The 'element' field should be the instrument name (e.g., "Yamaha DX7").
   - **CRITICAL**: The 'description' field must be **EXTRACTED DIRECTLY** from your 'fullPrompt'. 
     - Do not invent new descriptions. 
     - If the prompt says "glassy Yamaha DX7 electric piano chords", the breakdown description must be "glassy electric piano chords".
     - Ensure perfect consistency between the prose prompt and the table.

4. **LENGTH & STYLE**:
   - **Efficient and Dense**: The output should feel like a professional producer's shorthand note.
   - **Avoid Fluff**: Do not write "The sound of the..." or "We can hear a...". Just describe the sound directly.
   - **Target**: High information density, moderate length. 

5. **AUDIO FIDELITY ENHANCEMENT (TRICK #17)**:
   - To bias the model toward "Clean" and "FLAC" quality mixing decisions (reducing chaos/mud), you MUST append a curated selection of 3-4 keywords from the following list to the very end of the prompt (after Mood Descriptors):
   - **Keywords**: "Clean production", "FLAC quality sound", "Studio polish", "Professional mix", "High fidelity", "Crisp highs", "Tight controlled bass", "Balanced frequencies", "Pristine sound design", "Mastered".
   - **Exception**: Do NOT use these if the requested genre inherently demands low-fidelity or chaos (e.g., "Lo-fi Hip Hop", "Raw Black Metal", "Garage Punk"). In those specific cases, omit this section.

6. **ARTIST RESEARCH (Google Search)**:
   - If the user input contains a specific artist or singer name, you MUST use the available search tool to research their musical style, typical instruments, production techniques, and vocal characteristics.
   - Use this information to enhance the prompt, ensuring the generated style matches the artist's signature sound.
   - Do NOT explicitly mention "According to Google Search" in the output. Integrate the findings naturally.

EXAMPLE INPUT:
"City Pop, Linn LM-1, Roland MC-4, Yamaha DX7, Fender Telecaster"

EXAMPLE OUTPUT JSON Structure:
{
  "fullPrompt": "A sophisticated late-70s City Pop track, production features punchy Linn LM-1 gated snares driven by precise Roland MC-4 sequencing, glassy Yamaha DX7 electric piano chords, rhythmic Fender Telecaster 'chank' with light chorus, silky smooth vocal delivery, lyrics about urban romance and neon lights, intro to verse buildup, nostalgic, breezy, urban, sentimental, clean production, FLAC quality sound, studio polish",
  "elementBreakdown": [
    { "element": "Linn LM-1", "description": "Punchy gated snares, dry kick" },
    { "element": "Roland MC-4", "description": "Precise mechanical sequencing" },
    { "element": "Yamaha DX7", "description": "Glassy electric piano chords" },
    { "element": "Fender Telecaster", "description": "Rhythmic 'chank' with light chorus" }
  ]
}
`;

export const DIRTY_TRICKS_INSTRUCTION = `
You are an expert AI music hacker who uses advanced "Manual Mode" techniques to control audio generation models (specifically Udio) with high precision.
When the "Dirty Tricks" protocol is active, you ignore standard prose generation and output strictly formatted control codes and structure maps.

INVENTORY CONTEXT:
${JSON.stringify(INSTRUMENT_INVENTORY)}

*** DIRTY TRICKS PROTOCOL - EXECUTE ALL RULES ***

0. **JSON SAFETY**:
   - Output must be valid JSON.
   - Strictly escape all double quotes (\") and newlines (\\n) inside string values.

1. **OUTPUT FORMAT**: 
   You must produce two distinct components:
   (A) **Style/Tags**: A COMMA-SEPARATED list of descriptors.
   (B) **Lyrics**: A structural map. The content depends on whether the user provided lyrics.

2. **STYLE/TAGS RULES**:
   - Use COMMAS "," to separate style descriptors.
   - **Structure**: GENRE, ERA, TEMPO (if provided), KEY (if provided), ENERGY, VOCAL TYPE (Duet if needed), INSTRUMENTS, MIX/SPACE NOTES.
   - **Speculative Quality Bias**: Append 2-3 of these tags at the end unless the genre is lo-fi: "Clean production", "FLAC quality sound", "Studio polish", "Professional mix", "High fidelity".

3. **STRUCTURE & LAYOUT RULES (The "Lyrics" Field)**:
   
   **CASE A: USER PROVIDED LYRICS (in the prompt)**
   - **Goal**: You MUST segment the user's raw text into a structured song format.
   - **CRITICAL RULE**: Every block of lyrics MUST be preceded by a **[Section Header]**. Do not output raw lyrics without a header.
   - **Formatting**:
     - **Headers**: Use the EXACT format \`[Section Type: Vocal Style | Mood | Technical]\` (e.g., \`[Verse 1: Spoken Word | Melancholic | Close Mic]\`). You MUST include the brackets and the pipe characters.
     - **Segmentation**: logical breaks in the user's text should become new sections (Verse, Chorus, Bridge).
     - **Text Styling**: 
       - Use **ALL CAPS** for high-energy/loud lines.
       - Use Normal Case for conversational/soft lines.
     - **Ad-libs**: Insert **[Ad-libs]** (e.g., [Yeah!], [Sigh]) where they fit rhythmically.
     - **Backing Vocals**: Place **(Backing Vocals)** in parentheses.

   **EXAMPLE INPUT (Case A - With Lyrics):**
   "I'm walking down the street / It's raining hard / I miss you so much / WHY DID YOU LEAVE ME"

   **EXAMPLE OUTPUT (Case A):**
   {
     "styleTags": "...",
     "lyrics": "[INTRO: Instrumental | Rain Sounds | 90s Vibe]\\n(Thunder rumble)\\n\\n[VERSE 1: Low Register | Sad | Wet Reverb]\\nI'm walking down the street\\nIt's raining hard\\n\\n[CHORUS: Belted | Emotional | Distortion]\\nI MISS YOU SO MUCH\\nWHY DID YOU LEAVE ME\\n[Why?!]"
   }

   **CASE B: NO LYRICS PROVIDED**
   - **Goal**: Create a structural skeleton only.
   - **DO NOT GENERATE NEW LYRICS.**
   - Output ONLY the section headers combined with "Word Descriptions" (Vocal Style/Emotion/Technical descriptors).
   - **Format**: [Section Label: Vocal Register | Emotion | Technical Cues]
   - **CRITICAL**: Use the pipe "|" character to separate descriptors within the brackets.
   - **Instrumental Sections**: Include specific instrument details in the header (e.g., [Intro: Instrumental | Solina String Ensemble | Melancholic]).
   - **Sound Cues**: You MAY include non-lyrical sound cues in parentheses on separate lines to add texture (e.g., (Deep audible breath), (Tape start sound), (Vinyl crackle)).
   - Use empty lines between sections.

4. **CONTENT GENERATION**:
   - Create a sophisticated song structure map suitable for the user's input genre.
   - Incorporate the user's specific instruments into the Style/Tags section.

5. **ARTIST RESEARCH (Google Search)**:
   - If the user input contains a specific artist or singer name, you MUST use the available search tool to research their musical style.
   - Use this information to populate the Style/Tags with accurate genre, era, and instrument tags associated with that artist.

EXAMPLE INPUT (Case B - No Lyrics):
"Dark Synthwave, Yamaha DX7"

EXAMPLE OUTPUT (Case B):
{
  "styleTags": "Dark Synthwave, 1980s, Driving, Male Vocal, Yamaha DX7, Clean production, FLAC quality sound",
  "lyrics": "[Intro: Instrumental | Analog Pad Swell | 80s Vibe]\\n(Tape hiss start)\\n\\n[Verse 1: Low Register | Mysterious | Whispered | Reverb]\\n\\n[Chorus: Belted | Urgent | Multi-tracked Vocals]"
}
`;