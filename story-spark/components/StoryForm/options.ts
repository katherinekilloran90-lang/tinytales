import {
  AgeRange,
  IllustrationStyle,
  StoryLength,
  StoryStyle,
} from "@/lib/types";

export const ageRangeOptions: { value: AgeRange; label: string; hint: string }[] = [
  { value: "3-5", label: "3–5 years", hint: "Very short & simple" },
  { value: "6-8", label: "6–8 years", hint: "Clear story arc" },
  { value: "9-11", label: "9–11 years", hint: "Richer language" },
];

export const storyStyleOptions: { value: StoryStyle; label: string; hint: string }[] = [
  { value: "bedtime", label: "Bedtime", hint: "Soft & sleepy" },
  { value: "funny", label: "Funny", hint: "Silly & playful" },
  { value: "adventure", label: "Adventure", hint: "Exciting quest" },
  { value: "magical", label: "Magical", hint: "Wonder & whimsy" },
  { value: "educational", label: "Educational", hint: "A gentle lesson" },
];

export const illustrationStyleOptions: {
  value: IllustrationStyle;
  label: string;
  hint: string;
}[] = [
  { value: "soft-watercolor", label: "Soft Watercolour", hint: "Gentle, dreamy washes" },
  { value: "colorful-picture-book", label: "Colourful Picture Book", hint: "Bold & bright" },
  { value: "paper-collage", label: "Paper Collage", hint: "Textured cut-paper" },
  { value: "magical-3d", label: "Magical 3D", hint: "Soft rounded charm" },
];

export const storyLengthOptions: { value: StoryLength; label: string; hint: string }[] = [
  { value: "short", label: "Short", hint: "4 quick pages" },
  { value: "standard", label: "Standard", hint: "4 fuller pages" },
];
