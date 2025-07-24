import {useMemo} from "react";

export const useFormatter = () => {
    return useMemo(() => ({
        formatDate: (isoDate: string) => {
            return new Date(isoDate).toLocaleDateString()
        },
        formatDateTime:
            (isoDate: string) => {
                return new Date(isoDate).toLocaleString()
            },
        formatGender: (gender: string) => {
            switch (gender.toLowerCase()) {
                case "m":
                    return "muž"
                case "f":
                    return "žena"
                default:
                    return "-"
            }
        },
        formatRole: (role: string) => {
            switch (role.toLowerCase()) {
                case "child":
                    return "dítě"
                case "adult":
                    return "dospělý"
                default:
                    return "-"
            }
        }
    }), [])
}