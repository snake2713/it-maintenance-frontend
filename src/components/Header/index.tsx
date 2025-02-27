import {Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row} from "reactstrap";
import {NavLink as RRNavLink} from "react-router-dom";
import "./styles.css"

const Header = () => {
    return (
		<header>
			<Navbar className="p-3" expand="lg">
				<Container>
					<Row>
						<Col md="6" className="d-flex align-items-center">
							<NavbarBrand tag={RRNavLink} to="/">
								Обслуживание ИТ инфраструктуры
							</NavbarBrand>
						</Col>
						<Col md="6" className="d-flex justify-content-end align-items-center">
							<Nav className="fs-5 gap-3" navbar>
								<NavItem>
									<NavLink tag={RRNavLink} to="/services">
										Работа
									</NavLink>
								</NavItem>
							</Nav>
						</Col>
					</Row>
				</Container>
			</Navbar>
		</header>
    );
};

export default Header