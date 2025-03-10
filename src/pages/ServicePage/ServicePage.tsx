import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchService, removeSelectedService} from "store/slices/servicesSlice.ts";

const ServicePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {service} = useAppSelector((state) => state.services)

    useEffect(() => {
        dispatch(fetchService(id))
        return () => dispatch(removeSelectedService())
    }, []);

    if (!service) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={service.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{service.name}</h1>
                    <p className="fs-5">Описание: {service.description}</p>
                    <p className="fs-5">Цена: {service.price} руб.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ServicePage