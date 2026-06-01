import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const POINTS = [
  {
    n: '01',
    title: 'Tokens',
    desc: 'Foundation of the system. Colour, spacing, typography centrally controlled, propagating across every surface.',
  },
  {
    n: '02',
    title: 'Atoms, molecules and organisms',
    desc: 'Layered from primitives to complex blocks. Each level composable, predictable and reusable.',
  },
  {
    n: '03',
    title: 'Code ready components',
    desc: 'Production-ready components built in Figma and in code. React library fully operational; Flutter in progress.',
  },
  {
    n: '04',
    title: 'Configurable design',
    desc: 'Tokens propagate everywhere automatically. Every design decision flows from a single source of truth.',
  },
  {
    n: '05',
    title: 'Accessibility built-in',
    desc: 'WCAG 2.0 enforced at the component level — not retrofitted. Positioned ahead of the IRDAI enforcement timeline.',
  },
  {
    n: '06',
    title: 'Two systems for two contexts',
    desc: 'A separate design system for Enterprise (B2B) / internal tools where functional density matters more than consumer aesthetics.',
  },
];

const IMAGES = ['/foundation-1.png', '/foundation-2.png', '/foundation-3.png'];

const SlideFoundation: SlideComponent = () => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((i) => (i + 1) % IMAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
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
          <div className="eyebrow">The design system</div>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 5.2vw, 68px)',
              lineHeight: 1.05,
              letterSpacing: '-1.4px',
              color: '#000000',
            }}
          >
            A proper foundation,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              built ground-up.
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            minHeight: 0,
          }}
        >
          {/* LEFT — numbered text points */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 0,
            }}
          >
            {POINTS.map((p, i) => (
              <div
                key={p.n}
                style={{
                  padding: '16px 0',
                  borderBottom:
                    i < POINTS.length - 1 ? '1px solid rgba(88,0,146,0.10)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#ad56ff',
                      letterSpacing: '0.14em',
                      flexShrink: 0,
                      minWidth: 22,
                    }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: 18,
                        color: '#000000',
                        marginBottom: 4,
                        letterSpacing: '-0.3px',
                      }}
                    >
                      {p.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 13,
                        color: '#585858',
                        lineHeight: 1.5,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* RIGHT — auto-cycling images */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={imgIndex}
                src={IMAGES[imgIndex]}
                alt={`Foundation visual ${imgIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '75%',
                  height: '75%',
                  objectFit: 'contain',
                }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

SlideFoundation.theme = 'light';
export default SlideFoundation;
