import { useState } from "react";

interface QuoteModalState {
  isOpen: boolean;
  planName: string;
  planPrice: number;
  planDescription: string;
  isPopular: boolean;
}

export function useQuoteModal() {
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

  return {
    modalState,
    openModal,
    closeModal
  };
}
