import {useQuery} from "@tanstack/react-query";
import DataTable, {TableColumn} from "react-data-table-component";
import {apiClient} from "../../globals";
import {useFormatter} from "../../hooks/useFormatter";

interface FamilyMember {
    id: string;
    name: string;
    email: string;
    role: string;
    gender: string;
    bornAt?: string;
}

export const SetupPage = () => {
    const {formatDate, formatGender, formatRole} = useFormatter()

    const {data, isLoading, error} = useQuery({
        queryKey: ["api.families.current"],
        queryFn: async () => {
            const res = await apiClient.api.families.current.$get()
            return await res.json()
        },
    });

    const columns: TableColumn<FamilyMember>[] = [
        {
            name: "Jméno",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "E-mail",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: "Role",
            selector: row => row.role,
            format: row => formatRole(row.role),
            sortable: true,
        },
        {
            name: "Pohlaví",
            selector: row => row.gender,
            format: row => formatGender(row.gender),
            sortable: true,
        },
        {
            name: "Datum narození",
            selector: row => row.bornAt ?? "",
            format: value => value.bornAt ? formatDate(value.bornAt) : "-",
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
