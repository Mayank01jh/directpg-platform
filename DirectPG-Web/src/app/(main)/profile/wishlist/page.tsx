import { redirect } from "next/navigation";

export default function MyWishlistPage() {
  redirect("/profile?tab=saved");
}