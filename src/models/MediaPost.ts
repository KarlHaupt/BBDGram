const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please enter description for this Post'],
    },
    image: {
        data: Buffer,
        contentType: String,
        required: [true, 'Please add an image'],
    },
    tags: {
        type: String,
        required: [true, 'Please select tag(s) for this Post'],
        enum: {
            values: [
                //Valid Tags
                'BBD',
                'Software Engineer',
                'Grad',
            ],
            message: 'Please select correct tag(s) for this image'
        }
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

export default mongoose.model('MediaPost', mediaSchema);