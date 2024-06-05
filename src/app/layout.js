import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";
import { Providers } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " Netflix App",
  description: "Movie Platform.",
};

export default function RootLayout({ children }) {
  return (
 <Providers>
     <html lang="en">
      <body className={inter.className}>
  <Navbar/>
        {children}
        <ToastContainer />
      </body>
    </html>
 </Providers>
  );
}
