import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';
import { Container } from 'react-bootstrap';
import {isLogin, isAdmin} from '../libs/utils';

export const siteName = 'Starter App'
export const siteTitle = 'Starter App Next.js'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
        showMenu: true,
        login : false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu = function() {
    this.setState({ showMenu: !this.state.showMenu });
  }
  componentDidMount = () => {
    if(localStorage.getItem('isAdmin')){
      //console.log('ADMIN')
      this.setState({
        login : true
    })
    } else {
        this.setState({
            login : false
        })
    }
}

  render() {
    const { children, home, login, admin, member } = this.props;

  return (
    <>
    <Head>  
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600" rel="stylesheet" />
    <meta name="description" content="" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>

    <Navbar toggleMenu={this.toggleMenu} />
    <div className="wrapper">
    {this.state.login == true && (
        <Sidebar showMenu={this.state.showMenu} />
    )} 
    {!home && !login && !admin ? 
    <div id="content">
      <Container>
    <div className="pt-3">
    <Link href="/" passHref>
            <a>← Kembali</a>
          </Link>
    </div> 
    </Container>
      {children}
    </div>
    :
    <div id="content">
      {children}
    </div>
    }
    </div>
    <Footer/>
    </>
  );
  }
}
export default Layout;
