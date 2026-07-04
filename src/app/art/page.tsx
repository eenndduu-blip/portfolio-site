import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RomeStudyIntro } from "@/components/RomeStudyIntro";
import { RomeStudySection, type RomeStudy } from "@/components/RomeStudySection";
import { VeniceHero } from "@/components/VeniceHero";
import { PorticoDescriptionNote } from "@/components/PorticoDescriptionNote";
import { PompeiiHero } from "@/components/PompeiiHero";

const venice: RomeStudy = {
  slug: "venice",
  number: "01",
  title: "Venice.",
  subtitle: "Beginning of the program",
  meta: "Watercolor Study · Venice, IT · 2026",
  watercolor: "/art/rome/rome-05.png",
  paragraphs: [
    "Venice was the first place where I met the class after long hours of travel, flights, delays, and plenty of drama. We arrived in the middle of the night, and the city was quiet in a way I had never experienced before — no cars, no traffic, only the sound of our luggage across cobblestone streets and bridges.",
    "The next morning changed everything. I saw a woman open her window toward the canal and sit for breakfast by the water. That simple scene stayed with me. It made me wonder what it means to live in a city where the street is water — where boats replace cars and daily life happens beside canals, old walls, and quiet reflections.",
    "Venice taught me that architecture is not only seen through monuments. It is felt through arrival, exhaustion, water, food, friendship, silence, and morning light.",
  ],
};

const houseInCivita: RomeStudy = {
  slug: "house-in-civita",
  number: "02",
  title: "A House in Civita.",
  meta: "Watercolor Study · Civita di Bagnoregio, IT · 2026",
  watercolor: "/art/hero-house-civita.png",
  paragraphs: [
    "For this watercolor, I focused on a small house in Civita di Bagnoregio. It was not a famous monument or a grand building, but that is what made it meaningful to me. The house felt quiet, simple, and deeply connected to the town. Its white wall, wooden door, small window, tiled roof, and bare tree created a calm scene that showed the everyday beauty of Civita.",
    "What I liked most was the stillness of the place. The house looked ordinary, but it carried the feeling of time. The worn stone near the ground, the old roof tiles, and the texture of the door made me think about how people have lived in this hilltop town for generations. Civita's beauty is not only in its dramatic view from the bridge or its position on the cliff — it is also in these small domestic moments.",
    "Painting this house helped me slow down and notice details I might have missed. Through watercolor, I tried to capture the softness of the wall, the shadow of the tree, and the quiet atmosphere of the street. This small house reminded me that architecture does not always need to be monumental to be powerful. Sometimes, a simple doorway, a window, and a tree can tell the story of a place.",
  ],
};

const civita: RomeStudy = {
  slug: "civita",
  number: "03",
  title: "Civita.",
  subtitle: "Civita di Bagnoregio",
  meta: "Watercolor Study · Civita di Bagnoregio, IT · 2026",
  watercolor: "/art/civita-featured.png",
  aspect: "aspect-[3/2]",
  paragraphs: [
    "Standing at the edge of Civita di Bagnoregio, I understood why hill towns carry such strong architectural imagination. The city does not simply sit on the landscape; it rises out of it. From a distance, Civita looks almost impossible — a small stone settlement balanced on a hilltop, surrounded by valleys, cliffs, and erosion.",
    "What struck me first was the city's isolation. Civita is connected only by a narrow pedestrian bridge, which makes arrival slow and intentional. In Rome, historical layers are often hidden inside dense streets and crowded piazzas; in Civita the layers are exposed through the cliff itself. The town feels like a fragment of history still holding on to the edge of the earth.",
    "This visit also became meaningful because of Astra Zarina's legacy. Through 'Rome and the Teacher,' I understood that the UW Architecture in Rome program was not only about studying old buildings, but about learning how to see — walking, observing, drawing, eating, listening, and living with architecture.",
    "My watercolor tried to hold onto that feeling. Watercolor felt right because Civita itself feels delicate. The soft washes captured the hills, warm stone, bridge, and distance better than a technical drawing could. Painting forced me to slow down and look carefully. Through watercolor, I was not just recording the city — I was learning how it felt.",
  ],
};

