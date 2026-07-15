"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageTarget, StoryResponse } from "@/lib/types";
import { ImagePlate } from "./ImagePlate";
import { slotKey } from "./types";
import type { ImageSlotMap } from "./types";
import styles from "./StorybookReader.module.css";

interface StorybookReaderProps {
  story: StoryResponse;
  images: ImageSlotMap;
  onRegenerate: (target: ImageTarget) => void;
  onCreateAnother: () => void;
}

/** index 0 = cover, index 1..N = story pages */
export function StorybookReader({
  story,
  images,
  onRegenerate,
  onCreateAnother,
}: StorybookReaderProps) {
  const totalScreens = story.pages.length + 1;
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (next: number) => {
    setIndex(Math.max(0, Math.min(totalScreens - 1, next)));
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, totalScreens]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    const SWIPE_THRESHOLD = 50;
    if (delta > SWIPE_THRESHOLD) goTo(index - 1);
    else if (delta < -SWIPE_THRESHOLD) goTo(index + 1);
    touchStartX.current = null;
  }

  const isCover = index === 0;
  const currentPage = isCover ? null : story.pages[index - 1] ?? null;
  const currentTarget: ImageTarget = currentPage ? currentPage.pageNumber : "cover";
  const currentImage = images[slotKey(currentTarget)] ?? { status: "loading" as const };

  return (
    <section className={styles.reader} aria-label={`${story.title} storybook`}>
      <div
        className={styles.stage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ImagePlate
          state={currentImage}
          alt={
            isCover
              ? `Cover illustration for ${story.title}`
              : `Illustration for page ${currentTarget} of ${story.title}`
          }
          onRetry={() => onRegenerate(currentTarget)}
        />

        <div className={styles.textPanel}>
          {isCover ? (
            <>
              <h1 className={styles.title}>{story.title}</h1>
              <p className={styles.subtitle}>{story.subtitle}</p>
            </>
          ) : (
            <p className={styles.pageText}>{currentPage?.text}</p>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous page"
        >
          ← Previous
        </button>

        <span className={styles.pageIndicator} aria-live="polite">
          {isCover ? "Cover" : `Page ${currentTarget} of ${story.pages.length}`}
        </span>

        <button
          type="button"
          className={styles.navButton}
          onClick={() => goTo(index + 1)}
          disabled={index === totalScreens - 1}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>

      {currentImage.status === "success" && (
        <div className={styles.secondaryActions}>
          <button
            type="button"
            className={styles.regenerateButton}
            onClick={() => onRegenerate(currentTarget)}
          >
            🎨 Regenerate this illustration
          </button>
        </div>
      )}

      <div className={styles.footer}>
        <button type="button" className={styles.createAnotherButton} onClick={onCreateAnother}>
          Create Another Story
        </button>
      </div>
    </section>
  );
}
