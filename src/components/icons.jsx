// Stable React components that look up icons from the registry.
// Keep this file component-only so Fast Refresh works.
import { createElement } from "react";
import { lookupSuitIcon } from "./iconLookup";

export { SUBJECT_ICONS, MODE_ICONS } from "./iconLookup";

// Avoid `const Icon = lookup(...)` which trips react-hooks/static-components.
// createElement keeps the lookup inline and the rule happy.
export function SuitIcon({ deck, suit, ...rest }) {
  return createElement(lookupSuitIcon(deck, suit), rest);
}
