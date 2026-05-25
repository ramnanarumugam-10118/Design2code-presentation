import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade } from '../motion';
import { LOGO_DARK } from '../assets';
import type { SlideComponent } from './index';

const Slide11: SlideComponent = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'rgba(8, 0, 20, 0.38)' }}
    variants={staggerParent}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <motion.div variants={softFade} style={{ position: 'absolute', top: 52, left: 80, zIndex: 2 }}>
      <img src={LOGO_DARK} style={{ height: 28 }} alt="ACKO" />
    </motion.div>

    <div
      className="content"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <motion.h1
        variants={fadeUp}
        className="h-xl"
        style={{ color: '#fff', marginBottom: 0 }}
      >
        Anyone at ACKO<br />with good judgement<br />and taste can now build.
      </motion.h1>
    </div>
  </motion.div>
);

Slide11.theme = 'dark';
export default Slide11;
