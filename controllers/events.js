const {response} = require('express');
const Evento = require('../models/Evento');


const getEvents = async(req, res = response)=> {
  
  const eventos = await Evento.find()
  .populate('user', 'name') //Filtra los valores que desesas mostrar

  res.json({
    ok: true,
    eventos,
  })
}

const createEvent = async(req, res = response)=> {
  const { title, start, end, notes } = req.body

  console.log(req.body);

  const evento = new Evento({
    title,
    start,
    end,
    notes,
    user: req.uid,
  });

  try {
    //evento.user = req.uid

    const eventoGuardado = await evento.save();
    await eventoGuardado.populate('user', 'name')

    await eventoGuardado.save()
    res.status(201).json({
      ok: true,
      msg: 'Event created successfully',
      evento: eventoGuardado,
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error creating event',
    });
  }
}

const updateEvent = async(req, res = response)=> {

  const eventoId = req.params.id

  try {
    const evento = await Evento.findById(eventoId)

    if(!evento)
      return res.status(404).json({
      ok: false, msg: "No existe un evento con ese ID"
    })

    if(evento.user.toString() !== req.uid)
    {
      return res.status(401).json({ok: false, msg: "No puedes editar eventos de otros usuarios"})
    }

    const nuevoEvento = {
      ...req.body,
      //user: req.uid,
    }

    const eventoActualizado = await Evento.
    findByIdAndUpdate(eventoId, nuevoEvento, {new: true})

    await eventoActualizado.populate('user','name')

    res.json({
      ok: true,
      evento: eventoActualizado,
    })
}

  catch(error){
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: "error al actualizar en base de datos"
    })
  }

}

const deleteEvent = async(req, res = response)=> {

  const eventoId = req.params.id

  try {
    const evento = await Evento.findById(eventoId)

    if(!evento)
      return res.status(404).json({
      ok: false, msg: "No existe un evento con ese ID"
    })

    if(evento.user.toString() !== req.uid)
    {
      return res.status(401).json({ok: false, msg: "No puedes editar eventos de otros usuarios"})
    }

    await Evento.findByIdAndDelete(eventoId)

    res.json({
      ok: true,
      msg: "Evento eliminado de la base de datos",
    })
}

  catch(error){
    console.error(error)
    res.status(500).json({
      ok: false,
      msg: "error al eliminar en base de datos"
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}