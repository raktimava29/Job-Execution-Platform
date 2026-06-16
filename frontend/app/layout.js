import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Distributed Job Dashboard",
  description: "Job Processing System"
};

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );

}