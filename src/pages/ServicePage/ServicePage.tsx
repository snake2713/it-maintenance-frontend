import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Service} from "modules/types.ts";
import {ServiceMocks} from "modules/mocks.ts";
import {isTauri} from "@tauri-apps/api/core";

type Props = {
    selectedService: T_Service | null,
    setSelectedService: React.Dispatch<React.SetStateAction<T_Service | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ServicePage = ({selectedService, setSelectedService, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const env = await import.meta.env;
            const apiUrl = isTauri() ? env.VITE_API_URL : ""
            const response = await fetch(`${apiUrl}/api/services/${id}`)
            const data = await response.json()
            setSelectedService(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedService(ServiceMocks.find(service => service?.id == parseInt(id as string)) as T_Service)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedService(null)
    }, []);

    if (!selectedService) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <CardImg src={isMock ? mockImage as string : selectedService.image} className="mb-3" />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedService.name}</h1>
                    <p className="fs-5">Описание: {selectedService.description}</p>
                    <p className="fs-5">Цена: {selectedService.price} руб.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ServicePage