export interface ResourceArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  content: string; // Markdown supported
}

export const RESOURCE_ARTICLES: Record<string, ResourceArticle> = {
  "bonita-philosophy": {
    id: "bonita-philosophy",
    category: "Foundations",
    title: "The Science of Being Bonita",
    subtitle: "Neuroscience, Physiology, & Psychology",
    content: `
### What does it mean to be "Bonita"?

The word *Bonita* (Beautiful) shares roots with the Latin *Bonus* (Good). True wellness is the convergence of the **Beautiful** (aesthetic, form, expression) and the **Good** (function, virtue, health).

To achieve this state, we don't just "wish" for it. We engineer it using three operating systems:

#### 1. Neuroscience: The Hardware
Your brain is plastic, meaning it changes physical shape based on what you do and think.
*   **The Goal**: To wire your brain for *regulation* rather than *reaction*.
*   **The Method**: By using tools like **Non-Sleep Deep Rest (NSDR)** and **Circadian Alignment**, we optimize the neurotransmitters (Dopamine, Serotonin) that govern how you feel.
*   **The Result**: A calm, alert mind that projects confidence and clarity.

#### 2. Physiology: The Vessel
This is the mechanical reality of your existence.
*   **The Goal**: Metabolic flexibility and structural integrity.
*   **The Method**: We use **Zone 2 Cardio** to build mitochondrial efficiency and **Fascial Release** to ensure your body moves with fluid grace, not rigid tension.
*   **The Result**: Glowing skin (via blood flow), effortless posture, and boundless energy.

#### 3. Psychology: The Software
This is the narrative you tell yourself about yourself.
*   **The Goal**: To align your self-concept with your actions.
*   **The Method**: Through **Metacognition** (thinking about thinking) and **Values Alignment**, we rewrite limiting scripts ("I'm lazy") into growth scripts ("I am recovering").
*   **The Result**: A magnetic presence rooted in self-knowledge.

---
**The Bonita Baddies System** integrates these three fields. We don't just "do cardio"; we do it to fuel the brain (Neuro) and prove to ourselves we are capable (Psych). It is all one system.
`
  },
  "morning-sunlight": {
    id: "morning-sunlight",
    category: "Time Pillar",
    title: "Morning Sunlight",
    subtitle: "The Primary Zeitgeber",
    content: `
### Why It Matters
Light is not just for vision; it is a drug. Morning sunlight is the most powerful signal (Zeitgeber) to your brain's master clock, the Suprachiasmatic Nucleus (SCN).

### The Mechanism
1.  **Cortisol Pulse**: Viewing bright light within 30-60 minutes of waking triggers a healthy spike in cortisol. This clears out adenosine (sleepiness) and sets you up for focus.
2.  **The Timer**: It starts a ~16-hour timer for the release of **Melatonin**. If you want to sleep well at 10 PM, you must view light at 6 AM.
3.  **Mood**: It stimulates serotonin production, regulating mood for the rest of the day.

### The Protocol
*   **Go Outside**: Windows block the specific light wavelengths needed.
*   **Timing**: Within 1 hour of waking.
*   **Duration**: 5-10 mins on sunny days, 20-30 mins on cloudy days.
*   **No Sunglasses**: Let the light hit your retina (don't stare directly at the sun, obviously).
`
  },
  "90min-cycles": {
    id: "90min-cycles",
    category: "Time Pillar",
    title: "Ultradian Rhythms",
    subtitle: "Surfing the 90-Minute Wave",
    content: `
### The Science
You are likely familiar with Circadian rhythms (24 hours), but your brain also operates on **Ultradian Rhythms**—cycles of high energy followed by recovery that last about 90 to 120 minutes.

### The Mistake
Most people try to maintain "linear focus" for 8 hours straight. This is biologically impossible and leads to "junk volume" work, burnout, and afternoon crashes.

### The Protocol
1.  **The Sprint**: Pick a task and focus for 90 minutes.
2.  **The Trough**: You will naturally feel your focus dip. This is not a failure; it is biology.
3.  **The Recovery**: Take a 10-20 minute break.
    *   *Good Break*: Walking, staring at the horizon, closing eyes.
    *   *Bad Break*: Scrolling phone (this consumes dopamine).
`
  },
  "sleep-hygiene": {
    id: "sleep-hygiene",
    category: "Time Pillar",
    title: "Sleep Architecture",
    subtitle: "Protecting Your Recovery",
    content: `
### Beyond "8 Hours"
It is not just about duration; it is about *architecture*. A healthy sleep cycle moves through Light Sleep, Deep Sleep (Physical Repair), and REM (Emotional Repair).

### Key Disruptors
1.  **Light**: Seeing bright light between 10 PM and 4 AM suppresses dopamine and melatonin, ruining sleep structure.
2.  **Temperature**: Your core body temperature *must* drop by 1-3°F to initiate sleep.
3.  **Digestion**: Eating within 2-3 hours of bed keeps core temp high, blocking Deep Sleep.

### The Protocol
*   **Dim the World**: Turn off overhead lights 2 hours before bed.
*   **Cool Down**: Keep the room cool (65-68°F) or take a hot shower (the rapid cooling after helps).
*   **The Wind Down**: Create a ritual that signals safety to your nervous system.
`
  },
  "fascia-release": {
    id: "fascia-release",
    category: "Space Pillar",
    title: "Fascia Release",
    subtitle: "Hydrating Your Internal Web",
    content: `
### What is Fascia?
Fascia is the connective tissue web that wraps every muscle, bone, and organ. Think of it like a biological wetsuit. When it is healthy, it is fluid and sliding. When it is unhealthy, it is sticky and dried out ("fuzz").

### Why Release?
Static stretching pulls the muscle, but often ignores the fascia. **Myofascial Release** (rolling, pressure) hydrates the tissue. It squeezes "dirty" water out of the tissue like a sponge, allowing fresh, nutrient-rich fluid to rush back in.

### The Protocol
*   **Hydrate First**: Fascia is water-dependent.
*   **Go Slow**: You are melting ice, not breaking stone. Rapid rolling does nothing.
*   **Target Areas**: Feet (plantar), Glutes, and Thoracic Spine are high-yield areas for modern desk workers.
`
  },
  "zone-2-cardio": {
    id: "zone-2-cardio",
    category: "Space Pillar",
    title: "Zone 2 Cardio",
    subtitle: "The Engine of Longevity",
    content: `
### The Science
Zone 2 is the intensity where your body can barely maintain a conversation. In this zone, your cells are forced to burn **Fat** for fuel within the mitochondria.

### Why It Makes You Bonita
1.  **Metabolic Flexibility**: It teaches your body to burn fat efficiently, preventing energy crashes.
2.  **Mitochondrial Density**: It increases the number of "power plants" in your cells. More energy = more radiance.
3.  **Recovery**: It clears lactate and stress hormones.

### The Protocol
*   **The Talk Test**: You should be able to speak in full sentences, but you'd rather not. If you can sing, go harder. If you have to gasp, go slower.
*   **Dose**: 150-180 minutes per week is the gold standard for longevity.
`
  },
  "hydration": {
    id: "hydration",
    category: "Space Pillar",
    title: "True Hydration",
    subtitle: "Conducting Your Electricity",
    content: `
### Water + Electrolytes
You are a bio-electric being. Your neurons fire via electrical signals. Water alone does not conduct electricity well; it needs dissolved minerals (Electrolytes like Sodium, Potassium, Magnesium).

### The Cognitive Cost
Being just 2% dehydrated can degrade cognitive performance and focus by significantly more. Brain fog is often just dehydration.

### The Protocol
*   **Morning**: Start the day with 16oz of water + a pinch of sea salt (or electrolytes).
*   **The Ratio**: Aim for 0.5oz of water per pound of body weight daily.
*   **Sip, Don't Chug**: The body absorbs slow sipping better than rapid glugging.
`
  }
};