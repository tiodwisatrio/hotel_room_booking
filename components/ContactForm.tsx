"use client";
import { useActionState, useEffect, useRef } from "react";
import { ContactMessage } from "@/libs/actions";
import clsx from "clsx";

// Definisikan tipe untuk state yang akan digunakan
interface FormState {
  error?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
  message?: string;
}

// Definisikan state awal untuk form
const initialState: FormState = {
  error: undefined,
  message: undefined,
};

const ContactForm = () => {
  // Menggunakan useActionState dengan state awal dan Server Action
  const [state, formAction, isPending] = useActionState(
    ContactMessage,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Efek untuk mereset form setelah berhasil dikirim
  useEffect(() => {
    if (state?.message && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <div className="bg-[var(--background)] shadow-[0px_5px_28px_-5px_rgba(255,_255,_255,_0.04)] p-8 rounded-md">
      {/* Menampilkan pesan sukses */}
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
          role="alert"
        >
          <div className="font-medium">{state.message}</div>
        </div>
      ) : null}

      {/* Menampilkan pesan error umum */}
      {state?.error &&
        !state.error.name &&
        !state.error.email &&
        !state.error.subject &&
        !state.error.message && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <div className="font-medium">An unexpected error occurred.</div>
          </div>
        )}

      <form action={formAction} ref={formRef}>
        <div className="grid md:grid-cols-2 gap-7 mt-6">
          <div>
            <input
              type="text"
              name="name"
              className="bg-[#1a1b1c] text-white p-3  rounded-sm w-full font-light  focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              placeholder="Name"
            />
            <div aria-live="polite" aria-atomic="true">
              {/* Menampilkan error validasi untuk field 'name' */}
              {state?.error?.name && (
                <p className="text-sm text-red-500 mt-1">
                  {state.error.name[0]}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="bg-[#1a1b1c] text-white p-3 rounded-sm w-full font-light focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              placeholder="john@example.com"
            />
            <div aria-live="polite" aria-atomic="true">
              {/* Menampilkan error validasi untuk field 'email' */}
              {state?.error?.email && (
                <p className="text-sm text-red-500 mt-1">
                  {state.error.email[0]}
                </p>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              className="bg-[#1a1b1c] text-white p-3 rounded-sm w-full font-ligh t focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              placeholder="Subject"
            />
            <div aria-live="polite" aria-atomic="true">
              {/* Menampilkan error validasi untuk field 'subject' */}
              {state?.error?.subject && (
                <p className="text-sm text-red-500 mt-1">
                  {state.error.subject[0]}
                </p>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <textarea
              name="message"
              className="bg-[#1a1b1c] text-white p-3 rounded-sm w-full font-light focus-within:*:outline-none focus:outline-none focus:ring-2 focus:ring-[var(--gold)] h-32"
              placeholder="Your Messages"
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              {/* Menampilkan error validasi untuk field 'message' */}
              {state?.error?.message && (
                <p className="text-sm text-red-500 mt-1">
                  {state.error.message[0]}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={clsx(
            "px-10 py-4 text-center font-semibold text-white w-full bg-[var(--gold)] rounded-sm hover:bg-[var(--goldhover)] cursor-pointer mt-4",
            { "opacity-50 cursor-progress animate-pulse": isPending }
          )}
          disabled={isPending}
        >
          {isPending ? "Loading" : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
