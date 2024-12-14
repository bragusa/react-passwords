import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Define a type for props that include children
interface FadeInProps {
  children: ReactNode;
}

const pageTransition = {
  duration: 0.25,
};

export const FadeInFromRight: React.FC<FadeInProps> = ({ children }) => {
  const width = window.innerWidth;
  return (
    <motion.div
      initial={{ opacity: 1, x: width }} // start off-screen to the right
      animate={{ opacity: 1, x: 0 }} // end at its natural position
      transition={{ duration: pageTransition.duration }}
      style={{ borderRadius: '5px' }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInFromLeft: React.FC<FadeInProps> = ({ children }) => {
  const width = window.innerWidth;
  return (
    <motion.div
      initial={{ opacity: 1, x: -width }} // start off-screen to the left
      animate={{ opacity: 1, x: 0 }} // end at its natural position
      transition={{ duration: pageTransition.duration }}
      style={{ borderRadius: '5px' }}
    >
      {children}
    </motion.div>
  );
};
