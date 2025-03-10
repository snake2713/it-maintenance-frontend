import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchServices, updateServiceName} from "store/slices/servicesSlice.ts";
import ServiceCard from "components/ServiceCard/ServiceCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const ServicesListPage = () => {

    const dispatch = useAppDispatch()

    const {services, service_name} = useAppSelector((state) => state.services)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const {draft_customization_id, services_count} = useAppSelector((state) => state.customizations)

    const hasDraft = draft_customization_id != null

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateServiceName(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchServices())
    }

    useEffect(() => {
        dispatch(fetchServices())
    }, [])

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
                {is_authenticated &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_customization_id={draft_customization_id} services_count={services_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {services?.map(service => (
                    <Col key={service.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <ServiceCard service={service} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ServicesListPage