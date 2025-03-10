import { gql } from '@apollo/client';

export const FETCH_SERVICE = gql`
    query Query($id: Int!) {
        service (id: $id) {
            id
            name
            description
            status
            image
            price
            video
        }
    }
`;

export const CREATE_SERVICE = gql`
    mutation CreateService($name: String!, $description: String!, $price: Int!) {
        createService(name: $name, description: $description, price: $price) {
            service {
                id
                name
                description
                status
                image
                price
            }
        }
    }
`;