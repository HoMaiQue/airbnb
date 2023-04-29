import { Nunito } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modal/RegisterModal";
import NavBar from "./components/Navbar";
import "./globals.css";
import ToasterProvider from "./provider/ToasterProvider";

const font = Nunito({
    subsets: ["latin"],
});
export const metadata = {
    title: "Airbnb",
    description: "Airbnb great",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider/>
                    <RegisterModal></RegisterModal>
                    <NavBar></NavBar>
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
