'use client';

import React from 'react';
import { Navbar, Container, Nav, Card } from 'react-bootstrap';

export function ClientNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">My Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/new">New Post</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

interface ClientCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  link?: {
    href: string;
    text: string;
  };
}

export function ClientCard({ title, subtitle, children, link }: ClientCardProps) {
  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {subtitle && <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>}
        {children}
        {link && <Card.Link href={link.href}>{link.text}</Card.Link>}
      </Card.Body>
    </Card>
  );
}