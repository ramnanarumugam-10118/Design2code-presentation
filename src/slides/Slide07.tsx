import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const STATS = [
  {
    from: '10–12 days →',
    value: '1.5',
    unit: 'days',
    label: 'Idea to production-ready code',
    note: 'Engineers typically take 10–12 days for a screen redesign like this. With the new workflow, it was 1.5.',
  },
  {
    value: '0',
    unit: '',
    label: 'Design QA cycles',
    note: 'Output matched design intent on the first pass. No back-and-forth.',
  },
];

const Slide07: SlideComponent = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
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

    <div className="content" style={{ justifyContent: 'center' }}>

      <motion.div variants={fadeUp} style={{ marginBottom: 44 }}>
        <div className="eyebrow">Early results</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(42px, 5.4vw, 72px)',
            lineHeight: 1.06,
            letterSpacing: '-1.4px',
            color: '#000000',
          }}
        >
          Numbers from{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            the bike journey.
          </span>
        </h2>
      </motion.div>

      {/* 3 stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 18,
          width: '100%',
        }}
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className="card-light"
            style={{
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Big stat */}
            <div style={{ marginBottom: 16, lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              {'from' in s && s.from && (
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'rgba(88,0,146,0.38)',
                  letterSpacing: '-0.1px',
                }}>
                  {s.from}
                </span>
              )}
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(40px, 4.2vw, 60px)',
                  color: '#580092',
                  letterSpacing: '-1.5px',
                }}
              >
                {s.value}
              </span>
              {s.unit && (
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#ad56ff',
                    marginLeft: 8,
                    letterSpacing: '-0.2px',
                  }}
                >
                  {s.unit}
                </span>
              )}
            </div>

            {/* Label */}
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: '#000000',
                letterSpacing: '-0.2px',
                marginBottom: 10,
                lineHeight: 1.3,
              }}
            >
              {s.label}
            </p>

            {/* Separator */}
            <div
              style={{
                width: 32,
                height: 1,
                background: 'rgba(88,0,146,0.25)',
                marginBottom: 10,
              }}
            />

            {/* Context note */}
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 13,
                color: '#585858',
                lineHeight: 1.55,
                fontWeight: 400,
              }}
            >
              {s.note}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Humble disclaimer */}
      <motion.p
        variants={fadeUp}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 11.5,
          color: 'rgba(0,0,0,0.28)',
          marginTop: 22,
          letterSpacing: '0.06em',
        }}
      >
        First build · Data will grow as we scale
      </motion.p>
    </div>
  </motion.div>
);

Slide07.theme = 'light';
export default Slide07;
