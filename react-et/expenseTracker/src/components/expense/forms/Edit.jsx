import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalStatus } from "../../context/GlobalStatusContext";
import { toast } from "react-toastify";
import axios from "axios";
import "../../../css/Form.css";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, setIsLoading, isSubmitting, setIsSubmitting } =
    useGlobalStatus();

  const [categories, setCategories] = useState([]);
  const [currId] = useState(location.state.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    } finally {
      // setIsLoading(false);
    }
  };

  const fetchExpense = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/expenses/${id}`);
      reset(res.data);
      // Add a small delay before setting the category
      setTimeout(() => {
        setValue("category.id", res.data.category.id);
      }, 100);
    } catch (err) {
      toast.error("Failed to fetch expense details");
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCategories();
    fetchExpense(currId);
    setIsLoading(false);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/expenses/${currId}`, data);
      navigate("/my-expenses");
      toast.success("Expense updated successfully!");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update expense");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="expense-tracker-form"
        >
          <h1>Edit Expense</h1>

          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            {...register("title", {
              required: true,
              minLength: 4,
              maxLength: 32,
            })}
            className="form-input"
            id="title"
          />
          {errors.title?.type === "required" && (
            <span className="form-error">Name is required</span>
          )}
          {errors.title?.type === "minLength" && (
            <span className="form-error">
              Name must be at least 3 characters
            </span>
          )}
          {errors.title?.type === "maxLength" && (
            <span className="form-error">
              Name must be at most 16 characters
            </span>
          )}

          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", {
              required: true,
              min: 1,
            })}
            className="form-input"
            id="amount"
          />
          {errors.amount?.type === "required" && (
            <span className="form-error">Amount is required</span>
          )}
          {errors.amount?.type === "min" && (
            <span className="form-error">Amount must be valid, 1 or more</span>
          )}

          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            {...register("date", { valueAsDate: true, required: true })}
            className="form-input"
            id="date"
          />
          {errors.date?.type === "required" && (
            <span className="form-error">Date is required</span>
          )}

          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category.id", { required: true })}
            className="form-input"
            id="category"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
          {errors.category?.id && (
            <span className="form-error">Category is required</span>
          )}

          <br />
          <input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Updating..." : "Update Expense"}
            className="form-submit"
          />
        </form>
      )}
    </div>
  );
};

export default Edit;
