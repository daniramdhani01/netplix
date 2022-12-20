import React, { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiGet, useScrollDirection } from "../../utils";
import { useDebounce } from "use-debounce";

function Header() {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 1000);
  const navigate = useNavigate();
  const [showSticky, setShowSticky] = useState(false);
  const location = useLocation().pathname.split("/")[1];
  const line =
    "border border-white border-3 border-top-0 border-end-0 border-start-0";
  const menu = ["Series", "Movies", "Genre"];
  const scroll = useScrollDirection();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowSticky(scroll === "up" && window.scrollY > 0 ? true : false);
    });
  }, [scroll]);

  useEffect(() => {
    if (value) {
        navigate(`/search?title=${value}`)
    }
  }, [value]);
  return (
    <Navbar
      bg="primary"
      className={`${showSticky && "bg-opacity-75 sticky-top"}`}
      variant="dark"
      expand="md"
    >
      <Container fluid="xxl" className="px-5">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand>Netplix</Navbar.Brand>
          <Nav className="me-auto">
            {menu.map((el: string, i: number) => {
              const manuName = el.toLowerCase();
              const active = manuName === location;
              return (
                <Nav.Link
                  key={i}
                  onClick={() => navigate(`/${manuName}`)}
                  className={active ? line : ""}
                  active={active}
                >
                  {el}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>

        <div className="position-relative">
          <i
            className="fa fa-search position-absolute top-50 translate-middle"
            style={{ left: "7%" }}
          ></i>
          <Form.Control
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{ paddingLeft: 30, paddingRight: 30 }}
          />
          {search && (
            <i
              className="fa fa-times position-absolute top-50 translate-middle pointer"
              style={{ left: "93%" }}
              onClick={() => setSearch("")}
            ></i>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
