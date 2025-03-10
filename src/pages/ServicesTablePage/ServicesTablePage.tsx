import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchServices, updateServiceName} from "store/slices/servicesSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import ServicesTable from "components/ServicesTable/ServicesTable.tsx";

const ServicesTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {services, service_name} = useAppSelector((state) => state.services)

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

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

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
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/services/add">
                        <Button color="primary">Добавить работу</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {services.length > 0 ? <ServicesTable services={services} fetchServices={fetchServices}/> : <h3 className="text-center mt-5">Работа не найдены</h3>}
            </Row>
        </Container>
    );
};

export default ServicesTablePage