"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Check, Send } from "lucide-react";
import { useView } from "@/lib/useView";
import { HOUSES } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ContactView() {
  const { navigate, view } = useView();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: view.houseSlug ?? "",
    message: "",
  });

  const setField = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-background pt-28 lg:pt-36 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16 lg:mb-24"
        >
          <p className="text-[11px] tracking-luxe uppercase text-gold mb-5">
            Talk to the Studio
          </p>
          <h1 className="font-serif-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] tracking-tight">
            Let&apos;s draw
            <br />
            your house.
          </h1>
          <p className="mt-8 text-lg text-foreground/70 max-w-2xl leading-relaxed">
            Tell us what you are building, where, and when. We will come back
            within one working day with a tailored response — a brochure,
            sample sheets, and a no-obligation quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="border border-border/70 rounded-md p-10 lg:p-14 bg-cream"
              >
                <div className="size-14 rounded-full bg-gold/15 flex items-center justify-center mb-6">
                  <Check className="size-6 text-gold" strokeWidth={2} />
                </div>
                <h2 className="font-serif-display text-3xl lg:text-4xl mb-4">
                  Message received.
                </h2>
                <p className="text-foreground/70 leading-relaxed max-w-md">
                  Thank you, {form.name || "friend"}. We have your request and
                  will come back to you within one working day. In the meantime,
                  keep browsing.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate({ view: "browse" })}
                    className="group inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full text-[11px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-all hover:gap-3"
                  >
                    Keep Browsing
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", interest: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full text-[11px] tracking-wide-luxe uppercase hover:bg-foreground/5 transition-colors"
                  >
                    Send another
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleSubmit}
                className="space-y-7"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <Field
                    label="Your name"
                    required
                    value={form.name}
                    onChange={(v) => setField("name", v)}
                    placeholder="Jane Doe"
                  />
                  <Field
                    label="Email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(v) => setField("email", v)}
                    placeholder="jane@email.com"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <Field
                    label="Phone (optional)"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setField("phone", v)}
                    placeholder="+254 700 000 000"
                  />
                  <div>
                    <Label>Design of interest</Label>
                    <select
                      value={form.interest}
                      onChange={(e) => setField("interest", e.target.value)}
                      className="w-full bg-background border border-border rounded-md px-4 py-3.5 text-sm outline-none focus:border-foreground/50 transition-colors cursor-pointer"
                    >
                      <option value="">Just exploring</option>
                      {HOUSES.map((h) => (
                        <option key={h.slug} value={h.slug}>
                          {h.name} — {h.style}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Tell us about your project</Label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    rows={5}
                    placeholder="Plot size, location, budget range, timeline, anything else…"
                    className="w-full bg-background border border-border rounded-md px-4 py-3.5 text-sm outline-none focus:border-foreground/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-[11px] tracking-wide-luxe uppercase text-muted-foreground max-w-xs">
                    We respond within one working day.
                  </p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-full text-[12px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-all hover:gap-4"
                  >
                    Send Request
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                  </button>
                </div>
              </motion.form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 lg:pl-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="border border-border/70 rounded-md p-8 bg-cream">
                <p className="text-[11px] tracking-luxe uppercase text-gold mb-4">
                  Direct Lines
                </p>
                <div className="space-y-4">
                  <ContactItem icon={<Mail className="size-4" strokeWidth={1.5} />} label="Email" value="studio@maison.house" />
                  <ContactItem icon={<Phone className="size-4" strokeWidth={1.5} />} label="Phone" value="+254 700 000 000" />
                  <ContactItem icon={<MapPin className="size-4" strokeWidth={1.5} />} label="Studio" value="9th Floor, Riverside Drive, Nairobi" />
                </div>
              </div>

              <div>
                <p className="text-[11px] tracking-luxe uppercase text-gold mb-4">
                  Office Hours
                </p>
                <p className="font-serif-display text-2xl leading-tight">
                  Monday — Friday
                  <br />
                  9:00 — 18:00 EAT
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Saturdays by appointment.
                </p>
              </div>

              <div className="pt-8 border-t border-border/60">
                <p className="text-[11px] tracking-luxe uppercase text-gold mb-4">
                  Before you reach out
                </p>
                <ul className="space-y-3 text-sm text-foreground/75">
                  {[
                    "Plot size and orientation",
                    "Approximate budget range",
                    "Family size and must-have rooms",
                    "Target move-in date",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="size-4 text-gold mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] tracking-luxe uppercase text-muted-foreground mb-2.5">
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-background border border-border rounded-md px-4 py-3.5 text-sm outline-none focus:border-foreground/50 transition-colors"
      />
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-9 rounded-full border border-border flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}
