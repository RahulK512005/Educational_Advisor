import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw, Monitor, Smartphone, Tablet } from 'lucide-react';

const demoSteps = [
  {
    id: 1,
    title: "Profile Creation",
    description: "Enter your details and academic background",
    duration: 2000,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Interest Assessment",
    description: "Complete our smart questionnaire",
    duration: 2500,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "AI Analysis",
    description: "Our AI analyzes your profile and preferences",
    duration: 1500,
    color: "from-purple-500 to-violet-500"
  },
  {
    id: 4,
    title: "Career Recommendations",
    description: "Get personalized career paths and college suggestions",
    duration: 3000,
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Success Dashboard",
    description: "Track your progress and achievements",
    duration: 2000,
    color: "from-teal-500 to-blue-500"
  }
];

export default function DemoVideoSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [progress, setProgress] = useState(0);

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setProgress(0);
    runDemoSequence();
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const runDemoSequence = async () => {
    for (let i = 0; i < demoSteps.length; i++) {
      if (!isPlaying) break;
      
      setCurrentStep(i);
      const step = demoSteps[i];
      const progressIncrement = 100 / step.duration;
      
      for (let progress = 0; progress <= 100; progress += progressIncrement) {
        if (!isPlaying) break;
        setProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      // Brief pause between steps
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsPlaying(false);
    setProgress(100);
  };

  const deviceFrameClasses = {
    desktop: "w-full max-w-4xl aspect-video",
    tablet: "w-full max-w-2xl aspect-[4/3]",
    mobile: "w-full max-w-sm aspect-[9/16]"
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-[#4A90E2]/10 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl mb-4 bg-gradient-to-r from-[#4A90E2] to-[#F5A623] bg-clip-text text-transparent"
              style={{ fontWeight: '600' }}>
            See EduAdvisor in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Watch how our platform guides students through their career discovery journey
          </p>
          
          {/* Device Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { key: 'desktop', icon: Monitor, label: 'Desktop' },
              { key: 'tablet', icon: Tablet, label: 'Tablet' },
              { key: 'mobile', icon: Smartphone, label: 'Mobile' }
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setSelectedDevice(key as typeof selectedDevice)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedDevice === key
                    ? 'bg-gradient-to-r from-[#4A90E2] to-[#F5A623] text-white'
                    : 'bg-white/10 text-gray-600 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Demo Screen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
          >
            <div className={`${deviceFrameClasses[selectedDevice]} relative`}>
              <Card className="w-full h-full bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 shadow-2xl overflow-hidden">
                <CardContent className="p-0 h-full relative">
                  {/* Mock Browser Header for Desktop */}
                  {selectedDevice === 'desktop' && (
                    <div className="h-8 bg-gray-100 border-b flex items-center px-4 gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="bg-white rounded px-3 py-1 text-xs text-gray-600 inline-block">
                          eduadvisor.com/dashboard
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Demo Content */}
                  <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#4A90E2]/5 to-[#F5A623]/5">
                    {isPlaying ? (
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${demoSteps[currentStep]?.color} flex items-center justify-center`}>
                          <div className="text-white text-2xl">
                            {currentStep + 1}
                          </div>
                        </div>
                        <h3 className="text-xl lg:text-2xl mb-4 text-gray-800" style={{ fontWeight: '600' }}>
                          {demoSteps[currentStep]?.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {demoSteps[currentStep]?.description}
                        </p>
                        <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-[#4A90E2] to-[#F5A623] h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#4A90E2]/20 to-[#F5A623]/20 flex items-center justify-center">
                          <Play className="w-12 h-12 text-[#4A90E2]" />
                        </div>
                        <h3 className="text-xl lg:text-2xl mb-4 text-gray-800" style={{ fontWeight: '600' }}>
                          Interactive Demo
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Experience how EduAdvisor creates your personalized career journey
                        </p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Demo Controls & Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 max-w-md"
          >
            {/* Control Buttons */}
            <div className="flex gap-3 mb-8 justify-center lg:justify-start">
              <Button
                onClick={isPlaying ? pauseDemo : startDemo}
                className="bg-gradient-to-r from-[#4A90E2] to-[#F5A623] hover:from-[#4A90E2]/90 hover:to-[#F5A623]/90 text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Start Demo'}
              </Button>
              
              <Button
                onClick={resetDemo}
                variant="outline"
                className="border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Demo Steps */}
            <div className="space-y-4">
              <h4 className="text-lg text-gray-800 mb-4" style={{ fontWeight: '600' }}>
                Demo Walkthrough
              </h4>
              {demoSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                    currentStep === index && isPlaying
                      ? 'bg-gradient-to-r from-[#4A90E2]/10 to-[#F5A623]/10 border border-[#4A90E2]/30'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    currentStep === index && isPlaying
                      ? `bg-gradient-to-br ${step.color} text-white`
                      : currentStep > index
                      ? 'bg-green-400 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm text-gray-800 mb-1" style={{ fontWeight: '500' }}>
                      {step.title}
                    </h5>
                    <p className="text-xs text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-br from-[#4A90E2]/5 to-[#F5A623]/5 rounded-2xl border border-[#4A90E2]/10"
            >
              <h5 className="text-sm text-gray-800 mb-3" style={{ fontWeight: '600' }}>
                What makes us different?
              </h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#4A90E2] rounded-full"></div>
                  AI-powered career matching
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#F5A623] rounded-full"></div>
                  Real-time progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Expert mentor guidance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  College admission support
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}