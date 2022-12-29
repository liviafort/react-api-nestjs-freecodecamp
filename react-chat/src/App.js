//que permite adicionar uma variável de estado ao seu componente
//armazena informações de renderizações anteriores!!!
import { useEffect, useState } from "react"
import Pusher from "pusher-js";

function App() {
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([{}]);
    const [message, setMessage] = useState('');
    //useEffect colocará as credenciais do pusher
    useEffect(() => {
        let allMessages = []
        //código do próprio pusher -getting started
        Pusher.logToConsole = true;
        var pusher = new Pusher('4d036d688b897eee34ae', {
            cluster: 'sa1'
          });
      
          var channel = pusher.subscribe('chat');
          channel.bind('message', function(data) {
                allMessages.push(data)
                setMessages(allMessages)
          });
    }, []);

    const submit = async e =>{
        //faz não enviar quando apertamos enter
        e.preventDefault();
        //PRECISA ENVIAR SOLITAÇÃO PRO BACKEND
        //se usa o fetch para buscar recursos de forma assíncrona através da rede
        await fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                message,
            })
        });
        let dados = {
            'username': username,
            'message': message,
        }
        messages.push(dados);
        setMessage('');
    }


    return (
        <div className="App">
        <div className="container">  
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div
                    className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input placeholder="Nome" id="usuario" className="fs-5 fw-semibold" value={username} /* não usar tag A pois sempre que clica acontece um redirecionamento*/
                            onChange={e => setUsername(e.target.value)}/>
                </div>

                <div className="list-group list-group-flush border-bottom scrollarea">
                {messages.map(message => {
                        return (
                            <div className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{message.username}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{message.message}</div>
                            </div>
                        )
                    })}
                </div>
            
            </div>
            <form onSubmit={e => submit(e)} /* faz o envio*/>
                <input className="form-control" placeholder="Escreva uma mensagem" value={message}
                /* esse form serve para fazer o envio da mensagem ------POST*/
                        onChange={e => setMessage(e.target.value)} /*criação de evento */
                />
            </form>
        </div>
        </div>
  );
}

export default App;