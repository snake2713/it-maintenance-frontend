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
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import ServicesTablePage from "pages/ServicesTablePage/ServicesTablePage.tsx";
import ServiceEditPage from "pages/ServiceEditPage/ServiceEditPage.tsx";
import ServiceAddPage from "pages/ServiceAddPage/ServiceAddPage.tsx";

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
                        <Route path="/services-table/" element={<ServicesTablePage />} />
                        <Route path="/services/:id/" element={<ServicePage />} />
                        <Route path="/services/:id/edit" element={<ServiceEditPage />} />
                        <Route path="/services/add" element={<ServiceAddPage />} />
                        <Route path="/customizations/" element={<CustomizationsPage />} />
                        <Route path="/customizations/:id/" element={<CustomizationPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
