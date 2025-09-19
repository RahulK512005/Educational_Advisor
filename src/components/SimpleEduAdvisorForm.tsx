import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  CheckCircle, 
  AlertCircle,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  completedClass: '10th' | '12th' | '';
}

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
];

export default function SimpleEduAdvisorForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    completedClass: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
      toast.error('Please fix the errors in the form', {
        icon: <AlertCircle className="w-4 h-4" />,
      });
      return;
    }

    setIsSubmitting(true);
    
    // Show success toast
    toast.success('Form submitted successfully! Redirecting...', {
      icon: <CheckCircle className="w-4 h-4" />,
    });

    // Simulate processing
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

  const clearError = (field: keyof FormData) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-slate-800 mb-2 font-semibold">
            Tell Us About Yourself
          </h1>
          <p className="text-slate-600">
            Fill in your details to get started
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                <User className="w-4 h-4 text-blue-500" />
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  clearError('name');
                }}
                className={`border-2 transition-colors duration-200 ${
                  errors.name 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-slate-200 focus:border-blue-400'
                } bg-white/80`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                <Mail className="w-4 h-4 text-blue-500" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, email: e.target.value }));
                  clearError('email');
                }}
                className={`border-2 transition-colors duration-200 ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-slate-200 focus:border-blue-400'
                } bg-white/80`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                <Phone className="w-4 h-4 text-blue-500" />
                Phone Number
              </Label>
              <div className="flex gap-2">
                <Select 
                  value={formData.countryCode} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                >
                  <SelectTrigger className="w-28 border-2 border-slate-200 bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-200">
                    {countryCodes.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        <div className="flex items-center gap-2">
                          <span>{item.flag}</span>
                          <span>{item.code}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, phoneNumber: e.target.value }));
                    clearError('phoneNumber');
                  }}
                  className={`flex-1 border-2 transition-colors duration-200 ${
                    errors.phoneNumber 
                      ? 'border-red-400 focus:border-red-500' 
                      : 'border-slate-200 focus:border-blue-400'
                  } bg-white/80`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Completed Class Field */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                Highest Completed Class
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {(['10th', '12th'] as const).map((classType) => (
                  <button
                    key={classType}
                    type="button"
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.completedClass === classType
                        ? 'border-blue-400 bg-blue-50/80'
                        : 'border-slate-200 hover:border-blue-300 bg-white/50'
                    }`}
                    onClick={() => handleClassSelection(classType)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-slate-800 font-medium">
                          {classType} Grade
                        </div>
                        <div className="text-sm text-slate-500">
                          {classType === '10th' ? 'Just completed 10th' : 'Completed 12th grade'}
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          formData.completedClass === classType
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300'
                        }`}
                      >
                        {formData.completedClass === classType && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.completedClass && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.completedClass}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 disabled:opacity-50 shadow-lg text-base font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-slate-500">
          <p>🔒 Your information is secure and encrypted</p>
        </div>
      </motion.div>
    </div>
  );
}