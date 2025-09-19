import { motion } from 'motion/react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2]/20 via-white to-[#F5A623]/20" />
      
      {/* Animated Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-[#4A90E2]/10 rounded-full blur-xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-[#F5A623]/15 rounded-full blur-xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#4A90E2]/8 rounded-full blur-2xl"
        animate={{
          x: [0, 60, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-28 h-28 bg-[#F5A623]/12 rounded-full blur-xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Floating Icons */}
      <motion.div
        className="absolute top-1/4 left-1/3 text-[#4A90E2]/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-1/4 text-[#F5A623]/20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H15V14H17V12ZM7 12H9V14H7V12ZM13 12H11V14H13V12Z"/>
        </svg>
      </motion.div>
    </div>
  );
}