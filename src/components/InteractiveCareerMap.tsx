import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen, Award, Building, Rocket, ChevronRight, Play } from 'lucide-react';

const careerPathData = {
  "10th": {
    title: "After 10th Grade",
    steps: [
      {
        id: 1,
        title: "Choose Stream",
        icon: BookOpen,
        options: ["Science", "Commerce", "Arts"],
        color: "from-blue-500 to-cyan-500",
        next: [2, 3, 4]
      },
      {
        id: 2,
        title: "Science Path",
        icon: Award,
        options: ["JEE Preparation", "NEET Preparation", "State Boards"],
        color: "from-green-500 to-emerald-500",
        next: [5]
      },
      {
        id: 3,
        title: "Commerce Path",
        icon: Building,
        options: ["CA Foundation", "CS Foundation", "12th Focus"],
        color: "from-purple-500 to-violet-500",
        next: [6]
      },
      {
        id: 4,
        title: "Arts Path",
        icon: Rocket,
        options: ["Design Prep", "Literature", "Social Sciences"],
        color: "from-pink-500 to-rose-500",
        next: [7]
      },
      {
        id: 5,
        title: "Engineering/Medical",
        icon: Award,
        options: ["IIT/NIT", "Medical Colleges", "Research"],
        color: "from-indigo-500 to-blue-600",
        next: []
      },
      {
        id: 6,
        title: "Business/Finance",
        icon: Building,
        options: ["IIM", "CA", "Investment Banking"],
        color: "from-amber-500 to-orange-500",
        next: []
      },
      {
        id: 7,
        title: "Creative/Humanities",
        icon: Rocket,
        options: ["Design Schools", "Media", "Civil Services"],
        color: "from-teal-500 to-cyan-600",
        next: []
      }
    ]
  },
  "12th": {
    title: "After 12th Grade",
    steps: [
      {
        id: 1,
        title: "Entrance Exams",
        icon: BookOpen,
        options: ["JEE Main/Advanced", "NEET", "CLAT", "CAT"],
        color: "from-[#4A90E2] to-[#F5A623]",
        next: [2, 3, 4]
      },
      {
        id: 2,
        title: "Engineering",
        icon: Award,
        options: ["IITs", "NITs", "Private Colleges"],
        color: "from-blue-600 to-indigo-600",
        next: [5]
      },
      {
        id: 3,
        title: "Medical",
        icon: Building,
        options: ["AIIMS", "Government Medical", "Private Medical"],
        color: "from-red-500 to-pink-500",
        next: [6]
      },
      {
        id: 4,
        title: "Management",
        icon: Rocket,
        options: ["IIMs", "Top B-Schools", "Specializations"],
        color: "from-green-500 to-teal-500",
        next: [7]
      },
      {
        id: 5,
        title: "Tech Careers",
        icon: Award,
        options: ["Software Developer", "AI/ML Engineer", "Product Manager"],
        color: "from-purple-500 to-indigo-500",
        next: []
      },
      {
        id: 6,
        title: "Healthcare Careers",
        icon: Building,
        options: ["Doctor", "Surgeon", "Medical Research"],
        color: "from-rose-500 to-red-500",
        next: []
      },
      {
        id: 7,
        title: "Business Careers",
        icon: Rocket,
        options: ["CEO/Founder", "Consultant", "Investment Banker"],
        color: "from-emerald-500 to-green-500",
        next: []
      }
    ]
  }
};

export default function InteractiveCareerMap() {
  const [selectedPath, setSelectedPath] = useState<"10th" | "12th">("12th");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const currentData = careerPathData[selectedPath];

  const handleStepClick = (stepId: number) => {
    if (activeStep === stepId) {
      setActiveStep(null);
    } else {
      setActiveStep(stepId);
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps([...completedSteps, stepId]);
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-[#4A90E2]/5 to-[#F5A623]/5">
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
            Interactive Career Map
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Explore different career paths based on your academic level
          </p>
          
          {/* Path Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {(["10th", "12th"] as const).map((path) => (
              <motion.button
                key={path}
                onClick={() => {
                  setSelectedPath(path);
                  setActiveStep(null);
                  setCompletedSteps([]);
                }}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedPath === path
                    ? 'bg-gradient-to-r from-[#4A90E2] to-[#F5A623] text-white shadow-lg'
                    : 'bg-white border-2 border-[#4A90E2]/20 text-gray-700 hover:border-[#4A90E2]/40'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                After {path} Grade
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Career Map */}
        <div className="relative">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl text-center mb-8 text-gray-800"
            style={{ fontWeight: '600' }}
          >
            {currentData.title}
          </motion.h3>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentData.steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === step.id;
              const isCompleted = completedSteps.includes(step.id);
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 overflow-hidden border-2 ${
                      isActive 
                        ? 'border-[#4A90E2] shadow-xl scale-105' 
                        : isCompleted 
                        ? 'border-green-400 shadow-md' 
                        : 'border-gray-200 hover:border-[#4A90E2]/40 hover:shadow-lg'
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        {isCompleted && (
                          <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                            <Play className="w-3 h-3 text-white fill-current" />
                          </div>
                        )}
                      </div>
                      
                      <h4 className="text-lg mb-3 text-gray-800" style={{ fontWeight: '600' }}>
                        {step.title}
                      </h4>
                      
                      <div className="space-y-2">
                        {step.options.slice(0, isActive ? step.options.length : 2).map((option, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="mr-2 mb-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            {option}
                          </Badge>
                        ))}
                        {!isActive && step.options.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{step.options.length - 2} more
                          </p>
                        )}
                      </div>

                      {step.next.length > 0 && (
                        <div className="flex items-center mt-4 text-sm text-[#4A90E2]">
                          <span>Next Steps</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Connection Lines */}
                  {step.next.length > 0 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <motion.div
                        className="w-6 h-0.5 bg-gradient-to-r from-[#4A90E2] to-[#F5A623]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Demo Hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#4A90E2]/20">
              <div className="w-2 h-2 bg-[#4A90E2] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">Click on any step to explore options</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}