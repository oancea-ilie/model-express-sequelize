import express from "express";
import cors from "cors";
import Repository from "../config/Repository.js";
import CourseService from "../services/CourseServie.js";
import CourseController from "./Controllers/CourseController.js";



export default  class Server{

    constructor( ){
        this.app=express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());
        this.repo = new Repository();

        this.app.get('/', (req, res) => {
            res.json({
              message: 'Welcome to the REST API project!',
            });
        });
        
      }

      run= async()=>{
        let db= await  this.repo.createDb();

        db.sequelize.sync()
        .then( () => {
               this.app.listen(5000,async () => {
               console.log(`Express server is listening on port 5000`);
            });
        }).then(()=>{
              let courseService =  new CourseService(db.models);
              
              let couseController= new CourseController(courseService,this.app);



        });
      }


}