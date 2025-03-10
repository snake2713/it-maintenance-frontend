import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteService,
    fetchService,
    removeSelectedService,
    updateService,
    updateServiceImage, updateServiceVideo
} from "store/slices/servicesSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import { Player } from "video-react";

const ServiceEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {service} = useAppSelector((state) => state.services)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(service?.name)

    const [description, setDescription] = useState<string>(service?.description)

    const [price, setPrice] = useState<number>(service?.price)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()

    const [imgURL, setImgURL] = useState<string>(service?.image)

    const handleImageChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const [videoFile, setVideoFile] = useState<File>()

    const [videoURL, setVideoURL] = useState<string>(service?.video)

    const handleVideoChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setVideoFile(file)
            setVideoURL(URL.createObjectURL(file))
        }
    }

    const saveService = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateServiceImage({
                service_id: service.id,
                data: form_data
            }))
        }

        if (videoFile) {
            const form_data = new FormData()
            form_data.append('video', videoFile, videoFile.name)
            await dispatch(updateServiceVideo({
                service_id: service.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            price
        }

        await dispatch(updateService({
            service_id: service.id,
            data
        }))

        navigate("/services-table/")
    }

    useEffect(() => {
        dispatch(fetchService(id))
        return () => dispatch(removeSelectedService())
    }, []);

    useEffect(() => {
        setName(service?.name)
        setDescription(service?.description)
        setPrice(service?.price)
        setImgURL(`/api/services/${service?.id}/image`)
        setVideoURL(`/api/services/${service?.id}/video`)
    }, [service]);

    const handleDeleteService = async () => {
        await dispatch(deleteService(id))
        navigate("/services-table/")
    }

    if (!service) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Row className="mb-5">
                        <img src={imgURL} alt="" className="w-100"/>
                        <Container className="mt-3 d-flex justify-content-center">
                            <UploadButton handleFileChange={handleImageChange}/>
                        </Container>
                    </Row>
                    <Row>
                        <div className="d-flex justify-content-center">
                            <Player
                                playsInline
                                autoPlay
                                src={videoURL}
                                fluid={false}
                                height={500}
                            />
                        </div>
                        <Container className="mt-3 d-flex justify-content-center">
                            <UploadButton handleFileChange={handleVideoChange} accept=".mp4"/>
                        </Container>
                    </Row>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput type="number" label="Цена" placeholder="Введите цену" value={price} setValue={setPrice}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveService}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteService}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default ServiceEditPage