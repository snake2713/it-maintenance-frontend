import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Service} from "modules/types.ts";
import "./styles.css"

type Props = {
    selectedService: T_Service | null
}

const Breadcrumbs = ({selectedService}:Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/services") &&
                <BreadcrumbItem active>
                    <Link to="/services">
						Работа
                    </Link>
                </BreadcrumbItem>
			}
            {selectedService &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedService.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs