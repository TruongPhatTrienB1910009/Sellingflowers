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

export const getAllCategories = async () => {
    const result = (await axios.get(`/admin/products/categories`)).data;
    return result;
}

export const deleteCategory = async (id: any) => {
    console.log(id)
    const result = (await axios.delete(`/admin/products/categories/${id}`)).data;
    console.log(result);
    return result;
}

export const getAllTypeCategories = async () => {
    const result = (await axios.get(`/admin/products/categories/typecategories`)).data;
    return result;
}