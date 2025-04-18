import mongoose, { connect } from "mongoose";

const connectDB = async()=>{
try {
    const connect = await mongoose.connect(`${process.env.CONNNECTION_STRING}`)

    console.log('DATABASE CONNECTED ! ',
    connect.connection.host,
    connect.connection.name
);

} catch (error) {
console.log(error);
process.exit(1)    
}
}


// module.exports = connect;
export default connectDB;