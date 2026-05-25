import { motion } from 'framer-motion';
import { staggerParent, fadeUp, scaleIn, softFade } from '../motion';
import { LOGO_DARK } from '../assets';
import type { SlideComponent } from './index';

const Slide09: SlideComponent = () => (
  <motion.div
    className="content"
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}
    variants={staggerParent}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {/* Ambient purple glow behind the text */}
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '70vw',
        height: '70vw',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(173,86,255,0.12) 0%, rgba(88,0,146,0.04) 35%, transparent 65%)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    />

    <motion.div
      variants={softFade}
      style={{ position: 'absolute', top: 52, left: 80, zIndex: 2 }}
    >
      <img src={LOGO_DARK} style={{ height: 28 }} alt="ACKO" />
    </motion.div>

    <div style={{ position: 'relative', zIndex: 1 }}>
      <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
        <span className="tag">Demo</span>
      </motion.div>
      <motion.h1
        variants={scaleIn}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(56px, 8.5vw, 120px)',
          lineHeight: 1.0,
          letterSpacing: '-2px',
          color: '#ffffff',
        }}
      >
        Let's see it{' '}
        <span style={{ color: '#d1aef9' }}>in action.</span>
      </motion.h1>
    </div>
  </motion.div>
);

Slide09.theme = 'dark';
export default Slide09;
