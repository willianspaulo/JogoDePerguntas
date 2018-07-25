import React, { Component } from 'react'
import { Card, Button, Image, Icon, Divider, Container } from 'semantic-ui-react'
import config, { auth, providers } from './../config'
import firebase from 'firebase'
//const Inicio = prop => {
class Inicio extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usuario: {},
            estaLogado: false
        }

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
                </Container>
            </div>
        )
    }
}

export default Inicio;