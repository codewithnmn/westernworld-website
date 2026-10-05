/** Business details shown across the site. */
export const SITE = {
  name: "Western World Visa Services",
  shortName: "WWVS",
  legalName: "Western World Visa Services Pvt. Ltd.",
  url: "https://www.westernworldvisaservices.com",
  address: "1st Floor, POWER HOUSE CHOWK, above CANARA Bank, Model Town, Rohtak, Haryana 124001",
  phones: ["+91-7027022554", "+91-9812727721"],
  email: "info@westernworldvisaservices.com",
  whatsapp: "https://api.whatsapp.com/send?phone=917027022554",
  webmail: "https://webmail.westernworldvisaservices.com/",
  social: {
    facebook: "https://www.facebook.com/westernworldvisaservices/",
    instagram: "https://www.instagram.com/westernworldvisaservices/?hl=en",
    linkedin: "https://in.linkedin.com/in/western-world-visa-services-288826235?trk=public_profile_browsemap",
  },
  footerAbout:
    "Western World Visa Services is an overseas educational consultancy dedicated towards providing services to Indian students in making educational avenues in countries...",
};

export const tel = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

export type NavItem = { label: string; href: string; children?: NavItem[] };

/** Study destinations, each with its nearest major airport and a typical flight time from Delhi (for the departures board). */
export const DESTINATIONS = [
  { slug: "canada", name: "Canada", code: "YYZ", city: "Toronto", flight: "14h 30m" },
  { slug: "uk", name: "UK", code: "LHR", city: "London", flight: "9h 45m" },
  { slug: "usa", name: "USA", code: "JFK", city: "New York", flight: "15h 30m" },
  { slug: "germany", name: "Germany", code: "FRA", city: "Frankfurt", flight: "8h 40m" },
  { slug: "france", name: "France", code: "CDG", city: "Paris", flight: "9h 15m" },
  { slug: "ireland", name: "Ireland", code: "DUB", city: "Dublin", flight: "11h 50m" },
  { slug: "new-zealand", name: "New Zealand", code: "AKL", city: "Auckland", flight: "16h 30m" },
  { slug: "singapore", name: "Singapore", code: "SIN", city: "Singapore", flight: "5h 50m" },
] as const;

/**
 * Main menu. "Services" is a mega menu built from content/services.ts in the header.
 * Every page of the old menu stays reachable (menu, footer or the services pages).
 */
export const NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  {
    label: "Destinations",
    href: "/study-in/canada",
    children: DESTINATIONS.map((d) => ({ label: `Study in ${d.name}`, href: `/study-in/${d.slug}` })),
  },
  {
    label: "Test prep",
    href: "/services/english-test-preparation",
    children: [
      { label: "IELTS Academic", href: "/ielts-academy" },
      { label: "IELTS General", href: "/ielts-general" },
      { label: "UKVI IELTS", href: "/ukvi-ielts" },
      { label: "PTE Academic", href: "/pte" },
      { label: "TOEFL", href: "/toefl" },
      { label: "Duolingo English Test", href: "/services/english-test-preparation#duolingo" },
      { label: "Classroom courses", href: "/classroom-courses" },
      { label: "Online courses", href: "/online-courses" },
    ],
  },
  { label: "Scholarships", href: "/services/scholarships" },
  { label: "Success stories", href: "/success-stories" },
  { label: "News", href: "/blog" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Success stories", href: "/success-stories" },
  { label: "News & blogs", href: "/blog" },
  { label: "IELTS Classes in India", href: "/ielts-classes-india" },
  { label: "PTE Classes in India", href: "/pte-classes-india" },
  { label: "Contact", href: "/contact-us" },
];

/** Link to the contact form with the course/interest filled in. */
export const enquire = (course?: string, country?: string) => {
  const q = new URLSearchParams();
  if (course) q.set("course", course);
  if (country) q.set("country", country);
  const s = q.toString();
  return `/contact-us${s ? `?${s}` : ""}#enquiry`;
};
