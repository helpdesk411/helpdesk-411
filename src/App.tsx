import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageA from "@/pages/PageA";
import PageB from "@/pages/PageB";
import PageC from "@/pages/PageC";
import { QuoteModal } from "@/components/QuoteModal";
import { QuoteModalProvider, useQuoteModal } from "@/contexts/QuoteModalContext";

function AppContent() {
  const { modalState, closeModal } = useQuoteModal();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageA />} />
        <Route path="/b" element={<PageB />} />
        <Route path="/c" element={<PageC />} />
      </Routes>
      
      {/* Global Quote Modal */}
      <QuoteModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        planName={modalState.planName}
        planPrice={modalState.planPrice}
        planDescription={modalState.planDescription}
        isPopular={modalState.isPopular}
      />
    </Router>
  );
}

function App() {
  return (
    <QuoteModalProvider>
      <AppContent />
    </QuoteModalProvider>
  );
}

export default App;