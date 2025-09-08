import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStatus } from "../../../components/context/GlobalStatusContext.jsx";
import { toast } from "react-toastify";

import axios from "axios";
import "../../../css/Form.css";

const Add = () => {
  const navigate = useNavigate();

  const { setIsLoading, isLoading, isSubmitting, setIsSubmitting } =
    useGlobalStatus();

  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setIsLoading(true);
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/categories");
        setCategories(res.data);
      } catch (err) {
        toast.error("Error, Fetching Categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8080/api/expenses", data);
      navigate("/my-expenses");
      reset();
      toast.success("Expense added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add expense");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-message">Loading 🚀</div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="expense-tracker-form"
        >
          <h1>Add New Expense</h1>

          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            {...register("title", {
              required: true,
              minLength: 4,
              maxLength: 32,
            })}
            className="form-input"
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
            id="amount"
            {...register("amount", {
              required: true,
              min: 1,
            })}
            className="form-input"
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
            id="date"
            type="date"
            {...register("date", { valueAsDate: true, required: true })}
            className="form-input"
          />
          {errors.date?.type === "required" && (
            <span className="form-error">Date is required</span>
          )}

          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            {...register("category.id", { required: true })}
            className="form-input"
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
            value={isSubmitting ? "Adding..." : "Add Expense"}
            className="form-submit"
          />
        </form>
      )}
    </div>
  );
};

export default Add;
