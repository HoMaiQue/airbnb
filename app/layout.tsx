import ClientOnly from "./components/ClientOnly";
import Modal from "./components/Modal";
import NavBar from "./components/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

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
                    <Modal
                        isOpen={true}
                        
                        />
                    <NavBar></NavBar>
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
