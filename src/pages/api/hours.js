import { connectToDatabase }  from "../../util/mongodb"

export default async (req, res) =>{ 
  
  if (req.method === "POST"){

    const { date, morning, afternoon } = req.body;    
    
    if(!date){
      res.status(400).json({error: "Missing Value date"})
      return
    }
    // teste
    var query = { date: date };

    const { db } = await connectToDatabase();

    const response = await db.collection("hours").findOne(query);
        
    // res.status(200).json(response)

       
    if(response != null){
      await db.collection("hours").updateOne({"date": date}, {$set:{morning:morning,afternoon:afternoon}}, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
      res.status(200).json({msg: "ok"})
    } else {
      await db.collection("hours").insertOne({
      date,
      morning,
      afternoon
     }) 
     res.status(200).json({msg: "New date insert"})
    }

      

    // res.status(200).json(response.ops[0])    
  } 

  if (req.method === "get"){

    const { creatBy } = req.body;    
    
    console.log( creatBy)
    const { db } = await connectToDatabase();
    
    var query = { creatBy: creatBy };

    const response = await db.collection("items").find(query).sort({ metacritic: -1 }).toArray();

    res.status(200).json(response)    
  } 

  if (req.method === "DELETE"){

    const nameItem = req.body;
       
    const { db } = await connectToDatabase();

    const response = await db.collection("items").deleteOne(nameItem, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
    });

    res.status(200).json({delete: "1 document deleted"})    
    
  }

  if (req.method === "PUT"){

    const  { nameItem, purchased } = req.body;
    
    const { db } = await connectToDatabase();

    const response = await db.collection("items").updateOne({"nameItem": nameItem}, {$set:{purchased:purchased}}, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });

    res.status(200).json({delete: "1 document updated"})    
    
  }

}
