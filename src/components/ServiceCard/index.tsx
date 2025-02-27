import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Service} from "modules/types.ts";

interface ServiceCardProps {
    service: T_Service,
    isMock: boolean
}

const ServiceCard = ({service, isMock}: ServiceCardProps) => {
    return (
        <Card key={service.id} style={{width: '18rem', margin: "0 auto 50px", height: "calc(100% - 50px)" }}>
            <CardImg
                src={isMock ? mockImage as string : service.image}
                style={{"height": "200px"}}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5">
                    {service.name}
                </CardTitle>
                <CardText>
                    Цена: {service.price} руб.
                </CardText>
                <Link to={`/services/${service.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default ServiceCard