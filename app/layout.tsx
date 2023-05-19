import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/Modal/LoginModal";
import RegisterModal from "./components/Modal/RegisterModal";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import ToasterProvider from "./provider/ToasterProvider";
import RentModal from "./components/Modal/RentModal";

const font = Nunito({
    subsets: ["latin"],
});
export const metadata = {
    title: "Airbnb",
    description: "Airbnb great",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <LoginModal />
                    <RentModal />
                    <RegisterModal></RegisterModal>
                    <Navbar currentUser={currentUser}></Navbar>
                </ClientOnly>
                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}
