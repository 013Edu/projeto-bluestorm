import { api } from "../../services";

import { useLocation } from 'react-router-dom';

import { useEffect, useState } from "react";
import { Box, Button, Input } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

interface MedicationProps {
    active_ingredient: string;
    application_number: string;
    drug_name: string;
    form: string;
    reference_drug: string;
    reference_standard: string;
    product_number: string;
    strength: string;
}

export function MedicationList() {

    const [medication, setMedication] = useState<MedicationProps[]>([]);

    const ariaLabel = { 'aria-label': 'description' };

    const location = useLocation();
    const token = location.state.token;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    function getMedications() {
        api
            .get("/medications", { headers })
            .then((response) => {
                setMedication(response.data.data);
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
        <div>
            <h1 className="text-3xl text-center font-bold text-cyan-800 m-20 shadow-xl w-80 p-6 rounded-xl">
                List Medications
            </h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <form className="flex justify-center gap-10">
                    <Input placeholder="Search medication" inputProps={ariaLabel} />
                    <button>
                        <SendIcon />
                    </button>
                </form>
            </Box>
            <div className="container mx-auto mt-5">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr className="border-b-2">
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Field</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Value</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {
                            medication.map((med) => {
                                return (
                                    <>
                                        <tr className="border-b-2 bg-slate-100">
                                            <td className="text-left py-3 px-4">active_ingredient</td>
                                            <td className="text-left py-3 px-4">{med.active_ingredient}</td>
                                        </tr>
                                        <tr className="border-b-2 bg-slate-100">
                                            <td className="text-left py-3 px-4">application_number</td>
                                            <td className="text-left py-3 px-4">{med.application_number}</td>
                                        </tr>
                                        <tr className="border-b-2 bg-slate-100">
                                            <td className="text-left py-3 px-4">drug_name</td>
                                            <td className="text-left py-3 px-4">{med.drug_name}</td>
                                        </tr>
                                        <tr className="border-b-2 bg-slate-100">
                                            <td className="text-left py-3 px-4">form</td>
                                            <td className="text-left py-3 px-4">{med.form}</td>
                                        </tr>
                                        <tr className="border-b-2 bg-slate-100">
                                            <td className="text-left py-3 px-4">product_number</td>
                                            <td className="text-left py-3 px-4">{med.product_number}</td>
                                        </tr>
                                        <tr className="border-b-2 bg-slate-100">
                                            <td className="text-left py-3 px-4">reference_drug</td>
                                            <td className="text-left py-3 px-4">{med.reference_drug}</td>
                                        </tr>
                                        <tr className="border-b-2 bg-slate-100">
                                            <td className="text-left py-3 px-4">reference_standard</td>
                                            <td className="text-left py-3 px-4">{med.reference_standard}</td>
                                        </tr>
                                        <tr className="border-b-8 border-gray-800 bg-slate-100">
                                            <td className="text-left py-3 px-4">{med.strength}</td>
                                            <td className="text-left py-3 px-4">1%</td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}