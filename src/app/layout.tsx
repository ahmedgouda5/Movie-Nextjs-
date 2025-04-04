import Footer from "./(components)/footer/page";
import Navbar from "./(components)/navbar/page";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body className="">
        <div>
          <Navbar />
          <div className=" min-h-screen pb-[30px] bg-gray-900">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default layout;
