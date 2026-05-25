import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
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

function ProblemRow({ p }: { p: Problem }) {
  const reg = !!p.regulatory;
  const accentColor = reg ? '#d4517f' : '#580092';

  return (
    <motion.div
      variants={fadeUp}
      className="card-light"
      style={{
        position: 'relative',
        padding: '20px 30px',
        display: 'grid',
        gridTemplateColumns: '64px 1fr',
        alignItems: 'center',
        gap: 28,
        overflow: 'hidden',
        ...(reg
          ? {
              background: 'rgba(255,235,245,0.45)',
              borderColor: 'rgba(212,81,127,0.40)',
              boxShadow:
                '0 6px 28px rgba(212,81,127,0.10), 0 0 0 1px rgba(212,81,127,0.06)',
            }
          : {}),
      }}
    >
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
          lineHeight: 1.2,
          position: 'relative',
          whiteSpace: 'nowrap',
        }}
      >
        {p.n}
        {reg && (
          <span style={{ display: 'block', marginTop: 2 }}>— REGULATORY</span>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            color: '#000000',
            lineHeight: 1.25,
            letterSpacing: '-0.3px',
            marginBottom: 4,
          }}
        >
          {p.title}
        </p>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            color: '#585858',
            lineHeight: 1.55,
            letterSpacing: '-0.1px',
          }}
        >
          {p.desc}
        </p>
      </div>
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
      <img src={LOGO_LIGHT} style={{ height: 20, opacity: 0.7 }} alt="ACKO" />
    </motion.div>

    <div className="content">
      <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
        <div className="eyebrow">Today</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(48px, 6.4vw, 84px)',
            lineHeight: 1.15,
            letterSpacing: '-1.6px',
            background:
              'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            paddingBottom: '0.15em',
          }}
        >
          Where we are today.
        </h2>
      </motion.div>

      {/* Stacked list — each row spans the full width so the subtext is easy to read */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          minHeight: 0,
        }}
      >
        {PROBLEMS.map((p) => (
          <ProblemRow key={p.n} p={p} />
        ))}
      </div>
    </div>
  </motion.div>
);

Slide02.theme = 'light';
export default Slide02;
