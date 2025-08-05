import axiosInstance from "../utils/axiosInstance";

export const getAllCategories = () => {
	return axiosInstance.get("/categories");
};

export const createCategory = async (categoryData) => {
	try {
		const response = await axiosInstance.post("/categories", categoryData);
		return response.data;
	} catch (error) {
		console.error("Error creating category:", error);
		throw error;
	}
};
