export default function handler(req, res) {
    res.status(200).json([
        {
            type: 'team',
            name: 'England',
            sport: 'England Rugby',
            teamCrest: 'https://www.activenotts.org.uk/images/files/90082/128x128.jpg',
          },
          {
            type: 'venue',
            name: 'The Kings Arms',
            distance: '12.3km',
            image: 'https://www.flaticon.com/svg/vstatic/svg/2778/2778633.svg?token=exp=1616539763~hmac=8f5063e09a6540126f9a9f19afada6fd',
          },
          {
            type: 'fixture',
            team1: 'Man Utd',
            team2: 'Arsenal',
            name: null,
            startTime: '3pm Sunday 14th March',
            sportLogo: 'https://www.flaticon.com/svg/vstatic/svg/4276/4276390.svg?token=exp=1616539684~hmac=0ee31f620e8fb812c36e7daf8ce1b4e5',
          },
          {
            type: 'fixture',
            team1: null,
            team2: null,
            name: 'Grand Prix Bahrain',
            startTime: '8pm Sunday 14th March',
            sportLogo: 'https://as2.ftcdn.net/jpg/02/43/77/57/500_F_243775759_Hj3rl3fIZgOkXOB0EA68XhMRXcvpKLLS.jpg',
          },
       
    ])
  }