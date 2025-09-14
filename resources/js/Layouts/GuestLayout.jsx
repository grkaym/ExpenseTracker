import { motion, AnimatePresence } from 'motion/react';
import { Link } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function GuestLayout({ children, intro = false }) {
  // Intro plays only one time in the same session
  const shouldPlayIntro = intro && !sessionStorage.getItem('loginIntroPlayed');

  // Snapshot intro flag on first render
  const playListIntroRef = useRef(shouldPlayIntro);
  const playListIntro = playListIntroRef.current;

  const [showIntro, setShowIntro] = useState(shouldPlayIntro);

  useEffect(() => {
    if (!shouldPlayIntro) return;
    // Fade out intro after 1.5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem('loginIntroPlayed', '1');
    }, 1500);
    return () => clearTimeout(timer);
  }, [shouldPlayIntro]);

  return (
    <>
      {/* for sp */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4 pt-6 lg:hidden">
        <h1 className="bg-inherit text-4xl font-bold text-slate-600">
          Expense Tracker
        </h1>
        <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
          {children}
        </div>
      </div>
      {/* for pc */}
      <div className="hidden min-h-screen bg-slate-100 pt-6 sm:justify-center sm:pt-0 lg:block">
        <AnimatePresence>
          {showIntro ? (
            <motion.h1
              key="logo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ width: '50%' }}
              transition={{ duration: 0.7 }}
              className="absolute flex h-screen w-screen items-center justify-center bg-white text-6xl font-bold text-slate-600"
            >
              <span>Expense Tracker</span>
            </motion.h1>
          ) : (
            <div className="flex items-center md:flex-row">
              <div className="flex h-screen flex-1 flex-col items-center justify-center bg-inherit md:bg-white">
                <Link href="/">
                  <h1 className="text-4xl font-bold text-slate-600 md:text-6xl">
                    Expense Tracker
                  </h1>
                </Link>
                <motion.ul
                  className="mt-8 hidden h-24 space-y-1 text-base leading-relaxed text-slate-500 md:block"
                  {...(playListIntro
                    ? {
                        initial: { opacity: 0, scale: 0, height: 0 },
                        animate: { opacity: 1, scale: 1, height: 'auto' },
                        transition: { duration: 0.3, delay: 0.7 },
                      }
                    : {})}
                >
                  <motion.li
                    className="flex items-center gap-2"
                    {...(playListIntro
                      ? {
                          initial: { opacity: 0, scale: 0 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { duration: 0.3, delay: 0.7 },
                        }
                      : {})}
                  >
                    <span class="aria-hidden text-amber-500">💸</span>
                    For those who always ask,<em>where did my money go?</em>
                  </motion.li>
                  <motion.li
                    {...(playListIntro
                      ? {
                          initial: { opacity: 0, scale: 0 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { duration: 0.3, delay: 1 },
                        }
                      : {})}
                  >
                    <span class="aria-hidden text-amber-500">⚡</span>
                    Instant demo, no signup required.
                  </motion.li>
                  <motion.li
                    className="flex items-center gap-2"
                    {...(playListIntro
                      ? {
                          initial: { opacity: 0, scale: 0 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { duration: 0.3, delay: 1.3 },
                        }
                      : {})}
                  >
                    <span class="aria-hidden text-amber-500">🛠</span>
                    Built with Laravel 12 + React (Inertia).
                  </motion.li>
                </motion.ul>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                  {children}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
