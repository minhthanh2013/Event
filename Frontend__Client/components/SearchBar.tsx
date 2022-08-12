import { Box, Button } from "@mui/material";
import React from "react";
import { Typography, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../styles/SearchBar.module.css";
import { useRouter } from "next/router";
interface SearchBarProps {}

const SearchBar = (props: SearchBarProps) => {
  const router = useRouter();
  const [search, setSearch] = React.useState<string>();
  const handleSearch = (e:any) => {
    router.push("/search-result?page=1&search=" + search);
    e.preventDefault();
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "140px",
          display: "flex",
          position: "absolute",
          mt: "-70px",
          zIndex: "1",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#180A3D",
            width: "80%",
            minWidth: "600px",
            height: "100%",
            borderRadius: "30px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            p: "40px 30px",
          }}
        >
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSearch}
            className={styles.form}
          >
            <TextField
              fullWidth
              id="standard-search"
              label="Looking for something?"
              type="search"
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                "& label": {
                  color: "#FFFFFF",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  userSelect: "none",
                },
                "& label:after": { color: "#FFFFFF" },
                "& div:before": { borderColor: "#FFFFFF" },
                "& input": { color: "#FFFFFF" },
                "& .Mui-focused": { color: "#6A35F2" },
                "& .MuiInput-underline:after": { borderBottomColor: "#6A35F2" },
                "& .css-1r19i84-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled):before":
                  { borderBottomColor: "#FFFFFF" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A35F2" },
              }}
            />
            <Button onClick={handleSearch}>
              <SearchIcon className={styles.searchIcon} />
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SearchBar;
