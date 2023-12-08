import axios from "./adminAxios";

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
    const result = (await axios.patch(`/admin/products/supplier/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })).data;
    return result;
}

export const deleteSupplier = async (id: any) => {
    const result = (await axios.delete(`/admin/products/supplier/${id}`)).data;
    return result;
}

export const createCategory = async (data: any) => {
    const result = (await axios.post(`/admin/products/categories`, data)).data;
    return result;
}

export const getCategory = async (id: any) => {
    const result = (await axios.get(`/admin/products/categories/${id}`)).data;
    return result;
}

export const updateCategory = async (id: any, data: any) => {
    const result = (await axios.patch(`/admin/products/categories/${id}`, data)).data;
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

export const getTypeCategory = async (id: any) => {
    const result = (await axios.get(`/admin/products/categories/typecategories/${id}`)).data;
    return result;
}

export const updateTypeCategory = async (id: any, data: any) => {
    const result = (await axios.patch(`/admin/products/categories/typecategories/${id}`, data)).data;
    return result;
}

export const deleteTypeCategory = async (id: any) => {
    const result = (await axios.delete(`/admin/products/categories/typecategories/${id}`)).data;
    return result;
}

export const getAllProducts = async () => {
    const data = (await axios.get('/products')).data;
    return data;
}

export const getProductById = async (id: number) => {
    const data = (await axios.get(`/products/${id}`)).data;
    return data;
}