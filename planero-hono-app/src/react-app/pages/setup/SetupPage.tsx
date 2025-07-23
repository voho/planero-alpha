import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCurrentFamily } from "../../../api/families/getCurrentFamily";
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { defaultTheme } from "../../theme";

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
            <h1>{data?.name}</h1>

                <DataTable
                    columns={columns}
                    data={data?.members || []}
                    pagination
                    highlightOnHover
                    responsive
                    striped
                    noHeader
                />
        </div>
    );
};
