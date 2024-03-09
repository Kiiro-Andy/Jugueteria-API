import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { deleteObject } from 'firebase/storage';
import { db } from "../firebaseConfig/firebase"
import { storage } from '../firebaseConfig/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Edit = () => {

    const [ name, setName ] = useState('')
    const [ descripcion, setDescripcion ] = useState('')
    const [ precio, setPrecio ] = useState(0)
    const [imagen, setImagen] = useState(null)
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) =>{
        e.preventDefault()
        const juguete = doc(db, "juguetes", id)
        let data = {name: name, descripcion: descripcion, precio: precio}

        const jugueteActual = await getDoc(juguete)
        const imagenURLAnterior = jugueteActual.data().imagen

        if (imagen) {
            const storageRef = ref(storage, `juguetes/${imagen.name}`)
            await uploadBytes(storageRef, imagen)
            const imageUrl = await getDownloadURL(storageRef)
            data = { ...data, imagen: imageUrl }

            if (imagenURLAnterior) {
                const imagenAnteriorRef = ref(storage, imagenURLAnterior);
                await deleteObject(imagenAnteriorRef);
            }
        }

        await updateDoc(juguete, data)
        navigate('/')

        MySwal.fire({
            icon: 'success',
            title: '¡Actualización exitosa!',
            text: 'El juguete se ha actualizado correctamente.'
        });
    }

    const getJugueteById = async (id) =>{
        const juguete = await getDoc( doc(db, "juguetes", id) )
        if(juguete.exists()) {

            setName(juguete.data().name)
            setDescripcion(juguete.data().descripcion)
            setPrecio(juguete.data().precio)

        }else{
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El producto no existe.',
                confirmButtonText: 'OK'
            }).then((result) =>{
                if(result.isConfirmed){
                    navigate('/')
                }
            })
        }
    }

    useEffect( () =>{
        getJugueteById(id)
    }, [])

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setImagen(image);
    }

  return (
    <div className='container' style={{ backgroundColor: 'rgb(223, 175, 103)', marginTop: '40px', marginBottom: '40px', borderRadius: '10px'  }}>
        <div className='row'>
            <div className='col'>
                <h1>Editar Juguete</h1>

                <form onSubmit={ update }>
                    <div className='mb-3'>
                        <label className='form-label' style={{ fontSize: '20px' }}>Nombre</label>
                        <input 
                            value={ name }
                            onChange={ (e) => setName(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' style={{ fontSize: '20px' }}>Descripcion</label>
                        <input 
                            value={ descripcion }
                            onChange={ (e) => setDescripcion(e.target.value)}
                            type='text'
                            className='form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' style={{ fontSize: '20px' }}>Precio</label>
                        <input 
                            value={ precio }
                            onChange={ (e) => setPrecio(e.target.value)}
                            type='number'
                            className='form-control'
                        />
                    </div>

                    <div className='mb-3'>
                        <label className='form-label' style={{ fontSize: '20px' }}>Imagen</label>
                        <input 
                            type='file'
                            accept='image/*'
                            onChange={handleImageChange}
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn' style={{ backgroundColor: 'rgb(59, 165, 109)', color: 'white' }}>Actualizar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit
