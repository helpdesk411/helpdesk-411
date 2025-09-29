import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageA from "@/pages/PageA";
import { QuoteModal } from "@/components/QuoteModal";
import { QuoteModalProvider, useQuoteModal } from "@/contexts/QuoteModalContext";
import { ChatWidget } from "@/components/ChatWidget";

function AppContent() {
  const { modalState, closeModal } = useQuoteModal();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageA />} />
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
      
      {/* Chat Widget */}
      <ChatWidget />
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