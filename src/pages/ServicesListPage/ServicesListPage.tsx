import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import ServiceCard from "components/ServiceCard/ServiceCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateServiceName} from "src/store/slices/servicesSlice.ts";
import {T_Service} from "modules/types.ts";
import {ServiceMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"
import {isTauri} from "@tauri-apps/api/core";

type Props = {
    services: T_Service[],
    setServices: React.Dispatch<React.SetStateAction<T_Service[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ServicesListPage = ({services, setServices, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {service_name} = useAppSelector((state:RootState) => state.services)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateServiceName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setServices(ServiceMocks.filter(service => service.name.toLowerCase().includes(service_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchServices()
    }

    const fetchServices = async () => {
        try {
            const env = await import.meta.env;
            const apiUrl = isTauri() ? env.VITE_API_URL : ""
            const response = await fetch(`${apiUrl}/api/services/?service_name=${service_name.toLowerCase()}`)
            const data = await response.json()
            setServices(data.services)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchServices()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={service_name} onChange={handleChange} placeholder="Поиск..."></Input>
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
                    <Col key={service.id} sm="12" md="6" lg="4">
                        <ServiceCard service={service} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ServicesListPage