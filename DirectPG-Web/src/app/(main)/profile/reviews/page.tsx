import { redirect } from "next/navigation";

export default function MyReviewsPage() {
  redirect("/profile?tab=reviews");
}