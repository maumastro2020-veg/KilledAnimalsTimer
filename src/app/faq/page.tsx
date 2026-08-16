import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vegan FAQ",
};

const FAQ_CATEGORIES = [
  {
    category: "Nutrition & Health",
    items: [
      {
        q: "Where do you get your protein?",
        a: "From the same place the animals you'd otherwise eat get theirs: plants. Beans, lentils, tofu, tempeh, seitan, and whole grains all provide plenty of protein, and most people — vegan or not — already get more protein than they need.",
      },
      {
        q: "What about B12?",
        a: "B12 is made by bacteria, not plants or animals — farmed animals get it from supplemented feed or fortified water. Vegans get it the same way, directly, through a supplement or fortified foods. It's cheap, effective, and worth taking seriously.",
      },
      {
        q: "Is a vegan diet safe for kids, or during pregnancy?",
        a: "Major health bodies, including the Academy of Nutrition and Dietetics and the British Dietetic Association, say a well-planned vegan diet is appropriate for every stage of life, including pregnancy, infancy, and childhood. \"Well-planned\" is the key phrase — as with any diet.",
      },
      {
        q: "Don't you need meat to be strong or healthy?",
        a: "Some of the strongest athletes in the world — in strength sports, endurance sports, and everything between — are vegan. Strength comes from training and adequate calories and protein, not from a specific food group.",
      },
    ],
  },
  {
    category: "Ethics & Philosophy",
    items: [
      {
        q: "Don't plants feel pain too?",
        a: "Plants don't have a nervous system, brain, or pain receptors — there's no evidence they experience suffering. And even if they did, eating plants directly is more efficient than feeding plants to animals and eating the animals: it takes several kilograms of plant feed to produce one kilogram of meat.",
      },
      {
        q: "Isn't eating meat natural?",
        a: "Lots of things are \"natural\" that we don't treat as automatically justified. What matters more is whether an action is necessary — and for most people today, with plant-based options widely available, eating animals isn't necessary for survival or health.",
      },
      {
        q: "What about lions and other predators — they eat meat?",
        a: "Obligate carnivores have no moral choice; they can't survive without meat. Humans can thrive without harming animals, and most humans also don't apply animal behavior as a moral standard anywhere else in life.",
      },
      {
        q: "Isn't this just a personal choice?",
        a: "It's personal in the sense that you're the one making it, but it isn't private in the way a taste preference is — it involves another being with the capacity to suffer. That's the same reason we don't treat most decisions that affect others purely as \"personal.\"",
      },
    ],
  },
  {
    category: "Environment",
    items: [
      {
        q: "How much of an environmental impact does eating meat really have?",
        a: "Animal agriculture uses roughly 80% of the world's farmland while producing less than 20% of the world's calories, and it's a major driver of deforestation, water use, and greenhouse gas emissions. Shifting toward plants is one of the highest-leverage changes an individual can make.",
      },
      {
        q: "Isn't \"sustainable\" or \"local\" meat a better alternative?",
        a: "It can reduce some impacts, like transport emissions, but it doesn't remove the core issues of land use, water use, and animal death. Plant-based food — local or not — has a smaller footprint on nearly every measure.",
      },
    ],
  },
  {
    category: "Practical & Social",
    items: [
      {
        q: "Isn't vegan food expensive?",
        a: "The staples — rice, beans, lentils, oats, seasonal vegetables — are some of the cheapest foods available. Cost goes up if you replace every meal with premium vegan meat substitutes, but that's optional, not required.",
      },
      {
        q: "How do I eat out or travel as a vegan?",
        a: "It's easier every year — most cuisines have naturally vegan dishes (think Thai, Indian, Mexican, Middle Eastern), and apps like HappyCow make finding vegan-friendly spots simple almost anywhere.",
      },
      {
        q: "My family or friends don't support it — what do I do?",
        a: "Lead with your reasons, not judgment of theirs, and give it time — most people need repeated, low-pressure exposure before a change like this makes sense to them. Cooking a meal they genuinely enjoy tends to do more than any argument.",
      },
      {
        q: "I'm not ready to go 100% vegan — where do I start?",
        a: "Start with what's easiest to swap — your milk, your usual breakfast, one meal a day — and build from there. Progress compounds, and imperfect vegans still spare far more animals than perfect intentions that never start.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            Vegan FAQ
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Straight answers to the questions that come up most in real conversations.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {FAQ_CATEGORIES.map((category) => (
            <section key={category.category} className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-500">
                {category.category}
              </h2>
              <div className="flex flex-col divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
                {category.items.map((item) => (
                  <details key={item.q} className="group px-4 py-3 open:pb-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-zinc-950 marker:content-none dark:text-zinc-50">
                      {item.q}
                      <span className="shrink-0 text-zinc-400 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
