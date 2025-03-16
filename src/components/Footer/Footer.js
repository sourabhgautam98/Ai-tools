import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaBehance, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="bottom">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          Sourabh Gautam
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="https://github.com/sourabhgautam98" target="_blank" className="text-white">
            <FaGithub size={20} />
          </Nav.Link>
          <Nav.Link href="https://www.behance.net/sourabhgautam98" target="_blank" className="text-white">
            <FaBehance size={20} />
          </Nav.Link>
          <Nav.Link href="https://www.linkedin.com/in/sourabhgautam/" target="_blank" className="text-white">
            <FaLinkedin size={20} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;