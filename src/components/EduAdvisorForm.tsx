import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { User, Mail, Phone, GraduationCap, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  completedClass: '10th' | '12th' | '';
}

const countryCodes = [
  { code: '+1', country: 'US/CA' },
  { code: '+91', country: 'IN' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'AU' },
  { code: '+49', country: 'DE' },
  { code: '+33', country: 'FR' },
];

export default function EduAdvisorForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    completedClass: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.completedClass) {
      newErrors.completedClass = 'Please select your completed class';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    
    // Show success toast
    toast.success('Form submitted successfully! Redirecting...', {
      icon: <CheckCircle className="w-4 h-4" />,
    });

    // Simulate form processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirect based on completed class
    const redirectUrl = formData.completedClass === '10th' 
      ? 'https://v0-eduadvisor101.vercel.app/'
      : 'https://v0-eduadvisor121.vercel.app/';

    window.location.href = redirectUrl;
  };

  const handleClassSelection = (classType: '10th' | '12th') => {
    setFormData(prev => ({
      ...prev,
      completedClass: prev.completedClass === classType ? '' : classType
    }));
    if (errors.completedClass) {
      setErrors(prev => ({ ...prev, completedClass: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <Label htmlFor="name" className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-[#4A90E2]" />
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, name: e.target.value }));
              if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
            }}
            className={`transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2] ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4 text-[#4A90E2]" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, email: e.target.value }));
              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
            }}
            className={`transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2] ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </motion.div>

        {/* Phone Number Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <Label className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4 text-[#4A90E2]" />
            Phone Number
          </Label>
          <div className="flex gap-2">
            <Select value={formData.countryCode} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, countryCode: value }))
            }>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((item) => (
                  <SelectItem key={item.code} value={item.code}>
                    {item.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, phoneNumber: e.target.value }));
                if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
              }}
              className={`flex-1 transition-all duration-200 focus:ring-2 focus:ring-[#4A90E2] ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter phone number"
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </motion.div>

        {/* Completed Class Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Label className="flex items-center gap-2 text-gray-700">
            <GraduationCap className="w-4 h-4 text-[#4A90E2]" />
            Completed Class
          </Label>
          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                formData.completedClass === '10th'
                  ? 'border-[#4A90E2] bg-[#4A90E2]/10'
                  : 'border-gray-200 hover:border-[#4A90E2]/50'
              }`}
              onClick={() => handleClassSelection('10th')}
            >
              <Checkbox
                id="10th"
                checked={formData.completedClass === '10th'}
                onCheckedChange={() => handleClassSelection('10th')}
                className="border-[#4A90E2]"
              />
              <Label htmlFor="10th" className="cursor-pointer">
                10th Grade
              </Label>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                formData.completedClass === '12th'
                  ? 'border-[#4A90E2] bg-[#4A90E2]/10'
                  : 'border-gray-200 hover:border-[#4A90E2]/50'
              }`}
              onClick={() => handleClassSelection('12th')}
            >
              <Checkbox
                id="12th"
                checked={formData.completedClass === '12th'}
                onCheckedChange={() => handleClassSelection('12th')}
                className="border-[#4A90E2]"
              />
              <Label htmlFor="12th" className="cursor-pointer">
                12th Grade
              </Label>
            </motion.div>
          </div>
          {errors.completedClass && (
            <p className="text-red-500 text-sm">{errors.completedClass}</p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#4A90E2] to-[#F5A623] hover:from-[#4A90E2]/90 hover:to-[#F5A623]/90 text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Start Your Journey'
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}