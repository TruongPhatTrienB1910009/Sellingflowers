import axios from "../axios";

export const getAllSuppliers = async () => {
    const result = (await axios.get("/admin/products/supplier")).data;
    return result;
}

export const createSupplier = async (data: any) => {
    const result = (await axios.post("/admin/products/supplier", data)).data;
    return result;
}

export const getSupplierById = async (id: any) => {
    const result = (await axios.get(`/admin/products/supplier/${id}`)).data;
    return result;
}