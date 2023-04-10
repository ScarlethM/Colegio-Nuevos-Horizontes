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

const perfil =  (req, res)=>{  
    res.json({msg: "Mostrando perfil"});
};

const confirmar = async (req, res)=>{
    const { token } = req.params;
    const usuarioConfirmar = await Estudiante.findOne({token});
    
    if(!usuarioConfirmar){
        const error = new Error('Token no valido')
        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmar.token= null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save()

        res.json({msg: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error);
    }
};

const autenticar = (req,res) => {
    console.log(req.body);
    res.json({msg:'Autenticando'})

}

export{registar,perfil , confirmar, autenticar};