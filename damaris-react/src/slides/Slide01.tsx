import { motion } from 'framer-motion';
import { staggerParent, fadeUp, scaleIn, softFade } from '../motion';
import { LOGO_DARK } from '../assets';
import type { SlideComponent } from './index';

const Slide01: SlideComponent = () => (
  <motion.div
    className="content"
    style={{ justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
    variants={staggerParent}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <div
      className="s1-glow"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '75vw',
        height: '75vw',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(173,86,255,0.13) 0%, rgba(88,0,146,0.05) 35%, transparent 65%)',
        pointerEvents: 'none',
      }}
    />
    <motion.div variants={softFade} style={{ position: 'absolute', top: 52, left: 80, zIndex: 2 }}>
      <img src={LOGO_DARK} style={{ height: 28 }} alt="ACKO" />
    </motion.div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <motion.p
        variants={fadeUp}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(28px, 3.2vw, 44px)',
          lineHeight: 1,
          color: '#ffffff',
          marginBottom: 16,
          letterSpacing: '-0.4px',
        }}
      >
        Project:
      </motion.p>
      <motion.p
        variants={scaleIn}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(80px, 11.5vw, 148px)',
          lineHeight: 0.95,
          color: '#d1aef9',
          letterSpacing: '-3px',
        }}
      >
        XXXXXX
      </motion.p>
    </div>
  </motion.div>
);

Slide01.theme = 'dark';
export default Slide01;
