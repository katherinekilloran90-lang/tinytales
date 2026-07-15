"use client";

import styles from "./OptionGroup.module.css";

export interface Option<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

interface OptionGroupProps<T extends string> {
  legend: string;
  name: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  columns?: number;
}

/** An accessible card-style radio group: real radio inputs under the hood
 *  (so screen readers and keyboards work exactly as expected), styled as
 *  selectable cards. */
export function OptionGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  columns = 3,
}: OptionGroupProps<T>) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const checked = option.value === value;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={`${styles.card} ${checked ? styles.cardChecked : ""}`}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className={styles.input}
              />
              <span className={styles.label}>{option.label}</span>
              {option.hint && <span className={styles.hint}>{option.hint}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
