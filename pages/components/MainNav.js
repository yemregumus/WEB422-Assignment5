import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Dropdown, Form, Button, FormControl, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"

export default function MainNav() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const [isDropdownHovered, setDropdownHovered] = useState(false);

  const closeDropdown = () => {
    setDropdownHovered(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const searchField = formData.get('searchField');
    let queryString = `title=true&q=${searchField}`
    
    router.push(`/artwork?title=true&q=${searchField}`);
    setSearchHistory((current) => [...current, queryString])
    setIsExpanded(false);
  };
  
  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const closeNavbar = () => {
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
            <Nav.Link href="/" legacyBehavior passHref active={router.pathname === "/"}>Home</Nav.Link>
            <Nav.Link href="/search" legacyBehavior passHref active={router.pathname === "/search"}>Advanced Search</Nav.Link>
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
            <Dropdown
              onMouseEnter={() => setDropdownHovered(true)}
              onMouseLeave={() => setDropdownHovered(false)}
            >
              <Dropdown.Toggle variant="success" id="dropdown-basic">User Name</Dropdown.Toggle>

              <Dropdown.Menu show={isDropdownHovered}>
                <Link href="/favourites" passHref legacyBehavior>
                  <Dropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={closeDropdown}
                  >
                    Favourite
                  </Dropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <Dropdown.Item
                    active={router.pathname === "/history"}
                    onClick={closeDropdown}
                  >
                    Search History
                  </Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
    </>
  );
}
