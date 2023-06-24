import { Stack, Button, TextField, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from './styles/SearchBar.module.scss';

const SearchBar = () =>{
    return (
        <Paper variant="outlined" className={styles.searchSection}>
            <Stack direction="row"  spacing={2}>
                <TextField
                label="Search For Jobs"
                fullWidth
                />
                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<Search />}
                >Search</Button>
            </Stack>
        </Paper>
      
    );
  }

  export default SearchBar;