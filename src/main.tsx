import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n'
import { aiContentService } from './services/aiContentService'

// Initialize AI service in background for faster user experience
aiContentService.initialize().catch(console.warn);

createRoot(document.getElementById("root")!).render(<App />);
