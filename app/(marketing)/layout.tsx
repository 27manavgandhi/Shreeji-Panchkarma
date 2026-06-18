import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import ScrollProgress from "@/components/shared/ScrollProgress";
import Chatbot from "@/components/shared/Chatbot";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <Chatbot />
    </>
  );
}
