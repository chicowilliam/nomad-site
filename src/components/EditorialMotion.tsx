import type { RefObject } from "react";
import { useEditorialMotion } from "../hooks/useEditorialMotion";

/** Load the motion engine separately so the content can paint first. */
export default function EditorialMotion({
  scope,
}: {
  scope: RefObject<HTMLDivElement | null>;
}) {
  useEditorialMotion(scope);
  return null;
}
