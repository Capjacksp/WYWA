import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ConnectPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Connect popup modal.
 * Accessible via the "Connect" button in the Header.
 * Uses Radix Dialog underneath for focus trap, ESC-to-close, and overlay.
 */
export default function ConnectPopup({ open, onOpenChange }: ConnectPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-h3">
            Let's Connect
          </DialogTitle>
          <DialogDescription className="text-body text-muted-foreground">
            Get in touch with the WYWA team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Placeholder — will be designed with actual content */}
          <p className="text-body text-muted-foreground">
            Connect popup content goes here. This will be designed during the
            page implementation phase.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