const piazzaDelPopolo: RomeStudy = {
  slug: "piazza-del-popolo",
  number: "04",
  title: "Piazza del Popolo.",
  meta: "Watercolor Study · Rome, IT · 2026",
  watercolor: "/art/rome/rome-11.png",
  paragraphs: [
    "Piazza del Popolo was one of the places in Rome where I clearly felt the power of urban space. Standing there, I could feel Rome opening in different directions — the streets, the twin churches, the obelisk, the fountains, and the large open ground all worked together to create a space of arrival, orientation, and memory.",
    "For my watercolor, I focused on the obelisk standing between the twin churches, with people moving across the open ground. This view showed Rome as a city of layers — ancient, Christian, Renaissance, Baroque, and modern life all occupying the same space.",
    "The piazza taught me that public space is powerful when it gives people both direction and freedom. It is carefully organized, but it does not feel closed. It allows movement, gathering, ceremony, and everyday life to happen together.",
  ],
};

const paestum: RomeStudy = {
  slug: "paestum",
  number: "05",
  title: "Paestum.",
  meta: "Watercolor Study · Paestum, IT · 2026",
  watercolor: "/art/rome/rome-15.png",
  paragraphs: [
    "Paestum was one of the quietest and most powerful places we visited. Unlike Rome, where history is surrounded by streets, crowds, and buildings, Paestum felt open and calm. The temples stood alone in the landscape, surrounded by grass, trees, mountains, and sky.",
    "For my watercolor, I focused on one of the temples framed by trees. I liked the contrast between the heavy stone columns and the soft branches around them. It showed me that architecture does not need to be complicated to be meaningful — sometimes simple elements like stone, shadow, proportion, and repetition can create a strong experience.",
    "Paestum taught me that architecture, landscape, food, and memory are all connected. The temples showed strength and history, while the farmhouse dinner showed hospitality and living tradition.",
  ],
};

const amalfi: RomeStudy = {
  slug: "amalfi-coast",
  number: "06",
  title: "Amalfi Coast.",
  meta: "Watercolor Study · Amalfi, IT · 2026",
  watercolor: "/art/rome/rome-17.png",
  aspect: "aspect-[3/2]",
  paragraphs: [
    "I made this watercolor from a mountain lemon grove overlooking the Mediterranean. From this high point, the view opened in every direction — rows of lemon trees in the foreground, houses climbing along the hills, steep cliffs dropping toward the coast, and the blue sea stretching far into the distance.",
    "The Amalfi Coast felt like a place where nature and architecture are completely connected. The houses on the hills did not feel randomly placed; they looked as if they were carved into the mountain, layered one above another, following the shape of the land.",
    "Through this watercolor, I wanted to capture more than a view. I wanted to remember the feeling of Amalfi: the lemon trees, the hillside houses, the Mediterranean, and the way the whole place felt alive between land, water, and culture.",
  ],
};

const cornerStone: RomeStudy = {
  slug: "the-corner-stone",
  number: "07",
  title: "The Corner Stone.",
  meta: "Watercolor Study · Rome, IT · 2026",
  watercolor: "/art/rome/rome-19.png",
  paragraphs: [
    "This watercolor connects to the idea of palimpsest in Roman architecture, where one layer of history is built over another. In Rome, buildings are never only physical structures; they carry memory, power, faith, and transformation.",
    "The large arch in the drawing becomes a symbol of this layered history. Architecturally, the arch represents Roman engineering, strength, and order. Spiritually, it becomes a frame for gathering, worship, and belief. The people seated beneath it suggest a community formed inside the ruins of the past.",
    "Through this watercolor, I wanted to show Rome as both a physical and spiritual palimpsest. The architecture holds the weight of empire, but also the quiet presence of faith.",
  ],
};

const laterStudies = [piazzaDelPopolo, paestum, amalfi, cornerStone];

export default function ArtPage() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={
        {
          "--color-bg": "#ffffff",
          "--color-fg": "#0f0f0f",
          "--color-muted": "#6b6b6b",
          "--color-border": "rgba(15, 15, 15, 0.10)",
          background: "#ffffff",
          color: "#0f0f0f",
        } as React.CSSProperties
      }
    >
      <Nav />
      <main className="flex-1 overflow-x-clip">
        <RomeStudyIntro />

        <RomeStudySection study={venice} index={0} />

        <VeniceHero />

        <PorticoDescriptionNote />

        <RomeStudySection study={houseInCivita} index={1} />

        <RomeStudySection study={civita} index={2} />

        <PompeiiHero />

        {laterStudies.map((study, i) => (
          <RomeStudySection key={study.slug} study={study} index={i + 3} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
