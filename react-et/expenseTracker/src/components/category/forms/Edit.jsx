
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalStatus } from '../../../components/context/GlobalStatusContext.jsx';
import { toast } from 'react-toastify';
import '../../../css/Form.css'

function Edit() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { isSubmitting, setIsSubmitting, isLoading, setIsLoading } = useGlobalStatus();

    const [currId] = useState(location.state.id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:8080/api/category/${currId}`, data);
            navigate('/my-expense-categories');
            toast.success("Category updated successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update category");
        } finally{
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchCategory = async (id) => {
            try {
                const res = await axios.get(`http://localhost:8080/api/category/${id}`);
                reset(res.data)
            } catch (err) {
                console.log(err);
            }
        };

        fetchCategory(currId);
    }, []);

    return (
        // Issue: React warns when an input changes from uncontrolled (no value) to controlled (has value) after fetching data asynchronously.
        // Why: Form fields start empty, then receive values from backend, causing a switch from uncontrolled to controlled.
        // Solution: Use react-hook-form's reset(data) after fetching to set form values and keep inputs controlled from the start,preventing the warning.

        // WARNING: A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component

        // After getiing category I am here setting the value, `<input {...register("emoji")} className="form-input" value={category.emoji}/>` so the state is changing from controlled to uncontrolled.
        <div>
            <form onSubmit={handleSubmit(onSubmit)} 
            className="expense-tracker-form">
            <h1 className="center">Edit Category Details</h1>


            <label htmlFor="emoji" className="form-label">Emoji</label>
            <input
                {...register("emoji", {
                    required: true
                })}
                className="form-input"
            />
            {errors.emoji?.type === "required" && (
                <span className="form-error">Emoji is required</span>
            )}


            <label htmlFor="name" className="form-label">Name</label>
            <input
                {...register("name", {
                    required: true,
                    minLength: 3,
                    maxLength: 16
                })}
                className="form-input"
            />
            {errors.name?.type === "required" && (
                <span className="form-error">Name is required</span>
            )}
            {errors.name?.type === "minLength" && (
                <span className="form-error">Name must be at least 3 characters</span>
            )}
            {errors.name?.type === "maxLength" && (
                <span className="form-error">Name must be at most 16 characters</span>
            )}


            <label htmlFor="budget" className="form-label">Budget</label>
            <input
                {...register("budget", {
                    required: true,
                    pattern: /^\d+$/
                })}
                className="form-input"
            />
            {errors.budget?.type === "required" && (
                <span className="form-error">Budget is required</span>
            )}
            {errors.budget?.type === "pattern" && (
                <span className="form-error">Budget must be a number</span>
            )}

            {/* <label htmlFor="description" className="form-label">Description / Notes</label>
            <textarea
                {...register("description")}
                className="form-input no-resize"
                rows={3}
                maxLength={128}
                placeholder="E.g. Food category can include food, drinks, groceries, eating out, etc."
            /> */}

            <br />
            <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Editing..." : "Edit"} className="form-submit" />
        </form>
        </div>
    );
}

export default Edit;
