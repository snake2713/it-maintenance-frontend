import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Service} from "src/modules/types.ts";
import ServiceCard from "components/ServiceCard";
import {ServiceMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";
import "./styles.css"

type Props = {
    services: T_Service[],
    setServices: React.Dispatch<React.SetStateAction<T_Service[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    serviceName: string,
    setServiceName: React.Dispatch<React.SetStateAction<string>>
}

const ServicesListPage = ({services, setServices, isMock, setIsMock, serviceName, setServiceName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/services/?service_name=${serviceName.toLowerCase()}`)
            const data = await response.json()
            setServices(data.services)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setServices(ServiceMocks.filter(service => service.name.toLowerCase().includes(serviceName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {services?.map(service => (
                    <Col key={service.id} xs="4">
                        <ServiceCard service={service} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ServicesListPage