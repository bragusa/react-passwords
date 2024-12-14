import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const pageTransition = {
    duration: 0.25,
};
export const FadeInFromRight = ({ children }) => {
    const width = window.innerWidth;
    return (_jsx(motion.div, { initial: { opacity: 1, x: width }, animate: { opacity: 1, x: 0 }, transition: { duration: pageTransition.duration }, style: { borderRadius: '5px' }, children: children }));
};
export const FadeInFromLeft = ({ children }) => {
    const width = window.innerWidth;
    return (_jsx(motion.div, { initial: { opacity: 1, x: -width }, animate: { opacity: 1, x: 0 }, transition: { duration: pageTransition.duration }, style: { borderRadius: '5px' }, children: children }));
};
