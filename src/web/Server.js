import express from "express";
import cors from "cors";
import Repository from "../config/Repository.js";
import PersoanaService from "../services/PersoanaServices.js";
import PersoanaController from "./Controllers/PersoanaController.js";

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


        let db= await this.repo.createDb();


        db.sequelize.sync()
        .then( () => {
               this.app.listen(5000,async () => {
               console.log(`Express server is listening on port 5000`);
            });
        }).then(()=>{
              let personsService =  new PersoanaService(db.models);
              
              let personsController = new PersoanaController(personsService,this.app);

        });


      }
}