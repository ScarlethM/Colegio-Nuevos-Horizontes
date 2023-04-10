import Estudiante from '../models/Estudiante.js';


const registar = async (req, res)=>{
    console.log(req.body);
    const {email} = req.body;

    //Revisar si un usuario esta registrado
    const existeUsuario = await Estudiante.findOne({email})

    if (existeUsuario){
        const error = new Error('Usuario ya registado');
        return res.status(400).json({msg: error.message});
    }

    try {
        //Guardar un nuevo estudiante
        const estudiante = new Estudiante(req.body);
        const estudianteGuardado = await estudiante.save();
        
        res.json(estudianteGuardado);

    } catch (error) {
        console.log(error); 
    }
};

const perfil = (req, res)=>{

   
    res.json({msg: "Mostrando perfil"});
};

export{registar,perfil };