import React, { useState } from 'react';
import styles from './styles/PostRental.module.scss';
import Modal from '../../components/modal/Modal.jsx';

const PostRental = (props) => {
    const [ showConfirmCancel, setShowConfirmCancel ] = useState(false);
    const { setShowPostRentalModal } = props;
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ bedRoom, setBedRoom ] = useState('');
    const [ washRoom, setWashRoom ] = useState('');
    const [ rentalType, setRentalType ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ isOwner, setIsOwner ] = useState(false);
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ titleError, setTitleError ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');
    const [ bedRoomError, setBedRoomError ] = useState('');
    const [ bathError, setBathError ] = useState('');
    const [ typeError, setTypeError ] = useState('');
    const [ locationError, setLocationError ] = useState('');
    const postRental = () => {
        if (!title) setTitleError('Please enter the title for the job')
        if (!bedRoom) setBedRoomError('Please enter the company for the job')
        if (!description) setDescriptionError('Please enter the description for the job')
        if (!location) setLocationError('Please enter the location of the company')
    }
    const confirmCancel = () => {
        setTitle('')
        setDescription('')
        setLocation('')
        setShowConfirmCancel(false)
        setShowPostRentalModal(false)
    }
    return(
        <Modal>
           <div className={styles.postRental}>
                <div className={styles.title}>Post Rental</div>
                <div className={styles.inputBox}>
                <div className={styles.label}>Title *</div>
                <input className={styles.input} onChange={(e) => setTitle(e.target.value)} value={title}/>
                <span className={styles.inputError}>{titleError}</span>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.label}>Description</div>
                <textarea style={{ 'resize': 'none'}} type="text" className={styles.input} onChange={(e) => setDescription(e.target.value)} rows='4' value={description}/>
                <span className={styles.inputError}>{descriptionError}</span>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.label}>Location</div>
                <input style={{ 'resize': 'none'}} type="text" className={styles.input} onChange={(e) => setLocation(e.target.value)} value={location}/>
                <span className={styles.inputError}>{locationError}</span>
            </div>
            <div className={styles.inputBox}>
                <span className={styles.label}>Type </span>
                <select value={rentalType} onChange={(e) => setRentalType(e.target.value)}>
                    <option value="Condo">Condo</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Town House">Town House</option>
                    <option value="Basement">Basement</option>
                </select>
                <span className={styles.inputError}>{locationError}</span>
            </div>
            
            <div className={styles.inputBox}>
                <span className={styles.label}>Number of Bedrooms</span>
                <input style={{ 'resize': 'none'}} type="number" className={styles.input} onChange={(e) => setBedRoom(e.target.value)} value={bedRoom}/>
                <span className={styles.inputError}>{bedRoomError}</span>
            </div>
            <div className={styles.inputBox}>
                <span className={styles.label}>Number of Washroom</span>
                <input style={{ 'resize': 'none'}} type="number" className={styles.input} onChange={(e) => setWashRoom(e.target.value)} value={washRoom}/>
                <span className={styles.inputError}>{bedRoomError}</span>
            </div>
            <hr/>
            <div className={styles.inputBox}>
                <div className={styles.label}>Email</div>
                <input style={{ 'resize': 'none'}} type="text" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className={styles.inputBox}>
                <div className={styles.label}>Mobile Number</div>
                <input style={{ 'resize': 'none'}} type="text" className={styles.input} onChange={(e) => setPhone(e.target.value)} value={phone}/>
            </div>
            <div className={styles.inputBox}>
                Are you the owner of this place? <input style={{ 'resize': 'none'}} type="checkbox" className={styles.input} onChange={() => setIsOwner(!isOwner)} value={isOwner}/>
            </div>
                <div className={styles.actions}>
                    { showConfirmCancel && (
                        <div className={styles.confirmCancel}>
                            Are you sure you want to cancel? All information will be lost.
                            <div className={styles.actions}>
                                <div onClick={() => confirmCancel() } className={`${styles.actionButton} ${styles.confirmCancelButton}`}> Cancel</div>
                                <div onClick={() => setShowConfirmCancel(false)}  className={`${styles.actionButton} ${styles.continueButton}`}> Go Back</div>
                            </div>
                        </div>
                    )}
                    <div onClick={() => setShowConfirmCancel(true)} className={`${styles.actionButton} ${styles.cancelButton}`}>
                        Cancel                       
                    </div>
                    <div onClick={() => postRental()} className={`${styles.actionButton} ${styles.postButton}`}>
                        Post Rental
                    </div>
                </div>
           </div>
        </Modal>
    )
}
export default PostRental;
