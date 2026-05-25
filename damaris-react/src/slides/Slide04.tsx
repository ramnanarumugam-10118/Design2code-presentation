import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const PILLARS = [
  {
    n: '01',
    title: 'A foundational design system',
    desc:
      'Token-based, atomic, with production-ready component libraries. Standardised visual language. Accessibility built in. The foundation everything else stands on.',
  },
  {
    n: '02',
    title: 'An AI-powered design-to-code workflow',
    desc:
      'Designs created in Figma or via AI prompting, translated to framework-specific production code that engineers can integrate directly — without manual rebuilding.',
  },
];

const Slide04: SlideComponent = () => (
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
      <motion.div variants={fadeUp} style={{ marginBottom: 40 }}>
        <div className="eyebrow">Architecture</div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(48px, 6.4vw, 84px)',
            lineHeight: 1.05,
            letterSpacing: '-1.6px',
            color: '#000000',
          }}
        >
          Two pillars,{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            one product.
          </span>
        </h2>
      </motion.div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          minHeight: 0,
        }}
      >
        {PILLARS.map((p) => (
          <motion.div
            key={p.n}
            variants={fadeUp}
            className="card-light"
            style={{
              position: 'relative',
              padding: '40px 44px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Purple gradient top border — the deck's "highlight" treatment */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  'linear-gradient(90deg, #580092 0%, #ad56ff 50%, #d1aef9 100%)',
              }}
            />

            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(48px, 5vw, 72px)',
                fontWeight: 300,
                color: 'rgba(88,0,146,0.22)',
                lineHeight: 1,
                letterSpacing: '-2.5px',
                marginBottom: 24,
              }}
            >
              {p.n}
            </div>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(24px, 2.6vw, 36px)',
                color: '#000000',
                lineHeight: 1.2,
                letterSpacing: '-0.6px',
                marginBottom: 14,
              }}
            >
              {p.title}
            </p>

            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(14px, 1.1vw, 16px)',
                fontWeight: 400,
                color: '#585858',
                lineHeight: 1.6,
                letterSpacing: '-0.1px',
              }}
            >
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

Slide04.theme = 'light';
export default Slide04;
