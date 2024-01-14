import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

function Submissions() {
    const allEntries = JSON.parse(localStorage.getItem("allEntries")) || [];
    const [displayDetail, setDisplay] = useState(false);
    const [singleEntry, setSingleEntry] = useState({
        'email': '',
        'phone': '',
        'feedback': '',
        'documentSubmission': '',
        'rating': 0,
    });

    useEffect(() => {
        const pathname = window.location.pathname;
        if (!pathname.includes('submissions')) {
            setDisplay(true);
            const id = pathname.split('/').pop();
            const entry = allEntries.find(item => parseInt(item.id) === parseInt(id));
            setSingleEntry(entry || {});
        }
    }, [allEntries]);

    const singleEntryForm = () => {
        return (
            <Container>
                <Card>
                    <Card.Header>
                        <cite title="Source Title">Feedback Details</cite>
                    </Card.Header>
                    <Card.Body>
                        <RenderEntryDetail label="Email" value={singleEntry['email']} />
                        <RenderEntryDetail label="Phone" value={singleEntry['phone']} />
                        <RenderEntryDetail label="Feedback" value={singleEntry['feedback']} />
                        <RenderEntryDetail label="Document Submission" value={singleEntry['documentSubmission']} />
                        <RenderEntryDetail label="Rating" value={singleEntry['rating']} />
                    </Card.Body>
                </Card>
            </Container>
        );
    };

    const RenderEntryDetail = ({ label, value }) => (
        <Table striped bordered>
            <tbody>
                <tr>
                    <td>{label}</td>
                    <td>{value}</td>
                </tr>
            </tbody>
        </Table>
    );

    return (
        <>
            {displayDetail ? (
                singleEntryForm()
            ) : (
                <div className='padding30px'>
                    <Table striped hover responsive>
                        <thead>
                            <tr>
                                <th>Form Details</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Feedback</th>
                                <th>Document Submission</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allEntries.map(entry => (
                                <tr key={entry.id}>
                                    <td>
                                        <a href={`/submission/${entry['id']}`} target="_blank" rel="noopener noreferrer">
                                            View Details
                                        </a>
                                    </td>
                                    <td>{entry['email']}</td>
                                    <td>{entry['phone']}</td>
                                    <td>{entry['feedback']}</td>
                                    <td>{entry['documentSubmission']}</td>
                                    <td>{entry['rating']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
}

export default Submissions;
