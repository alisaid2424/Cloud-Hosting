import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Cloud Hosting",
	description: "Cloud Hosting project",
};
interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-bodyColor`}>
				<Header />
				<ToastContainer
					theme="colored"
					position="top-center"
				/>
				<main className="min-h-[calc(100vh-150px)]">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
