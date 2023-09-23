import { Stack, Button, TextField, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = () => {
    return (
        <Paper variant="outlined" className="p-6 bg-white rounded">
            <Stack direction="row" spacing={2} className="w-10/12">
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