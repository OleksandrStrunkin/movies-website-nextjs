import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <div className="container mx-auto px-4">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
