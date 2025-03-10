import {Button, Card, Col, Row, Tooltip} from "reactstrap";
import {E_CustomizationStatus, T_Customization} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptCustomization, fetchCustomizations, rejectCustomization} from "store/slices/customizationsSlice.ts";
import {useState} from "react";

type Props = {
    customization: T_Customization
    index: number
}

const CustomizationCard = ({customization, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptCustomization = async (customization_id) => {
        await dispatch(acceptCustomization(customization_id))
        await dispatch(fetchCustomizations())
    }

    const handleRejectCustomization = async (customization_id) => {
        await dispatch(rejectCustomization(customization_id))
        await dispatch(fetchCustomizations())
    }

    const navigate = useNavigate()

    const openCustomizationPage = () => {
        navigate(`/customizations/${customization.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const [qrTooltipOpen, setQrTooltipOpen] = useState(false)

    const toogleQrTooltip = () => setQrTooltipOpen(!qrTooltipOpen)

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[customization.status]}
                </Col>
                <Col md={1}>
                    {formatDate(customization.date)}
                </Col>
                <Col>
                    {formatDate(customization.date_created)}
                </Col>
                <Col>
                    {formatDate(customization.date_formation)}
                </Col>
                <Col>
                    {formatDate(customization.date_complete)}
                </Col>
                <Col>
                    {customization.status == E_CustomizationStatus.Completed &&
                        <>
                            <Button color="primary" id={"QrTooltip-" + customization.id}
                                    onMouseEnter={toogleQrTooltip} onMouseLeave={toogleQrTooltip}>Показать</Button>
                            <Tooltip
                                placement="left"
                                isOpen={qrTooltipOpen}
                                target={"QrTooltip-" + customization.id}
                                style={{maxWidth: "100%"}}
                            >
                                <img src={`data:image/png;base64,${customization.qr}`} alt="" width={250}/>
                            </Tooltip>
                        </>
                    }
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openCustomizationPage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {customization.owner}
                        </Col>
                        <Col>
                            {customization.status == E_CustomizationStatus.InWork && <Button color="primary" onClick={() => handleAcceptCustomization(customization.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {customization.status == E_CustomizationStatus.InWork && <Button color="danger" onClick={() => handleRejectCustomization(customization.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default CustomizationCard