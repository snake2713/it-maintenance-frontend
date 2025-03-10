import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Service} from "modules/types.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addServiceToCustomization, fetchServices} from "store/slices/servicesSlice.ts";
import {removeServiceFromDraftCustomization, updateServiceValue} from "store/slices/customizationsSlice.ts";

type Props = {
    service: T_Service,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
}

const ServiceCard = ({service,  showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.customizations)

    const [local_guarantee, setLocal_guarantee] = useState(service.guarantee)
    
    const location = useLocation()

    const isCustomizationPage = location.pathname.includes("customizations")

    const handeAddToDraftCustomization = async () => {
        await dispatch(addServiceToCustomization(service.id))
        await dispatch(fetchServices())
    }

    const handleRemoveFromDraftCustomization = async () => {
        await dispatch(removeServiceFromDraftCustomization(service.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateServiceValue({
            service_id: service.id,
            guarantee: local_guarantee
        }))
    }

    if (isCustomizationPage) {
        return (
            <Card key={service.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={service.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {service.name}
                            </CardTitle>
                            <CardText>
                                Цена: {service.price} руб.
                            </CardText>
                            <CustomInput label="Гарантия" type="number" value={local_guarantee} setValue={setLocal_guarantee} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/services/${service.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftCustomization}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={service.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={service.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {service.name}
                </CardTitle>
                <CardText>
                    Цена: {service.price} руб.
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/services/${service.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftCustomization}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default ServiceCard