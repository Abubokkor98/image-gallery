import { useState } from "react";
import { TextField, InputAdornment, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  // update local state and trigger search handler from parent
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search images by title..."
      value={searchQuery}
      onChange={handleSearch}
      className="mb-6"
      color="secondary"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="secondary" />
          </InputAdornment>
        ),
        sx: {
          borderRadius: 2,
          // customize outline style when focused
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main,
              borderWidth: 2
            }
          },
          // subtle border color on hover
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.light
          }
        }
      }}
    />
  );
};

export default SearchBar;
