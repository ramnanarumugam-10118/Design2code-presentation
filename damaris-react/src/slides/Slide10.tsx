import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const ROWS = [
  {
    n: '01',
    title: 'Expand the design system',
    body: 'Add more components and deepen coverage across product surfaces.',
    pill: 'Now',
    dot: 'amber' as const,
  },
  {
    n: '02',
    title: 'Governance model for components',
    body: 'Define ownership, contribution standards, and review process for every component. Engineering and design aligned on how the system grows.',
    pill: 'Now',
    dot: 'amber' as const,
  },
  {
    n: '03',
    title: 'Flutter workflow',
    body: 'Bring the design-to-code pipeline to Flutter, end to end.',
    pill: 'Next',
    dot: 'amber' as const,
  },
  {
    n: '04',
    title: 'Default for every designer',
    body: 'Workflow adopted as the default across the design org.',
    pill: 'Up next',
    dot: 'red' as const,
  },
  {
    n: '05',
    title: 'Migrate existing pages',
    body: 'Move legacy surfaces onto the new system, progressively.',
    pill: 'Up next',
    dot: 'red' as const,
  },
  {
    n: '06',
    title: 'Content + visual engines',
    body: 'Flush out the content and visual generation engines into production.',
    pill: 'Goal',
    dot: 'red' as const,
  },
];

const Slide10: SlideComponent = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0 }}
    variants={staggerParent}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <motion.div variants={softFade} style={{ position: 'absolute', top: 32, right: 80, zIndex: 5 }}>
      <img src={LOGO_LIGHT} style={{ height: 20, opacity: 0.7 }} alt="ACKO" />
    </motion.div>
    <div className="content">
      <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
        <div className="eyebrow">Roadmap</div>
        <h2 className="h-lg" style={{ color: '#000000' }}>
          What's next.
        </h2>
      </motion.div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {ROWS.map((row, i) => (
          <motion.div
            key={row.n}
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: 16,
              alignItems: 'center',
              padding: '11px 0',
              borderBottom: i === ROWS.length - 1 ? 'none' : '1px solid rgba(88,0,146,0.14)',
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: '#9f9f9f',
                fontWeight: 600,
                letterSpacing: '0.15em',
              }}
            >
              {row.n}
            </p>
            <div>
              <p
                style={{
                  fontSize: 17,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  color: '#000000',
                  marginBottom: 3,
                  letterSpacing: '-0.2px',
                }}
              >
                {row.title}
              </p>
              <p className="body-sm" style={{ fontSize: 13 }}>
                {row.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

Slide10.theme = 'light';
export default Slide10;
