import axios from "../axios";

export const createProduct = async (data: any) => {
    const result = (await axios.post(`/admin/products`, data, { headers: { "Content-Type": "multipart/form-data" } })).data;
    return result;
}

export const deleteProduct = async (id: any) => {
    const result = (await axios.delete(`/admin/products/${id}`)).data;
    return result;
}

export const updateProduct = async (id: any, data: any) => {
    const result = (await axios.patch(`/admin/products/${id}`, data, { headers: { "Content-Type": "multpart/form-data" } })).data;
    return result;
}

export const createMultipleImportBill = async (data: any) => {
    const result = (await axios.post(`/admin/products/importbill`, data)).data;
    return result;
}

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

export const updateSupplier = async (id: any, data: any) => {
    console.log(id);
    console.log(data.get('name'));
    const result = (await axios.patch(`/admin/products/supplier/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })).data;
    return result;
}

export const createCategory = async (data: any) => {
    const result = (await axios.post(`/admin/products/categories`, data)).data;
    return result;
}

export const deleteCategory = async (id: any) => {
    const result = (await axios.delete(`/admin/products/categories/${id}`)).data;
    return result;
}

export const createTypeCategory = async (data: any) => {
    const result = (await axios.post(`/admin/products/categories/typecategories`, data)).data;
    return result;
}