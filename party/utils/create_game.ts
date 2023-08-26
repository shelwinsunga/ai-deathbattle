export async function POST(req: Request) {
    const json = await req.json();
    
    const response = await fetch('https://flask-production-35f0.up.railway.app/create_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player1_description: "Warrior",
        player2_description: "Mage"
      })
    });
    
    const data = await response.text();
    
    return {
      data: data
    };
  }
  