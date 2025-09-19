import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function WelcomeBanner() {
  const scrollToDemo = () => {
    document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated Student Avatars */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#F5A623] flex items-center justify-center"
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
          <Users className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-20 w-12 h-12 rounded-full bg-gradient-to-br from-[#F5A623] to-[#4A90E2] flex items-center justify-center"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Target className="w-6 h-6 text-white" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-20 w-14 h-14 rounded-full bg-gradient-to-br from-[#4A90E2]/80 to-[#F5A623]/80 flex items-center justify-center"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Sparkles className="w-7 h-7 text-white" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A90E2]/10 to-[#F5A623]/10 rounded-full border border-[#4A90E2]/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#4A90E2]" />
            <span className="text-sm text-gray-700">Your journey begins here!</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl lg:text-6xl xl:text-7xl mb-6 bg-gradient-to-r from-[#4A90E2] to-[#F5A623] bg-clip-text text-transparent leading-tight"
            style={{ fontWeight: '700' }}
          >
            Explore Your Future with EduAdvisor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed"
          >
            See how we guide students like you toward the right path.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              onClick={scrollToDemo}
              className="bg-gradient-to-r from-[#4A90E2] to-[#F5A623] hover:from-[#4A90E2]/90 hover:to-[#F5A623]/90 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 group"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              className="border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white px-8 py-3 rounded-full transition-all duration-300"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Content - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NTgyNzc0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Diverse students learning and collaborating"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4A90E2]/30 via-transparent to-[#F5A623]/30" />
            
            {/* Floating Elements */}
            <motion.div
              className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700">Live Guidance</span>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="flex items-center gap-2">
                <div className="text-2xl">🎯</div>
                <div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                  <div className="text-lg text-[#4A90E2]" style={{ fontWeight: '600' }}>98%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}