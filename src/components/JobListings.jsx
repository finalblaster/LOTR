import React from 'react'
import JobListing from './JobListing';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';


const JobListings = ({ isHome = false }) => {                                    // Déclare un composant fonctionnel avec une prop 'isHome' par défaut à false
    const [jobs, setJobs] = useState([]);                                        // État pour stocker la liste des jobs
    const [loading, setLoading] = useState(true);                                // État pour suivre si les données sont en train de charger

    useEffect(() => {                                                           // Effet secondaire qui s'exécute au montage du composant
        const fetchJobs = async () => {                                   // Fonction asynchrone pour récupérer les jobs
            const apiURL = isHome 
                ? '/api/jobs?_limit=3' 
                : '/api/jobs'; 
            try {
                const res = await fetch(apiURL);                   // Appel API pour récupérer les jobs
                const data = await res.json();                                     // Conversion de la réponse en JSON
                setJobs(data);                                                     // Mise à jour de l'état 'jobs' avec les données récupérées
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();                                                              // Appel de la fonction fetchJobs au montage du composant
    }, []);                                                                      // Tableau vide signifie que l'effet s'exécute seulement une fois au montage

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto ">

                <h2 className=" text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? 'Recents Job' : 'Browse Jobs'}
                </h2>

                {loading ? (<Spinner loading={loading} />) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {jobs.map((job) => (
                            <JobListing key={job.id} job={job} />
                        ))}
                    </div>
                )}

            </div>

        </section>
    )
}

export default JobListings