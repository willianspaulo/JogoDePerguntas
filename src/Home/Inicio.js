import React, { Component } from 'react'
import { Card, Button, Image, Icon, Divider, Container } from 'semantic-ui-react'
import config, { auth, providers } from './../config'
import firebase, { storage } from 'firebase'
//const Inicio = prop => {
class Inicio extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usuario: {},
            estaLogado: false,
            categorias: {}
        }

        config.syncState('categorias', {
            context: this,
            state: 'categorias',
            asArray: false
        })

        auth.onAuthStateChanged((usuario) => {
            if (usuario) {
                console.log(usuario)
                this.setState({
                    usuario,
                    estaLogado: true
                })

            } else {
                console.log('Não Logou')
                this.setState({ estaLogado: false })
            }
        })

        this.gravarDados = this.gravarDados.bind(this)
        this.selecionarEditar = this.selecionarEditar.bind(this)
        this.atualizarDados = this.atualizarDados.bind(this)
    }

    autentica(provider) {
        auth.signInWithPopup(providers[provider])
    }

    sair() {
        firebase.auth().signOut()
            .then(() => {
                alert('Usuário deslogado!')
            })
            .catch((err) => {
                alert('ERRO: não foi possível sair')
            })
    }

    gravarDados(e) {
        e.preventDefault()

        console.log(this.nome.value)
        console.log(this.icone.value)
        //console.log(this.image.files)

        const novaCategoria = {
            nome: this.nome.value,
            icone: this.icone.value
        }

        config.push('categorias', {
            data: novaCategoria
        })

    }

    removerDado(k) {

        //console.log(k)

        config.remove('categorias/' + k, function (err) {
            console.log(k, err)
        });
    }

    selecionarEditar(k) {
        this.nome.value = 'teste nome'
        this.icone.value = 'teste icone'
        this.setState({
            endPointCategoria: k
        })

    }

    atualizarDados() {

        console.log(this.state.endPointCategoria)

        config.update('categorias/' + this.state.endPointCategoria, {
            data: {
                nome: this.nome.value,
                icone: this.icone.value
            }
        })
            .then((data) => {
                console.log(data)
                //Router.transitionTo('dashboard');
            })
            .catch(err => {
                console.log(err)
                //handle error
            });
    }

    render() {
        return (
            <div>
                <h1>Bem Vindo</h1>
                <p>Este é um jogo de perguntas e respostas</p>

                <Container>
                    <Card centered>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                        {
                            this.state.estaLogado &&
                            <Card.Content>
                                <Card.Header>{this.state.usuario.displayName}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Desde {this.state.usuario.metadata.creationTime}</span>
                                </Card.Meta>
                                <Card.Description>{this.state.usuario.email}</Card.Description>
                            </Card.Content>
                        }
                        {
                            !this.state.estaLogado &&
                            <Card.Content>
                                <Button primary fluid onClick={() => this.autentica('facebook')}>
                                    Facebook
                            </Button>
                                <Divider horizontal>Or</Divider>
                                <Button secondary fluid>
                                    Login
                            </Button>
                            </Card.Content>
                        }
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                22 Usuários
                            </a>
                            {
                                this.state.estaLogado &&
                                <span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a onClick={() => this.sair()}>
                                        <Icon name='log out' />
                                        Sair
                                   </a>
                                </span>
                            }
                        </Card.Content>
                    </Card>


                    {
                        Object.keys(this.state.categorias).map(k => {
                            return (
                                <a key={k} className="ui label">
                                    <i className={this.state.categorias[k].icone}></i>
                                    {this.state.categorias[k].nome}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <i className="trash alternate icon" onClick={() => this.removerDado(k)}></i>
                                    <i className="pencil icon" onClick={() => this.selecionarEditar(k)}></i>
                                </a>
                            )
                        })
                    }
                </Container>

                <Container>
                    <form onSubmit={this.gravarDados} className="ui form" style={{ padding: "100px 30%" }}>
                        <div className="field">
                            <label htmlFor="nome">Nome da Categoria</label>
                            <input type="text" name="nome" id="nome" placeholder="ex: Mundo" ref={(ref) => this.nome = ref} />
                        </div>
                        <div className="field">
                            <label htmlFor="icone">Icone</label>
                            <input type="text" name="icone" id="icone" placeholder="ex: globe icon" ref={(ref) => this.icone = ref} />
                        </div>

                        <button className="ui button" type="submit">Criar</button>
                        <button className="ui button" type="button" onClick={this.atualizarDados}>Atualizar</button>
                    </form>
                </Container>
            </div>
        )
    }
}

export default Inicio;