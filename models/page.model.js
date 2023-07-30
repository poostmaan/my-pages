const { Schema, model} = require('mongoose');

const pageScheme = Schema(
    {
        description: {
            type: String,
            required: true,
            min: 4,
            max: 32,
        },
        image: {
            type: String,
            required: true,
        },
        section: {
            type: String,
            default: 'Miscellaneous'
        },
        rating: {
            type: Number,
            default: 0
        },
        url: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

pageScheme.method('toJSON', function() {
    // vAMOS A REEMPLAZAR ALGUNAS CLAVES DE COMO SER GUARDAN EN MONGO
    const { __v, _id, ...object } = this.toObject();
    object.id = _id
    return object
})

module.exports = model('Page', pageScheme);