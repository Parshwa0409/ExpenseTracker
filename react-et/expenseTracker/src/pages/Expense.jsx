import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseTile from "../components/expense/ExpenseTile";
import PaginationRounded from "../components/PaginationRouded";
import axios from "axios";
import { useGlobalStatus } from "../components/context/GlobalStatusContext";
import { toast } from "react-toastify";
import "../css/expense/Expense.css";

function Expense() {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const { isLoading, setIsLoading, isSubmitting, setIsSubmitting } = useGlobalStatus();

  const navigateToAdd = () => {
    navigate("/add-expenses");
  };

  const navigateToEdit = (id) => {
    navigate("/edit-expenses", { state: { id: id } });
  };

  const handlePaginationOnDelete = (id) => {
    const remainingItemsOnPage = expenses.filter((item) => item.id !== id);
    if (remainingItemsOnPage.length === 0) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        toast.info("No items left on the first page.");
      }
    }
  };

  const handleDelete = async (e, id) => {
    setIsLoading(true);
    setIsSubmitting(true);
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`);
      handlePaginationOnDelete(id);
      fetchExpenses(currentPage);
      toast.success("Expense deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete expense.");
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  const fetchExpenses = async (cp) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/expenses?page=${cp - 1}`
      );
      setExpenses(response.data);
    } catch (error) {
      toast.error("Error fetching expenses.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchExpenseCount = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/expenses/count"
      );
      setPageCount(Math.ceil(response.data / 7));
    } catch (error) {
      toast.error("Error fetching expense count.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseCount();
    fetchExpenses(currentPage);
  }, [currentPage]);

  return (
    <div>
      <div className="expense-header">
        <h1>Expense Page</h1>
        <button className="add-item" onClick={navigateToAdd}>
          + Expense
        </button>
      </div>

      <hr className="styled-hr" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {expenses &&
            expenses.map((exp) => {
              return (
                <ExpenseTile
                  expense={exp}
                  key={exp.id}
                  onEdit={() => navigateToEdit(exp.id)}
                  onDelete={(e) => handleDelete(e, exp.id)}
                />
              );
            })}
          <hr className="styled-hr" />
          <div className="center">
            <PaginationRounded
              pageChangeStateSetter={setCurrentPage}
              count={pageCount}
              activePage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Expense;
