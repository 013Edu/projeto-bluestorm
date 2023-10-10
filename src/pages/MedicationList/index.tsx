import React, { useState, useEffect } from "react";
import { api } from "../../services";
import { useLocation } from 'react-router-dom';
import { Box, Input, LinearProgress, TextField, Typography } from "@mui/material";
import { Pagination, PaginationItem } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

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

interface MedicationCreationProps {
    drug_name: string;
    units_per_package: number;
    issued_on: string;
    expires_on: string;
    manufacturers: string[];
}

export function MedicationList() {
    const [medication, setMedication] = useState<MedicationProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [drugName, setDrugName] = useState("");
    const [unit, setUnit] = useState(0);
    const [issued, setIssued] = useState("");
    const [expires, setExpires] = useState("");
    const [manufacturers, setManufacturers] = useState<string[]>([]);

    const [currentMedication, setCurrentMedication] = useState("");

    const location = useLocation();
    const token = location.state.token;
    const itemsPerPage = 5;
    const totalItems = 20;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const [isLoading, setIsLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    function handleSearchSubmit(e: any) {
        e.preventDefault();
        searchMedication(1, currentMedication);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    function getMedications(page: number) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        api
            .get("/medications", params)
            .then((response) => {
                const medicationsForPage = response.data.data.slice(startIndex, endIndex);
                setMedication(medicationsForPage);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    function searchMedication(page: number, searchTerm: string) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const queryParams = {
            search: searchTerm,
        };

        api
            .get(`/medications`, { params: queryParams, headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                const medicationsForPage = response.data.data.slice(startIndex, endIndex);
                setIsLoading(true);
                setTimeout(() => {
                    setMedication(medicationsForPage);
                    setIsLoading(false);
                }, 3000);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    function createMedication() {
        const medicationData: MedicationCreationProps = {
            drug_name: drugName,
            units_per_package: unit | 10,
            issued_on: issued,
            expires_on: expires,
            manufacturers: manufacturers,
        };
        console.log(issued, expires, manufacturers, unit)
        api
            .post("/medications", medicationData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);

            })
            .catch((error) => {
                console.log(error.message);

            });
    }

    useEffect(() => {
        getMedications(currentPage);
        console.log(token);
    }, [currentPage]);

    function onSubmit(e: any) {
        e.preventDefault();
    }

    return (
        <div>
            <div>
                <h1 className="text-3xl text-center font-bold text-cyan-800 m-20 shadow-xl w-80 p-6 rounded-xl">
                    List Medications
                </h1>
                <button onClick={handleOpen} className="ml-32 -mb-10">
                    <AddCircleOutlineIcon fontSize="large" color="info" />
                </button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="bg-white p-10 text-center h-screen">
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            fontWeight='bold'
                            fontSize={23}
                        >
                            Medicine Registration
                        </Typography>
                        <button className="ml-[1300px]" onClick={handleClose}>
                            <CancelPresentationIcon fontSize="large" color="info" />
                        </button>
                        <section

                            className="flex flex-col text-gray-500 gap-8 w-[600px] mx-auto"
                        >
                            <TextField
                                type="text"
                                required
                                id="standard-basic"
                                label="Name"
                                variant="standard"
                                value={drugName}
                                onChange={(e) => setDrugName(e.target.value)}
                            />

                            <TextField
                                type="number"
                                required
                                id="standard-basic"
                                label="Units per package"
                                variant="standard"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            />

                            <TextField
                                type="text"
                                required
                                id="standard-basic"
                                label="Issued on"
                                variant="standard"
                                value={issued}
                                onChange={(e) => setIssued(e.target.value)}
                            />

                            <TextField
                                type="text"
                                required
                                id="standard-basic"
                                label="Expires on"
                                variant="standard"
                                value={expires}
                                onChange={(e) => setExpires(e.target.value)}
                            />

                            <TextField
                                type="text"
                                required
                                id="standard-basic"
                                label="Manufacturers"
                                variant="standard"
                                value={manufacturers.join(', ')} // Exibe os valores como uma string separada por vírgula
                                onChange={(e) => setManufacturers(e.target.value.split(', '))} // Divide a entrada do usuário em um array
                            />
                            <button
                                onClick={() => createMedication()}
                                className="mt-20 bg-gradient-to-r from-cyan-700 to-blue-500 text-white font-bold py-3 px-2 rounded-lg hover:opacity-90 transition-opacity">
                                REGISTER
                            </button>
                        </section>
                    </div>
                </Modal>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <form className="flex justify-center gap-10" onSubmit={(e) => handleSearchSubmit(e)}>
                        <Input
                            placeholder="Search medication"
                            value={currentMedication}
                            onChange={(e) => setCurrentMedication(e.target.value)}
                        />
                        <button onClick={(e) => handleSearchSubmit(e)} type="submit">
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
                                            {isLoading ?
                                                (
                                                    <div className="w-full">
                                                        <LinearProgress style={{ width: "900px", marginLeft: "50px" }} color="secondary" />
                                                    </div>
                                                ) : (
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
                                            }

                                        </>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    size="large"
                    boundaryCount={2}
                    showFirstButton
                    showLastButton
                    renderItem={(item) => (
                        <PaginationItem
                            component="button"
                            {...item}
                        />
                    )}
                />
            </div>
        </div>
    );
}
