import { lazy } from 'react';
import { Box, Stack, Stepper, Step, StepLabel } from '@mui/material';
import { DetailedInformationProps } from './RentalDetailedInformation';
 const DetailedInformation = lazy(() => import("./RentalDetailedInformation"));
const UploadRentalPhotos = lazy(()=> import('./UploadRentalPhotos'));
const steps = [
    'Title and Description',
    'Detailed Information',
    'Media',
];

type CreateRentalProps = DetailedInformationProps & {
    createAdLevel: number,
}

const CreateRental = ({ adId, createAdLevel, refetch }: CreateRentalProps) => {
    let display = <DetailedInformation adId={adId} refetch={refetch} />
    if (createAdLevel == 2) display = <UploadRentalPhotos adId={adId}/>
    return (
        <Stack spacing={5}>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={createAdLevel} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {display}
        </Stack>
    )
}
export default CreateRental;
