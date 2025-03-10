import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Service} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteService} from "store/slices/servicesSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    services:T_Service[]
}

const ServicesTable = ({services}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (service_id) => {
        navigate(`/services/${service_id}`)
    }

    const openServiceEditPage = (service_id) => {
        navigate(`/services/${service_id}/edit`)
    }

    const handleDeleteService = async (service_id) => {
        dispatch(deleteService(service_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({ cell }) => {
                    return <img src={`/api/services/${cell.row?.original.id}/image`} width={100}/>
                }
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Цена',
                accessor: 'price',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openServiceEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteService(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!services.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={services} onClick={handleClick}  />
    )
};

export default ServicesTable