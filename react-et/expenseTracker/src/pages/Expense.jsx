import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseTile from "../components/expense/ExpenseTile";
import useDebounce from "../components/DebouncedSearch";
import PaginationRounded from "../components/PaginationRouded";
import axios from "axios";
import { useGlobalStatus } from "../components/context/GlobalStatusContext";
import { toast } from "react-toastify";
import "../css/expense/Expense.css";

function Expense() {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const { isLoading, setIsLoading, isSubmitting, setIsSubmitting } =
    useGlobalStatus();

  // Link the debounced value to an variable, add an useEffectHook with dependency on it
  const debouncedInputValue = useDebounce(searchKey, 300); // Debounce with 300ms delay

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

  const fetchExpenses = async (cp, keyword) => {
    setIsLoading(true);
    debugger
    const params = new URLSearchParams({ page: cp - 1 });
    let url = "http://localhost:8080/api/expenses";

    if (keyword && keyword.trim()) {
      params.append("keyword", keyword.trim());
      url += "/search";
    }

    url += `?${params.toString()}`;

    try {
      const response = await axios.get(url);
      setExpenses(response.data.allExpenses);
      setPageCount(response.data.pageCount);
    } catch (error) {
      toast.error("Error fetching expenses.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(currentPage, debouncedInputValue);
  }, [currentPage, debouncedInputValue]);

  return (
    <div>
      <div className="expense-header">
        <h1>Expense Page</h1>
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search By Title ..."
          className="form-input expence-search"
        />
        <button className="add-item" onClick={navigateToAdd}>
          + Expense
        </button>
      </div>

      <hr className="styled-hr" />
      {isLoading ? (
        <div className="loading-message">
          Loading 🚀
        </div>
      ) : (
        <>
          {expenses.length !== 0 ? (
            <>
              {expenses.map((exp) => (
                <ExpenseTile
                  expense={exp}
                  key={exp.id}
                  onEdit={() => navigateToEdit(exp.id)}
                  onDelete={(e) => handleDelete(e, exp.id)}
                />
              ))}
              <hr className="styled-hr" />
              <div className="center">
                <PaginationRounded
                  pageChangeStateSetter={setCurrentPage}
                  count={pageCount}
                  activePage={currentPage}
                />
              </div>
            </>
          ) : (
            <div className="expense-message error-message">
              <span>🚫 No Expenses Found</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Expense;
