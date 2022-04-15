{/**Composant Pour formulaire à remplir pour submissions d'un commentaire */}

import React, {useState, useEffect, useRef} from 'react'

import {submitComment} from '../services';

const CommentsForm = ({slug}) => {

    const [error, setError] = useState(null);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccesMessage, setShowSuccesMessage] = useState(false);
    const commentEl = useRef(); //pour le focus du champ commentaire et sa reference
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl  = useRef();

    //

    useEffect(() => {
       nameEl.current.value = window.localStorage.getItem('name');
       emailEl.current.value = window.localStorage.getItem('email'); 
    })

    const handleCommentSubmission = () =>{
        setError(false); // reset error

        const {value: comment} = commentEl.current; //récupération du contenu du champ commentaire
        const {value: name} = nameEl.current; //récupération du contenu du champ name
        const {value: email} = emailEl.current; //récupération du contenu du champ email
        const {value: storeData} = storeDataEl.current; //récupération du contenu du champ storeData

        if(!comment || !name || !email){
            setError(true);
            return;
        }

        const commentObj = { comment, name, email, slug }; //Objet de commentaire et ses attributs

        if(storeData){ //Si le checkbox est coché
            window.localStorage.setItem('name', name);//Stockage en local de l'attribute name de l'utilisateur
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name');//remove de l'email commentaire en local
            window.localStorage.removeItem('email');
        }

        //Soumission de l'objet commentaire
        submitComment(commentObj)
            .then((res) => {
                setShowSuccesMessage(true);

                setTimeout(() =>{
                    setShowSuccesMessage(false)
                }, 3000); 
            })
        
    }

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
        <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a Comment</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <textarea 
                ref={commentEl} 
                className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                placeholder='Comment'
                name='comment'
                />
        </div> 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <input
                type='text'
                ref={nameEl}
                className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
                placeholder='Name'
                name='name'
                />
            <input
                type='text'
                ref={emailEl}
                className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
                placeholder='Email'
                name='email'
                />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
                <input ref={storeDataEl} type='checkbox' id='storeData' name='storeData' value='true'/>
                <label htmlFor='storeData' className='text-gray-500 cursor-pointer ml-2'>Save my e-mail and name for the next time</label>
            </div>
        </div>
        {error && <p className='text-red-500 text-xs'>All fields are required</p>}
        <div className="mt-8">
            <button 
                type='button' 
                onClick={handleCommentSubmission}
                className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg text-white px-8 py-3 rounded-full cursor-pointer'>
                    Post Comment
            </button>
            {showSuccesMessage && <span className='text-green-500 text-xl float-right font-semibold mt-3'>Comment submitted for a review</span>}
        </div>
    </div>
  )
}

export default CommentsForm