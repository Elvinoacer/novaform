"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CategorySlug, View } from "./types";

/**
 * Lightweight client-side view router. Keeps everything on the `/` route
 * (per sandbox constraint) but mirrors URL state via query params so links
 * are shareable and the browser back button works.
 *
 * Examples:
 *   ?view=browse                  Browse all
 *   ?view=browse&category=luxury  Browse filtered to a category
 *   ?view=house&slug=aurora       House details
 *   ?view=about                   About
 *   ?view=contact                 Contact
 */
export function useView() {
  const router = useRouter();
  const params = useSearchParams();

  const view = useMemo<View>(() => {
    const v = (params.get("view") as View["view"]) ?? "landing";
    return {
      view: v,
      houseSlug: params.get("slug") ?? undefined,
      category:
        (params.get("category") as CategorySlug | null) ?? undefined,
    };
  }, [params]);

  const navigate = useCallback(
    (next: Partial<View>) => {
      const merged: View = { ...view, ...next, view: next.view ?? view.view };
      const sp = new URLSearchParams();
      sp.set("view", merged.view);
      if (merged.houseSlug) sp.set("slug", merged.houseSlug);
      if (merged.category) sp.set("category", merged.category);
      const qs = sp.toString();
      // Reset scroll on navigation
      window.scrollTo({ top: 0, behavior: "auto" });
      router.push(qs ? `/?${qs}` : "/", { scroll: false });
    },
    [router, view]
  );

  return { view, navigate };
}
