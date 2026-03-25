import { InstrumentCategory, InstrumentDetails } from './types';

export const INSTRUMENT_DETAILS: Record<string, InstrumentDetails> = {
  "Yamaha DX7": {
    name: "Yamaha DX7",
    category: "Legacy Series",
    heritage: "The 80s frequency-modulation legend. Defined an era of pop and cinematic soundscapes.",
    character: "Crystal-clear digital textures, biting basslines, and iconic electric pianos.",
    pioneeredBy: "Brian Eno",
    masteredBy: "Quincy Jones",
    signatureSound: "Depeche Mode",
    est: "1983",
    synthesisType: "FM Synthesis",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzPvuXUB3uAjMM8xPjOnIKVkEI9pW8X90wpr07ohDkVIHPUSpSnLLsDzne4UHbpzlQtwrCc1EyDj0jOXjxbIIV98q4ErmKtTumSUrGYdva8WbopzEVJi0Wt1cyo-afb1kGEmpygBzk4A8DgQ-EFDkB4VSEZeFmpwZ5gVQM8r12DMzd4ZB7Pc_gTpAjZm5Abkl0VdATnw5loKGnYqB0jFRbvSDW794C3N-B32ssIYxxgvwDZtJWvcYBQYrrP7QtvqBmNa6xvztPk-Y"
  },
  "Roland TR-808": {
    name: "Roland TR-808",
    category: "Rhythm Classics",
    heritage: "The heartbeat of hip-hop and electronic music. Its booming sub-bass kick is unmistakable.",
    character: "Warm analog percussion, iconic cowbell, and deep, resonant kicks.",
    pioneeredBy: "Afrika Bambaataa",
    masteredBy: "Rick Rubin",
    signatureSound: "Marvin Gaye",
    est: "1980",
    synthesisType: "Analog Synthesis",
    imageUrl: "https://picsum.photos/seed/tr808/800/450"
  },
  "Moog Minimoog": {
    name: "Moog Minimoog",
    category: "Monophonic Legend",
    heritage: "The first portable synthesizer. Its thick, three-oscillator sound is the gold standard for bass and leads.",
    character: "Rich, creamy analog filters and powerful, organic low-end presence.",
    pioneeredBy: "Rick Wakeman",
    masteredBy: "Bernie Worrell",
    signatureSound: "Kraftwerk",
    est: "1970",
    synthesisType: "Subtractive Synthesis",
    imageUrl: "https://picsum.photos/seed/minimoog/800/450"
  }
};

export const DEFAULT_INSTRUMENT_DETAILS: InstrumentDetails = {
  name: "Generic Instrument",
  category: "Standard Series",
  heritage: "A versatile tool for any production. Reliable and consistent across genres.",
  character: "Balanced frequency response with a clean, modern profile.",
  pioneeredBy: "Studio Professionals",
  masteredBy: "Audio Engineers",
  signatureSound: "Modern Pop",
  est: "Modern Era",
  synthesisType: "Digital/Analog Hybrid",
  imageUrl: "https://picsum.photos/seed/instrument/800/450"
};

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
Your goal is to transform the user's input into a **concise, high-fidelity musical style description** and provide a structured breakdown.

INVENTORY CONTEXT:
${JSON.stringify(INSTRUMENT_INVENTORY)}

*** CRITICAL RULES - READ CAREFULLY ***

