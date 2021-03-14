export default function handler(req, res) {
    res.status(200).json([
      { date: "14/03/2021",        
       hour: { 
         "08:00": null,
         "09:00": null,
         "10:00": "weslleyzera2020@gmail.com",
         "11:00": null,
        }
      },
      { date: "15/03/2021",        
       hour: { 
         "08:00": "weslleyzera2020@gmail.com",
         "09:00": "weslleytiu@gmail.com",
         "10:00": null,
         "11:00": "prinda@hotmail.com",
        }
      }, 
      { date: "16/03/2021",        
       hour: { 
         "08:00": null,
         "09:00": "weslleytiu@gmail.com",
         "10:00": null,
         "11:00": "prinda@hotmail.com",
        }
      }, 
    ])
  }