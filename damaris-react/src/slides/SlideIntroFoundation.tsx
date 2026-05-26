import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const POINTS = [
  {
    title: 'Not a rebrand, a standardisation',
    body: 'We structured what was already working. The friendly corners, the warmer tones, the lighter typographic touch. They were there. Now they\'re codified.',
  },
  {
    title: 'Approachable over authoritative',
    body: 'Every visual choice leans toward warmth and clarity. Rounded over sharp. Open over dense. Conversational over corporate.',
  },
  {
    title: 'Consistency at scale',
    body: 'A user should never feel like they\'ve left our product, whether it\'s mobile, desktop, a settings page, or a feature built six months ago.',
  },
];

const SlideIntroFoundation: SlideComponent = () => (
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

    <div
      className="content"
      style={{
        flexDirection: 'row',
        gap: 64,
        alignItems: 'center',
        padding: '64px 80px 48px',
      }}
    >
      {/* Left — text */}
      <motion.div
        variants={fadeUp}
        style={{
          flex: '0 0 580px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 3.8vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-1.2px',
              color: '#000000',
              marginBottom: 0,
            }}
          >
            A consistent way of<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #580092 0%, #ad56ff 60%, #d1aef9 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              speaking visually.
            </span>
          </h2>
        </div>

        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            fontWeight: 400,
            color: '#585858',
            lineHeight: 1.6,
            letterSpacing: '-0.1px',
          }}
        >
          We haven't changed who we are. We've made the implicit explicit, codifying the choices our best designers were already making so every surface starts from the same feeling.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {POINTS.map((p) => (
            <div key={p.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span
                style={{
                  color: '#580092',
                  fontSize: 10,
                  marginTop: 4,
                  flexShrink: 0,
                }}
              >
                ◆
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: 5,
                    letterSpacing: '-0.3px',
                  }}
                >
                  {p.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    color: '#585858',
                    lineHeight: 1.6,
                  }}
                >
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right — image */}
      <motion.div
        variants={fadeUp}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/design-system-visual.png"
          alt="Design system visual"
          style={{
            width: '65%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </motion.div>
    </div>
  </motion.div>
);

SlideIntroFoundation.theme = 'light';
export default SlideIntroFoundation;
