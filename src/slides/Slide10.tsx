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
    title: 'Flutter workflow',
    body: 'Bring the design-to-code pipeline to Flutter, end to end.',
    pill: 'Next',
    dot: 'amber' as const,
  },
  {
    n: '03',
    title: 'Governance model for components',
    body: 'Define ownership, contribution standards, and review process for every component. Engineering and design aligned on how the system grows.',
    pill: 'Now',
    dot: 'amber' as const,
  },
  {
    n: '04',
    title: 'Migrate existing pages',
    body: 'Move legacy surfaces onto the new system, progressively.',
    pill: 'Up next',
    dot: 'red' as const,
  },
  {
    n: '05',
    title: 'Default for every designer',
    body: 'Workflow adopted as the default across the design org.',
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
        {ROWS.map((row) => (
          <motion.div
            key={row.n}
            variants={fadeUp}
            className="card-light"
            style={{
              position: 'relative',
              padding: '18px 28px 18px 36px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              overflow: 'hidden',
            }}
          >
            {/* Purple accent bar */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 12,
                bottom: 12,
                width: 4,
                background: '#580092',
                borderRadius: 2,
              }}
            />
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 12,
                color: '#ad56ff',
                fontWeight: 700,
                letterSpacing: '0.15em',
                flexShrink: 0,
                width: 24,
              }}
            >
              {row.n}
            </p>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: 3,
                  letterSpacing: '-0.3px',
                  lineHeight: 1.25,
                }}
              >
                {row.title}
              </p>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: '#585858',
                  fontWeight: 400,
                }}
              >
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
