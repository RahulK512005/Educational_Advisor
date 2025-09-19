import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Rahul Verma",
    class: "12th Graduate",
    avatar: "RV",
    rating: 5,
    text: "EduAdvisor helped me discover my passion for engineering. I'm now at IIT Delhi pursuing Computer Science!",
    achievement: "IIT Delhi - CSE",
    bgGradient: "from-blue-50 to-indigo-50",
    avatarGradient: "from-[#4A90E2] to-blue-600"
  },
  {
    id: 2,
    name: "Ananya Singh",
    class: "10th Graduate",
    avatar: "AS",
    rating: 5,
    text: "The career guidance was spot-on! I chose Science stream and now I'm preparing for NEET with confidence.",
    achievement: "NEET Aspirant",
    bgGradient: "from-green-50 to-emerald-50",
    avatarGradient: "from-[#F5A623] to-orange-600"
  },
  {
    id: 3,
    name: "Vikram Reddy",
    class: "12th Graduate",
    avatar: "VR",
    rating: 5,
    text: "I was confused about my career path. EduAdvisor's personalized recommendations led me to pursue CA.",
    achievement: "CA Intermediate",
    bgGradient: "from-purple-50 to-violet-50",
    avatarGradient: "from-purple-500 to-violet-600"
  },
  {
    id: 4,
    name: "Priya Iyer",
    class: "10th Graduate",
    avatar: "PI",
    rating: 5,
    text: "The platform made choosing my stream so much easier. Now I'm excelling in Commerce and planning for MBA.",
    achievement: "Commerce Topper",
    bgGradient: "from-rose-50 to-pink-50",
    avatarGradient: "from-rose-500 to-pink-600"
  },
  {
    id: 5,
    name: "Arjun Malhotra",
    class: "12th Graduate",
    avatar: "AM",
    rating: 5,
    text: "EduAdvisor's career map showed me possibilities I never knew existed. Now I'm at AIIMS pursuing medicine!",
    achievement: "AIIMS Delhi - MBBS",
    bgGradient: "from-teal-50 to-cyan-50",
    avatarGradient: "from-teal-500 to-cyan-600"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlay(false);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl mb-4 bg-gradient-to-r from-[#4A90E2] to-[#F5A623] bg-clip-text text-transparent"
              style={{ fontWeight: '600' }}>
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from students who found their perfect career path with EduAdvisor
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className={`mx-4 border-0 shadow-xl bg-gradient-to-br ${testimonial.bgGradient}`}>
                    <CardContent className="p-8 lg:p-12">
                      <div className="flex flex-col items-center text-center">
                        {/* Quote Icon */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="mb-6"
                        >
                          <Quote className="w-12 h-12 text-[#4A90E2]/30" />
                        </motion.div>

                        {/* Testimonial Text */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                          className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed italic"
                        >
                          "{testimonial.text}"
                        </motion.p>

                        {/* Student Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="flex flex-col items-center"
                        >
                          <Avatar className="w-16 h-16 mb-4 ring-4 ring-white shadow-lg">
                            <AvatarFallback className={`bg-gradient-to-br ${testimonial.avatarGradient} text-white`}
                                           style={{ fontWeight: '600' }}>
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                          
                          <h4 className="text-xl text-gray-800 mb-1" style={{ fontWeight: '600' }}>
                            {testimonial.name}
                          </h4>
                          
                          <p className="text-gray-600 mb-2">{testimonial.class}</p>
                          
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          
                          <div className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full">
                            <span className="text-sm text-[#4A90E2]" style={{ fontWeight: '500' }}>
                              {testimonial.achievement}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#4A90E2] hover:bg-white transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-[#4A90E2] hover:bg-white transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-[#4A90E2] to-[#F5A623] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isAutoPlay ? 'Auto-playing' : 'Paused'} • Click to {isAutoPlay ? 'pause' : 'resume'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}