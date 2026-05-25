import Slide01 from './Slide01';
import Slide02 from './Slide02';
import Slide03 from './Slide03';
import Slide04 from './Slide04';
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
  Slide02,
  Slide03,
  Slide04,
  SlideDesignSystem,
  Slide05,
  Slide09, // Demo — moved up to sit right after "How we ship today"
  SlideWorkflowComparison,
  Slide06,
  Slide07,
  Slide08,
  SlideHonestScope,
  Slide10,
  Slide11,
];
