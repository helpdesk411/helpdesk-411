import React, { createContext, useContext, useState, ReactNode } from "react";

interface QuoteModalState {
  isOpen: boolean;
  planName: string;
  planPrice: number;
  planDescription: string;
  isPopular: boolean;
}

interface QuoteModalContextType {
  modalState: QuoteModalState;
  openModal: (planName: string, planPrice: number, planDescription: string, isPopular?: boolean) => void;
  closeModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<QuoteModalState>({
    isOpen: false,
    planName: "",
    planPrice: 0,
    planDescription: "",
    isPopular: false
  });

  const openModal = (planName: string, planPrice: number, planDescription: string, isPopular: boolean = false) => {
    setModalState({
      isOpen: true,
      planName,
      planPrice,
      planDescription,
      isPopular
    });
  };

  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  return (
    <QuoteModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (context === undefined) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
