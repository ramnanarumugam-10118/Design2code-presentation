import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slides } from './slides';
import { Nav } from './Nav';
import { slideFade, ease } from './motion';

const TOTAL = slides.length;

export default function App() {
  const [cur, setCur] = useState(0);
  const [step, setStep] = useState(0);

  // Refs so the single keydown listener always reads current values
  const curRef = useRef(0);
  const stepRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only intercept the four navigation keys — pass everything else through
      // so the browser/devtools stay normal.
      const isNavKey =
        e.key === 'ArrowRight' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowUp';
      if (!isNavKey) return;

      // Capture-phase + stopPropagation so focused ACKO inputs (TextInput,
      // Textarea, etc.) on slides like SlideDesignSystem can't swallow the
      // arrow key. preventDefault avoids the default "move cursor in field"
      // behavior when an input has focus.
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Release focus from any ACKO input so it can't re-capture future keys
      (document.activeElement as HTMLElement)?.blur?.();

      const c = curRef.current;
      const s = stepRef.current;
      const slideSteps = slides[c].steps;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (slideSteps && s < slideSteps - 1) {
          const ns = s + 1;
          stepRef.current = ns;
          setStep(ns);
        } else if (c < TOTAL - 1) {
          curRef.current = c + 1;
          stepRef.current = 0;
          setCur(c + 1);
          setStep(0);
        }
      } else {
        if (s > 0) {
          const ns = s - 1;
          stepRef.current = ns;
          setStep(ns);
        } else if (c > 0) {
          curRef.current = c - 1;
          stepRef.current = 0;
          setCur(c - 1);
          setStep(0);
        }
      }
    };

    // Capture phase (`true`) so we receive the key before any focused input
    // can handle it.
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, []); // Empty — refs keep values current without re-registering

  const handleNav = (n: number) => {
    curRef.current = n;
    stepRef.current = 0;
    setCur(n);
    setStep(0);
  };

  const SlideComponent = slides[cur];
  const isLight = SlideComponent.theme === 'light';

  return (
    <>
      <div id="pres">
        <AnimatePresence mode="sync">
          <motion.div
            key={cur}
            className={'slide' + (isLight ? ' light' : '')}
            variants={slideFade}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease }}
          >
            <SlideComponent step={step} />
          </motion.div>
        </AnimatePresence>
      </div>
      <Nav cur={cur} total={TOTAL} onGo={handleNav} />
    </>
  );
}
