import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"

export default function MainNav() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

  const submitForm = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchField = formData.get('searchField');
    let queryString = `title=true&q=${searchField}`
    
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchHistory((current) => [...current, queryString])
    // Close the navbar after submitting the form
    setIsExpanded(false);
  };
  
  const toggleNavbar = () => {
    // Toggle the expanded state of the navbar
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
    // Close the navbar when a link is clicked
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar fixed="top" expand="md" className="fixed-top bg-dark navbar-dark" expanded={isExpanded}>
        <Container fluid>
          <Navbar.Brand>
            <Link href="https://www.linkedin.com/in/jonasgumusyyz/" target="_blank" rel="noopener noreferrer" className="rainbow-link">
              <span className="rainbow-text">Yunus Gumus</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleNavbar} />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll onClick={closeNavbar}>
              <Nav.Link href="/" legacyBehavior passHref>Home</Nav.Link>
              <Nav.Link href="/search" legacyBehavior passHref>Advanced Search</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={submitForm}>
              <FormControl
                type="text"
                placeholder="Search"
                name="searchField"
              />
              &nbsp;
              <Button variant="success" type="submit">Search</Button>
            </Form>
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  {/*legacyBehavior is a must add to avoid double <a> which occurs errors*/}
                  <NavDropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Favourite
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
    </>
  );
}
