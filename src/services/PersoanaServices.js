
export default class PersoanaService{
      
    constructor({Persoana}){
          this.persoana = Persoana;
    }

    getAll= async ()=>{
          
       let pers = await this.persoana.findAll();
     
       if(pers.length ==0){
           throw new Error("Nu exista persoane in baza de date!");
       }

       return pers;

    }

    getById = async(id)=>{
        let pers = await this.persoana.findByPk(id);
        
        if(!pers){
            throw new Error("Nu exista Persoana cu acest id!");
        }
        return pers;

    }

    createP= async(per)=>{
        
        let allPersons = await this.getAll();

        if(per.name == null || per.email == null || per.password == null){
            throw new Error("Propietati invalide!");
        }

        if(!per.name){
            throw new Error('campul Nume este gol!');
        }
        else if(!per.email){
            throw new Error('campul Email este gol!');
        }
        else if(!per.password){
            throw new Error('campul Password este gol!');
        }
        else{
            if(allPersons){
                for(let p of allPersons){
                    if(p.name == per.name){
                        throw new Error("Acest nume exista deja in baza de date!");
                    }
                }
            }

            await this.persoana.create(per);
        }

    }

    deleteP=async(id)=>{
        let per = await this.getById(id);
                
        if(per){
            await per.destroy();
        }else{
            throw new Error("Nu s-a gasit Persoana cu acest ID pentru a putea fii stearsa!");
        }
    }

    updateP= async(id, user)=>{
        let per = await this.getById(id);
        
        if(user.name == '' && user.email=='' && user.password == ''){
            throw new Error("Nu exista propietati pentru update!");
        }else if(user.name == null || user.email == null || user.password == null){
            throw new Error("Propietati invalide!");
        }

        if(per){
            
            if(user.name){
                per.name = user.name;
            }
            if(user.email){
                per.email = user.email;
            }
            if(user.password){
                per.password = user.password;
            }

            await per.save();

        }else{
            throw new Error("Nu s-a gasit Persoana cu acest ID pentru a putea face Update!");
        }
    }




}