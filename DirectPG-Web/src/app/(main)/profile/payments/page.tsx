import { redirect } from "next/navigation";

export default function MyPaymentsPage() {
  redirect("/profile?tab=payments");
}