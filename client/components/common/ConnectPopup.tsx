import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface ConnectPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inquiryTypes = [
  "Partnership",
  "Pilot deployment",
  "Investment",
  "Press",
  "General inquiry",
] as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-body text-[clamp(1.05rem,1.28vw,1.55rem)] uppercase leading-none tracking-normal text-bg-dark">
      [ {children}
      <span className="text-[#FF5B5B]">*</span> ]
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
        className="mt-3 h-8 w-full border-0 border-b border-bg-dark/75 bg-transparent px-0 font-figtree text-lg text-bg-dark outline-none transition focus:border-bg-dark"
      />
    </label>
  );
}

export default function ConnectPopup({ open, onOpenChange }: ConnectPopupProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg-dark/55 backdrop-blur-[6px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[min(65.4vw,1256px)] max-w-[calc(100vw-48px)] -translate-x-1/2 -translate-y-1/2 rounded-[18px] bg-[#F7F7F7]/95 px-[3.65vw] pb-[3.2vw] pt-[3.3vw] shadow-[18px_20px_30px_rgba(0,0,0,0.22)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 max-lg:w-[min(88vw,900px)] max-lg:px-8 max-lg:py-9 max-md:max-h-[calc(100vh-40px)] max-md:w-[calc(100vw-32px)] max-md:overflow-y-auto max-md:rounded-[14px] max-md:px-5 max-md:py-7">
          <DialogPrimitive.Title className="sr-only">
            Connect with WYWA
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Send the WYWA team your contact details and inquiry.
          </DialogPrimitive.Description>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-[3vw] gap-y-[2.25vw] max-md:grid-cols-1 max-md:gap-y-6">
              <TextField label="Name" name="name" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Phone" name="phone" type="tel" />
              <TextField label="Organization" name="organization" />

              <label className="relative col-span-1 max-md:col-span-1">
                <FieldLabel>Inquiry Type</FieldLabel>
                <select
                  name="inquiryType"
                  required
                  defaultValue=""
                  className="mt-3 h-8 w-full appearance-none border-0 border-b border-bg-dark/75 bg-transparent px-0 pr-12 font-figtree text-lg text-bg-dark outline-none transition focus:border-bg-dark"
                >
                  <option value="" disabled />
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-1 right-0 h-9 w-9 fill-[#FF5B5B] text-[#FF5B5B]"
                  strokeWidth={0}
                />
              </label>
            </div>

            <label className="mt-[2.55vw] block max-md:mt-7">
              <FieldLabel>Message</FieldLabel>
              <textarea
                name="message"
                required
                className="mt-3 h-[112px] w-[58.8%] resize-none border border-bg-dark/75 bg-transparent p-3 font-figtree text-lg leading-snug text-bg-dark outline-none transition focus:border-bg-dark max-lg:w-full"
              />
            </label>

            <button
              type="submit"
              className="mt-[5.55vw] flex w-full items-end justify-between gap-6 border-b border-bg-dark pb-[2.35vw] text-left text-bg-dark transition hover:text-[#FF5B5B] max-md:mt-12 max-md:pb-5"
            >
              <span className="font-body text-[clamp(5.5rem,8.7vw,10rem)] uppercase leading-[0.72] tracking-normal max-md:text-[clamp(4.5rem,22vw,7rem)]">
                Submit
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="mb-2 h-[6.7vw] w-[6.7vw] min-h-16 min-w-16 stroke-[1.6] max-md:h-16 max-md:w-16"
              />
            </button>

            <p className="mt-5 font-body text-[clamp(1rem,1.15vw,1.35rem)] uppercase leading-none tracking-normal text-bg-dark">
              Or email us at{" "}
              <a
                href="mailto:connect@wywa.ai"
                className="text-[#FF5B5B] underline underline-offset-2"
              >
                connect@wywa.ai
              </a>
            </p>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
