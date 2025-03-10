import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftCustomization,
    fetchCustomization,
    removeCustomization, sendDraftCustomization,
    triggerUpdateMM, updateCustomization
} from "store/slices/customizationsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_CustomizationStatus, T_Service} from "modules/types.ts";
import ServiceCard from "components/ServiceCard/ServiceCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import {formatDate} from "utils/utils.ts";

const CustomizationPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const customization = useAppSelector((state) => state.customizations.customization)

    const [address, setAddress] = useState<string>(customization?.address)

    const [date, setDate] = useState<string>(customization?.date)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchCustomization(id))
        return () => dispatch(removeCustomization())
    }, []);

    useEffect(() => {
        setAddress(customization?.address)
        setDate(customization?.date)
    }, [customization]);

    const sendCustomization = async (e) => {
        e.preventDefault()

        await saveCustomization()

        await dispatch(sendDraftCustomization())

        navigate("/customizations/")
    }

    const saveCustomization = async (e?) => {
        e?.preventDefault()

        const data = {
            address
        }

        await dispatch(updateCustomization(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteCustomization = async () => {
        await dispatch(deleteDraftCustomization())
        navigate("/services/")
    }

    if (!customization) {
        return (
            <></>
        )
    }

    const isDraft = customization.status == E_CustomizationStatus.Draft
    const isCompleted = customization.status == E_CustomizationStatus.Completed

    return (
        <Form onSubmit={sendCustomization} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой заказ" : `Заказ №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomTextarea label="Адрес" placeholder="Введите адрес" value={address} setValue={setAddress} disabled={!isDraft  || is_superuser}/>
                {isCompleted && <CustomInput label="Дата" value={formatDate(date)} disabled={true}/>}
            </Row>
            <Row>
                {customization.services.length > 0 ? customization.services.map((service:T_Service) => (
                    <Row key={service.id} className="d-flex justify-content-center mb-5">
                        <ServiceCard service={service} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Работа не добавлены</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveCustomization}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteCustomization}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default CustomizationPage