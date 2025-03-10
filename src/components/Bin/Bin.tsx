import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_customization_id: string,
    services_count: number
}

const Bin = ({isActive, draft_customization_id, services_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return (
        <Link to={`/customizations/${draft_customization_id}/`} className="bin-wrapper">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {services_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin