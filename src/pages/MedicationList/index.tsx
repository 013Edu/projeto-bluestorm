import { api } from "../../services";

import { useLocation } from 'react-router-dom';

import { useEffect } from "react";

export function MedicationList() {

    const location = useLocation();
    const token = location.state.token;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    function getMedications() {
        api
            .get("/medications", { headers })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    useEffect(() => {
        getMedications();
        console.log(token);
    }, []);

    return (
        <h1 className="text-3xl text-center font-bold text-cyan-800 m-20 shadow-xl w-80 p-6 rounded-xl">
            List Medications
        </h1>
    )
}