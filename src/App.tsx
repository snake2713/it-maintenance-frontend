import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import ServicePage from "pages/ServicePage/ServicePage.tsx";
import ServicesListPage from "pages/ServicesListPage/ServicesListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Service} from "modules/types.ts";

function App() {

    const [services, setServices] = useState<T_Service[]>([])

    const [selectedService, setSelectedService] = useState<T_Service | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedService={selectedService}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services/" element={<ServicesListPage services={services} setServices={setServices} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/services/:id" element={<ServicePage selectedService={selectedService} setSelectedService={setSelectedService} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
