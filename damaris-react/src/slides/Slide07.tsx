import { motion } from 'framer-motion';
import { staggerParent, fadeUp, scaleIn, softFade } from '../motion';
import { LOGO_LIGHT } from '../assets';
import type { SlideComponent } from './index';

const orbitStyle: React.CSSProperties = {
  position: 'absolute',
  width: '20vh',
  height: '20vh',
  borderRadius: '50%',
  background: 'linear-gradient(180deg, #2d1f44 0%, #1a0d2a 100%)',
  border: '1px solid rgba(173,86,255,0.40)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  textAlign: 'center',
  gap: 8,
  zIndex: 3,
  boxShadow:
    '0 12px 36px rgba(88,0,146,0.18), 0 0 0 8px rgba(173,86,255,0.06)',
};

const orbitNumber: React.CSSProperties = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
  fontSize: 'clamp(28px, 3vw, 48px)',
  color: '#d1aef9',
  lineHeight: 1,
  letterSpacing: '-1.2px',
};

const orbitCaption: React.CSSProperties = {
  fontSize: 11,
  color: '#bfa6d9',
  lineHeight: 1.35,
  fontWeight: 500,
};

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

    {/* BIG glassmorphic center circle — sized via vmin so it always sits inside the slide and centers reliably */}
    <motion.div
      variants={scaleIn}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '85vmin',
        height: '85vmin',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.85)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        boxShadow: '0 6px 28px rgba(88,0,146,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 20,
        zIndex: 2,
      }}
    >
      <div className="tag" style={{ fontSize: 11, padding: '7px 16px' }}>
        Early results
      </div>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(32px, 3.8vw, 56px)',
          color: '#000000',
          lineHeight: 1.1,
          letterSpacing: '-1px',
        }}
      >
        Numbers from<br />the Bike pilot.
      </h2>
    </motion.div>

    {/* Orbit metric — top-left: speed */}
    <motion.div variants={fadeUp} style={{ ...orbitStyle, top: '9%', left: '6%' }}>
      <p style={orbitNumber}>
        1.5<span style={{ color: '#ad56ff', fontSize: '0.42em', marginLeft: 4, fontWeight: 600 }}>days</span>
      </p>
      <p style={orbitCaption}>Bike pilot:<br />design → UAT.</p>
    </motion.div>

    {/* Orbit metric — top-right: effort */}
    <motion.div variants={fadeUp} style={{ ...orbitStyle, top: '9%', right: '6%' }}>
      <p style={orbitNumber}>
        40<span style={{ color: '#ad56ff', fontSize: '0.7em' }}>%</span>
      </p>
      <p style={orbitCaption}>Less effort<br />to ship.</p>
    </motion.div>

    {/* Orbit metric — bottom: QA */}
    <motion.div
      variants={fadeUp}
      style={{ ...orbitStyle, bottom: '2%', left: '50%', transform: 'translateX(-50%)' }}
    >
      <p style={orbitNumber}>0</p>
      <p style={orbitCaption}>Days spent on<br />design QA.</p>
    </motion.div>
  </motion.div>
);

Slide07.theme = 'light';
export default Slide07;
