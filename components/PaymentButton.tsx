"use client";
import { reservationProps } from "@/types/reservation";
import { useTransition } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

const PaymentButton = ({ reservation }: { reservation: reservationProps }) => {
  const [isPending, startTransition] = useTransition();
  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { token } = await response.json();
        if (token) {
          window.snap.pay(token);
        }
      } catch (error) {}
    });
  };

  return (
    <button
      onClick={handlePayment}
      className="px-10 py-4 mt-4 text-center font-semibold text-white w-full bg-[var(--gold)] rounded-sm hover:bg-[var(--goldhover)] cursor-pointer"
    >
      Process Payment
    </button>
  );
};

export default PaymentButton;
