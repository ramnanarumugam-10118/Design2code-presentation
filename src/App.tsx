import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slides, type SlideComponent } from './slides';
import { Nav } from './Nav';
import { slideFade, ease } from './motion';

interface AppProps {
  /** Which deck to render. Defaults to the short send-across version. */
  deck?: SlideComponent[];
}

export default function App({ deck = slides }: AppProps) {
  const TOTAL = deck.length;
  const [cur, setCur] = useState(0);
  const [step, setStep] = useState(0);

  // Refs so the single keydown listener always reads current values
  const curRef = useRef(0);
  const stepRef = useRef(0);
  const presRef = useRef<HTMLDivElement>(null);

  // Keep #pres focused so ACKO inputs can never steal navigation keys
  useEffect(() => {
    presRef.current?.focus({ preventScroll: true });
  }, [cur]);

  // Deep links: "#3" opens the deck on slide 3, so an email thumbnail can
  // point at the slide it shows. Also lets each slide be screenshotted.
  useEffect(() => {
    const applyHash = () => {
      const n = parseInt(window.location.hash.slice(1), 10);
      if (Number.isNaN(n) || n < 1 || n > TOTAL) return;
      const idx = n - 1;
      curRef.current = idx;
      stepRef.current = 0;
      setCur(idx);
      setStep(0);
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [TOTAL]);

  // Mirror the current slide back into the URL so it can be copied and shared.
  // replaceState does not fire hashchange, so this cannot loop.
  useEffect(() => {
    const want = `#${cur + 1}`;
    if (window.location.hash !== want) {
      window.history.replaceState(null, '', want);
    }
  }, [cur]);

  // Forward/back live here so the keys, the nav buttons and a plain click
  // all move through the deck identically. Only refs and stable setters are
  // touched, so an empty dep list stays correct.
  const goForward = useCallback(() => {
    const c = curRef.current;
    const s = stepRef.current;
    const slideSteps = deck[c].steps;
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
  }, [deck, TOTAL]);

  const goBack = useCallback(() => {
    const c = curRef.current;
    const s = stepRef.current;
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
  }, []);

  // A click anywhere on the slide advances, except on something the reader is
  // actually meant to interact with (the claim-form demo has live inputs), and
  // except when they were selecting text.
  const handleSlideClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'input, textarea, select, button, a, label, [role="button"], [contenteditable="true"]'
        )
      ) {
        return;
      }
      if (window.getSelection()?.toString()) return;
      goForward();
    },
    [goForward]
  );

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

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Blur any focused input, then re-focus the inert slide container
      (document.activeElement as HTMLElement)?.blur?.();
      presRef.current?.focus({ preventScroll: true });

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goForward();
      } else {
        goBack();
      }
    };

    // Capture phase (`true`) so we receive the key before any focused input
    // can handle it.
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [goForward, goBack]); // Both are stable, so this registers once

  const handleNav = (n: number) => {
    curRef.current = n;
    stepRef.current = 0;
    setCur(n);
    setStep(0);
  };

  const SlideComponent = deck[cur];
  const isLight = SlideComponent.theme === 'light';

  return (
    <>
      <div
        id="pres"
        ref={presRef}
        tabIndex={-1}
        onClick={handleSlideClick}
        style={{ outline: 'none', cursor: 'pointer' }}
      >
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
