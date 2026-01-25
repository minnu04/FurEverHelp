import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    action: {
        type: String,
        enum:["APPROVED_CAMPAIGN","REJECTED_CAMPAIGN"],
        required: true
    },
    campaign:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    reason:{
        type: String,
    },
},
{
    timestamps: true
});

export default mongoose.model('AdminLog', adminLogSchema);
