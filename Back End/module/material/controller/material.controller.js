import connectDB from "../../../DB/connection.js";





// export const getMaterial = async (req, res) => {
//     try {
//         connectDB.execute(`SELECT * FROM material where course_id = ${req.params.id} and material_status=1`, (error, data) => {
//             // const course = { id: req.params.id, name: 'Course Name' };
//             // Fetch material data for the course from database using the course ID
//             if (error) {
//                 res.json({message:'sql error',e:error})
//             } else {
//                 res.json({message:"success" , material :data });

//             }
//         })
//     } catch (error) {
//         res.json({ message: "catch error", error: error });
//     }
// }


export const getMaterial = async (req, res) => {
    try {
        let course =[];
        await connectDB.execute(
            `SELECT * FROM course WHERE course_id = ${req.params.id}`, (error, data) => {
                if(error){
                    res.json({message:"sql error"})
                }else{
                    course=data;
                    const material =  connectDB.execute(
                        `SELECT * FROM material WHERE course_id = ${req.params.id} AND material_status = 1 AND category = ${req.params.category}`,(error,data)=>{

                            const breadcrumbs = [
                                { label: 'Home', link: '/' },
                                { label: course[0].course_name, link: `/course/${course[0].course_id}` },
                                { label: 'Materials', active: true },
                            ];
                            
                            res.json({ message: 'success', course, material :data, breadcrumbs });
                        }
                        );

                }
            }
        );


    } catch (error) {
        res.json({ message: 'catch error', error });
    }
}