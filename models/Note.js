import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
    {
        title:String,
        content:String,
        userId:String,
        pinned:{
            type:Boolean,
            default:false,
        },

    },
    {timestamps:true}
);

export default mongoose.models.Note || mongoose.model("Note",NoteSchema);