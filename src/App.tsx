import SimpleEduAdvisorForm from './components/SimpleEduAdvisorForm';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
          },
        }}
      />
      
      <SimpleEduAdvisorForm />
    </div>
  );
}