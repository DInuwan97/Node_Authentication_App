const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoureSchema = new Schema({

    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },

    author:String,

    tags:{
        type:Array,
        validate:{
            validator:function(v){
                return v.length > 0
            },
            message:'A course should hav at least one tag'
        }
    },

    category:{
        type:String,
        required:true,
        enum:['web','mobile','network'],
        lowercase:true
    },

    date:{ type:Date,default:Date.now },
    isPublished:Boolean,

    price:{
        type:Number,
        required: function(){return this.isPublished;},
        min:10,
        max:200,
        get: v => Math.round(v),
        set:v => Math.round(v)
    }

});

module.exports = Course = mongoose.model('courses',CoureSchema);