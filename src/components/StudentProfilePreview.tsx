import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { GraduationCap, Brain, Briefcase, Star } from 'lucide-react';

const studentProfiles = [
  {
    id: 1,
    name: "Priya Sharma",
    class: "12th",
    avatar: "PS",
    interests: ["Science", "Research", "Medicine"],
    careerPaths: ["MBBS", "B.Tech Biomedical", "B.Sc Biology"],
    matchScore: 95,
    bgColor: "from-[#4A90E2]/10 to-[#F5A623]/10",
    borderColor: "border-[#4A90E2]/30"
  },
  {
    id: 2,
    name: "Arjun Patel",
    class: "10th",
    avatar: "AP",
    interests: ["Technology", "Coding", "Innovation"],
    careerPaths: ["Computer Science", "Engineering", "Data Science"],
    matchScore: 88,
    bgColor: "from-[#F5A623]/10 to-[#4A90E2]/10",
    borderColor: "border-[#F5A623]/30"
  },
  {
    id: 3,
    name: "Sneha Kumar",
    class: "12th",
    avatar: "SK",
    interests: ["Arts", "Design", "Communication"],
    careerPaths: ["Graphic Design", "Mass Communication", "Fine Arts"],
    matchScore: 92,
    bgColor: "from-purple-100 to-pink-100",
    borderColor: "border-purple-300"
  }
];

export default function StudentProfilePreview() {
  return (
    <section id="demo-section" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
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
            Meet Our Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how EduAdvisor creates personalized profiles and career recommendations for each student
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentProfiles.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className={`overflow-hidden border-2 ${student.borderColor} bg-gradient-to-br ${student.bgColor} hover:shadow-xl transition-all duration-300`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 ring-2 ring-white shadow-md">
                        <AvatarFallback className="bg-gradient-to-br from-[#4A90E2] to-[#F5A623] text-white" style={{ fontWeight: '600' }}>
                          {student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg text-gray-800" style={{ fontWeight: '600' }}>{student.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <GraduationCap className="w-4 h-4" />
                          Class {student.class}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-white/60 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-700" style={{ fontWeight: '600' }}>{student.matchScore}%</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Interests */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-[#4A90E2]" />
                      <span className="text-sm text-gray-600" style={{ fontWeight: '500' }}>Interests</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {student.interests.map((interest, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-white/60 text-gray-700 hover:bg-white/80">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-[#F5A623]" />
                      <span className="text-sm text-gray-600" style={{ fontWeight: '500' }}>Suggested Paths</span>
                    </div>
                    <div className="space-y-2">
                      {student.careerPaths.slice(0, 2).map((path, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center justify-between bg-white/60 p-2 rounded-lg"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-sm text-gray-700">{path}</span>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </motion.div>
                      ))}
                      <div className="text-xs text-gray-500 text-center">
                        +{student.careerPaths.length - 2} more options
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Profile Match</span>
                      <span className="text-xs text-gray-600">{student.matchScore}%</span>
                    </div>
                    <div className="w-full bg-white/40 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-[#4A90E2] to-[#F5A623] h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${student.matchScore}%` }}
                        transition={{ duration: 1.5, delay: index * 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-4">
            Want to see your personalized profile?
          </p>
          <motion.div 
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#4A90E2]/10 to-[#F5A623]/10 rounded-full border border-[#4A90E2]/20 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-[#4A90E2]" style={{ fontWeight: '500' }}>
              Click to see live demo ✨
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}