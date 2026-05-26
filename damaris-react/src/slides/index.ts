import Slide01 from './Slide01';
import Slide02 from './Slide02';
import Slide03 from './Slide03';
import Slide04 from './Slide04';
import SlideIntroFoundation from './SlideIntroFoundation';
import SlideFoundation from './SlideFoundation';
import SlideDesignSystem from './SlideDesignSystem';
import Slide05 from './Slide05';
import SlideWorkflowComparison from './SlideWorkflowComparison';
import Slide06 from './Slide06';
import Slide07 from './Slide07';
import Slide08 from './Slide08';
import SlideHonestScope from './SlideHonestScope';
import Slide09 from './Slide09';
import Slide10 from './Slide10';
import Slide11 from './Slide11';

export type Theme = 'dark' | 'light';

export type SlideComponent = React.FC<{ step?: number }> & { theme: Theme; steps?: number };

export const slides: SlideComponent[] = [
  Slide01,
  Slide02,            // Problem (5 problems, glassmorphic light list)
  Slide03,            // Scope (4 pointers, glassmorphic)
  Slide04,            // What we built (2 pillars, in sequence)
  SlideIntroFoundation, // Visual language intro — consistent way of speaking visually
  SlideFoundation,    // Design-system foundation (5 numbered points + L0–L4 visual)
  SlideDesignSystem,  // Claim-form morph driven by chat prompts
  Slide05,            // How we ship today (workflow journey)
  Slide09,            // Demo — interstitial
  SlideWorkflowComparison,
  Slide06,
  Slide07,
  Slide08,            // Six shifts (now light + horizontal list)
  SlideHonestScope,
  Slide10,
  Slide11,
];
