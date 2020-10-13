export default (req, res) =>{
    res.status(200).json({text: process.env.MESSAGE});
    console.log(process.env.MESSAGE);
}