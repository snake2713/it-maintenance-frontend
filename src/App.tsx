import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import ServicePage from "pages/ServicePage";
import ServicesListPage from "pages/ServicesListPage";
import {Route, Routes} from "react-router-dom";
import {T_Service} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {

    const [services, setServices] = useState<T_Service[]>([])

    const [selectedService, setSelectedService] = useState<T_Service | null>(null)

    const [isMock, setIsMock] = useState(false);

    const [serviceName, setServiceName] = useState<string>("")

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedService={selectedService} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/services/" element={<ServicesListPage services={services} setServices={setServices} isMock={isMock} setIsMock={setIsMock} serviceName={serviceName} setServiceName={setServiceName}/>} />
                        <Route path="/services/:id" element={<ServicePage selectedService={selectedService} setSelectedService={setSelectedService} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