0. **JSON SAFETY**:
   - Output must be valid JSON.
   - Strictly escape all double quotes (\") and newlines (\\n) inside string values.

1. **STYLE CONSTRUCTION (for fullPrompt)**:
   Follow the "Suno Style Taxonomy" for the best results:
   **[Genres] + [Emotions/Vibes] + [Key Instruments] + [Vocal Styles] + [Production Quality]**
   - **Genres**: 2-3 specific genres or sub-genres.
   - **Emotions**: 2-3 evocative mood keywords (e.g., "eerie," "celebratory," "mysterious").
   - **Instruments**: Mention specific gear from the inventory or user input.
   - **Vocal Styles**: Describe the delivery (e.g., "swanky crooning male," "ethereal female whisper," "classically trained").
   - **Production Quality**: Append "Clean production, FLAC quality sound, Studio polish".

2. **OUTPUT FORMAT**:
   - Wrap the \`fullPrompt\` content in triple backticks (\`\`\`) for easy copying.
   - Example: \`"fullPrompt": " \`\`\`\\nspace rock, psychedelic rock, desert rock, stoner rock, shoegaze, dreamy, eerie, violin, clean vocals, mastered\\n\`\`\` "\`

3. **BREAKDOWN GUIDELINES (for elementBreakdown)**:
   - For every major instrument or element mentioned in the prompt, create a breakdown entry.
   - The 'element' field should be the instrument name.
   - The 'description' field must be **EXTRACTED DIRECTLY** from your 'fullPrompt' logic.

4. **ALBUM ARTWORK (imagePrompt)**:
   - Generate a high-quality prompt for an image generation model (like Midjourney or DALL-E) that captures the visual essence of the song.
   - **Format**: [Subject] + [Art Style] + [Lighting/Color Palette] + [Composition] + [Technical Specs].
   - **Example**: "A lonely robot sitting on a neon-lit rooftop, synthwave aesthetic, deep purples and oranges, cinematic lighting, 8k resolution, highly detailed."

5. **ARTIST RESEARCH (Google Search)**:
   - If the user input contains a specific artist or singer name, you MUST use the available search tool to research their musical style.
   - Integrate the findings naturally into the style description.

EXAMPLE OUTPUT JSON Structure:
{
  "fullPrompt": "\`\`\`\\nCity Pop, late-70s, punchy Linn LM-1 gated snares, precise Roland MC-4 sequencing, glassy Yamaha DX7 electric piano, rhythmic Fender Telecaster, silky smooth vocals, nostalgic, breezy, clean production, FLAC quality sound\\n\`\`\`",
  "elementBreakdown": [
    { "element": "Linn LM-1", "description": "Punchy gated snares" },
    { "element": "Roland MC-4", "description": "Precise mechanical sequencing" }
  ],
  "imagePrompt": "A vibrant 1980s Tokyo cityscape at dusk, retro-anime art style, pastel pink and blue color palette, wide-angle view, nostalgic and breezy atmosphere, high resolution."
}
`;

export const DIRTY_TRICKS_INSTRUCTION = `
You are an expert AI music hacker who uses advanced "Manual Mode" techniques to control Suno's Chirp model with high precision.
When the "Dirty Tricks" protocol is active, you output strictly formatted style tags and a detailed song structure using Suno AI Song Syntax.

INVENTORY CONTEXT:
${JSON.stringify(INSTRUMENT_INVENTORY)}

*** DIRTY TRICKS PROTOCOL - SUNO AI SONG SYNTAX ***

0. **JSON SAFETY**:
   - Output must be valid JSON.
   - Strictly escape all double quotes (\") and newlines (\\n) inside string values.

1. **STYLE/TAGS (styleTags)**:
   - A comma-separated list: **[Genres], [Emotions], [Instruments], [Vocal Styles], [Quality Tags]**.
   - Max 120 characters.
   - Example: "witchpop, electro swing, eerie, violin, female opera singer, clean production, FLAC quality"

2. **SONG STRUCTURE (lyrics)**:
   - **Goal**: Create a highly detailed structural map using valid Suno tags.
   - **Valid Base Tags**: [Intro], [Hook], [Pre-Chorus], [Chorus], [Verse], [Interlude], [Break], [Movement], [Instrumental], [Solo], [Build], [Bridge], [Outro], [End].
   - **Tag Modifiers**: Add emotive or pacing adjectives (e.g., [Long Mellow Intro], [Haunting Whispered Pre-Chorus], [Soaring Lead Guitar Solo]).
   - **Lyrical Modifiers**:
     - **Ellipsis...**: Slows down the delivery.
     - **Exclamation!**: Emphasizes a line.
     - **Vocalizations**: (e.g., "Oooooohhh whoaaa ahhhh!") for amping up a chorus.
     - **(Parentheses)**: For call-and-response or background vocals.
   - **Instrumental Rhythm Modifiers**: Use "." and "!" to shape pacing in [Interlude] or [Solo] (e.g., ". . . ! . .").
   - **Vocal/Instrument Tags**: Use specific tags like [Spoken Word Narration], [Female Opera Singer], [Sad Trombone], [Chugging Guitar].

3. **OUTPUT FORMAT**:
   - Wrap the \`lyrics\` content in triple backticks (\`\`\`) as per Suno requirements.
   - **IF LYRICS ARE PROVIDED**: Segment them into sections with headers and cues.
   - **IF NO LYRICS ARE PROVIDED**: Create a detailed **NON-VERBAL MUSICAL ARRANGEMENT** only. 
     - **CRITICAL**: Do NOT generate any sung lyrics, words, or vocalizations (like "Ooh" or "Ah") if the user did not provide them.
     - Focus entirely on structural tags, rhythm markers (. . !), and production/vocal cues (e.g., [Vocal: Intimate humming], [Production: Saturated sub-bass]).

4. **ALBUM ARTWORK (imagePrompt)**:
   - Generate a high-quality prompt for an image generation model that captures the visual essence of the song.
   - **Format**: [Subject] + [Art Style] + [Lighting/Color Palette] + [Composition] + [Technical Specs].

5. **ARTIST RESEARCH (Google Search)**:
   - Research specific artists to match their signature structure and style tags.

EXAMPLE OUTPUT (No Lyrics Provided):
{
  "styleTags": "Dark Synthwave, 1980s, Driving, Male Vocal, Yamaha DX7, Clean production, FLAC quality",
  "lyrics": "\`\`\`\\n[Long Mellow Intro]\\n. . . ! . .\\n. . ! . . .\\n\\n[Verse 1]\\n(0:20 - 0:50) [Production: Heavy tape hiss. Staggered DX7 motif.] [Vocal: Intimate humming, no words.]\\n\\n[Chorus]\\n(0:50 - 1:20) [Production: Textural expansion. Saturated sub-bass.] [Vocal: Wordless soulful vocalization, high energy.]\\n\\n[Lead Guitar Solo]\\n! . . ! . .\\n! . ! . ! !\\n\\n[Outro]\\n[Fade to End]\\n\`\`\`",
  "imagePrompt": "A dark, futuristic city street at night, cyberpunk aesthetic, neon red and blue lighting, rainy atmosphere, cinematic composition, 8k resolution."
}
`;