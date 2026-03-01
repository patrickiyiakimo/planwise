import Navbar from "@/app/(website)/components/navbar/Navbar";
import FooterContainer from "@/containers/footer/FooterContainer";

export const metadata = {
  title: "Planwise - AI-Powered Student Planning App",
  description: "Planwise helps students plan, track, and execute their academic work efficiently with AI-powered tools.",
};

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <FooterContainer />
    </>
  );
}