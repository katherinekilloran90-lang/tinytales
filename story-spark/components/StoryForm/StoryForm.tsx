"use client";

import { FormEvent, useState } from "react";
import { OptionGroup } from "@/components/OptionGroup/OptionGroup";
import {
  ageRangeOptions,
  illustrationStyleOptions,
  storyLengthOptions,
  storyStyleOptions,
} from "./options";
import type { StoryFormInput } from "@/lib/types";
import styles from "./StoryForm.module.css";

const IDEA_MAX_LENGTH = 300;
const NAME_MAX_LENGTH = 30;

interface StoryFormProps {
  onSubmit: (input: StoryFormInput) => void;
  disabled?: boolean;
  initialError?: string | null;
}

export function StoryForm({ onSubmit, disabled, initialError }: StoryFormProps) {
  const [idea, setIdea] = useState("");
  const [childName, setChildName] = useState("");
  const [ageRange, setAgeRange] = useState<StoryFormInput["ageRange"]>("6-8");
  const [storyStyle, setStoryStyle] = useState<StoryFormInput["storyStyle"]>("magical");
  const [illustrationStyle, setIllustrationStyle] =
    useState<StoryFormInput["illustrationStyle"]>("colorful-picture-book");
  const [storyLength, setStoryLength] = useState<StoryFormInput["storyLength"]>("standard");
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedIdea = idea.trim();
    if (trimmedIdea.length < 3) {
      setFormError("Tell us a little more about your story idea.");
      return;
    }
    setFormError(null);
    onSubmit({
      idea: trimmedIdea,
      childName: childName.trim() || undefined,
      ageRange,
      storyStyle,
      illustrationStyle,
      storyLength,
    });
  }

  const activeError = formError || initialError;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="idea" className={styles.label}>
          What should the story be about?
        </label>
        <textarea
          id="idea"
          className={styles.textarea}
          value={idea}
          onChange={(e) => setIdea(e.target.value.slice(0, IDEA_MAX_LENGTH))}
          maxLength={IDEA_MAX_LENGTH}
          rows={3}
          placeholder="A shy little dragon who is scared of flying, but discovers she's braver than she thinks…"
          required
          aria-describedby="idea-count"
          disabled={disabled}
        />
        <span id="idea-count" className={styles.charCount}>
          {idea.length}/{IDEA_MAX_LENGTH}
        </span>
      </div>

      <div className={styles.field}>
        <label htmlFor="childName" className={styles.label}>
          Child&apos;s first name <span className={styles.optional}>(optional)</span>
        </label>
        <input
          id="childName"
          type="text"
          className={styles.input}
          value={childName}
          onChange={(e) => setChildName(e.target.value.slice(0, NAME_MAX_LENGTH))}
          maxLength={NAME_MAX_LENGTH}
          placeholder="e.g. Amara"
          disabled={disabled}
        />
      </div>

      <OptionGroup
        legend="Age range"
        name="ageRange"
        options={ageRangeOptions}
        value={ageRange}
        onChange={setAgeRange}
        columns={3}
      />

      <OptionGroup
        legend="Story style"
        name="storyStyle"
        options={storyStyleOptions}
        value={storyStyle}
        onChange={setStoryStyle}
        columns={5}
      />

      <OptionGroup
        legend="Illustration style"
        name="illustrationStyle"
        options={illustrationStyleOptions}
        value={illustrationStyle}
        onChange={setIllustrationStyle}
        columns={4}
      />

      <OptionGroup
        legend="Story length"
        name="storyLength"
        options={storyLengthOptions}
        value={storyLength}
        onChange={setStoryLength}
        columns={2}
      />

      {activeError && (
        <p className={styles.error} role="alert">
          {activeError}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={disabled}>
        ✨ Create My Story
      </button>
    </form>
  );
}
