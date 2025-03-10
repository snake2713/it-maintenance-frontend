import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import ServicesListPage from "pages/ServicesListPage/ServicesListPage.tsx";
import ServicePage from "pages/ServicePage/ServicePage.tsx";
import CustomizationsPage from "pages/CustomizationsPage/CustomizationsPage.tsx";
import CustomizationPage from "pages/CustomizationPage/CustomizationPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/services/" element={<ServicesListPage />} />
                        <Route path="/services/:id/" element={<ServicePage />} />
                        <Route path="/customizations/" element={<CustomizationsPage />} />
                        <Route path="/customizations/:id/" element={<CustomizationPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
