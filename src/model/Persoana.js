import { Sequelize } from "sequelize";


export default (sequelize)=>{

    class Persoana extends Sequelize.Model{

    }

    Persoana.init({

        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg:'A name is required!'
                },
                notEmpty:{
                    msg:"Name can't be empty!"
                }
            }
        },
        
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg:'A email is required!'
                },
                notEmpty:{
                    msg:"Email can't be empty!"
                }
            }
        },

        password:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg:'A password is required!'
                },
                notEmpty:{
                    msg:"Password can't be empty!"
                }
            }
        }

    },
    { 
        sequelize,
        timestamps:false,
        createAt:false,
        updateAt:false
    });


    return Persoana;


}