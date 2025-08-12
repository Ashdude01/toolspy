/**
 * Limit a page title to a maximum length, preserving whole words where possible.
 * Appends an ellipsis when truncated.
 */
export function limitTitle(title: string, maxLength: number = 65): string {
  if (!title) return '';
  if (title.length <= maxLength) return title;

  const hardLimit = Math.max(0, maxLength - 1); // reserve 1 char for …
  const sliced = title.slice(0, hardLimit);
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced;
  return trimmed.replace(/[\s\-_.]+$/g, '') + '…';
}

/**
 * Limit a description to a maximum length, preserving whole words where possible.
 * Appends an ellipsis when truncated. Defaults to 160 characters.
 */
export function limitDescription(description: string, maxLength: number = 160): string {
  if (!description) return '';
  if (description.length <= maxLength) return description;

  const hardLimit = Math.max(0, maxLength - 1);
  const sliced = description.slice(0, hardLimit);
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = lastSpace > 60 ? sliced.slice(0, lastSpace) : sliced;
  return trimmed.replace(/[\s\-_.,:;]+$/g, '') + '…';
}


