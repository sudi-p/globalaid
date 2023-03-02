import { useState } from 'react';
import { useDispatch } from 'react-redux';
import getClient from '../../../lib/api';
import { fetchJobsSuccess } from '../JobsSlice';
import { Button, Stack, TextField } from '@mui/material/';
import styles from './styles/CreateJob.module.scss';

const CreateJob = (props) => {
    const dispatch = useDispatch();
    const { setShowCreateJobModal } = props;
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ company, setCompany ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ isOwner, setIsOwner ] = useState(false);
    const [ titleError, setTitleError ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');
    const [ companyError, setCompanyError ] = useState('');
    const [ locationError, setLocationError ] = useState('');
    const createJob = () => {
        if (!title) setTitleError('Please enter the title for the job')
        if (!company) setCompanyError('Please enter the company for the job')
        if (!description) setDescriptionError('Please enter the description for the job')
        if (!location) setLocationError('Please enter the location of the company')
        getClient()
        .post('/user/createjob/',{
            title,
            description,
            company,
            location,
            email,
            phone,
            isOwner
        })
        .then(res => {
            dispatch(fetchJobsSuccess(res.data))
            setShowCreateJobModal(false);
        })
        .catch(err => console.log(err))
    }
    return (
        <div className={styles.createJob}>
            <div className={styles.createJobTitle}>CreateJob</div>
            <div className={styles.inputBox}>
                
                <TextField label="Title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                <span className={styles.inputError}>{titleError}</span>
            </div>
            <div className={styles.inputBox}>
                
                <TextField
                    multiline
                    rows={4}
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}/>
                <span className={styles.inputError}>{descriptionError}</span>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.label}>Company Name</div>
                <input style={{ 'resize': 'none'}} type="text" className={styles.input} onChange={(e) => setCompany(e.target.value)} value={company}/>
                <span className={styles.inputError}>{companyError}</span>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.label}>Location</div>
                <input style={{ 'resize': 'none'}} type="text" className={styles.input} onChange={(e) => setLocation(e.target.value)} value={location}/>
                <span className={styles.inputError}>{locationError}</span>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.label}>Email</div>
                <input style={{ 'resize': 'none'}} type="text" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.label}>Mobile Number</div>
                <input style={{ 'resize': 'none'}} type="text" className={styles.input} onChange={(e) => setPhone(e.target.value)} value={phone}/>
            </div>
            <div className={styles.inputBox}>
                
                Are you hiring for this Job? If you are not hiring or not associated with the hiring process in anyway, Select No.<input style={{ 'resize': 'none'}} type="checkbox" className={styles.input} onChange={() => setIsOwner(!isOwner)} value={isOwner}/>
            </div>
            <Stack spacing={2} direction="row">
            <Button
                color="primary"
                variant="outlined"
                onClick={() => setShowCreateJobModal(false)}
            >Cancel</Button>
            <Button
                color="primary"
                variant="contained"
                onClick={()=> createJob()}
            >Post Job</Button>
            </Stack>
            
        </div>
    )
}

export default CreateJob;