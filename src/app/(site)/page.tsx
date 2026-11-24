import { Metadata } from "next";
import ResumePortfolio from "@/components/ResumePortfolio";

export const metadata: Metadata = {
  title: "Jordan Lowe | Veteran & Technology Professional",
  description:
    "Jordan Lowe is an Army veteran and technology professional specializing in systems administration, IT operations, and intelligence support.",
};

export default function Home() {
  return <ResumePortfolio />;
}
