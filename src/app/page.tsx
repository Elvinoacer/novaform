"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useView } from "@/lib/useView";
import { Navigation } from "@/components/site/Navigation";
import { Footer } from "@/components/site/Footer";
import { LandingView } from "@/views/LandingView";
import { BrowseView } from "@/views/BrowseView";
import { HouseView } from "@/views/HouseView";
import { AboutView } from "@/views/AboutView";
import { ContactView } from "@/views/ContactView";

function Router() {
  const { view } = useView();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${view.view}-${view.houseSlug ?? view.category ?? ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            {view.view === "landing" && <LandingView />}
            {view.view === "browse" && <BrowseView />}
            {view.view === "house" && <HouseView slug={view.houseSlug!} />}
            {view.view === "about" && <AboutView />}
            {view.view === "contact" && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Router />
    </Suspense>
  );
}
