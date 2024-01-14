import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Alert from 'react-bootstrap/Alert';
import StarRating from 'react-star-ratings';


function FeedbackForm() {
    const [displayform, setDisplay] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        identification: '',
        cardNumber: '', // New field for card number
        phone: '',
        feedback: '',
        rating: 0, // New field for star rating
    });

    const [checkedValues, setCheckedValues] = useState([]);
    const [errorMsg, setErrorMsg] = useState('Please enter the value for the above field');

    const handleOnChange = (isChecked, value) => {
        let temp = [...checkedValues];
        const pre = value.split('_')[0];
        if (isChecked) {
            temp = temp.filter((item) => item.split('_')[0] !== pre);
            temp.push(value);
            setCheckedValues(temp);
        } else {
            setCheckedValues(temp.filter((item) => item !== value));
        }
    };

    const validateForm = () => {
        setErrorMsg('Please enter the value for the above field');
        const alertElements = document.querySelectorAll('.alert-danger');

        alertElements.forEach((element) => {
            element.style.display = 'none';
        });

        const { name, email, phone, identification, cardNumber } = formData;

        const showError = (id, errorMsg) => {
            const errorElement = document.getElementById(id);
            if (errorElement) {
                errorElement.style.display = 'block';
                setErrorMsg(errorMsg);
            }
        };

        if (!name) {
            showError('name_er', errorMsg);
        } else if (!email || (!email.includes('.com') || !email.includes('@'))) {
            showError('email_er', 'Invalid Email');
        } else if (!phone || phone.length < 13) {
            showError('phone_er', 'Invalid Phone number');
        } else if (identification === 'passport' && !/^[a-zA-Z0-9]{12}$/.test(cardNumber)) {
            showError('cardNumber_er', 'Passport Invalid');
        } else if (identification === 'aadhar' && !/^\d{12}$/.test(cardNumber)) {
            showError('cardNumber_er', 'Invalid Aadhar Number');
        } else if (identification === 'pancard' && !/^[a-zA-Z0-9]{10}$/.test(cardNumber)) {
            showError('cardNumber_er', 'PAN Invalid');
        } else if (identification === 'driver_license' && !/^[a-zA-Z0-9\s-]{16}$/.test(cardNumber)) {
            showError('cardNumber_er', "Incorrect Driver's License ");
        }

        // Rest of the validation logic remains the same

        // Return true only if all validations pass
        return !document.querySelectorAll('.alert-danger[style="display: block;"]').length;
    };

    const formSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const existingEntries = JSON.parse(localStorage.getItem('allEntries')) || [];
            const new_id = existingEntries.length > 0 ? existingEntries[existingEntries.length - 1].id + 1 : 0;

            const entry = {
                id: new_id,
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                checkbox_values: checkedValues,
                cardNumber: formData.cardNumber, // Include cardNumber in the entry
                feedback: formData.feedback, // Include feedback in the entry
                rating: formData.rating, // Include rating in the entry
            };

            existingEntries.push(entry);
            localStorage.setItem('allEntries', JSON.stringify(existingEntries));
            setDisplay(false);
        }
    };

    const feedback_type = {
        qos: 'Please rate the quality of the service you received from your station',
        qob: 'Please take a moment to rate the quality of our interactions',
        roc: 'Did our police department keep you well-informed with updates on the investigation',
        exp: 'Your satisfaction is our priority. Please take a moment to share your overall experience with us',
        eyp: 'Please rate the speed and efficiency of the police response to your reported incident. Your input helps us enhance our response times and effectiveness',
    };

    const feedback_opts = ['Excellent', 'Good', 'Fair', 'Bad'];

    const handleChange = (key, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    return (
        <Container>
            {displayform ? (
                <Card>
                    <Card.Header>
                        <h1>General Feedback</h1>
                        <cite title="Source Title">
                            We are committed to ensuring the safety and well-being of our community, and we value your feedback to help us serve you better.
                        </cite>
                    </Card.Header>
                    <Card.Body>
                        {/* <blockquote className="blockquote mb-0">Please fill out this questionnaire.</blockquote> */}
                    </Card.Body>
                    <Container className="padding30px">
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            required
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={e => handleChange('email', e.target.value)}
                                        />
                                        <Alert variant="danger" id="email_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicPhone">
                                        <Form.Label className="required-field">Phone</Form.Label>
                                        <InputGroup>
                                            <PhoneInput
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={value => handleChange('phone', value)}
                                            />
                                        </InputGroup>
                                        <Alert variant="danger" id="phone_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                                <Col></Col>
                            </Row>

                            <Row>
                                <Col>
                                    {/* Add a new Form.Group for the feedback text area */}
                                    <Form.Group className="mb-3" controlId="formBasicFeedback">
                                        <Form.Label className="required-field">Feedback</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={15}
                                            placeholder="Provide your feedback here..."
                                            value={formData.feedback}
                                            onChange={(e) => handleChange('feedback', e.target.value)}
                                        />
                                        <Alert variant="danger" id="feedback_er">
                                            &#9432;{errorMsg}
                                        </Alert>

                                    </Form.Group>
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col>
                                    <DocumentSubmission setDisplayForm={setDisplay} />
                                </Col>
                            </Row> */}

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicMissingUpload">
                                        <Form.Label>Document Submission (if any)</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept=".png, .jpg, .jpeg"
                                            onChange={e => setFormData({ ...formData, missingUpload: e.target.files[0] })}
                                        // disabled={formData.category !== 'PersonMissing' &&
                                        //     formData.category !== 'VehicleMissingTheft' &&
                                        //     formData.category !== 'CellPhoneMissingTheft' &&
                                        //     formData.category !== 'JewelSnatchingTheft' &&
                                        //     formData.category !== 'BagLiftingTheft' &&
                                        //     formData.category !== 'KidnappingWrongfulConfinement' &&
                                        //     formData.category !== 'CheatingEmbezzlementLandGrabbing' &&
                                        //     formData.category !== 'DamagingProperty'
                                        // }
                                        />
                                        <Alert variant="danger" id="missing_upload_er">
                                            &#9432;{errorMsg}
                                        </Alert>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <StarRating
                                        rating={formData.rating}
                                        starRatedColor="orange"
                                        changeRating={(newRating) => handleChange('rating', newRating)}
                                        numberOfStars={5}
                                        name="rating"
                                    />
                                </Col>

                            </Row>
                            <Container>
                                {Object.keys(feedback_type).map((ty) => (
                                    <Row key={ty}>
                                        {/* ... (existing code) */}
                                    </Row>
                                ))}
                            </Container>
                            <Row>
                                <Col className="mt-3">


                                    <Button className="btn_purp" onClick={(e) => formSubmit(e)}>
                                        Submit Review
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Card>
            ) : (
                <Card bg="light" text="dark">
                    <Card.Body className="d-flex flex-column align-items-center">
                        <div className="padding30px">
                            <div className="circle">
                                <div className="checkmark"></div>
                            </div>
                        </div>
                        <Card.Text className="text-center">Thank you for providing the feedback</Card.Text>
                        <Form.Text muted className="text-center">
                            We will work towards improving your experience
                        </Form.Text>
                        <div className="padding30px">
                            <Button className="btn_purp" onClick={() => (window.location.href = '/submissions')}>
                                Close
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default FeedbackForm;