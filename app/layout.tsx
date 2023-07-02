'use client'
import Header from '@/components/Layout/Header';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ThemeProvider} from 'next-themes';
import './globals.css';
import {Inter} from 'next/font/google';
import {useState, ReactNode} from 'react';
import {NextFont} from "next/dist/compiled/@next/font";
import configureStore from '@/utils/Redux/Store';
import {Provider} from 'react-redux';
import Footer from "@/components/Layout/Footer";

// Define fonts
const inter: NextFont = Inter({subsets: ['latin']})

export default function RootLayout({children}: { children: ReactNode }) {

    const [client] = useState(
        new QueryClient({defaultOptions: {queries: {staleTime: 5000}}})
    );

    return (

        <html lang="en">
        <Provider store={configureStore}>
            <body className={`${inter.className} bg-light_bg_color dark:bg-dark_bg_color`}
                  suppressHydrationWarning={true}>
            <ThemeProvider attribute="class">
                <QueryClientProvider client={client}>
                    <Header/>
                    {children}
                    <Footer />
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </ThemeProvider>
            </body>
        </Provider>
        </html>

    )
}
