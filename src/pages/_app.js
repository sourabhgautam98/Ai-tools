import Footer from "@/components/Footer/Footer";
import NavbarComponents from "@/components/Navbar/Navbar";
import Alert from "@/components/Alert/Alert";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Alert />
      <NavbarComponents />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}
