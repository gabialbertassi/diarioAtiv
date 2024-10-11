import './index.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';



export default function Consultar() {
    const [token, setToken] = useState(null);
    const [listaNegra, setListaNegra] = useState([]);

    const navigate = useNavigate()

    async function buscar() {
        const url = `http://localhost:8001/diario?x-access-token=${token}`;
        let resp = await axios.get(url);
        setListaNegra(resp.data);
    }

    async function excluir(id) {
        const url = `http://localhost:8001/diario/${id}?x-access-token=${token}`;
        await axios.delete(url)

        await buscar()
    }

    async function sair() {
        localStorage.setItem('USUARIO', null)
        navigate('/')
    }
    
    useEffect(() => {
        let usu = localStorage.getItem('USUARIO')
        setToken(usu)

        if (usu == undefined) {
            navigate('/')
        }
    }, [])
    

    return (
        <div className='pagina-consultar'>
            <h2>Bem-vindo {token?.nome}</h2>
            <button onClick={sair}>Sair</button>
            <h1> CONSULTAR </h1>

            <button onClick={buscar}>Buscar</button>
            <button><Link to={'/cadastrar'}>Cadastrar</Link></button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Dia</th>
                        <th>Conteudo</th>
                    </tr>
                </thead>

                <tbody>
                    {listaNegra.map(item => 
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.dia}</td>
                            <td>{item.conteudo}</td>
                            <td>
                                <Link to={`/cadastrar/${item.id}`}>Alterar</Link>
                                <Link onClick={() => excluir(item.id)}>Deletar</Link>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

           
        </div>
    )
}
