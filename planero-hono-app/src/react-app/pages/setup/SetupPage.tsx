import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCurrentFamily } from "../../../api/families/getCurrentFamily";
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";

interface FamilyMember {
    id: string;
    name: string;
    role: string;
    gender: string;
    birthday: string;
    hobbies: string[];
}

export const SetupPage = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["family-members"],
        queryFn: getCurrentFamily
    });

    const columns: TableColumn<FamilyMember>[] = [
        {
            name: "Jméno",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Role",
            selector: row => row.role,
            sortable: true,
        },
        {
            name: "Pohlaví",
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: "Datum narození",
            selector: row => row.birthday,
            sortable: true,
        },
        {
            name: "Koníčky",
            selector: row => row.hobbies.join(", "),
            sortable: true,
        },
    ];

    if (isLoading) return <p>Načítání dat rodiny...</p>;
    if (error) return <p>Chyba při načítání dat rodiny: {error.toString()}</p>;

    return (
        <div>
            <h1>Nastavení rodiny</h1>
            <h2>{data?.name}</h2>

            <DataTableWrapper>
                <DataTable
                    columns={columns}
                    data={data?.members || []}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                    noHeader
                    customStyles={customStyles}
                />
                            </DataTableWrapper>
        </div>
    );
};

const customStyles = {
    headCells: {
        style: {
            backgroundColor: 'var(--primary-bg, #f2f2f2)',
            color: 'var(--primary-fg, #333)',
            fontWeight: 'bold',
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: '#f1f1f1',
            transitionDuration: '0.15s',
        },
    },
};

const DataTableWrapper = styled.div`
    margin-top: 1rem;
    width: 100%;

    .rdt_TableRow:nth-child(even) {
        background-color: #f9f9f9;
    }
`;