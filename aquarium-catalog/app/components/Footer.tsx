import { Camera, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-heading text-base font-semibold text-foreground">
            Company Name
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Premium aquarium plants for every aquascape.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp (placeholder)
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <Camera className="size-4" aria-hidden="true" />
            Instagram (placeholder)
          </a>
        </div>
      </div>
    </footer>
  );
}
