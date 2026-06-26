"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote, Award, Compass, Ruler, PenTool } from "lucide-react";
import { useView } from "@/lib/useView";
import { HOUSES } from "@/lib/data";

export function AboutView() {
  const { navigate } = useView();

  const stats = [
    { value: "100+", label: "Designs in catalog" },
    { value: "15", label: "Years of practice" },
    { value: "8", label: "Countries built in" },
    { value: "94%", label: "Client retention" },
  ];

  const principles = [
    { icon: PenTool, title: "Design first.", desc: "Every plan starts as an architectural question — not a square-metre calculation. We draw until the section is right, then we dimension." },
    { icon: Ruler, title: "Detail completely.", desc: "Foundations, structure, electrical, plumbing, joinery. The brochure is the building, drawn one-to-one. Nothing left to interpretation." },
    { icon: Compass, title: "Site-adaptable.", desc: "Each plan can be mirrored, stretched, rotated or stepped to fit your plot without losing its proportions or its planning logic." },
    { icon: Award, title: "Built to last.", desc: "We specify materials and assemblies that age gracefully. The house should look better in year ten than it did in year one." },
  ];

  return (
    <div className="bg-background pt-28 lg:pt-36">
      {/* Hero */}
      <section className="px-6 lg:px-10 max-w-[1400px] mx-auto pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] tracking-luxe uppercase text-gold mb-5">
            About Maison
          </p>
          <h1 className="font-serif-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] tracking-tight max-w-[14ch]">
            We draw houses we would live in.
          </h1>
          <p className="mt-8 text-lg text-foreground/70 max-w-2xl leading-relaxed">
            Maison is a small architectural studio that designs and publishes
            construction-ready house plans. We are not a plan-mill. Every design
            in our catalog has been drawn, detailed and reviewed by a licensed
            architect — and most have been built at least once.
          </p>
        </motion.div>
      </section>

      {/* Hero image */}
      <section className="relative h-[60svh] min-h-[420px] w-full overflow-hidden bg-charcoal">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={HOUSES[4].hero}
            alt="Maison studio"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/30" />
        </motion.div>
        <div className="absolute bottom-0 inset-x-0 p-8 lg:p-12">
          <p className="font-display text-white text-2xl lg:text-3xl italic max-w-2xl leading-snug">
            &ldquo;A good house is not the one with the most features.
            It&apos;s the one you don&apos;t want to leave.&rdquo;
          </p>
          <p className="mt-3 text-[11px] tracking-luxe uppercase text-white/60">
            — Studio note, 2019
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif-display text-[clamp(3rem,6vw,5rem)] leading-none text-gold-gradient">
                {s.value}
              </p>
              <p className="mt-3 text-[11px] tracking-luxe uppercase text-muted-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mb-14 lg:mb-20"
          >
            <p className="text-[11px] tracking-luxe uppercase text-gold mb-4">
              Working Principles
            </p>
            <h2 className="font-serif-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight tracking-tight">
              Four things we
              <br />
              refuse to compromise.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-5"
                >
                  <div className="size-12 rounded-full bg-charcoal text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="size-5" strokeWidth={1.25} />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-2xl mb-2.5">{p.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 px-6 lg:px-10 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14 lg:mb-20"
        >
          <p className="text-[11px] tracking-luxe uppercase text-gold mb-4">
            How it Works
          </p>
          <h2 className="font-serif-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight tracking-tight">
            From brochure to keys.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/60 rounded-md overflow-hidden">
          {[
            { n: "01", title: "Discover", desc: "Browse the catalog. Save designs. Refine what you respond to." },
            { n: "02", title: "Request", desc: "Pick a plan. Tell us about your site, budget and timeline." },
            { n: "03", title: "Adapt", desc: "We tailor the drawings to your plot — orientation, levels, materials." },
            { n: "04", title: "Build", desc: "Take the construction set to your builder. We are on call throughout." },
          ].map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-8 lg:p-10"
            >
              <p className="font-serif-display text-3xl text-gold mb-4">{step.n}</p>
              <h3 className="font-serif-display text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 lg:py-28 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Quote className="size-10 text-gold mx-auto mb-8" strokeWidth={1} />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic text-3xl lg:text-4xl leading-[1.3] text-white/90"
          >
            The most satisfying part of our practice is hearing from a family
            three years after they moved in — that the house still works.
          </motion.p>
          <p className="mt-8 text-[11px] tracking-luxe uppercase text-white/50">
            Maison Studio · Principal Architect
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif-display text-[clamp(2.25rem,6vw,5rem)] leading-[1] tracking-tight max-w-3xl mx-auto">
            Browse the catalog.
          </h2>
          <p className="mt-5 text-foreground/70 max-w-xl mx-auto">
            Over 100 architectural designs, all construction-ready.
          </p>
          <button
            onClick={() => navigate({ view: "browse" })}
            className="group mt-9 inline-flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-all hover:gap-4"
          >
            Explore Designs
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </button>
        </motion.div>
      </section>
    </div>
  );
}
