import { Twitter, Linkedin, Instagram, Mail, ExternalLink, MapPin, Phone, Globe } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="px-6 py-8 lg:px-8">
        <div className="mb-8 rounded-lg bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-4/10 p-6 border border-primary/20">
          <h3 className="text-lg font-bold mb-4 text-center">Join Our Global Community</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="relative h-32 rounded-lg overflow-hidden border-2 border-primary/20 hover:scale-105 transition-transform duration-300">
              <Image src="/diverse-group.png" alt="Diverse community members" fill className="object-cover" />
            </div>
            <div className="relative h-32 rounded-lg overflow-hidden border-2 border-primary/20 hover:scale-105 transition-transform duration-300">
              <Image src="/diverse-team-working-on-sustainability-project.jpg" alt="Team collaboration" fill className="object-cover" />
            </div>
            <div className="relative h-32 rounded-lg overflow-hidden border-2 border-primary/20 hover:scale-105 transition-transform duration-300">
              <Image src="/environmental-celebration.png" alt="Celebrating achievements" fill className="object-cover" />
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            Over <span className="font-bold text-primary">50,000+</span> sustainability champions worldwide
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {/* About */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">About EcoLens AI</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering individuals and organizations to make sustainable choices through AI-powered insights and
              community engagement.
            </p>
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Globe className="h-3 w-3 text-primary animate-spin" style={{ animationDuration: "10s" }} />
                <span>Active in 120+ countries</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary animate-pulse" />
                <span>5,000+ partner locations</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  Contact Us
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  About Our Mission
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  Privacy Policy
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  Careers
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  Partner With Us
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@ecolens.ai</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="leading-relaxed">
                  123 Green Street
                  <br />
                  San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Connect With Us</h3>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:rotate-12"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:rotate-12"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:rotate-12"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 hover:rotate-12"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-9 px-3 rounded-lg bg-muted text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EcoLens AI. Building a sustainable future together.
          </p>
          <p className="text-xs text-muted-foreground">
            Certified B Corporation • Climate Neutral Certified • 1% for the Planet Member
          </p>
        </div>
      </div>
    </footer>
  )
}
