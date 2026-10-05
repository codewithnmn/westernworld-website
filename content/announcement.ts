/**
 * The announcement bar at the top of every page. To change it, edit this object and redeploy.
 *
 * - `id`: change it for every new announcement. A visitor who closed the previous one sees the new one.
 * - `deadline` (optional, YYYY-MM-DD): shows a live "N days remaining" countdown, and the bar hides itself after that day.
 * - `href`: where the bar leads (the enquiry form pre-filled with the intake is a good default).
 * - Set `enabled: false` to remove the bar.
 */
export type Announcement = {
  enabled: boolean;
  id: string;
  message: string;
  deadline?: string;
  cta: string;
  href: string;
};

// TODO(owner): confirm the real Australia Semester 1 2027 deadline before go-live (placeholder: 41 days from 5 Oct 2026).
export const ANNOUNCEMENT: Announcement = {
  enabled: true,
  id: "au-s1-2027",
  message: "Australia intake is now open",
  deadline: "2026-11-15",
  cta: "Apply now",
  href: "/contact-us?course=Australia+Semester+1+2027+intake&country=Australia#enquiry",
};
