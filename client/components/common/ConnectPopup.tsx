import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

interface ConnectPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inquiryTypes = [
  "Press",
  "Partner",
  "Government Body",
  "Insurance Agency",
] as const;

const NETLIFY_FORM_PATH = "/__forms.html";

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "validation-error"
  | "submit-error";

function encodeFormData(formData: FormData) {
  const params = new URLSearchParams();

  formData.forEach((value, key) => {
    params.append(key, value.toString());
  });

  return params.toString();
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-figtree text-body-lg uppercase leading-none tracking-normal text-bg-dark max-md:text-sm">
      [ {children}
      <span className="text-[#F15D59]">*</span> ]
    </span>
  );
}

function TextField({
  label,
  type = "text",
  name,
}: {
  label: string;
  type?: string;
  name: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        name={name}
        type={type}
        required
        className="mt-0 h-8 w-full border-0 border-b border-bg-dark/75 bg-transparent px-0 font-figtree text-lg text-bg-dark outline-none transition focus:border-bg-dark max-md:h-6 max-md:text-sm"
      />
    </label>
  );
}

export default function ConnectPopup({ open, onOpenChange }: ConnectPopupProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [inquiryType, setInquiryType] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inquiryType) {
      setSubmitStatus("validation-error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("form-name", "connect");
    formData.set("inquiryType", inquiryType);

    setSubmitStatus("submitting");

    if (import.meta.env.DEV) {
      formRef.current?.reset();
      setInquiryType("");
      setSubmitStatus("success");
      return;
    }

    try {
      const response = await fetch(NETLIFY_FORM_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      formRef.current?.reset();
      setInquiryType("");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("submit-error");
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg-dark/60 backdrop-blur-[10px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[min(65.4vw,1256px)] max-w-[calc(100vw-48px)] max-h-[calc(100vh-80px)] overflow-y-auto -translate-x-1/2 -translate-y-1/2 rounded-[18px] bg-[#F7F7F7]/95 px-[3.65vw] pb-[3.2vw] pt-[3.3vw] shadow-[18px_20px_30px_rgba(0,0,0,0.22)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 max-lg:w-[min(88vw,900px)] max-lg:px-8 max-lg:py-9 max-md:max-h-[80vh] max-md:w-[calc(100vw-32px)] max-md:rounded-[14px] max-md:px-5 max-md:py-7">
          <DialogPrimitive.Title className="sr-only">
            Connect with WYWA
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Send the WYWA team your contact details and inquiry.
          </DialogPrimitive.Description>

          <form
            ref={formRef}
            name="connect"
            method="POST"
            action={NETLIFY_FORM_PATH}
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="connect" />
            <div className="grid grid-cols-2 gap-x-[3vw] gap-y-[2.25vw] max-md:grid-cols-1 max-md:gap-y-3.5">
              <TextField label="Name" name="name" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Phone" name="phone" type="tel" />
              <TextField label="Organization" name="organization" />

              <label className="relative col-span-1 max-md:col-span-1">
                <FieldLabel>Inquiry Type</FieldLabel>
                <input type="hidden" name="inquiryType" value={inquiryType} />
                <SelectPrimitive.Root
                  value={inquiryType}
                  onValueChange={(value) => {
                    setInquiryType(value);
                    setSubmitStatus("idle");
                  }}
                >
                  <SelectPrimitive.Trigger className="mt-1.5 flex h-8 w-full items-center justify-between border-0 border-b border-bg-dark/75 bg-transparent px-0 font-figtree text-lg text-bg-dark outline-none transition focus:border-bg-dark max-md:h-6 max-md:text-sm">
                    <SelectPrimitive.Value />
                    <SelectPrimitive.Icon asChild>
                      <ChevronDown
                        aria-hidden="true"
                        className="h-9 w-9 shrink-0 fill-[#F15D59] text-[#F15D59] max-md:h-7 max-md:w-7"
                        strokeWidth={0}
                      />
                    </SelectPrimitive.Icon>
                  </SelectPrimitive.Trigger>
                  <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                      position="popper"
                      sideOffset={4}
                      align="start"
                      className="z-[70] w-[var(--radix-select-trigger-width)] overflow-hidden bg-[#F7F7F7] py-1 shadow-[8px_10px_22px_rgba(0,0,0,0.18)] max-md:w-[min(var(--radix-select-trigger-width),220px)]"
                    >
                      <SelectPrimitive.Viewport>
                        {inquiryTypes.map((type) => (
                          <SelectPrimitive.Item
                            key={type}
                            value={type}
                            className="cursor-pointer px-3 py-2 font-figtree text-base uppercase leading-none text-bg-dark outline-none transition data-[highlighted]:bg-[#F15D59] data-[highlighted]:text-white max-md:text-xs"
                          >
                            <SelectPrimitive.ItemText>{type}</SelectPrimitive.ItemText>
                          </SelectPrimitive.Item>
                        ))}
                      </SelectPrimitive.Viewport>
                    </SelectPrimitive.Content>
                  </SelectPrimitive.Portal>
                </SelectPrimitive.Root>
              </label>
            </div>

            <label className="mt-[2.55vw] block max-md:mt-5">
              <FieldLabel>Message</FieldLabel>
              <textarea
                name="message"
                required
                className="mt-2 block h-[112px] w-[58.8%] resize-none border border-bg-dark/75 bg-transparent p-3 font-figtree text-lg leading-snug text-bg-dark outline-none transition focus:border-bg-dark max-lg:w-full max-md:text-sm"
              />
            </label>

            <button
              type="submit"
              disabled={submitStatus === "submitting"}
              className="mt-[5.55vw] flex w-full items-end justify-between gap-6 border-b border-bg-dark pb-[2.35vw] text-left text-bg-dark transition max-md:mt-8 max-md:pb-4"
            >
              <span className="font-body text-[clamp(4rem,8vw,8rem)] uppercase leading-[0.72] tracking-normal max-md:text-[clamp(2.7rem,13vw,3.8rem)]">
                {submitStatus === "submitting" ? "Sending" : "Submit"}
              </span>
              <svg className="h-[clamp(2.8rem,5.6vw,5.6rem)] w-[clamp(2.8rem,5.6vw,5.6rem)] shrink-0 max-md:h-[clamp(2rem,9vw,2.9rem)] max-md:w-[clamp(2rem,9vw,2.9rem)]" width="123" height="123" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M108.722 13.5909L5.30859 117.004M23.558 9.22234C23.558 9.22234 96.9924 3.03198 108.136 14.1759C119.281 25.3199 113.089 98.7545 113.089 98.7545"
                  stroke="#242425"
                  strokeWidth="15.0154"
                  strokeLinejoin="round"
                />
              </svg>

            </button>

            {submitStatus === "success" && (
              <p className="mt-5 font-figtree text-body-lg uppercase leading-none tracking-normal text-[#F15D59] max-md:text-sm">
                Thanks. Your message has been sent.
              </p>
            )}

            {submitStatus === "validation-error" && (
              <p className="mt-5 font-figtree text-body-lg uppercase leading-none tracking-normal text-[#F15D59] max-md:text-sm">
                Please choose an inquiry type and try again.
              </p>
            )}

            {submitStatus === "submit-error" && (
              <p className="mt-5 font-figtree text-body-lg uppercase leading-none tracking-normal text-[#F15D59] max-md:text-sm">
                We could not send your message. Please try again or email us.
              </p>
            )}

            <p className="mt-5 font-figtree text-body-lg uppercase leading-none tracking-normal text-bg-dark max-md:text-sm">
              Or email us at{" "}
              <a
                href="mailto:nveeturi@wywa.ai"
                className="text-[#F15D59] underline underline-offset-2"
              >
                nveeturi@wywa.ai
              </a>
            </p>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
