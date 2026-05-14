import { Linkedin, Presentation, Mail } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { SlideShell, SlideTitle } from "@/components/slide";

const links = [
  {
    icon: Linkedin,
    label: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/josh-penzell/",
  },
  {
    icon: Presentation,
    label: "Slides live within a week",
    href: "https://www.joshpenzell.com",
  },
  {
    icon: Mail,
    label: "Email Josh",
    href: "mailto:josh@joshpenzell.com",
  },
];

export const OnePagerDownloadScreen = () => (
  <SlideShell tone="indigo" align="center" ariaLabel="Take it with you">
    <div className="space-y-10 max-w-7xl mx-auto w-full text-center">
      <SlideTitle kicker="Take it with you">
        Now go <span className="text-primary">rehearse the future.</span>
      </SlideTitle>

      <p className="text-2xl md:text-3xl text-muted-foreground">
        Josh Penzell · Imagination Applied
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-5xl mx-auto">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 p-5 rounded-2xl border-2 border-border/50 hover:border-primary/60 hover:bg-primary/5 transition-colors"
          >
            <div className="bg-white p-3 rounded-xl">
              <QRCodeSVG value={link.href} size={150} level="M" />
            </div>
            <link.icon className="w-7 h-7 text-primary" aria-hidden="true" />
            <span className="text-lg md:text-xl font-bold text-foreground leading-tight text-center">
              {link.label}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground break-all text-center">
              {link.href.replace(/^https?:\/\//, "").replace(/^mailto:/, "")}
            </span>
          </a>
        ))}
      </div>
    </div>
  </SlideShell>
);