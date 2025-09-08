import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalStatus } from "../components/context/GlobalStatusContext";
import { toast } from "react-toastify";
import '../css/category/Category.css';
import CategoryTile from "../components/category/CategoryTile";


function Category() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const { isLoading, setIsLoading, isSubmitting, setIsSubmitting } = useGlobalStatus();

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/categories`);
                setCategories(response.data);
            } catch (err) {
                toast.error("Error fetching categories");
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const navigateToEdit = (id) => {
        navigate('/edit-category', {state: {id: id}});
    };

    const navigateToAdd = () => {
        navigate('/add-category');
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        setIsSubmitting(true);
        try {
            await axios.delete(`http://localhost:8080/api/categories/${id}`);
            setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
            toast.success("Category deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete category.");
        } finally {
            setIsLoading(false);
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="category-header">
                <h1>My Categories</h1>
                <button className="add-item" onClick={navigateToAdd}>+ Category</button>
            </div>
            <hr className="styled-hr"/>
            {isLoading ? (
                <div className="loading-message">Loading 🚀</div>
            ) : (
                <div className="category-content">
                    {
                        categories && categories.map((category) => {
                            return (
                                <CategoryTile 
                                    key={category.id} 
                                    category={category}
                                    onEdit={() => navigateToEdit(category.id)}
                                    onDelete={() => handleDelete(category.id)}
                                />
                            );
                        })
                    }
                </div>
            )}
        </div>
    );
}

export default Category;