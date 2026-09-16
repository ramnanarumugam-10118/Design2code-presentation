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
import Slide09 from './Slide09';
import Slide10 from './Slide10';
import Slide11 from './Slide11';

export type Theme = 'dark' | 'light';

export type SlideComponent = React.FC<{ step?: number }> & { theme: Theme; steps?: number };

// Short deck — the link that gets sent around. Answers what this is, why,
// how it works, and what it changes. Status and metrics live in the email.
export const slides: SlideComponent[] = [
  Slide01,                // Title
  Slide02,                // Why — the problems we have today
  Slide04,                // What we built — two pillars
  SlideFoundation,        // How — tokens, atoms, code-ready components
  SlideDesignSystem,      // How — prompt morphs the claim form
  SlideWorkflowComparison,// How — traditional vs AI-prototype vs streamlined
  Slide08,                // What this changes across the org
  Slide11,                // Close — anyone with judgement can build
];

// Full deck — every slide, for presenting live with narration.
export const slidesFull: SlideComponent[] = [
  Slide01,
  Slide02,
  Slide03,                // Scope — four pointers
  Slide04,
  SlideIntroFoundation,   // Visual language — not a rebrand, a standardisation
  SlideFoundation,
  SlideDesignSystem,
  Slide05,                // How we ship today — the five-step journey
  Slide09,                // "Let's see it in action" — live-demo cue
  SlideWorkflowComparison,
  Slide06,                // Pilots — we already started
  Slide07,                // Early results — 10-12 days to 1.5
  Slide08,
  Slide10,                // Roadmap
  Slide11,
];
