import express from "express";
import bruxos from "./src/data/bruxos.js";
import dados from "./src/data/dados.js";

const serverPort = 3000;
const {varinhas,pocoes,animais} = dados
const app = express();

app.use(express.json());

// Rota principal - Hogwarts
app.get('/', (req, res) => {
  res.send(`
    <div style="
      background: linear-gradient(135deg, #1a237e, #3949ab);
      color: white;
      padding: 50px;
      text-align: center;
      font-family: 'Georgia', serif;
      min-height: 100vh;
      margin: 0;
    ">
      <h1 style="
        font-size: 3rem;
        color: #ffd700;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        margin-bottom: 20px;
      ">
        ⚡ Bem-vindo à Hogwarts! ⚡
      </h1>
      <p style="font-size: 1.5rem; margin: 20px 0;">
        🏰 Escola de Magia e Bruxaria
      </p>
      <p style="font-size: 1.2rem; opacity: 0.9;">
        "É preciso muito mais que coragem para enfrentar nossos inimigos, 
        mas muito mais ainda para enfrentar nossos amigos."
      </p>
      <div style="margin-top: 30px;">
        <span style="font-size: 1.1rem;">🦁 Grifinória | 🐍 Sonserina | 🦅 Corvinal | 🦡 Lufa-lufa</span>
      </div>
    </div>
  `);
});

// Rotas dos bruxos por ID
app.get("/bruxos/:id", (req, res) => {

  let id = req.params.id;

  id = parseInt(id);
  
  const bruxo = bruxos.find(b => b.id === id);

  if(bruxo) {
   res.status(200).json(bruxo)
  } else {
      
      res.status(404).json({
          mensagem: "Bruxo não encontrado !"
      });
  }
})

// Rotas das poções por ID
app.get("/pocoes/:id", (req, res) => {

    let id = req.params.id;

    id = parseInt(id);
    
    const pocoes = pocoes.find(b => b.id === id);

    if(pocoes) {
     res.status(200).json(pocoes)
    } else {
        
        res.status(404).json({
            mensagem: `Poção com id ${id} não encontrado !`
        });
    }
})

// Rotas dos animais por ID
app.get("/animais/:id", (req,res) => {

  let id = req.params.id;
  id= parseInt(id);
  const animais = animais.find(b => b.id === id);

  if(animais){
      res.status(200).json(animais)
  } else{
      res.status(404).json({
          mensagem: `Animal com id ${id} não encontrado !`
      });
  } 
})

// Rotas das varinhas por ID
app.get("/varinhas/:id", (req,res) => {

  let id = req.params.id;
  id= parseInt(id);
  const varinhas = varinhas.find(b => b.id === id);

  if(varinhas){
      res.status(200).json(varinhas)
  } else{
      res.status(404).json({
          mensagem: `Varinha com id ${id} não encontrado !`
      });
  } 
})

// Rota dos bruxos
  app.get('/bruxos', (req, res) => {
  res.json(bruxos);
});

// Rota varinhas
app.get('/varinhas', (req, res) => {
  res.json(varinhas);
});

// Rota animais
app.get('/animais', (req, res) => {
  res.json(animais);
});

// Rota poções
app.get('/pocoes', (req, res) => {
  res.json(pocoes);
});


// get by name
app.get("/bruxos/nome/:nome", (req, res) => {
    // Pegar o nome da url
    let nome = req.params.nome.toLowerCase();

    // Buscar no array/objeto/json usando "contains"
    const bruxosEncontrados = bruxos.filter(b => 
        b.nome.toLowerCase().includes(nome)
    );

    if (bruxosEncontrados.length > 0) {
        // Se encontrar, retorna todos os que batem
        res.status(200).json(bruxosEncontrados);
    } else {
        // Se nao existir, enviar feedback e status 404
        res.status(404).json({
            mensagem: "Nenhum bruxo com esse nome encontrado!"
        });
    }
});

 // rota para buscar bruxos mortos
 app.get("/bruxos/vivos/nao",(req,res) => {
  const resultado = bruxos.filter((b) => !b.status);

  if(resultado){
    res.status(200).json(resultado)
  }else{
    res.status(404).json({erro: "Nenhum bruxo morto encontrado 🔪"})
  }
 })
 

// get by casa
app.get("/bruxos/casa/:casa", (req, res) => {
    // Pegar a casa da url
    let casa = req.params.casa;
    // Buscar no array/objeto/json
    const bruxosDaCasa = bruxos.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    if (bruxosDaCasa.length > 0) {
        // Se existir enviar na resposta com o res e o status 200
        res.status(200).json(bruxosDaCasa);
    } else {
        // Se nao existir, enviar na resposta um feedback e o status 400
        res.status(404).json({
            mensagem: "Nenhum bruxo encontrado nessa casa!"
        })
    }
});

// Iniciar servidor
app.listen(serverPort, () => {
  console.log(`⚡ Servidor Hogwarts iniciado em: http://localhost:${serverPort}`);
  console.log(`🏰 Pronto para receber novos bruxos!`);
});