"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Sparkles,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  X,
  UploadCloud,
  Loader2,
  Check,
  ExternalLink,
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Clock,
} from "lucide-react";
import { useView } from "@/lib/useView";
import { cn } from "@/lib/utils";

type Tab = "designs" | "marquee" | "messages" | "assets";

interface DesignRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  hero: string;
}

interface MarqueeRow {
  id: string;
  text: string;
  icon: string | null;
  sortOrder: number;
  active: boolean;
}

interface MessageRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

interface AssetRow {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  category: string;
  createdAt: string;
}

export function AdminDashboardView() {
  const { navigate } = useView();
  const [tab, setTab] = useState<Tab>("designs");
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  // Verify session on mount — redirect to login if missing
  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((j) => {
        setAuthed(Boolean(j?.user?.email));
        setAuthChecked(true);
        if (!j?.user?.email) navigate({ view: "admin-login" });
      })
      .catch(() => {
        setAuthChecked(true);
        navigate({ view: "admin-login" });
      });
  }, [navigate]);

  const signOut = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ callbackUrl: "/?view=admin-login" }).toString(),
    });
    navigate({ view: "admin-login" });
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!authed) return null;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top bar */}
      <header className="bg-background border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="size-5 text-gold" strokeWidth={1.5} />
            <div>
              <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">
                Novaform
              </p>
              <p className="font-serif-display text-lg leading-tight">
                Admin Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate({ view: "landing" })}
              className="inline-flex items-center gap-2 text-[11px] tracking-wide-luxe uppercase text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.5} />
              View site
            </button>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 text-[11px] tracking-wide-luxe uppercase border border-border hover:bg-foreground/5 transition-colors px-4 py-2 rounded-full"
            >
              <LogOut className="size-3.5" strokeWidth={1.5} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-background border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex gap-2 overflow-x-auto hide-scrollbar">
          {([
            { id: "designs", label: "Designs", icon: Building2 },
            { id: "marquee", label: "Marquee", icon: Sparkles },
            { id: "messages", label: "Messages", icon: Mail },
            { id: "assets", label: "Assets", icon: UploadCloud },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-3.5 text-[12px] tracking-wide-luxe uppercase border-b-2 -mb-px transition-colors whitespace-nowrap",
                tab === t.id
                  ? "border-charcoal text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="size-4" strokeWidth={1.5} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-[1400px] mx-auto px-6 lg:px-10 py-10 w-full">
        {tab === "designs" && <DesignsTab />}
        {tab === "marquee" && <MarqueeTab />}
        {tab === "messages" && <MessagesTab />}
        {tab === "assets" && <AssetsTab />}
      </main>
    </div>
  );
}

/* =================== DESIGNS TAB =================== */
function DesignsTab() {
  const [designs, setDesigns] = useState<DesignRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DesignRow | null>(null);
  const [creating, setCreating] = useState(false);

  // New state for filtering, sorting, pagination
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset to page 1 when category or sort changes
  useEffect(() => {
    setPage(1);
  }, [category, sort]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        sort: sort,
      });
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (category !== "all") params.append("category", category);

      const r = await fetch(`/api/admin/designs?${params}`);
      const j = await r.json();
      setDesigns(j.designs ?? []);
      setTotalPages(j.totalPages ?? 1);
      setTotalItems(j.total ?? 0);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category, sort]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif-display text-3xl">Designs</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {totalItems} design{totalItems === 1 ? "" : "s"} found.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-full text-[11px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-colors"
        >
          <Plus className="size-4" strokeWidth={1.5} />
          New design
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-background border border-border rounded-md p-3 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-cream border border-border rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-foreground/50 transition-colors"
          />
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <SlidersHorizontal className="hidden sm:block size-4 text-muted-foreground" strokeWidth={1.5} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto bg-cream border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-foreground/50 transition-colors cursor-pointer appearance-none text-center sm:text-left"
            >
              <option value="all">All Categories</option>
              <option value="modern">Modern</option>
              <option value="luxury">Luxury</option>
              <option value="bungalows">Bungalows</option>
              <option value="maisonettes">Maisonettes</option>
              <option value="villas">Villas</option>
              <option value="small-homes">Small Homes</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Clock className="hidden sm:block size-4 text-muted-foreground" strokeWidth={1.5} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full sm:w-auto bg-cream border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-foreground/50 transition-colors cursor-pointer appearance-none text-center sm:text-left"
            >
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
              <option value="az">Name (A-Z)</option>
              <option value="za">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {loading && designs.length === 0 ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : designs.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center border border-border rounded-md border-dashed bg-background/50">
          <Search className="size-8 text-muted-foreground mb-3" strokeWidth={1} />
          <p className="text-foreground font-medium">No designs found.</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {designs.map((d) => (
              <motion.div
                key={d.id}
                layout
                className="bg-background rounded-md border border-border overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-muted">
                  <img src={d.hero} alt={d.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 flex gap-1">
                    {d.featured && (
                      <span className="bg-gold/90 text-charcoal text-[9px] tracking-wide-luxe uppercase px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                    {!d.published && (
                      <span className="bg-destructive/90 text-white text-[9px] tracking-wide-luxe uppercase px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-[10px] tracking-wide-luxe uppercase text-muted-foreground">
                    {d.category}
                  </p>
                  <h3 className="font-serif-display text-lg mt-1">{d.name}</h3>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    /{d.slug}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => setEditing(d)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 text-[11px] tracking-wide-luxe uppercase border border-border hover:bg-foreground/5 transition-colors py-2 rounded-full"
                    >
                      <Pencil className="size-3" strokeWidth={1.5} />
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete "${d.name}"? This cannot be undone.`)) return;
                        await fetch(`/api/admin/designs/${d.slug}`, { method: "DELETE" });
                        load();
                      }}
                      className="size-9 inline-flex items-center justify-center border border-border text-destructive hover:bg-destructive/10 transition-colors rounded-full"
                      aria-label="Delete design"
                    >
                      <Trash2 className="size-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="size-9 inline-flex items-center justify-center border border-border rounded-full hover:bg-foreground/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" strokeWidth={1.5} />
              </button>
              <span className="text-sm font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="size-9 inline-flex items-center justify-center border border-border rounded-full hover:bg-foreground/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </>
      )}

      {(editing || creating) && (
        <DesignEditor
          initial={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSaved={() => {
            setEditing(null);
            setCreating(false);
            load();
          }}
        />
      )}
    </div>
  );
}

function DesignEditor({
  initial,
  onClose,
  onSaved,
}: {
  initial: DesignRow | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    tagline: initial?.tagline ?? "",
    category: initial?.category ?? "modern",
    style: initial?.style ?? "Modern",
    bedrooms: initial?.bedrooms ?? 3,
    bathrooms: initial?.bathrooms ?? 2,
    stories: initial?.stories ?? 1,
    garage: initial?.garage ?? 1,
    area: initial?.area ?? 200,
    price: initial?.price ?? 150000,
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
    hero: initial?.hero ?? "",
    thumbnail: initial?.thumbnail ?? "",
    description: initial?.description ?? "",
  });
  const [images, setImages] = useState<
    { url: string; caption?: string; type?: string }[]
  >([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load existing images if editing
  useEffect(() => {
    if (!initial) return;
    fetch(`/api/admin/designs/${initial.slug}`)
      .then((r) => r.json())
      .then((j) => {
        if (j?.design?.images) {
          setImages(
            j.design.images.map((img: any) => ({
              url: img.url,
              caption: img.caption ?? "",
              type: img.type ?? "image",
            }))
          );
        }
        if (j?.design) {
          const d = j.design;
          setForm((f) => ({
            ...f,
            tagline: d.tagline ?? f.tagline,
            style: d.style ?? f.style,
            bedrooms: d.bedrooms ?? f.bedrooms,
            bathrooms: d.bathrooms ?? f.bathrooms,
            stories: d.stories ?? f.stories,
            garage: d.garage ?? f.garage,
            area: d.area ?? f.area,
            price: d.price ?? f.price,
            featured: d.featured ?? f.featured,
            published: d.published ?? f.published,
            hero: d.hero ?? f.hero,
            thumbnail: d.thumbnail ?? f.thumbnail,
            description: d.description ?? f.description,
          }));
        }
      })
      .catch(() => {});
  }, [initial]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      for (const f of Array.from(files)) fd.append("files", f);
      fd.append("category", "design");
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || "Upload failed");
      }
      const j = await r.json();
      const newImgs = (j.assets ?? []).map((a: any) => ({
        url: a.url,
        caption: "",
        type: a.mimeType?.startsWith("video") ? "video" : "image",
      }));
      setImages((cur) => [...cur, ...newImgs]);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        images,
        // Optional rich fields — defaults to empty
        story: [],
        highlights: [],
        specifications: [],
        floorPlans: [],
        exterior: [],
        interiors: {},
        videoTour: {},
      };
      const url = initial
        ? `/api/admin/designs/${initial.slug}`
        : "/api/admin/designs";
      const method = initial ? "PATCH" : "POST";
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || "Save failed");
      }
      onSaved();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-charcoal/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="bg-background w-full max-w-3xl max-h-[92vh] overflow-y-auto luxe-scrollbar rounded-t-2xl sm:rounded-2xl border border-border">
        <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h3 className="font-serif-display text-2xl">
            {initial ? "Edit design" : "New design"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-foreground/5"
            aria-label="Close editor"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Slug (URL)" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="aurora-residence" />
          </div>
          <Input label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Select
              label="Category"
              value={form.category}
              onChange={(v) => setForm({ ...form, category: v })}
              options={[
                "modern",
                "luxury",
                "bungalows",
                "maisonettes",
                "villas",
                "small-homes",
              ]}
            />
            <Input label="Style" value={form.style} onChange={(v) => setForm({ ...form, style: v })} />
            <Input label="Bedrooms" type="number" value={String(form.bedrooms)} onChange={(v) => setForm({ ...form, bedrooms: Number(v) })} />
            <Input label="Bathrooms" type="number" value={String(form.bathrooms)} onChange={(v) => setForm({ ...form, bathrooms: Number(v) })} />
            <Input label="Stories" type="number" value={String(form.stories)} onChange={(v) => setForm({ ...form, stories: Number(v) })} />
            <Input label="Garage" type="number" value={String(form.garage)} onChange={(v) => setForm({ ...form, garage: Number(v) })} />
            <Input label="Area (sqm)" type="number" value={String(form.area)} onChange={(v) => setForm({ ...form, area: Number(v) })} />
            <Input label="Price (USD)" type="number" value={String(form.price)} onChange={(v) => setForm({ ...form, price: Number(v) })} />
          </div>

          <Input label="Hero image URL" value={form.hero} onChange={(v) => setForm({ ...form, hero: v })} placeholder="https://…" />
          <Input label="Thumbnail URL" value={form.thumbnail} onChange={(v) => setForm({ ...form, thumbnail: v })} placeholder="https://…" />

          <div>
            <label className="block text-[11px] tracking-luxe uppercase text-muted-foreground mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm outline-none focus:border-foreground/50 transition-colors resize-none"
              placeholder="A short paragraph describing the design…"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="accent-charcoal"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="accent-charcoal"
              />
              Published
            </label>
          </div>

          {/* Gallery upload */}
          <div>
            <label className="block text-[11px] tracking-luxe uppercase text-muted-foreground mb-2">
              Gallery images (uploaded to Cloudflare R2)
            </label>
            <div className="border-2 border-dashed border-border rounded-md p-6 text-center hover:border-foreground/40 transition-colors">
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleUpload(e.target.files)}
                className="hidden"
                id="design-gallery-upload"
              />
              <label
                htmlFor="design-gallery-upload"
                className="cursor-pointer inline-flex flex-col items-center gap-2"
              >
                {uploading ? (
                  <Loader2 className="size-6 animate-spin text-gold" />
                ) : (
                  <UploadCloud className="size-6 text-gold" strokeWidth={1.5} />
                )}
                <span className="text-sm">
                  {uploading ? "Uploading…" : "Click to upload images / videos"}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Files are uploaded to your Cloudflare R2 bucket
                </span>
              </label>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-border group">
                    { }
                    <img src={img.url} alt={img.caption || `Image ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 size-6 rounded-full bg-charcoal/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="size-3" strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-border px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-[11px] tracking-wide-luxe uppercase border border-border hover:bg-foreground/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] tracking-wide-luxe uppercase bg-charcoal text-white hover:bg-charcoal/90 transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" strokeWidth={1.5} />}
            {saving ? "Saving…" : "Save design"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =================== MARQUEE TAB =================== */
function MarqueeTab() {
  const [items, setItems] = useState<MarqueeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState({ text: "", icon: "", sortOrder: 0 });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/marquee");
      const j = await r.json();
      setItems(j.items ?? []);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const add = async () => {
    if (!draft.text.trim()) return;
    await fetch("/api/admin/marquee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: draft.text,
        icon: draft.icon || null,
        sortOrder: draft.sortOrder,
      }),
    });
    setDraft({ text: "", icon: "", sortOrder: 0 });
    load();
  };

  const update = async (id: string, patch: Partial<MarqueeRow>) => {
    await fetch(`/api/admin/marquee/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    load();
  };

  const remove = async (id: string) => {
    await fetch(`/api/admin/marquee/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif-display text-3xl">Marquee items</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Items shown in the infinite scrolling marquee on the landing page.
        </p>
      </div>

      <div className="bg-background rounded-md border border-border p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
          <Input label="Text" value={draft.text} onChange={(v) => setDraft({ ...draft, text: v })} placeholder="Construction-ready plans" />
          <Input label="Icon (lucide)" value={draft.icon} onChange={(v) => setDraft({ ...draft, icon: v })} placeholder="CheckCircle2" />
          <Input label="Sort" type="number" value={String(draft.sortOrder)} onChange={(v) => setDraft({ ...draft, sortOrder: Number(v) })} />
          <button
            onClick={add}
            className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-3 rounded-full text-[11px] tracking-wide-luxe uppercase hover:bg-charcoal/90 transition-colors justify-center"
          >
            <Plus className="size-4" strokeWidth={1.5} />
            Add
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">No marquee items yet.</p>
      ) : (
        <div className="bg-background rounded-md border border-border divide-y divide-border">
          {items.map((m) => (
            <div key={m.id} className="flex items-center gap-3 px-4 py-3">
              <span className="text-[11px] text-muted-foreground w-8">#{m.sortOrder}</span>
              <span className="flex-1 font-serif-display text-lg">{m.text}</span>
              {m.icon && (
                <span className="text-[11px] tracking-wide-luxe uppercase text-muted-foreground">
                  {m.icon}
                </span>
              )}
              <label className="flex items-center gap-1.5 text-[11px] tracking-wide-luxe uppercase text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={m.active}
                  onChange={(e) => update(m.id, { active: e.target.checked })}
                  className="accent-charcoal"
                />
                {m.active ? "Active" : "Hidden"}
              </label>
              <button
                onClick={() => remove(m.id)}
                className="size-8 rounded-full hover:bg-destructive/10 text-destructive flex items-center justify-center"
                aria-label="Delete marquee item"
              >
                <Trash2 className="size-3.5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =================== MESSAGES TAB =================== */
function MessagesTab() {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<MessageRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/messages");
      const j = await r.json();
      setMessages(j.messages ?? []);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const markRead = async (m: MessageRow) => {
    setOpen(m);
    if (!m.read) {
      await fetch(`/api/admin/messages/${m.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      load();
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    setOpen(null);
    load();
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif-display text-3xl">Inbox</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {messages.length} message{messages.length === 1 ? "" : "s"} ·{" "}
          {messages.filter((m) => !m.read).length} unread
        </p>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          No messages yet. Submissions from the contact form will appear here.
        </p>
      ) : (
        <div className="bg-background rounded-md border border-border divide-y divide-border">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => markRead(m)}
              className={cn(
                "w-full text-left flex items-center gap-4 px-4 py-4 hover:bg-foreground/5 transition-colors",
                !m.read && "bg-cream/50"
              )}
            >
              <span
                className={cn(
                  "size-2 rounded-full flex-shrink-0",
                  m.read ? "bg-transparent" : "bg-gold"
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <p className="font-serif-display text-lg truncate">{m.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{m.email}</p>
                </div>
                <p className="text-sm text-foreground/80 truncate mt-0.5">
                  {m.subject}
                </p>
              </div>
              <span className="text-[11px] text-muted-foreground flex-shrink-0">
                {new Date(m.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-charcoal/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={() => setOpen(null)}
        >
          <div
            className="bg-background w-full max-w-lg max-h-[90vh] overflow-y-auto luxe-scrollbar rounded-t-2xl sm:rounded-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="font-serif-display text-xl">{open.subject}</h3>
              <button onClick={() => setOpen(null)} className="p-2 rounded-full hover:bg-foreground/5" aria-label="Close">
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-1">From</p>
                  <p>{open.name}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-1">Email</p>
                  <a href={`mailto:${open.email}`} className="text-gold hover:underline">
                    {open.email}
                  </a>
                </div>
                {open.phone && (
                  <div>
                    <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-1">Phone</p>
                    <p>{open.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-1">Received</p>
                  <p>{new Date(open.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">Message</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{open.message}</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-3">
              <a
                href={`mailto:${open.email}?subject=Re: ${encodeURIComponent(open.subject)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] tracking-wide-luxe uppercase bg-charcoal text-white hover:bg-charcoal/90 transition-colors"
              >
                <Mail className="size-3.5" strokeWidth={1.5} />
                Reply
              </a>
              <button
                onClick={() => remove(open.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] tracking-wide-luxe uppercase border border-border text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="size-3.5" strokeWidth={1.5} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =================== ASSETS TAB =================== */
function AssetsTab() {
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Reuse the designs list endpoint? No — fetch assets via a tiny inline endpoint.
      // We didn't create one, so use Prisma via /api/admin/designs list... use a direct fetch.
      const r = await fetch("/api/admin/assets");
      if (r.ok) {
        const j = await r.json();
        setAssets(j.assets ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      for (const f of Array.from(files)) fd.append("files", f);
      fd.append("category", "misc");
      await fetch("/api/admin/upload", { method: "POST", body: fd });
      load();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif-display text-3xl">Media Assets</h2>
          <p className="text-sm text-muted-foreground mt-1">
            All files uploaded to Cloudflare R2.
          </p>
        </div>
      </div>

      <div className="border-2 border-dashed border-border rounded-md p-8 mb-6 text-center hover:border-foreground/40 transition-colors">
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,video/*,application/pdf"
          onChange={(e) => handleUpload(e.target.files)}
          className="hidden"
          id="assets-upload"
        />
        <label htmlFor="assets-upload" className="cursor-pointer inline-flex flex-col items-center gap-2">
          {uploading ? (
            <Loader2 className="size-6 animate-spin text-gold" />
          ) : (
            <UploadCloud className="size-6 text-gold" strokeWidth={1.5} />
          )}
          <span className="text-sm">
            {uploading ? "Uploading…" : "Upload files to Cloudflare R2"}
          </span>
        </label>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : assets.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          No assets uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {assets.map((a) => (
            <div key={a.id} className="bg-background rounded-md border border-border overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                {a.mimeType.startsWith("image") ? (
                   
                  <img src={a.url} alt={a.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-[11px] text-muted-foreground p-4 text-center">
                    {a.mimeType}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[12px] truncate">{a.filename}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {(a.size / 1024).toFixed(0)} KB
                </p>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[10px] tracking-wide-luxe uppercase text-gold hover:underline"
                >
                  Open
                  <ExternalLink className="size-3" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =================== Shared form primitives =================== */
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-foreground/50 transition-colors"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-luxe uppercase text-muted-foreground mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-foreground/50 transition-colors cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
