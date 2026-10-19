/**
 * Tone of each brand figure card (ProofCards.module.css), shared by ProofStrip
 * and MetricOdometer: aqua, blue, navy, aqua, magenta. Two accents at most per
 * row keep the figures cohesive instead of multicolored.
 */
export const proofTones = ["accent", "link", "heading", "accent", "action"] as const;

export function proofTone(index: number) {
  return proofTones[index % proofTones.length];
}
