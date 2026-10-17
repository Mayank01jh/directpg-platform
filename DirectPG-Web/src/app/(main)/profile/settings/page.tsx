import { redirect } from "next/navigation";

export default function MySettingsPage() {
  redirect("/profile?tab=settings");
}