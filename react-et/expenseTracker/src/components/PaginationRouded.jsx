import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationRounded(props) {
  return (
    <Stack spacing={6}>
      <Pagination
        count={props.count}
        onChange={(_, currentPage) => {
          props.pageChangeStateSetter(currentPage);
        }}
        page={props.activePage}
        variant="outlined"
        shape="rounded"
        size="large"
      />
    </Stack>
  );
}

export default PaginationRounded;
