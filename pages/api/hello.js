export default (req, res) =>{
    res.status(200).json({text: process.env.GREETING});
    console.log(process.env.GREETING);
}