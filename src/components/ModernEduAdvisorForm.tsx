import React, { useState, useEffect } from 'react';
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
  Check,
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  completedClass: '10th' | '12th' | '';
}

interface ValidationState {
  name: boolean | null;
  email: boolean | null;
  phoneNumber: boolean | null;
  completedClass: boolean | null;
}

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸', label: 'United States' },
  { code: '+91', country: 'IN', flag: '🇮🇳', label: 'India' },
  { code: '+44', country: 'UK', flag: '🇬🇧', label: 'United Kingdom' },
  { code: '+61', country: 'AU', flag: '🇦🇺', label: 'Australia' },
  { code: '+49', country: 'DE', flag: '🇩🇪', label: 'Germany' },
  { code: '+33', country: 'FR', flag: '🇫🇷', label: 'France' },
  { code: '+81', country: 'JP', flag: '🇯🇵', label: 'Japan' },
  { code: '+86', country: 'CN', flag: '🇨🇳', label: 'China' },
];

export default function ModernEduAdvisorForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    completedClass: '',
  });

  const [validation, setValidation] = useState<ValidationState>({
    name: null,
    email: null,
    phoneNumber: null,
    completedClass: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  // Real-time email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Real-time name validation
  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  // Real-time phone validation
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]{8,}$/;
    return phoneRegex.test(phone);
  };

  // Update validation state in real-time
  useEffect(() => {
    const newValidation: ValidationState = {
      name: formData.name ? validateName(formData.name) : null,
      email: formData.email ? validateEmail(formData.email) : null,
      phoneNumber: formData.phoneNumber ? validatePhone(formData.phoneNumber) : null,
      completedClass: formData.completedClass ? true : null,
    };
    setValidation(newValidation);
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
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
      // Trigger shake animation
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
      
      toast.error('Please fix the errors in the form', {
        icon: <AlertCircle className="w-4 h-4" />,
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowSuccess(true);
    
    // Show success state briefly before redirect
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirect based on completed class
    const redirectUrl = formData.completedClass === '10th' 
      ? 'https://v0-eduadvisor101.vercel.app/'
      : 'https://v0-eduadvisor1211.vercel.app/';

    toast.success('Redirecting to your personalized dashboard...', {
      icon: <CheckCircle className="w-4 h-4" />,
    });

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1000);
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
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl text-slate-800 mb-2" style={{ fontWeight: '600' }}>
            Tell Us About Yourself
          </h1>
          <p className="text-slate-600">
            Fill in your details to get started
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8"
        >
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl text-slate-800 mb-2" style={{ fontWeight: '600' }}>
                  Success!
                </h3>
                <p className="text-slate-600">
                  Your profile has been created. Redirecting...
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="flex items-center gap-2 text-slate-700 text-sm">
                    <User className="w-4 h-4 text-blue-500" />
                    Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        clearError('name');
                      }}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`transition-all duration-300 border-2 ${
                        errors.name 
                          ? 'border-red-400 focus:border-red-500' 
                          : validation.name === true
                          ? 'border-green-400 focus:border-green-500'
                          : validation.name === false
                          ? 'border-orange-400 focus:border-orange-500'
                          : focusedField === 'name'
                          ? 'border-blue-400 focus:border-blue-500'
                          : 'border-slate-200 focus:border-blue-400'
                      } focus:ring-4 focus:ring-blue-100 bg-white/80 backdrop-blur-sm ${
                        focusedField === 'name' ? 'scale-[1.02]' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                    {validation.name !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {validation.name ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-orange-500" />
                        )}
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="flex items-center gap-2 text-slate-700 text-sm">
                    <Mail className="w-4 h-4 text-blue-500" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        clearError('email');
                      }}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`transition-all duration-300 border-2 ${
                        errors.email 
                          ? 'border-red-400 focus:border-red-500' 
                          : validation.email === true
                          ? 'border-green-400 focus:border-green-500'
                          : validation.email === false
                          ? 'border-orange-400 focus:border-orange-500'
                          : focusedField === 'email'
                          ? 'border-blue-400 focus:border-blue-500'
                          : 'border-slate-200 focus:border-blue-400'
                      } focus:ring-4 focus:ring-blue-100 bg-white/80 backdrop-blur-sm ${
                        focusedField === 'email' ? 'scale-[1.02]' : ''
                      }`}
                      placeholder="Enter your email address"
                    />
                    {validation.email !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {validation.email ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-orange-500" />
                        )}
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone Number Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label className="flex items-center gap-2 text-slate-700 text-sm">
                    <Phone className="w-4 h-4 text-blue-500" />
                    Phone Number
                  </Label>
                  <div className="flex gap-2">
                    <Select 
                      value={formData.countryCode} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                    >
                      <SelectTrigger className="w-28 border-2 border-slate-200 focus:border-blue-400 bg-white/80 backdrop-blur-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-xl border border-white/50">
                        {countryCodes.map((item) => (
                          <SelectItem key={item.code} value={item.code} className="hover:bg-blue-50">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{item.flag}</span>
                              <span>{item.code}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Input
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, phoneNumber: e.target.value }));
                          clearError('phoneNumber');
                        }}
                        onFocus={() => setFocusedField('phoneNumber')}
                        onBlur={() => setFocusedField(null)}
                        className={`transition-all duration-300 border-2 ${
                          errors.phoneNumber 
                            ? 'border-red-400 focus:border-red-500' 
                            : validation.phoneNumber === true
                            ? 'border-green-400 focus:border-green-500'
                            : validation.phoneNumber === false
                            ? 'border-orange-400 focus:border-orange-500'
                            : focusedField === 'phoneNumber'
                            ? 'border-blue-400 focus:border-blue-500'
                            : 'border-slate-200 focus:border-blue-400'
                        } focus:ring-4 focus:ring-blue-100 bg-white/80 backdrop-blur-sm ${
                          focusedField === 'phoneNumber' ? 'scale-[1.02]' : ''
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {validation.phoneNumber !== null && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {validation.phoneNumber ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-orange-500" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    {errors.phoneNumber && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.phoneNumber}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Completed Class Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-3"
                >
                  <Label className="flex items-center gap-2 text-slate-700 text-sm">
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    Highest Completed Class
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['10th', '12th'] as const).map((classType) => (
                      <motion.div
                        key={classType}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.completedClass === classType
                            ? 'border-blue-400 bg-blue-50/80 shadow-lg'
                            : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 bg-white/50'
                        }`}
                        onClick={() => handleClassSelection(classType)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-slate-800" style={{ fontWeight: '500' }}>
                              {classType} Grade
                            </div>
                            <div className="text-sm text-slate-500">
                              {classType === '10th' ? 'Just completed 10th' : 'Completed 12th grade'}
                            </div>
                          </div>
                          <motion.div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              formData.completedClass === classType
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-slate-300'
                            }`}
                            layout
                          >
                            <AnimatePresence>
                              {formData.completedClass === classType && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="w-3 h-3 text-white" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <AnimatePresence>
                    {errors.completedClass && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.completedClass}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    x: shouldShake ? [-5, 5, -5, 5, 0] : 0
                  }}
                  transition={{ 
                    delay: 0.8,
                    x: { duration: 0.5, ease: "easeInOut" }
                  }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base"
                    style={{ fontWeight: '500' }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Processing...</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Submit
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-6 text-sm text-slate-500"
        >
          <p>🔒 Your information is secure and encrypted</p>
        </motion.div>
      </motion.div>
    </div>
  );
}