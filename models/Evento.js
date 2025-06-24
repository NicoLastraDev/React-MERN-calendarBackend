const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    notes: {
        type: String,
        default: ''
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
}, 

{
    timestamps: true // Adds createdAt and updatedAt fields  
});

EventoSchema.method = ('toJSON', function() {
    const {__v, _id, ...Object} = this.ObjectId
        Object._id = id; // Rename _id to id
        
        return Object;
}),

module.exports = model('Evento', EventoSchema);