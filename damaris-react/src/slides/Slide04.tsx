import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const Slide04: SlideComponent = () => (
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
        <div className="eyebrow">Foundation</div>
        <h2 className="h-lg" style={{ color: '#000000' }}>
          Visuals + tone.
        </h2>
      </motion.div>
      <motion.div
        variants={fadeUp}
        className="img-ph light"
        style={{ flex: 1, borderRadius: 16, minHeight: 0 }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span>Colour palette + type sample + voice sample</span>
      </motion.div>
    </div>
  </motion.div>
);

Slide04.theme = 'light';
export default Slide04;
