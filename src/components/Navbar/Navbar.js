"use client";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { usePathname } from 'next/navigation';

const styles = `
  .blinkHover {
    transition: opacity 0.3s ease;
  }

  .blinkHover:hover {
    animation: blink 0.8s infinite;
  }

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

function NavbarComponents() {
  const pathname = usePathname();
  console.info("Current pathname:", pathname);

  const navLinks = [
    { text: 'Text To Speech', route: '/tools/textToSpeech' },
    { text: 'Text To Image', route: '/tools/textToImage' },
    { text: 'BackGround Remover', route: '/tools/backGroundRemover' },
  ];
  
  return (
    <>
      <style>{styles}</style>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            AI Tools
          </Navbar.Brand>
          <Nav className="ms-auto">
            {pathname !== '/' &&
              navLinks.map(
                (link) =>
                  pathname !== link.route && (
                    <Nav.Link 
                      key={link.route} 
                      href={link.route}
                      className="text-white blinkHover" 
                    >
                      {link.text}
                    </Nav.Link>
                  ),
              )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponents;