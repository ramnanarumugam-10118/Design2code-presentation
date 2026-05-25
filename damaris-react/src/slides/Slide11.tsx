import { motion } from 'framer-motion';
import { staggerParent, fadeUp, softFade, scaleIn } from '../motion';
import { LOGO_DARK } from '../assets';
import type { SlideComponent } from './index';

const Slide11: SlideComponent = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
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
      <motion.div
        variants={softFade}
        style={{
          position: 'absolute',
          width: 720,
          height: 720,
          borderRadius: '50%',
          border: '1px solid rgba(88,0,146,0.14)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <motion.div
        variants={softFade}
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: '1px solid rgba(88,0,146,0.10)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <motion.div
        variants={softFade}
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          border: '1px solid rgba(88,0,146,0.08)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <motion.div
        variants={scaleIn}
        style={{
          position: 'absolute',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(173,86,255,0.25) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.h1
          variants={fadeUp}
          className="h-xl"
          style={{ color: '#fff', marginBottom: 18 }}
        >
          Anyone at ACKO<br />with good judgement<br />and taste can now build.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="body"
          style={{ maxWidth: 480, fontSize: 17 }}
        >
          Less waiting. More making. For everyone.
        </motion.p>
      </div>
    </div>
  </motion.div>
);

Slide11.theme = 'dark';
export default Slide11;
