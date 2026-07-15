"use client";

import styles from "./ProgressExperience.module.css";

export const PROGRESS_STEPS = [
  "Dreaming up your characters",
  "Writing your story",
  "Painting your illustrations",
  "Binding your book",
] as const;

interface ProgressExperienceProps {
  activeStep: number; // 0-based index into PROGRESS_STEPS
}

export function ProgressExperience({ activeStep }: ProgressExperienceProps) {
  const currentLabel = PROGRESS_STEPS[Math.min(activeStep, PROGRESS_STEPS.length - 1)];

  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true">
        <span className={styles.sparkle}>✨</span>
      </div>
      <ol className={styles.list}>
        {PROGRESS_STEPS.map((step, index) => {
          const state =
            index < activeStep ? "done" : index === activeStep ? "active" : "upcoming";
          return (
            <li key={step} className={`${styles.item} ${styles[state]}`}>
              <span className={styles.marker} aria-hidden="true">
                {state === "done" ? "✓" : index + 1}
              </span>
              <span>{step}</span>
            </li>
          );
        })}
      </ol>
      <span className="visually-hidden">{currentLabel}</span>
    </div>
  );
}
