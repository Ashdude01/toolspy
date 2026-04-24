"use client";

import { useEffect, useRef } from "react";
import {
  peekToolImageHandoff,
  removeToolImageHandoff,
  TOOLSPY_HANDOFF_QUERY,
  stripHandoffFromUrl,
} from "@/lib/toolspy-image-handoff";

/**
 * On mount, if URL contains `?toolspy_handoff=<id>`, loads the blob from IndexedDB,
 * strips the query param, and passes a File to `onReceive`.
 */
export function useToolImageHandoffImport(onReceive: (files: File[]) => void) {
  const onReceiveRef = useRef(onReceive);
  onReceiveRef.current = onReceive;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const raw = sp.get(TOOLSPY_HANDOFF_QUERY);
    if (!raw) return;

    let cancelled = false;

    const id = decodeURIComponent(raw);

    void (async () => {
      try {
        const entry = await peekToolImageHandoff(id);
        if (cancelled) return;
        stripHandoffFromUrl();
        if (!entry?.blob) {
          await removeToolImageHandoff(id);
          return;
        }
        const type = entry.blob.type || "image/png";
        const file = new File([entry.blob], entry.filename, { type });
        onReceiveRef.current([file]);
        await removeToolImageHandoff(id);
      } catch {
        if (!cancelled) stripHandoffFromUrl();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);
}
