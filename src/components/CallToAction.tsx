import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowRight, Users, Award, Target, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function CallToAction() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToLogin = () => {
    // In a real app, this would navigate to the login page
    // For demo purposes, we'll scroll to top
    scrollToTop();
  };

  const stats = [
    { icon: Users, value: "10,000+", label: "Students Guided" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: Target, value: "500+", label: "Career Paths" },
    { icon: Sparkles, value: "50+", label: "Top Colleges" }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[#4A90E2]/10 via-white to-[#F5A623]/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-[#4A90E2]/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 bg-[#F5A623]/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#4A90E2]/10 to-[#F5A623]/10 rounded-2xl border border-[#4A90E2]/20 mb-4">
                  <IconComponent className="w-8 h-8 text-[#4A90E2]" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-2xl lg:text-3xl bg-gradient-to-r from-[#4A90E2] to-[#F5A623] bg-clip-text text-transparent mb-2"
                  style={{ fontWeight: '700' }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A90E2]/10 to-[#F5A623]/10 rounded-full border border-[#4A90E2]/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#4A90E2]" />
              <span className="text-sm text-gray-700">Ready to begin?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl xl:text-6xl mb-6 bg-gradient-to-r from-[#4A90E2] to-[#F5A623] bg-clip-text text-transparent leading-tight"
              style={{ fontWeight: '700' }}
            >
              Your Future Starts Now
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Join thousands of students who discovered their perfect career path with EduAdvisor. 
              Get personalized guidance, expert mentorship, and access to the best opportunities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={goToLogin}
                className="bg-gradient-to-r from-[#4A90E2] to-[#F5A623] hover:from-[#4A90E2]/90 hover:to-[#F5A623]/90 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 group shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                className="border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white px-8 py-4 rounded-full transition-all duration-300"
              >
                Schedule Demo Call
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>100% Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Cancel Anytime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Success Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1591218214141-45545921d2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBncmFkdWF0aW9uJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzU4Mjc3NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy student celebrating graduation success"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4A90E2]/20 via-transparent to-[#F5A623]/20" />
              
              {/* Floating Success Metrics */}
              <motion.div
                className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-center">
                  <div className="text-2xl bg-gradient-to-r from-[#4A90E2] to-[#F5A623] bg-clip-text text-transparent" style={{ fontWeight: '700' }}>
                    98%
                  </div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
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
                  <div className="text-xl">🎓</div>
                  <div>
                    <div className="text-sm text-gray-500">Dream College</div>
                    <div className="text-sm text-[#4A90E2]" style={{ fontWeight: '600' }}>Achieved!</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}