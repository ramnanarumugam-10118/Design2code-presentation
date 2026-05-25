import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_DARK } from '../assets';
import type { SlideComponent } from './index';

interface Problem {
  n: string;
  title: string;
  desc: string;
  regulatory?: boolean;
}

const PROBLEMS: Problem[] = [
  {
    n: '01',
    title: 'Slow cycle time',
    desc:
      'Multiple handoffs between design and engineering. Manual rebuilds in code. Repeated Design QA rounds to close the gap between intent and output.',
  },
  {
    n: '02',
    title: 'Designer as bottleneck',
    desc:
      'Only designers can create or modify UI. PMs and other stakeholders cannot participate directly — Figma expertise becomes a single point of dependency.',
  },
  {
    n: '03',
    title: 'Inconsistent UI across surfaces',
    desc:
      'No standardised design system. Components are built or reused ad hoc. Visual consistency depends on individual diligence, not systemic enforcement.',
  },
  {
    n: '04',
    title: 'Fragile, hard-to-maintain code',
    desc:
      'No design tokens. No shared component standards. A single colour or spacing change means touching code in multiple places, manually.',
  },
  {
    n: '05',
    title: 'Not WCAG 2.0 accessibility compliant',
    desc:
      'Following a Supreme Court ruling, IRDAI is enforcing accessibility standards for insurance this year. This is no longer optional — it is a compliance risk we must close.',
    regulatory: true,
  },
];

function ProblemCard({ p }: { p: Problem }) {
  const reg = !!p.regulatory;
  const accentColor = reg ? '#f06aa3' : '#9f9f9f';
  const borderColor = reg ? 'rgba(240,106,163,0.32)' : 'rgba(173,86,255,0.20)';

  return (
    <motion.div
      variants={fadeUp}
      style={{
        position: 'relative',
        background: '#0a0a0a',
        border: `1px solid ${borderColor}`,
        borderRadius: 14,
        padding: '24px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
        boxShadow: reg
          ? '0 0 0 1px rgba(240,106,163,0.10), 0 10px 32px rgba(240,106,163,0.06)'
          : 'none',
      }}
    >
      {/* Subtle radial highlight on the regulatory card to draw the eye */}
      {reg && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background:
              'radial-gradient(ellipse at top right, rgba(240,106,163,0.10) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.16em',
          color: accentColor,
          textTransform: 'uppercase',
          position: 'relative',
        }}
      >
        {p.n}{reg && ' — REGULATORY'}
      </div>

      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(20px, 1.8vw, 26px)',
          color: '#ffffff',
          lineHeight: 1.2,
          letterSpacing: '-0.4px',
          position: 'relative',
        }}
      >
        {p.title}
      </p>
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: '#9f9f9f',
          lineHeight: 1.55,
          letterSpacing: '-0.1px',
          position: 'relative',
        }}
      >
        {p.desc}
      </p>
    </motion.div>
  );
}

const Slide02: SlideComponent = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0 }}
    variants={staggerParent}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <motion.div
      variants={softFade}
      style={{ position: 'absolute', top: 32, right: 80, zIndex: 5 }}
    >
      <img src={LOGO_DARK} style={{ height: 20, opacity: 0.5 }} alt="ACKO" />
    </motion.div>

    <div className="content">
      <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
        <div className="eyebrow">Today</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(48px, 6.4vw, 84px)',
            lineHeight: 1.05,
            letterSpacing: '-1.6px',
            color: '#ffffff',
          }}
        >
          Where we are today.
        </h2>
      </motion.div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          minHeight: 0,
        }}
      >
        {/* 2 × 2 grid: problems 01 – 04 */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 16,
            minHeight: 0,
          }}
        >
          {PROBLEMS.slice(0, 4).map((p) => (
            <ProblemCard key={p.n} p={p} />
          ))}
        </div>

        {/* Full-width regulatory card: problem 05 */}
        <ProblemCard p={PROBLEMS[4]} />
      </div>
    </div>
  </motion.div>
);

Slide02.theme = 'dark';
export default Slide02;
