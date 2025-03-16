import Footer from "@/components/Footer/Footer";
import NavbarComponents from "@/components/Navbar/Navbar";


export default function App({ Component, pageProps }) {
  return (
    <>
      <NavbarComponents />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
