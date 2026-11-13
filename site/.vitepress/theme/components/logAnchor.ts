// Log entries are numbered LN (01 = oldest) and anchored as #log-<LN>;
// the timeline cards and the page TOC must agree on the scheme.
export const logAnchorId = (total: number, index: number): string =>
  `log-${String(total - index).padStart(2, '0')}`

export const projectLogPath = (slug: string): string => `/projects/${slug}/devlog`

export function legacyProjectLogTarget(slug: string, search: string, hash: string) {
  if (hash === '#devlog' || /^#log-\d{2,}$/.test(hash)) {
    return `${projectLogPath(slug)}${search}${hash}`
  }
}
