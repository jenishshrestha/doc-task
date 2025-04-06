"use client";

import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";

// redux imports
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const nunito = Nunito({
	variable: "--font-nunito",
	subsets: ["latin"],
});

const ptSans = PT_Sans({
	variable: "--font-pt-sans",
	subsets: ["latin"],
	weight: ["400", "700"],
});

const AppLayout: React.FC<{ children: React.ReactNode }> = (props) => {
	const theme = useSelector((state: RootState) => state.themeToggle.mode);

	const { children } = props;
	return (
		<html
			lang="en"
			className={`text-base ${theme ? theme : "light"}`}
			data-theme={theme}
		>
			<body
				className={`${nunito.variable} ${ptSans.variable} antialiased relative`}
			>
				{children}
			</body>
		</html>
	);
};

export default AppLayout;
