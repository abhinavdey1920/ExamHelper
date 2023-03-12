import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileTracker = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get('/api/files')
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const trackFile = (fileId) => {
        axios.post('/api/track-file', { id: fileId })
            .then(response => {
                setFiles(prevFiles => {
                    return prevFiles.map(file => {
                        if (file.id === fileId) {
                            return {...file, isTracked: true };
                        } else {
                            return file;
                        }
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    return ( <
        div >
        <
        h1 > File Tracker < /h1> <
        ul > {
            files.map(file => ( <
                li key = { file.id } > { file.name } - { file.isTracked ? 'Tracked' : 'Not tracked' } {
                    !file.isTracked && ( <
                        button onClick = {
                            () => trackFile(file.id) } > Track File < /button>
                    )
                } <
                /li>
            ))
        } <
        /ul> <
        /div>
    );
};

export default FileTracker;