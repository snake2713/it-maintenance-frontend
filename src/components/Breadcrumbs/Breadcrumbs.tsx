import * as React from 'react';
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "store/store.ts";

const Breadcrumbs = () => {

    const location = useLocation()

    const service = useAppSelector((state) => state.services.service)

    const customization = useAppSelector((state) => state.customizations.customization)

    const {is_superuser} = useAppSelector((state) => state.user)

    const crumbs = () => {

        if (location.pathname == '/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/">
                            Главная
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/services/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Работы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/services-table/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Таблица работ
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/services/add') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={is_superuser ? "/services-table/" : "/services/"}>
                            Работы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={location.pathname}>
                            Добавление работы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (service) {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to={is_superuser ? "/services-table/" : "/services/"}>
                            Работы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            {service.name}
                        </Link>
                    </BreadcrumbItem>
                </>
            )
        }

        if (customization) {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to="/customizations/">
                            Заказы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Заказ №{customization?.id}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/customizations/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Заказы
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/login/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Вход
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/register/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Регистрация
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/profile/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/profile/">
                            Личный кабинет
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        return (
            <>
                <BreadcrumbItem>
                    <Link to="/">
                        Главная
                    </Link>
                </BreadcrumbItem>
                <BreadcrumbItem></BreadcrumbItem>
            </>
        )
    };

    return (
        <Breadcrumb className="fs-5">
            {crumbs()}
        </Breadcrumb>
    );
};

export default Breadcrumbs