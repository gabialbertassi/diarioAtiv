import './index.scss'
import { useEffect, useState } from 'react'
import moment from 'moment';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';



export default function Cadastrar() {
    const [token, setToken] = useState(null);

    const [dia, setDia] = useState('');
    const [conteudo, setConteudo] = useState('');

    const navigate = useNavigate()

    const { id } = useParams();

    async function salvar() {
        let paramCorpo = {
            "dia": dia,
            "conteudo": conteudo
        }
        
        if (id == undefined) {
            const url = `http://localhost:8001/diario?x-access-token=${token}`;
            let resp = await axios.post(url, paramCorpo);
            alert('Pessoa adicionada no Diario. Id: ' + resp.data.novoId);
        } else {
            const url = `http://localhost:8001/diario/${id}?x-access-token=${token}`;
            let resp = await axios.put(url, paramCorpo);
            alert('Pessoa alterada no diario.');
        }
    }

    async function consultar() {
        if (id != undefined) {
            const url = `http://localhost:8001/diario/${id}?x-access-token=${token}`;
            let resp = await axios.get(url);
            let dados = resp.data;

            let data = moment(dados.dia).format('YYYY-MM-DD')
            console.log(data)

            setDia(dados.dia)
            setConteudo(dados.conteudo)

        }
    }

    useEffect(() => {
        let usu = localStorage.getItem('USUARIO')
        setToken(usu)

        if (usu == undefined) {
            navigate('/')
        }

        consultar();
    }, [])

    return (
        <div className='pagina-cadastrar'>
            <button><Link to={'/consultar'}>Voltar</Link></button>
            <h1>{id ? 'EDITAR' : 'CADASTRAR'}</h1>


            <div className='form'>
                <div>
                    <label>Dia:</label>
                    <input
                        type='date'
                        value={dia}
                        onChange={e => setDia(e.target.value)} />
                </div>
                <div>
                    <label>Conteudo:</label>
                    <input
                        type='text'
                        value={conteudo}
                        onChange={e => setConteudo(e.target.value)} />
                </div>
                
            </div>
            <button onClick={salvar}> SALVAR </button>

        </div>
    )
}
